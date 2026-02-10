

**QUESTHABIT**

UIZARD DESIGN PROMPTS

|  |
| :---- |

*Complete prompt guide for designing all 55 screens in Uizard Pro*

Based on the QuestHabit Product Bible v4.0

February 2026 • v2.0 — Expanded Detailed Prompts

| How to Use This Guide Step 1: Create a new Uizard project using the INIT prompt with Autodesigner (select Mobile). Step 2: Apply the THEME prompt using Theme Generator. Step 3: Generate each screen one by one using Autodesigner’s single-screen generator. Copy-paste each prompt directly. Step 4: After every 5–10 screens, re-apply the theme for consistency. Step 5: Use Uizard’s drag-and-drop editor to refine details. Notes below each prompt explain context that Uizard can’t infer from the prompt alone. |
| :---- |

# **STRATEGY & TIPS**

## **Recommended Workflow**

**1\. Generate the base project** using the INIT prompt with Autodesigner’s full project generator. This gives you 5–7 auto-generated screens as a starting point.

**2\. Apply the theme** using the THEME prompt in the Theme Generator to lock in the dark RPG aesthetic.

**3\. Generate screens one by one** using the Autodesigner widget. Copy-paste each prompt. Browse generated options and pick the best one.

**4\. Edit manually after generation.** Uizard’s drag-and-drop editor lets you tweak layouts, colors, text, and images.

**5\. Re-apply theme every 5–10 screens** to prevent style drift across the project.

**6\. Use Image Generator** for pixel-art assets: “pixel-art iron gate with golden cracks, dark background, 8-bit style.”

**7\. Connect screens** by mapping the user flow in Uizard’s preview mode.

## **Tips**

* Use “High Precision” mode for QuestHabit — Creative Exploration will stray from the dark RPG aesthetic.

* If a screen doesn’t match the theme, regenerate. Unlimited attempts on Pro.

* Group screens by flow: Prologue, Daily Loop, Character, World, Party, Auth, Settings, then Expansion.

* The single-screen generator inherits your project’s theme, so later screens match earlier ones.

|  |
| :---- |

# **STEP 0: PROJECT SETUP**

*2 prompts — Initialize the project and lock in the visual style.*

| INIT | Initial Project Generation (Autodesigner) |
| :---- | :---- |
| **PROMPT:** A dark-themed pixel-art RPG mobile habit tracker app called QuestHabit. The concept: users create a pixel-art RPG character, set real-life habits (like gym, reading, meditation) as daily quests that appear as narrative encounters on a visual path, and build an evolving game world that reflects their real-life consistency. The app disguises habit tracking as a full RPG adventure — onboarding is a playable cave escape, daily habits are encounters on a journey path, and your home base grows from a campfire to a fortress over months. Core screens needed: onboarding cave scene, daily quest path with character walking through encounters, character profile with RPG stats and gear, world map with evolving home base, party/social screen with boss fight HP bar, and settings. Dark purple (\#6C5CE7) accent color, black (\#0D0D1A) backgrounds, pixel-art style icons and characters, modern rounded cards with soft glow effects. |  |
| **NOTE:** Use this as your FIRST Autodesigner prompt to generate the initial multi-screen project. Select Mobile device. |  |

| THEME | Theme Generator Prompt |
| :---- | :---- |
| **PROMPT:** Dark mode RPG game. Background \#0D0D1A, cards \#1A1A2E, accent \#6C5CE7, gold \#F4A261, text white, subtle pixel-art feel, rounded corners, soft shadows, modern gaming app aesthetic. |  |
| **NOTE:** Apply this theme AFTER generating the initial project to ensure visual consistency across all screens. |  |

|  |
| :---- |

# **FLOW 1: PLAYABLE PROLOGUE**

*7 screens — The first 90 seconds of the app. No forms, no signup. Pure RPG game tutorial.*

| P.1 | Cave Awakening |
| :---- | :---- |
| **PROMPT:** Mobile app screen — the very first screen a user sees when opening the app for the first time. Completely black background. In the center of the screen, a single pixel-art eye slowly opens, drawn in a retro 8-bit style with a purple (\#6C5CE7) iris glowing faintly. Below the eye, at the bottom third of the screen, there is an RPG-style dialogue box with a dark semi-transparent background and a thin pixel border. Inside the dialogue box, white text reads: “You wake up in a dark cave. Cold stone beneath you. You don’t remember how you got here.” Below the dialogue box, a single glowing button reads “Tap to stand up” with a subtle pulse animation glow in purple. No navigation bars, no headers, no app chrome whatsoever — this is a pure cinematic story moment. The entire screen should feel mysterious, dark, and atmospheric, like the opening of a classic RPG game. |  |
| **NOTE:** CRITICAL: No nav bars, no status bars, no app UI. This must feel like a GAME, not an app. It's the user's first impression. |  |

| P.2 | Character Mirror (Customization) |
| :---- | :---- |
| **PROMPT:** Mobile app screen — character creation screen disguised as a story moment inside a dark cave. The top half of the screen shows a pixel-art scene: a dark cave wall with a large, ornate magical mirror hanging on it, glowing with a faint purple aura. Inside the mirror, a character silhouette stands — this is the player’s reflection that updates as they make selections. Above the mirror, RPG dialogue text reads: “Who are you? What do you look like?” The bottom half of the screen contains the customization options arranged in a clean grid layout: a row of skin tone circles (6 options), a row of hair style pixel-art thumbnails (8 options in a scrollable row), a row of hair color circles, and a row of facial feature options (eyes, mouth). Each selected option has a purple (\#6C5CE7) highlight ring around it. At the very bottom, a “Continue” button styled as a glowing stone tablet. The overall atmosphere is dark cave with the mirror providing the main light source. No standard app navigation — still inside the story. |  |
| **NOTE:** The mirror metaphor is KEY. The user is looking at their reflection, not filling out a form. Selections should update the silhouette in the mirror. |  |

| P.3 | Path Fork (Class Selection) |
| :---- | :---- |
| **PROMPT:** Mobile app screen — class selection screen disguised as a cave fork in the story. The screen shows a pixel-art cave that splits into four distinct paths, each leading into darkness. Above each path entrance, a glowing icon floats: a red-glowing Sword icon for the Warrior path (left), a blue-glowing Staff icon for the Mage path (center-left), a green-glowing Dagger icon for the Rogue path (center-right), and a gold-glowing Bow icon for the Ranger path (right). Each path entrance is tappable and styled as a card with the class name, icon, and a one-line description: Warrior — “Your body is your weapon”, Mage — “Knowledge is your power”, Rogue — “Stealth is your advantage”, Ranger — “Precision is your gift.” At the top, RPG dialogue text reads: “Four paths. Each demands a different kind of strength. Which calls to you?” Dark cave atmosphere with each path entrance providing its own colored glow. When a path is tapped/selected, it lights up brighter and the others dim. No app navigation bars. |  |
| **NOTE:** No dropdown menus. Each class is a visual PATH in the cave, not a radio button. The selection should feel like choosing your destiny. |  |

| P.4 | First Gate (First Habit — Fitness/Strength) |
| :---- | :---- |
| **PROMPT:** Mobile app screen — the first habit-setting screen, disguised as a narrative obstacle in the cave. The top half shows a pixel-art scene: the character (now visible in their chosen class outfit) standing before a massive iron gate blocking the cave exit. The gate has glowing golden cracks running through it, suggesting it can be broken. Dramatic torch light from either side. RPG dialogue box at the middle of the screen reads: “This gate is sealed by ancient magic. Only real-world strength can break it. What real-world challenge will you conquer?” Below the dialogue, a text input field styled as a stone tablet being inscribed — not a standard text field, but one with a stone texture background, pixel-art chisel marks on the edges, and placeholder text that reads “e.g. Gym workout, Push-ups, Run 2km...” Below the input, a frequency picker row styled as stone buttons: “Daily” “5x/week” “4x/week” “3x/week” — each is a tappable stone tile, selected one glows purple. At the bottom, a large button reads “Break the Gate” with a sword icon. Dark atmospheric cave background throughout. |  |
| **NOTE:** The text input MUST look like a stone tablet, not a standard iOS/Android text field. This is a game, not a form. |  |

| P.5 | Second Obstacle (Second Habit — Knowledge/Learning) |
| :---- | :---- |
| **PROMPT:** Mobile app screen — second habit-setting screen as a narrative obstacle. The top half shows a pixel-art scene deeper in the cave: a glowing ancient scroll floating on a stone pedestal, surrounded by swirling magical particles and floating rune symbols. The character stands before it in awe. Blue/cyan magical light emanates from the scroll illuminating the cave walls. RPG dialogue box reads: “A mysterious scroll lies on a pedestal. Ancient wisdom locked within. What knowledge will you seek?” Below: a stone-tablet-styled text input with placeholder “e.g. Read 30 minutes, Study Spanish, Learn coding...” Frequency picker row as stone buttons: Daily, 5x/week, 4x/week, 3x/week. Bottom button reads “Decipher the Scroll” with a book/scroll icon. The color palette for this obstacle leans blue/cyan to differentiate from the red/gold of the gate. Same cave atmosphere but with the scroll as the primary light source. Progress indicator at top showing “2 of 3 quests” as three small circles, first filled, second glowing, third empty. |  |
| **NOTE:** Different visual theme from P.4 (blue/cyan vs red/gold) to show each habit type has its own identity. |  |

| P.6 | Third Obstacle (Third Habit — Discipline/Resistance) |
| :---- | :---- |
| **PROMPT:** Mobile app screen — third and final habit-setting screen as a narrative obstacle. The top half shows a pixel-art scene: a dark, seductive shadow figure (the Siren) standing in a corner of the cave, emanating purple and red swirling dark energy. The character stands at a distance, hand raised defensively. The Siren is ethereal and translucent — clearly a temptation to be resisted. Eerie but beautiful atmosphere with purple/red ambient glow. RPG dialogue box reads: “A siren calls from the shadows. Its voice promises comfort but leads to ruin. What temptation will you resist?” Below: stone-tablet text input with placeholder “e.g. No social media before noon, No junk food, No late-night scrolling...” Frequency picker as stone buttons. Bottom button reads “Resist the Siren” with a shield icon. Progress indicator at top: first two circles filled green, third glowing. Purple/red color palette for this obstacle. This is the final obstacle before the cave exit. |  |
| **NOTE:** The Siren represents temptation/discipline habits. The visual should be beautiful but dangerous — something you WANT to resist. |  |

| P.7 | Cave Exit / World Reveal |
| :---- | :---- |
| **PROMPT:** Mobile app screen — the dramatic transition from dark cave to the open world. The screen shows a pixel-art landscape revealed as the character steps out of the cave mouth into daylight for the first time. The contrast is dramatic: the cave entrance is dark at the bottom of the screen, and the world opens up above in a wide panoramic vista. Rolling green pixel-art hills stretch into the distance. A forest with detailed pixel trees sits to the right. In the center-distance, a tiny campfire with a small tent beside it — this is the character’s home base, humble and small. A golden sunrise lights the sky with warm orange and pink gradients fading to blue. The character stands at the cave mouth in silhouette against the bright world. Overlay text in elegant RPG font reads: “You’ve escaped. This is your world now. Your quests begin tomorrow. Rest tonight. Your journey starts at dawn.” At the bottom, a large glowing button reads “Begin Your Journey”. This is the moment of wonder — the payoff after the dark cave. It should feel hopeful, vast, and beautiful. |  |
| **NOTE:** Maximum contrast: dark cave → bright beautiful world. This is the emotional payoff of the prologue. After this, the user enters the main app. |  |

|  |
| :---- |

# **FLOW 2: DAILY CORE LOOP**

*6 screens — The screens users see every single day. The heart of QuestHabit.*

| D.1 | Quest Path (Main Daily Screen) |
| :---- | :---- |
| **PROMPT:** Mobile app screen — the primary daily screen that users see every single day. This is the MOST important screen in the entire app. Layout from top to bottom: A character banner bar at the very top showing the pixel-art character avatar (small, left-aligned), HP bar (red), XP bar (purple, showing progress like 180/400), Level badge (“Lv 5” in gold), and the current day (“Day 12”). Below the banner, the main content: a horizontal Narrative Quest Path. The pixel-art character stands at the LEFT edge of the path. The path stretches across the screen to the RIGHT where a glowing campfire (today’s destination) awaits. Between the character and campfire are 3 waypoints spaced evenly along the path, each one a visual encounter: Waypoint 1 is a pixel-art Iron Gate icon with text “Gym Workout” below it, Waypoint 2 is a pixel-art Glowing Scroll icon with “Read 30 min” below, Waypoint 3 is a pixel-art Shadow Siren icon with “No social media” below. The path itself is a winding dirt trail. Uncompleted waypoints glow faintly. The background is a daytime pixel-art landscape (hills, trees, sky). Below the path: a progress indicator “0/3 quests complete”. Bottom navigation bar with 5 tabs: Quest Path (active, highlighted), Character, World Map, Party, Settings. The overall feel should be: you’re looking at a JOURNEY, not a checklist. |  |
| **NOTE:** This replaces the traditional habit checklist. The path IS the to-do list. Each waypoint is a tappable habit encounter. |  |

| D.2 | Encounter Tap (Habit Confirmation) |
| :---- | :---- |
| **PROMPT:** Mobile app screen — a modal overlay that appears when the user taps a waypoint on the Quest Path. The background shows the Quest Path dimmed/blurred. In the center, a dark card with pixel-art border decoration. At the top of the card: the encounter icon displayed large (e.g., the Iron Gate for Gym Workout), with subtle particle effects around it. Below the icon: the encounter narrative text in RPG style: “The Iron Gate blocks your path. Did you break through with your strength?” Below that, the habit name in bold: “Gym Workout”. A large, prominent purple (\#6C5CE7) button reads: “I conquered it\!” with a small sword icon. Below the main button, a smaller muted text link reads: “Not yet — I’ll return.” The card has a slight golden glow around its edges. The tone is heroic and encouraging — the button copy says “I conquered it” not “Mark as done.” This small difference in language is what makes the app feel like a game. |  |
| **NOTE:** Language matters: 'I conquered it\!' not 'Mark complete'. The entire emotional framing depends on this. |  |

| D.3 | Completion Animation / Celebration |
| :---- | :---- |
| **PROMPT:** Mobile app screen — the celebration screen that plays after completing a habit. Full-screen moment of triumph. The pixel-art character is mid-action: swinging a sword at the Iron Gate which is EXPLODING into pixel shards flying outward in all directions. Golden particle effects burst from the impact point. “+50 XP” floats upward in large gold pixelated text with a subtle glow trail. The path behind the character is now lit up bright green, showing progress. Smaller floating indicators: “+2 Strength” in red text, a streak flame icon with the number (e.g., “12 day streak”). The character’s XP bar at the top visibly fills up with an animation. Everything about this screen should feel SATISFYING and EPIC — like defeating a mini-boss in a real game. Gold, purple, and green are the dominant celebration colors. The background transitions from the path view to a focused action shot. |  |
| **NOTE:** This is the core dopamine hit. Make it as satisfying as possible. Each encounter type has a different animation (sword slash for gate, scroll dissolving for reading, siren shattering for discipline). |  |

| D.4 | Missed Habit / Mid-Path Night Scene |
| :---- | :---- |
| **PROMPT:** Mobile app screen — what the user sees when they open the app the morning after missing one or more habits. Night-time pixel-art scene. The Quest Path is visible but it’s dark — nighttime with stars and a crescent moon. The character sits alone on the ground between waypoints, hunched slightly, looking toward the campfire destination which is dim and unlit in the distance. The path behind the character (completed habits) glows faintly green. The path ahead (missed habits) is dark and shadowed. The character has their weapon resting beside them on the ground, not in hand. A warm but melancholic atmosphere — NOT punishing, NOT shaming. A message in RPG dialogue style at the bottom reads: “You didn’t reach camp last night. But a new day means a new path. Onward, Warrior.” Below: a button reads “Start Today’s Quest” to transition to the new day’s path. The feeling should be: your character slept in the cold — you want to make sure that doesn’t happen again. Empathetic, not guilt-inducing. |  |
| **NOTE:** CRITICAL TONE: Melancholic but hopeful. NOT 'YOU FAILED.' The app never shames. It shows a story consequence. |  |

| D.5 | Daily Summary |
| :---- | :---- |
| **PROMPT:** Mobile app screen — end-of-day summary card. Dark background. A clean summary card in the center showing today’s results. Top of card: “Day 12 Summary” with the date. Below: a list of 3 habits, each row showing a pixel-art encounter icon, the habit name, and a green checkmark or red X indicating completion. Below the list: “XP Earned Today” breakdown — showing XP per habit (50 \+ 50 \+ 50\) plus any bonus (“+30 Perfect Day Bonus” in gold). A horizontal XP progress bar showing total level progress. Current streak count with flame icon. Character’s small avatar showing a happy or neutral expression based on performance. At the bottom: “Continue” button. The summary is informative and clean, not cluttered. It celebrates what was done and gently notes what was missed. |  |

| D.6 | All Quests Done (Campfire Celebration) |
| :---- | :---- |
| **PROMPT:** Mobile app screen — the reward screen for completing ALL habits in a day. A warm, cozy pixel-art scene: the character sitting beside a crackling campfire at the end of the quest path. They’ve removed their helmet which sits on the ground beside them. Stars twinkle in the pixel-art night sky above. Tiny fireflies float around. The campfire casts a warm orange glow on the character and surrounding area. A pixel-art sleeping bag is rolled out nearby. The mood is peaceful and earned — you made it. Text overlay in warm gold reads: “All quests conquered. You earned your rest. \+30 bonus XP.” A small “Share” button with a camera icon at the bottom right allows the user to screenshot/share this moment. At the very bottom, a “Done” button. This screen should feel like the cozy reward at the end of a hard day’s adventuring — warm, peaceful, satisfying. |  |
| **NOTE:** This is the 'gold star' for a perfect day. Warm and cozy, not flashy. The user should WANT to see this every night. |  |

|  |
| :---- |

# **FLOW 3: CHARACTER**

*4 screens — RPG character sheet, inventory, level up, stat details.*

| C.1 | Character Profile (Full Sheet) |
| :---- | :---- |
| **PROMPT:** Mobile app screen — a full RPG character sheet for the user’s pixel-art character. Top section: large pixel-art character displayed center-screen wearing their equipped gear (iron armor, steel sword, shield). The character stands on a small stone platform with subtle particle effects. Character name and class displayed above (“Sardor — Warrior”). Level badge next to the name (“Lv 7” in gold). Below the character: an XP progress bar showing progress to next level (e.g., 350/500 XP). Middle section: four stat bars arranged vertically — Strength (red, value: 24), Intelligence (blue, value: 18), Discipline (purple, value: 21), Vitality (green, value: 15). Each stat bar is partially filled based on the value, with the number displayed. Below stats: equipped gear slots arranged in a grid around a mini character silhouette — Head, Chest, Weapon, Shield, Boots, Accessory. Each slot shows the equipped item’s pixel-art icon. Bottom section: a horizontal scrollable row of achievement badges (gold circles with icons). Bottom nav bar with Character tab highlighted. |  |
| **NOTE:** Classic RPG character sheet adapted for mobile. Stats are driven by which habits the user completes most. |  |

| C.2 | Inventory / Gear Grid |
| :---- | :---- |
| **PROMPT:** Mobile app screen — RPG inventory system. Top: tab bar with filters: All, Weapons, Armor, Accessories, Relics. Below: a 4-column grid of gear item tiles. Each tile is a dark card with a pixel-art item icon centered in it. The tile’s border color indicates rarity: gray border \= Common, green \= Uncommon, blue \= Rare, purple \= Epic, gold \= Legendary. Some tiles have a small “NEW” badge in the corner. One tile is selected (highlighted with a purple glow border). Below the grid: a detail panel slides up showing the selected item: large icon, item name (“Iron Gauntlets”), rarity label (“Rare” in blue), stat bonuses (“+3 Strength, \+1 Vitality”), and how it was earned (“Reward: Level 2 Achievement”). Two buttons: “Equip” (purple) and “Compare” (outlined). Dark background throughout. The grid should have enough items to look rich (12–16 items), with a mix of rarity levels. Some slots can be empty with a faint “?” icon indicating undiscovered gear. |  |
| **NOTE:** Rarity colors: gray=Common, green=Uncommon, blue=Rare, purple=Epic, gold=Legendary. Same system as Diablo/WoW. |  |

| C.3 | Level Up Celebration |
| :---- | :---- |
| **PROMPT:** Mobile app screen — full-screen Level Up celebration, the most dramatic moment in the app. Everything dims to near-black, then a radial golden burst of light explodes from the center. The pixel-art character stands in the center, glowing with white/gold energy, arms raised in triumph. Above the character in HUGE gold pixelated text: “LEVEL UP\!” with a subtle emboss effect. Below the character, stat increase indicators animate in one by one: “+2 Strength” (red), “+1 Discipline” (purple), “+1 Intelligence” (blue). Below the stats: a reward card slides up showing a new piece of gear: “Iron Gauntlets Unlocked\!” with the pixel-art gauntlets displayed and their stats. The character’s armor visibly updates — the gauntlets appear on their hands. Gold particle effects continue throughout. The entire screen radiates achievement and power. At the bottom: “Continue” button. This is the maximum dopamine moment in the entire app — it should feel like hitting a power-up in a real game. |  |
| **NOTE:** This is THE trigger for the authentication save prompt (A.1). It must feel so good that the user immediately wants to protect their progress. |  |

| C.4 | Stat Detail Drill-Down |
| :---- | :---- |
| **PROMPT:** Mobile app screen — detailed view of a single character stat. Top: large stat icon and name “Strength” with the current value “24” displayed prominently in red. Below: a line chart showing stat growth over the past 30 days, with the line going upward. The chart has a subtle gradient fill below the line. Below the chart: “Contributing Habits” section — a list of habits that feed into this stat, each showing: habit encounter icon, habit name, and individual contribution (“Gym Workout: \+18 Strength this month”, “Push-ups: \+6 Strength this month”). Each habit row has a small progress bar. Below: “Milestones” section showing upcoming stat milestones (“Reach 30 Strength to unlock Heavy Armor”). Back button at top. Dark background, red accent color for Strength stat. Clean data visualization that connects game stats directly back to real-life habits. |  |
| **NOTE:** This is where gamification meets self-awareness. The user can see exactly which habits are making them 'stronger.' |  |

|  |
| :---- |

# **FLOW 4: ALIVE WORLD**

*3 screens — The evolving home base and world map.*

| W.1 | Home Base View (Evolving Settlement) |
| :---- | :---- |
| **PROMPT:** Mobile app screen — the user’s evolving home base, shown in a scrollable/pannable pixel-art isometric-style view. This example shows the Week 4 state: Center of the scene is a small wooden cabin with smoke coming from a chimney, replacing the original campfire and tent. A garden patch to the right with tiny pixel-art vegetables growing (carrots, tomatoes). A solid wooden fence surrounds the settlement. A campfire still burns outside the cabin. A single NPC character (a pixel-art blacksmith) stands near an anvil. Trees surrounding the base have full green canopies. A small path leads from the cabin entrance outward. The sky is bright daytime with fluffy pixel clouds. At the top: “Your Base” header with a base level indicator (“Settlement Lv 3”). A small info icon that when tapped explains: “Your base grows as you grow. Keep completing quests to build your world.” The scene should feel alive, personal, and worth protecting. Bottom nav bar with World Map tab highlighted. |  |
| **NOTE:** Show the Week 4 state (cabin, garden, fence, 1 NPC). The base starts as just a campfire+tent and grows to a full fortress over months. |  |

| W.2 | World Map |
| :---- | :---- |
| **PROMPT:** Mobile app screen — a top-down pixel-art world map showing the game world. Center: the home base marked with a glowing house icon and the label “Home Base.” Around it, 4 distinct zones connected by paths: to the north, a green “Whispering Forest” zone (unlocked, bright and accessible), to the east, purple “Crystal Caves” (unlocked, glowing crystals), to the west, white/blue “Frozen Peaks” (LOCKED — shown dimmed with a lock icon and “Lv 10 Required” text), to the south, red “Volcanic Lands” (LOCKED, dimmed with lock icon and “Lv 15 Required”). Paths between zones are dotted lines for locked, solid for unlocked. At the far edge of the map (bottom-right corner), a small dark silhouette figure lurks — this is the Shadow Self, barely visible but present. Also on the map: a swirling purple/blue portal near the Crystal Caves labeled “Time Rift” with a countdown timer “4 days left.” The map should feel like a real game world map with fog of war on locked areas. Bottom nav bar. |  |
| **NOTE:** Key elements: unlocked/locked zones, the Shadow Self silhouette at the edge, and the Time Rift portal. |  |

| W.3 | Zone Detail |
| :---- | :---- |
| **PROMPT:** Mobile app screen — zone information card that appears when tapping a zone on the world map. This example shows “Crystal Caves.” The card overlays the map with a slide-up animation. Top of card: a wide pixel-art header illustration showing the Crystal Caves entrance — glowing purple crystals, dark cave mouth, mysterious blue light from within. Below the illustration: zone name “Crystal Caves” in large text, with a level requirement badge: “Level 5+” (green, meaning accessible). A lore paragraph: “Ancient crystals hum with forgotten power. Those who venture here face challenges of the mind and spirit.” Below: “Encounter Themes” showing 3 encounter type icons unique to this zone (crystal golem, glowing mushroom, echo spirit). “Unique Rewards” section showing 2–3 gear items exclusive to this zone. An “Enter Zone” purple button at the bottom. Back/close button at top-right. Dark card background with blue/purple crystal accent colors. |  |

|  |
| :---- |

# **FLOW 5: PARTY & SOCIAL**

*6 screens — Parties, boss fights, leaderboards, social accountability.*

| S.1 | Party Dashboard |
| :---- | :---- |
| **PROMPT:** Mobile app screen — the party/guild dashboard. Top section: party name “The Questbound” in bold with a pixel-art banner/crest beside it. Below: a horizontal row of 4 party member pixel-art character avatars, each showing their character, name below, level badge, and a small green/gray online indicator. Middle section (the centerpiece): a large Boss Fight card. It shows a pixel-art boss monster (Iron Golem — a large stone/iron creature) with a large HP bar below it: “Iron Golem — 1,200 / 2,000 HP”. The HP bar is partially depleted (red/orange gradient). A damage counter: “800 dmg dealt this week.” Below the boss card: an Activity Feed that scrolls vertically, showing real-time entries like: “Laziz completed Gym Workout — 25 dmg\!” with a sword icon, “Malika completed 3 quests — 75 dmg\!” with an explosion icon, “Sardor swore an Oath: Reading for 14 days” with an altar icon. Each feed entry has a timestamp. The feed should feel like a live battle log — energetic and social. Bottom nav bar with Party tab highlighted. |  |
| **NOTE:** The boss HP bar is the CENTERPIECE. It's the scoreboard of collective discipline. |  |

| S.2 | Create Party |
| :---- | :---- |
| **PROMPT:** Mobile app screen — create a new party/guild. Top: “Create Your Guild” title. A pixel-art banner frame at the top that auto-generates a guild crest based on the name entered. Below: a text input field styled with a dark card background and thin pixel border, placeholder reads “Name your guild...” (example shown: “The Questbound”). Below the input: a “Party Banner” preview showing the generated pixel-art crest/banner with the guild name on it. Below: “Generate Invite Link” large purple button. Below that: sharing options row with icons for Telegram, WhatsApp, Instagram DM, and a “Copy Link” button. A preview of the share card: a small pixel-art image showing the party banner with text “Join our quest\!” that will be sent when sharing. At the bottom: “Create Guild” confirmation button. Dark background, purple accents. |  |
| **NOTE:** Telegram share is critical for the Uzbekistan market. The share card should look good enough to post in a group chat. |  |

| S.3 | Join Party |
| :---- | :---- |
| **PROMPT:** Mobile app screen — join an existing party. Top: “Join a Guild” title. Two methods displayed: Method 1: a text input field with placeholder “Enter invite code...” and a “Join” button beside it. Method 2: below, a “Scan QR Code” button with a QR icon. Between the two methods, a divider with “or” text. Below both methods: a Party Preview Card that appears after entering a valid code, showing: the party’s pixel-art banner, party name “The Questbound”, member count “3/5 members”, the current boss they’re fighting, and small pixel-art avatars of existing members. A large purple “Join The Questbound” button at the bottom of the preview card. Dark background throughout. |  |

| S.4 | Boss Fight Progress (Weekly View) |
| :---- | :---- |
| **PROMPT:** Mobile app screen — detailed boss fight progress view. Top: large pixel-art illustration of the boss monster (Iron Golem) in a battle stance, with fire/smoke effects around it. Below the boss: a massive HP bar taking full screen width: “Iron Golem — 400 / 2,000 HP” with the bar mostly depleted (showing the party is winning). Percentage: “80% defeated.” Below: “Party Contributions This Week” section showing 4 member cards in a vertical list. Each card shows: pixel avatar, name, habits completed this week as a fraction (e.g., “18/21”), damage dealt (“450 dmg”), and a small completion percentage bar. Highlight the top contributor with a gold border. Below the member cards: a scrollable Battle Log showing the most recent damage entries chronologically. At the bottom: days remaining “2 days left to defeat the Golem.” Dark background with warm orange/red accent for the boss theme. |  |
| **NOTE:** Individual accountability is visible. Everyone can see who's pulling their weight. |  |

| S.5 | Boss Victory Screen |
| :---- | :---- |
| **PROMPT:** Mobile app screen — epic boss victory celebration. Full-screen moment. The top half shows all 4 party member pixel-art characters standing in heroic victory poses on top of the defeated boss (Iron Golem collapsed on the ground, cracked and glowing). Golden explosion effects and confetti-like particles fill the background. “BOSS DEFEATED\!” in massive gold pixelated text at the top. Below the characters: reward cards arranged horizontally in a scrollable row: “+200 XP each” card, “Iron Gauntlets (Rare)” gear card with the item icon, “Victory Banner” cosmetic item card. Below rewards: party stats summary — total damage dealt, total habits completed, MVP of the week (with gold crown on their avatar). Two buttons at the bottom: “Share Victory” (with camera icon) and “Continue.” This should feel like a real multiplayer game victory screen — dramatic, rewarding, and screenshot-worthy. |  |

| S.6 | Party Leaderboard |
| :---- | :---- |
| **PROMPT:** Mobile app screen — weekly party leaderboard. Top: tab switcher “This Week” (active) / “All Time.” Below: ranked list of party members. Each member row is a dark card showing: rank number (1-4), pixel avatar, character name, key stats in columns: Habits Done (e.g., 20/21), XP Earned (e.g., 1,050), Damage Dealt (e.g., 500). The \#1 ranked member has a gold crown icon on their avatar and a gold border on their card. \#2 has silver accent, \#3 has bronze. The list is sorted by habits completed percentage. Below the leaderboard: “Party Overall” summary card showing collective stats: total habits completed this week, total XP, bosses defeated all-time. Dark background, competitive but friendly vibe. |  |

|  |
| :---- |

# **FLOW 6: AUTHENTICATION**

*4 screens — Play First, Save Later model with 4 trigger types.*

| A.1 | Save Prompt (Post Level-Up Emotional Trigger) |
| :---- | :---- |
| **PROMPT:** Mobile app screen — the authentication/save prompt that appears immediately after the Level Up celebration. The background is the fading glow of the Level Up moment. In the center: the pixel-art character stands proudly displaying their newly earned Iron Gauntlets, glowing with residual level-up energy. Above the character in warm, inviting text: “Your hero is growing stronger. Don’t let them disappear.” Below the character: two large authentication buttons stacked vertically — “Continue with Google” (white button with Google icon) and “Continue with Apple” (black button with Apple icon). Both buttons are prominent, easy to tap, one-tap authentication. Below the buttons, in small, muted text: “Not now — I’ll risk it.” The tone is protective, not demanding. The user isn’t being asked to “sign up for an app” — they’re being asked to “save their hero.” No email/password forms. No form fields at all. Social auth only. |  |
| **NOTE:** This appears at MAXIMUM emotional investment (right after Level Up). The framing is about loss prevention, not account creation. |  |

| A.2 | Feature-Gated Auth (Contextual) |
| :---- | :---- |
| **PROMPT:** Mobile app screen — a contextual authentication prompt that appears when a guest user tries to access a feature requiring an account. This example shows the Party gate. The background is the Party screen, blurred/dimmed. A dark card overlays the center with a purple accent border. Top of card: a pixel-art party/guild icon. Text: “To fight bosses with friends, save your hero first.” Below: “Continue with Google” and “Continue with Apple” buttons. Below buttons: “Not now” small text link. The card is compact and non-intrusive. The message changes depending on context: for sharing it says “To share your hero on social media, save your progress first,” for premium it says “Save your progress to unlock premium features.” |  |
| **NOTE:** Multiple versions exist for different contexts (party, share, premium, sync). Each has context-specific copy. |  |

| A.3 | Urgency Nudge (Day 5+ Inline Card) |
| :---- | :---- |
| **PROMPT:** Mobile app screen — the Quest Path screen (D.1) but with an inline card added at the top, above the quest path. The inline card is NOT a popup — it’s embedded in the page, pushable and dismissable. The card has a subtle gold border and shows: the character’s small avatar on the left, and text reading: “You have 340 XP, Level 3, and a 5-day streak. If you uninstall or change phones, your hero disappears forever. Save them?” A small “Save Now” purple button on the right side of the card, and a tiny “X” dismiss button in the top-right corner. The card is compact (about 60px tall) and doesn’t interrupt the quest path experience below it. The tone is informative and slightly urgent but never aggressive. |  |
| **NOTE:** INLINE card, NOT a popup/modal. It sits on top of the Quest Path and can be dismissed. Appears Day 5+. |  |

| A.4 | Profile Tab (Guest State) |
| :---- | :---- |
| **PROMPT:** Mobile app screen — the Profile/Character tab showing the guest state. At the very top, before any other content: a yellow/amber warning banner spanning the full width. The banner contains a small warning icon, text reading “Playing as Guest — progress saved on this device only,” and a “Save Progress” button in purple. Below the banner: the normal Character Profile content (same as C.1) with the pixel character, stats, gear, and achievements all displaying normally. The banner persists on every visit to this tab until the user authenticates. It’s a constant gentle reminder without blocking any functionality. |  |

|  |
| :---- |

# **FLOW 7: SETTINGS**

*4 screens — Habit management, notifications, premium paywall, account.*

| G.1 | Habit Management |
| :---- | :---- |
| **PROMPT:** Mobile app screen — habit/quest management list. Top: “Your Quests” title. Below: a vertical list of habit cards. Each card shows: a pixel-art encounter icon on the left (Iron Gate for gym, Scroll for reading, Siren for discipline), the habit name in bold, the frequency below it (“4x per week”), current streak with flame icon (“12 day streak”), and a drag handle icon on the right for reordering. Each card is swipable: swipe left reveals Edit (blue) and Delete (red) action buttons. At the bottom of the list: a floating action button “+ Add New Quest” in purple (\#6C5CE7) with a plus icon. When tapped, it opens the same stone-tablet-style habit creation interface from the Prologue (P.4–P.6) but adapted for in-app use. Dark card backgrounds, clean list layout. |  |

| G.2 | Notification Settings |
| :---- | :---- |
| **PROMPT:** Mobile app screen — notification settings. Top: “Notifications” title with a back arrow. Below: a list of notification toggle rows, each with an icon, description, toggle switch, and optional time picker. Rows: 1\) Sword icon — “Morning Quest Reminder” with toggle ON (purple) and time picker showing “8:00 AM”, 2\) Moon icon — “Evening Deadline Warning” toggle ON, time “10:00 PM”, 3\) Cloud icon — “Dream Notification” (tells you your character dreamed) toggle ON, time “7:00 AM”, 4\) Boss icon — “Boss Fight Updates” toggle ON, 5\) Traveler icon — “Whisper Alerts” toggle ON, 6\) Shadow icon — “Shadow Warnings” toggle ON. Active toggles are purple, inactive are gray. Clean dark card rows with subtle dividers. |  |

| G.3 | Premium / Paywall |
| :---- | :---- |
| **PROMPT:** Mobile app screen — premium subscription screen. Top: a pixel-art treasure chest overflowing with golden items, gear, and sparkles — the chest is open and glowing. Title below: “Unlock the Full Quest” in gold text. Below: a two-column feature comparison. Left column “Free” (muted), right column “Premium” (gold). Rows comparing features with check/cross icons: 3 habits vs Unlimited habits, 1 party vs 5 parties, Basic dreams vs All dream types, No Oaths vs Oath System, No Fusion vs Habit Fusion, No Rift rewards vs Time Rift exclusive rewards, Basic tree view vs Legacy Tree export. Below the comparison: pricing cards — “$4.99/month” and “$39.99/year (save 33%)” with the yearly option highlighted as “Best Value.” Large gold button: “Start 7-Day Free Trial.” Below: “Restore Purchase” small text link. The treasure chest metaphor makes it feel like unlocking game content, not purchasing software. |  |
| **NOTE:** The paywall should feel like opening a treasure chest, not buying a subscription. |  |

| G.4 | Account Settings |
| :---- | :---- |
| **PROMPT:** Mobile app screen — account and app settings. Top: “Settings” title with back arrow. Sections organized with subtle section headers: PROFILE section — avatar and display name row (tappable to edit), auth method row showing “Google” with Google icon. DATA section — “Export My Data” row, “Sync Status: Up to Date” with green check. APP section — “Theme” row (Dark/Light toggle, defaulting to Dark), “Language” row showing current language, “Sound Effects” toggle, “Haptic Feedback” toggle. ABOUT section — “Version 1.0”, “Terms of Service”, “Privacy Policy”, “Contact Support.” At the very bottom: “Danger Zone” section with a red-bordered “Delete Account” button. Clean, minimal settings screen. Dark background. |  |

|  |
| :---- |

# **FLOW 8: DREAM ENGINE**

*4 screens — Morning dreams, result cards, journal gallery, dream replay.*

| DE.1 | Dream Sequence (Morning — Aspirational Type) |
| :---- | :---- |
| **PROMPT:** Mobile app screen — the morning dream sequence that plays when the user opens the app after a PERFECT day. This is the “aspiratioal” dream type. Full-screen cinematic pixel-art scene: the character is floating in the sky, arms outstretched, looking down at their world below. The world is rendered beautifully — the home base is visible as a tiny settlement, green hills roll outward, the zones are visible in the distance. The sky is a dreamy gradient of deep purple fading to soft pink and gold, with oversized stars and a crescent moon. Everything has a soft, ethereal glow — slightly blurry edges to suggest it’s a dream. Tiny sparkle particles float upward. At the bottom, in an RPG dialogue box with a translucent background: “You dreamed of horizons you haven’t yet reached.” No buttons visible during the dream — just the scene and the text. After 10–15 seconds, a subtle “Tap to continue” appears. The mood is serene, proud, and hopeful. Other dream types exist (reflective/foggy forest for partial days, epic/prophecy for milestones, phoenix/ash-rebirth for recovery) but this shows the aspirational variant. |  |
| **NOTE:** 4 dream types exist: Aspirational (perfect day), Reflective (partial day — foggy forest, finding the missed habit as an object), Epic (streak milestones — prophecy vision), Phoenix (recovery — rising from ashes). Show the aspirational type here. |  |

| DE.2 | Dream Result Card |
| :---- | :---- |
| **PROMPT:** Mobile app screen — a summary card that appears after the dream sequence fades. Dark background. A centered card with soft purple glow border. Top of card: a crescent moon icon with small stars around it. Title: “Last Night’s Dream.” Below: the dream type displayed as a badge — “Aspiratioal” in gold text (or “Reflective” in blue, “Epic” in purple, “Phoenix” in orange-red for other types). A brief poetic summary text: “You soared above your world and saw how far you’ve come. The horizon calls.” Below the text: a tiny thumbnail of the dream scene. Two buttons: “Save to Dream Journal” (purple) and “Continue to Quests” (outlined). The card should feel contemplative and gentle — a quiet moment before the day begins. |  |

| DE.3 | Dream Journal (Gallery) |
| :---- | :---- |
| **PROMPT:** Mobile app screen — the Dream Journal, a scrollable gallery of all past dreams. This lives under the Character tab as a sub-section. Top: “Dream Journal” title with a crescent moon icon. Below: filter tabs — All, Aspirational (gold), Reflective (blue), Epic (purple), Phoenix (orange). Below the tabs: a vertical list of dream cards, newest first. Each dream card shows: the date (e.g., “Feb 8, 2026”), a small rectangular thumbnail of the pixel-art dream scene (showing the actual scene from that night), a dream type badge, and a one-line preview of the dream text (“You soared above your world...”). Cards are tappable to view the full dream. The gallery should show 5–7 cards visible with different dream types represented. The journal should feel like a personal, reflective diary — visual, not data-heavy. Dark background with the thumbnails providing color. |  |
| **NOTE:** This is a visual diary. Over months, it tells the story of the user's journey through pixel-art scenes, not charts. |  |

| DE.4 | Dream Detail / Replay |
| :---- | :---- |
| **PROMPT:** Mobile app screen — full-screen replay of a past dream. The pixel-art dream scene fills the entire screen (same as DE.1 but static for past dreams). Date displayed in the top-left corner: “Feb 8, 2026.” Dream text at the bottom in the RPG dialogue box: “You dreamed of horizons you haven’t yet reached.” Dream type badge in the top-right: “Aspiratioal.” Swipe up from the bottom to reveal a detail panel: what triggered this dream (e.g., “Perfect day: 3/3 habits completed”), which habits contributed, and the stats for that day. A “Share as Image” button with a share icon to export the dream scene as a shareable image. Back/close button at top-left. The scene is the hero — the detail panel is secondary. |  |

|  |
| :---- |

# **FLOW 9: SHADOW SELF**

*3 screens — Your dark mirror, monthly duel, shadow forge crafting.*

| SS.1 | Shadow State (World Map Overlay) |
| :---- | :---- |
| **PROMPT:** Mobile app screen — the World Map screen (same as W.2) but with the Shadow Self prominently visible. The Shadow is a dark, inverted mirror version of the user’s character — same silhouette but entirely black/dark purple with glowing red eyes and dark particle effects swirling around it. The Shadow stands at mid-distance from the home base on the world map, clearly approaching. A dark aura radiates from the Shadow, dimming the area around it on the map. A tooltip or info card near the Shadow reads: “Your Shadow grows when you skip quests. It feeds on missed habits.” A “Shadow Distance” indicator bar somewhere on screen showing how close the Shadow is to the home base (currently at 60% distance). The closer the Shadow, the more the ambient lighting on the map shifts darker. The Shadow should feel ominous but not terrifying — a looming presence, not a jump scare. |  |
| **NOTE:** The Shadow gets closer when habits are missed, retreats when habits are completed. At 100% it triggers the Shadow Siege on the home base. |  |

| SS.2 | Shadow Duel (Monthly Solo Boss Fight) |
| :---- | :---- |
| **PROMPT:** Mobile app screen — the monthly Shadow Duel boss fight. Split-screen battle layout. Left side: the user’s pixel-art character in a fighting stance, their stats/HP bar above them (green, healthy). Right side: the Shadow Self — a dark mirror version of the character with inverted colors, glowing red eyes, dark particles swirling — their stats/HP bar above (purple/red). Between them: clash effects, sparks, energy bursts where their weapons meet. Below the battle: an auto-battle log scrolling in real-time style: “You strike the Shadow for 45 damage\!” “The Shadow retaliates for 30 damage\!” “Your discipline shields you — blocked\!” The Shadow’s strength display: “Shadow Power: 35% (based on 65% habit consistency this month).” The outcome is pre-determined by habit data but the animation makes it feel like a real fight. Below the battle log: “Monthly Duel — January 2026.” Dark, dramatic atmosphere with purple and red lighting. |  |
| **NOTE:** Auto-battle — outcome is predetermined by the month's consistency. 90%+ consistency \= easy win. 50% \= tough fight. Below 40% \= you lose. |  |

| SS.3 | Shadow Forge (Crafting) |
| :---- | :---- |
| **PROMPT:** Mobile app screen — the Shadow Forge, where Shadow Shards (dropped from winning Shadow Duels) are crafted into unique dark-themed gear. Top: a pixel-art dark anvil/forge with purple flames and shadow energy swirling around it. Title: “Shadow Forge.” Below: “Your Shadow Shards: 7” with icons of dark crystal shards. Below: crafting recipe cards in a scrollable list. Each recipe card shows: the required shard count (e.g., “3 Shards”), an arrow, and the resulting item with its pixel-art icon and name (“Shadow Blade — \+8 Strength, \+4 Discipline”). Items have a distinct dark/purple/red aesthetic different from normal gear. One recipe is highlighted as “Craftable” (enough shards), others are dimmed with “Need X more shards.” A “Forge” button glows purple on the craftable recipe. Dark background with purple flame ambient effects. |  |

|  |
| :---- |

# **FLOW 10: OATH SYSTEM**

*3 screens — Sacred public promises, ceremony cinematic, progress tracking.*

| OA.1 | Swear Oath (Setup) |
| :---- | :---- |
| **PROMPT:** Mobile app screen — the Oath creation screen, designed to feel like a sacred ritual, not a form. Top: a pixel-art glowing altar with candles on either side, purple magical energy rising from it. Title: “Swear an Oath” in solemn, elegant text. Below the altar: Step 1 — “Choose your vow” with a habit selector showing your habits as cards (tap to select one, selected card glows purple). Step 2 — “Set your trial” with duration options displayed as stone tablets: “7 Days” “14 Days” “21 Days” “30 Days” (tappable, selected glows). Step 3 — Preview: a stone tablet inscription reading “I swear to complete Gym Workout every day for 14 days. If I falter, let the mark remind me.” Below the preview: reward shown (“Reward: Oath Relic — Iron Will Pendant” with item icon) and consequence shown (“Consequence: Mark of the Broken Oath visible for 7 days”). A large dramatic button: “Swear the Oath” with a glow effect. The entire screen should feel ceremonial and weighty — this is a serious commitment. |  |
| **NOTE:** The UI should feel SACRED and RITUALISTIC. Heavy stone textures, altar imagery, ceremonial language. Not a form. |  |

| OA.2 | Oath Ceremony (Cinematic) |
| :---- | :---- |
| **PROMPT:** Mobile app screen — the full-screen Oath Ceremony cinematic that plays after confirming an oath. A dramatic pixel-art scene: the user’s character kneels before the glowing altar in the center of the screen. Behind the kneeling character, three party member characters stand in a row as witnesses, their pixel-art forms visible and respectful. The altar glows with intense purple light. Above the altar, the oath text appears inscribed on a floating stone tablet, each word glowing as if being carved by magical energy: “I swear to complete Gym Workout every day for 14 days.” Golden light rays emanate from the tablet. Below the scene, RPG text reads: “The altar remembers. Your party stands witness.” A party feed notification preview: “Sardor swore an Oath: Gym Workout for 14 days. The altar remembers.” “Continue” button at the bottom. The atmosphere is solemn, epic, and meaningful — maximum gravitas. Purple, gold, and dark tones. |  |
| **NOTE:** This cinematic plays ONCE when the oath is confirmed. It should feel like a sacred moment. |  |

| OA.3 | Oath Progress Tracker |
| :---- | :---- |
| **PROMPT:** Mobile app screen — this shows how the active Oath appears across the app. Two views on one screen: View 1 (top half): An inline card as it appears in the Party Activity Feed. The card shows: a small altar icon, the oath-taker’s avatar, text “Sardor’s Oath: Gym Workout”, a circular progress ring showing day 8 of 14 (57% filled in gold), a streak flame icon showing the oath is unbroken, and the reward preview (Oath Relic thumbnail). View 2 (bottom half): The same oath as it appears on the user’s Character Profile — a compact “Active Oath” badge section showing: oath name, progress bar (8/14 days), days remaining, and the reward. If the oath is broken: show a version where the progress ring is cracked/red and the text reads “Oath Broken — Mark of the Broken Oath: 5 days remaining.” Dark backgrounds, gold accent for active oaths, red for broken. |  |
| **NOTE:** Shows both the party feed view AND the profile view of an oath. |  |

|  |
| :---- |

# **FLOW 11: WHISPER NETWORK**

*2 screens — Anonymous encouragement from strangers fighting the same battles.*

| WN.1 | Whisper Compose (Send Encouragement) |
| :---- | :---- |
| **PROMPT:** Mobile app screen — the Whisper compose screen that appears after a user completes a difficult habit (one they’ve historically struggled with). A slide-up card from the bottom of the screen, overlaying the celebration screen. The card has a soft, warm design. Top of card: a pixel-art silhouette of a mysterious traveler with a speech bubble forming. Text reads: “Someone out there is fighting the same battle you just won. Send them a Whisper of encouragement.” Below: a text input field styled as a scroll or message bottle, with a character counter (0/100). Placeholder text: “Write something kind...” Example whispers shown as suggestions below the input in small bubbles: “The gym was brutal today but I showed up. You’ve got this.” “Day 12\. It gets easier, I promise.” “You’re not alone on this path.” Two buttons: “Send Whisper” (purple, with a paper-airplane icon) and a small “Skip” text link below. The tone is warm, human, and encouraging. Anonymous — no sender identity shown. |  |
| **NOTE:** Only appears after completing a DIFFICULT habit (based on historical completion rate). The suggestions help users who don't know what to write. |  |

| WN.2 | Whisper Stone (Received Messages Gallery) |
| :---- | :---- |
| **PROMPT:** Mobile app screen — the Whisper Stone, a special inventory item that stores all received anonymous encouragement messages. Top: a large pixel-art crystal/stone icon that glows with a warm purple-pink light. The stone’s brightness and particle effects increase based on how many Whispers have been received (this example shows a bright, well-used stone). Title: “Whisper Stone” with a subtitle: “23 whispers received.” Below: a scrollable list of received Whisper messages. Each message is displayed in a card with: a pixel-art anonymous traveler silhouette icon (each slightly different but all anonymous), the message text in quotation marks, the date received, and which habit it relates to (e.g., “Gym Workout” badge). Messages are sorted newest first. Example messages shown: “The gym was brutal today but I showed up. You’ve got this.” (Feb 7), “Day 30 of no sugar. If I can do it, so can you.” (Feb 3), “You’re not alone on this path.” (Jan 29). The screen should feel like a personal treasure trove of kindness. Dark background, warm glow from the stone. |  |
| **NOTE:** On a bad day, opening the Whisper Stone to read dozens of encouraging messages from strangers is more powerful than any streak counter. |  |

|  |
| :---- |

# **FLOW 12: TIME RIFTS**

*3 screens — Monthly limited-time themed events with exclusive rewards.*

| TR.1 | Rift Portal (World Map Entry Point) |
| :---- | :---- |
| **PROMPT:** Mobile app screen — the Time Rift portal as it appears on the World Map. The map is the standard world map (W.2) but with a prominent addition: a swirling, animated portal hovering near one of the zones. The portal is a circle of swirling blue and purple energy with bright white at the center, pixel-art style with particle effects spiraling around it. Next to the portal, an info card: “Time Rift: The Frozen Citadel” with a small pixel-art preview of an icy castle. Below the name: a countdown timer “4 days, 12 hours remaining” with an hourglass icon. Your personal progress bar: “Your contribution: 65% complete”. If it’s a Community Rift, also: “Global progress: 623,000 / 1,000,000 habits.” An “Enter Rift” glowing purple button. The portal should feel mystical and exciting — like a limited-time event in a live-service game. The rest of the map is slightly dimmed to draw attention to the rift. |  |
| **NOTE:** Rifts appear once per month for exactly 7 days. Some are personal, some are global Community Rifts. |  |

| TR.2 | Rift Interior (Themed Quest Path) |
| :---- | :---- |
| **PROMPT:** Mobile app screen — the Quest Path (D.1) but completely re-themed for the Time Rift. This shows the Frozen Citadel rift. Everything is ice/snow themed: the path is a frozen ice trail instead of a dirt path. The character walks through a blizzard landscape with snowflakes falling. The waypoints are ice-themed encounters: Waypoint 1 is a Frozen Gate (encased in ice, requiring strength to break), Waypoint 2 is an Icicle Scroll (frozen ancient text to decipher), Waypoint 3 is a Frost Siren (blue/white ice spirit). The color palette is entirely blue, white, and silver instead of the usual dark purple. The destination at the end is not a campfire but a frozen citadel tower. At the top: a Rift progress bar showing “Frozen Citadel: 65% thawed” with an ice-melting visual effect on the bar. Rift countdown in the corner: “4 days left.” Character banner still visible at the very top. This shows how the same Quest Path mechanic can be completely re-skinned for events. |  |
| **NOTE:** Same MECHANIC as the daily Quest Path, completely different VISUALS. Each rift has its own theme. |  |

| TR.3 | Rift Rewards (Completion Screen) |
| :---- | :---- |
| **PROMPT:** Mobile app screen — the Time Rift completion reward screen. Top half: a dramatic pixel-art scene showing the Frozen Citadel fully thawed — ice melting away to reveal a beautiful ancient castle with warm light glowing from its windows. Water cascading down from the melting ice. Text: “The Frozen Citadel Has Thawed\!” in large, celebratory gold text. Below: exclusive rewards displayed on cards: “Frost Crown” (legendary gear item with ice-blue glow and sparkle effects, showing stat bonuses), “+500 Bonus XP” card, “Frost Theme” cosmetic unlock (changes your world map’s color palette to winter). If Community Rift: a large community stat: “247,000 players participated worldwide. Together, 2.3 million habits were completed.” “Claim Rewards” gold button at the bottom. The feeling should be: you participated in something bigger than yourself and earned something exclusive for it. |  |

|  |
| :---- |

# **FLOW 13: HABIT FUSION**

*3 screens — Two habits merge into a powerful fused super-habit.*

| HF.1 | Fusion Discovery (Quest Path Notification) |
| :---- | :---- |
| **PROMPT:** Mobile app screen — the Quest Path (D.1) showing the Fusion Discovery moment. Two of the three waypoints on the path are glowing and pulsing in sync with the same golden resonance — for example, the Iron Gate (Gym) and Glowing Scroll (Reading) are both emitting golden light waves that pulse outward and meet between them, creating a visible golden resonance line connecting the two waypoints. The third waypoint (Shadow Siren) is normal. A notification banner appears at the top of the screen with a golden sparkle icon: “A strange resonance between your quests... Gym Workout and Read 30 Min are harmonizing.” Below the banner: a small “Discover Fusion” button pulses with golden light between the two resonating waypoints. The rest of the Quest Path functions normally. This moment should feel like discovering a secret — something hidden in the game that you’ve unlocked through consistency. |  |
| **NOTE:** This triggers after 21 CONSECUTIVE days of completing both habits. It should feel like discovering a hidden game mechanic. |  |

| HF.2 | Fusion Ceremony (Merge Animation) |
| :---- | :---- |
| **PROMPT:** Mobile app screen — full-screen Habit Fusion ceremony. A dramatic merging animation. The two habit encounter icons float on opposite sides of the screen: the Iron Gate icon (red/gold) on the left and the Glowing Scroll icon (blue/cyan) on the right. Both icons pulse with golden energy. They begin moving toward the center of the screen, trailing light particles behind them. At the center, they collide in a massive burst of golden light — an explosion of particles, rays, and sparkles. From the collision, a NEW, combined icon emerges: a unique pixel-art symbol representing “Mind & Body Mastery” — a sword crossed with a scroll, glowing with both red and blue energy merged into gold. “FUSION COMPLETE\!” appears in large gold text above the new icon. Below: “Mind & Body Mastery” name, “3x XP Multiplier” badge, “Unique gear drops unlocked,” “Special Legacy Tree branch activated.” “Continue” button. This is a RARE, EARNED achievement. Maximum spectacle. |  |
| **NOTE:** This is one of the rarest events in the game. Only happens when two specific habits have been done together for 21 days straight. |  |

| HF.3 | Fusion Detail Card |
| :---- | :---- |
| **PROMPT:** Mobile app screen — detail view of a fused habit. A dark card with a golden border (indicating this is a special fusion item). Top: the fused habit icon “Mind & Body Mastery” displayed large with golden glow and particle effects. Below the icon: the fusion name in gold text, and a subtitle: “Fused Quest.” A “Contributing Habits” section showing the two original habits side by side: Iron Gate (Gym Workout) \+ Glowing Scroll (Read 30 Min) connected by a golden “+” symbol. A “Bonuses” section listing: “3x XP Multiplier” with sparkle icon, “Unique Gear Drops: Scholar-Warrior Armor Set” with gear icons, “Special Legacy Tree Branch” with tree icon. A “Fusion Health” bar at the bottom: a green bar showing the fusion is active and healthy, with a warning: “Breaks if either habit is missed for 7 consecutive days.” Back button at top. Dark background, gold/purple accents for the fusion theme. |  |

|  |
| :---- |

# **FLOW 14: LEGACY TREE**

*2 screens — A living pixel-art tree visualizing your entire journey.*

| LT.1 | Legacy Tree (Full View) |
| :---- | :---- |
| **PROMPT:** Mobile app screen — the Legacy Tree, the single most shareable and emotionally resonant screen in the entire app. Full-screen pixel-art tree displayed against a twilight sky background (deep blue fading to purple at the top, warm orange near the horizon). The tree is a magnificent pixel-art oak at Month 6 maturity: thick brown trunk with visible bark texture, multiple branches extending outward, each branch a different color representing a habit category. Green branches (health habits, thick and strong with full leaves), blue branches (learning habits, medium thickness), red branches (fitness, thick), gold branches (discipline). On the strongest branches: tiny pixel-art flowers in bloom. On a branch with 100+ completions: a small pixel-art fruit. One branch on the left is SCARRED — bare and leafless (an abandoned habit) but with green ivy growing over it (the habit was restarted). A tiny bird’s nest sits in the healthiest branch. At the base of the tree, the user’s pixel-art character stands looking up at their tree, small in scale to emphasize the tree’s majesty. Fireflies float around the scene. The ground has pixel-art grass and small flowers. The overall feeling: this tree IS you. Every branch, scar, flower, and fruit tells the story of your real-life journey. Pinch-to-zoom enabled. In the top corner: “180 days • Level 12 • 4 active habits.” |  |
| **NOTE:** The HERO screen of the app. The scar with ivy is critical — it shows the tree is HONEST. A perfect tree is boring. A real tree with scars tells a human story. |  |

| LT.2 | Tree Share / Export Card |
| :---- | :---- |
| **PROMPT:** Mobile app screen — the Legacy Tree export/share screen. Top half: a preview of the shareable image card. The card shows the Legacy Tree centered on a dark background, with the user’s pixel-art character standing beneath it. Overlaid stats in clean typography: “180 Days”, “Level 12”, “4 Active Habits”, “12 Fusions Discovered.” QuestHabit logo/watermark at the bottom of the card — small but visible. The card is designed to look beautiful enough to post on Instagram or Telegram. Below the preview: export/share options as icon buttons: “Save Image” (download icon), “Share to Instagram” (Instagram icon), “Share to Telegram” (Telegram icon), “Copy Link” (link icon). A “Customize” option that lets the user toggle which stats appear. The shareable image should look like a high-quality game achievement card — something people would genuinely want to post. Dark UI background, the card itself is the star. |  |
| **NOTE:** This is the VIRAL GROWTH mechanic. If the export image is beautiful enough, users share it voluntarily. 'This is my 6-month tree' \= gym progress photo equivalent. |  |

|  |
| :---- |

| Quick Reference Setup: 2 prompts (INIT \+ THEME). Flows 1–14: 54 screen prompts. Total: 56 prompts covering all 55 unique screens. Each prompt is detailed and faithful to the QuestHabit Product Bible v4.0. Estimated time: 3–4 hours with manual refinement. |
| :---- |

— End of Prompt Guide —