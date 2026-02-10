# QuestHabit — Questions & Answers

---

## Core Loops

- **What are the core loops (daily loop, party loop, progression loop)?**

> **Answer:** There are 4 interlocking loops:
>
> **1. Daily Loop (every day, 2-5 minutes):**
> Open app → See Dream (if morning) → View Quest Path → Complete habits IRL → Tap waypoints to confirm → Watch animations → Reach campfire (or sit mid-path) → See daily summary. This is the atomic unit of the entire app.
>
> **2. Weekly Loop (party cadence):**
> Monday: new boss spawns → Throughout week: habits deal damage → Party feed shows contributions → Weekend: boss nearing defeat → Sunday night: victory/defeat screen → Rewards distributed. This creates social accountability on a 7-day cycle.
>
> **3. Progression Loop (continuous, months):**
> Complete habits → Earn XP → Level up → Unlock gear/zones → Home base evolves → Legacy Tree grows → Shadow weakens → New fusions discovered. This is the long-term hook that keeps users engaged across months.
>
> **4. Event Loop (monthly):**
> Time Rift appears → 7-day themed challenge → Exclusive rewards → Monthly Shadow Duel → Oath cycles. This prevents staleness by introducing novelty on a regular cadence.

- **Which screens are required to fully support each loop?**

> **Answer:**
>
> **Daily Loop (MVP-critical):** D.1 Quest Path, D.2 Encounter Tap, D.3 Completion Animation, D.4 Missed Habit, D.5 Daily Summary, D.6 Campfire. **6 screens.**
>
> **Weekly Loop:** S.1 Party Dashboard, S.4 Boss Fight Progress, S.5 Boss Victory. **3 screens minimum** (S.2, S.3, S.6 are setup/secondary).
>
> **Progression Loop:** C.1 Character Profile, C.3 Level Up, W.1 Home Base, P.1-P.7 Prologue. **10 screens.**
>
> **Event Loop:** TR.1 Rift Portal, SS.2 Shadow Duel, OA.1-OA.3 Oaths. **5 screens.**
>
> **Total MVP-critical screens: 16.** The other 39 screens are important but not required for a functional core loop.

- **What are the "game rules" that must remain consistent across the app (XP formula, damage rules, streak penalties, missed habits)?**

> **Answer:** These are the immutable game rules — hardcode them in a single `src/lib/game-rules.ts` file that is the ONLY source of truth:
>
> ```
> BASE_XP_PER_HABIT = 50
> PERFECT_DAY_BONUS = 30
> BOSS_DAMAGE_PER_HABIT = 25
> STREAK_MILESTONE_DAYS = [7, 14, 30, 60, 100]
> FUSION_TRIGGER_DAYS = 21
> FUSION_BREAK_DAYS = 7
> OATH_MIN_DAYS = 7
> OATH_MAX_DAYS = 30
> SHADOW_DUEL_DAY = last day of month
> WHISPER_MAX_CHARS = 100
> FREE_HABIT_LIMIT = 3
> FREE_PARTY_LIMIT = 1
> ```
>
> **Streak rules:** Missing a habit does NOT reset the streak to zero. A streak counts consecutive days where the habit was completed. Missing one day breaks the streak, but the "best streak" stat is preserved forever. No punishment beyond the visual (mid-path, Shadow grows, crack in base).
>
> **Missed habit rules:** Character is shown mid-path. Small crack appears in home base. Shadow Self moves closer. Dream is reflective type. NO data deletion, NO XP removal, NO punitive messages. The app never uses the word "failed."

---

## Leveling & XP System

- **How should we structure the 'Leveling Algorithm'? I need a mathematical formula for the XP curve.**

> **Answer:** Use a **soft exponential curve** that feels fast early and slows gradually but never becomes impossible:
>
> ```
> XP_TO_NEXT_LEVEL = floor(100 * (level ^ 1.5))
>
> Level 1 → 2:   100 XP  (roughly 1 perfect day)
> Level 2 → 3:   283 XP  (roughly 1.5 days)
> Level 3 → 4:   520 XP  (roughly 3 days)
> Level 5 → 6:   1,118 XP (roughly 6 days)
> Level 10 → 11: 3,162 XP (roughly 17 days)
> Level 20 → 21: 8,944 XP (roughly 49 days)
> Level 50 → 51: 35,355 XP (roughly ~196 days)
> ```
>
> **With 3 habits per day (free tier):** a user earns ~180 XP/day on perfect days (50×3 + 30 bonus). Level 10 is reachable in roughly 5-6 weeks of consistent play. This is the right pace — fast enough to feel progress, slow enough to value each level.

- **If a user completes 5 habits per day, how long should it take to reach Level 10?**

> **Answer:** With 5 habits: ~280 XP/day (50×5 + 30). Total XP from 1→10 is approximately 10,800 XP. That's **~39 days**, about 5.5 weeks. This feels right. Level 10 unlocks the Frozen Peaks zone — a meaningful milestone after a month of commitment.

- **What XP curve formula should we use (linear, exponential, logarithmic)?**

> **Answer:** `floor(100 * (level ^ 1.5))` — this is a **polynomial curve** (between linear and exponential). Pure exponential (2^n) becomes punishing. Pure linear is too flat. The 1.5 exponent creates a "gets harder but never feels impossible" curve used by games like Pokémon and World of Warcraft.

- **Should XP rewards remain constant across levels, or scale down/up?**

> **Answer:** **Keep XP rewards constant.** Every habit completion always gives 50 XP regardless of level. This is critical for psychological health — the user's effort doesn't get "worth less" over time. The feeling of progress slowing comes from the increasing XP threshold, not from reduced rewards. Habits should never feel devalued.
>
> Exception: Fused habits give 150 XP (3x) as their special bonus. Time Rift encounters give 75 XP (1.5x). These are bonuses ON TOP of the base rate, not replacements.

- **How do we prevent XP inflation at higher levels?**

> **Answer:** The polynomial XP curve naturally handles this. Additionally:
> - Cap active habits at 10 (even for premium). This caps daily XP at ~530 (50×10 + 30).
> - No retroactive XP grants. If you add a habit on Day 30, it starts from zero — no backfill.
> - Boss damage is fixed at 25/habit regardless of level. A Level 50 player deals the same boss damage as Level 1. This keeps party balance fair.
> - Achievements/badges are one-time XP bonuses (non-repeatable).

---

# 2. Data Architecture & Source of Truth

## State Ownership

- **What is the source of truth for progress (local-only, server, hybrid)?**

> **Answer:** **Hybrid with local-first for personal data, server-authoritative for social data.**
>
> | Data | Source of Truth | Why |
> |------|----------------|-----|
> | Habit completions | Local-first, synced to server | Must work offline |
> | Character stats/XP | Computed from completions (both sides) | Derived data |
> | Streaks | Computed from completions | Derived data |
> | Home base state | Computed from long-term consistency | Derived data |
> | Party/Boss HP | **Server only** | Must be authoritative for fairness |
> | Leaderboard | **Server only** | Aggregation query |
> | Whisper matching | **Server only** | Requires cross-user data |
> | Oath tracking | **Server only** | Visible to party, must be tamper-proof |
> | Dream generation | **Server (Edge Function)** | Procedural generation |
> | Legacy Tree | Computed from full history | Derived data |

- **Which features are offline-critical (must work without internet)?**

> **Answer:**
> - ✅ Viewing the Quest Path
> - ✅ Completing/confirming habits
> - ✅ Viewing character profile, stats, gear
> - ✅ Viewing the Dream Journal (cached dreams)
> - ✅ Viewing home base (last synced state)
> - ❌ Party features (require server)
> - ❌ Whisper Network (require server)
> - ❌ Boss fight damage (queued locally, applied on sync)
> - ❌ Oath creation (requires server validation)

- **Which features must be server-authoritative (party damage, leaderboard, boss HP)?**

> **Answer:** Everything in the "Server only" row above. Specifically: boss HP, party leaderboards, oath tracking, whisper delivery, Time Rift global progress, and premium entitlements. These use Supabase RLS policies + Edge Functions for validation.

## Events vs Computed State

- **What should be stored as immutable events (append-only log)?**

> **Answer:** Store these as **immutable event rows** in a `habit_events` table:
> ```sql
> habit_events (
>   id uuid PRIMARY KEY,
>   user_id uuid REFERENCES users(id),
>   habit_id uuid REFERENCES habits(id),
>   event_type TEXT, -- 'completed', 'skipped', 'created', 'deleted'
>   completed_at TIMESTAMPTZ,
>   day_date DATE, -- the "game day" this belongs to
>   xp_earned INTEGER,
>   created_at TIMESTAMPTZ DEFAULT now()
> )
> ```
> NEVER delete rows from this table. If a user "unchecks" a habit, insert a new event with type `'unchecked'` — don't delete the original. This gives you a complete audit trail for streak calculation, Legacy Tree rendering, and Shadow strength computation.

- **What should be stored as computed state (current XP, level, boss HP)?**

> **Answer:** These are **materialized/cached values** updated via triggers or Edge Functions:
> - `characters.total_xp` — sum of all xp_earned from habit_events
> - `characters.level` — computed from total_xp using the level formula
> - `characters.current_streak` — computed from consecutive completion dates
> - `boss_fights.current_hp` — decremented server-side when damage events arrive
> - `home_bases.evolution_level` — computed from 30-day rolling consistency
>
> Store these as columns for fast reads, but they can always be recomputed from the event log.

- **How do we handle edits to habits? If a user changes frequency/name, does history remain immutable?**

> **Answer:** Yes. History is **always immutable**. When a user edits a habit:
> - Insert a `habit_changes` event with the old and new values.
> - The habit row itself updates (name, frequency), but all past `habit_events` retain the old `habit_id`.
> - If a user deletes a habit, soft-delete it (`deleted_at` timestamp). All events remain for Legacy Tree scar rendering.
> - The Legacy Tree's "scar system" depends on being able to see deleted habits and their history.

## Time Handling

- **How do we represent time correctly (timezones, streak reset time, "day boundary")?**

> **Answer:** This is one of the trickiest parts of the app. Here's the rule:
>
> 1. **All timestamps stored in UTC** in the database. Always.
> 2. **Each user has a `timezone` field** (e.g., `'Asia/Tashkent'`) set during onboarding or detected from device.
> 3. **The "game day"** is determined by the user's local timezone. A day runs from midnight to midnight LOCAL time.
> 4. **The `day_date` field** on `habit_events` is a DATE in the user's local timezone (e.g., `2026-02-10`), computed client-side when the event is created.
> 5. **Streak calculations** use `day_date` sequences, NOT timestamps. This avoids timezone edge cases.
> 6. **Daily reset** happens at midnight local time. The client handles this — when the app opens, it checks if the current local date differs from the last active date, and if so, generates a new Quest Path.

- **Should reset time be local-device-based or server-based?**

> **Answer:** **Local-device-based for the daily reset.** The server doesn't push resets. The client checks on every app open. Server-side scheduled jobs (cron) handle: weekly boss fight resolution (Monday 00:00 UTC), monthly Shadow Duel trigger (last day of month 23:59 UTC), and Time Rift start/end (specific UTC times). These server events affect all users simultaneously, which is correct for shared features.

---

# 3. Hybrid Architecture (Offline + Real-Time)

## Architecture Questions

- **How should we structure state management for this hybrid requirement?**

> **Answer:** Use a **3-layer architecture:**
>
> **Layer 1 — Local Queue (Zustand + AsyncStorage):**
> When the user completes a habit offline, the event is immediately written to a local Zustand store AND persisted to AsyncStorage. The UI updates instantly (optimistic). The event is also added to a `pendingSync` queue.
>
> **Layer 2 — Sync Engine (custom hook):**
> A `useSyncEngine()` hook runs on app focus and on network reconnection. It processes the `pendingSync` queue by sending events to Supabase. On success, events are removed from the queue. On failure, they retry with exponential backoff.
>
> **Layer 3 — Server State (TanStack Query + Supabase Realtime):**
> TanStack Query caches server state locally. Supabase Realtime subscriptions push updates for party-related data (boss HP, activity feed). When sync completes, TanStack Query cache is invalidated to reflect server-confirmed state.

- **If a user completes a habit offline and comes online 4 hours later: How do we prevent boss desync?**

> **Answer:** The sync engine sends the queued events with their **original timestamps**. The server-side Edge Function processes them in order:
> 1. Validate the event (does this habit exist? is the user in a party? is the date valid?)
> 2. Apply XP to the character
> 3. Apply boss damage IF the boss is still alive at the event's timestamp
> 4. Return the updated boss state to the client
>
> The server is the authority on boss HP. The client never locally calculates boss damage — it only shows the server-confirmed value.

- **What if the boss is already dead?**

> **Answer:** If the sync engine sends a habit completion from 4 hours ago but the boss was defeated 2 hours ago:
> - The XP is still awarded to the user (they did the habit).
> - The boss damage is NOT applied (boss is already dead).
> - The user sees: "Your habit was recorded! The Iron Golem was already defeated by your party while you were away. +50 XP earned."
> - The server returns the boss victory state, and the client shows the victory screen if they haven't seen it yet.

- **Should we use optimistic UI, strict server-side validation, or hybrid?**

> **Answer:** **Hybrid (optimistic UI + server reconciliation):**
> - **Personal data (habit completion, XP, streaks):** Optimistic. Apply instantly. Sync in background. If sync fails, retry. In practice, personal data sync almost never fails because it's just inserting rows.
> - **Social data (boss damage, oath progress, whisper sends):** Optimistic UI for the display (show "+25 dmg" immediately), but reconcile with server. If the server rejects (boss dead, oath already broken), update the UI to reflect reality.
> - **Never block the user.** The habit confirmation animation should play instantly regardless of network state. Network issues are handled silently in the background.

---

# 4. Dynamic Image Strategy (Dream / Habit Icons)

- **Should we integrate AI image generation or use a keyword mapper?**

> **Answer:** **Start with Option B (Keyword Mapper) for MVP. Plan for Option A later.**
>
> Here's why: AI generation adds cost ($0.01-0.04 per image), latency (2-8 seconds), style inconsistency, and a dependency on external APIs. For MVP, a curated icon set is far more reliable and instant.

- **How large should the local icon set be?**

> **Answer:** Build a library of **60-80 pixel-art encounter icons** covering these categories:
> - **Fitness (15):** dumbbell, running shoe, sword, barbell, push-up figure, yoga pose, swimming, cycling, jump rope, boxing glove, martial arts, stretching, hiking boot, weight scale, heart rate
> - **Learning (12):** scroll, open book, quill pen, graduation cap, lightbulb, brain, telescope, globe, music note, code brackets, language bubble, chess piece
> - **Discipline (12):** shield, lock, hourglass, meditation pose, moon (sleep), sunrise, water drop, apple, no-phone icon, journal, mirror, prayer beads
> - **Social (8):** handshake, speech bubble, letter, group, heart, party hat, trophy, camera
> - **General (13):** star, fire, lightning, gem, key, compass, map, potion, hammer, tree, flower, crown, coin

- **What happens for unknown keywords?**

> **Answer:** Fallback cascade:
> 1. Exact match: "gym" → dumbbell icon
> 2. Partial match: "go to gym" → detects "gym" → dumbbell icon
> 3. Category match: user selects a category (Fitness/Learning/Discipline) when creating a habit → default icon for that category
> 4. Ultimate fallback: a generic glowing orb icon (works for any habit)
>
> The keyword mapping lives in a `habit-icon-mapper.ts` file with a simple lookup table. Easy to extend over time.

- **Can we start with Option B and upgrade later?**

> **Answer:** Yes, perfectly. The architecture supports this: each habit has an `icon_key` field (e.g., `"dumbbell"`, `"scroll"`). Later, you can add an `icon_url` field for AI-generated custom images. The rendering component checks `icon_url` first, falls back to `icon_key`. Zero migration needed.

---

# 5. Image Storage & Caching

- **How do we cache generated images?**

> **Answer:** For MVP with the keyword mapper, all icons are bundled in the app as static assets (`assets/encounters/*.png`). No caching needed — they're already on-device.
>
> For future AI-generated images:
> - Generated images are uploaded to Supabase Storage (S3-compatible)
> - The CDN URL is stored in the `habits.icon_url` database field
> - Client caches using `expo-image` which has built-in disk + memory caching
> - Cache TTL: forever (generated images don't change)

- **What are the invalidation rules?**

> **Answer:** For AI images: never invalidate. Once generated, an image is permanent. If the user "rerolls," a NEW image is generated and the old URL is replaced. The old image eventually gets garbage-collected from storage.

- **If an image fails to generate, what is the fallback?**

> **Answer:** Show the keyword-mapped icon (Option B). AI generation is always an enhancement, never a requirement. The fallback chain: custom AI image → keyword-mapped icon → category default → generic orb.

- **Do we allow users to "reroll" images?**

> **Answer:** Yes, but only for premium users. Free users get the keyword-mapped icon. Premium users get 3 rerolls per habit (AI-generated). This is a nice monetization touchpoint without gating core functionality.

---

# 6. Visual Style & Art Consistency

- **Do we enforce a single consistent pixel-RPG art style?**

> **Answer:** **Yes, absolutely.** The entire app must feel like one cohesive game world. All pixel art follows these rules:
> - **Resolution:** 32×32 or 64×64 pixel base, scaled up with nearest-neighbor (no anti-aliasing)
> - **Palette:** Limited to 32 colors maximum (use a shared palette like Endesga 32 or a custom one)
> - **Style:** Top-down or side-view perspective, consistent across all assets
> - **Outline:** 1px black outlines on all sprites
> - **Animation:** Frame-by-frame pixel animation (2-6 frames per animation)

- **If using AI generation: prompt templates, fixed seeds, or custom LoRA?**

> **Answer:** When you add AI generation later:
> - **Prompt template:** Always prefix with "32x32 pixel art RPG icon, limited palette, black outline, [subject], dark background, no text" 
> - **Style reference:** Include 3-4 reference images from your existing icon set in every API call (if the API supports image-to-image or style reference)
> - **LoRA:** If budget allows, fine-tune a LoRA on your 60-80 hand-made icons. This is the gold standard for consistency. Cost: ~$20-50 for training, then pennies per generation.
> - **For MVP: skip AI entirely.** Commission an artist to create the 60-80 icon set. Fiverr pixel artists charge $5-15 per icon, or $150-400 for a full set. This is cheaper AND more consistent than AI.

---

# 7. UI Architecture & Design System

## Design System

- **How do we build tokens (colors, spacing, typography, radius)?**

> **Answer:** Create a `src/lib/design-tokens.ts` file:
> ```typescript
> export const colors = {
>   bg: { primary: '#0D0D1A', card: '#1A1A2E', elevated: '#252542' },
>   accent: { purple: '#6C5CE7', gold: '#F4A261', green: '#2ECC71', red: '#E74C3C', blue: '#3498DB' },
>   text: { primary: '#FFFFFF', secondary: '#B0B0C0', muted: '#7F8C8D' },
>   rarity: { common: '#9E9E9E', uncommon: '#2ECC71', rare: '#3498DB', epic: '#6C5CE7', legendary: '#F4A261' },
> } as const;
>
> export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 } as const;
> export const radius = { sm: 4, md: 8, lg: 12, xl: 16, full: 9999 } as const;
> export const fontSize = { xs: 10, sm: 12, md: 14, lg: 16, xl: 20, xxl: 24, title: 32 } as const;
> ```
>
> Also configure these as NativeWind/Tailwind theme extensions in `tailwind.config.js` so you can use them as classes: `bg-bg-primary`, `text-accent-purple`, etc.

- **How do we ensure 50+ screens stay consistent?**

> **Answer:** Three strategies:
> 1. **Shared design tokens** (above) — every color, spacing, radius comes from one file.
> 2. **Reusable component library** — build the 10-15 base components first (below), use them everywhere.
> 3. **Screen template** — every screen file starts with the same layout wrapper that provides safe area, background color, and bottom nav. Create a `<ScreenWrapper>` component.

## Reusable Components

- **Which components will be reused everywhere?**

> **Answer:** Build these FIRST in Phase 1 before any screens:
>
> | Component | Used In | Priority |
> |-----------|---------|----------|
> | `<RPGDialogueBox>` | Prologue, encounters, dreams | P0 |
> | `<QuestWaypoint>` | Quest Path (D.1) | P0 |
> | `<XPBar>` | Character banner, profile, summary | P0 |
> | `<HPBar>` | Boss fights, Shadow duel | P1 |
> | `<PixelAvatar>` | Character, party, leaderboard | P0 |
> | `<GearCard>` | Inventory, rewards, forge | P1 |
> | `<ModalSheet>` | Encounter tap, auth prompts | P0 |
> | `<StoneButton>` | Prologue inputs, confirmations | P0 |
> | `<FloatingXPText>` | Completion animations | P0 |
> | `<BadgeChip>` | Rarity, dream type, level, streak | P0 |
> | `<ActivityFeedItem>` | Party dashboard, oath feed | P1 |
> | `<ProgressRing>` | Oath progress, rift progress | P1 |
> | `<ScreenWrapper>` | Every screen | P0 |
> | `<CharacterBanner>` | Top of Quest Path, maps | P0 |

## UI States

- **How do we represent loading, empty, error, and skeleton states?**

> **Answer:**
> - **Loading:** Use skeleton placeholders that match the layout shape. For the Quest Path, show a faded path with pulsing waypoints. Never use a full-screen spinner.
> - **Empty:** RPG-themed empty states. Empty inventory: "Your bag is empty. Complete quests to find gear." Empty party: "No guild yet. Adventurers are stronger together."
> - **Error:** Non-blocking toast notifications at the bottom. "Connection lost — your progress is saved locally." Never show raw error messages. Never block the user.
> - **Offline indicator:** A subtle icon in the character banner (cloud with X) when offline. Tapping shows: "You're offline. Quests are saved locally and will sync when you reconnect."

---

# 8. Performance & Smoothness

- **How do we measure FPS?**

> **Answer:** Use `react-native-performance` and Flipper's Performance plugin during development. In production, track these metrics via a lightweight analytics event:
> - Frame drops during animations (target: <5% dropped frames)
> - App startup time (target: <2 seconds to Quest Path)
> - Screen transition time (target: <300ms)

- **How do we test on low-end Android devices?**

> **Answer:** Get a budget Android phone ($100-150 range, like a Samsung Galaxy A14 or Redmi Note 12). Test every animation on it. If it runs smooth there, it runs smooth everywhere. Expo Go makes this easy — just scan the QR code. Also use Android Studio's emulator with reduced specs.

- **Which animations are MVP-critical?**

> **Answer:** In priority order:
> 1. **Habit completion slash/explosion** (D.3) — THE core dopamine hit
> 2. **Floating +XP text** — immediate feedback
> 3. **Level Up burst** (C.3) — biggest emotional moment
> 4. **Quest Path character walking** — daily satisfaction
> 5. **XP bar filling** — progress visualization
>
> Everything else can be added post-MVP (dream sequences, boss battle, fusion ceremony).

- **Should animations run on UI thread (Reanimated) or JS thread?**

> **Answer:** **Always Reanimated (UI thread)** for the 5 MVP-critical animations above. JS thread animations jank when the JS thread is busy (e.g., during API calls). Reanimated's `useAnimatedStyle`, `withSpring`, `withTiming` run natively at 60fps regardless of JS load. Use Moti (built on Reanimated) for simpler declarative animations (fade in, slide up).

- **When would we consider Skia or native modules?**

> **Answer:** Consider `react-native-skia` for:
> - **Legacy Tree rendering** — procedural drawing of a tree with dynamic branches based on data. This is hard to do with static images.
> - **Home base evolution** — if you want the base to smoothly morph between states rather than swapping static images.
>
> For MVP, use static images for both. Skia is a Phase 11+ optimization.

---

# 9. Monetization & Premium Architecture

## Limits

- **What are free vs premium limits?**

> **Answer:**
>
> | Feature | Free | Premium ($4.99/mo) |
> |---------|------|-------------------|
> | Active habits | 3 | 10 |
> | Parties | 1 | 5 |
> | Dream types | Basic (aspirational + reflective) | All 4 types (+ epic, phoenix) |
> | Oath System | ❌ | ✅ |
> | Habit Fusion | ❌ | ✅ |
> | Time Rift rewards | Basic | Exclusive rift gear |
> | Legacy Tree export | ❌ | ✅ |
> | Whisper sends | 1/day | Unlimited |
> | World zones | 2 | All |
> | Stat analytics | 7-day history | Full history + charts |
> | AI icon rerolls | ❌ | 3 per habit |
> | Cosmetic shop | Basic items | All items |

## Paywall Strategy

- **How do we implement paywall without blocking the core loop?**

> **Answer:** The core daily loop (Quest Path → complete habits → animations → campfire) is **always 100% free and fully functional** with 3 habits. Premium unlocks MORE of the game, not the game itself. The paywall is a "treasure chest" metaphor (G.3), not a locked door. Users hit the paywall naturally when they try to: add a 4th habit, create a second party, export their tree, or swear an oath. Each attempt shows a contextual upsell explaining the feature, not a generic "upgrade" wall.

- **Should premium features affect schema?**

> **Answer:** Yes, but minimally. Add a `subscription_tier` ENUM ('free', 'premium') to the `users` table. RLS policies check this:
> ```sql
> -- Example: limit habit count for free users
> CREATE POLICY "habit_limit" ON habits
>   FOR INSERT WITH CHECK (
>     (SELECT subscription_tier FROM users WHERE id = auth.uid()) = 'premium'
>     OR
>     (SELECT count(*) FROM habits WHERE user_id = auth.uid() AND deleted_at IS NULL) < 3
>   );
> ```

- **How do we structure entitlements in the database?**

> **Answer:** Use RevenueCat for subscription management. RevenueCat handles App Store/Play Store receipts and provides a webhook that updates the `users.subscription_tier` field in Supabase via an Edge Function. The database never directly interacts with Apple/Google — RevenueCat is the abstraction layer. Store: `users.subscription_tier`, `users.subscription_expires_at`, `users.subscription_provider` (revenueCat ID).

---

# 10. Notifications & Retention

- **Which notifications matter for MVP?**

> **Answer:** Only 3 for MVP:
> 1. **Morning Quest Reminder** (customizable time, default 8:00 AM): "Your quests await, Warrior. The path is set."
> 2. **Evening Deadline Warning** (customizable, default 10:00 PM): "The scroll still waits. You have 2 hours to decipher it." (references the specific uncompleted habit)
> 3. **Streak Risk** (triggered when a user hasn't opened the app by 8 PM and has an active streak >3 days): "Your 12-day streak is at risk. Your character is waiting."
>
> Post-MVP add: Boss updates, Dream alerts, Whisper received, Oath countdown.

- **Should notifications be timezone-aware?**

> **Answer:** **Yes, absolutely.** All notification scheduling uses the user's `timezone` field. A user in Tashkent (UTC+5) who sets their morning reminder to 8:00 AM gets it at 8:00 AM Tashkent time, not 8:00 AM UTC. Use `expo-notifications` with scheduled triggers based on local time.

- **Should we enforce quiet hours?**

> **Answer:** Yes. Default quiet hours: 11:00 PM to 7:00 AM local time. No notifications during this window. Users can customize or disable quiet hours in G.2.

- **What analytics events do we track?**

> **Answer:** For MVP, track these events (use a simple Supabase table or a lightweight service like PostHog):
> - `app_opened` (with `days_since_install`)
> - `habit_completed` (with `habit_type`, `streak_length`, `time_of_day`)
> - `habit_missed` (end of day, which habits were incomplete)
> - `level_up` (with `new_level`)
> - `auth_prompted` (which trigger: level_up, feature_gate, urgency)
> - `auth_completed` (provider: google, apple)
> - `auth_dismissed`
> - `party_created`, `party_joined`
> - `premium_viewed`, `premium_purchased`, `premium_cancelled`
> - `share_triggered` (which screen: victory, tree, character)

- **How do we measure retention (D1, D7, D30)?**

> **Answer:** Retention = % of users who open the app on Day N after install.
> - D1 target: 60%+ (the Prologue should hook them)
> - D7 target: 40%+ (first boss fight should keep them)
> - D30 target: 20%+ (world evolution + social keeps them)
>
> Track this by storing `users.installed_at` and computing cohort retention from `app_opened` events. PostHog does this automatically if you use it.

---

# 11. Security & Abuse Prevention

- **How do we prevent cheating (fake completions to deal boss damage)?**

> **Answer:** For MVP, **trust the client but log everything.** Here's why: QuestHabit is a habit tracker, not a competitive PvP game. The "cheater" is only cheating themselves (they're not actually doing the gym workout). The social pressure from party members seeing your completion rate is a natural deterrent.
>
> That said, implement these server-side guards:
> 1. **Rate limit:** No more than 1 completion per habit per day. The server rejects duplicates.
> 2. **Time validation:** Completions must have a `completed_at` timestamp within the current game day (±1 hour buffer for timezone edge cases). No backdating.
> 3. **Boss damage cap:** Each user can deal a maximum of `(habit_count × 25)` damage per day. Server calculates this, not the client.
> 4. **Anomaly flag:** If a user has 100% completion rate for 30+ days with zero missed habits, flag for review (could be legit, but worth monitoring).

- **Which actions must be server-validated?**

> **Answer:**
> - Boss damage application
> - Oath creation and completion verification
> - Premium feature access (check `subscription_tier`)
> - Party join/leave
> - Whisper send (rate limit: free=1/day, premium=unlimited)
> - Account deletion
> - XP/level is computed server-side during sync (client's optimistic value is overwritten)

- **How do we prevent XP manipulation?**

> **Answer:** The client sends habit completion events. The server computes XP from these events using the game rules. The client's `total_xp` is always overwritten by the server-computed value during sync. If a client sends a modified XP value, it's ignored — the server recomputes from the event log.

- **Do we need moderation for user-generated content?**

> **Answer:** For MVP, minimal moderation:
> - **Habit names:** No moderation. Only visible to the user and their party. If a party member has an offensive habit name, the party leader can kick them.
> - **Party names:** Basic profanity filter (a word list check). Applied on creation.
> - **Whisper messages:** Basic profanity filter + max 100 characters. Since they're anonymous and short, abuse risk is low.
> - **Character names:** Basic profanity filter on creation.
>
> Post-MVP: Add a "Report" button on whispers and party members.

---

# 12. Privacy & Compliance

- **How do we implement export data?**

> **Answer:** A "Download My Data" button in G.4 triggers a Supabase Edge Function that:
> 1. Queries all user data (character, habits, events, dreams, whispers received)
> 2. Packages it as a JSON file
> 3. Uploads to Supabase Storage with a temporary signed URL (expires in 24 hours)
> 4. Returns the download link to the client
>
> The export includes all data EXCEPT: other users' data, server-side computed state (can be recomputed), and internal metadata (analytics events).

- **How do we implement delete account?**

> **Answer:** A "Delete Account" button in G.4 (behind a confirmation dialog: "This will permanently delete your Level 12 Warrior and all progress. This cannot be undone."):
> 1. Client calls a Supabase Edge Function
> 2. Edge Function soft-deletes the user (sets `deleted_at`, anonymizes PII)
> 3. A scheduled job hard-deletes all user data after 30 days (grace period for accidental deletion)
> 4. During the 30-day grace period, the user can contact support to recover
> 5. After hard-delete: all habit_events, character data, party memberships, whispers, and generated images are permanently removed

- **What minimal GDPR-like compliance steps are required?**

> **Answer:**
> 1. **Privacy Policy** — required for both App Store and Play Store. Describe what data you collect and why.
> 2. **Data export** — implemented above.
> 3. **Account deletion** — implemented above. Apple requires this for all apps since 2022.
> 4. **Consent for notifications** — iOS requires permission prompt. Use the first dream notification as the trigger: "Your character dreams at night. Allow notifications to see what they dreamed?"
> 5. **Minimal data collection** — QuestHabit only needs: email (from social auth), timezone, and habit data. No contacts, no location, no device identifiers.

- **What personal data do we store?**

> **Answer:**
> - Email (from Google/Apple auth)
> - Display name (user-provided)
> - Timezone (detected from device)
> - Character data (name, class, stats, gear)
> - Habit data (names, frequencies, completions)
> - Party memberships
> - Whisper messages (sent and received, anonymous)
> - Dream history
> - Subscription status
>
> We do NOT store: location, contacts, photos, browsing history, device identifiers, or any third-party tracking data.

- **Are generated images considered personal data?**

> **Answer:** Under GDPR, AI-generated images tied to a user account are considered personal data because they're associated with an identifiable individual. They must be included in data exports and deleted when the account is deleted. For the keyword-mapped icons (MVP), they're generic assets — not personal data.
