const state = {
  joke: '',
  loading: false,
  error: null,
};

const UI = {
  statusField: null,
  jokeField: null,
  getJokeBtn: null,
};

function showStatus(message) {
  UI.statusField.textContent = message;
  UI.statusField.classList.remove('hidden');
  UI.jokeField.classList.add('hidden');
}

function render() {
  if (state.loading) {
    showStatus('Joke is on the way, stand by...');
    return;
  }

  if (state.error) {
    showStatus('Something went wrong. Try to reload the page.');
    return;
  }

  UI.statusField.classList.add('hidden');
  UI.jokeField.classList.remove('hidden');
  UI.jokeField.textContent = state.joke;
}

function fetchJoke() {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://api.chucknorris.io/jokes/random');

  xhr.addEventListener('load', function () {
    if (this.status === 200) {
      state.joke = JSON.parse(this.responseText).value;
      state.loading = false;
      render();
    } else {
      state.loading = false;
      state.error = true;
      render();
    }
  });

  xhr.addEventListener('error', function () {
    state.loading = false;
    state.error = true;
    render();
  });

  xhr.send();
}

function getJokeBtnHandler() {
  state.loading = true;
  state.error = null;
  render();
  fetchJoke();
}

function init() {
  UI.statusField = document.querySelector('#status');
  UI.jokeField = document.querySelector('#joke');
  UI.getJokeBtn = document.querySelector('#get-joke-btn');

  UI.getJokeBtn.addEventListener('click', getJokeBtnHandler);
}

init();
