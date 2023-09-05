import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breeSelect = document.querySelector('.breed-select');

fetchBreeds()
  .then(breeds => {
    console.log('breeds:', breeds);
  })
  .catch(error => {
    console.log('error:', error);
  });

fetchCatByBreed('breedId')
  .then(catData => {})
  .catch(error => {});
