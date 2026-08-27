const state = {
  userData: {
    gender: null,
    name: null,
    email: null,
    username: null,
    age: null,
    location: null,
    phone: null,
  },
  loading: false,
  error: false,
};

const UI = {
  globalContainer: null,
  statusMessage: null,
  userImage: null,
  userInformation: null,
  generateUserBtn: null,
};

const KEYS = ['name', 'email', 'username', 'age', 'location', 'phone'];

function createInfoItem(label, info) {
  const li = document.createElement('li');
  li.classList.add('flex', 'flex-col', 'items-center');

  const itemLabel = document.createElement('span');
  itemLabel.classList.add('font-bold', 'text-lg');
  itemLabel.textContent = label;

  const itemInfo = document.createElement('span');
  itemInfo.classList.add('text-xl');
  itemInfo.textContent = info;

  li.appendChild(itemLabel);
  li.appendChild(itemInfo);

  return li;
}

function processData(data) {
  state.userData.gender = data.gender;
  state.userData.name = `${data.name.first} ${data.name.last}`;
  state.userData.email = data.email;
  state.userData.username = data.login.username;
  state.userData.age = data.dob.age;
  state.userData.location = `${data.location.country}, ${data.location.city}`;
  state.userData.phone = data.cell;
  state.userData.picture = data.picture.large;
}

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

function addDataToDOM() {
  UI.globalContainer.classList.remove('bg-female', 'bg-male');

  UI.globalContainer.classList.add(
    state.userData.gender === 'female' ? 'bg-female' : 'bg-male',
  );

  UI.userInformation.replaceChildren();

  KEYS.forEach((key) => {
    UI.userInformation.appendChild(
      createInfoItem(capitalize(key), state.userData[key]),
    );
  });

  UI.userImage.src = state.userData.picture;
}

function updateStatus(message) {
  UI.statusMessage.classList.remove('hidden');
  UI.statusMessage.textContent = message;
  UI.userImage.classList.add('hidden');
}

function render() {
  if (state.loading) {
    updateStatus('Loading...');
    return;
  } else if (state.error) {
    updateStatus('Something went wrong.');
    return;
  }

  UI.statusMessage.classList.add('hidden');
  UI.userImage.classList.remove('hidden');
  addDataToDOM();
}

function fetchUser() {
  state.loading = true;
  render();

  fetch('https://randomuser.me/api/')
    .then((responseObj) => {
      return responseObj.json();
    })
    .then((data) => {
      processData(data.results[0]);
      state.loading = false;
      state.error = false;
      render();
    })
    .catch(() => {
      state.loading = false;
      state.error = true;
      render();
    });
}

function init() {
  UI.globalContainer = document.querySelector('#global-container');
  UI.statusMessage = document.querySelector('#status-message');
  UI.userImage = document.querySelector('#user-image');
  UI.userInformation = document.querySelector('#user-information');
  UI.generateUserBtn = document.querySelector('#generate-button');

  UI.generateUserBtn.addEventListener('click', fetchUser);
  fetchUser();
}

window.addEventListener('DOMContentLoaded', init);
