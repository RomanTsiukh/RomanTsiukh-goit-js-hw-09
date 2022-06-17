import '../css/common.css';
import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "flatpickr/dist/flatpickr.min.css";

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = (Math.floor(ms / day));
  // Remaining hours
  const hours = (Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = (Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = (Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
};

function addLeadingZero (value) {
  return String(value).padStart(2, '0');
};

let selectedDate = null;
refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0] > Date.now()) {
          refs.startBtn.disabled = false;
          selectedDate = selectedDates[0];
      } else {Notify.failure("Please choose a date in the future")}
    },
};  

class Timer {
  constructor() {
    refs.startBtn.dicabled = true;
    this.intervalId = null;
    this.isActive = false;
  }
  
  start() {
    if(this.isActive) {return};
    this.isActive = true;

    this.intervalId = setInterval(() => {
        const deltaTime = selectedDate - Date.now();
        const time = convertMs(deltaTime);
        this.updateComponents(time);

        if (deltaTime <= 0) {this.stop();}}, 
    1000)
  }

  updateComponents({ days, hours, minutes, seconds }) {
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
  }
  
  stop() {
    clearInterval(this.intervalId)
  }
}
 
const timer = new Timer()
flatpickr(refs.inputDate, options);
 refs.startBtn.addEventListener("click", () => timer.start())











