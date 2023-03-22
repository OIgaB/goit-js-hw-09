"use strict";
import { Notify } from '../../node_modules/notiflix/build/notiflix-notify-aio';
import flatpickr from "flatpickr";

const dataContainer = document.querySelector('.timer');   // <div>
const itemWrapper = document.querySelectorAll(".field");  // усі <div>
const values = document.querySelectorAll('.value');       // усі <span> значення
const labels = document.querySelectorAll('.label');       // усі <span> назви
const timerDays = document.querySelector('span[data-days]');  
const timerHours = document.querySelector('span[data-hours]');
const timerMinutes = document.querySelector('span[data-minutes]');
const timerSeconds = document.querySelector('span[data-seconds]');
const timerBtn = document.querySelector('button[data-start]'); // <button>

let deltaTime = null;

const options = {  //об'єкт параметрів (необов'язковий для бібліотеки flatpickr)
    enableTime: true,   //Enables time picker
    time_24hr: true, //Displays time picker in 24 hour mode without AM/PM selection when enabled.
    defaultDate: new Date(), //Sets the initial selected date(s).
    minuteIncrement: 1, //Adjusts the step for the minute input (incl. scrolling)
    onClose(selectedDates) { //Function(s) to trigger on every time the calendar is closed. See Events API
      console.log(selectedDates[0]); //selectedDates - масив обраних дат

      const selectedYear = selectedDates[0].getFullYear();
      const selectedMonth = selectedDates[0].getMonth(); //+1
      const selectedDay = selectedDates[0].getDate();
      const selectedHours = selectedDates[0].getHours(); 
      const selectedMinutes = selectedDates[0].getMinutes(); 

      const currentTime = new Date().getTime();   
      const selectedTime = new Date(selectedYear, selectedMonth, selectedDay, selectedHours, selectedMinutes, 0, 0).getTime();
      deltaTime = selectedTime - currentTime;
      
      // Таймер зворотнього відліку, що запускається кнопкою  
      timerBtn.addEventListener('click', handleTimerBtnClick);
      
      function handleTimerBtnClick () {
        const intervalId = setInterval(() => {
            timer = deltaTime -= 1000; // таймер на зменшення в мс
            output = convertMs(timer); // таймер на зменшення в формі об'єкта

            if (timer <= 1000) {
                clearInterval(intervalId);
            }
            timerDays.textContent = output.days;
            timerHours.textContent = output.hours;
            timerMinutes.textContent = output.minutes;
            timerSeconds.textContent = output.seconds;
        }, 1000);
      } 

      if (deltaTime < 0) {
        timerBtn.disabled = true;
        Notify.failure("Please choose a date in the future");
      } else {
        timerBtn.disabled = false;
      }
    },
  };

  flatpickr('#datetime-picker', options);

  // Функція конвертації часу з мілісекунд у дні, години, хвилини і секунди

  function convertMs(ms) {  //ms - різниця між кінцевою і поточною датою в мілісекундах.
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }

  // Функція додавання нуля перед значеннями днів, годин, хвилин і секунд (формат xx:xx:xx)
  function addLeadingZero(value) {
    return String(value).padStart(2, "0");
  }

// Стрилізація циферблату
dataContainer.style.cssText = 'display: flex; color: midnightblue; padding-top: 20px; gap: 10px;';

itemWrapper.forEach((item) => {
    item.style.cssText = 'display: flex; flex-direction: column;';
})

values.forEach((value) => {
    value.style.cssText = 'font-weight: 700; font-size: 30px; display: flex; justify-content: center;';
})
labels.forEach((label) => {
    label.style.cssText = 'text-decoration: overline; text-transform: uppercase; font-size: 15px;';
}) 
