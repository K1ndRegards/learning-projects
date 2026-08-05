/* 
  State item template
  {
    id = 1,
    text: 'Some task",
    date: "2026-07-21 14:28:31",
    completed: false,
  }
*/
const state = {
  items: [],
};

const UI = {
  emptyMessage: document.querySelector('.todo-app__list-empty'),
  itemList: document.querySelector('.todo-app__item-list'),
  itemTemplate: document.querySelector('#list-item-template').content,
  inputForm: document.querySelector('.todo-app__input-form'),
  inputField: document.querySelector('.todo-app__task-input'),
};

// Function to clear item list
function clearList() {
  while (UI.itemList.firstChild) {
    UI.itemList.firstChild.remove();
  }
}

// Get current date and time function
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

// Function to get existing IDs
function getExistingIds() {
  return new Set(state.items.map((item) => item.id));
}

// Function to generate new id for list item
function getNewId() {
  const existingIds = getExistingIds();

  let i = 1;
  while (existingIds.has(i)) {
    i++;
  }

  return i;
}

// Function to create list items from template
function createListItem(item) {
  const listItemClone = UI.itemTemplate.cloneNode(true);

  const newListItem = listItemClone.querySelector('.todo-app__list-item');
  newListItem.dataset.id = item.id;

  if (item.completed) {
    const inputCheckbox = listItemClone.querySelector(
      '.todo-app__input-checkbox',
    );

    inputCheckbox.checked = true;
  }

  const textField = listItemClone.querySelector('.todo-app__item-text');
  textField.textContent = item.text;

  const dateField = listItemClone.querySelector('.todo-app__item-date');
  dateField.textContent = item.date;

  return listItemClone;
}

// Main render function
function render() {
  clearList();
  if (state.items.length === 0) {
    UI.emptyMessage.classList.remove('hidden');
    return;
  } else {
    UI.emptyMessage.classList.add('hidden');
  }

  state.items.forEach((item) => {
    const newListItem = createListItem(item);

    UI.itemList.appendChild(newListItem);
  });
}

// Save items to local storage
function saveItems() {
  localStorage.setItem('listData', JSON.stringify(state));
}

// Load items from local storage
function loadItems() {
  const savedData = JSON.parse(localStorage.getItem('listData'));
  if (savedData && Array.isArray(savedData.items)) {
    state.items = savedData.items;
  }
}

// Add new item to the state
function addNewItem() {
  const newID = getNewId();

  state.items.push({
    id: newID,
    text: UI.inputField.value,
    date: getCurrentDateTime(),
    completed: false,
  });
}

// Remove item from the state
function removeItem(id) {
  state.items = state.items.filter((item) => item.id !== id);
}

// Toggle complete state on individual list item
function toggleComplete(id) {
  const completedItem = state.items.find((item) => item.id === id);
  if (!completedItem) return;

  completedItem.completed = !completedItem.completed;
}

// Events
// Add list item on submit
UI.inputForm.addEventListener('submit', function (e) {
  e.preventDefault();
  addNewItem();
  saveItems();
  render();
  UI.inputField.value = '';
});

UI.itemList.addEventListener('click', function (e) {
  // Event delegation to remove list items
  if (e.target.closest('.todo-app__remove-btn')) {
    const listItem = e.target.closest('.todo-app__list-item');

    removeItem(Number(listItem.dataset.id));
    saveItems();
    render();
    // Event delegation to mark completed tasks
  } else if (e.target.closest('.todo-app__item-label')) {
    const listItem = e.target.closest('.todo-app__list-item');

    toggleComplete(Number(listItem.dataset.id));
    saveItems();
    render();
  }
});

// Render list when the page loads
window.addEventListener('DOMContentLoaded', function () {
  loadItems();
  render();
});
