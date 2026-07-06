function toggleElement(el) {
  el.classList.toggle('hidden');
}

const btn = document.querySelector('.animation__btn');
const itemList = document.querySelector('.animation__list');
const listItems = itemList.querySelectorAll('.animation__item');

listItems.forEach((item) => item.classList.add('hidden'));

btn.addEventListener('click', function () {
  listItems.forEach((item) => toggleElement(item));
});
