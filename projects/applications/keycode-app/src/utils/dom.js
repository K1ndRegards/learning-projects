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
  classList.forEach((cls) => {
    if (cls) el.classList.add(cls);
  });

  // Setting attributes to the element
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);

  // Creating and appending text node into the element
  if (text) el.appendChild(document.createTextNode(text));

  // Adding children to the element
  children.forEach((child) => {
    // if child is a string, convert it to the text node
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else {
      el.appendChild(child);
    }
  });

  return el;
}
