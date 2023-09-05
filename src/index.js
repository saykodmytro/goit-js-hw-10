import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import { Notify } from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const cardCatInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

breedSelect.style.display = 'none';
cardCatInfo.style.display = 'none';
error.style.display = 'none';
loader.style.display = 'block';

breedSelect.addEventListener('change', onChange);

fetchBreeds()
  .then(breeds => {
    breedSelect.style.display = 'block';
    loader.style.display = 'none';
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  })
  .catch(error => {
    breedSelect.style.display = 'none';
    loader.style.display = 'none';
    onError();
    throw error;
  });

function onChange(evt) {
  console.log(evt.target.value);
  const selectedBreedId = evt.target.value;

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      cardCatInfo.style.display = 'flex';
      loader.style.display = 'none';

      console.log(catData);
      cardCatInfo.innerHTML = createCatInfo(catData);
    })
    .catch(error => {
      onError();
      breedSelect.style.display = 'none';
      throw error;
    });
}

function createCatInfo(arr) {
  return arr
    .map(
      item => ` <img class="item-img" src="${item.url}" alt="${item.name}" width="400" />
                <div>
                   <h2>${item.breeds[0].name}</h2>
                   <p>${item.breeds[0].description}</p>
                   <p><b>Temperament: </b>${item.breeds[0].temperament}</p>
                </div>`
    )
    .join('');
}

function onError() {
  Notify.failure(error.textContent);
}
