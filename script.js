//toggles loading
const toggleLoader = () => {
  const loader = document.querySelector('#loader');
  loader.classList.toggle('hide');
};

//creates option item
const createOption = (option) => {
  const optionItem = document.createElement('option');
  optionItem.value = option;
  optionItem.innerText = option;
  return optionItem;
};

//updating breeds
const updateBreeds = (breedList) => {
  const breeds = Object.keys(breedList);
  const selectElement = document.querySelector('#breedSelection');
  breeds.forEach(breed => {
    const optionElement = createOption(breed);
    selectElement.appendChild(optionElement);
  });
};

//fetching breed list 
const getBreeds = () => {
  fetch('https://dog.ceo/api/breeds/list/all')
    .then((response) => {return response.json()})
    .then((response) => {return response.message})
    .then((breeds) => {updateBreeds(breeds)})
};

//updating images
const updateImage = (imageUrl) => {
  document.querySelector('#dogImageHolder').src = imageUrl;
};

//fetching random images
const getRandomImages = () => {
  fetch('https://dog.ceo/api/breeds/image/random')
    .then((response) => {return response.json()})
    .then((response) => { return response.message})
    .then((imageUrl) => {updateImage(imageUrl)})
    .then(toggleLoader)
    .catch((error) => {console.log(error)});
};

//fetching specific breed image
const getBreedImage = (breed) => {
  const url = `https://dog.ceo/api/breed/`+ breed +`/images/random`
  fetch(url)
    .then((response) => {return response.json()})
    .then((response) => { return response.message})
    .then((imageUrl) => {updateImage(imageUrl)})
    .then(toggleLoader)
    .catch((error) => {console.log(error);
    })
};

//changing image
const changeImage = () =>{
  toggleLoader();
  const breed = document.querySelector('#breedSelection').value;
  if (breed === 'random') {
    return getRandomImages();
  }
  getBreedImage(breed);
} 

window.onload = () => {
  getBreeds();
  const imageButton = document.querySelector('#generateButton');
  imageButton.addEventListener('click', changeImage);
};