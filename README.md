# QuestHabit

QuestHabit is a mobile habit-building RPG built with Expo and React Native. Instead of checkboxes, streak tables, and productivity dashboards, the app turns real-life habits into story-driven encounters on a daily quest path. Players begin inside a 90-second playable prologue, choose a class, set their first real-world quests, and level up a character by following through in real life.

The core product idea is simple: your life is the game. QuestHabit is not meant to feel like a task manager with XP pasted on top. It is designed as a game first, where progress, gear, atmosphere, and narrative all respond to what the player actually does outside the app.

## What Makes QuestHabit Different

- Playable onboarding instead of a signup wall
- Narrative quest encounters instead of checkbox habit lists
- RPG progression through XP, levels, stats, and gear
- Failure framed as story content, not shame or punishment
- Delayed authentication: play first, save later

## Current Status

The project is in active development and currently follows the roadmap in [docs/implementation-phases.md](docs/implementation-phases.md).

Completed so far:

- Foundation and project setup
- Playable prologue onboarding flow
- Daily core loop and quest path experience
- Character profile, stats, XP, and gear system

Current focus:

- Phase 5: Authentication using the "Play First, Save Later" model

## Tech Stack

- Expo
- React Native
- TypeScript
- Expo Router
- NativeWind
- Zustand
- TanStack Query
- Supabase
- React Native Reanimated
- Moti

## Key Product References

- [docs/product-bible-v4.md](docs/product-bible-v4.md): product vision, narrative framing, and feature rationale
- [docs/uizard-prompts-v2.md](docs/uizard-prompts-v2.md): screen-by-screen UX and UI descriptions
- [docs/implementation-phases.md](docs/implementation-phases.md): development roadmap and phase tracking
- [designs/](designs): visual references for the intended art direction

## Repository Structure

- `src/app/`: Expo Router screens for the prologue and tabbed app
- `src/components/`: reusable UI and feature components
- `src/stores/`: Zustand stores for client state
- `src/hooks/`: app hooks for auth, daily reset, and related flows
- `src/lib/`: game rules, assets, auth, and Supabase helpers
- `docs/`: product, design, and implementation documentation

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables for Supabase:

```bash
EXPO_PUBLIC_SUPABASE_URL=your-project-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3. Start the Expo development server:

```bash
npx expo start
```

Useful commands:

- `npx expo start --clear`
- `npx expo start --ios`
- `npx expo start --android`
- `npx supabase start`

Note: the app can boot with fallback Supabase values for local UI work, but authentication and cloud sync features require valid environment variables.

## Development Notes

- This project should feel like a game, not a productivity app
- Habit interactions are framed as narrative encounters, not checklist actions
- Authentication is intentionally delayed until the player already has progress worth saving
- Design images are references, not final specs; the docs remain the source of truth
