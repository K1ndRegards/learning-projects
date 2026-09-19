import { initStopwatch } from './stopwatch.js';
import { initTabs } from './tabs.js';
import { initClock } from './clock.js';

function init() {
  initTabs();
  initStopwatch();
  initClock();
}

window.addEventListener('DOMContentLoaded', init);
