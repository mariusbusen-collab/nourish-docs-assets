---
name: utility-function
description: Run a guided, chapter-by-chapter conversation that helps someone discover and visualize their personal utility function, based on Marius Busen's essay "what's your utility function?". Use when someone asks "what's my utility function", wants to reflect on what they optimize for, compare what they say matters with how they spend their time, or find out if they chase rewards (hanni) or escape penalties (nanni).
---

# what's your utility function?

A conversational version of the app in `index.html` (same folder). The app is the better experience: one card at a time, a live profile, charts. Use this skill when there's no browser, or to run the exercise live in an interview or 1:1.

## How to run it

- Ask **one question at a time**. Show the scale every time. Wait for the answer.
- After each chapter, **reveal** what you learned before moving on. Before chapters 1, 2 and 4, ask the person to **guess** first, then compare.
- After each chapter, ask one **reflection** question. One sentence is enough.
- Keep the essay's voice: lowercase, plain, warm, a little dry. No diagnosis. This is a mirror, not a test.
- Match their language (German or English). Never invent their numbers.

Scales:
- **like6** (portraits, "how much is this person like you?"): 1 not like me at all · 2 not like me · 3 a little like me · 4 somewhat like me · 5 like me · 6 very much like me
- **agree5**: 1 strongly disagree … 5 strongly agree

## Variables

achievement (A), relationships (R), meaning (Me), freedom (F), security (S), leisure & fun (L), recognition (Rc), growth (G).

## Chapters

1. **what you want** (Schwartz values, PVQ-style portraits). Two portraits per variable on like6. Then 6–8 forced choices: "next year you can only have more of one: X or Y?" Pick pairs whose scores are close. Ask for a guess of the top variable before revealing.
2. **hanni or nanni.** Guess first (0 = nanni, 100 = hanni). Then:
   - "i work as hard as i do because…" (agree5, 2 items each): intrinsic (i enjoy it), identified (it matters to me), introjected (guilt, proving myself), external (expectations, pay). Self-determination theory.
   - passion (agree5, 3 each): harmonious (fits my life, can step away, brings out my best) vs obsessive (can't switch off, mood depends on it, wouldn't know who i am). Vallerand.
   - focus (like6, 2 each): promotion (what i could achieve) vs prevention (mistakes to avoid). Higgins.
   - for their top 4 variables: "when you get more, do you feel joy (0) or relief (100)?" and "going without it feels fine (0) or anxious and guilty (100)?"
3. **the price of one more.** Current level 0–10 for each variable. Maximizer items (never settle; wonder if better exists; good enough is fine (reverse); keep comparing). Adaptation items (last win faded within weeks; each win feels smaller). "a 20% raise: the good feeling lasts days / weeks / months / longer?"
4. **everything has a price.** Guess say-vs-do (0–100%). Hours per week on each variable in a real recent week. Then: senior role, +30% pay, +10 h/week: take / negotiate / ask without hours / decline. Where would the 10 hours come from? A free saturday: what actually happens?
5. **your future self.** Three rounds of €1,000 today vs more in a year. Use bisection over [1010, 1050, 1100, 1200, 1350, 1600, 2000]: start at 1200. If they wait, go lower; if not, go higher. Then future-focus items (agree5) and "once i reach my next milestone, i'll finally relax." Also: a goal you reached felt less / as / more good than expected?
6. **sunk costs.** The €100 concert in the rain: go or stay? The two-year project with a better approach available: keep, switch, or struggle? Identity items (leaving would waste everything; not sure who i'd be without "the ambitious one"). Environment items (my goals look like those around me; some ambitions aren't mine). Priorities vs routines: how much has each changed in five years?
7. **choosing what to want.** For each variable: if you could choose, would you care less / same / more / much more? Then: "finish the sentence: i want to want…"

## Compute

- **Stated weights**: center each person's portrait ratings on their own mean (`c_i = mean_i − mean_all`). Add `0.8 × (wins − losses) / comparisons` from the pairs. Weights = softmax(0.85 × score).
- **Hanni share H**: weighted blend of autonomous share `(I+D)/(I+D+J+E)` (35%), harmonious share `HP/(HP+OP)` (25%), promotion share `PRO/(PRO+PRE)` (15%), and the top-4 pull answers (25%). Per-variable pull: `p = 0.6·(1 − joy/relief/100) + 0.4·(1 − lack/100)`. Use H for the other variables.
- **Term form**: if `p ≥ 0.5`, hanni term `w·ln(1+X)`, else nanni term `−w/(1+X)`.
- **Marginal utility**: `w · [ p/((1+x)·ln 11) + (1−p)·1.1/(1+x)² ]`, normalized to shares.
- **Say vs do** = `1 − ½·Σ|stated − hours share|`. **Want to change** = `½·Σ|stated − wished|`, where wished = stated × (0.6 / 1 / 1.5 / 2), normalized.
- **δ** = 1000 / indifference amount (midpoint of the final bin). A reward in 10 years is worth δ¹⁰ today.
- **Sunk-cost pull** = mean of (concert go = 1), (project keep = 1, struggle = 0.6), and identity items scaled to 0–1.
- **Type**: H ≥ 0.5 and maximizer ≥ 3 → the climber · H ≥ 0.5 → the gardener · maximizer ≥ 3 → the runner · else → the guardian.

## Output

1. Their type and one line about what to watch.
2. The equation, plus `U_life = Σ δᵗ·U_t`.
3. Hanni share, say vs do, 10-year weight, want to change. Show each guess next to the measured value.
4. A table: variable | stated | revealed | wished | level | chased or escaped.
5. 4–6 observations tied to their numbers (biggest say/do gap, nanni terms, guilt above enjoyment, where the next hour pays most, finish-line belief, outdated function, the wished shift).
6. Their reflections, quoted back.
7. One question to close: **is this the function you actually want to maximize?**

The items are original and inspired by the cited constructs. They are not a validated test. Say so if asked.
