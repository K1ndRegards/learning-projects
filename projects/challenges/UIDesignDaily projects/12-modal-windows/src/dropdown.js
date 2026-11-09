const dropdownIds = ['dropdown-links', 'dropdown-themes'];

function setupDropdown(dropdownId) {
  // Getting our dropdown button and corresponding dropdown menu
  const dropdownMenu = document.querySelector(`#${dropdownId}`);
  const dropdownBtn = document.querySelector(`#open-${dropdownId}`);

  // Hide/show menu on click
  dropdownBtn.addEventListener('click', function () {
    dropdownMenu.classList.toggle('hidden');
  });

  const menuItems = dropdownMenu.querySelectorAll('li');

  menuItems.forEach((item) => {
    // Change button text when clicked on menu item
    item.addEventListener('click', function () {
      const selectedText = item.textContent.trim();

      dropdownBtn.querySelector('span').textContent = selectedText;

      dropdownMenu.classList.add('hidden');
    });
  });

  // Close dropdown when clicked outside menu
  window.addEventListener('click', function (e) {
    if (
      !e.target.closest(`#${dropdownId}`) &&
      !e.target.closest(`#open-${dropdownId}`)
    ) {
      dropdownMenu.classList.add('hidden');
    }
  });
}

dropdownIds.forEach((dropdownId) => {
  setupDropdown(dropdownId);
});
