const hamburger = document.querySelector('.main-header__hamburger');
const sideMenu = document.querySelector('.main-header__mobile-list');

hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('main-header__hamburger--active');
  sideMenu.classList.toggle('main-header__mobile-list--active');
});
