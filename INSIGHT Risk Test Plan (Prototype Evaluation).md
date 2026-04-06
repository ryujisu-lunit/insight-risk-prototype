---
title: "\U0001F9EA INSIGHT Risk – A/B Test Plan (Prototype Evaluation)"
created: '2026-04-05T02:22:20.479Z'
modified: '2026-04-05T02:22:24.498Z'
---

# 🧪 INSIGHT Risk – A/B Test Plan (Prototype Evaluation)

## 📌 Overview

This document outlines the plan to evaluate different presentation formats of **INSIGHT Risk** outputs through lightweight prototypes during a conference setting.

The goal is to collect qualitative and quantitative feedback from potential users (radiologists, clinicians) on how breast cancer risk should be communicated.

---

## 🎯 Objectives

### Primary Goals

* Evaluate usability of **continuous risk score (0–99%)**
* Assess preference for **risk categorization (binary vs spectrum)**
* Understand perception of **different guideline thresholds**

  * 1.7% (NCCN)
  * 3.0% (USPSTF / ACR)

### Secondary Goals

* Identify potential **confusion due to multiple thresholds**
* Evaluate whether the tool is perceived as a **triage tool vs risk assessment tool**
* Explore optimal **UI representation for clinical workflow integration**

---

## ⚠️ Key Considerations

### 1. Regulatory Sensitivity

* Avoid implying **clinical action recommendations**
* Use neutral language such as:

  * “Above reference threshold”
  * “For informational purposes only”

---

### 2. Guideline Discrepancy

* NCCN: 1.7%
* USPSTF / ACR: 3%

👉 This discrepancy should be explored, not hidden.

---

### 3. Risk of Misinterpretation

* Binary classification may lead to:

  * Oversimplification
  * Misuse as triage tool

---

## 🧪 Experiment Design

### Test Groups

| Group | Continuous Score | Threshold Display | Description            |
| ----- | ---------------- | ----------------- | ---------------------- |
| A     | Yes              | None              | Continuous only        |
| B     | Yes              | 3%                | USPSTF/ACR threshold   |
| C     | Yes              | 1.7%              | NCCN threshold         |
| D     | Yes              | Both              | Dual threshold display |

👉 Group D is critical for evaluating guideline interpretation.

---

## 🖥 Prototype Design

### Option A: Continuous Only

* Display:

  * Risk score (e.g., 2.4%)
  * Minimal context

---

### Option B: Single Threshold

* Display:

  * Risk score
  * “Increased / Non-increased” (based on 3%)

---

### Option C: NCCN Threshold

* Same as Option B
* Using 1.7% cutoff

---

### Option D: Dual Threshold (Recommended ⭐)

* Display:

  * Risk score
  * Visual scale with:

    * 1.7% marker (NCCN)
    * 3.0% marker (USPSTF/ACR)
  * Interpretation:

    * Above NCCN threshold
    * Below USPSTF threshold

---

### Option E: Risk Spectrum (Optional)

* Categories:

  * Low / Intermediate / High
* Goal:

  * Reduce binary bias

---

## 🔄 HL7 to UI Mapping

Example HL7:

```
OBX|1|NM|RISK_SCORE||2.4|%|
OBX|2|NM|THRESHOLD_NCCN||1.7|%|
OBX|3|NM|THRESHOLD_USPSTF||3.0|%|
```

UI Translation:

* Risk: 2.4%
* Above NCCN threshold
* Below USPSTF threshold

---

## 🧾 Survey Design

### Section 1: Understanding

**Q1. How easy was it to understand the result?**
(1–5 scale)

---

### Section 2: Clinical Usefulness

**Q2. Do you think this information is useful for clinical decision-making?**

---

### Section 3: Format Preference

**Q3. Which format do you prefer?**

* Continuous only
* Binary only
* Both
* Not sure

---

### Section 4: Threshold Perception

**Q4. Is having multiple thresholds confusing?**

---

### Section 5: Behavioral Impact

**Q5. Would this result influence your decision to recommend further screening (e.g., MRI)?**

---

### Section 6: Open Feedback

**Q6. Any additional comments?**

---

## 🧑‍⚕️ Conference Execution Plan

### Setup

* Tablet devices (iPad recommended)
* Web-based prototype
* QR code for survey access

---

### Flow (1–2 minutes per participant)

1. Brief explanation (~10 seconds)
2. Show prototype
3. Let user interact
4. Collect feedback immediately

---

### Key Focus

* Capture **qualitative insights**
* Ask:

  * “Why do you prefer this format?”

---

## 📊 Success Metrics

* % preference for each UI type
* Understanding score (average)
* Confusion level (threshold-related)
* Qualitative feedback themes

---

## 💡 Strategic Insight

This experiment is NOT about selecting a threshold.

👉 It is about defining:

* How risk should be communicated
* Whether thresholds are needed
* How clinicians interpret risk outputs
* How to position INSIGHT Risk in clinical workflow

---

## 🚀 Expected Outcome

* Clear direction on:

  * Continuous vs categorical output
  * Single vs dual threshold strategy
  * UI design principles

---

## 🧠 Final Note

This prototype serves as:

* A feedback tool
* A concept validation layer
* A foundation for future product UI (viewer/worklist integration)

---

**Goal is not perfection, but learning from real users.**

