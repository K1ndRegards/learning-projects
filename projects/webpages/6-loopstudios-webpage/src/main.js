const UI = {
  hamburgerBtn: null,
  mobileMenu: null,
};

function hamburgerHandler() {
  UI.hamburgerBtn.classList.toggle('hamburger-active');
  UI.mobileMenu.classList.toggle('hidden');
}

function init() {
  UI.hamburgerBtn = document.querySelector('#hamburger');
  UI.mobileMenu = document.querySelector('#mobile-menu');

  UI.hamburgerBtn.addEventListener('click', hamburgerHandler);
}

window.addEventListener('DOMContentLoaded', init);
