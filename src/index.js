import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix';
import { createCatInfo } from './js/createCatInfo';

const breedSelect = document.querySelector('.breed-select');
const cardCatInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

fetchBreeds()
  .then(breeds => {
    breedSelect.style.display = 'block';
    loader.style.display = 'none';

    new SlimSelect({
      select: breedSelect,
      placeholder: 'Select a breed',
      data: breeds.map(breed => ({ value: breed.id, text: breed.name })),
    });

    breedSelect.addEventListener('change', onChange);
  })
  .catch(error => {
    console.log('bad');

    onError();
    throw error;
  });

function onChange(evt) {
  const selectedBreedId = evt.target.value;
  loader.style.display = 'block';

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      cardCatInfo.style.display = 'flex';
      loader.style.display = 'none';

      console.log(catData);
      cardCatInfo.innerHTML = createCatInfo(catData);
    })
    .catch(error => {
      onError();
      throw error;
    });
}

function onError() {
  Notify.failure(error.textContent);
  loader.style.display = 'none';
}
