import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', addPromice);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve ({ position, delay })
      } else {
        reject ({ position, delay })
      }
    }, delay);
  });
};

function addPromice(evt) {
  evt.preventDefault();

  let delay = Number(evt.target.delay.value);
  const step = Number(evt.target.step.value);
  const amount = Number(evt.target.amount.value);

    for (let position = 1; position <= amount; position += 1) {
      createPromise( position, delay )
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.success(`❌ Rejected promise ${position} in ${delay}ms`);
        });
      delay += step;
    };
};