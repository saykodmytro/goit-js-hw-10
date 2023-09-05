import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const cardCatInfo = document.querySelector('.cat-info');

fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  })
  .catch(error => {
    throw error;
  });

breedSelect.addEventListener('change', onChange);

function onChange(evt) {
  console.log(evt.target.value);
  const selectedBreedId = evt.target.value;

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      console.log(catData);
      // displayCatInfo(catData);
      cardCatInfo.innerHTML = createCatInfo(catData);
    })
    .catch(error => {
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
                   <p><span class="temperament">Temperament: </span>${item.breeds[0].temperament}</p>
                </div>`
    )
    .join('');
}
