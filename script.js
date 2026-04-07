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
    subtitle: "Risk Score Only",
    badge: "Estimated only"
  },
  prototype2: {
    title: "Prototype 2",
    subtitle: "Risk Score + Fixed Risk Category",
    badge: "Fixed 3.0%"
  },
  prototype3: {
    title: "Prototype 3",
    subtitle: "Risk Score + Configurable Risk Category",
    badge: "Configurable"
  },
  prototype4: {
    title: "Prototype 4",
    subtitle: "Visual Risk Scorecard",
    badge: "Integrated view"
  }
};

const defaultConfig = {
  scenarioId: "between-thresholds",
  risk: 2.4,
  patient: "53F screening mammography",
  study: "Bilateral screening mammogram, no suspicious interval change",
  prototype3Mode: "1.7",
  selected: ["prototype1", "prototype2", "prototype3", "prototype4"]
};

const defaultConfigurationSandbox = {
  cutoffEnabled: true,
  cutoffMode: "1.7",
  risk: 2.4,
  patient: "53F screening mammography",
  study: "Bilateral screening mammogram, no suspicious interval change"
};

const defaultInterviewNotes = {
  modeEnabled: false,
  interviewId: "",
  participantRole: "",
  institutionType: "",
  preferredPrototype: "",
  preferredReason: "",
  leastPreferredPrototype: "",
  leastPreferredReason: "",
  thresholdPreference: "",
  preferredPlatform: "",
  positioningPreference: "",
  keyQuote: "",
  additionalNotes: ""
};

const prototypeDisclosure = "Lunit INSIGHT Risk provides a SEER-calibrated 5-year absolute breast cancer risk as a continuous value. Interpretation of this result and any subsequent clinical decisions should be made by the clinician in accordance with applicable guidelines (e.g., USPSTF, ASCO, NCCN).";

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
  return {
    nccn: `${binaryLabel(risk, thresholds.nccn)} at 1.7% NCCN`,
    uspstf: `${binaryLabel(risk, thresholds.uspstf)} at 3.0% USPSTF/ASCO`
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

function loadConfigurationSandbox() {
  try {
    const raw = localStorage.getItem("insight-risk-configuration-sandbox");
    if (!raw) {
      return { ...defaultConfigurationSandbox };
    }
    return {
      ...defaultConfigurationSandbox,
      ...JSON.parse(raw)
    };
  } catch {
    return { ...defaultConfigurationSandbox };
  }
}

function saveConfigurationSandbox(config) {
  localStorage.setItem("insight-risk-configuration-sandbox", JSON.stringify(config));
}

function loadInterviewNotes() {
  try {
    const raw = localStorage.getItem("insight-risk-interview-notes");
    if (!raw) {
      return { ...defaultInterviewNotes };
    }
    return {
      ...defaultInterviewNotes,
      ...JSON.parse(raw)
    };
  } catch {
    return { ...defaultInterviewNotes };
  }
}

function saveInterviewNotes(notes) {
  localStorage.setItem("insight-risk-interview-notes", JSON.stringify(notes));
}

function buildInterviewId() {
  return `INT-${new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 12)}`;
}

function getPrototype3Mode(config) {
  return String(config.prototype3Mode || "1.7");
}

function getPrototype3Badge(config) {
  const mode = getPrototype3Mode(config);
  return mode === "both" ? "Both active" : `${formatRisk(Number(mode))} active`;
}

function renderCardHeader(meta, selectionControl = "") {
  return `
    <div class="card-header">
      <div>
        <p class="prototype-type">${meta.title}</p>
        <h3>${meta.subtitle}</h3>
      </div>
      <div class="header-actions">
        <span class="badge unified">${meta.badge}</span>
        ${selectionControl}
      </div>
    </div>
  `;
}

function renderDisclosure() {
  return `<p class="disclosure-copy">${prototypeDisclosure}</p>`;
}

function renderPrototypeDescription(prototypeId) {
  if (prototypeId === "prototype1") {
    return `<p class="prototype-description">This format presents the SEER-calibrated 5-year absolute breast cancer risk as a continuous percentage only, without adding a cutoff-based category or interpretation layer.</p>`;
  }

  if (prototypeId === "prototype2") {
    return `<p class="prototype-description">This format presents the continuous risk score together with a binary increased or non-increased category using a fixed 3.0% cutoff, aligned with the increased-risk threshold commonly referenced in ASCO and USPSTF guidance.</p>`;
  }

  if (prototypeId === "prototype3") {
    return `<p class="prototype-description">This format presents the continuous risk score together with a configurable binary category, allowing the user to view interpretation based on 1.7% (NCCN), 3.0% (ASCO/USPSTF), or both thresholds depending on their usual guideline context.</p>`;
  }

  return `<p class="prototype-description">This visual concept presents the image-based risk score on a bar-style scale so users can more intuitively understand where the score sits relative to high-risk cutoff values described in existing guidelines.</p>`;
}

function renderPrototype(prototypeId, config, options = {}) {
  const { showSelection = false } = options;
  const risk = Number(config.risk);
  const riskText = formatRisk(risk);
  const dual = dualStatus(risk);
  const meta = { ...prototypeDefinitions[prototypeId] };
  if (prototypeId === "prototype3") {
    meta.badge = getPrototype3Badge(config);
  }

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
      ${renderCardHeader(meta, selectionControl)}
      ${renderPrototypeDescription(prototypeId)}
      <div class="compact-layout">
        <div class="metric-block">
          <span class="metric-label">Estimated 5-yr risk</span>
          <strong class="metric-value">${riskText}</strong>
        </div>
        <div class="compact-copy">
          <p class="interpretation">Estimated risk only</p>
          <p class="supporting">This format presents only the continuous 5-year absolute risk value.</p>
        </div>
      </div>
      ${renderDisclosure()}
    `;
  }

  if (prototypeId === "prototype2") {
    return `
      ${renderCardHeader(meta, selectionControl)}
      ${renderPrototypeDescription(prototypeId)}
      <div class="compact-layout">
        <div class="metric-block">
          <span class="metric-label">Estimated 5-yr risk</span>
          <strong class="metric-value">${riskText}</strong>
          <div class="metric-status-stack">
            <span class="metric-status">${binaryBoxLabel(risk, thresholds.uspstf)}</span>
          </div>
        </div>
        <div class="compact-copy">
          <p class="interpretation">${binaryDescriptor(risk, thresholds.uspstf, "USPSTF/ASCO")}</p>
          <p class="supporting">Fixed-threshold prototype using a 3.0% reference.</p>
        </div>
      </div>
      ${renderDisclosure()}
    `;
  }

  if (prototypeId === "prototype3") {
    const mode = getPrototype3Mode(config);
    const metricStatus = mode === "both"
        ? `
            <div class="metric-status-stack">
              <span class="metric-status">${binaryBoxLabel(risk, thresholds.nccn)}</span>
              <span class="metric-status">${binaryBoxLabel(risk, thresholds.uspstf)}</span>
            </div>
          `
        : `
            <div class="metric-status-stack">
            <span class="metric-status">${binaryBoxLabel(risk, Number(mode))}</span>
          </div>
        `;
    const interpretation = mode === "both"
        ? `${dual.nccn} / ${dual.uspstf}`
        : binaryDescriptor(risk, Number(mode), mode === "1.7" ? "NCCN" : "USPSTF/ASCO");

    return `
      ${renderCardHeader(meta, selectionControl)}
      ${renderPrototypeDescription(prototypeId)}
      <div class="compact-layout">
        <div class="metric-block">
          <span class="metric-label">Estimated 5-yr risk</span>
          <strong class="metric-value">${riskText}</strong>
          ${metricStatus}
        </div>
        <div class="compact-copy">
          <p class="interpretation">${interpretation}</p>
          <p class="supporting">Configurable cutoff prototype based on configuration page settings.</p>
        </div>
      </div>
      ${renderDisclosure()}
    `;
  }

  return `
    ${renderCardHeader(meta, selectionControl)}
    ${renderPrototypeDescription(prototypeId)}
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
    <p class="supporting">This concept uses a visual scale to show where the score falls relative to reference thresholds.</p>
    ${renderDisclosure()}
  `;
}

function applyScenarioToConfig(config, id) {
  const scenario = scenarios.find((item) => item.id === id);
  if (!scenario) {
    return;
  }
  config.scenarioId = scenario.id;
  config.risk = scenario.risk;
  config.patient = scenario.patient;
  config.study = scenario.study;
}

function initSetupPage() {
  const config = loadConfig();
  const scenarioSelect = document.getElementById("scenarioSelect");
  const riskInput = document.getElementById("riskInput");
  const riskOutput = document.getElementById("riskOutput");
  const patientInput = document.getElementById("patientInput");
  const studyInput = document.getElementById("studyInput");
  const prototype3Mode = document.getElementById("prototype3Mode");
  const summaryText = document.getElementById("summaryText");
  const setupPatient = document.getElementById("setupPatient");
  const setupStudy = document.getElementById("setupStudy");
  const openEvaluation = document.getElementById("openEvaluation");
  const openConfiguration = document.getElementById("openConfiguration");
  const panels = [...document.querySelectorAll(".prototype-panel")];

  scenarios.forEach((scenario) => {
    const option = document.createElement("option");
    option.value = scenario.id;
    option.textContent = scenario.label;
    scenarioSelect.append(option);
  });

  function syncForm() {
    scenarioSelect.value = config.scenarioId;
    riskInput.value = config.risk;
    riskOutput.textContent = formatRisk(config.risk);
    patientInput.value = config.patient;
    studyInput.value = config.study;
    prototype3Mode.value = getPrototype3Mode(config);
  }

  function renderPreview() {
    summaryText.textContent = buildSummary(Number(config.risk));
    setupPatient.textContent = config.patient;
    setupStudy.textContent = config.study;
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
    applyScenarioToConfig(config, event.target.value);
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

  prototype3Mode.addEventListener("change", () => {
    config.prototype3Mode = prototype3Mode.value;
    renderPreview();
  });

  openEvaluation.addEventListener("click", () => {
    saveConfig(config);
    window.open("./evaluation.html", "_blank");
  });

  openConfiguration.addEventListener("click", () => {
    saveConfig(config);
    window.open("./configuration.html", "_blank");
  });

  if (!scenarios.some((item) => item.id === config.scenarioId)) {
    applyScenarioToConfig(config, defaultConfig.scenarioId);
  }

  syncForm();
  renderPreview();
}

function initEvaluationPage() {
  const config = loadConfig();
  const notes = loadInterviewNotes();
  const summaryText = document.getElementById("summaryText");
  const metaPatient = document.getElementById("metaPatient");
  const metaStudy = document.getElementById("metaStudy");
  const evaluationGrid = document.getElementById("evaluationGrid");
  const interviewModeToggle = document.getElementById("interviewModeToggle");
  const interviewPanel = document.getElementById("interviewPanel");
  const interviewLayout = document.getElementById("interviewLayout");
  const exportInterview = document.getElementById("exportInterview");
  const clearInterview = document.getElementById("clearInterview");
  const prototypeOrder = ["prototype1", "prototype2", "prototype3", "prototype4"];
  const noteFields = {
    interviewId: document.getElementById("interviewId"),
    participantRole: document.getElementById("participantRole"),
    institutionType: document.getElementById("institutionType"),
    preferredPrototype: document.getElementById("preferredPrototype"),
    preferredReason: document.getElementById("preferredReason"),
    leastPreferredPrototype: document.getElementById("leastPreferredPrototype"),
    leastPreferredReason: document.getElementById("leastPreferredReason"),
    thresholdPreference: document.getElementById("thresholdPreference"),
    preferredPlatform: document.getElementById("preferredPlatform"),
    positioningPreference: document.getElementById("positioningPreference"),
    keyQuote: document.getElementById("keyQuote"),
    additionalNotes: document.getElementById("additionalNotes")
  };

  summaryText.textContent = buildSummary(Number(config.risk));
  metaPatient.textContent = config.patient;
  metaStudy.textContent = config.study;

  prototypeOrder.filter((prototypeId) => config.selected.includes(prototypeId)).forEach((prototypeId) => {
    const article = document.createElement("article");
    article.className = "prototype-card";
    article.innerHTML = renderPrototype(prototypeId, config);
    evaluationGrid.append(article);
  });

  if (!notes.interviewId) {
    notes.interviewId = buildInterviewId();
  }

  function syncInterviewFields() {
    interviewModeToggle.checked = Boolean(notes.modeEnabled);
    interviewPanel.classList.toggle("hidden", !notes.modeEnabled);
    interviewLayout.classList.toggle("interview-mode-active", !!notes.modeEnabled);

    Object.entries(noteFields).forEach(([key, field]) => {
      field.value = notes[key] || "";
    });
  }

  function persistInterviewFields() {
    Object.entries(noteFields).forEach(([key, field]) => {
      notes[key] = field.value;
    });
    saveInterviewNotes(notes);
  }

  interviewModeToggle.addEventListener("change", () => {
    notes.modeEnabled = interviewModeToggle.checked;
    saveInterviewNotes(notes);
    syncInterviewFields();
  });

  Object.values(noteFields).forEach((field) => {
    field.addEventListener("input", persistInterviewFields);
    field.addEventListener("change", persistInterviewFields);
  });

  exportInterview.addEventListener("click", () => {
    persistInterviewFields();
    const payload = {
      exportedAt: new Date().toISOString(),
      scenario: {
        patient: config.patient,
        study: config.study,
        risk: config.risk,
        prototype3Mode: config.prototype3Mode,
        selectedPrototypes: config.selected
      },
      notes
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${notes.interviewId || "insight-risk-interview"}.json`;
    link.click();
    URL.revokeObjectURL(url);
  });

  clearInterview.addEventListener("click", () => {
    const freshNotes = {
      ...defaultInterviewNotes,
      modeEnabled: notes.modeEnabled,
      interviewId: buildInterviewId()
    };
    Object.keys(notes).forEach((key) => {
      notes[key] = freshNotes[key];
    });
    saveInterviewNotes(notes);
    syncInterviewFields();
  });

  syncInterviewFields();
}

function initConfigurationPage() {
  const config = loadConfigurationSandbox();
  const enableToggle = document.getElementById("cutoffEnabled");
  const modeField = document.getElementById("cutoffModeField");
  const modeSelect = document.getElementById("configurableCutoffMode");
  const previewCard = document.getElementById("configurationPreview");
  const previewSummary = document.getElementById("configurationSummary");

  enableToggle.checked = Boolean(config.cutoffEnabled);
  modeSelect.value = String(config.cutoffMode);

  function renderConfigurationPreview() {
    modeField.classList.toggle("disabled-field", !config.cutoffEnabled);
    modeSelect.disabled = !config.cutoffEnabled;
    previewSummary.textContent = config.cutoffEnabled
      ? `Cutoff setting is enabled. Current mode: ${config.cutoffMode === "both" ? "Both active" : `${formatRisk(Number(config.cutoffMode))} active`}.`
      : "Cutoff setting is disabled. The preview will show estimated risk without cutoff interpretation.";

    const previewMode = config.cutoffEnabled ? config.cutoffMode : "hidden";
    const previewConfig = {
      scenarioId: "configuration-preview",
      risk: config.risk,
      patient: config.patient,
      study: config.study,
      prototype3Mode: previewMode === "hidden" ? "1.7" : previewMode,
      selected: ["prototype3"]
    };

    if (!config.cutoffEnabled) {
      previewCard.innerHTML = `
        ${renderCardHeader({ title: "Configuration Preview", subtitle: "Estimated Risk + Optional Cutoff", badge: "Estimated only" })}
        <div class="compact-layout">
          <div class="metric-block">
            <span class="metric-label">Estimated 5-yr risk</span>
            <strong class="metric-value">${formatRisk(config.risk)}</strong>
          </div>
          <div class="compact-copy">
            <p class="interpretation">Estimated risk shown without cutoff interpretation</p>
            <p class="supporting">This preview shows only the continuous 5-year absolute risk value.</p>
          </div>
        </div>
        ${renderDisclosure()}
      `;
    } else {
      previewCard.innerHTML = renderPrototype("prototype3", previewConfig);
    }

    saveConfigurationSandbox(config);
  }

  enableToggle.addEventListener("change", () => {
    config.cutoffEnabled = enableToggle.checked;
    renderConfigurationPreview();
  });

  modeSelect.addEventListener("change", () => {
    config.cutoffMode = modeSelect.value;
    renderConfigurationPreview();
  });

  renderConfigurationPreview();
}

const page = document.body.dataset.page;
if (page === "setup") {
  initSetupPage();
}
if (page === "evaluation") {
  initEvaluationPage();
}
if (page === "configuration") {
  initConfigurationPage();
}
