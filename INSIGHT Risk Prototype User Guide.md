---
title: "INSIGHT Risk – Prototype User Guide"
created: '2026-04-06T11:20:00.000Z'
modified: '2026-04-06T11:20:00.000Z'
---

# INSIGHT Risk – Prototype User Guide

## Purpose

This guide explains how to use the deployed INSIGHT Risk prototype for internal setup, customer demonstration, and conference-style qualitative evaluation.

The prototype is designed to test how INSIGHT Risk outputs should be communicated when embedded into third-party systems such as EMR, RIS, or PACS environments.

---

## Site Structure

### 1. Setup page

URL:

- `https://insight-risk-prototype.vercel.app/`

Purpose:

- Internal use only
- Configure the case before showing the prototype to customers
- Select which prototype cards will appear in the customer-facing view

Main functions:

- Select sample case
- Adjust estimated risk
- Edit patient context
- Edit study context
- Configure Prototype 2 mode
- Turn each prototype on or off for evaluation
- Open the customer-facing evaluation page

### 2. Evaluation page

URL:

- `https://insight-risk-prototype.vercel.app/evaluation.html`

Purpose:

- Customer-facing demonstration page
- Shows only the selected prototypes
- Hides internal setup controls
- Allows limited in-page interaction for Prototype 2 cutoff mode

---

## Recommended Use Cases

- Conference booth demo
- Customer feedback session
- Clinical advisory board review
- UI concept review with EMR or RIS partners
- Internal discussion around reporting strategy

---

## Before Each Evaluation Session

1. Open the setup page.
2. Select the case that best matches the discussion goal.
3. Choose which prototypes to include.
4. Set the default mode for Prototype 2 if needed.
5. Review the preview cards on the right.
6. Click `Go To Evaluation`.
7. Use the evaluation page for customer-facing discussion.

---

## Available Sample Cases

The prototype currently includes these representative cases:

- `1.6%`: below both thresholds
- `1.8%`: above NCCN, below USPSTF/ASCO
- `2.4%`: discordant reference case
- `3.1%`: above both thresholds

Recommended use:

- Use `2.4%` as the main case for threshold interpretation discussion
- Use `1.8%` for near-boundary confusion testing
- Use `1.6%` and `3.1%` for below-both and above-both validation

---

## Prototype Selection Logic

### Prototype 1

- Fixed `3.0%` threshold only
- Best for testing simple binary communication

### Prototype 2

- Configurable threshold mode
- Supports:
  - `1.7%`
  - `3.0%`
  - `Both`
- Can also be changed directly inside the evaluation page

### Prototype 3

- Always shows dual-threshold interpretation
- Best for transparency testing

### Prototype 4

- Visual scale card
- Best for intuitive interpretation and threshold comparison

---

## Recommended Evaluation Setups

### Setup A: Simple vs complex interpretation

Use:

- Prototype 1
- Prototype 3
- Prototype 4

Goal:

- Compare simple binary interpretation against dual-threshold and visual presentation

### Setup B: Threshold sensitivity review

Use:

- Prototype 2 only

Goal:

- Compare user reaction to `1.7%`, `3.0%`, and `Both` modes

### Setup C: Full comparison

Use:

- Prototype 1
- Prototype 2
- Prototype 3
- Prototype 4

Goal:

- Run a complete communication preference study

---

## Suggested Session Flow

### Short conference interaction

Recommended duration:

- `1 to 3 minutes`

Flow:

1. Briefly explain that INSIGHT Risk outputs are typically rendered in third-party systems.
2. Show one or more prototype cards.
3. Ask which format is easiest to understand.
4. Ask whether the threshold logic feels clear or confusing.
5. Capture qualitative comments immediately.

### Deeper customer discussion

Recommended duration:

- `5 to 10 minutes`

Flow:

1. Introduce the 4 prototype styles.
2. Start with the `2.4%` scenario.
3. Compare single-threshold and dual-threshold interpretations.
4. Review Prototype 4 for visual interpretation preference.
5. For Prototype 2, switch between `1.7%`, `3.0%`, and `Both`.
6. Ask which approach feels most appropriate for their workflow.

---

## How To Explain The Prototype

Suggested explanation:

`INSIGHT Risk does not currently provide a standalone visual interface. The output can be delivered as structured data such as HL7, JSON, or CSV, and then rendered inside systems such as EMR or RIS. These prototypes are designed to evaluate which presentation style is most intuitive, least confusing, and most appropriate for workflow integration.`

---

## What To Avoid During Evaluation

- Do not imply that the prototype is a clinical recommendation engine
- Do not imply that one threshold is officially being selected through this exercise
- Do not over-explain the underlying algorithm unless needed for context
- Do not bias the participant toward one prototype before they react

---

## Recommended Questions During Use

- Which version is easiest to understand at a glance?
- Which version would fit best into your current workflow?
- Does showing both thresholds help or confuse you?
- Does this feel like useful risk communication, or does it feel too much like a triage alert?
- If you had to deploy one version in Epic or RIS, which would you choose?

---

## Operational Notes

- The setup page uses browser-local storage
- Configuration is browser-specific unless a future shared-state feature is added
- The evaluation page is intended to be the page shown to external reviewers
- Prototype order in evaluation view is fixed as:
  - top-left: Prototype 1
  - top-right: Prototype 2
  - bottom-left: Prototype 3
  - bottom-right: Prototype 4

---

## Quick Start

1. Open `https://insight-risk-prototype.vercel.app/`
2. Select the case and prototypes
3. Click `Go To Evaluation`
4. Show `https://insight-risk-prototype.vercel.app/evaluation.html`
5. Capture preference, confusion, and workflow fit feedback
