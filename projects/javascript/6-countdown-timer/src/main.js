// App state
const state = {
  targetTime: null,
};

// Interface elements
const UI = {
  daysField: null,
  hoursField: null,
  minutesField: null,
  secondsField: null,
};

let intervalId = null;

// Function to set countdown start time
function setCountdown(d, h, m, s) {
  let totalMs = 0;
  // Plus days
  totalMs += d * 86400000;
  // Plus hours
  totalMs += h * 3600000;
  // Plus minutes
  totalMs += m * 60000;
  // Plus seconds
  totalMs += s * 1000;

  state.targetTime = Date.now() + totalMs;
}

// Time render function
function renderTime() {
  const ms = state.targetTime - Date.now();

  let days, hours, minutes, seconds;

  if (ms <= 0) {
    days = hours = minutes = seconds = 0;
  } else {
    days = Math.floor(ms / 86400000); // 24 * 60 * 60 * 1000
    hours = Math.floor((ms % 86400000) / 3600000);
    minutes = Math.floor((ms % 3600000) / 60000);
    seconds = Math.floor((ms % 60000) / 1000);
  }

  UI.daysField.textContent = days.toString().padStart(2, '0');
  UI.hoursField.textContent = hours.toString().padStart(2, '0');
  UI.minutesField.textContent = minutes.toString().padStart(2, '0');
  UI.secondsField.textContent = seconds.toString().padStart(2, '0');
}

function saveTimeToStorage() {
  localStorage.setItem('countdown', JSON.stringify(state.targetTime));
}

function startCountdown() {
  // Trying to load time from localStorage
  let save = localStorage.getItem('countdown');

  // If it doesn't load anything -> first time app running
  // then set countdown and save it
  if (!save) {
    setCountdown(3, 16, 24, 30);
    saveTimeToStorage();
    // Else continue countdown
  } else {
    state.targetTime = Number(JSON.parse(save));
  }

  if (state.targetTime <= Date.now()) {
    renderTime();
    return;
  }

  intervalId = setInterval(() => {
    renderTime();

    // Clear interval when countdown ends
    if (state.targetTime <= Date.now()) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }, 1000);
}

// Main initializer function
function init() {
  UI.daysField = document.querySelector('#days');
  UI.hoursField = document.querySelector('#hours');
  UI.minutesField = document.querySelector('#minutes');
  UI.secondsField = document.querySelector('#seconds');

  startCountdown();
  renderTime();
}

init();
