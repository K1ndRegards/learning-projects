import { createElement } from './utils/dom.js';

// State object to control app
const state = {
  items: [],
  filter: '',
  sort: 'old',
};

// UI elements
const UI = {
  input: document.querySelector('#item-input'),
  addBtn: document.querySelector('.app__add-btn'),
  interface: document.querySelector('.app__interface'),
  sort: document.querySelector('#sort'),
  filter: document.querySelector('#filter'),
  list: document.querySelector('.app__item-list'),
  clearBtn: document.querySelector('.app__clear-btn'),
};

// Element hide function
function hideElement(el) {
  el.classList.add('hidden');
}

// Element show function
function showElement(el) {
  el.classList.remove('hidden');
}

// Filter function
function filterItems(items, filterText) {
  return items.filter((item) => {
    return item.text.toLowerCase().startsWith(filterText.toLowerCase());
  });
}

// Sort function
function sortItems(items, sortType) {
  const sortedItems = [...items];

  if (sortType === 'new') {
    // New first sort
    sortedItems.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortType === 'old') {
    // Old first sort
    sortedItems.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (sortType === 'alphaDesc') {
    // a - z sort
    sortedItems.sort((a, b) => a.text.localeCompare(b.text));
  } else if (sortType === 'alphaAsc') {
    // z - a sort
    sortedItems.sort((a, b) => b.text.localeCompare(a.text));
  }

  return sortedItems;
}

// Enable edit mode function
function enableEditMode(id) {
  const item = state.items.find((item) => item.id === id);

  item.editMode = true;

  renderList();
}

// Save edit mode item function
function saveEditedItem(id, newText) {
  const item = state.items.find((item) => item.id === id);

  item.text = newText;
  item.editMode = false;

  saveToStorage();
  renderList();
}

// Create list item function
function createItemElement(item) {
  const itemElement = createElement('li', {
    classes: ['app__list-item'],
  });

  itemElement.dataset.id = item.id;

  const dateSpan = createElement('span', {
    classes: ['app__list-item-date'],
    text: item.date,
  });

  const textContent = createElement('div', {
    classes: ['app__list-item-content'],
  });

  let itemBtn;

  if (!item.editMode) {
    const textSpan = createElement('span', {
      classes: ['app__list-item-text'],
      text: item.text,
    });

    textContent.appendChild(textSpan);

    itemBtn = createElement('button', {
      classes: ['app__list-item-btn', 'app__list-item-btn--remove'],
      attrs: { 'aria-label': 'Remove item' },
      children: [
        createElement('i', {
          classes: ['fa-solid', 'fa-xmark'],
          attrs: { 'aria-hidden': 'true' },
        }),
      ],
    });
  } else {
    itemElement.classList.add('app__list-item--active');

    const textInput = createElement('input', {
      classes: ['app__list-item-edit-input'],
      attrs: { type: 'text', value: item.text, maxlength: 17 },
    });

    textInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        saveEditedItem(item.id, textInput.value);
      }
    });
    textInput.addEventListener('blur', function (e) {
      if (
        e.relatedTarget !== null &&
        (e.relatedTarget.classList.contains('app__list-item-btn--edit') ||
          e.relatedTarget.classList.contains('fa-check'))
      ) {
        saveEditedItem(item.id, textInput.value);
      } else {
        saveEditedItem(item.id, item.text);
      }
    });

    textContent.appendChild(textInput);

    itemBtn = createElement('button', {
      classes: ['app__list-item-btn', 'app__list-item-btn--edit'],
      attrs: { 'aria-label': 'Edit item' },
      children: [
        createElement('i', {
          classes: ['fa-solid', 'fa-check'],
          attrs: { 'aria-hidden': 'true' },
        }),
      ],
    });
  }

  itemElement.appendChild(dateSpan);
  itemElement.appendChild(textContent);
  itemElement.appendChild(itemBtn);

  return itemElement;
}

// Function to sort and filter list items
function getProcessedItems() {
  let items = [...state.items];

  // Filtering items
  items = filterItems(items, state.filter);

  // Sorting items
  items = sortItems(items, state.sort);

  return items;
}

function hideInterface() {
  hideElement(UI.interface);
}
function showInterface() {
  showElement(UI.interface);
}

// Main render function
function renderList() {
  UI.list.innerHTML = '';

  UI.filter.value = state.filter;
  UI.sort.value = state.sort;

  if (state.items.length === 0) {
    hideInterface();
    return;
  } else {
    showInterface();
  }

  // Get sorted and filtered items
  const items = getProcessedItems();

  if (items.length === 0) {
    // If filtered list is empty, add placeholder
    const emptyList = createElement('li', {
      classes: ['app__list-empty'],
      text: 'No matches...',
    });
    UI.list.appendChild(emptyList);
  } else {
    // Append each list item to the item list
    items.forEach((item, index) => {
      const li = createItemElement(item);
      UI.list.appendChild(li);
    });
  }

  const editInput = document.querySelector('.app__list-item-edit-input');

  if (editInput) {
    editInput.focus();
    const len = editInput.value.length;
    editInput.setSelectionRange(len, len);
  }
}

// Function to get all existing list item ids
function getExistingIds() {
  return new Set(state.items.map((item) => item.id));
}

// Function to get an unoccupied ID
function getNewId() {
  const existingIds = getExistingIds();

  let id = 1;
  while (existingIds.has(id)) {
    id++;
  }

  return id;
}

// Get formatted current date and time
function getCurrentDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Function to add item to the state
function addItem(text) {
  state.items.push({
    id: getNewId(),
    text,
    date: getCurrentDateTime(),
    editMode: false,
  });
  saveToStorage();
  renderList();
}

// Function to remove item from the state
function removeItem(id) {
  state.items = state.items.filter((item) => item.id !== id);

  saveToStorage();
  renderList();
}

function saveToStorage() {
  localStorage.setItem('shoppingList', JSON.stringify(state));
}

function loadFromStorage() {
  let jsonData = localStorage.getItem('shoppingList');

  if (!jsonData) return;

  try {
    const data = JSON.parse(jsonData);
    state.items = data.items;
    state.filter = data.filter;
    state.sort = data.sort;
  } catch (err) {
    console.error('Failed to parse localStorage data:', err);
  }
}

loadFromStorage();
renderList();

// Event Listeners

// Input event listener
UI.input.addEventListener('input', function () {
  // To prevent user from entering more than 17 characters
  if (UI.input.value >= 17) {
    UI.input.value = UI.input.value.slice(0, 17);
  }
});

UI.input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && UI.input.value.trim()) {
    addItem(UI.input.value);
    UI.input.value = '';
  }
});

// Add item event listener
UI.addBtn.addEventListener('click', function () {
  // Check if input isn't empty
  if (UI.input.value.trim()) {
    addItem(UI.input.value);
    UI.input.value = '';
  }
});

// Filter event listener to filter item list
UI.filter.addEventListener('input', function () {
  state.filter = UI.filter.value;
  saveToStorage();
  renderList();
});

// Sort event listener to sort item list
UI.sort.addEventListener('change', function () {
  state.sort = sort.value;
  saveToStorage();
  renderList();
});

// Event delegation
UI.list.addEventListener('click', function (e) {
  const parent = e.target.closest('.app__list-item');
  console.log(e.target);
  if (
    e.target.classList.contains('app__list-item-btn--remove') ||
    e.target.classList.contains('fa-xmark')
  ) {
    // If "X" button is clicked -> remove item
    removeItem(+parent.dataset.id);
  } else if (
    parent === e.target ||
    e.target.classList.contains('app__list-item-text') ||
    e.target.classList.contains('app__list-item-content')
  ) {
    enableEditMode(+parent.dataset.id);
  } else if (
    e.target.classList.contains('app__list-item-btn--edit') ||
    e.target.classList.contains('fa-check')
  ) {
    const editInput = document.querySelector('.app__list-item-edit-input');
    saveEditedItem(+parent.dataset.id, editInput.value);
  }
});

UI.clearBtn.addEventListener('click', function () {
  state.items = [];
  state.filter = '';
  state.sort = 'old';
  saveToStorage();
  renderList();
});
