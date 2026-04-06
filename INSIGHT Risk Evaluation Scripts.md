---
title: "INSIGHT Risk – Evaluation Scripts"
created: '2026-04-06T11:20:00.000Z'
modified: '2026-04-06T16:10:00.000Z'
---

# INSIGHT Risk – Evaluation Scripts

## Opening Script

Short version:

`We are evaluating different ways to present INSIGHT Risk results when they are displayed inside systems such as EMR, RIS, or PACS. The goal is to understand which format is most intuitive and best fits workflow.`

Extended version:

`INSIGHT Risk provides a continuous 5-year absolute breast cancer risk. Because the output may be rendered inside third-party systems, we are testing several display styles to understand which presentation is clearest, least confusing, and most appropriate for real workflow use.`

---

## General Warm-Up Questions

- What is your role?
- How often do you review breast cancer risk information?
- Where would you expect to see this type of result in your workflow?

---

## Prototype 1 Script

Intro:

`This version shows only the estimated 5-year risk without any threshold interpretation.`

Questions:

- Is the continuous value alone understandable?
- Would you want any interpretation support added?
- Does this feel too minimal, or appropriately neutral?

Listen for:

- whether participants want classification support
- whether participants trust a continuous value without threshold labels

---

## Prototype 2 Script

Intro:

`This version shows the estimated 5-year risk together with a fixed 3.0% increased or non-increased interpretation.`

Questions:

- Is the fixed 3.0% cutoff easy to understand?
- Does this feel clinically practical?
- Does a fixed threshold help, or does it oversimplify?

Listen for:

- preference for operational simplicity
- concern about losing nuance

---

## Prototype 3 Script

Intro:

`This version shows the estimated 5-year risk together with configurable threshold logic. In the main prototype flow, the mode can be set to 1.7%, 3.0%, or both.`

Questions:

- Which mode feels most useful: `1.7%`, `3.0%`, or `Both`?
- Does showing both thresholds help or confuse you?
- Does configurability make this more useful or less trustworthy?

Listen for:

- comfort with configurable logic
- demand for transparency
- concern about inconsistency

---

## Prototype 4 Script

Intro:

`This version uses a visual scale so the estimated 5-year risk can be seen relative to both threshold markers.`

Questions:

- Is the visual scale easier to understand than the text-based formats?
- Does it help explain borderline cases more quickly?
- Would this fit your actual UI environment?

Listen for:

- preference for visual interpretation
- concern about screen space

---

## Configuration Sandbox Script

Intro:

`This separate page is an independent sandbox for cutoff display behavior. It does not change the main evaluation setup.`

Questions:

- If cutoff display can be turned off entirely, is that useful?
- If cutoff display is enabled, which mode feels most appropriate?
- Would this kind of configurability be useful for institution-level setup?

---

## Comparison Questions

- Which version is easiest to understand at first glance?
- Which version would fit best into your workflow?
- Which version would you trust the most?
- Which version would you avoid using, and why?

---

## Required Safety Statement

If needed, remind participants:

`These prototypes are for research and evaluation purposes only and are not intended for clinical use.`

---

## Closing Script

`Thank you. Your feedback helps us understand how INSIGHT Risk should be presented in a way that is clear, clinically appropriate, and realistic for third-party system integration.`
