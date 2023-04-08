import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';


const btnStartTimer = document.querySelector('button[data-start]');
const dayRemaining = document.querySelector('.value[data-days]');
const hourRemaining = document.querySelector('.value[data-hours]');
const minRemaining = document.querySelector('.value[data-minutes]');
const secRemaining = document.querySelector('.value[data-seconds]');

let timerId = null;
let futureTime = 0;

btnStartTimer.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minDate: 'today',
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    futureTime = selectedDates[0].getTime();
    clearInterval(timerId);
    setMainTimer(0);
    futureTime - Date.now() <= 0
      ? (Notiflix.Notify.failure('Please choose a date in the future'),
        (btnStartTimer.disabled = true))
      : (btnStartTimer.disabled = false);
  },
};

flatpickr('#datetime-picker', options);

btnStartTimer.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  btnStartTimer.disabled = true;
  timerId = setInterval(setRemaining, 1000);
}

function setRemaining() {
  const realTime = Date.now();
  const timeRemaining = futureTime - realTime;
  console.log(`timeRemaining(ms) = `, timeRemaining);
  timeRemaining > 0
    ? console.log(setMainTimer(timeRemaining))
    : (clearInterval(timerId), (btnStartTimer.disabled = true));
}

function setMainTimer(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  dayRemaining.textContent = addLeadingZero(days);
  hourRemaining.textContent = addLeadingZero(hours);
  minRemaining.textContent = addLeadingZero(minutes);
  secRemaining.textContent = addLeadingZero(seconds);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


