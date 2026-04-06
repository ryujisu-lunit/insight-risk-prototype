---
title: "INSIGHT Risk – Evaluation Scripts"
created: '2026-04-06T11:20:00.000Z'
modified: '2026-04-06T11:20:00.000Z'
---

# INSIGHT Risk – Evaluation Scripts

## Purpose

This document provides practical talk tracks and interview prompts for using the prototype in evaluation settings.

The scripts are written to support:

- conference booth interactions
- customer interviews
- clinical advisory board feedback
- internal moderated testing

The language is intentionally neutral and should not be used to imply treatment or management recommendations.

---

## Opening Script

### Short version

`We are evaluating different ways to display INSIGHT Risk results inside systems like EMR or RIS. The goal is to understand which presentation style is easiest to understand and best fits clinical workflow.`

### Slightly more detailed version

`INSIGHT Risk outputs can be delivered as structured data such as HL7 or JSON, but the final presentation depends on how third-party systems display the result. We built several prototype formats to understand which communication style is most intuitive and least confusing.`

---

## General Warm-Up Questions

- What is your role and how often do you review breast cancer risk information?
- In your current workflow, where would you expect this type of information to appear?
- Do you typically prefer a numeric score, a categorical label, or both?

---

## Prototype 1 Script

### Moderator setup

Show Prototype 1 with the current scenario.

### Intro line

`This version shows an estimated 5-year risk together with a fixed 3.0% threshold interpretation.`

### Suggested questions

- Is this easy to understand at first glance?
- Does the fixed threshold make this feel clear or too simplified?
- Would this be acceptable inside your workflow?
- Does this feel like a risk communication tool or more like a triage flag?

### Follow-up probe

`If this were shown in Epic or RIS, would you want more context than this?`

### What to listen for

- preference for simplicity
- concern about over-simplification
- concern that NCCN-related nuance is missing
- reactions to binary language

---

## Prototype 2 Script

### Moderator setup

Show Prototype 2 and use the built-in cutoff selector.

### Intro line

`This version keeps the same estimated 5-year risk but allows the interpretation to be shown using different threshold logic.`

### Suggested sequence

1. Show `1.7%`
2. Show `3.0%`
3. Show `Both`

### Suggested questions

- Which version feels most useful to you: `1.7%`, `3.0%`, or `Both`?
- Does changing the threshold help, or does it reduce confidence?
- If your institution had to implement one mode, which would you choose?
- When both thresholds are shown, does it feel transparent or confusing?

### Follow-up probe

`Would you want this choice to be configurable by site, or would you prefer one fixed interpretation?`

### What to listen for

- preference for local configurability
- discomfort with switching logic
- interest in site-specific deployment settings
- concerns about inconsistency across institutions

---

## Prototype 3 Script

### Moderator setup

Show Prototype 3 with both threshold interpretations visible.

### Intro line

`This version displays the estimated 5-year risk and shows how the same result maps to both reference thresholds at the same time.`

### Suggested questions

- Does seeing both threshold interpretations help you understand the result better?
- Does this feel more trustworthy because it is more transparent?
- Or does it feel too complex for routine workflow?
- Would this be appropriate in a radiologist-facing view, a referring clinician-facing view, or both?

### Follow-up probe

`If the score is 2.4%, is this presentation clear enough to explain why one threshold is positive and the other is not?`

### What to listen for

- appreciation of transparency
- confusion from dual interpretation
- concerns about cognitive load
- role-based differences in preference

---

## Prototype 4 Script

### Moderator setup

Show Prototype 4 with the visual scale.

### Intro line

`This version uses a visual scale so the estimated 5-year risk can be seen relative to both threshold markers.`

### Suggested questions

- Is this easier to understand than the text-only versions?
- Does the visual scale help clarify borderline cases?
- Would this be useful in your workflow, or does it take too much space?
- Do you trust this format more, less, or about the same as the text-based versions?

### Follow-up probe

`If this were displayed in a compact EMR card, would the visual format still be helpful?`

### What to listen for

- preference for visual cognition
- concern about UI space
- interpretation speed
- whether the scale reduces threshold confusion

---

## Comparison Script

### Suggested transition

`Now that you have seen several versions, I’d like to compare them directly.`

### Core comparison questions

- Which version would you prefer in real clinical use?
- Which version is easiest to understand without explanation?
- Which version would be least likely to be misinterpreted?
- Which version best fits into a real EMR or RIS workflow?
- Which version would you avoid using, and why?

---

## Threshold-Focused Script

Use this when the conversation centers on the discrepancy between `1.7%` and `3.0%`.

### Suggested line

`Some frameworks use different reference thresholds. We are not trying to select one threshold here; we are trying to understand the best way to communicate the result when those reference points are not fully aligned.`

### Questions

- Would you rather see one threshold only, or see both?
- If both are shown, how should they be explained?
- Do you think showing both improves trust, or creates ambiguity?

---

## Workflow-Fit Script

Use this when speaking with operational or implementation stakeholders.

### Suggested line

`We are also trying to understand how this could realistically fit into an existing workflow, not just which screen looks best in isolation.`

### Questions

- Where should this appear in your workflow?
- Should this appear in a worklist, a patient detail panel, or a report section?
- How much interpretation should be shown in the UI versus left to policy or downstream workflow?
- Would your users want a compact card or a more explanatory format?

---

## Closing Script

### Short version

`Thank you. Your feedback helps us understand how INSIGHT Risk results should be presented in a way that is clear, clinically useful, and appropriate for real-world system integration.`

### Optional final question

`If you could change one thing about what you just saw, what would it be?`

---

## Suggested Note-Taking Template

### Participant profile

- Role:
- Organization type:
- Familiarity with risk tools:

### Reactions by prototype

- Prototype 1:
- Prototype 2:
- Prototype 3:
- Prototype 4:

### Key findings

- Preferred format:
- Confusion points:
- Workflow fit comments:
- Threshold comments:
- Notable quote:

---

## Recommended Moderation Reminders

- Stay neutral
- Do not explain too much before the participant reacts
- Encourage comparison, not just isolated reaction
- Capture exact language when participants describe confusion or trust
- Focus on communication quality, not threshold endorsement
