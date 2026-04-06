---
title: "INSIGHT Risk – Prototype Evaluation Guide"
created: '2026-04-05T02:22:20.479Z'
modified: '2026-04-06T16:10:00.000Z'
---

# INSIGHT Risk – Prototype Evaluation Guide

## Overview

This document summarizes the current evaluation approach for INSIGHT Risk prototype testing.

The goal is to evaluate how INSIGHT Risk should be communicated when rendered inside third-party systems such as EMR, RIS, or PACS environments. The goal is not to endorse a single threshold. The goal is to understand which presentation strategy is most understandable, least misleading, and most compatible with real workflow.

---

## Why This Evaluation Is Needed

- INSIGHT Risk output is delivered as structured data such as `HL7`, `JSON`, or `CSV`
- INSIGHT Risk does not currently provide its own production UI layer
- Third-party systems will ultimately determine how the result is displayed
- Guideline references are not fully aligned

Current reference points used in the prototype:

- `1.7%`: NCCN
- `3.0%`: USPSTF/ASCO

---

## Regulatory and Messaging Principles

- Do not imply clinical recommendation or management direction
- Use neutral language such as:
  - `Estimated 5-yr risk`
  - `Increased`
  - `Non-increased`
  - `Reference threshold`
- Keep the exercise focused on communication strategy
- Make threshold logic visible when needed, but avoid overstating certainty

All prototype pages include this banner:

`For research / evaluation purposes only. Not for clinical use.`

All prototype cards include this disclosure:

`Lunit INSIGHT Risk provides a SEER-calibrated 5-year absolute breast cancer risk as a continuous value. Interpretation of this result and any subsequent clinical decisions should be made by the clinician in accordance with applicable guidelines (e.g., USPSTF, ASCO, NCCN).`

---

## Live Environment

### Setup page

- `https://insight-risk-prototype.vercel.app/`

Purpose:

- internal setup only
- choose scenario
- edit patient and study context
- choose which prototypes appear in evaluation
- set Prototype 3 mode for the main prototype flow
- open evaluation page
- open configuration sandbox

### Evaluation page

- `https://insight-risk-prototype.vercel.app/evaluation.html`

Purpose:

- customer-facing review page
- shows only selected prototypes
- fixed display order:
  - top-left: Prototype 1
  - top-right: Prototype 2
  - bottom-left: Prototype 3
  - bottom-right: Prototype 4

### Configuration sandbox

- `https://insight-risk-prototype.vercel.app/configuration.html`

Purpose:

- independent experimental page
- does not change the main setup/evaluation prototype state
- used only to explore cutoff display options in isolation

---

## Current Prototype Set

## Prototype 1

**Estimated 5-year risk only**

Characteristics:

- numeric risk only
- no cutoff display
- no increased/non-increased classification

Evaluation use:

- tests whether a pure continuous value is sufficient
- helps identify whether users require interpretation support

---

## Prototype 2

**Estimated 5-year risk + fixed 3.0% increased/non-increased**

Characteristics:

- numeric risk
- fixed `3.0%` threshold
- binary interpretation only

Evaluation use:

- tests a simple operational format
- useful for understanding whether a single fixed threshold is preferred

---

## Prototype 3

**Estimated 5-year risk + configurable cutoff-based increased/non-increased**

Characteristics:

- numeric risk
- configurable interpretation mode
- supports:
  - `1.7%`
  - `3.0%`
  - `Both`

Main flow behavior:

- controlled from the setup page
- shown in evaluation according to the selected setup mode

Evaluation use:

- tests whether configurable interpretation adds value or confusion
- tests whether participants prefer one threshold or dual-threshold visibility

---

## Prototype 4

**Visual scale card**

Characteristics:

- numeric risk
- horizontal visual scale
- includes `1.7%` and `3.0%` reference markers
- includes text interpretation below the scale

Evaluation use:

- tests whether a visual format improves understanding of borderline cases
- useful for measuring intuitive comprehension

---

## Independent Configuration Sandbox

The configuration page is intentionally separate from the main prototype flow.

Purpose:

- explore cutoff display logic independently
- avoid affecting the actual customer-facing prototype set

Configuration options:

- cutoff value setting: on/off
- if enabled:
  - `1.7%`
  - `3.0%`
  - `Both`

Preview behavior:

- the result is shown immediately in the preview panel
- changes do not modify the main setup/evaluation state

---

## Recommended Test Cases

Current scenarios:

- `1.6%`: below both thresholds
- `1.8%`: above NCCN, below USPSTF/ASCO
- `2.4%`: discordant case
- `3.1%`: above both thresholds

Recommended primary discussion case:

- `2.4%`

Why:

- easiest case for observing reactions to threshold disagreement

---

## Suggested Evaluation Questions

- Which format is easiest to understand at first glance?
- Which format would fit best into your workflow?
- Does this feel like risk communication or like a triage alert?
- Do you prefer no threshold, a fixed threshold, or configurable threshold logic?
- Is the visual scale more helpful than text-only interpretation?

---

## Success Metrics

- preferred prototype by participant type
- perceived clarity
- confusion related to threshold logic
- perceived workflow fit
- comments suggesting over-interpretation risk
- preference for continuous vs binary vs configurable display

---

## Strategic Takeaway

This evaluation is about communication design, not threshold endorsement.

The main questions are:

- when should cutoff logic be shown?
- should one threshold or multiple thresholds be visible?
- does configurability help or create confusion?
- what format best fits real-world system integration?
