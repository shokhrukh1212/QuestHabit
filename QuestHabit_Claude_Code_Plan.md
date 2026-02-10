# QuestHabit — Claude Code Implementation Plan

## Your Situation Right Now

You have:
- ✅ **Product Bible v4.0** — full app description, 15 parts, ~55 screens
- ✅ **Uizard Prompts v2.0** — all 56 detailed prompts used to generate designs
- ✅ **73 design images** — every screen designed in Uizard, named by screen ID
- ✅ **questions.md** — your open questions (create this yourself)

You need:
- 🎯 A workspace structure that Claude Code can navigate efficiently
- 🎯 A tech stack decision
- 🎯 A phased implementation plan
- 🎯 Clear instructions so Claude Code builds the RIGHT thing

---

## TECH STACK RECOMMENDATION

### Frontend: **Expo + React Native (TypeScript)**

**Why Expo over bare React Native:**
- You're a solo developer. Expo eliminates native build complexity (no Xcode/Android Studio wrestling).
- EAS (Expo Application Services) handles cloud builds, OTA updates, and app store submissions.
- Expo Router for file-based routing (similar to Next.js, which you already know).
- Expo Go for instant testing on your phone without building.
- In 2026, Expo is production-ready — Discord, Shopify, and thousands of top apps use it.
- You can always "eject" later if you need custom native modules.

### Backend: **Supabase**

**Why Supabase over Firebase:**
- PostgreSQL underneath — real relational database, not a document store. QuestHabit has deeply relational data (users → characters → habits → stats → parties → boss fights).
- Row Level Security (RLS) — security policies built into the database. You write them once and the API is automatically secured.
- Realtime subscriptions — perfect for boss fight HP bars updating live, party activity feeds, whisper notifications.
- Auth with Google/Apple social login — one-tap auth exactly as the Product Bible describes.
- Edge Functions for server-side logic (dream generation, shadow calculations, matchmaking for whispers).
- Storage for pixel-art assets and shareable images.
- Generous free tier ($0/month for up to 50,000 monthly active users).
- Official Expo + Supabase integration with excellent docs.

### Animation: **React Native Reanimated + Moti**

**Why:**
- QuestHabit is animation-heavy (gate explosions, level up celebrations, path walking, dream sequences).
- Reanimated runs animations on the native thread — 60fps even during heavy JS work.
- Moti provides declarative animation components that work with Reanimated.
- You already know Framer Motion — Moti has a very similar API.

### State Management: **Zustand + React Query (TanStack Query)**

**Why:**
- Zustand for client state (current screen, animation state, UI state). Lightweight, TypeScript-first.
- TanStack Query for server state (habits, character data, party data from Supabase). Handles caching, refetching, optimistic updates.
- No Redux boilerplate. Clean, minimal, performant.

### Navigation: **Expo Router (file-based)**

**Why:**
- File-based routing like Next.js — you already know this pattern.
- Deep linking support built-in (needed for party invite links, Telegram shares).
- Type-safe routes with TypeScript.

### Pixel Art Rendering: **expo-image + custom sprite components**

**Why:**
- Pixel art assets are static images, not real-time 3D. No game engine needed.
- expo-image for optimized image loading with caching.
- Custom animated sprite components using Reanimated for character animations.
- Consider react-native-skia ONLY if you need procedural pixel-art generation (for the Alive World, Legacy Tree).

### Additional Libraries:
- **NativeWind** (Tailwind for React Native) — you like Tailwind, this brings it to mobile
- **expo-notifications** — push notifications for quest reminders, dream alerts
- **expo-secure-store** — secure token storage
- **expo-sharing** + **react-native-view-shot** — screenshot sharing for Legacy Tree, boss victories
- **expo-local-authentication** — biometric auth support
- **date-fns** — date manipulation for streaks, daily resets

---

## WORKSPACE STRUCTURE FOR CLAUDE CODE

This is the folder structure you should set up BEFORE giving Claude Code any tasks.

```
questhabit/
├── CLAUDE.md                    # ⭐ Master instructions for Claude Code
├── docs/
│   ├── product-bible-v4.md      # Full app description (converted from docx)
│   ├── uizard-prompts-v2.md     # All screen prompts (converted from docx)
│   ├── questions.md             # Your open questions
│   ├── database-schema.md       # Will be generated during planning
│   ├── api-design.md            # Will be generated during planning
│   └── implementation-phases.md # Will be generated during planning
├── designs/                     # All 73 Uizard design images
│   ├── P1-cave-awakening.png
│   ├── P2-character-mirror.png
│   ├── P3-path-fork.png
│   ├── ...
│   └── LT2-tree-share.png
├── assets/                      # Pixel art assets (sprites, icons, backgrounds)
│   ├── characters/
│   ├── encounters/
│   ├── world/
│   └── ui/
├── src/                         # App source code (Expo Router structure)
│   ├── app/                     # File-based routes (Expo Router)
│   │   ├── _layout.tsx          # Root layout
│   │   ├── (auth)/              # Auth-gated routes
│   │   ├── (prologue)/          # Prologue flow
│   │   ├── (tabs)/              # Main tab navigation
│   │   │   ├── quest-path.tsx
│   │   │   ├── character.tsx
│   │   │   ├── world-map.tsx
│   │   │   ├── party.tsx
│   │   │   └── settings.tsx
│   │   └── index.tsx
│   ├── components/              # Reusable UI components
│   │   ├── ui/                  # Generic UI (buttons, cards, modals)
│   │   ├── character/           # Character-related components
│   │   ├── quest-path/          # Quest path components
│   │   ├── world/               # World map components
│   │   ├── party/               # Party/social components
│   │   └── animations/          # Shared animation components
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Utilities, Supabase client, helpers
│   │   ├── supabase.ts
│   │   ├── game-engine.ts       # XP calculation, stat growth, dream generation
│   │   └── constants.ts
│   ├── stores/                  # Zustand stores
│   │   ├── auth-store.ts
│   │   ├── character-store.ts
│   │   ├── quest-store.ts
│   │   └── game-store.ts
│   └── types/                   # TypeScript type definitions
│       ├── database.ts          # Supabase generated types
│       ├── game.ts              # Game logic types
│       └── navigation.ts        # Route types
├── supabase/                    # Supabase project files
│   ├── migrations/              # Database migrations (SQL)
│   ├── functions/               # Edge Functions (Deno/TypeScript)
│   └── seed.sql                 # Seed data for development
├── app.json                     # Expo config
├── package.json
├── tsconfig.json
└── tailwind.config.js           # NativeWind config
```

---

## THE CLAUDE.md FILE — THIS IS THE KEY

The `CLAUDE.md` file is what Claude Code reads at the start of every session. It's the single most important file in your project. Here's exactly what it should contain:

```markdown
# CLAUDE.md — QuestHabit Development Instructions

## Project Overview
QuestHabit is a mobile app (iOS + Android) that disguises habit tracking as a
pixel-art RPG adventure. See `docs/product-bible-v4.md` for the complete
product description.

## Tech Stack
- **Frontend:** Expo + React Native + TypeScript
- **Backend:** Supabase (PostgreSQL + Auth + Realtime + Edge Functions)
- **Navigation:** Expo Router (file-based routing)
- **Styling:** NativeWind (Tailwind CSS for React Native)
- **Animation:** React Native Reanimated + Moti
- **State:** Zustand (client) + TanStack Query (server)

## Design Reference
- All screen designs are in `/designs/` as PNG images.
- Screen IDs match the Product Bible (P.1, D.1, C.1, etc.).
- The Uizard prompts in `docs/uizard-prompts-v2.md` describe each screen
  in detail including exact text content, layout, colors, and interactions.

## Key Design Tokens
- Background: #0D0D1A
- Card: #1A1A2E
- Accent Purple: #6C5CE7
- Gold: #F4A261
- Success Green: #2ECC71
- Error Red: #E74C3C
- Text Primary: #FFFFFF
- Text Muted: #7F8C8D
- Font: System default (no custom fonts for MVP)

## Code Standards
- TypeScript strict mode. No `any` types.
- Functional components only. No class components.
- Use Zustand for client state, TanStack Query for server state.
- All Supabase queries go through custom hooks in `/src/hooks/`.
- Component files use PascalCase. Utility files use kebab-case.
- Every component that renders a design screen should reference its
  design image ID in a comment at the top of the file.
- Use NativeWind (Tailwind) classes for styling. Avoid inline StyleSheet
  unless needed for dynamic/animated styles.

## Implementation Order
Follow the phases in `docs/implementation-phases.md`.
Current phase: [UPDATE THIS AS YOU PROGRESS]

## Important Product Rules
1. The app must FEEL like a game, not a productivity tool.
2. Button copy uses RPG language ("I conquered it!" not "Mark as done").
3. Failure is NEVER punished with shame. It creates story content (Shadow
   grows, character sits alone, but the message is always "onward").
4. Authentication is DELAYED. Users play the full Prologue and get to
   Level 2 before seeing any signup prompt.
5. All habit interactions happen through narrative encounters, not
   checkboxes.

## Commands
- `npx expo start` — Start dev server
- `npx expo start --clear` — Start with cleared cache
- `npx supabase start` — Start local Supabase
- `npx supabase db push` — Push migrations to remote
- `npx supabase gen types typescript --local > src/types/database.ts`
  — Regenerate TypeScript types from database schema
```

---

## HOW TO WORK WITH CLAUDE CODE — SESSION STRATEGY

### The Wrong Way
> "Build the entire QuestHabit app"

This will produce garbage. Too much context, too many decisions at once.

### The Right Way — Focused Sessions

Each Claude Code session should focus on ONE specific, bounded task. Here's how to structure your sessions:

### Session Template:
```
Context: Read CLAUDE.md, docs/product-bible-v4.md (Part X), 
         and look at designs/[relevant-screen].png

Task: [Specific, bounded task]

Constraints: [Any specific requirements]

Output: [What files should be created/modified]
```

### Example Session Flow:

**Session 1:** "Set up the Expo project with all dependencies, configure NativeWind, create the file structure, and set up Supabase client."

**Session 2:** "Design the Supabase database schema for the core game loop: users, characters, habits, daily_completions, and streaks. Write the migration SQL. Read docs/product-bible-v4.md Parts 1-4 for requirements."

**Session 3:** "Build the Prologue flow screens P.1 through P.3 (Cave Awakening, Character Mirror, Path Fork). Reference designs/P1-*.png, designs/P2-*.png, designs/P3-*.png. Read docs/uizard-prompts-v2.md for the detailed descriptions of each screen."

**Session 4:** "Build screens P.4 through P.7 (habit-setting obstacles and cave exit). These screens need text input components styled as stone tablets, frequency pickers, and the dramatic cave-to-world transition."

...and so on, screen by screen or feature by feature.

---

## IMPLEMENTATION PHASES (FOR implementation-phases.md)

### Phase 1: Foundation (Week 1-2)
**Goal: Project setup + database + core navigation**
- [ ] Initialize Expo project with TypeScript
- [ ] Install and configure all dependencies
- [ ] Set up NativeWind (Tailwind)
- [ ] Set up Supabase project (local + remote)
- [ ] Design and create database schema (users, characters, habits, completions, streaks)
- [ ] Set up Expo Router with tab navigation structure
- [ ] Create base UI components (buttons, cards, modals, RPG dialogue box)
- [ ] Create design token constants (colors, spacing, typography)
- [ ] Set up Zustand stores (auth, character, quest)
- [ ] Set up TanStack Query with Supabase

### Phase 2: The Prologue (Week 2-3)
**Goal: First-time user experience — 90-second playable onboarding**
- [ ] P.1 Cave Awakening screen
- [ ] P.2 Character Mirror (character creation)
- [ ] P.3 Path Fork (class selection)
- [ ] P.4-P.6 Habit setting obstacles (3 screens)
- [ ] P.7 Cave Exit / World Reveal
- [ ] Local storage for anonymous play (no auth required)
- [ ] Prologue → Quest Path transition logic

### Phase 3: Daily Core Loop (Week 3-5)
**Goal: The screen users see every day**
- [ ] D.1 Quest Path (the main daily screen — MOST IMPORTANT)
- [ ] D.2 Encounter Tap (habit confirmation modal)
- [ ] D.3 Completion Animation
- [ ] D.4 Missed Habit (mid-path night scene)
- [ ] D.5 Daily Summary
- [ ] D.6 Campfire Celebration (perfect day)
- [ ] XP calculation engine
- [ ] Streak tracking logic
- [ ] Daily reset logic (midnight local time)
- [ ] Push notifications for quest reminders

### Phase 4: Character System (Week 5-6)
**Goal: RPG character progression**
- [ ] C.1 Character Profile screen
- [ ] C.2 Inventory / Gear Grid
- [ ] C.3 Level Up Celebration (full-screen)
- [ ] C.4 Stat Detail drill-down
- [ ] Stat growth calculations (habits → stats)
- [ ] Gear system (equip/unequip, rarity, stat bonuses)
- [ ] Level progression curve (XP thresholds)

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

---

## YOUR questions.md TEMPLATE

Create this file and fill in YOUR questions. Here's a starting structure:

```markdown
# QuestHabit — Open Questions

## Tech Questions
- [Your questions about tech choices, libraries, etc.]

## Product Questions
- [Your questions about features, prioritization, etc.]

## Design Questions
- [Your questions about the designs, animations, etc.]

## Business Questions
- [Your questions about monetization, launch strategy, etc.]

## Claude Code Questions
- [Your questions about how to work with Claude Code effectively]
```

---

## CRITICAL TIPS FOR CLAUDE CODE SUCCESS

### 1. Always reference designs
When asking Claude Code to build a screen, tell it to LOOK at the design image:
> "Build the Quest Path screen (D.1). Look at designs/D1-quest-path.png for the visual reference. Read the D.1 prompt in docs/uizard-prompts-v2.md for detailed element descriptions."

### 2. Build screens in dependency order
Don't build the Shadow Duel before you have the Character system. Follow the phases.

### 3. Test each phase before moving on
After each phase, test everything on your phone with Expo Go. Fix bugs before adding more complexity.

### 4. Keep CLAUDE.md updated
After each session, update the "Current phase" line in CLAUDE.md so Claude Code always knows where you are.

### 5. One feature per session
Don't ask Claude Code to build 5 screens at once. Build 1-2 screens per session, test them, then move on.

### 6. Commit after every working session
Use git. Commit after every session that produces working code. Claude Code can break things — you need to be able to roll back.

### 7. Use Claude Code for database design early
The database schema is the foundation. Get it right in Phase 1. Have Claude Code generate the full migration SQL and review it carefully before moving on.

### 8. Pixel art assets are separate work
Claude Code can't generate pixel art. You'll need to source these separately (commission an artist, use asset packs, or generate with AI image tools). Plan for placeholder images during development.
