import { fetchBreeds, fetchCatByBreed } from './cat-api';

const refs = {
  selectEl: document.querySelector('.breed-select'),
  catDiv: document.querySelector('.cat-info'),
  loaderEl: document.querySelector('.loader'),
  errorParagraph: document.querySelector('.error'),
};

fetchBreeds()
  .then(({ data }) => {
    getMarkup(data);

    refs.selectEl.style.display = 'block';
  })

  .catch(er => {
    console.log(er);

    refs.errorParagraph.style.display = 'block';
  })
  .finally(el => (refs.loaderEl.style.display = 'none'));

function getMarkup(data) {
  const markup = data
    .map(el => {
      return `<option value = '${el.id}'>${el.name}</option>`;
    })
    .join('');
  refs.selectEl.innerHTML = markup;
}

refs.selectEl.addEventListener('change', onSelectElChange);
function onSelectElChange(event) {
  refs.loaderEl.style.display = 'block';
  refs.catDiv.style.display = 'none';
  refs.errorParagraph.style.display = 'none';
  const selectedBreedId = event.target.value;
  fetchCatByBreed(selectedBreedId)
    .then(({ data }) => {
      displayCatInfo(data);

      refs.catDiv.style.display = 'block';
    })
    .catch(error => {
      console.error(error);
      refs.errorParagraph.style.display = 'block';
    })
    .finally(el => (refs.loaderEl.style.display = 'none'));
}

function displayCatInfo(catInfo) {
  const data = catInfo[0];
  const catInfoMarkup = `
   
      <img src="${data.url}" alt="Cat Image">
      <h2 class="breed-name">${data.breeds[0].name}</h2>
      <p class="breed-description">${data.breeds[0].description}</p>
      <p class="breed-temperament">${data.breeds[0].temperament}</p>
   
  `;
  refs.catDiv.innerHTML = catInfoMarkup;
  console.log(catInfoMarkup);
  console.log(refs.catDiv);
}
