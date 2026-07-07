const inviteText = document.querySelector('.invite-text');
const eKey = document.querySelector('.key-codes__key--eKey');
const eKeyCode = document.querySelector('.key-codes__key--eKeyCode');
const eCode = document.querySelector('.key-codes__key--eCode');

// Initializer function to open interface after first key press
function initialize() {
  inviteText.remove();

  [eKey, eKeyCode, eCode].forEach((field) =>
    field.parentElement.classList.remove('hidden'),
  );
}

// Fire initializer and then remove event listener
window.addEventListener('keydown', initialize, { once: true });

window.addEventListener('keydown', function (e) {
  eKey.textContent = e.key === ' ' ? 'Space' : e.key;
  eKeyCode.textContent = e.keyCode;
  eCode.textContent = e.code;
});
