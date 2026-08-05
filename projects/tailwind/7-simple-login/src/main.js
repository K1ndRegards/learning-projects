const state = {
  darkMode: false,
};

const darkModeSwitch = document.querySelector('#darkModeSwitch');

function saveToStorage() {
  localStorage.setItem('app', JSON.stringify(state));
}

function loadFromStorage() {
  let data = localStorage.getItem('app');
  if (data) {
    data = JSON.parse(data);
    state.darkMode = data.darkMode;
  }
}

function renderUI() {
  console.log('we are in');
  if (state.darkMode) {
    document.documentElement.classList.add('dark');
    darkModeSwitch.checked = true;
  } else {
    document.documentElement.classList.remove('dark');
  }
}

darkModeSwitch.addEventListener('input', () => {
  state.darkMode = !state.darkMode;
  saveToStorage();
  renderUI();
});

loadFromStorage();
renderUI();
