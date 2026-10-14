/**
 * AquaWatch — Civic Water Quality Monitoring & Telemetry Portal
 * Core Application Logic, Live Simulation, Map Interactivity & Civic Tools
 */

// 1. Telemetry Stations Dataset (8 Municipal Basin Nodes)
const STATIONS = {
  'node-01': {
    id: 'node-01',
    name: 'Station #01 — Central Confluence',
    basin: 'Central Reservoir & Main Arteries',
    coords: 'Lat 45.521 • Long -122.676 • Elev 42m',
    status: 'Safe',
    statusClass: 'bg-[#22c55e]/15 text-[#4ade80] border-[#22c55e]/30',
    dotClass: 'bg-[#22c55e]',
    ph: 7.32,
    turbidity: 1.6,
    do: 8.4,
    lead: '< 0.002',
    temp: 16.4,
    flow: 42.8,
    battery: 98,
    wqi: 88,
    trend: 'Stable (8.4 mg/L)',
    sparkline: 'M0,20 Q25,12 50,18 T100,10 T150,14 T200,8',
    description: 'Primary confluence hub monitoring treated output from Central Water Works.'
  },
  'node-02': {
    id: 'node-02',
    name: 'Station #02 — West Canal District',
    basin: 'West Industrial Canal Arteries',
    coords: 'Lat 45.508 • Long -122.712 • Elev 36m',
    status: 'Advisory',
    statusClass: 'bg-[#f59e0b]/15 text-[#fcd34d] border-[#f59e0b]/30',
    dotClass: 'bg-[#f59e0b]',
    ph: 6.85,
    turbidity: 4.8,
    do: 6.2,
    lead: '0.004',
    temp: 18.1,
    flow: 19.4,
    battery: 94,
    wqi: 73,
    trend: 'Elevated Turbidity (4.8 NTU)',
    sparkline: 'M0,24 Q25,20 50,22 T100,26 T150,18 T200,24',
    description: 'Temporary sediment churn detected after culvert maintenance. Field unit en route.'
  },
  'node-03': {
    id: 'node-03',
    name: 'Station #03 — South Residential Main',
    basin: 'South Oak Trunk Distribution',
    coords: 'Lat 45.495 • Long -122.658 • Elev 48m',
    status: 'Safe',
    statusClass: 'bg-[#22c55e]/15 text-[#4ade80] border-[#22c55e]/30',
    dotClass: 'bg-[#22c55e]',
    ph: 7.41,
    turbidity: 1.1,
    do: 8.1,
    lead: '< 0.002',
    temp: 17.0,
    flow: 31.2,
    battery: 99,
    wqi: 91,
    trend: 'Optimal Aeration (8.1 mg/L)',
    sparkline: 'M0,18 Q25,16 50,15 T100,12 T150,16 T200,14',
    description: 'High-volume residential delivery grid with continuous secondary chlorination sweep.'
  },
  'node-04': {
    id: 'node-04',
    name: 'Station #04 — Pine Dam Reservoir',
    basin: 'Highland Conservation Basin',
    coords: 'Lat 45.539 • Long -122.610 • Elev 95m',
    status: 'Safe',
    statusClass: 'bg-[#22c55e]/15 text-[#4ade80] border-[#22c55e]/30',
    dotClass: 'bg-[#22c55e]',
    ph: 7.60,
    turbidity: 0.9,
    do: 9.2,
    lead: '< 0.001',
    temp: 14.5,
    flow: 58.0,
    battery: 96,
    wqi: 95,
    trend: 'High Pristine Purity (9.2 mg/L)',
    sparkline: 'M0,14 Q25,10 50,12 T100,8 T150,10 T200,6',
    description: 'Pristine mountain catchment basin with natural basalt gravel filtration layers.'
  },
  'node-05': {
    id: 'node-05',
    name: 'Station #05 — North Alpine Inflow',
    basin: 'North Glacial Inflow Canyon',
    coords: 'Lat 45.560 • Long -122.695 • Elev 110m',
    status: 'Safe',
    statusClass: 'bg-[#22c55e]/15 text-[#4ade80] border-[#22c55e]/30',
    dotClass: 'bg-[#22c55e]',
    ph: 7.25,
    turbidity: 1.4,
    do: 8.9,
    lead: '< 0.001',
    temp: 13.8,
    flow: 36.5,
    battery: 92,
    wqi: 93,
    trend: 'Cold Snowmelt Flow (8.9 mg/L)',
    sparkline: 'M0,16 Q25,14 50,12 T100,15 T150,11 T200,9',
    description: 'Upstream headwaters measuring raw seasonal runoff and natural mineral content.'
  },
  'node-06': {
    id: 'node-06',
    name: 'Station #06 — East Park Spigots',
    basin: 'Eastern Municipal Recreation Zone',
    coords: 'Lat 45.515 • Long -122.630 • Elev 44m',
    status: 'Advisory',
    statusClass: 'bg-[#f59e0b]/15 text-[#fcd34d] border-[#f59e0b]/30',
    dotClass: 'bg-[#f59e0b]',
    ph: 7.08,
    turbidity: 2.2,
    do: 7.5,
    lead: '0.003',
    temp: 16.8,
    flow: 22.0,
    battery: 97,
    wqi: 82,
    trend: 'Sulfur Odor Sweep Active',
    sparkline: 'M0,22 Q25,18 50,20 T100,17 T150,21 T200,19',
    description: 'Civic recreation distribution spigots undergoing mineral wash and sulfur testing.'
  },
  'node-07': {
    id: 'node-07',
    name: 'Station #07 — Highland Trunk Line',
    basin: 'North Ridge Feeder Line',
    coords: 'Lat 45.545 • Long -122.645 • Elev 80m',
    status: 'Safe',
    statusClass: 'bg-[#22c55e]/15 text-[#4ade80] border-[#22c55e]/30',
    dotClass: 'bg-[#22c55e]',
    ph: 7.35,
    turbidity: 1.0,
    do: 8.5,
    lead: '< 0.002',
    temp: 15.6,
    flow: 45.1,
    battery: 95,
    wqi: 90,
    trend: 'Consistent Flow (8.5 mg/L)',
    sparkline: 'M0,15 Q25,13 50,14 T100,11 T150,13 T200,10',
    description: 'Subterranean aqueduct connecting North Basin and East distribution pumping vaults.'
  },
  'node-08': {
    id: 'node-08',
    name: 'Station #08 — Estuary Delta Outflow',
    basin: 'Tidal Delta Outfall Confluence',
    coords: 'Lat 45.480 • Long -122.670 • Elev 15m',
    status: 'Safe',
    statusClass: 'bg-[#22c55e]/15 text-[#4ade80] border-[#22c55e]/30',
    dotClass: 'bg-[#22c55e]',
    ph: 7.48,
    turbidity: 2.1,
    do: 7.9,
    lead: '< 0.002',
    temp: 17.5,
    flow: 65.4,
    battery: 91,
    wqi: 87,
    trend: 'Delta Flushing Cycle',
    sparkline: 'M0,21 Q25,19 50,17 T100,19 T150,18 T200,16',
    description: 'Downstream river delta interface with ocean tidal buffers and marine sensor pods.'
  }
};

let currentStationId = 'node-01';
let isLiveSimulationActive = true;
let isMuted = false;
let mapZoomScale = 1;

// 2. Incident Feed Initial Data
const initialIncidents = [
  {
    id: 'INC-2026-091',
    category: 'discoloration',
    categoryLabel: 'Discoloration',
    title: 'Yellowish tap water reported in West Canal residential zone',
    status: 'Under Investigation',
    statusColor: 'bg-[#f59e0b]/20 text-[#fcd34d] border-[#f59e0b]/40',
    borderColor: 'border-l-[#f59e0b]',
    icon: 'opacity',
    iconColor: 'bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/30',
    timeAgo: '18m ago',
    verifiedCount: 6,
    userVerified: false,
    location: 'West Canal District, 400 Blk Willow Way',
    dispatchInfo: 'Field Unit #4 En Route',
    comments: [
      { author: 'Elena Vance (Resident)', text: 'Noticed brownish hue starting around 3:15 PM when filling sink.' },
      { author: 'Utility Field Unit 4', text: 'Hydro-flush truck dispatched to inspect fire hydrants on 4th Ave.' }
    ]
  },
  {
    id: 'INC-2026-088',
    category: 'odor',
    categoryLabel: 'Odor / Smell',
    title: 'Sulfur / Mineral odor from outdoor spigots near East Park',
    status: 'Dispatched Specialist',
    statusColor: 'bg-secondary-container/20 text-secondary border-secondary/30',
    borderColor: 'border-l-secondary',
    icon: 'air',
    iconColor: 'bg-secondary/15 text-secondary border-secondary/30',
    timeAgo: '1h ago',
    verifiedCount: 11,
    userVerified: false,
    location: 'East Park District Main Spigots',
    dispatchInfo: 'Lab Specimen Sampling Initiated',
    comments: [
      { author: 'Marcus Brody', text: 'Detected faint rotten egg smell near the park dog wash station.' },
      { author: 'Chief Chemist Lin', text: 'Natural trace hydrogen sulfide or biofilm buildup in shallow spigot run.' }
    ]
  },
  {
    id: 'INC-2026-079',
    category: 'pressure',
    categoryLabel: 'Low Pressure',
    title: 'Sudden pressure drop at 5th St Municipal Line',
    status: 'Resolved',
    statusColor: 'bg-[#22c55e]/15 text-[#4ade80] border-[#22c55e]/30',
    borderColor: 'border-l-[#22c55e]',
    icon: 'check_circle',
    iconColor: 'bg-[#22c55e]/15 text-[#22c55e] border-[#22c55e]/30',
    timeAgo: '3h ago',
    verifiedCount: 24,
    userVerified: true,
    location: '5th St Trunk Valve Vault #12',
    dispatchInfo: 'Pressure restored to 62 PSI • Valve Recalibrated',
    comments: [
      { author: 'Civic Dispatcher', text: 'Pressure reduction regulator auto-triggered during surge. Recalibrated.' }
    ]
  },
  {
    id: 'INC-2026-074',
    category: 'sheen',
    categoryLabel: 'Chemical Sheen',
    title: 'Iridescent film reported on surface of North Inflow runoff ditch',
    status: 'Field Inspected',
    statusColor: 'bg-[#38bdf8]/20 text-[#38bdf8] border-[#38bdf8]/40',
    borderColor: 'border-l-[#38bdf8]',
    icon: 'water',
    iconColor: 'bg-[#38bdf8]/15 text-[#38bdf8] border-[#38bdf8]/30',
    timeAgo: '5h ago',
    verifiedCount: 8,
    userVerified: false,
    location: 'Alpine Road Culvert #3',
    dispatchInfo: 'Booms deployed. Traced to benign organic pollen degradation.',
    comments: [
      { author: 'Park Ranger Dave', text: 'Tested with surface skimmer. Biogenic iron bacteria sheen, non-petroleum.' }
    ]
  }
];

let incidentsList = [...initialIncidents];
let currentFilter = 'all';

// 3. Audio Feedback Synthesizer (Web Audio API)
const AudioFX = {
  ctx: null,
  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  },
  playTone(freq = 440, type = 'sine', duration = 0.15, gainVal = 0.05) {
    if (isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio feedback silenced', e);
    }
  },
  click() {
    this.playTone(587.33, 'sine', 0.08, 0.04); // D5
  },
  success() {
    this.playTone(523.25, 'triangle', 0.1, 0.06); // C5
    setTimeout(() => this.playTone(659.25, 'triangle', 0.12, 0.06), 90); // E5
    setTimeout(() => this.playTone(783.99, 'triangle', 0.25, 0.06), 180); // G5
  },
  alert() {
    this.playTone(440, 'sawtooth', 0.12, 0.05);
    setTimeout(() => this.playTone(392, 'sawtooth', 0.15, 0.05), 100);
  },
  chime() {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, idx) => {
      setTimeout(() => this.playTone(f, 'sine', 0.35, 0.07), idx * 120);
    });
  }
};

// 4. DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
  setupTheme();
  setupStationInteractions();
  setupLayerToggles();
  setupMapZoom();
  setupIncidentFeed();
  setupModals();
  setupBoilTimer();
  setupSafetyQuiz();
  setupNotificationsCenter();
  setupLiveSimulation();
  setupTooltips();
  setupCSVExport();
});

// 5. Theme Toggle Logic
function setupTheme() {
  const themeToggle = document.getElementById('theme-toggle-btn');
  const html = document.documentElement;

  // Restore saved theme
  const savedTheme = localStorage.getItem('aquawatch_theme');
  if (savedTheme === 'light') {
    html.classList.remove('dark');
  } else {
    html.classList.add('dark');
  }
  updateThemeIcons();

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      AudioFX.click();
      if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('aquawatch_theme', 'light');
        showToast('Switched to Civic Daylight Mode');
      } else {
        html.classList.add('dark');
        localStorage.setItem('aquawatch_theme', 'dark');
        showToast('Switched to Dark Telemetry Mode');
      }
      updateThemeIcons();
    });
  }
}

function updateThemeIcons() {
  const isDark = document.documentElement.classList.contains('dark');
  const darkIcon = document.getElementById('icon-dark-mode');
  const lightIcon = document.getElementById('icon-light-mode');
  if (darkIcon && lightIcon) {
    if (isDark) {
      darkIcon.className = "material-symbols-outlined text-[16px] px-1.5 py-0.5 rounded-full bg-surface-container text-primary";
      lightIcon.className = "material-symbols-outlined text-[16px] px-1.5 py-0.5 text-outline hover:text-on-surface";
    } else {
      darkIcon.className = "material-symbols-outlined text-[16px] px-1.5 py-0.5 text-outline hover:text-on-surface";
      lightIcon.className = "material-symbols-outlined text-[16px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold";
    }
  }
}

// 6. Station Selection & Map Interaction
function setupStationInteractions() {
  const stationPins = document.querySelectorAll('.station-pin');
  stationPins.forEach(pin => {
    pin.addEventListener('click', (e) => {
      const stationId = pin.getAttribute('data-station');
      if (stationId && STATIONS[stationId]) {
        selectStation(stationId);
        AudioFX.click();
      }
    });
  });
}

function selectStation(stationId) {
  const station = STATIONS[stationId];
  if (!station) return;
  currentStationId = stationId;

  // Highlight active pin
  document.querySelectorAll('.station-pin').forEach(pin => {
    if (pin.getAttribute('data-station') === stationId) {
      pin.classList.add('active-station');
    } else {
      pin.classList.remove('active-station');
    }
  });

  // Update Floating Telemetry Card on Map
  const overlayTitle = document.getElementById('overlay-station-title');
  const overlayCoords = document.getElementById('overlay-station-coords');
  const overlayStatus = document.getElementById('overlay-station-status');
  const overlayTemp = document.getElementById('overlay-station-temp');
  const overlayFlow = document.getElementById('overlay-station-flow');
  const overlayBattery = document.getElementById('overlay-station-battery');
  const overlaySparkline = document.getElementById('overlay-sparkline-path');
  const overlaySparklineArea = document.getElementById('overlay-sparkline-area');
  const overlayTrend = document.getElementById('overlay-trend-text');

  if (overlayTitle) overlayTitle.innerHTML = `<span class="w-2 h-2 rounded-full ${station.dotClass}"></span> ${station.name}`;
  if (overlayCoords) overlayCoords.textContent = station.coords;
  if (overlayStatus) {
    overlayStatus.textContent = station.status.toUpperCase();
    overlayStatus.className = `font-label-sm text-[10px] px-2 py-0.5 rounded border font-bold ${station.statusClass}`;
  }
  if (overlayTemp) overlayTemp.textContent = `${station.temp.toFixed(1)}°C`;
  if (overlayFlow) overlayFlow.textContent = `${station.flow.toFixed(1)} m³/s`;
  if (overlayBattery) overlayBattery.textContent = `${station.battery}%`;
  if (overlayTrend) overlayTrend.textContent = station.trend;

  if (overlaySparkline) {
    overlaySparkline.setAttribute('d', station.sparkline);
  }
  if (overlaySparklineArea) {
    overlaySparklineArea.setAttribute('d', `${station.sparkline} L200,30 L0,30 Z`);
  }

  // Update Hero Overlaid Badge
  const heroBadgeTitle = document.getElementById('hero-badge-title');
  const heroBadgeStatus = document.getElementById('hero-badge-status');
  const heroBadgePh = document.getElementById('hero-badge-ph');
  const heroBadgeDo = document.getElementById('hero-badge-do');
  const heroBadgeTurb = document.getElementById('hero-badge-turb');

  if (heroBadgeTitle) heroBadgeTitle.textContent = station.name;
  if (heroBadgeStatus) {
    heroBadgeStatus.textContent = station.status;
    heroBadgeStatus.className = `font-label-sm text-label-sm px-2 py-0.5 rounded border font-semibold uppercase ${station.statusClass}`;
  }
  if (heroBadgePh) heroBadgePh.textContent = station.ph.toFixed(2);
  if (heroBadgeDo) heroBadgeDo.textContent = `${station.do.toFixed(1)} mg/L`;
  if (heroBadgeTurb) heroBadgeTurb.textContent = `${station.turbidity.toFixed(1)} NTU`;

  // Update Regional WQI Gauge & Metric Summary
  updateWQIDashboard(station);
}

function updateWQIDashboard(station) {
  const wqiScoreEl = document.getElementById('wqi-gauge-score');
  const wqiCircle = document.getElementById('wqi-gauge-circle');
  const wqiStatusBadge = document.getElementById('wqi-status-badge');
  const metricPh = document.getElementById('metric-ph-val');
  const metricTurb = document.getElementById('metric-turbidity-val');
  const metricDo = document.getElementById('metric-do-val');
  const metricLead = document.getElementById('metric-lead-val');

  if (wqiScoreEl) wqiScoreEl.textContent = Math.round(station.wqi);
  if (metricPh) metricPh.textContent = station.ph.toFixed(2);
  if (metricTurb) metricTurb.textContent = station.turbidity.toFixed(1);
  if (metricDo) metricDo.textContent = station.do.toFixed(1);
  if (metricLead) metricLead.textContent = station.lead;

  // SVG Gauge stroke offset calculation
  // Total circumference = 2 * PI * 50 ≈ 314.159
  if (wqiCircle) {
    const circumference = 314.159;
    const progress = Math.min(100, Math.max(0, station.wqi)) / 100;
    const offset = circumference * (1 - progress);
    wqiCircle.style.strokeDashoffset = offset;
  }

  if (wqiStatusBadge) {
    if (station.wqi >= 85) {
      wqiStatusBadge.className = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22c55e]/15 text-[#4ade80] border border-[#22c55e]/30 font-label-md text-label-md font-bold";
      wqiStatusBadge.innerHTML = `<span class="material-symbols-outlined text-[16px]">check_circle</span> Optimal Watershed Health`;
    } else if (station.wqi >= 70) {
      wqiStatusBadge.className = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f59e0b]/15 text-[#fcd34d] border border-[#f59e0b]/30 font-label-md text-label-md font-bold";
      wqiStatusBadge.innerHTML = `<span class="material-symbols-outlined text-[16px]">warning</span> Moderate Precautionary Level`;
    } else {
      wqiStatusBadge.className = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ef4444]/15 text-[#fca5a5] border border-[#ef4444]/30 font-label-md text-label-md font-bold";
      wqiStatusBadge.innerHTML = `<span class="material-symbols-outlined text-[16px]">error</span> Immediate Filtration Required`;
    }
  }
}

// 7. Layer Toggles (Flow Vectors, Pollution Sensors, Treatment Centers)
function setupLayerToggles() {
  const toggleFlow = document.getElementById('toggle-flow-vectors');
  const togglePollution = document.getElementById('toggle-pollution-layer');
  const togglePlants = document.getElementById('toggle-treatment-centers');

  const layerFlow = document.getElementById('layer-flow-vectors');
  const layerPollution = document.getElementById('layer-pollution-sensors');
  const layerPlants = document.getElementById('layer-treatment-centers');

  if (toggleFlow && layerFlow) {
    toggleFlow.addEventListener('click', () => {
      AudioFX.click();
      const isVisible = layerFlow.style.display !== 'none';
      layerFlow.style.display = isVisible ? 'none' : 'block';
      toggleButtonActive(toggleFlow, !isVisible);
    });
  }

  if (togglePollution && layerPollution) {
    togglePollution.addEventListener('click', () => {
      AudioFX.click();
      const isVisible = layerPollution.style.display !== 'none';
      layerPollution.style.display = isVisible ? 'none' : 'block';
      toggleButtonActive(togglePollution, !isVisible);
    });
  }

  if (togglePlants && layerPlants) {
    togglePlants.addEventListener('click', () => {
      AudioFX.click();
      const isVisible = layerPlants.style.display !== 'none';
      layerPlants.style.display = isVisible ? 'none' : 'block';
      toggleButtonActive(togglePlants, !isVisible);
    });
  }
}

function toggleButtonActive(btn, isActive) {
  if (isActive) {
    btn.classList.add('bg-primary-container/20', 'border-primary', 'text-primary');
    btn.classList.remove('bg-surface-container-high/60', 'border-outline-variant/40', 'text-on-surface-variant');
  } else {
    btn.classList.remove('bg-primary-container/20', 'border-primary', 'text-primary');
    btn.classList.add('bg-surface-container-high/60', 'border-outline-variant/40', 'text-on-surface-variant');
  }
}

// 8. Map Zoom Controls
function setupMapZoom() {
  const zoomInBtn = document.getElementById('map-zoom-in');
  const zoomOutBtn = document.getElementById('map-zoom-out');
  const zoomResetBtn = document.getElementById('map-zoom-reset');
  const mapSvg = document.getElementById('watershed-svg-canvas');

  if (zoomInBtn && mapSvg) {
    zoomInBtn.addEventListener('click', () => {
      AudioFX.click();
      if (mapZoomScale < 1.6) {
        mapZoomScale += 0.15;
        applyMapZoom(mapSvg);
      }
    });
  }

  if (zoomOutBtn && mapSvg) {
    zoomOutBtn.addEventListener('click', () => {
      AudioFX.click();
      if (mapZoomScale > 0.8) {
        mapZoomScale -= 0.15;
        applyMapZoom(mapSvg);
      }
    });
  }

  if (zoomResetBtn && mapSvg) {
    zoomResetBtn.addEventListener('click', () => {
      AudioFX.click();
      mapZoomScale = 1;
      applyMapZoom(mapSvg);
    });
  }
}

function applyMapZoom(mapSvg) {
  mapSvg.style.transformOrigin = 'center center';
  mapSvg.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
  mapSvg.style.transform = `scale(${mapZoomScale})`;
}

// 9. Real-Time Telemetry Live Simulation (Micro-fluctuations)
function setupLiveSimulation() {
  const simToggleBtn = document.getElementById('toggle-simulation-btn');
  const lastUpdatedEl = document.getElementById('telemetry-last-updated');

  let secondsAgo = 0;
  setInterval(() => {
    secondsAgo += 1;
    if (lastUpdatedEl) {
      if (secondsAgo < 60) {
        lastUpdatedEl.textContent = `Updated ${secondsAgo}s ago across 8 sensing nodes`;
      } else {
        lastUpdatedEl.textContent = `Updated ${Math.floor(secondsAgo / 60)}m ago across 8 sensing nodes`;
      }
    }
  }, 1000);

  // Periodic sensor fluctuation
  setInterval(() => {
    if (!isLiveSimulationActive) return;

    // Slightly jitter readings for active station
    const st = STATIONS[currentStationId];
    if (st) {
      const phDelta = (Math.random() - 0.5) * 0.04;
      const doDelta = (Math.random() - 0.5) * 0.06;
      const turbDelta = (Math.random() - 0.5) * 0.08;
      const flowDelta = (Math.random() - 0.5) * 0.4;

      st.ph = Math.max(6.5, Math.min(8.5, st.ph + phDelta));
      st.do = Math.max(5.0, Math.min(11.0, st.do + doDelta));
      st.turbidity = Math.max(0.4, Math.min(8.0, st.turbidity + turbDelta));
      st.flow = Math.max(10.0, Math.min(80.0, st.flow + flowDelta));

      // Calculate simulated WQI
      st.wqi = Math.max(60, Math.min(99, 100 - (st.turbidity * 3) - Math.abs(st.ph - 7.3) * 10));

      selectStation(currentStationId);
      secondsAgo = 0;
    }
  }, 4500);

  if (simToggleBtn) {
    simToggleBtn.addEventListener('click', () => {
      AudioFX.click();
      isLiveSimulationActive = !isLiveSimulationActive;
      if (isLiveSimulationActive) {
        simToggleBtn.innerHTML = `<span class="w-2 h-2 rounded-full bg-[#22c55e] pulse-glow"></span> Live Simulation: Active`;
        simToggleBtn.classList.add('text-[#4ade80]');
        showToast('Live Telemetry Simulation Resumed');
      } else {
        simToggleBtn.innerHTML = `<span class="w-2 h-2 rounded-full bg-outline"></span> Live Simulation: Paused`;
        simToggleBtn.classList.remove('text-[#4ade80]');
        showToast('Telemetry Simulation Paused');
      }
    });
  }
}

// 10. Civic Incident Feed Logic (Filters, Confirmations & Renders)
function setupIncidentFeed() {
  renderIncidents();

  const filterBtns = document.querySelectorAll('.feed-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      AudioFX.click();
      const filter = btn.getAttribute('data-filter') || 'all';
      currentFilter = filter;

      filterBtns.forEach(b => {
        if (b === btn) {
          b.className = "feed-filter-btn px-3 py-1.5 rounded-lg bg-primary/20 border border-primary text-primary font-label-sm text-label-sm font-semibold flex items-center gap-1.5 transition-colors";
        } else {
          b.className = "feed-filter-btn px-3 py-1.5 rounded-lg bg-surface-container-high/50 border border-outline-variant/30 text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-colors";
        }
      });

      renderIncidents();
    });
  });
}

function renderIncidents() {
  const container = document.getElementById('incident-cards-container');
  if (!container) return;

  const filtered = currentFilter === 'all' 
    ? incidentsList 
    : incidentsList.filter(item => item.category === currentFilter);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="glass-panel-l2 rounded-xl p-8 text-center text-on-surface-variant">
        <span class="material-symbols-outlined text-4xl text-outline mb-2">water_drop</span>
        <h4 class="font-headline-sm text-on-surface font-semibold">No incidents found in this category</h4>
        <p class="font-body-sm text-outline mt-1">All civic lines are operating under verified normal parameters.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <div class="glass-panel-l2 rounded-xl p-4 border-l-4 ${item.borderColor} hover:border-r hover:border-r-primary-container transition-all flex flex-col md:flex-row md:items-center justify-between gap-4" id="incident-card-${item.id}">
      <div class="flex items-start gap-3.5">
        <div class="w-10 h-10 rounded-lg ${item.iconColor} flex items-center justify-center shrink-0 border">
          <span class="material-symbols-outlined text-[22px]">${item.icon}</span>
        </div>
        <div>
          <div class="flex items-center gap-2 flex-wrap">
            <span class="font-headline-sm text-headline-sm text-on-surface font-semibold">${escapeHTML(item.title)}</span>
            <span class="font-label-sm text-label-sm px-2 py-0.5 rounded border font-medium ${item.statusColor}">${item.status}</span>
          </div>
          <div class="flex items-center gap-3 font-label-sm text-label-sm text-outline mt-1.5 flex-wrap">
            <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">schedule</span> Reported ${item.timeAgo}</span>
            <span>•</span>
            <span class="flex items-center gap-1 ${item.userVerified ? 'text-[#4ade80] font-bold' : 'text-primary'}">
              <span class="material-symbols-outlined text-[14px]">how_to_reg</span> 
              ${item.userVerified ? `Confirmed by You + ${item.verifiedCount - 1} Neighbors` : `Verified by ${item.verifiedCount} Neighbors`}
            </span>
            <span>•</span>
            <span class="text-on-surface-variant">${escapeHTML(item.dispatchInfo)}</span>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2 self-end md:self-center shrink-0">
        <button class="confirm-btn px-3 py-1.5 rounded-lg border font-label-sm text-label-sm transition-all flex items-center gap-1 ${
          item.userVerified 
            ? 'bg-[#22c55e]/20 border-[#22c55e]/50 text-[#4ade80] font-semibold' 
            : 'bg-surface-container-high/60 border-outline-variant/30 text-primary hover:bg-primary/10'
        }" onclick="toggleConfirmIncident('${item.id}')">
          <span class="material-symbols-outlined text-[14px]">${item.userVerified ? 'check' : 'thumb_up'}</span> 
          <span>${item.userVerified ? 'Confirmed' : 'Confirm Issue'}</span>
        </button>
        <button class="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-high/50 transition-colors" title="View Incident Thread" onclick="openIncidentThread('${item.id}')">
          <span class="material-symbols-outlined text-[18px]">chevron_right</span>
        </button>
      </div>
    </div>
  `).join('');
}

window.toggleConfirmIncident = function(incidentId) {
  const inc = incidentsList.find(i => i.id === incidentId);
  if (!inc) return;

  if (inc.userVerified) {
    inc.userVerified = false;
    inc.verifiedCount = Math.max(0, inc.verifiedCount - 1);
    AudioFX.click();
    showToast('Confirmation withdrawn');
  } else {
    inc.userVerified = true;
    inc.verifiedCount += 1;
    AudioFX.success();
    showToast(`You confirmed incident #${incidentId}. Notification logged.`);
  }
  renderIncidents();
};

window.openIncidentThread = function(incidentId) {
  const inc = incidentsList.find(i => i.id === incidentId);
  if (!inc) return;
  AudioFX.click();

  const modal = document.getElementById('incident-thread-modal');
  const title = document.getElementById('thread-modal-title');
  const badge = document.getElementById('thread-modal-status');
  const details = document.getElementById('thread-modal-details');
  const commentsList = document.getElementById('thread-modal-comments');
  const commentInput = document.getElementById('thread-new-comment-input');
  const submitCommentBtn = document.getElementById('thread-submit-comment-btn');

  if (title) title.textContent = inc.title;
  if (badge) {
    badge.textContent = inc.status;
    badge.className = `font-label-sm text-label-sm px-2.5 py-0.5 rounded border font-medium ${inc.statusColor}`;
  }
  if (details) {
    details.innerHTML = `
      <div class="grid grid-cols-2 gap-3 text-body-sm font-label-sm bg-surface-container/60 p-3 rounded-lg border border-outline-variant/20">
        <div><span class="text-outline">Location:</span> <strong class="text-on-surface block">${escapeHTML(inc.location)}</strong></div>
        <div><span class="text-outline">Reported:</span> <strong class="text-on-surface block">${inc.timeAgo}</strong></div>
        <div><span class="text-outline">Category:</span> <strong class="text-primary block">${inc.categoryLabel}</strong></div>
        <div><span class="text-outline">Dispatch Status:</span> <strong class="text-[#4ade80] block">${escapeHTML(inc.dispatchInfo)}</strong></div>
      </div>
    `;
  }

  function renderComments() {
    if (!commentsList) return;
    commentsList.innerHTML = inc.comments.map(c => `
      <div class="p-3 rounded-lg bg-surface-container-high/40 border border-outline-variant/20">
        <div class="font-label-sm text-primary font-semibold text-[11px] mb-1">${escapeHTML(c.author)}</div>
        <div class="font-body-sm text-on-surface-variant">${escapeHTML(c.text)}</div>
      </div>
    `).join('');
  }

  renderComments();

  if (submitCommentBtn && commentInput) {
    submitCommentBtn.onclick = () => {
      const val = commentInput.value.trim();
      if (!val) return;
      inc.comments.push({ author: 'You (Citizen Contributor)', text: val });
      commentInput.value = '';
      AudioFX.success();
      renderComments();
      showToast('Comment added to civic incident thread');
    };
  }

  if (modal) modal.classList.remove('hidden');
};

// 11. Modal Setup (Report Form, Boil Water Notice, Testing Kit, Safety Quiz)
function setupModals() {
  // Generic Close buttons
  document.querySelectorAll('.close-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      AudioFX.click();
      const modal = btn.closest('.modal-container');
      if (modal) modal.classList.add('hidden');
    });
  });

  // Report Issue Buttons
  const reportBtns = document.querySelectorAll('.trigger-report-modal');
  const reportModal = document.getElementById('report-issue-modal');
  reportBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      AudioFX.click();
      if (reportModal) reportModal.classList.remove('hidden');
    });
  });

  // Report Form Submission
  const reportForm = document.getElementById('report-contamination-form');
  if (reportForm) {
    reportForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const category = document.getElementById('report-category').value;
      const title = document.getElementById('report-title').value.trim();
      const location = document.getElementById('report-location').value.trim() || 'Basin 08 Municipal Grid';
      const description = document.getElementById('report-desc').value.trim();

      if (!title) {
        showToast('Please enter an issue summary');
        return;
      }

      const categoryLabels = {
        discoloration: 'Discoloration',
        odor: 'Odor / Smell',
        pressure: 'Low Pressure',
        sheen: 'Chemical Sheen'
      };

      const categoryIcons = {
        discoloration: 'opacity',
        odor: 'air',
        pressure: 'speed',
        sheen: 'water'
      };

      const newId = `INC-2026-${Math.floor(100 + Math.random() * 900)}`;
      const newIncident = {
        id: newId,
        category: category,
        categoryLabel: categoryLabels[category] || 'Water Concern',
        title: title,
        status: 'Dispatched Unit',
        statusColor: 'bg-primary/20 text-primary border-primary/30',
        borderColor: 'border-l-primary',
        icon: categoryIcons[category] || 'warning',
        iconColor: 'bg-primary/15 text-primary border-primary/30',
        timeAgo: 'Just now',
        verifiedCount: 1,
        userVerified: true,
        location: location,
        dispatchInfo: 'Automated municipal ticket filed • Field Unit Alerted',
        comments: [
          { author: 'You (Citizen Reporter)', text: description || title }
        ]
      };

      incidentsList.unshift(newIncident);
      renderIncidents();
      AudioFX.success();

      reportForm.reset();
      if (reportModal) reportModal.classList.add('hidden');
      showToast(`Incident #${newId} filed successfully. Thank you for protecting our watershed!`);
    });
  }

  // GPS autofill simulation
  const gpsBtn = document.getElementById('gps-autofill-btn');
  if (gpsBtn) {
    gpsBtn.addEventListener('click', () => {
      AudioFX.click();
      const locInput = document.getElementById('report-location');
      if (locInput) {
        locInput.value = 'Near 42nd Ave & Cascade River Walk (GPS ±4m)';
        showToast('GPS coordinates locked to current watershed zone');
      }
    });
  }

  // Testing Kit Modal Trigger
  const kitTriggers = document.querySelectorAll('.trigger-kit-modal');
  const kitModal = document.getElementById('testing-kit-modal');
  kitTriggers.forEach(b => {
    b.addEventListener('click', (e) => {
      e.preventDefault();
      AudioFX.click();
      if (kitModal) kitModal.classList.remove('hidden');
    });
  });

  const kitForm = document.getElementById('kit-request-form');
  if (kitForm) {
    kitForm.addEventListener('submit', (e) => {
      e.preventDefault();
      AudioFX.success();
      const kitTrackingId = `AQ-KIT-${Math.floor(10000 + Math.random() * 90000)}`;
      kitForm.reset();
      if (kitModal) kitModal.classList.add('hidden');
      showToast(`Test Kit order confirmed! Tracking #${kitTrackingId} dispatched by Civic Mail.`);
    });
  }

  // Boil Notice Modal Trigger
  const boilTriggers = document.querySelectorAll('.trigger-boil-modal');
  const boilModal = document.getElementById('boil-notice-modal');
  boilTriggers.forEach(b => {
    b.addEventListener('click', (e) => {
      e.preventDefault();
      AudioFX.click();
      if (boilModal) boilModal.classList.remove('hidden');
    });
  });

  // Safety Quiz Modal Trigger
  const quizTriggers = document.querySelectorAll('.trigger-quiz-modal');
  const quizModal = document.getElementById('safety-quiz-modal');
  quizTriggers.forEach(b => {
    b.addEventListener('click', (e) => {
      e.preventDefault();
      AudioFX.click();
      if (quizModal) quizModal.classList.remove('hidden');
    });
  });
}

// 12. Interactive 60-Second Boil Water Timer
function setupBoilTimer() {
  let boilTimeLeft = 60;
  let timerInterval = null;
  let isTimerRunning = false;

  const timerText = document.getElementById('boil-timer-text');
  const circleProgress = document.getElementById('boil-circle-progress');
  const startBtn = document.getElementById('boil-timer-start-btn');
  const resetBtn = document.getElementById('boil-timer-reset-btn');

  const totalCircumference = 282.74; // 2 * PI * 45

  function updateTimerDisplay() {
    if (timerText) {
      const mins = Math.floor(boilTimeLeft / 60);
      const secs = boilTimeLeft % 60;
      timerText.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    if (circleProgress) {
      const offset = totalCircumference * (1 - (boilTimeLeft / 60));
      circleProgress.style.strokeDashoffset = offset;
    }
  }

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      AudioFX.click();
      if (isTimerRunning) {
        // Pause
        clearInterval(timerInterval);
        isTimerRunning = false;
        startBtn.innerHTML = `<span class="material-symbols-outlined text-[18px]">play_arrow</span> Resume`;
      } else {
        // Start
        if (boilTimeLeft <= 0) boilTimeLeft = 60;
        isTimerRunning = true;
        startBtn.innerHTML = `<span class="material-symbols-outlined text-[18px]">pause</span> Pause`;
        timerInterval = setInterval(() => {
          if (boilTimeLeft > 0) {
            boilTimeLeft--;
            updateTimerDisplay();
            if (boilTimeLeft === 0) {
              clearInterval(timerInterval);
              isTimerRunning = false;
              startBtn.innerHTML = `<span class="material-symbols-outlined text-[18px]">play_arrow</span> Start 60s Timer`;
              AudioFX.chime();
              showToast('Boil Cycle Complete! Water is biologically safe to cool and store.');
            }
          }
        }, 1000);
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      AudioFX.click();
      clearInterval(timerInterval);
      isTimerRunning = false;
      boilTimeLeft = 60;
      updateTimerDisplay();
      if (startBtn) {
        startBtn.innerHTML = `<span class="material-symbols-outlined text-[18px]">play_arrow</span> Start 60s Timer`;
      }
    });
  }
}

// 13. Tap Safety Diagnostic Quiz Logic
function setupSafetyQuiz() {
  const quizForm = document.getElementById('diagnostic-quiz-form');
  const quizResultBox = document.getElementById('quiz-result-box');
  const quizResultScore = document.getElementById('quiz-risk-score');
  const quizResultSummary = document.getElementById('quiz-risk-summary');
  const quizResultActions = document.getElementById('quiz-risk-actions');

  if (quizForm) {
    quizForm.addEventListener('submit', (e) => {
      e.preventDefault();
      AudioFX.success();

      const year = document.querySelector('input[name="quiz-year"]:checked')?.value || '1990';
      const pipe = document.querySelector('input[name="quiz-pipe"]:checked')?.value || 'copper';
      const issue = document.querySelector('input[name="quiz-issue"]:checked')?.value || 'none';
      const filter = document.querySelector('input[name="quiz-filter"]:checked')?.value || 'no';

      let riskPoints = 0;
      if (year === 'pre1986') riskPoints += 3;
      if (pipe === 'lead') riskPoints += 4;
      if (pipe === 'galvanized') riskPoints += 2;
      if (issue !== 'none') riskPoints += 3;
      if (filter === 'no') riskPoints += 1;

      quizForm.classList.add('hidden');
      quizResultBox.classList.remove('hidden');

      if (riskPoints <= 2) {
        quizResultScore.innerHTML = `<span class="text-[#4ade80] font-bold">LOW RISK (Score: ${riskPoints}/10)</span>`;
        quizResultSummary.textContent = "Your residential plumbing and district baseline indicate high water safety. Standard municipal filtration provides optimal potable tap water.";
        quizResultActions.innerHTML = `
          <li class="flex items-center gap-2"><span class="material-symbols-outlined text-[#4ade80] text-[18px]">check</span> Maintain routine aerator cleaning every 6 months.</li>
          <li class="flex items-center gap-2"><span class="material-symbols-outlined text-[#4ade80] text-[18px]">check</span> Annual DIY colorimetric check is sufficient.</li>
        `;
      } else if (riskPoints <= 6) {
        quizResultScore.innerHTML = `<span class="text-[#fcd34d] font-bold">MODERATE PRECAUTION (Score: ${riskPoints}/10)</span>`;
        quizResultSummary.textContent = "Potential risk factors detected from vintage pipe connections or observed sensory changes. Precautionary flushing recommended.";
        quizResultActions.innerHTML = `
          <li class="flex items-center gap-2"><span class="material-symbols-outlined text-[#fcd34d] text-[18px]">warning</span> Run tap cold for 60 seconds before drinking after overnight stagnation.</li>
          <li class="flex items-center gap-2"><span class="material-symbols-outlined text-[#fcd34d] text-[18px]">science</span> Request a Free Colorimetric Heavy Metal Test Kit.</li>
          <li class="flex items-center gap-2"><span class="material-symbols-outlined text-[#fcd34d] text-[18px]">verified</span> Consider NSF-53 certified lead filtration cartridge.</li>
        `;
      } else {
        quizResultScore.innerHTML = `<span class="text-[#f87171] font-bold">HIGH PRECAUTION RECOMMENDED (Score: ${riskPoints}/10)</span>`;
        quizResultSummary.textContent = "Your home features high-risk variables (older construction, legacy plumbing materials, or active sensory changes). Immediate laboratory testing advised.";
        quizResultActions.innerHTML = `
          <li class="flex items-center gap-2"><span class="material-symbols-outlined text-[#f87171] text-[18px]">priority_high</span> Do NOT drink unboiled or unfiltered water if lead solder is present.</li>
          <li class="flex items-center gap-2"><span class="material-symbols-outlined text-[#f87171] text-[18px]">send</span> Schedule a free municipal certified water technician home sweep.</li>
          <li class="flex items-center gap-2"><span class="material-symbols-outlined text-[#f87171] text-[18px]">water_bottle</span> Use bottled water for infant formula until verified.</li>
        `;
      }
    });
  }

  const retakeBtn = document.getElementById('retake-quiz-btn');
  if (retakeBtn) {
    retakeBtn.addEventListener('click', () => {
      AudioFX.click();
      quizForm.reset();
      quizForm.classList.remove('hidden');
      quizResultBox.classList.add('hidden');
    });
  }
}

// 14. Notifications Center Dropdown
function setupNotificationsCenter() {
  const bellBtn = document.getElementById('notification-bell-btn');
  const dropdown = document.getElementById('notification-dropdown');
  const clearBtn = document.getElementById('clear-notifications-btn');
  const badge = document.getElementById('notification-badge');

  if (bellBtn && dropdown) {
    bellBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      AudioFX.click();
      dropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target) && !bellBtn.contains(e.target)) {
        dropdown.classList.add('hidden');
      }
    });
  }

  if (clearBtn && badge) {
    clearBtn.addEventListener('click', () => {
      AudioFX.click();
      badge.style.display = 'none';
      showToast('All notifications marked as read');
    });
  }
}

// 15. Tooltips
function setupTooltips() {
  // Handled via CSS hover .has-tooltip .tooltip-box
}

// 16. CSV Export of Telemetry Data
function setupCSVExport() {
  const exportBtn = document.getElementById('export-telemetry-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      AudioFX.success();
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "Station ID,Station Name,Basin,Coordinates,Status,WQI,pH,DO (mg/L),Turbidity (NTU),Lead (ppm),Temp (C),Flow (m3/s),Battery (%)\n";

      Object.values(STATIONS).forEach(s => {
        const row = [
          `"${s.id}"`,
          `"${s.name}"`,
          `"${s.basin}"`,
          `"${s.coords}"`,
          `"${s.status}"`,
          s.wqi,
          s.ph.toFixed(2),
          s.do.toFixed(1),
          s.turbidity.toFixed(1),
          `"${s.lead}"`,
          s.temp.toFixed(1),
          s.flow.toFixed(1),
          s.battery
        ];
        csvContent += row.join(",") + "\n";
      });

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `AquaWatch-Basin08-Telemetry-${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Basin telemetry report exported to CSV');
    });
  }
}

// 17. Toast Notification Utility
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-notice glass-panel-l2 px-4 py-2.5 rounded-xl border border-primary/40 text-on-surface shadow-2xl flex items-center gap-2.5 text-body-sm font-label-md';
  toast.innerHTML = `
    <span class="material-symbols-outlined text-primary text-[18px]">info</span>
    <span>${escapeHTML(message)}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = 'all 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
