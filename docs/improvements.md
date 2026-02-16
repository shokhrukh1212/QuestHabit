# QuestHabit UI/UX Improvements Plan

> After reviewing all 14 current UI screenshots, the full codebase (Phases 1-3), and the product bible,
> here's what needs to change to make this app **feel like a game** instead of a dark-themed form app.

### Asset & Code Reference Quick Guide

| Asset | Path | Size | Notes |
|-------|------|------|-------|
| Scene images (13) | `assets/images/scenes/*.webp` | Various (see below) | Loaded via `sceneImages` in `src/lib/assets.ts` |
| Icon images (5) | `assets/images/icons/*.png` | 256×256 | Loaded via `iconImages` in `src/lib/assets.ts` |
| Hairstyle icons (6) | `assets/hairystyles/*.png` | 128×128 | **NEW** — not yet wired into `src/lib/assets.ts` |
| Prologue screens | `src/app/(prologue)/*.tsx` | — | 7 screens: cave-awakening → cave-exit |
| Daily loop screen | `src/app/(tabs)/quest-path.tsx` | — | Main daily screen |
| Quest waypoints | `src/components/quest/QuestWaypointNode.tsx` | — | 56px circle nodes |
| Encounter modal | `src/components/encounter/EncounterModal.tsx` | — | Habit completion prompt |
| Celebration | `src/components/encounter/CompletionCelebration.tsx` | — | Auto-dismiss reward screen |
| Character banner | `src/components/ui/CharacterBanner.tsx` | — | Top bar: avatar, level, XP |
| Narrative text | `src/lib/narrative-text.ts` | — | Maps habit categories → RPG encounters |
| Habit store | `src/stores/habit-store.ts` | — | Event-sourced habit state |
| Character store | `src/stores/character-store.ts` | — | XP, level, stats, appearance |

---

## The Core Problem

The product bible says: "This isn't a to-do list with points. This is a game where you are the controller."

Right now, the app **looks and feels like a dark-themed form app with pixel art images dropped in**. The images are beautiful, but they're just rectangles floating in empty black space. There's no atmosphere, no immersion, no sense that you're *inside* a world.

---

## SECTION 1: PROLOGUE (Screens 1-7)

### 1.1 Cave Awakening (Screenshot 1) — NEEDS MAJOR REWORK

**Current state:** A small pixel-art image (280x200) floating in the center of a giant black screen. Dialogue box below. "Tap to stand up" button at bottom. Feels like a loading screen, not a game opening.

**Problems:**
- The scene image is tiny — a 280x200 rectangle in the center of a 390x844 phone screen. That's ~17% of the screen. The remaining 83% is empty black space.
- No atmosphere. No ambient effects. Just an image and text.
- The breathing animation (scale 0.95 to 1.05) is barely noticeable.
- The transition from this screen to Character Mirror is instant (router.push) — no cinematic feel.

**Asset update:** Cave Awakening image has been resized from 1200×800 (landscape) to **1024×1024 (square)** at `assets/images/scenes/Cave Awakening.webp`. Square format crops evenly on portrait phones with `contentFit="cover"`, unlike the old landscape version which lost ~70% to side-cropping. Ready for full-screen use.

**Improvements:**
1. **Make the scene image fill the entire screen** — use `contentFit="cover"` with the image taking the full viewport height. The cave should engulf the user. This is the most impactful single change. The image is now 1024×1024 and optimized for this.
2. **Layer the dialogue box ON TOP of the scene** — position it absolutely at the bottom 30% of the screen. Use a gradient overlay (transparent → black) from 50% screen height down so text is readable against the scene.
3. **Add ambient particle effects** — small floating dust motes or faint purple sparkles using Reanimated. Even 5-10 small animated dots create atmosphere.
4. **Add a subtle screen shake/rumble** when the user taps "stand up" — feels like the cave is responding.
5. **Fade-to-black transition** before navigating to character-mirror. The current instant `router.push` breaks immersion entirely.

### 1.2 Character Mirror (Screenshot 2) — NEEDS LAYOUT FIX

**Current state:** Mirror image is medium-sized in an oval frame. Skin tone, hair style, hair color pickers below. Huge empty gap between hair style and hair color sections. Emojis used for hair styles.

**Problems:**
- The emoji hair styles (👩, 👨, 👸 etc.) look completely out of place in a pixel-art RPG. They break the visual language instantly.
- Massive dead space between the Hair Style and Hair Color sections. Looks like a layout bug.
- The mirror image doesn't change based on selections — it's a static pixel art scene. This defeats the "magic mirror" narrative.
- Section labels ("SKIN TONE", "HAIR STYLE", "HAIR COLOR") use app-style uppercase labels. Should feel like a mystical mirror, not a form.
- No narrative framing visible — the "Who are you? What do you look like?" text is at the top but feels disconnected from the mirror.

**Asset update:** 6 pixel-art hairstyle icons (128×128, transparent PNG) are now available at `assets/hairystyles/`:
- `Short Spiky.png`, `Medium Wavy.png`, `Long Straight.png`, `Buzz Cut.png`, `Ponytail.png`, `Braided.png`
- These need to be registered in `src/lib/assets.ts` (add a `hairstyleImages` export)
- In `src/app/(prologue)/character-mirror.tsx`: replace `HAIR_STYLES = ["🧑", "👩", "🧑‍🦱", "👩‍🦳", "🧑‍🦰", "👩‍🦲"]` array with Image components using the new icons
- The static mirror (not changing based on selections) is **intentional for MVP**

**Improvements:**
1. **Replace emoji hair styles with pixel-art icons** — the 6 icons are already generated (see asset update above). Wire them in to replace the emoji array in `character-mirror.tsx`.
2. **Fix the massive spacing gap** — the gap between Hair Style row and Hair Color section needs to be removed. Looks like a bug.
3. **Make the mirror image larger** — it should be the hero element. Push it up and make it take ~40% of the screen.
4. **Move dialogue text into an RPGDialogueBox** positioned between the mirror and the selectors, not above everything.
5. **Add a subtle glow/pulse to the mirror frame** that responds to selections — each selection should feel magical.
6. **Remove uppercase section labels** — use RPG-style descriptions: "Your skin" instead of "SKIN TONE", "Your hair" instead of "HAIR STYLE".

### 1.3 Path Fork / Class Selection (Screenshot 3) — NEEDS SPACING FIX

**Current state:** Four cave path images in a 2x2 grid. Dialogue text below. Four class buttons at the very bottom.

**Problems:**
- The 2x2 grid of path images is vertically centered too high, leaving a huge dead zone between the images and the dialogue text.
- The class buttons at the bottom are too small and cramped. They're the most important choice on the screen.
- No visual connection between tapping a class and its corresponding cave path image lighting up.
- The dialogue text is centered vertically but there's ~200px of empty space above and below it.

**Improvements:**
1. **Reduce dead space dramatically** — push the path images up, bring dialogue text closer, and give the class buttons more room.
2. **Make class buttons larger and more distinct** — each should have its class color glow (red/blue/green/gold), the class icon, and feel tappable.
3. **Add selection feedback** — when a class is tapped, its corresponding cave path image should glow/brighten while the others dim.
4. **Add class color accents** to each button border matching the cave path colors visible in the images.

### 1.4-1.6 Habit Setting Obstacles (Screenshots 4, 5, 6) — FUNCTIONAL BUT IMPROVABLE

**Current state:** Scene image at top. Dialogue box in lower portion. Text input. Frequency picker. Action button. Progress dots at bottom.

**Problems:**
- The text input field is a plain dark rectangle. The product bible says it should look like "a stone tablet being inscribed."
- The frequency options on P.6 (Siren/Discipline) changed to "Daily / Weekly / Monthly" while P.4-P.5 use "Daily / 5x/week / 4x/week / 3x/week". This inconsistency is confusing.
- Again, the scene images are floating rectangles in empty space instead of filling the atmosphere.
- The dialogue box border (purple) clashes slightly with the P.5 blue scene and P.6 red/purple scene.

**Improvements:**
1. **Make scene images larger or full-width** — these obstacles should feel imposing. The Iron Gate should tower over you.
2. **Style the text input as a stone tablet** — add a subtle texture/border treatment. Dark background with stone-colored (#3A3A5E) border, slightly different from the standard input.
3. **Standardize frequency options** across all three obstacles — use the same set on all three screens.
4. **Match the dialogue box accent color** to each obstacle's theme: red/gold for Gate, blue/cyan for Scroll, purple/red for Siren.
5. **Add a subtle parallax effect** where the scene image slightly moves as the user scrolls down to the input, creating depth.

### 1.7 Cave Exit (Screenshot 7) — LOOKS GREAT, MINOR TWEAKS

**Current state:** Beautiful full-screen cave exit landscape. "300 XP Earned" text overlay. Message and gold "Begin Your Journey" button at bottom.

**This is the best screen in the app.** The full-screen image creates immediate atmosphere. This proves that making images fill the screen works.

**Minor improvements:**
1. The "+300 XP Earned" text could have a larger, more dramatic entrance animation (scale up from small with gold particle burst).
2. Add a subtle camera pan effect — the image slowly pans from bottom to top over 3-4 seconds when the screen loads, revealing the landscape.
3. The "Begin Your Journey" button text is hard to read — dark text on a dark-ish gold button. Needs more contrast.

---

## SECTION 2: DAILY CORE LOOP (Screenshots 8-14)

### 2.1 Quest Path Main Screen (Screenshot 8) — NEEDS MAJOR REWORK

**Current state:** Character banner at top (avatar, Lv 2, XP bar, Day 1). Then a vast empty black area. In the middle, a horizontal scrollable path with character avatar, waypoint circles, and campfire. Then more empty space. "0/6 quests complete" at bottom. Tab bar.

**This is THE most important screen in the app. Users see it every day. And it's 80% empty black space.**

**Problems:**
- **No background landscape.** The product bible says: "The background is a daytime pixel-art landscape (hills, trees, sky)." There IS a Quest Path Background image in assets but it's not being used.
- **The waypoint labels show truncated habit names ("X", "H", "F")** — single letters that mean nothing. These should show the actual habit name or at least the encounter icon.
- **6 habits are crammed into a tiny horizontal scroll** — the icons are too small (56px circles) and the path connecting them is thin gray lines. Not a "winding dirt trail."
- **No campfire destination visual** — just a small icon.
- **The path is dead center vertically** with massive empty space above and below. Feels lifeless.
- **No sense of journey or progress** — the path is a flat horizontal line, not a winding trail.

**Improvements (HIGH PRIORITY — this is the daily screen):**
1. **Add the Quest Path Background image** as a full-screen background behind everything. This single change transforms the screen from "dark void" to "RPG landscape."
2. **Make the path vertical instead of horizontal** — vertical scrolling is more natural on mobile and allows for a longer, more dramatic path layout with the character at the top and campfire at the bottom (or vice versa).
3. **Show full habit names** under each waypoint, not truncated single letters.
4. **Make waypoint nodes larger** (72-80px) with more visual detail — the icon should be clearly visible.
5. **Add a winding/curved path** instead of straight lines between waypoints.
6. **Add a visual campfire destination** at the end that's larger and more prominent.
7. **Show the character "walking" animation** — even a simple bobbing movement near the first incomplete waypoint.
8. **Consider a vertical path layout** that fills the screen — character at the top, campfire at bottom, waypoints along a winding path in between. This uses the full screen instead of squeezing everything into one thin horizontal line.

### 2.2 Encounter Modal (Screenshot 9) — GOOD, MINOR POLISH

**Current state:** Dark overlay. Centered card with icon, narrative text, habit name, "I conquered it!" button, "Not yet" dismiss link.

**This is well-executed.** The narrative text is good, the RPG language is right, the button copy is correct.

**Minor improvements:**
1. **Add an entrance animation for the icon** — have it float down or pulse with energy before settling.
2. **Add subtle particle effects** around the icon (small glowing dots).
3. **Make "Not yet — I'll return" more visible** — currently quite muted. It's important users know they can dismiss.

### 2.3 Completion Celebrations (Screenshots 10, 12, 14) — GOOD CONCEPT, NEEDS POLISH

**Asset update:** Campfire Celebration image has been resized from 1200×800 (landscape) to **1024×1024 (square)** at `assets/images/scenes/Campfire Celebration.webp`. Better for full-screen cover display. The Campfire Celebration component is at `src/components/quest/CampfireCelebration.tsx`.

**Current state:** Black screen. "+50 XP" in large gold text floating up. Stat bonus and streak info. Scene image (Gate Shatter, Scroll Decipher, Siren Resist). XP bar at very bottom.

**Problems:**
- The celebration auto-dismisses after 2.5 seconds. This is too fast AND removes user control. What if someone wants to screenshot it? What if they want to savor the moment?
- The XP bar at the bottom is positioned with `position: absolute, bottom: 60` — might overlap with navigation on some devices.
- No tap-to-dismiss option — the user just has to wait.
- The scene images are centered but again are floating rectangles, not full-screen moments.

**Improvements:**
1. **Don't auto-dismiss.** Add a "Continue" button or "Tap to continue" that the user controls. 2.5 seconds is not enough to enjoy a dopamine hit. The user should choose when to move on.
2. **Make the scene image larger** — this is a moment of triumph. Fill more of the screen.
3. **Add a screen shake effect** on entry to make the "gate shattering" or "siren breaking" feel impactful.
4. **Add a "tap anywhere to continue" subtle text** at the bottom instead of auto-dismiss.

### 2.4 Quest Path After Completion (Screenshot 11) — WORKS BUT NEEDS POLISH

**Current state:** Same as the quest path but with one waypoint showing a green checkmark circle. "1/6 quests complete."

**Problems:**
- The completed waypoint loses its icon entirely and becomes a plain green circle with a white checkmark. This is the most boring possible completion state.
- The path line between character and completed waypoint should turn green, but it's using a thin barely-visible line.

**Improvements:**
1. **Keep the encounter icon visible** on completed waypoints — but add a green check badge in the corner, or overlay a green glow. The icon tells the user WHICH habit they completed.
2. **Make the green path line thicker and more visible** — it should be a satisfying "filled in" trail.
3. **Add a brief glow/sparkle effect** on the waypoint when returning from celebration.

### 2.5 Encounter Modal for Siren (Screenshot 13) — SAME AS 2.2

Same improvements as the general encounter modal above. ~~The siren icon has a white background that should be transparent.~~ **RESOLVED:** Siren icon has been re-exported with transparent background at `assets/images/icons/Siren Icon.png` (256×256).

---

## SECTION 3: CROSS-CUTTING IMPROVEMENTS

### 3.1 Animations — Too Subtle, Too Few

The app uses Moti animations but they're mostly basic fade-in and translate. For a game, we need:

1. **Screen transitions** — fades between screens instead of instant router pushes. At minimum, add cross-fade transitions in the prologue layout.
2. **XP counting animation** — when XP is earned, the banner XP bar should visibly animate filling up, not just snap to the new value.
3. **Waypoint completion animation** — when returning to quest path after completing a habit, the waypoint should animate from its active state to completed state (brief burst, then green).
4. **Haptic feedback** — use `expo-haptics` for button taps, completions, and celebrations. Physical feedback makes it feel like a game.

### 3.2 Typography — Needs a Pixel/RPG Font

The app uses system fonts everywhere. For an RPG game:

1. **Add a pixel-style or RPG-themed font** for headlines, XP text, level badges, and button labels. Keep system font for body text and dialogue for readability.
2. The "+50 XP" on completion screens especially needs a game-style font — system bold doesn't feel like a game reward.

### 3.3 Sound Effects — Zero Audio

Games need sound. Even minimal sound effects would transform the feel:

1. Habit completion — a satisfying "ding" or sword clash sound
2. XP earned — coin/chime sound
3. Level up — fanfare
4. Cave ambience during prologue
5. Button taps — subtle RPG menu click

This is a **nice-to-have** for later, but worth planning for.

### 3.4 Empty Tab Screens

The Hero, World, Party, and Settings tabs are empty placeholder screens (just a centered text label). While these are Phase 4+ features, users CAN tap to them now and see nothing.

**Improvement:** Add "Coming Soon" states with RPG-themed illustrations or silhouettes. Show a locked treasure chest with "This realm is not yet unlocked. Continue your quest..." or similar.

---

## SECTION 4: SPECIFIC CODE ISSUES

### 4.1 Waypoint Labels Showing Single Letters

In QuestWaypointNode, the habit name shows under the circle but it's limited to 2 lines at 11px in 80px width. This causes names like "Gym Workout" to truncate to just a letter or two on small screens.

**Fix:** Either increase the waypoint width, use the first word only, or show a tooltip on long-press.

### 4.2 Stat Bonus Incorrectly Applied

In `quest-path.tsx` line 106:
```ts
updateStats({ [statKey]: (character?.stats[statKey] ?? 5) + narrative.statBonus });
```
This REPLACES the stat with the new value instead of incrementing. If Strength is 10 and you complete a fitness habit (+2), it becomes 12. But if you complete TWO fitness habits, the second one reads `character.stats.strength` which is the PRE-update value from Zustand's perspective due to closure staling. Need to use the updater pattern.

### 4.3 Icon Background Issues — ✅ RESOLVED

The Siren Icon (screenshot 13 in encounter modal) showed a white background square around the icon. **Fixed:** The Siren Icon PNG has been re-exported with transparent background at `assets/images/icons/Siren Icon.png` (256×256). No code changes needed — the asset path hasn't changed.

### 4.4 Celebration Screen Has No User Control

`CompletionCelebration.tsx` auto-dismisses after 2500ms via `setTimeout`. This is a UX anti-pattern for a "reward moment." User should control when to proceed.

---

## PRIORITY ORDER

### P0 — Do These First (Biggest Impact)
1. **Quest Path background image** — add the already-existing background scene to the daily screen
2. **Make prologue scene images full-screen or much larger** — especially Cave Awakening
3. **Fix waypoint labels** — show actual habit names, not truncated letters
4. **Remove auto-dismiss on celebrations** — add tap/button to continue
5. **Fix the Character Mirror spacing bug** and replace emoji hair styles

### P1 — High Impact Polish
6. Add gradient overlays for text readability on full-screen images
7. Make quest path more visually interesting (larger waypoints, better path lines)
8. Add screen transition animations between prologue screens
9. Add haptic feedback on key interactions
10. Fix the stat update closure issue

### P2 — Nice to Have
11. Add particle effects to Cave Awakening and celebrations
12. Add a pixel/RPG font for game text (XP, levels, buttons)
13. Add "Coming Soon" states for empty tab screens
14. Style text inputs as stone tablets
15. Standardize frequency options across habit screens
16. ~~Fix Siren icon white background~~ ✅ DONE — re-exported with transparent bg

### P3 — Future Consideration
17. Vertical quest path layout
18. Sound effects system
19. Walking character animation on quest path
20. Parallax effects on prologue screens

---

## ASSET INVENTORY (Current State)

All scene images use `.webp` format. All icons use `.png` format.

### Scene Images — `assets/images/scenes/`

| File | Dimensions | Display Mode | Notes |
|------|-----------|-------------|-------|
| Cave Awakening.webp | 1024×1024 | Full-screen cover | **Resized** from 1200×800. Ready for full-screen. |
| Character Mirror.webp | 1200×800 | Contained (inside mirror frame) | Keep as-is |
| Path Fork.webp | 1200×800 | Contained (2×2 grid) | Keep as-is |
| Iron Gate.webp | 1200×800 | Contained (upper portion) | Keep as-is |
| Scroll Pedestal.webp | 1200×800 | Contained (upper portion) | Keep as-is |
| Shadow Siren.webp | 1200×800 | Contained (upper portion) | Keep as-is |
| Cave Exit.webp | 1000×1100 | Full-screen cover | Already portrait. Best screen. |
| Quest Path Background.webp | 1400×750 | Background (behind path) | Wide banner, correct for use |
| Gate Shatter.webp | 1200×800 | Contained (celebration) | Keep as-is |
| Scroll Decipher.webp | 1200×800 | Contained (celebration) | Keep as-is |
| Siren Resist.webp | 1200×800 | Contained (celebration) | Keep as-is |
| Missed Habit.webp | 1000×1100 | Full-screen cover | Already portrait |
| Campfire Celebration.webp | 1024×1024 | Full-screen cover | **Resized** from 1200×800. Ready for full-screen. |

### Icon Images — `assets/images/icons/`

| File | Dimensions | Used In |
|------|-----------|---------|
| Iron Gate Icon.png | 256×256 | Fitness waypoints, encounter modal |
| Glowing Scroll Icon.png | 256×256 | Learning waypoints, encounter modal |
| Siren Icon.png | 256×256 | Discipline waypoints, encounter modal. **Re-exported** with transparent bg. |
| Campfire Icon.png | 256×256 | Quest path end marker |
| Character Avatar.png | 256×256 | Character banner, quest path |

### Hairstyle Icons — `assets/hairystyles/` (NEW, not yet wired)

| File | Dimensions | Replaces |
|------|-----------|----------|
| Short Spiky.png | 128×128 | Emoji 🧑 in character-mirror.tsx |
| Medium Wavy.png | 128×128 | Emoji 👩 in character-mirror.tsx |
| Long Straight.png | 128×128 | Emoji 🧑‍🦱 in character-mirror.tsx |
| Buzz Cut.png | 128×128 | Emoji 👩‍🦳 in character-mirror.tsx |
| Ponytail.png | 128×128 | Emoji 🧑‍🦰 in character-mirror.tsx |
| Braided.png | 128×128 | Emoji 👩‍🦲 in character-mirror.tsx |

**To wire hairstyle icons:** Add `hairstyleImages` export to `src/lib/assets.ts`, then update `HAIR_STYLES` array in `src/app/(prologue)/character-mirror.tsx` to use `<Image>` components instead of `<Text>` with emojis.

---

## SUMMARY

The single biggest issue is **empty space**. The app has beautiful pixel art assets but displays them as small floating rectangles in a sea of black. Making images fill the screen (like the Cave Exit already does) would transform the entire feel.

The second biggest issue is the **Quest Path daily screen** — 80% empty black void with a thin line of small icons. This needs the background image, larger waypoints, and better visual design.

The third issue is **user control** — the celebration auto-dismiss removes the dopamine hit that's supposed to keep users coming back.

Everything else is polish on top of a solid foundation. The architecture is good, the state management is clean, the narrative text system is well-designed. The improvements are all visual/UX level.
