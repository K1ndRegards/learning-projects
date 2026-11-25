const PLAIN_ENTITY_KEYS = new Set(['id', 'name', 'calories']);

export function isValidId(value) {
  return typeof value === 'number' && Number.isInteger(value);
}

export function isValidName(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

export function isValidCalories(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

export function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function hasExactKeys(obj, allowedKeys) {
  const keys = Object.keys(obj);

  return (
    keys.length === allowedKeys.size &&
    keys.every((key) => allowedKeys.has(key))
  );
}

function hasValidValues(entity) {
  return (
    isValidId(entity.id) &&
    isValidName(entity.name) &&
    isValidCalories(entity.calories)
  );
}

export function isPlainCalorieEntity(entity) {
  // Check if entity is valid plain object, has valid keys and valid values
  return (
    isPlainObject(entity) &&
    hasExactKeys(entity, PLAIN_ENTITY_KEYS) &&
    hasValidValues(entity)
  );
}
