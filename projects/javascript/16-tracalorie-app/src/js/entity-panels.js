class EntityPanel {
  // type e.g. "meal" or "workout"
  constructor(type, callbacks) {
    if (type !== 'meal' && type !== 'workout') {
      throw new Error(`Wrong panel type. Received: ${type}`);
    }

    this.type = type;
    this.callbacks = callbacks;

    this.UI = {
      listItemTemplate: null,
      filterField: null,
      entityForm: null,
      entityNameInput: null,
      calorieInput: null,
      addBtn: null,
      itemList: null,
    };

    this.cacheDOM();
    this.bindEventHandlers();
    this.setupEvents();
  }

  cacheDOM() {
    this.UI.filterField = document.querySelector(`#${this.type}-filter`);
    this.UI.listItemTemplate = document.querySelector('#list-item-template');
    this.UI.entityForm = document.querySelector(`#${this.type}-form`);
    this.UI.entityNameInput = document.querySelector(
      `#${this.type}-name-input`,
    );
    this.UI.calorieInput = document.querySelector(
      `#${this.type}-calorie-input`,
    );
    this.UI.addBtn = document.querySelector(`#add-${this.type}-btn`);
    this.UI.itemList = document.querySelector(`#${this.type}-item-list`);

    if (Object.values(this.UI).some((item) => !item)) {
      throw new Error('Error occurred while caching DOM for entity panels.');
    }
  }

  createListItem(entity) {
    const fragment = this.UI.listItemTemplate.content.cloneNode(true);
    const li = fragment.querySelector('.list-item');

    li.dataset.id = entity.id;

    const nameField = li.querySelector('.list-item__name');
    const calorieNumber = li.querySelector('.list-item__calories-number');

    nameField.textContent = entity.name;
    calorieNumber.textContent = entity.calories;
    calorieNumber.classList.add(
      this.type === 'meal' ? 'bg-primary' : 'bg-secondary',
    );

    this.UI.itemList.prepend(li);
  }

  bindEventHandlers() {
    this.submitEventHandler = this.submitEventHandler.bind(this);
    this.listClickEventHandler = this.listClickEventHandler.bind(this);
    this.filterInputEventHandler = this.filterInputEventHandler.bind(this);
  }

  submitEventHandler(e) {
    e.preventDefault();

    const name = this.UI.entityNameInput.value.trim();
    const calories = Number(this.UI.calorieInput.value);

    if (!name || Number.isNaN(calories)) return;

    this.UI.entityNameInput.value = '';
    this.UI.calorieInput.value = '';

    this.callbacks.onSubmitCb(name, calories);
  }

  listClickEventHandler(e) {
    const closest = e.target.closest('.list-item__remove');

    if (!closest) return;

    const li = closest.closest('.list-item');

    this.callbacks.onRemoveCb(Number(li.dataset.id));
    li.remove();
  }

  filterInputEventHandler() {
    const inputValue = this.UI.filterField.value;

    const validIds = this.callbacks.onFilterInputCb(inputValue);

    const listItems = this.UI.itemList.querySelectorAll('.list-item');

    listItems.forEach((listItem) => {
      if (!validIds.has(Number(listItem.dataset.id))) {
        listItem.style.display = 'none';
      } else {
        listItem.style.display = 'flex';
      }
    });
  }

  clearAll() {
    this.UI.itemList.innerHTML = '';
  }

  setupEvents() {
    this.UI.entityForm.addEventListener('submit', this.submitEventHandler);
    this.UI.itemList.addEventListener('click', this.listClickEventHandler);
    this.UI.filterField.addEventListener('input', this.filterInputEventHandler);
  }
}

export class MealPanel extends EntityPanel {
  constructor(callbacks) {
    super('meal', callbacks);
  }
}

export class WorkoutPanel extends EntityPanel {
  constructor(callbacks) {
    super('workout', callbacks);
  }
}

export class SetLimitModal {
  constructor(setLimitCb) {
    this.setLimitCb = setLimitCb;

    this.UI = {
      limitInputField: null,
      limitForm: null,
    };

    this.cacheDOM();
    this.bindEventHandlers();
    this.setupEvents();
  }

  cacheDOM() {
    this.UI.limitInputField = document.querySelector('input#calorie-limit');
    this.UI.limitForm = document.querySelector('form#limit-form');
  }

  bindEventHandlers() {
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onSubmitEventHandler(e) {
    e.preventDefault();

    this.setLimitCb(Number(this.UI.limitInputField.value));
    this.UI.limitInputField.value = '';
  }

  setupEvents() {
    this.UI.limitForm.addEventListener('submit', this.onSubmitEventHandler);
  }
}
