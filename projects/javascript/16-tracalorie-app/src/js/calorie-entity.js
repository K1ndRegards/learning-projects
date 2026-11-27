import Storage from './storage.js';
import Validator from './validator.js';

class Entity {
  constructor(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    if (!Validator.isValidId(value)) {
      throw new Error(`Got invalid id value. Received: ${value}`);
    }
    this._id = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (!Validator.isValidName(value)) {
      throw new Error(`Got invalid name value. Received: ${value}`);
    }
    this._name = value;
  }

  get calories() {
    return this._calories;
  }

  set calories(value) {
    if (!Validator.isValidCalories(value)) {
      throw new Error(`Got invalid calories value. Received: ${value}`);
    }
    this._calories = value;
  }

  toJSON() {
    return { id: this.id, name: this.name, calories: this.calories };
  }
}

export class Meal extends Entity {
  constructor(name, calories) {
    super(Storage.getNewMealId(), name, calories);
  }
}

export class Workout extends Entity {
  constructor(name, calories) {
    super(Storage.getNewWorkoutId(), name, calories);
  }
}
