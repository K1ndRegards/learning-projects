const state = {
  items: [],
};

const UI = {
  emptyMessage: document.querySelector('.todo-app__list-empty'),
  itemList: document.querySelector('.todo-app__item-list'),
  itemTemplate: document.querySelector('#list-item-template'),
  inputForm: document.querySelector('.todo-app__input-form'),
  inputField: inputForm.querySelector('.todo-app__task-input'),
};
