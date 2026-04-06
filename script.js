const scenarios = [
  {
    id: "below-both",
    label: "1.6%: below both thresholds",
    risk: 1.6,
    patient: "48F screening mammography",
    study: "Heterogeneously dense breasts, no interval suspicious finding"
  },
  {
    id: "between-thresholds",
    label: "2.4%: above NCCN, below USPSTF/ASCO",
    risk: 2.4,
    patient: "53F screening mammography",
    study: "Bilateral screening mammogram, no suspicious interval change"
  },
  {
    id: "slightly-above-nccn",
    label: "1.8%: near NCCN boundary",
    risk: 1.8,
    patient: "45F annual screening",
    study: "Scattered fibroglandular density, no suspicious calcification"
  },
  {
    id: "above-both",
    label: "3.1%: above both thresholds",
    risk: 3.1,
    patient: "57F screening with prior benign biopsy history",
    study: "Stable post-procedural changes, no new dominant mass"
  }
];

const thresholds = {
  nccn: 1.7,
  uspstf: 3.0,
  maxVisual: 6.0
};

const prototypeDefinitions = {
  prototype1: {
    title: "Prototype 1",
    subtitle: "Estimated Risk + 3.0% Binary",
    badge: "Fixed 3.0%",
    badgeClass: "unified"
  },
  prototype2: {
    title: "Prototype 2",
    subtitle: "Estimated Risk + Configurable Binary",
    badge: "Configurable",
    badgeClass: "unified"
  },
  prototype3: {
    title: "Prototype 3",
    subtitle: "Estimated Risk + Dual Threshold",
    badge: "Dual reference",
    badgeClass: "unified"
  },
  prototype4: {
    title: "Prototype 4",
    subtitle: "Visual Scale Card",
    badge: "Integrated view",
    badgeClass: "unified"
  }
};

const defaultConfig = {
  scenarioId: "between-thresholds",
  risk: 2.4,
  patient: "53F screening mammography",
  study: "Bilateral screening mammogram, no suspicious interval change",
  prototype2Threshold: "1.7",
  selected: ["prototype1", "prototype2", "prototype3", "prototype4"]
};

function formatRisk(value) {
  return `${Number(value).toFixed(1)}%`;
}

function binaryLabel(risk, threshold) {
  return risk >= threshold ? "Increased risk" : "Non-increased risk";
}

function binaryBoxLabel(risk, threshold) {
  const comparator = risk >= threshold ? ">=" : "<";
  const prefix = risk >= threshold ? "Increased" : "Non-increased";
  return `${prefix} (${comparator}${formatRisk(threshold)})`;
}

function binaryDescriptor(risk, threshold, label) {
  return `${binaryLabel(risk, threshold)} using ${formatRisk(threshold)} ${label} reference`;
}

function dualStatus(risk) {
  const nccn = binaryLabel(risk, thresholds.nccn);
  const uspstf = binaryLabel(risk, thresholds.uspstf);
  return {
    nccn: `${nccn} at 1.7% NCCN`,
    uspstf: `${uspstf} at 3.0% USPSTF/ASCO`
  };
}

function buildSummary(risk) {
  const riskText = formatRisk(risk);
  if (risk < thresholds.nccn) {
    return `Risk ${riskText} is below both NCCN 1.7% and USPSTF/ASCO 3.0% thresholds.`;
  }
  if (risk < thresholds.uspstf) {
    return `Risk ${riskText} is above NCCN 1.7% and below USPSTF/ASCO 3.0%.`;
  }
  return `Risk ${riskText} is above both NCCN 1.7% and USPSTF/ASCO 3.0% thresholds.`;
}

function getSpectrumPosition(risk) {
  return `${Math.min((risk / thresholds.maxVisual) * 100, 100)}%`;
}

function loadConfig() {
  try {
    const raw = localStorage.getItem("insight-risk-config");
    if (!raw) {
      return { ...defaultConfig };
    }
    const parsed = JSON.parse(raw);
    return {
      ...defaultConfig,
      ...parsed,
      selected: Array.isArray(parsed.selected) && parsed.selected.length ? parsed.selected : defaultConfig.selected
    };
  } catch {
    return { ...defaultConfig };
  }
}

function saveConfig(config) {
  localStorage.setItem("insight-risk-config", JSON.stringify(config));
}

function getPrototype2Mode(config) {
  return String(config.prototype2Threshold);
}

function getPrototype2Badge(mode) {
  if (mode === "both") {
    return "Both active";
  }
  return `${formatRisk(Number(mode))} active`;
}

function renderPrototype(prototypeId, config, options = {}) {
  const { showSelection = false, showEvaluationControls = false } = options;
  const risk = Number(config.risk);
  const riskText = formatRisk(risk);
  const patient = config.patient;
  const study = config.study;
  const prototype2Mode = getPrototype2Mode(config);
  const dual = dualStatus(risk);
  const meta = prototypeDefinitions[prototypeId];
  const selected = config.selected.includes(prototypeId);
  const selectionControl = showSelection ? `
    <label class="card-select" aria-label="Include ${meta.title} in evaluation">
      <input type="checkbox" class="prototype-checkbox" value="${prototypeId}" ${selected ? "checked" : ""}>
      <span class="card-switch" aria-hidden="true"></span>
      <span class="card-select-label">Include in evaluation</span>
    </label>
  ` : "";

  if (prototypeId === "prototype1") {
    return `
      <div class="card-header">
        <div>
          <p class="prototype-type">${meta.title}</p>
          <h3>${meta.subtitle}</h3>
        </div>
        <div class="header-actions">
          <span class="badge ${meta.badgeClass}">${meta.badge}</span>
          ${selectionControl}
        </div>
      </div>
      <div class="compact-layout">
        <div class="metric-block">
          <span class="metric-label">Estimated 5-yr risk</span>
          <strong class="metric-value">${riskText}</strong>
          <div class="metric-status-stack">
            <span class="metric-status">${binaryBoxLabel(risk, thresholds.uspstf)}</span>
          </div>
        </div>
        <div class="compact-copy">
          <p class="patient-line">${patient}</p>
          <p class="interpretation">${binaryDescriptor(risk, thresholds.uspstf, "USPSTF/ASCO")}</p>
          <p class="supporting">Single-cutoff prototype using a fixed 3.0% threshold.</p>
        </div>
      </div>
    `;
  }

  if (prototypeId === "prototype2") {
    const thresholdLabel = prototype2Mode === "1.7" ? "NCCN" : "USPSTF/ASCO";
    const metricStatus = prototype2Mode === "both"
      ? `
          <div class="metric-status-stack">
            <span class="metric-status">${binaryBoxLabel(risk, thresholds.nccn)}</span>
            <span class="metric-status">${binaryBoxLabel(risk, thresholds.uspstf)}</span>
          </div>
        `
      : `
          <div class="metric-status-stack">
            <span class="metric-status">${binaryBoxLabel(risk, Number(prototype2Mode))}</span>
          </div>
        `;
    const interpretation = prototype2Mode === "both"
      ? `${dual.nccn} / ${dual.uspstf}`
      : binaryDescriptor(risk, Number(prototype2Mode), thresholdLabel);
    const thresholdControl = showEvaluationControls ? `
      <div class="inline-control">
        <span class="inline-control-label">Cutoff</span>
        <div class="segmented-control" role="group" aria-label="Prototype 2 cutoff selection">
          <button type="button" class="segmented-option ${prototype2Mode === "1.7" ? "active" : ""}" data-eval-threshold="1.7">1.7%</button>
          <button type="button" class="segmented-option ${prototype2Mode === "3.0" ? "active" : ""}" data-eval-threshold="3.0">3.0%</button>
          <button type="button" class="segmented-option ${prototype2Mode === "both" ? "active" : ""}" data-eval-threshold="both">Both</button>
        </div>
      </div>
    ` : "";
    return `
      <div class="card-header">
        <div>
          <p class="prototype-type">${meta.title}</p>
          <h3>${meta.subtitle}</h3>
        </div>
        <div class="header-actions">
          <span class="badge ${meta.badgeClass}">${getPrototype2Badge(prototype2Mode)}</span>
          ${selectionControl}
        </div>
      </div>
      <div class="compact-layout">
        <div class="metric-block">
          <span class="metric-label">Estimated 5-yr risk</span>
          <strong class="metric-value">${riskText}</strong>
          ${metricStatus}
        </div>
        <div class="compact-copy">
          <p class="patient-line">${patient}</p>
          ${thresholdControl}
          <p class="interpretation">${interpretation}</p>
          <p class="supporting">Threshold can be swapped in setup before sharing the evaluation page.</p>
        </div>
      </div>
    `;
  }

  if (prototypeId === "prototype3") {
    return `
      <div class="card-header">
        <div>
          <p class="prototype-type">${meta.title}</p>
          <h3>${meta.subtitle}</h3>
        </div>
        <div class="header-actions">
          <span class="badge ${meta.badgeClass}">${meta.badge}</span>
          ${selectionControl}
        </div>
      </div>
      <div class="detail-grid">
        <div class="detail-stat">
          <span>Estimated 5-yr risk</span>
          <strong>${riskText}</strong>
          <div class="metric-status-stack">
            <span class="metric-status">${binaryBoxLabel(risk, thresholds.nccn)}</span>
            <span class="metric-status">${binaryBoxLabel(risk, thresholds.uspstf)}</span>
          </div>
        </div>
        <div class="detail-copy">
          <p class="patient-line">${patient}</p>
          <p class="supporting">${study}</p>
        </div>
      </div>
      <div class="guideline-table">
        <div>
          <span>NCCN</span>
          <strong>${dual.nccn}</strong>
        </div>
        <div>
          <span>USPSTF/ASCO</span>
          <strong>${dual.uspstf}</strong>
        </div>
      </div>
    `;
  }

  return `
    <div class="card-header">
      <div>
        <p class="prototype-type">${meta.title}</p>
        <h3>${meta.subtitle}</h3>
      </div>
      <div class="header-actions">
        <span class="badge ${meta.badgeClass}">${meta.badge}</span>
        ${selectionControl}
      </div>
    </div>
    <p class="visual-intro">A single horizontal reference scale makes threshold disagreement easy to see.</p>
    <div class="scale-wrap">
      <div class="scale-track">
        <div class="marker marker-nccn" style="left: 28.3%;">
          <span>1.7%</span>
        </div>
        <div class="marker marker-uspstf" style="left: 50%;">
          <span>3.0%</span>
        </div>
        <div class="risk-pin" style="left: ${getSpectrumPosition(risk)};">
          <span>${riskText}</span>
        </div>
      </div>
      <div class="scale-axis">
        <span>0%</span>
        <span>6%</span>
      </div>
    </div>
    <p class="interpretation">${dual.nccn} / ${dual.uspstf}</p>
    <p class="supporting">${study}</p>
  `;
}

function initSetupPage() {
  const config = loadConfig();
  const scenarioSelect = document.getElementById("scenarioSelect");
  const riskInput = document.getElementById("riskInput");
  const riskOutput = document.getElementById("riskOutput");
  const patientInput = document.getElementById("patientInput");
  const studyInput = document.getElementById("studyInput");
  const summaryText = document.getElementById("summaryText");
  const prototype2Threshold = document.getElementById("prototype2Threshold");
  const openEvaluation = document.getElementById("openEvaluation");
  const panels = [...document.querySelectorAll(".prototype-panel")];

  scenarios.forEach((scenario) => {
    const option = document.createElement("option");
    option.value = scenario.id;
    option.textContent = scenario.label;
    scenarioSelect.append(option);
  });

  function applyScenario(id) {
    const scenario = scenarios.find((item) => item.id === id);
    if (!scenario) {
      return;
    }
    config.scenarioId = scenario.id;
    config.risk = scenario.risk;
    config.patient = scenario.patient;
    config.study = scenario.study;
  }

  function syncForm() {
    scenarioSelect.value = config.scenarioId;
    riskInput.value = config.risk;
    riskOutput.textContent = formatRisk(config.risk);
    patientInput.value = config.patient;
    studyInput.value = config.study;
    prototype2Threshold.value = getPrototype2Mode(config);
  }

  function renderPreview() {
    summaryText.textContent = buildSummary(Number(config.risk));
    panels.forEach((panel) => {
      panel.innerHTML = renderPrototype(panel.dataset.prototype, config, { showSelection: true });
      panel.classList.toggle("dimmed", !config.selected.includes(panel.dataset.prototype));
      panel.classList.toggle("selected-card", config.selected.includes(panel.dataset.prototype));
    });
    panels.forEach((panel) => {
      const checkbox = panel.querySelector(".prototype-checkbox");
      if (!checkbox) {
        return;
      }
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          if (!config.selected.includes(checkbox.value)) {
            config.selected = [...config.selected, checkbox.value];
          }
        } else {
          config.selected = config.selected.filter((id) => id !== checkbox.value);
        }
        renderPreview();
      });
    });
    saveConfig(config);
  }

  scenarioSelect.addEventListener("change", (event) => {
    applyScenario(event.target.value);
    syncForm();
    renderPreview();
  });

  riskInput.addEventListener("input", () => {
    config.risk = Number(riskInput.value);
    riskOutput.textContent = formatRisk(config.risk);
    renderPreview();
  });

  patientInput.addEventListener("input", () => {
    config.patient = patientInput.value.trim();
    renderPreview();
  });

  studyInput.addEventListener("input", () => {
    config.study = studyInput.value.trim();
    renderPreview();
  });

  prototype2Threshold.addEventListener("change", () => {
    config.prototype2Threshold = prototype2Threshold.value;
    renderPreview();
  });

  openEvaluation.addEventListener("click", () => {
    saveConfig(config);
    window.open("./evaluation.html", "_blank");
  });

  if (!scenarios.some((item) => item.id === config.scenarioId)) {
    applyScenario(defaultConfig.scenarioId);
  }

  syncForm();
  renderPreview();
}

function initEvaluationPage() {
  const config = loadConfig();
  const summaryText = document.getElementById("summaryText");
  const metaPatient = document.getElementById("metaPatient");
  const metaStudy = document.getElementById("metaStudy");
  const evaluationGrid = document.getElementById("evaluationGrid");
  const prototypeOrder = ["prototype1", "prototype2", "prototype3", "prototype4"];

  summaryText.textContent = buildSummary(Number(config.risk));
  metaPatient.textContent = config.patient;
  metaStudy.textContent = config.study;

  prototypeOrder.filter((prototypeId) => config.selected.includes(prototypeId)).forEach((prototypeId) => {
    const article = document.createElement("article");
    article.className = "prototype-card";
    article.innerHTML = renderPrototype(prototypeId, config, { showEvaluationControls: prototypeId === "prototype2" });
    evaluationGrid.append(article);
  });

  evaluationGrid.querySelectorAll("[data-eval-threshold]").forEach((button) => {
    button.addEventListener("click", () => {
      config.prototype2Threshold = button.dataset.evalThreshold;
      saveConfig(config);
      evaluationGrid.innerHTML = "";
      initEvaluationPage();
    });
  });
}

const page = document.body.dataset.page;
if (page === "setup") {
  initSetupPage();
}
if (page === "evaluation") {
  initEvaluationPage();
}
