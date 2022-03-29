'use strict';


// global variables
// number of attempth - 25
const ATTEMPTS_ALLOWED = 25;
// clicks made
let clicksMade = 0;
// array for all products: 
const allProducts = [];

//windows into the DOM
//  - seciton
let imageContainer = document.getElementById('container');
//let anotherWay = document.querySelector('secton'); <-----this is the same way to select similar to CSS.

//  - display button
let showResults = document.getElementById('show-results');
// get images from DOM to manipulate
let imageOne = document.getElementById('image-one');
let imageTwo = document.getElementById('image-two');
let imageThree = document.getElementById('image-three');

// get the ul from the DOM to manipulate
let results = document.getElementById('display-results');



//console.log(showResults);


// constructor (the way you know it is a constructor is by the capital letter for the function name)
function Product(name, fileExtension = 'jpg') {//the jpg is adding a default value using th3e last item in the list.
    //properties
    // name
    this.name = name;
    // file path
    this.src = `img/${name}.${fileExtension}`;
    // votes
    this.votes = 0;
    // views
    this.views = 0;
    // push object instances into products(empty) array
    allProducts.push(this);
};
// ******** what does 'this' refer to? it refers to the instance being created in the object. *********

// instantiate products
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');

console.log(allProducts);


// functions
// get random numbers - helper function to get a random index
//from Math.random docs MDN
function getRandomNumber() {
    return Math.floor(Math.random() * allProducts.length);// the maximum number is meangless
}

// render images. in one function maybe refractor 
function renderImages() {
    let uniqueProductIndexes = [];

    while (uniqueProductIndexes.length < 3) {
        let num = getRandomNumber();
        while (uniqueProductIndexes.includes(num)) {
            num = getRandomNumber();
        }
        uniqueProductIndexes.push(num);
    }
    console.log(uniqueProductIndexes);

    imageOne.src = allProducts[uniqueProductIndexes[0]].src;
    imageOne.alt = allProducts[uniqueProductIndexes[0]].name;
    allProducts[uniqueProductIndexes[0]].views++;//this is a single object inside of an array.

    imageTwo.src = allProducts[uniqueProductIndexes[1]].src;
    imageTwo.alt = allProducts[uniqueProductIndexes[1]].name;
    allProducts[uniqueProductIndexes[1]].views++;

    imageThree.src = allProducts[uniqueProductIndexes[2]].src;
    imageThree.alt = allProducts[uniqueProductIndexes[2]].name;
    allProducts[uniqueProductIndexes[2]].views++;

}
//object Ojbect error means that you are doing objects wrong

// event handler for image clicks
function handleImageClick(event) {//sometimes will see eve in the spot of event.
    clicksMade++;//this is incrementing so that is counts the clicks
    let imageClicked = event.target.alt;// this is changing the image after one has been clicked.

    console.log(imageClicked);

    for (let i = 0; i < allProducts.length; i++) {
        if (allProducts[i].name === imageClicked) {
            allProducts[i].votes++;
        }
    }
    renderImages();

    if (clicksMade === ATTEMPTS_ALLOWED){
        imageContainer.removeEventListener('click', handleImageClick);
    }
}
// event handler for showning results
function handleResults(event) {
    if (clicksMade === ATTEMPTS_ALLOWED){
        for (let i = 0; i < allProducts.length; i++){
            let li = document.createElement('li');
            console.log(allProducts[i]);
            li.textContent = `${allProducts[i].name} had ${allProducts[i].votes} votes, and was seen ${allProducts[i].views} times.`;
            results.appendChild(li);
        }
    }
}


// executable code
renderImages();
// call the functions  to do the things???
//

// event listeners
// listen to section for image click
imageContainer.addEventListener('click', handleImageClick);//this is the callback function entered as an argument to be called later.
showResults.addEventListener('click', handleResults);

// listen to 'div' button to show results 


// function Product(name) {
// this.name = name;
// this.img = name + '.jpg';
// this.time_shown = 0;

// }

// let bag = new Product('bag');
// console.log(bag);

// let images = ['img/bag.jpg', 'img/banana.jpg', 'img/bathroom.jpg', 'img/boots.jpg', 'img/breakfast.jpg', 'img/bubblegum.jpg', 'img/chair.jpg', 'img/cthulhu.jpg', 'img/dog-duck.jpg', 'img/dragon.jpg', 'img/pen.jpg', 'img/pet-sweep.jpg', 'img/scissors.jpg', 'img/shark.jpg', 'img/tauntaun.jpg', 'img/unicorn.jpg', 'img/water-can.jpg'];
// console.log(images);