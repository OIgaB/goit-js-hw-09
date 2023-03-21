"use strict";
import { Notify } from '../../node_modules/notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

let promiseCounter = null;
let delay = null;
let step = null;
let amount = "";
let promiseDelay = null;

form.addEventListener('input', handleFormInput);
form.addEventListener('submit', handleFormSubmit);

function handleFormInput (evt) {
  amount = evt.currentTarget.amount.value;
  delay = Number(evt.currentTarget.elements.delay.value);
  step = Number(evt.currentTarget.step.value);
}

function handleFormSubmit (evt) {
  evt.preventDefault();

  promiseCounter = 0;
  promiseDelay = delay;

  for (let i = 0; i < amount; i += 1) {
    promiseCounter += 1;
    if (i >= 1) {
      promiseDelay += step;
    }

    createPromise(promiseCounter, promiseDelay)
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }
}

function createPromise(position, delay) {
    return new Promise ((resolve, reject) => {

      setTimeout (()=> {
        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {  //> 0.3;
          // Fulfill
          resolve({'position': position, 'delay': delay});
        } else {
          // Reject
          reject({'position': position, 'delay': delay});
        }   
      }, delay);

    });  
}