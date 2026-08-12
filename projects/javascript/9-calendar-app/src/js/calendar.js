import { state } from './state.js';

const UI = {
  leftArrow: null,
  rightArrow: null,
  date: null,
  dateMonth: null,
  dateYear: null,
  calendarDays: null,
};

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function createDay(date) {
  const day = document.createElement('span');
  day.classList.add('day');
  day.textContent = date.getDate();

  return day;
}

function isToday(date) {
  const today = new Date();

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

function dateToString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function renderDays() {
  const currentMonth = new Date(state.calendar.currentMonth);
  const month = currentMonth.getMonth();
  const year = currentMonth.getFullYear();

  // Date to iterate
  let dt = new Date(year, month, 1);

  // Getting calendar monday
  dt.setDate(dt.getDate() - (dt.getDay() - 1));

  // Clear current calendar
  UI.calendarDays.replaceChildren();

  // 42 days in our calendar (7 * 6)
  for (let i = 0; i < 42; i++) {
    const newDay = createDay(dt);
    // If date is today
    if (isToday(dt)) newDay.classList.add('current');

    // Gray dates that are from previous/next month
    if (dt.getMonth() !== month || dt.getFullYear() !== year) {
      newDay.classList.add('gray');
    }

    UI.calendarDays.appendChild(newDay);

    setTimeout(() => {
      newDay.classList.add('day-show-up');
    }, 10 * i);

    dt.setDate(dt.getDate() + 1);
  }
}

function renderMonthAndYear() {
  UI.date.classList.remove('date-show-up');
  void UI.date.offsetWidth;
  // Hide month and year
  UI.date.classList.add('date-hide');

  // Wait for it to fully finish hide animation
  UI.date.addEventListener(
    'animationend',
    () => {
      // Change current values
      const dt = new Date(state.calendar.currentMonth);
      UI.dateMonth.textContent = MONTHS[dt.getMonth()];
      UI.dateYear.textContent = dt.getFullYear();

      // Show up animation
      UI.date.classList.remove('date-hide');
      UI.date.classList.add('date-show-up');
    },
    { once: true },
  );
}

function render() {
  renderDays();
  renderMonthAndYear();
}

function leftArrowHandler() {
  const currentMonth = new Date(state.calendar.currentMonth);
  currentMonth.setMonth(currentMonth.getMonth() - 1);

  state.calendar.currentMonth = dateToString(currentMonth);

  render();
}

function rightArrowHandler() {
  const currentMonth = new Date(state.calendar.currentMonth);
  currentMonth.setMonth(currentMonth.getMonth() + 1);

  state.calendar.currentMonth = dateToString(currentMonth);

  render();
}

export function calendarInit() {
  UI.leftArrow = document.querySelector('#left-arrow');
  UI.rightArrow = document.querySelector('#right-arrow');
  UI.date = document.querySelector('#date');
  UI.dateMonth = document.querySelector('#date-month');
  UI.dateYear = document.querySelector('#date-year');
  UI.calendarDays = document.querySelector('#days');

  state.calendar.currentDate = dateToString(new Date());

  UI.leftArrow.addEventListener('click', leftArrowHandler);
  UI.rightArrow.addEventListener('click', rightArrowHandler);

  render();
}
