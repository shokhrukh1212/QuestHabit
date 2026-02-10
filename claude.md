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

### Source of Truth (priority order)
1. **`docs/product-bible-v4.md`** — Product vision, narrative framing, user
   stories, and feature rationale. Explains WHY each screen exists and how
   it fits the core philosophy ("real life as the controller").
2. **`docs/uizard-prompts-v2.md`** — Detailed textual descriptions of every
   screen: layout, elements, colors, interactions, exact copy, and animation
   specs. The most granular design specification.
3. **`/designs/*.png`** — AI-generated reference images. Visual direction
   only — NOT pixel-perfect specs.

### Design images are references, not specs
The PNG images in `/designs/` were generated with AI tools (Uizard). They
provide a visual baseline but often miss nuanced product requirements. When
implementing any screen:
- Read the corresponding uizard prompt for layout structure.
- Read the product bible for narrative intent and emotional goals.
- View the design image for visual direction.
- **Always try to do better.** Improve layouts, interactions, spacing,
  animations, and atmosphere beyond what the AI image shows. You have full
  context from the docs to make informed design decisions.

### File naming conventions
- Screen ID titles match the Product Bible (for example, there is "P.3 Path Fork (Class Selection)"
  P.3 is the ID, and "Path Fork (Class Selection)" is the ID title, and its UI image is
  Path Fork (Class Selection).png, and there is "D.6 All Quests Done (Campfire Celebration)"
  D.6 is the ID, and "All Quests Done (Campfire Celebration)" is the ID title, and its UI image is
  All Quests Done (Campfire Celebration).png)

  Notes:
  Sometimes, the sign (-) is converted to the sign (/).
  and there are some pngs that has [name] (alternative_1 or alternative_2).png
  and this UI is the alternative image of [name].png

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

## Expo / React Native Gotchas

- **Always use `npx expo install`** for packages with native modules
  (e.g. react-native-reanimated, react-native-worklets, expo-image).
  Never `npm install` — Expo Go bundles specific native versions and the
  JS side must match exactly.
- **Always wrap the app with `<SafeAreaProvider>`** from
  `react-native-safe-area-context` in the root layout. Never import
  `SafeAreaView` from `react-native` (deprecated). Always use
  `SafeAreaView` from `react-native-safe-area-context`.
- **`--legacy-peer-deps`** is needed for NativeWind v4 installs but
  skips automatic peer dependency resolution. After using it, manually
  verify all peer deps are installed.

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

---

## Git Workflow Rules (MANDATORY)

Claude must follow these Git rules strictly.

### Branching Strategy

- Never work directly on `main`.
- Create a new branch for each feature or task.
- Branch naming format:

  feature/<short-description>
  fix/<short-description>
  chore/<short-description>

Example:
feature/d1-quest-path-screen
fix/boss-hp-desync
chore/refactor-state-hooks

### One Feature Per Session

- Each development session must focus on ONE clearly defined feature.
- Do not mix multiple features in one branch.
- If scope expands, stop and create a new branch.

### Commit Rules

- Commit after every working milestone.
- A “working milestone” means:

  - Code compiles
  - No TypeScript errors
  - App runs without crashing
  - Feature works as expected

- Never leave uncommitted changes before ending a session.

### Commit Message Format

Use Conventional Commits format:

feat: add D1 quest path screen
fix: correct XP calculation rounding
refactor: extract boss hp hook
chore: update supabase types
style: adjust nativewind classes
docs: update implementation phase

Commit messages must:

- Be concise
- Describe WHAT changed
- Not describe the whole session story

### Before Every Commit

Claude must ensure:

- `npx tsc --noEmit` passes
- No ESLint errors
- App builds and runs
- No unused imports
- No console.log left in production code

### Pulling & Rebasing

- Always pull latest `main` before starting a new branch.
- Rebase feature branches before merging.
- Avoid merge commits unless necessary.

### Merging

- Only merge when:
  - Feature is complete
  - Code is clean
  - No TODOs remain (unless intentional and documented)
- Delete branch after merge.

### Supabase Schema Changes

If database schema changes:

1. Create migration file.
2. Run:
   npx supabase gen types typescript --local > src/types/database.ts
3. Commit both migration and updated types together.

### Large Refactors

For refactors touching multiple modules:

- Create a separate `refactor/` branch.
- Do NOT mix with feature work.
- Keep commits small and incremental.

### Emergency Rule

If something breaks:

- Stop adding features.
- Create fix/<description> branch.
- Resolve the issue.
- Merge back into main.

Claude must treat Git discipline as part of the architecture.

---

## Implementation Order

Follow the phases in `docs/implementation-phases.md`.
Current phase: Phase 2 — The Prologue (7-screen onboarding)

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

<claude-mem-context>
# Recent Activity

<!-- This section is auto-generated by claude-mem. Edit content outside the tags. -->

_No recent activity_
</claude-mem-context>
