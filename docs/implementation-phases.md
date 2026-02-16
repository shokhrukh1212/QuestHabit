## IMPLEMENTATION PHASES (FOR implementation-phases.md)

### Phase 1: Foundation (Week 1-2) ✅ COMPLETE

**Goal: Project setup + database + core navigation**

- [x] Initialize Expo project with TypeScript
- [x] Install and configure all dependencies
- [x] Set up NativeWind (Tailwind)
- [x] Set up Supabase project (local + remote)
- [x] Design and create database schema (users, characters, habits, completions, streaks)
- [x] Set up Expo Router with tab navigation structure
- [x] Create base UI components (buttons, cards, modals, RPG dialogue box)
- [x] Create design token constants (colors, spacing, typography)
- [x] Set up Zustand stores (auth, character, quest)
- [x] Set up TanStack Query with Supabase

### Phase 2: The Prologue (Week 2-3) ✅ COMPLETE

**Goal: First-time user experience — 90-second playable onboarding**

- [x] P.1 Cave Awakening screen
- [x] P.2 Character Mirror (character creation)
- [x] P.3 Path Fork (class selection)
- [x] P.4-P.6 Habit setting obstacles (3 screens)
- [x] P.7 Cave Exit / World Reveal
- [x] Local storage for anonymous play (no auth required)
- [x] Prologue → Quest Path transition logic

### Phase 3: Daily Core Loop (Week 3-5) ✅ COMPLETE

**Goal: The screen users see every day**

- [x] D.1 Quest Path (the main daily screen — MOST IMPORTANT)
- [x] D.2 Encounter Tap (habit confirmation modal)
- [x] D.3 Completion Animation
- [x] D.4 Missed Habit (mid-path night scene)
- [x] D.5 Daily Summary
- [x] D.6 Campfire Celebration (perfect day)
- [x] XP calculation engine
- [x] Streak tracking logic
- [x] Daily reset logic (midnight local time)
- [ ] Push notifications for quest reminders

### Phase 4: Character System (Week 5-6) ✅ COMPLETE

**Goal: RPG character progression**

- [x] C.1 Character Profile screen
- [x] C.2 Inventory / Gear Grid
- [x] C.3 Level Up Celebration (full-screen)
- [x] C.4 Stat Detail drill-down
- [x] Stat growth calculations (habits → stats)
- [x] Gear system (equip/unequip, rarity, stat bonuses)
- [x] Level progression curve (XP thresholds)

### Phase 5: Authentication (Week 6-7)

**Goal: Play First, Save Later auth model**

- [ ] A.1 Save Prompt (post Level-Up trigger)
- [ ] A.2 Feature-Gated Auth (contextual prompts)
- [ ] A.3 Urgency Nudge (Day 5+ inline card)
- [ ] A.4 Profile Tab guest state
- [ ] Supabase Auth with Google + Apple social login
- [ ] Anonymous → authenticated user migration
- [ ] Cloud sync of local progress after auth

### Phase 6: Alive World (Week 7-8)

**Goal: Evolving home base and world map**

- [ ] W.1 Home Base View (progressive evolution states)
- [ ] W.2 World Map (zones, Shadow position, Rift portals)
- [ ] W.3 Zone Detail cards
- [ ] Home base evolution logic (consistency → base level)
- [ ] Pixel art assets for base states (campfire → cabin → fortress)

### Phase 7: Dream Engine + Shadow Self (Week 8-10)

**Goal: Between-session engagement + failure-as-content**

- [ ] DE.1-DE.4 Dream Engine screens (sequence, card, journal, detail)
- [ ] Dream generation logic (Supabase Edge Function)
- [ ] SS.1-SS.3 Shadow Self screens (map overlay, duel, forge)
- [ ] Shadow strength calculation (missed habits → shadow power)
- [ ] Monthly Shadow Duel auto-battle logic
- [ ] Shadow Shard crafting system

### Phase 8: Party & Social (Week 10-12)

**Goal: Social accountability through gameplay**

- [ ] S.1-S.6 Party screens (dashboard, create, join, boss fight, victory, leaderboard)
- [ ] Party invite system (deep links, Telegram/WhatsApp sharing)
- [ ] Weekly boss fight mechanics (collective damage calculation)
- [ ] Real-time boss HP updates (Supabase Realtime)
- [ ] Activity feed

### Phase 9: Oath System + Whisper Network (Week 12-13)

**Goal: Deep social mechanics**

- [ ] OA.1-OA.3 Oath screens (setup, ceremony, progress)
- [ ] Oath tracking logic and broken oath consequences
- [ ] WN.1-WN.2 Whisper screens (compose, Whisper Stone)
- [ ] Whisper matchmaking (Supabase Edge Function)
- [ ] Anonymous message delivery

### Phase 10: Time Rifts + Habit Fusion (Week 13-15)

**Goal: Content systems for long-term retention**

- [ ] TR.1-TR.3 Time Rift screens (portal, interior, rewards)
- [ ] Rift event system (create, schedule, track)
- [ ] Community Rift global progress tracking
- [ ] HF.1-HF.3 Habit Fusion screens (discovery, ceremony, detail)
- [ ] Fusion detection logic (21-day co-completion tracking)
- [ ] Fusion break logic (7-day miss detection)

### Phase 11: Legacy Tree (Week 15-16)

**Goal: Long-term visual journey**

- [ ] LT.1 Legacy Tree View (procedural pixel-art tree)
- [ ] LT.2 Tree Share / Export
- [ ] Tree growth algorithm (habits → branches, streaks → flowers)
- [ ] Scar system (abandoned habits → bare branches → ivy on restart)
- [ ] Shareable image generation

### Phase 12: Settings + Monetization + Polish (Week 16-18)

**Goal: Production-ready**

- [ ] G.1-G.4 Settings screens
- [ ] G.3 Premium paywall (RevenueCat integration)
- [ ] Cosmetic shop implementation
- [ ] Performance optimization
- [ ] Error handling and edge cases
- [ ] App store assets (screenshots, descriptions)
- [ ] EAS Build configuration for iOS + Android
- [ ] TestFlight / Internal testing
