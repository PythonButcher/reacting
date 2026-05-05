import { useCallback, useMemo, useState } from "react";
import {
  FaExclamationTriangle,
  FaLock,
  FaPlay,
  FaPowerOff,
  FaRedo,
  FaUnlock,
} from "react-icons/fa";
import "./TelemetryCalibrationConsole.css";

const FILE_FOCUS_OPTIONS = [
  { value: "all", label: "ALL_TYPES" },
  { value: "react", label: "REACT_JSX_TSX" },
  { value: "python", label: "PYTHON_FASTAPI" },
  { value: "docs", label: "PROJECT_MD_DOCS" },
  { value: "config", label: "CONFIG_LOCKFILES" },
];

const REFRESH_CADENCE_OPTIONS = [
  { value: "manual", label: "MANUAL_HOLD" },
  { value: "15s", label: "15_SEC_SAMPLE" },
  { value: "60s", label: "60_SEC_SWEEP" },
  { value: "5m", label: "5_MIN_ARCHIVE" },
];

const LOG_VERBOSITY_OPTIONS = [
  { value: "quiet", label: "QUIET" },
  { value: "info", label: "INFO" },
  { value: "debug", label: "DEBUG" },
  { value: "trace", label: "TRACE" },
];

const DIAGNOSTIC_MODES = ["STANDBY", "FILESYSTEM", "ANOMALY", "FULL_TRACE"];

const DEFAULT_CONSOLE_STATE = {
  anomalySensitivity: 58,
  diagnosticMode: "FILESYSTEM",
  fileFocus: "all",
  maxDepth: 8,
  minDepth: 1,
  refreshCadence: "manual",
  scanIntensity: 64,
  verboseLogging: "info",
};

function createLogEntry(level, message) {
  // Keep event records uniform now so this console can later map cleanly to FastAPI telemetry events.
  return {
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
    level,
    message,
    timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
  };
}

function clampNumber(value, min, max) {
  // Range controls report strings from the DOM; normalize once at the boundary of the component.
  return Math.min(max, Math.max(min, Number(value)));
}

function TelemetryCalibrationConsole() {
  const [scanIntensity, setScanIntensity] = useState(DEFAULT_CONSOLE_STATE.scanIntensity);
  const [minDepth, setMinDepth] = useState(DEFAULT_CONSOLE_STATE.minDepth);
  const [maxDepth, setMaxDepth] = useState(DEFAULT_CONSOLE_STATE.maxDepth);
  const [fileFocus, setFileFocus] = useState(DEFAULT_CONSOLE_STATE.fileFocus);
  const [refreshCadence, setRefreshCadence] = useState(DEFAULT_CONSOLE_STATE.refreshCadence);
  const [diagnosticMode, setDiagnosticMode] = useState(DEFAULT_CONSOLE_STATE.diagnosticMode);
  const [anomalySensitivity, setAnomalySensitivity] = useState(DEFAULT_CONSOLE_STATE.anomalySensitivity);
  const [verboseLogging, setVerboseLogging] = useState(DEFAULT_CONSOLE_STATE.verboseLogging);
  const [isControlArmed, setIsControlArmed] = useState(false);
  const [calibrationRuns, setCalibrationRuns] = useState(0);
  const [resetCount, setResetCount] = useState(0);
  const [eventLog, setEventLog] = useState(() => [
    createLogEntry("BOOT", "LOCAL_CONSOLE_READY // BACKEND_TELEMETRY: NOT_CONNECTED"),
  ]);

  const appendEvent = useCallback((level, message) => {
    setEventLog((currentLog) => [createLogEntry(level, message), ...currentLog].slice(0, 12));
  }, []);

  const telemetryModel = useMemo(() => {
    // Derived values let every visual meter respond to state without inventing network activity.
    const depthSpan = maxDepth - minDepth + 1;
    const cadenceLoad = {
      manual: 4,
      "15s": 28,
      "60s": 16,
      "5m": 8,
    }[refreshCadence];
    const focusWeight = {
      all: 16,
      react: 11,
      python: 13,
      docs: 7,
      config: 9,
    }[fileFocus];
    const modeWeight = {
      STANDBY: 3,
      FILESYSTEM: 18,
      ANOMALY: 26,
      FULL_TRACE: 34,
    }[diagnosticMode];

    const scanLoad = clampNumber(Math.round(scanIntensity * 0.46 + depthSpan * 3.2 + focusWeight), 0, 100);
    const tracePressure = clampNumber(
      Math.round(anomalySensitivity * 0.42 + modeWeight + cadenceLoad + calibrationRuns * 2),
      0,
      100,
    );
    const stability = clampNumber(
      Math.round(100 - Math.abs(62 - scanIntensity) * 0.42 - depthSpan * 1.5 - (diagnosticMode === "FULL_TRACE" ? 11 : 0)),
      0,
      100,
    );
    const signalConfidence = clampNumber(
      Math.round((stability + anomalySensitivity * 0.35 + calibrationRuns * 4) / 1.55),
      0,
      100,
    );

    return {
      scanLoad,
      signalConfidence,
      stability,
      tracePressure,
    };
  }, [anomalySensitivity, calibrationRuns, diagnosticMode, fileFocus, maxDepth, minDepth, refreshCadence, scanIntensity]);

  const handleDepthChange = (channel, rawValue) => {
    const value = clampNumber(rawValue, 0, 14);

    if (channel === "min") {
      const nextMinDepth = Math.min(value, maxDepth);
      setMinDepth(nextMinDepth);
      appendEvent("DEPTH", `MIN_DEPTH_GATE_SET // LEVEL_${nextMinDepth}`);
      return;
    }

    const nextMaxDepth = Math.max(value, minDepth);
    setMaxDepth(nextMaxDepth);
    appendEvent("DEPTH", `MAX_DEPTH_GATE_SET // LEVEL_${nextMaxDepth}`);
  };

  const handleCalibrationRun = () => {
    const nextRunCount = calibrationRuns + 1;

    setCalibrationRuns(nextRunCount);
    appendEvent("CAL", `CALIBRATION_RUN_COMMITTED // LOCAL_RUN_${String(nextRunCount).padStart(2, "0")}`);
  };

  const handleTelemetryReset = () => {
    setScanIntensity(DEFAULT_CONSOLE_STATE.scanIntensity);
    setMinDepth(DEFAULT_CONSOLE_STATE.minDepth);
    setMaxDepth(DEFAULT_CONSOLE_STATE.maxDepth);
    setFileFocus(DEFAULT_CONSOLE_STATE.fileFocus);
    setRefreshCadence(DEFAULT_CONSOLE_STATE.refreshCadence);
    setDiagnosticMode(DEFAULT_CONSOLE_STATE.diagnosticMode);
    setAnomalySensitivity(DEFAULT_CONSOLE_STATE.anomalySensitivity);
    setVerboseLogging(DEFAULT_CONSOLE_STATE.verboseLogging);
    setIsControlArmed(false);
    setResetCount((currentCount) => currentCount + 1);
    appendEvent("RESET", "LOCAL_TELEMETRY_STATE_RESTORED // NO_BACKEND_ENDPOINT_CALLED");
  };

  return (
    <section className="telemetry-console" aria-labelledby="telemetry-console-title">
      <header className="telemetry-console__header">
        <div>
          <p className="section-label">Telemetry Calibration Console</p>
          <h1 id="telemetry-console-title">TELEMETRY_CALIBRATION // CONTROL_SURFACE</h1>
        </div>

        <div className="telemetry-console__status-strip" aria-label="Console status lamps">
          <IndicatorLamp label="LOCAL_STATE" status="active" />
          <IndicatorLamp label="BACKEND_LINK" status="standby" />
          <IndicatorLamp label="GUARD" status={isControlArmed ? "warning" : "standby"} />
          <IndicatorLamp label="TRACE_LOAD" status={telemetryModel.tracePressure > 78 ? "warning" : "active"} />
        </div>
      </header>

      <div className="telemetry-console__grid">
        <section className="journal-panel telemetry-rack-panel telemetry-rack-panel--primary">
          <PanelHeader label="Scan Drive" readout={`LOAD_${telemetryModel.scanLoad}%`} />

          <div className="telemetry-knob-row">
            <RotaryKnob
              label="SCAN_INTENSITY"
              max={100}
              min={0}
              onChange={setScanIntensity}
              onCommit={(value) => appendEvent("SCAN", `SCAN_INTENSITY_SET // ${value}%`)}
              unit="%"
              value={scanIntensity}
            />
            <RotaryKnob
              label="ANOMALY_GAIN"
              max={100}
              min={0}
              onChange={setAnomalySensitivity}
              onCommit={(value) => appendEvent("ANOM", `ANOMALY_SENSITIVITY_SET // ${value}%`)}
              unit="%"
              value={anomalySensitivity}
            />
          </div>

          <DepthRangeControl
            maxDepth={maxDepth}
            minDepth={minDepth}
            onDepthChange={handleDepthChange}
          />

          <div className="telemetry-select-grid">
            <LabeledSelect
              label="FILE_TYPE_FOCUS"
              onChange={(value) => {
                setFileFocus(value);
                appendEvent("FOCUS", `FILE_FOCUS_ROUTED // ${value.toUpperCase()}`);
              }}
              options={FILE_FOCUS_OPTIONS}
              value={fileFocus}
            />
            <LabeledSelect
              label="REFRESH_CADENCE"
              onChange={(value) => {
                setRefreshCadence(value);
                appendEvent("CLOCK", `REFRESH_CADENCE_SET // ${value.toUpperCase()}`);
              }}
              options={REFRESH_CADENCE_OPTIONS}
              value={refreshCadence}
            />
          </div>
        </section>

        <section className="journal-panel telemetry-rack-panel">
          <PanelHeader label="Diagnostic Routing" readout={diagnosticMode} />

          <LeverSwitch
            label="DIAGNOSTIC_MODE"
            modes={DIAGNOSTIC_MODES}
            onChange={(mode) => {
              setDiagnosticMode(mode);
              appendEvent("MODE", `DIAGNOSTIC_MODE_SELECTED // ${mode}`);
            }}
            value={diagnosticMode}
          />

          <SegmentedSelector
            label="LOG_VERBOSITY"
            onChange={(value) => {
              setVerboseLogging(value);
              appendEvent("LOG", `LOG_VERBOSITY_SET // ${value.toUpperCase()}`);
            }}
            options={LOG_VERBOSITY_OPTIONS}
            value={verboseLogging}
          />

          <div className="telemetry-meter-bank">
            <MeterBar label="SCAN_LOAD" tone="orange" value={telemetryModel.scanLoad} />
            <MeterBar label="TRACE_PRESSURE" tone="green" value={telemetryModel.tracePressure} />
            <MeterBar label="SIGNAL_CONFIDENCE" tone="green" value={telemetryModel.signalConfidence} />
            <MeterBar label="STABILITY_MARGIN" tone="orange" value={telemetryModel.stability} />
          </div>
        </section>

        <section className="journal-panel telemetry-rack-panel telemetry-rack-panel--actions">
          <PanelHeader label="Actuation Bay" readout={isControlArmed ? "GUARD_OPEN" : "GUARD_CLOSED"} />

          <GuardSwitch
            isArmed={isControlArmed}
            onToggle={() => {
              const nextValue = !isControlArmed;
              setIsControlArmed(nextValue);
              appendEvent("GUARD", `RESET_GUARD_${nextValue ? "OPENED" : "CLOSED"}`);
            }}
          />

          <div className="telemetry-action-row">
            <button
              className="journal-button telemetry-command-button"
              onClick={handleCalibrationRun}
              type="button"
            >
              <FaPlay aria-hidden="true" />
              RUN_CALIBRATION
            </button>

            <button
              className="journal-button telemetry-command-button telemetry-command-button--danger"
              disabled={!isControlArmed}
              onClick={handleTelemetryReset}
              type="button"
            >
              <FaPowerOff aria-hidden="true" />
              RESET_TELEMETRY
            </button>
          </div>

          <div className="telemetry-counter-bank" aria-label="Local operation counters">
            <CounterReadout label="CAL_RUNS" value={String(calibrationRuns).padStart(2, "0")} />
            <CounterReadout label="RESETS" value={String(resetCount).padStart(2, "0")} />
            <CounterReadout label="DEPTH_SPAN" value={`${minDepth}-${maxDepth}`} />
          </div>
        </section>

        <section className="journal-panel telemetry-rack-panel telemetry-rack-panel--terminal">
          <PanelHeader label="Operational Event Log" readout="LOCAL_BUFFER" />
          <TerminalEventLog entries={eventLog} />
        </section>
      </div>
    </section>
  );
}

function PanelHeader({ label, readout }) {
  return (
    <div className="telemetry-panel-header">
      <span className="section-label">{label}</span>
      <span className="telemetry-panel-header__readout">{readout}</span>
    </div>
  );
}

function IndicatorLamp({ label, status }) {
  return (
    <div className="telemetry-lamp" data-status={status}>
      <span className="telemetry-lamp__bulb" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

function RotaryKnob({ label, max, min, onChange, onCommit, unit, value }) {
  const rotation = useMemo(() => {
    const percentage = (value - min) / (max - min);
    return -135 + percentage * 270;
  }, [max, min, value]);

  const handleChange = (event) => {
    onChange(clampNumber(event.target.value, min, max));
  };

  return (
    <div className="telemetry-knob-control">
      <div className="telemetry-knob-control__face" style={{ "--knob-rotation": `${rotation}deg` }}>
        <div className="telemetry-knob-control__cap">
          <span className="telemetry-knob-control__pointer" />
        </div>
      </div>

      <label className="section-label" htmlFor={`${label}-range`}>
        {label}
      </label>
      <output className="telemetry-knob-control__value">{value}{unit}</output>

      <input
        aria-label={label}
        className="telemetry-range"
        id={`${label}-range`}
        max={max}
        min={min}
        onChange={handleChange}
        onKeyUp={() => onCommit(value)}
        onPointerUp={() => onCommit(value)}
        type="range"
        value={value}
      />
    </div>
  );
}

function DepthRangeControl({ maxDepth, minDepth, onDepthChange }) {
  return (
    <div className="telemetry-depth-panel">
      <div className="telemetry-depth-panel__header">
        <span className="section-label">FILESYSTEM_DEPTH_RANGE</span>
        <span>{minDepth} :: {maxDepth}</span>
      </div>

      <label>
        <span>MIN_GATE</span>
        <input
          className="telemetry-range"
          max="14"
          min="0"
          onChange={(event) => onDepthChange("min", event.target.value)}
          type="range"
          value={minDepth}
        />
      </label>

      <label>
        <span>MAX_GATE</span>
        <input
          className="telemetry-range"
          max="14"
          min="0"
          onChange={(event) => onDepthChange("max", event.target.value)}
          type="range"
          value={maxDepth}
        />
      </label>
    </div>
  );
}

function LabeledSelect({ label, onChange, options, value }) {
  return (
    <label className="telemetry-select-control">
      <span className="section-label">{label}</span>
      <select
        className="journal-select"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function LeverSwitch({ label, modes, onChange, value }) {
  const activeIndex = modes.indexOf(value);
  const thumbPosition = `${activeIndex * (100 / modes.length)}%`;

  return (
    <div className="telemetry-lever-control">
      <div className="telemetry-lever-control__header">
        <span className="section-label">{label}</span>
        <span>{value}</span>
      </div>

      <div className="telemetry-lever-control__track" style={{ "--lever-position": thumbPosition }}>
        <span className="telemetry-lever-control__thumb" />
        {modes.map((mode) => (
          <button
            aria-pressed={mode === value}
            className={mode === value ? "is-active" : ""}
            key={mode}
            onClick={() => onChange(mode)}
            type="button"
          >
            {mode}
          </button>
        ))}
      </div>
    </div>
  );
}

function SegmentedSelector({ label, onChange, options, value }) {
  return (
    <div className="telemetry-segmented-control">
      <span className="section-label">{label}</span>
      <div className="telemetry-segmented-control__buttons">
        {options.map((option) => (
          <button
            aria-pressed={option.value === value}
            className={option.value === value ? "is-active" : ""}
            key={option.value}
            onClick={() => onChange(option.value)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function MeterBar({ label, tone, value }) {
  return (
    <div className="telemetry-meter">
      <div className="telemetry-meter__header">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="telemetry-meter__track">
        <span className="telemetry-meter__fill" data-tone={tone} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function GuardSwitch({ isArmed, onToggle }) {
  return (
    <button
      aria-pressed={isArmed}
      className="telemetry-guard-switch"
      onClick={onToggle}
      type="button"
    >
      <span className="telemetry-guard-switch__icon">
        {isArmed ? <FaUnlock aria-hidden="true" /> : <FaLock aria-hidden="true" />}
      </span>
      <span>
        <span className="section-label">RESET_GUARD</span>
        <strong>{isArmed ? "MECHANICAL_COVER_OPEN" : "MECHANICAL_COVER_LOCKED"}</strong>
      </span>
      <FaExclamationTriangle aria-hidden="true" />
    </button>
  );
}

function CounterReadout({ label, value }) {
  return (
    <div className="telemetry-counter">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function TerminalEventLog({ entries }) {
  return (
    <div className="telemetry-event-log" role="log" aria-live="polite">
      {entries.map((entry) => (
        <div className="telemetry-event-log__line" key={entry.id}>
          <span>{entry.timestamp}</span>
          <strong>{entry.level}</strong>
          <p>{entry.message}</p>
        </div>
      ))}
      <div className="telemetry-event-log__footer">
        <FaRedo aria-hidden="true" />
        EVENT_BUFFER_RETAINS_LOCAL_INTERACTIONS_ONLY
      </div>
    </div>
  );
}

export default TelemetryCalibrationConsole;
