import { state } from './state.js';

const UI = {
  sectionsContainer: null,
  tabsContainer: null,
};

function setCurrentTab() {
  // Get all tabs from tabs container
  const tabs = Array.from(UI.tabsContainer.children);

  // Remove class 'current-tab' from all tabs except current active tab
  tabs.forEach((tab) => {
    if (tab.dataset.tab !== state.currentTab) {
      tab.classList.remove('current-tab');
    } else {
      tab.classList.add('current-tab');
    }
  });
}

function setCurrentSection() {
  // Get all sections from its container
  const sections = Array.from(UI.sectionsContainer.children);

  // Hide all sections except current active section
  sections.forEach((section) => {
    const isActive = section.id === state.currentTab;
    section.classList.toggle('hidden', !isActive);

    if (isActive) {
      // fade in animation for section appear
      section.classList.remove('fade-in--section');
      // reset animation
      void section.offsetWidth;
      section.classList.add('fade-in--section');
    }
  });
}

function render() {
  setCurrentTab();
  setCurrentSection();
}

function tabClickHandler(e) {
  const tab = e.target.closest('li.tab');

  // If user clicked on tab element
  // AND it is not current active tab
  // then render tabs
  if (tab && tab.dataset.tab !== state.currentTab) {
    state.currentTab = tab.dataset.tab;
    render();
  }
}

// Init function
export function initTabs() {
  UI.sectionsContainer = document.querySelector('#sections-container');
  UI.tabsContainer = document.querySelector('#tabs-container');

  UI.tabsContainer.addEventListener('click', tabClickHandler);

  render();
}
