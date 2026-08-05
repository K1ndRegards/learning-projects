const darkModeSwitch = document.querySelector('#darkModeSwitch');

darkModeSwitch.addEventListener('input', function () {
  document.documentElement.classList.toggle('dark');
});
