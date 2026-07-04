/**
 * Creates a DOM element with optional classes, attributes, text content,
 * and child nodes. Provides a flexible API similar to lightweight JSX.
 *
 * @param {string} tagName - The HTML tag name to create (e.g., 'div', 'span')
 *
 * @param {Object} [options={}] - Optional configuration object
 * @param {string|string[]} [options.classes=[]] - CSS classes to apply
 *        Can be a space-separated string or an array of class names.
 *
 * @param {Object} [options.attrs={}] - HTML attributes to set on the element.
 *        Keys are attribute names, values are attribute values.
 *
 * @param {string} [options.text=''] - Text content to insert into the element.
 *
 * @param {(Node|string)[]} [options.children=[]] - Child nodes or strings
 *        to append to the created element. Strings are converted to text nodes.
 *
 * @returns {HTMLElement} The newly created DOM element.
 */
export function createElement(
  tagName,
  { classes = [], attrs = {}, text = '', children = [] } = {},
) {
  const el = document.createElement(tagName);

  const classList =
    typeof classes === 'string' ? classes.trim().split(/\s+/) : classes;

  // Adding classes to the element
  classList.forEach((cls) => el.classList.add(cls));

  // Setting attributes to the element
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);

  // Creating and appending text node into the element
  if (text) el.appendChild(document.createTextNode(text));

  // Adding children to the element
  children.forEach((child) => {
    // if child is a string, convert it to the text node
    if (typeof child === 'string') {
      el.appendChild(createText(child));
    } else {
      el.appendChild(child);
    }
  });

  return el;
}

/**
 * Toggles the visibility of an element by switching its 'display' property.
 *
 * - If the element is currently visible (`display !== 'none'`), the function:
 *   - Saves the current computed 'display' value into 'el.dataset.display'
 *   - Sets 'display: none' to hide the element
 *
 * - If the element is currently hidden (`display === 'none'`), the function:
 *   - Restores the previous 'display' value from 'el.dataset.display'
 *   - Falls back to 'display: block' if no previous value exists
 *
 * This utility preserves the original display type (e.g., 'flex', 'inline-block',
 * 'grid', etc.), making it safer than simply toggling between 'none' and 'block'
 *
 * @param {HTMLElement} el - The element whose display state should be toggled
 * @returns {void}
 */
export function toggleElement(el) {
  // Get current display value
  const currentDisplay = getComputedStyle(el).display;

  // If element doesn't already have display set to none
  if (currentDisplay !== 'none') {
    // Save current display value in data attribute
    el.dataset.display = currentDisplay;
    // Set item display to none
    el.style.display = 'none';
    return;
  }

  // If element has display set to none
  // Get previous display value if it exists from data attribute
  // else set it to block
  const previousDisplay = el.dataset.display || 'block';
  // Set previous display value
  el.style.display = previousDisplay;

  return;
}
