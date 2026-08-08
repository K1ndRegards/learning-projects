import { state } from './state.js';

const UI = {
  time: null,
  startBtn: null,
  pauseBtn: null,
  resetBtn: null,
  display: null,
  section: null,
};

function addPulseEffect() {
  UI.section.classList.add('pulse-effect');
}

function removePulseEffect() {
  UI.section.classList.remove('pulse-effect');
}

function makeTimeLighter() {
  UI.display.classList.add('active');
}

function makeTimeDarker() {
  UI.display.classList.remove('active');
}

function renderInterface() {
  if (state.stopwatch.running) {
    UI.startBtn.classList.add('hidden');
    UI.pauseBtn.classList.remove('hidden');
    addPulseEffect();
    makeTimeLighter();
  } else {
    UI.startBtn.classList.remove('hidden');
    UI.pauseBtn.classList.add('hidden');
    removePulseEffect();
    makeTimeDarker();
  }
}

function renderTime() {
  const ms = state.stopwatch.elapsed;

  // 3600000 ms in 1 hr
  const hours = Math.floor(ms / 3600000);
  // 60000 ms in 1 min
  const minutes = Math.floor((ms % 3600000) / 60000);
  // 1000 ms in 1 sec
  const seconds = Math.floor((ms % 60000) / 1000);

  const milliseconds = Math.floor((ms % 1000) / 10);

  UI.time.hr.textContent = String(hours).padStart(2, '0');
  UI.time.min.textContent = String(minutes).padStart(2, '0');
  UI.time.sec.textContent = String(seconds).padStart(2, '0');
  UI.time.ms.textContent = String(milliseconds).padStart(2, '0');
}

function saveStopwatchToStorage() {
  localStorage.setItem('stopwatch', String(state.stopwatch.elapsed));
}

function loadStopwatchFromStorage() {
  const saved = localStorage.getItem('stopwatch');
  if (!saved) return;

  state.stopwatch.elapsed = Number(saved);
}

function startHandler() {
  if (state.stopwatch.running) return;

  state.stopwatch.running = true;
  saveStopwatchToStorage();

  renderInterface();
  // If we continue after pause - continue
  state.stopwatch.startTime = Date.now() - state.stopwatch.elapsed;

  const intervalId = setInterval(() => {
    const now = Date.now();

    state.stopwatch.elapsed = now - state.stopwatch.startTime;
    renderTime();
  }, 50);

  state.stopwatch.intervalId = intervalId;
}

function pauseHandler() {
  if (!state.stopwatch.running) return;

  state.stopwatch.running = false;
  saveStopwatchToStorage();

  renderInterface();

  clearInterval(state.stopwatch.intervalId);
}

function resetHandler() {
  state.stopwatch.running = false;
  state.stopwatch.startTime = 0;
  state.stopwatch.elapsed = 0;

  clearInterval(state.stopwatch.intervalId);
  state.stopwatch.intervalId = null;

  saveStopwatchToStorage();

  renderInterface();
  renderTime();
}

export function initStopwatch() {
  UI.time = {
    hr: document.querySelector('#stopwatch-hours'),
    min: document.querySelector('#stopwatch-minutes'),
    sec: document.querySelector('#stopwatch-seconds'),
    ms: document.querySelector('#stopwatch-milliseconds'),
  };
  UI.startBtn = document.querySelector('#stopwatch-start');
  UI.pauseBtn = document.querySelector('#stopwatch-pause');
  UI.resetBtn = document.querySelector('#stopwatch-reset');
  UI.display = document.querySelector('.stopwatch__time-display');
  UI.section = document.querySelector('#stopwatch');

  UI.startBtn.addEventListener('click', startHandler);
  UI.pauseBtn.addEventListener('click', pauseHandler);
  UI.resetBtn.addEventListener('click', resetHandler);

  loadStopwatchFromStorage();
  renderInterface();
  renderTime();

  // If window was closed -> save current stopwatch time
  window.addEventListener('beforeunload', () => {
    if (state.stopwatch.running) {
      state.stopwatch.elapsed = Date.now() - state.stopwatch.startTime;
      state.stopwatch.running = false;
      saveStopwatchToStorage();
    }
  });
}
