// Color: '#00b8db'

const UI = {
  clockCanvas: null,
  clockHours: null,
  clockMinutes: null,
  clockSeconds: null,
};

const colors = {
  // App accent color - '#00b8db'
  border: '#00b8db',
  hourLines: '#00b8db',
  minuteLines: '#00b8db',
  hourHand: '#0e7490',
  minuteHand: '#0891b2',
  secondHand: '#06b6d4',
  centerDot: '#22d3ee',
};

let timeIntervalId = null;

function cacheDOM() {
  UI.clockCanvas = document.querySelector('#clock-canvas');
  UI.clockHours = document.querySelector('#clock-hours');
  UI.clockMinutes = document.querySelector('#clock-minutes');
  UI.clockSeconds = document.querySelector('#clock-seconds');
}

function setCurrentTime() {
  UI.clockHours.textContent = String(new Date().getHours()).padStart(2, '0');
  UI.clockMinutes.textContent = String(new Date().getMinutes()).padStart(
    2,
    '0',
  );
  UI.clockSeconds.textContent = String(new Date().getSeconds()).padStart(
    2,
    '0',
  );
}

function setClockInterval() {
  if (timeIntervalId) return;

  timeIntervalId = setInterval(() => {
    setCurrentTime();
  }, 100);
}

function clockCanvas() {
  const now = new Date();
  const canvas = UI.clockCanvas;

  const ctx = canvas.getContext('2d');
  // Setup canvas
  ctx.save(); // save the default state
  ctx.clearRect(0, 0, 500, 500);
  // put clock right in the middle
  ctx.translate(250, 250); // Put 0, 0 in the middle
  ctx.rotate(-Math.PI / 2); // rotate clock -90deg

  // Set default styles
  ctx.strokeStyle = '#000';
  ctx.fillStyle = '#0f172a';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';

  // ===========================
  // Draw clock face/border
  // saves everything before this line
  ctx.save();
  // because we change these styles in between save/restore
  ctx.strokeStyle = colors.border;
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(0, 0, 175, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fill();

  ctx.restore();
  // ===========================

  // ===========================
  // Draw minute lines
  ctx.save();
  ctx.lineWidth = 4;
  ctx.strokeStyle = colors.minuteLines;
  for (let i = 0; i < 60; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 30);
    ctx.moveTo(117, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
  }

  ctx.restore();
  // ===========================

  // ===========================
  // Draw hour lines
  ctx.save();
  ctx.strokeStyle = colors.hourLines;
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(100, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
  }

  ctx.restore();
  // ===========================

  // Get current time
  const hr = now.getHours() % 12;
  const min = now.getMinutes();
  const sec = now.getSeconds();

  // ===========================
  // Draw hour hand
  ctx.save();
  ctx.rotate(
    (Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec,
  );
  ctx.strokeStyle = colors.hourHand;
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();

  ctx.restore();
  // ===========================

  // ===========================
  // Draw minute hand
  ctx.save();
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.strokeStyle = colors.minuteHand;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(112, 0);
  ctx.stroke();

  ctx.restore();
  // ===========================

  // ===========================
  // Draw second hand
  ctx.save();
  ctx.rotate((sec * Math.PI) / 30);
  ctx.strokeStyle = colors.secondHand;
  ctx.fillStyle = colors.centerDot;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(112, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();
  // ===========================

  ctx.restore(); // restore default state

  requestAnimationFrame(clockCanvas);
}

function initClockAnimation() {
  requestAnimationFrame(clockCanvas);
}

export function initClock() {
  cacheDOM();
  setCurrentTime();
  setClockInterval();
  initClockAnimation();
}
