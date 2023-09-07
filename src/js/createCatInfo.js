export function createCatInfo(arr) {
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
