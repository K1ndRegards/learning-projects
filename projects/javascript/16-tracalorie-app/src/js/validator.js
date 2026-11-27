export default class validator {
  static isValidId(value) {
    return typeof value === 'number' && Number.isInteger(value) && value > 0;
  }
  static isValidName(value) {
    return typeof value === 'string' && value.trim().length > 0;
  }

  static isValidCalories(value) {
    return typeof value === 'number' && Number.isFinite(value) && value >= 0;
  }

  static _isPlainObject(value) {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
  }
}
