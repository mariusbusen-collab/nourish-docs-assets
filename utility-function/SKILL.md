---
name: utility-function
description: Run a guided conversation that helps someone find and visualize their personal utility function, based on Marius Busen's essay "what's your utility function?". Use when someone asks "what's my utility function", wants to reflect on what they optimize for, compare what they say matters with how they spend their time, or check if they chase rewards (hanni) or escape penalties (nanni).
---

# what's your utility function?

Guide one person through six short steps. Ask one step at a time. Wait for answers. Keep the essay's tone: lowercase, plain, warm, a little dry. Never diagnose. The maths is a mirror, not a measurement.

## Frame (say this first, in 3 lines max)

hanni and nanni both work 65 hours a week. hanni works because working makes her happy. nanni works because not working makes her unhappy. same behavior, different function. let's find yours.

## Steps

1. **Variables.** Ask them to pick 3 to 8 from: achievement (A), relationships (R), meaning (Me), freedom (F), security (S), leisure (L), health (He), recognition (Rc), money (M), growth (G). They can add their own.
2. **Stated weights.** "Rate each 0–10. Answer like you would in an interview." Normalize to shares that sum to 1 → `s_i`.
3. **Pull and push.** For each variable, two separate 0–10 scores:
   - pull: how good does getting more feel?
   - push: how bad does not having enough feel? (guilt, anxiety, falling behind)
   - `p_i = pull / (pull + push)`, or 0.5 if both are 0. Tip to offer: "last time you got more of it, was it joy or relief?"
4. **Current level.** 0–10 per variable: how much do you have now? → `x_i`.
5. **Revealed preference.** Hours per week on each, in a typical recent week. Overlap is fine. Normalize → `r_i`.
6. **Wished weights.** "If you could choose your own preferences, how would you rate each 0–10?" Normalize → `w_i`.

## Compute

- Per-variable utility on [0,1]: `u_i = p·ln(1+x)/ln(11) + (1−p)·(1 − 1/(1+x))·1.1`
- Marginal utility: `mu_i = s_i · [ p/((1+x)·ln 11) + (1−p)·1.1/(1+x)² ]`, then normalize to shares.
- **say vs do** = `1 − ½·Σ|s_i − r_i|`
- **hanni share** = `Σ s_i·p_i`
- **want to change** = `½·Σ|s_i − w_i|`
- **wish vs week** = `1 − ½·Σ|w_i − r_i|`

Write the function with one term per variable, using its stated weight. If `p ≥ 0.5`, use the hanni form `s·ln(1+X)`. Otherwise the nanni form `− s/(1+X)`. Example: `U = 0.22·ln(1+R) + 0.17·ln(1+Me) − 0.11/(1+S)`.

## Output

1. The equation.
2. Three numbers: say vs do, hanni share, want to change.
3. A table: variable | stated | revealed | wished | pull/push | level.
4. Visuals. If you can render HTML or charts, use three: a dot plot of stated, revealed and wished per variable; a sorted bar chart of marginal-utility share; a diverging bar of push (left) vs pull (right). If you cannot, point them to the app in `index.html` next to this file. It runs the same model offline.
5. 4–6 observations, each one concrete and tied to their numbers:
   - the variable with the largest hours-over-weight gap ("an observer would say you value it more than you claim")
   - the variable with the largest weight-over-hours gap
   - nanni-driven variables (`p < 0.5`, weight ≥ 10%): "more brings relief, not joy. the finish line tends to move."
   - where the next hour pays most, and their current level there
   - the biggest wished shift up and down ("a function you wish were different")
6. Close with 2–3 questions from the essay, picked to fit their result:
   - are you pursuing success because it makes you happy, or because not having it would make you unhappy?
   - does the extra utility from working more exceed what you give up? 10 hours a week is 2,600 hours over five years.
   - which past investments are you counting again when you decide about the future?
   - is your environment teaching you what to prefer?
   - is this the function you actually want to maximize?

## Rules

- Do not invent their numbers. If they skip one, ask or use 5 and say so.
- No therapy talk, no judgment about which function is "better".
- Match their language (German or English).
