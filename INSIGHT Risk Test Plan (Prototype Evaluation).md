---
title: "INSIGHT Risk – Prototype Evaluation Guide"
created: '2026-04-05T02:22:20.479Z'
modified: '2026-04-06T11:05:00.000Z'
---

# INSIGHT Risk – Prototype Evaluation Guide

## Overview

This document summarizes the current prototype evaluation approach for **INSIGHT Risk** breast cancer risk output presentation.

The objective is not to decide a single threshold.  
The objective is to evaluate how INSIGHT Risk results should be communicated inside third-party clinical systems such as EMR, RIS, or PACS environments.

This is especially important because:

- INSIGHT Risk itself does not provide a native UI/UX layer
- Outputs are delivered via structured formats such as `HL7`, `JSON`, or `CSV`
- The actual user experience will depend on how external systems choose to render those outputs
- Current guideline references are not fully aligned

The prototype environment has been implemented as a lightweight web experience with:

- An internal `setup` page for scenario configuration and prototype selection
- A customer-facing `evaluation` page for reviewing selected prototype formats only

---

## Current Guideline Context

### Reference thresholds reflected in the prototype

- `1.7%`: NCCN reference threshold
- `3.0%`: USPSTF/ASCO reference threshold

### Interpretation principle

The discrepancy between thresholds should be made visible rather than hidden.

Example:

- `Estimated 5-yr risk: 2.4%`
- `Increased at 1.7% NCCN`
- `Non-increased at 3.0% USPSTF/ASCO`

This is especially relevant because NCCN has incorporated image-based risk assessment context, while other frameworks may still rely on traditional risk model conventions.

---

## Key Evaluation Questions

- Do users understand the result quickly and correctly?
- Does the result feel like a `risk communication tool` rather than a `triage alert`?
- Is a single threshold easier to understand, or does it create oversimplification?
- Is showing both thresholds more transparent, or more confusing?
- Which format is most realistic for embedding into Epic, RIS, PACS, or similar environments?

---

## Regulatory and Messaging Principles

- Avoid direct management recommendations
- Avoid language that implies automatic downstream action
- Prefer neutral phrasing such as:
  - `Increased`
  - `Non-increased`
  - `Reference threshold`
  - `Estimated 5-yr risk`
- Keep threshold logic visible when relevant
- Treat the prototype as a communication study, not a clinical recommendation engine

---

## Implemented Prototype Structure

## 1. Internal Setup Page

Purpose:

- Configure sample cases
- Adjust risk values
- Select which prototypes will be shown to customers
- Configure Prototype 2 default threshold mode before evaluation

Current entry URL:

- `https://insight-risk-prototype.vercel.app/`

Main controls:

- Example case selection
- Estimated risk slider
- Patient context
- Study context
- Prototype 2 mode
  - `1.7% cutoff`
  - `3.0% cutoff`
  - `Both thresholds`
- Per-prototype inclusion toggle
- `Go To Evaluation` button

---

## 2. Customer-Facing Evaluation Page

Purpose:

- Hide internal setup controls
- Show only selected prototypes
- Allow focused qualitative review by clinicians or customers

Evaluation URL:

- `https://insight-risk-prototype.vercel.app/evaluation.html`

Current behavior:

- Prototypes appear in fixed order:
  - top-left: Prototype 1
  - top-right: Prototype 2
  - bottom-left: Prototype 3
  - bottom-right: Prototype 4
- Only prototypes selected on the setup page are shown
- Prototype 2 supports in-page cutoff switching during evaluation

---

## Implemented Prototype Set

## Prototype 1

**Estimated 5-yr risk + fixed 3.0% binary interpretation**

Characteristics:

- Displays estimated 5-year risk
- Uses a fixed `3.0%` threshold
- Status box includes:
  - `Increased (>=3.0%)` or
  - `Non-increased (<3.0%)`
- Intended to evaluate a simple, single-threshold communication pattern

Strengths:

- Easy to explain
- Likely easy to implement in external systems

Risks:

- May hide NCCN-related interpretation nuance
- May oversimplify borderline cases

---

## Prototype 2

**Estimated 5-yr risk + configurable threshold logic**

Characteristics:

- Displays estimated 5-year risk
- Allows evaluation with:
  - `1.7%`
  - `3.0%`
  - `Both`
- In the customer-facing evaluation page, the cutoff mode can be changed directly inside the card

Use case:

- Useful for testing whether users want one configurable operational mode
- Useful for comparing how interpretation changes when the same numeric risk is anchored to different thresholds

Key evaluation question:

- Do users prefer configurability, or does it make the result feel unstable?

---

## Prototype 3

**Estimated 5-yr risk + dual reference display**

Characteristics:

- Displays estimated 5-year risk
- Shows both:
  - `1.7% NCCN`
  - `3.0% USPSTF/ASCO`
- Status box explicitly includes both interpretations

Example:

- `Increased (>=1.7%)`
- `Non-increased (<3.0%)`

Use case:

- Best for evaluating transparency when guideline references diverge

Key evaluation question:

- Does dual display improve trust and understanding, or create cognitive burden?

---

## Prototype 4

**Visual scale card**

Characteristics:

- Displays estimated 5-year risk on a horizontal scale
- Shows both threshold markers:
  - `1.7%`
  - `3.0%`
- Uses a visual position marker for the estimated risk value
- Includes text interpretation beneath the scale

Use case:

- Best for evaluating intuitive understanding of borderline or discordant cases

Key evaluation question:

- Is a visual spectrum easier to understand than text-only threshold interpretation?

---

## Recommended Test Cases

The following scenarios are already configured in the prototype and should be used during review:

- `1.6%`: below both thresholds
- `1.8%`: above NCCN, below USPSTF/ASCO
- `2.4%`: representative discordant case
- `3.1%`: above both thresholds

These cases are important because they test:

- below-threshold clarity
- near-threshold confusion
- dual-threshold discordance
- fully above-threshold interpretation

---

## Example HL7 to UI Mapping

Example HL7:

```hl7
OBX|1|NM|RISK_SCORE||2.4|%|
OBX|2|NM|THRESHOLD_NCCN||1.7|%|
OBX|3|NM|THRESHOLD_USPSTF||3.0|%|
```

UI translation examples:

- `Estimated 5-yr risk: 2.4%`
- `Increased (>=1.7%)`
- `Non-increased (<3.0%)`

This reinforces that the presentation layer should remain separable from the transport format.

---

## Suggested Evaluation Flow

### Internal setup

1. Open the setup page
2. Choose the patient scenario
3. Select the prototypes to show
4. If needed, set Prototype 2 default mode
5. Click `Go To Evaluation`

### Customer interview flow

1. Briefly explain that this is a prototype of how INSIGHT Risk output may appear inside third-party systems
2. Show the selected prototypes
3. Ask the participant to compare them
4. Capture immediate preference and confusion points
5. If useful, change scenario or Prototype 2 mode and observe reaction

Recommended interaction time:

- `1–3 minutes` per participant

---

## Suggested Survey Questions

### Understanding

- How easy was this result to understand?

### Interpretation confidence

- Did the result feel clinically interpretable without over-directing action?

### Format preference

- Which format would you prefer to see inside your workflow?

### Threshold clarity

- Was the threshold logic clear?
- Was it confusing to see more than one threshold?

### Workflow fit

- Which format would fit best inside Epic, RIS, or PACS?

### Open comment

- What would you change before using this in practice?

---

## Success Metrics

- Preference rate by prototype
- Average understanding score
- Perceived confusion level
- Frequency of comments suggesting triage misinterpretation
- Preference for single-threshold vs dual-threshold logic
- Feedback on fit within existing clinical UI environments

---

## Deployment Status

The prototype is now deployed and accessible online.

### Production URL

- `https://insight-risk-prototype.vercel.app/`

### Notes

- The site is currently a static front-end deployment
- The setup page uses browser-local state for selected configurations
- The evaluation page is intended for customer-facing demonstration
- If shared-state links are needed later, URL-based configuration can be added

---

## Strategic Takeaway

This prototype effort should be treated as an evaluation of communication strategy, not threshold endorsement.

The main questions are:

- How should image-based risk be represented?
- When should threshold logic be shown?
- Should single or dual-threshold interpretation be visible?
- What format minimizes confusion while preserving transparency?

The current prototype suite is therefore appropriate for:

- conference booth feedback
- customer interviews
- clinical advisory board discussion
- UI integration discussion with third-party platform partners
