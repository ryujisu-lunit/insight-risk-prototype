# INSIGHT Risk Prototype

Static prototype site for evaluating how INSIGHT Risk output may be presented inside third-party clinical systems.

## Live URLs

- Setup: `https://insight-risk-prototype.vercel.app/`
- Evaluation: `https://insight-risk-prototype.vercel.app/evaluation.html`
- Configuration sandbox: `https://insight-risk-prototype.vercel.app/configuration.html`

## Current Structure

- `index.html`
  Internal setup page used to select cases and choose which prototypes will be shown in evaluation.
- `evaluation.html`
  Customer-facing page that shows only the selected prototypes.
- `configuration.html`
  Independent sandbox page for exploring cutoff display behavior without affecting the main prototype flow.
- `script.js`
  Shared rendering and state logic.
- `styles.css`
  Shared UI styling.

## Current Prototype Set

- Prototype 1: Estimated 5-year risk only
- Prototype 2: Estimated 5-year risk + fixed `3.0%` increased/non-increased
- Prototype 3: Estimated 5-year risk + configurable cutoff-based increased/non-increased
  Modes: `1.7%`, `3.0%`, `Both`
- Prototype 4: Visual scale card

## Important Notice

All pages display:

`For research / evaluation purposes only. Not for clinical use.`

Each prototype card also includes the following disclosure:

`Lunit INSIGHT Risk provides a SEER-calibrated 5-year absolute breast cancer risk as a continuous value. Interpretation of this result and any subsequent clinical decisions should be made by the clinician in accordance with applicable guidelines (e.g., USPSTF, ASCO, NCCN).`

## Local Preview

```bash
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173`.

## Deployment

This project is deployed through GitHub + Vercel as a static site with no build step required.
