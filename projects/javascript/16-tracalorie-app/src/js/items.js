import { isValidId, isValidName, isValidCalories } from './validators.js';

class CalorieEntity {
  constructor(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    if (!isValidId(value)) {
      throw new Error(`Invalid id value. Received: ${value}`);
    }
    this._id = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (!isValidName(value)) {
      throw new Error(`Invalid name value. Received: ${value}`);
    }
    this._name = value;
  }

  get calories() {
    return this._calories;
  }

  set calories(value) {
    if (!isValidCalories(value)) {
      throw new Error(`Invalid calories value. Received: ${value}`);
    }
    this._calories = value;
  }

  toJSON() {
    return { id: this.id, name: this.name, calories: this.calories };
  }
}

export class Meal extends CalorieEntity {
  constructor(id, name, calories) {
    super(id, name, calories);
  }
}

export class Workout extends CalorieEntity {
  constructor(id, name, calories) {
    super(id, name, calories);
  }
}
