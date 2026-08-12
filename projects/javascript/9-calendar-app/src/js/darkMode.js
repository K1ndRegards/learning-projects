import { state } from './state.js';

const UI = {
  toggleBtn: null,
};

function toggleDarkMode() {
  document.documentElement.classList.toggle('dark', state.darkMode);
  UI.toggleBtn.checked = state.darkMode;
}

function saveDarkModeToStorage() {
  localStorage.setItem('darkMode', String(state.darkMode));
}

function loadDarkModeFromStorage() {
  const save = localStorage.getItem('darkMode');

  if (!save) return;

  state.darkMode = JSON.parse(save);
}

function render() {
  toggleDarkMode();
}

function toggleBtnHandler() {
  state.darkMode = UI.toggleBtn.checked;
  saveDarkModeToStorage();
  render();
}

export function initDarkMode() {
  UI.toggleBtn = document.querySelector('#darkModeToggle');

  UI.toggleBtn.addEventListener('change', toggleBtnHandler);

  loadDarkModeFromStorage();
  render();
}
