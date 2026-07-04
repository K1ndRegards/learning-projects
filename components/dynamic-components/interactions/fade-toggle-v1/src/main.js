function toggleElement(el) {
  el.classList.toggle('hidden');
}

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
  const isVisible = !Array.from(el.classList).includes('hidden');

  if (isVisible) {
    fadeOut(el);
  } else {
    fadeIn(el);
  }
}

const btn = document.querySelector('.animation__btn');
const items = Array.from(document.querySelector('.animation__list').children);

Array.from(items).forEach((item) => item.classList.add('hidden'));

btn.addEventListener('click', function () {
  items.forEach((item) => toggleFade(item));
});
