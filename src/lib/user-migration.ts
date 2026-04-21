/**
 * User migration — updates local userId ("local") to the real Supabase user ID
 * across all Zustand stores after a guest signs in.
 *
 * Also triggers cloud sync to upload local data to Supabase.
 */

import { uploadLocalDataToSupabase } from "@/lib/cloud-sync";
import { useCharacterStore } from "@/stores/character-store";
import { useHabitStore } from "@/stores/habit-store";

/**
 * Migrate all local data from userId "local" to the authenticated user's ID,
 * then upload to Supabase.
 */
export async function migrateLocalToAuthenticated(
  newUserId: string,
): Promise<void> {
  // 1. Update character store userId
  const characterStore = useCharacterStore.getState();
  if (characterStore.character?.userId === "local") {
    useCharacterStore.setState({
      character: {
        ...characterStore.character,
        userId: newUserId,
      },
    });
  }

  // 2. Update habit store userId on habits and events
  useHabitStore.getState().migrateUserId(newUserId);

  // 3. Upload to Supabase (non-blocking, logs warnings)
  await uploadLocalDataToSupabase(newUserId);
}
