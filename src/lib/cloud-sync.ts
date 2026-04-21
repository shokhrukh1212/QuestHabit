/**
 * Cloud sync — uploads local game data to Supabase.
 *
 * Guards against placeholder .env values. When Supabase credentials are not
 * configured, all operations gracefully no-op with a warning log.
 *
 * This is a working stub — the upsert logic is structurally complete but
 * depends on Supabase tables being created (Phase 6+).
 */

import { supabase } from "@/lib/supabase";
import { useCharacterStore } from "@/stores/character-store";
import { useHabitStore } from "@/stores/habit-store";

/** Check if Supabase is configured with real credentials. */
function isSupabaseConfigured(): boolean {
  const url = process.env.EXPO_PUBLIC_SUPABASE_URL ?? "";
  return url.length > 0 && !url.includes("your-project");
}

/**
 * Upload all local data to Supabase for the given user.
 * Non-blocking — logs warnings on failure, never throws.
 */
export async function uploadLocalDataToSupabase(
  userId: string,
): Promise<void> {
  if (!isSupabaseConfigured()) {
    console.warn(
      "[cloud-sync] Supabase not configured — skipping cloud upload.",
    );
    return;
  }

  try {
    await Promise.all([
      syncCharacter(userId),
      syncHabits(userId),
      syncEvents(userId),
    ]);
  } catch (err) {
    console.warn("[cloud-sync] Upload failed:", err);
  }
}

async function syncCharacter(userId: string): Promise<void> {
  const character = useCharacterStore.getState().character;
  if (!character) return;

  const { error } = await supabase.from("characters").upsert(
    {
      id: character.id,
      user_id: userId,
      name: character.name,
      character_class: character.characterClass,
      level: character.level,
      total_xp: character.totalXp,
      stats: character.stats,
      equipped_gear: character.equippedGear,
      created_at: character.createdAt,
    },
    { onConflict: "user_id" },
  );

  if (error) console.warn("[cloud-sync] Character sync failed:", error.message);
}

async function syncHabits(userId: string): Promise<void> {
  const { habits } = useHabitStore.getState();
  if (habits.length === 0) return;

  const rows = habits.map((h) => ({
    id: h.id,
    user_id: userId,
    name: h.name,
    category: h.category,
    frequency: h.frequency,
    custom_days: h.customDays,
    icon_key: h.iconKey,
    sort_order: h.sortOrder,
    created_at: h.createdAt,
    deleted_at: h.deletedAt,
  }));

  const { error } = await supabase
    .from("habits")
    .upsert(rows, { onConflict: "id" });

  if (error) console.warn("[cloud-sync] Habits sync failed:", error.message);
}

async function syncEvents(userId: string): Promise<void> {
  const { events } = useHabitStore.getState();
  if (events.length === 0) return;

  // Batch in chunks of 100 to avoid payload limits
  const CHUNK_SIZE = 100;
  for (let i = 0; i < events.length; i += CHUNK_SIZE) {
    const chunk = events.slice(i, i + CHUNK_SIZE);
    const rows = chunk.map((e) => ({
      id: e.id,
      user_id: userId,
      habit_id: e.habitId,
      event_type: e.eventType,
      completed_at: e.completedAt,
      day_date: e.dayDate,
      xp_earned: e.xpEarned,
    }));

    const { error } = await supabase
      .from("habit_events")
      .upsert(rows, { onConflict: "id" });

    if (error)
      console.warn("[cloud-sync] Events sync failed (batch):", error.message);
  }
}
