---
title: "INSIGHT Risk – Prototype User Guide"
created: '2026-04-06T11:20:00.000Z'
modified: '2026-04-06T16:10:00.000Z'
---

# INSIGHT Risk – Prototype User Guide

## Purpose

This guide explains how to use the deployed INSIGHT Risk prototype site for internal setup, customer demonstration, and conference-style evaluation.

---

## Pages

## 1. Setup page

URL:

- `https://insight-risk-prototype.vercel.app/`

Use this page to:

- select the scenario
- adjust estimated risk
- edit patient context
- edit study context
- set Prototype 3 mode
- select which prototypes are shown in evaluation
- open the evaluation page
- open the configuration sandbox

## 2. Evaluation page

URL:

- `https://insight-risk-prototype.vercel.app/evaluation.html`

Use this page to:

- show customers only the selected prototypes
- compare the selected formats in a clean layout
- collect preference and workflow feedback

## 3. Configuration sandbox

URL:

- `https://insight-risk-prototype.vercel.app/configuration.html`

Use this page to:

- explore cutoff on/off behavior
- compare `1.7%`, `3.0%`, and `Both`
- preview cutoff behavior independently

Important:

- this page is independent
- it does not change the main prototype setup or evaluation state

---

## Current Prototype Definitions

## Prototype 1

- Estimated 5-year risk only
- no cutoff shown

## Prototype 2

- Estimated 5-year risk
- fixed `3.0%` increased/non-increased

## Prototype 3

- Estimated 5-year risk
- configurable increased/non-increased
- supports:
  - `1.7%`
  - `3.0%`
  - `Both`

## Prototype 4

- visual scale card
- shows both threshold markers

---

## Before a Customer Session

1. Open the setup page.
2. Choose the scenario.
3. Adjust risk or patient context if needed.
4. Set Prototype 3 mode.
5. Select the prototype cards to include.
6. Click `Go To Evaluation`.
7. Use the evaluation page for the actual customer discussion.

If you want to discuss cutoff logic independently:

1. Open `Open Configuration`.
2. Test cutoff on/off behavior there.
3. Use that page as a separate sandbox only.

---

## Recommended Scenarios

- `1.6%`: below both thresholds
- `1.8%`: above NCCN, below USPSTF/ASCO
- `2.4%`: main discordant case
- `3.1%`: above both thresholds

Best default case for discussion:

- `2.4%`

---

## Recommended Session Types

## Short conference demo

- show 2 to 4 prototypes
- ask for the most intuitive format
- capture one key reason

## Customer workflow discussion

- start with `2.4%`
- compare Prototype 1, 2, 3, and 4
- ask where this should appear in EMR, RIS, or PACS

## Threshold discussion

- use Prototype 3
- optionally use the configuration sandbox separately
- ask whether one threshold, both thresholds, or no threshold is preferred

---

## Required Safety Language

All pages display:

`For research / evaluation purposes only. Not for clinical use.`

All prototype cards display:

`Lunit INSIGHT Risk provides a SEER-calibrated 5-year absolute breast cancer risk as a continuous value. Interpretation of this result and any subsequent clinical decisions should be made by the clinician in accordance with applicable guidelines (e.g., USPSTF, ASCO, NCCN).`

---

## Moderator Reminders

- do not frame the exercise as selecting a final threshold
- do not imply treatment recommendation
- ask why whenever participants choose a preferred prototype
- focus on clarity, trust, and workflow fit
