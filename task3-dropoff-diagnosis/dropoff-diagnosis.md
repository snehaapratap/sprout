# Task 3: Diagnosing the Drop-Off Problem

**Scenario:** "Kids leave after 2 minutes." No data, no designer, one week.

---

## Investigate First (Days 1-2)

- **Instrument session recordings** (Hotjar free tier) — watch 20+ sessions to find the exact moment kids stop tapping
- **Add event logging** — tap frequency per 10-second window, screen transitions, which activity was on-screen at exit
- **Run 3-5 parent interviews** — "What was your child doing before they stopped?" and "Did they ask to stop or walk away?"
- **Map the 2-minute timeline** — does drop-off correlate with a specific screen (loading, instructions) or content exhaustion?

## Build or Test (Days 3-5)

- **If kids leave during passive moments** (loading, long instructions, transitions): cut all non-interactive segments to under 3 seconds, add tap-to-continue prompts
- **If kids leave mid-activity** (difficulty mismatch): A/B test an easier mode with simpler targets, larger tap zones, and rewards every 20 seconds
- **If kids complete one activity and leave** (no pull to continue): add a mystery-reward mechanic — "Tap the surprise egg to see what's next!" — creating a curiosity bridge between activities

## Measure Success (Days 6-7)

- **Primary:** Median session duration increases from 2 min to 4+ min
- **Secondary:** % of sessions reaching the 3-minute mark
- **Guardrail:** DAU does not drop (changes should retain existing users)
