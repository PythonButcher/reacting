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
  { value: "all", label: "ALL" },
  { value: "react", label: "REACT" },
  { value: "python", label: "PYTHON" },
  { value: "docs", label: "DOCS" },
  { value: "config", label: "CONFIG" },
];

const REFRESH_CADENCE_OPTIONS = [
  { value: "manual", label: "MANUAL" },
  { value: "15s", label: "15 SEC" },
  { value: "60s", label: "60 SEC" },
  { value: "5m", label: "5 MIN" },
];

const LOG_VERBOSITY_OPTIONS = [
  { value: "quiet", label: "QUIET" },
  { value: "info", label: "INFO" },
  { value: "debug", label: "DEBUG" },
  { value: "trace", label: "TRACE" },
];

const DIAGNOSTIC_MODES = [
  { value: "STANDBY", label: "STBY" },
  { value: "FILESYSTEM", label: "FILES" },
  { value: "ANOMALY", label: "ANOM" },
  { value: "FULL_TRACE", label: "TRACE" },
];

const DEFAULT_CONSOLE_STATE = {
  anomalySensitivity: 58,
  diagnosticMode: "FILESYSTEM",
  fileFocus: "all",
  maxDepth: 8,
  minDepth: 1,
  refreshCadence: "manual",
  scanIntensity: 64,
  stabilityTrim: 42,
  telemetryBusOnline: true,
  isolationRelayClosed: false,
  verboseLogging: "info",
};

function createLogEntry(level, message) {
  // Future wiring: keep this shape close to a backend event DTO so an SSE stream can replace local events later.
  return {
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
    level,
    message,
    timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
  };
}

function clampNumber(value, min, max) {
  // DOM range inputs return strings, so every hardware control normalizes values at the boundary.
  return Math.min(max, Math.max(min, Number(value)));
}

function TelemetryCalibrationConsole() {
  const [scanIntensity, setScanIntensity] = useState(DEFAULT_CONSOLE_STATE.scanIntensity);
  const [anomalySensitivity, setAnomalySensitivity] = useState(DEFAULT_CONSOLE_STATE.anomalySensitivity);
  const [stabilityTrim, setStabilityTrim] = useState(DEFAULT_CONSOLE_STATE.stabilityTrim);
  const [minDepth, setMinDepth] = useState(DEFAULT_CONSOLE_STATE.minDepth);
  const [maxDepth, setMaxDepth] = useState(DEFAULT_CONSOLE_STATE.maxDepth);
  const [fileFocus, setFileFocus] = useState(DEFAULT_CONSOLE_STATE.fileFocus);
  const [refreshCadence, setRefreshCadence] = useState(DEFAULT_CONSOLE_STATE.refreshCadence);
  const [diagnosticMode, setDiagnosticMode] = useState(DEFAULT_CONSOLE_STATE.diagnosticMode);
  const [verboseLogging, setVerboseLogging] = useState(DEFAULT_CONSOLE_STATE.verboseLogging);
  const [telemetryBusOnline, setTelemetryBusOnline] = useState(DEFAULT_CONSOLE_STATE.telemetryBusOnline);
  const [isolationRelayClosed, setIsolationRelayClosed] = useState(DEFAULT_CONSOLE_STATE.isolationRelayClosed);
  const [isControlArmed, setIsControlArmed] = useState(false);
  const [calibrationRuns, setCalibrationRuns] = useState(0);
  const [resetCount, setResetCount] = useState(0);
  const [eventLog, setEventLog] = useState(() => [
    createLogEntry("BOOT", "LOCAL_CONSOLE_READY // HARDWARE_PROFILE: RESEARCH_RACK"),
  ]);

  const appendEvent = useCallback((level, message) => {
    setEventLog((currentLog) => [createLogEntry(level, message), ...currentLog].slice(0, 9));
  }, []);

  const telemetryModel = useMemo(() => {
    // Future wiring: these derived values can be replaced by FastAPI telemetry once measured fields exist.
    const depthSpan = maxDepth - minDepth + 1;
    const cadenceLoad = { manual: 4, "15s": 30, "60s": 17, "5m": 9 }[refreshCadence];
    const focusWeight = { all: 16, react: 11, python: 13, docs: 7, config: 9 }[fileFocus];
    const modeWeight = { STANDBY: 3, FILESYSTEM: 18, ANOMALY: 27, FULL_TRACE: 35 }[diagnosticMode];
    const relayBoost = telemetryBusOnline ? 7 : -12;
    const isolationPenalty = isolationRelayClosed ? 9 : 0;

    const scanLoad = clampNumber(Math.round(scanIntensity * 0.48 + depthSpan * 2.7 + focusWeight + relayBoost), 0, 100);
    const tracePressure = clampNumber(
      Math.round(anomalySensitivity * 0.43 + modeWeight + cadenceLoad + calibrationRuns * 2 + isolationPenalty),
      0,
      100,
    );
    const stability = clampNumber(
      Math.round(72 + stabilityTrim * 0.24 - Math.abs(62 - scanIntensity) * 0.34 - depthSpan * 1.2 - isolationPenalty),
      0,
      100,
    );
    const signalConfidence = clampNumber(
      Math.round((stability * 0.5 + anomalySensitivity * 0.28 + (telemetryBusOnline ? 18 : 4) + calibrationRuns * 3) / 1.08),
      0,
      100,
    );

    return { scanLoad, signalConfidence, stability, tracePressure };
  }, [
    anomalySensitivity,
    calibrationRuns,
    diagnosticMode,
    fileFocus,
    isolationRelayClosed,
    maxDepth,
    minDepth,
    refreshCadence,
    scanIntensity,
    stabilityTrim,
    telemetryBusOnline,
  ]);

  const handleDepthChange = (channel, rawValue) => {
    const value = clampNumber(rawValue, 0, 14);

    if (channel === "min") {
      const nextMinDepth = Math.min(value, maxDepth);
      setMinDepth(nextMinDepth);
      appendEvent("DEPTH", `MIN_GATE_INDEXED // LEVEL_${nextMinDepth}`);
      return;
    }

    const nextMaxDepth = Math.max(value, minDepth);
    setMaxDepth(nextMaxDepth);
    appendEvent("DEPTH", `MAX_GATE_INDEXED // LEVEL_${nextMaxDepth}`);
  };

  const handleCalibrationRun = () => {
    const nextRunCount = calibrationRuns + 1;

    setCalibrationRuns(nextRunCount);
    appendEvent("CAL", `CALIBRATION_SEQUENCE_LATCHED // RUN_${String(nextRunCount).padStart(2, "0")}`);
  };

  const handleTelemetryReset = () => {
    setScanIntensity(DEFAULT_CONSOLE_STATE.scanIntensity);
    setAnomalySensitivity(DEFAULT_CONSOLE_STATE.anomalySensitivity);
    setStabilityTrim(DEFAULT_CONSOLE_STATE.stabilityTrim);
    setMinDepth(DEFAULT_CONSOLE_STATE.minDepth);
    setMaxDepth(DEFAULT_CONSOLE_STATE.maxDepth);
    setFileFocus(DEFAULT_CONSOLE_STATE.fileFocus);
    setRefreshCadence(DEFAULT_CONSOLE_STATE.refreshCadence);
    setDiagnosticMode(DEFAULT_CONSOLE_STATE.diagnosticMode);
    setVerboseLogging(DEFAULT_CONSOLE_STATE.verboseLogging);
    setTelemetryBusOnline(DEFAULT_CONSOLE_STATE.telemetryBusOnline);
    setIsolationRelayClosed(DEFAULT_CONSOLE_STATE.isolationRelayClosed);
    setIsControlArmed(false);
    setResetCount((currentCount) => currentCount + 1);
    appendEvent("RESET", "LOCAL_HARDWARE_STATE_REZEROED // API_NOT_CALLED");
  };

  return (
    <section className="telemetry-console" aria-labelledby="telemetry-console-title">
      <header className="telemetry-console__header">
        <div>
          <p className="section-label">Telemetry Calibration Console</p>
          <h1 id="telemetry-console-title">TELEMETRY_CALIBRATION // CONTROL_SURFACE</h1>
        </div>

        {/* Future wiring: connect these lamps to backend readiness, scanner freshness, relay state, and trace load thresholds. */}
        <StatusLightRail
          guardOpen={isControlArmed}
          telemetryBusOnline={telemetryBusOnline}
          tracePressure={telemetryModel.tracePressure}
        />
      </header>

      <div className="telemetry-console__grid">
        <section className="journal-panel telemetry-rack-panel telemetry-rack-panel--scan">
          <PanelHeader label="Primary Calibration Deck" readout={`LOAD_${telemetryModel.scanLoad}%`} />

          {/* Future wiring: send these three dial values as scan intensity, anomaly sensitivity, and stabilization bias. */}
          <div className="telemetry-dial-board">
            <InstrumentDial
              label="SCAN DRIVE"
              max={100}
              min={0}
              onChange={setScanIntensity}
              onCommit={(value) => appendEvent("SCAN", `SCAN_DRIVE_SET // ${value}%`)}
              size="large"
              unit="%"
              value={scanIntensity}
            />
            <InstrumentDial
              label="ANOMALY GAIN"
              max={100}
              min={0}
              onChange={setAnomalySensitivity}
              onCommit={(value) => appendEvent("ANOM", `ANOMALY_GAIN_SET // ${value}%`)}
              unit="%"
              value={anomalySensitivity}
            />
            <InstrumentDial
              label="STABILITY TRIM"
              max={100}
              min={0}
              onChange={setStabilityTrim}
              onCommit={(value) => appendEvent("TRIM", `STABILITY_TRIM_SET // ${value}%`)}
              unit="%"
              value={stabilityTrim}
            />
          </div>

          {/* Future wiring: map the gate rails to backend scanner pruning before project_stats walks directories. */}
          <DepthGateRack
            maxDepth={maxDepth}
            minDepth={minDepth}
            onDepthChange={handleDepthChange}
          />
        </section>

        <section className="journal-panel telemetry-rack-panel telemetry-rack-panel--routing">
          <PanelHeader label="Relay And Routing Bus" readout={diagnosticMode} />

          {/* Future wiring: these levers can become boolean backend flags for bus enablement and isolation mode. */}
          <div className="telemetry-lever-bank">
            <BreakerLever
              isOn={telemetryBusOnline}
              label="TELEMETRY BUS"
              offLabel="COLD"
              onLabel="ONLINE"
              onToggle={() => {
                const nextValue = !telemetryBusOnline;
                setTelemetryBusOnline(nextValue);
                appendEvent("BUS", `TELEMETRY_BUS_${nextValue ? "ONLINE" : "COLD"}`);
              }}
            />
            <BreakerLever
              isOn={isolationRelayClosed}
              label="ISOLATION RELAY"
              offLabel="OPEN"
              onLabel="CLOSED"
              onToggle={() => {
                const nextValue = !isolationRelayClosed;
                setIsolationRelayClosed(nextValue);
                appendEvent("RELAY", `ISOLATION_RELAY_${nextValue ? "CLOSED" : "OPEN"}`);
              }}
              warning
            />
          </div>

          {/* Future wiring: diagnostic mode can map directly to named FastAPI scan profiles or job presets. */}
          <SelectorDrum
            label="DIAGNOSTIC MODE"
            onChange={(mode) => {
              setDiagnosticMode(mode);
              appendEvent("MODE", `DIAGNOSTIC_PROFILE_INDEXED // ${mode}`);
            }}
            options={DIAGNOSTIC_MODES}
            value={diagnosticMode}
          />

          {/* Future wiring: focus and cadence are stable filter/cadence codes for future telemetry requests. */}
          <div className="telemetry-selector-pair">
            <SelectorBank
              label="FILE FOCUS"
              onChange={(value) => {
                setFileFocus(value);
                appendEvent("FOCUS", `FILE_FOCUS_LOCKED // ${value.toUpperCase()}`);
              }}
              options={FILE_FOCUS_OPTIONS}
              value={fileFocus}
            />
            <SelectorBank
              label="REFRESH CADENCE"
              onChange={(value) => {
                setRefreshCadence(value);
                appendEvent("CLOCK", `REFRESH_CADENCE_LOCKED // ${value.toUpperCase()}`);
              }}
              options={REFRESH_CADENCE_OPTIONS}
              value={refreshCadence}
            />
          </div>
        </section>

        <section className="journal-panel telemetry-rack-panel telemetry-rack-panel--monitor">
          <PanelHeader label="Diagnostic Scope" readout="SIGNAL_VIEW" />

          {/* Future wiring: feed this scope with measured scan/load/confidence signals instead of local derived values. */}
          <DiagnosticScope telemetryModel={telemetryModel} />

          {/* Future wiring: log verbosity should control both client event detail and backend trace detail. */}
          <SelectorBank
            compact
            label="LOG VERBOSITY"
            onChange={(value) => {
              setVerboseLogging(value);
              appendEvent("LOG", `LOG_VERBOSITY_LOCKED // ${value.toUpperCase()}`);
            }}
            options={LOG_VERBOSITY_OPTIONS}
            value={verboseLogging}
          />
        </section>

        <section className="journal-panel telemetry-rack-panel telemetry-rack-panel--actions">
          <PanelHeader label="Actuation Bay" readout={isControlArmed ? "GUARD_OPEN" : "GUARD_CLOSED"} />

          {/* Future wiring: keep this as the required safety interlock before reset, purge, or destructive mutations. */}
          <GuardSwitch
            isArmed={isControlArmed}
            onToggle={() => {
              const nextValue = !isControlArmed;
              setIsControlArmed(nextValue);
              appendEvent("GUARD", `RESET_GUARD_${nextValue ? "OPENED" : "CLOSED"}`);
            }}
          />

          {/* Future wiring: calibration can become POST /api/telemetry/calibration and reset can become a guarded mutation. */}
          <div className="telemetry-action-row">
            <ActuatorButton
              icon={<FaPlay aria-hidden="true" />}
              label="RUN_CALIBRATION"
              onClick={handleCalibrationRun}
              tone="green"
            />

            <ActuatorButton
              disabled={!isControlArmed}
              icon={<FaPowerOff aria-hidden="true" />}
              label="RESET_TELEMETRY"
              onClick={handleTelemetryReset}
              tone="orange"
            />
          </div>

          {/* Future wiring: counters can bind to persisted calibration metadata and active scan bounds. */}
          <div className="telemetry-counter-bank" aria-label="Local operation counters">
            <CounterReadout label="CAL_RUNS" value={String(calibrationRuns).padStart(2, "0")} />
            <CounterReadout label="RESETS" value={String(resetCount).padStart(2, "0")} />
            <CounterReadout label="DEPTH" value={`${minDepth}-${maxDepth}`} />
          </div>
        </section>

        <section className="journal-panel telemetry-rack-panel telemetry-rack-panel--terminal">
          <PanelHeader label="Operational Output" readout="LOCAL_BUFFER" />
          {/* Future wiring: this compact screen can merge local actions with backend telemetry events or SSE updates. */}
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

function StatusLightRail({ guardOpen, telemetryBusOnline, tracePressure }) {
  // Future wiring: this rail can render backend health enums without changing the lamp layout.
  return (
    <div className="telemetry-status-rail" aria-label="Console status lamps">
      <IndicatorLamp label="LOCAL" status="active" />
      <IndicatorLamp label="BUS" status={telemetryBusOnline ? "active" : "standby"} />
      <IndicatorLamp label="GUARD" status={guardOpen ? "warning" : "standby"} />
      <IndicatorLamp label="TRACE" status={tracePressure > 78 ? "warning" : "active"} />
    </div>
  );
}

function IndicatorLamp({ label, status }) {
  // Future wiring: status can become active, standby, warning, or fault from backend telemetry health.
  return (
    <div className="telemetry-lamp" data-status={status}>
      <span className="telemetry-lamp__bulb" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

function InstrumentDial({ label, max, min, onChange, onCommit, size = "standard", unit, value }) {
  // Future wiring: this separates live movement from committed values so API updates can happen on release.
  const rotation = useMemo(() => {
    const percentage = (value - min) / (max - min);
    return -138 + percentage * 276;
  }, [max, min, value]);

  const handleChange = (event) => {
    onChange(clampNumber(event.target.value, min, max));
  };

  return (
    <div className={`telemetry-dial telemetry-dial--${size}`}>
      <div className="telemetry-dial__bezel" style={{ "--dial-rotation": `${rotation}deg` }}>
        <span className="telemetry-dial__needle" aria-hidden="true" />
        <span className="telemetry-dial__cap" aria-hidden="true" />
      </div>

      <div className="telemetry-dial__readout">
        <span className="section-label">{label}</span>
        <output>{value}{unit}</output>
      </div>

      <input
        aria-label={label}
        className="telemetry-hidden-range"
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

function DepthGateRack({ maxDepth, minDepth, onDepthChange }) {
  // Future wiring: these gate columns can become min_depth and max_depth parameters for filesystem scanning.
  return (
    <div className="telemetry-depth-rack">
      <div className="telemetry-depth-rack__header">
        <span className="section-label">DEPTH GATE COLUMNS</span>
        <strong>{minDepth} :: {maxDepth}</strong>
      </div>

      <div className="telemetry-depth-columns">
        <GateColumn
          label="MIN GATE"
          max={14}
          min={0}
          onChange={(value) => onDepthChange("min", value)}
          value={minDepth}
        />
        <GateColumn
          label="MAX GATE"
          max={14}
          min={0}
          onChange={(value) => onDepthChange("max", value)}
          value={maxDepth}
        />
      </div>
    </div>
  );
}

function GateColumn({ label, max, min, onChange, value }) {
  // Future wiring: the vertical gate position can be sent as a filesystem scanner depth boundary.
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <label className="telemetry-gate-column" style={{ "--gate-position": `${percentage}%` }}>
      <span className="section-label">{label}</span>
      <strong>{value}</strong>
      <span className="telemetry-gate-column__well" aria-hidden="true">
        <span className="telemetry-gate-column__rack" />
      </span>
      <input
        max={max}
        min={min}
        onChange={(event) => onChange(event.target.value)}
        type="range"
        value={value}
      />
    </label>
  );
}

function BreakerLever({ isOn, label, offLabel, onLabel, onToggle, warning = false }) {
  // Future wiring: these knife switches are explicit boolean controls for relay, bus, and safety states.
  return (
    <button
      aria-pressed={isOn}
      className={`telemetry-knife-switch ${warning ? "telemetry-knife-switch--warning" : ""}`}
      onClick={onToggle}
      type="button"
    >
      <span className="telemetry-knife-switch__hardware" aria-hidden="true">
        <span className="telemetry-knife-switch__pivot" />
        <span className="telemetry-knife-switch__blade" />
        <span className="telemetry-knife-switch__contact" />
      </span>
      <span className="telemetry-knife-switch__label">
        <span className="section-label">{label}</span>
        <strong>{isOn ? onLabel : offLabel}</strong>
      </span>
    </button>
  );
}

function SelectorDrum({ label, onChange, options, value }) {
  // Future wiring: these mode codes can map to backend scan profiles without changing button labels.
  return (
    <div className="telemetry-selector-drum">
      <span className="section-label">{label}</span>
      <div className="telemetry-selector-drum__wheel">
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

function SelectorBank({ compact = false, label, onChange, options, value }) {
  // Future wiring: selector values are intentionally stable machine codes for filters and logging options.
  return (
    <div className={`telemetry-selector-bank ${compact ? "telemetry-selector-bank--compact" : ""}`}>
      <span className="section-label">{label}</span>
      <div className="telemetry-selector-bank__buttons">
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

function DiagnosticScope({ telemetryModel }) {
  // Future wiring: this scope can render sampled backend telemetry arrays instead of CSS-generated traces.
  return (
    <div className="telemetry-scope">
      <div className="telemetry-scope__screen" aria-label="Diagnostic signal scope">
        <ScopeTrace label="SCAN" tone="orange" value={telemetryModel.scanLoad} />
        <ScopeTrace label="TRACE" tone="green" value={telemetryModel.tracePressure} />
        <ScopeTrace label="STAB" tone="orange" value={telemetryModel.stability} />
      </div>
      <div className="telemetry-scope__readouts">
        <ScopeReadout label="LOAD" value={telemetryModel.scanLoad} />
        <ScopeReadout label="PRESS" value={telemetryModel.tracePressure} />
        <ScopeReadout label="CONF" value={telemetryModel.signalConfidence} />
        <ScopeReadout label="STAB" value={telemetryModel.stability} />
      </div>
    </div>
  );
}

function ScopeTrace({ label, tone, value }) {
  // Future wiring: each trace can represent a single telemetry channel from streamed backend samples.
  return (
    <div className="telemetry-scope-trace" data-tone={tone} style={{ "--trace-level": `${value}%` }}>
      <span>{label}</span>
      <i aria-hidden="true" />
    </div>
  );
}

function ScopeReadout({ label, value }) {
  // Future wiring: these numeric readouts can bind directly to normalized backend metric percentages.
  return (
    <div className="telemetry-scope-readout">
      <span>{label}</span>
      <strong>{value}%</strong>
    </div>
  );
}

function ActuatorButton({ disabled = false, icon, label, onClick, tone }) {
  // Future wiring: use this for async commands with pending, success, and fault states when API mutations exist.
  return (
    <button
      className="telemetry-actuator"
      data-tone={tone}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <span className="telemetry-actuator__cap">{icon}</span>
      <span className="telemetry-actuator__label">{label}</span>
    </button>
  );
}

function GuardSwitch({ isArmed, onToggle }) {
  // Future wiring: this remains the operator safety interlock before reset or purge API calls.
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
        <span className="section-label">RESET GUARD</span>
        <strong>{isArmed ? "COVER OPEN" : "COVER LOCKED"}</strong>
      </span>
      <FaExclamationTriangle aria-hidden="true" />
    </button>
  );
}

function CounterReadout({ label, value }) {
  // Future wiring: counters can display persisted calibration run metadata from FastAPI.
  return (
    <div className="telemetry-counter">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function TerminalEventLog({ entries }) {
  // Future wiring: entries can be replaced or supplemented by backend telemetry events later.
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
        LOCAL_BUFFER_ONLY
      </div>
    </div>
  );
}

export default TelemetryCalibrationConsole;
