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
function Product(name, fileExtension = 'jpg') {//the jpg is adding a default value using the last item in the list.
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
let uniqueProductIndexes = [];
function renderImages() {


    while (uniqueProductIndexes.length < 6) {
        let num = getRandomNumber();
        while (uniqueProductIndexes.includes(num)) {
            num = getRandomNumber();
            //console.log('duplicate hit:', num);
        }
        uniqueProductIndexes.unshift(num);
    }
    console.log(uniqueProductIndexes);

    let productIndexOne = uniqueProductIndexes.pop();
    let productIndexTwo = uniqueProductIndexes.pop();
    let productIndexThree = uniqueProductIndexes.pop();
    // these steps will pop off the last three images then replace them with three new images.

    imageOne.src = allProducts[productIndexOne].src;
    imageOne.alt = allProducts[productIndexOne].name;
    allProducts[productIndexOne].views++;//this is a single object inside of an array.

    imageTwo.src = allProducts[productIndexTwo].src;
    imageTwo.alt = allProducts[productIndexTwo].name;
    allProducts[productIndexTwo].views++;

    imageThree.src = allProducts[productIndexThree].src;
    imageThree.alt = allProducts[productIndexThree].name;
    allProducts[productIndexThree].views++;

}
//object Ojbect error means that you are doing objects wrong

// remember this is the event handler for image clicks
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

    if (clicksMade === ATTEMPTS_ALLOWED) {
        imageContainer.removeEventListener('click', handleImageClick);
    }
}
// remember this is the event handler for showning results
function handleResults(event) {
    if (clicksMade === ATTEMPTS_ALLOWED) {
        for (let i = 0; i < allProducts.length; i++) {
            let li = document.createElement('li');
            console.log(allProducts[i]);
            li.textContent = `${allProducts[i].name} had ${allProducts[i].votes} votes, and was seen ${allProducts[i].views} times.`;
            results.appendChild(li);
        }
    }
}

renderImages();
// here is the code for our chart after it has been removed from myChart const.
let config = {
    type: 'bar',
    data: {
        labels: `${allProducts.names}`,
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            },
            {
                label: '# of Views',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(153, 102, 255, 1)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1
            }],
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    }
}
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, config);
// listen to section for image click
imageContainer.addEventListener('click', handleImageClick);//this is the callback function entered as an argument to be called later.
showResults.addEventListener('click', handleResults);
