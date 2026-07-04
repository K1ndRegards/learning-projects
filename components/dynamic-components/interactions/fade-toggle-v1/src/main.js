// import { createElement } from './utils/dom.js';
import { toggleElement } from './utils/dom.js';

function fadeIn(el) {
  toggleElement(el);
  el.classList.add('fade');

  requestAnimationFrame(() => {
    el.classList.add('fade--visible');
  });
}

function fadeOut(el) {
  el.classList.remove('fade--visible');

  el.addEventListener('transitionend', function handler() {
    toggleElement(el);
    el.removeEventListener('transitionend', handler);
  });
}

function toggleFade(el) {
  const isVisible = getComputedStyle(el).display !== 'none';

  if (isVisible) {
    fadeOut(el);
  } else {
    fadeIn(el);
  }
}

const btn = document.querySelector('.animation__btn');
const items = Array.from(document.querySelector('.animation__list').children);

btn.addEventListener('click', function () {
  items.forEach((item) => toggleFade(item));
});
