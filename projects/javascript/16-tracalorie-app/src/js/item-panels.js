const MAX_CALORIES_PER_ENTITY = 10000;
const SOFT_CALORIES_LIMIT_PER_ENTITY = 2500;

// Form smooth collapsing class
class Collapse {
  constructor(type) {
    this.formWrapper = document.querySelector(`#${type}-form-wrapper`);

    // Flag so that multiple clicks didn't break the animation
    this.isTransitioning = false;
  }

  // Main toggler
  toggle() {
    if (this.formWrapper.classList.contains('is-open')) {
      this.hide();
    } else {
      this.show();
    }
  }

  // Smooth transitioning from 0px to element height
  show() {
    // Return if element is already open or animation is ongoing
    if (this.isTransitioning || this.formWrapper.classList.contains('is-open'))
      return;

    // Starting animation
    this.isTransitioning = true;

    // Removing base collapse style, which hides the element by default
    this.formWrapper.classList.remove('collapse-wrapper');
    // Setting collapsing class which indicates ongoing transition and also sets basic collapsing styles
    this.formWrapper.classList.add('collapsing');

    // Setting starting height to 0px
    this.formWrapper.style.height = '0px';

    // Right after setting starting height forcing browser to recalculate styles right away
    this.formWrapper.offsetHeight;

    // Computing real element height and setting it
    this.formWrapper.style.height = `${this.formWrapper.scrollHeight}px`;

    // Waiting for transition to end
    this.formWrapper.addEventListener(
      'transitionend',
      () => {
        // Setting flag to false because animation ended
        this.isTransitioning = false;

        // Removing temporal collapsing class
        this.formWrapper.classList.remove('collapsing');
        // Returning base collapse-wrapper class and also adding is-open state
        this.formWrapper.classList.add('collapse-wrapper', 'is-open');
        // Resetting inline-height, so that the block can automatically adapt to the content in the future
        this.formWrapper.style.height = '';
      },
      { once: true },
    );
  }

  // Smooth transition from content height to 0px
  hide() {
    // Return if animation is ongoing or element isn't even open
    if (this.isTransitioning || !this.formWrapper.classList.contains('is-open'))
      return;

    // Setting transitioning flag, animation is ongoing
    this.isTransitioning = true;

    // Setting exact current element height in px
    this.formWrapper.style.height = `${this.formWrapper.getBoundingClientRect().height}px`;

    // Forcing browser to recalculate styles right away
    this.formWrapper.offsetHeight;

    // Changing element mode to ongoing collapsing
    this.formWrapper.classList.add('collapsing');
    // Removing static state and open state classes
    this.formWrapper.classList.remove('collapse-wrapper', 'is-open');

    // Setting target height - 0px
    this.formWrapper.style.height = '0px';

    // Waiting for animation to end
    this.formWrapper.addEventListener(
      'transitionend',
      () => {
        // Setting flag to false because animation ended
        this.isTransitioning = false;

        // Removing collapsing class
        this.formWrapper.classList.remove('collapsing');
        // Return static closed state class
        this.formWrapper.classList.add('collapse-wrapper');
        // Clearing inline height style
        this.formWrapper.style.height = '';
      },
      { once: true },
    );
  }
}

class ItemPanel {
  constructor(type, callbacks) {
    if (type !== 'meal' && type !== 'workout') {
      throw new Error(`Wrong panel type. Received: ${type}`);
    }

    this._type = type;
    this._collapse = new Collapse(type);
    this._callbacks = callbacks;

    this._UI = {
      listItemTemplate: null,
      filter: null,
      form: null,
      openFormBtn: null,
      nameInput: null,
      calorieInput: null,
      addBtn: null,
      itemList: null,
    };

    this._cacheDOM();
    this._bindEventHandlers();
    this._attachEventHandlers();
  }

  _cacheDOM() {
    this._UI.listItemTemplate = document.querySelector('#list-item-template');
    this._UI.filter = document.querySelector(`#${this._type}-filter`);
    this._UI.form = document.querySelector(`#${this._type}-form`);
    this._UI.openFormBtn = document.querySelector(`#toggle-${this._type}-form`);
    this._UI.nameInput = document.querySelector(`#${this._type}-name-input`);
    this._UI.calorieInput = document.querySelector(
      `#${this._type}-calorie-input`,
    );
    this._UI.addBtn = document.querySelector(`#add-${this._type}-btn`);
    this._UI.itemList = document.querySelector(`#${this._type}-item-list`);
  }

  _bindEventHandlers() {
    this._toggleFormEventHandler = this._toggleFormEventHandler.bind(this);
    this._submitEventHandler = this._submitEventHandler.bind(this);
    this._filterEventHandler = this._filterEventHandler.bind(this);
    this._listClickEventHandler = this._listClickEventHandler.bind(this);
  }

  _attachEventHandlers() {
    this._UI.openFormBtn.addEventListener(
      'click',
      this._toggleFormEventHandler,
    );

    this._UI.form.addEventListener('submit', this._submitEventHandler);

    this._UI.filter.addEventListener('input', this._filterEventHandler);

    this._UI.itemList.addEventListener('click', this._listClickEventHandler);
  }

  _toggleFormEventHandler() {
    this._collapse.toggle();
  }

  createListItem(entity) {
    const fragment = this._UI.listItemTemplate.content.cloneNode(true);
    const li = fragment.querySelector('.list-item');

    li.dataset.id = entity.id;

    const nameField = li.querySelector('.list-item__name');
    const calorieNumber = li.querySelector('.list-item__calories-number');

    nameField.textContent = entity.name;
    calorieNumber.textContent = entity.calories;
    calorieNumber.classList.add(
      this._type === 'meal' ? 'bg-primary' : 'bg-secondary',
    );

    this._UI.itemList.prepend(li);
  }

  _submitEventHandler(e) {
    e.preventDefault();

    const name = this._UI.nameInput.value.trim();
    let calories = Number(this._UI.calorieInput.value);

    if (!name || Number.isNaN(calories)) return;

    if (calories > MAX_CALORIES_PER_ENTITY) {
      alert(
        `The maximum calorie count (${MAX_CALORIES_PER_ENTITY}) per calorie entity has been exceeded.`,
      );
      this._UI.calorieInput.value = MAX_CALORIES_PER_ENTITY;
      return;
    } else if (calories >= SOFT_CALORIES_LIMIT_PER_ENTITY) {
      if (
        !confirm(`Are you sure the number is correct? (${calories} calories)`)
      ) {
        return;
      }
    }
    this._UI.nameInput.value = '';
    this._UI.calorieInput.value = '';

    this._callbacks.onSubmitCb(name, calories);
  }

  _filterEventHandler() {
    const filterValue = this._UI.filter.value.trim();

    const filteredIds = new Set(this._callbacks.onFilterCb(filterValue));

    this._UI.itemList.querySelectorAll('.list-item').forEach((listItem) => {
      if (!filteredIds.has(Number(listItem.dataset.id))) {
        listItem.style.display = 'none';
      } else {
        listItem.style.display = 'flex';
      }
    });
  }

  _listClickEventHandler(e) {
    if (!e.target.closest('.list-item__remove')) {
      return;
    }

    const item = e.target.closest('.list-item');
    const itemId = Number(item.dataset.id);

    this._callbacks.onRemoveCb(itemId);
    item.remove();
  }

  clearAll() {
    this._UI.itemList.innerHTML = '';
  }
}

export class MealPanel extends ItemPanel {
  constructor(callbacks) {
    super('meal', callbacks);
  }
}

export class WorkoutPanel extends ItemPanel {
  constructor(callbacks) {
    super('workout', callbacks);
  }
}
