'use strict';

//global variable
var allPictures = [];
// var pic1 = [];
// var pic2 = [];
// var pic3 = [];

//link JS to html
var img1 = document.getElementById('img1');
var img2 = document.getElementById('img2');
var img3 = document.getElementById('img3');
var sectionEl = document.getElementById('clickerBox');
var resultList = document.getElementById('voteResult');

function Pictures(url, name) {
    this.name = name;
    this.url = url;
    this.numberOfClicks = 0;
    allPictures.push(this);
}


// displayed pic index numbers 
var picIndex0 = 0;
var picIndex1 = 0;
var picIndex2 = 0;

function newPics() {
    var cantBeThis = [picIndex0, picIndex1, picIndex2];
    do {
        picIndex0 = Math.floor(Math.random() * allPictures.length);
    } while (cantBeThis.includes(picIndex0))
    cantBeThis.push(picIndex0);

    do {
        picIndex1 = Math.floor(Math.random() * allPictures.length);
    } while (cantBeThis.includes(picIndex1))
    cantBeThis.push(picIndex1)

    do {
        picIndex2 = Math.floor(Math.random() * allPictures.length);
    } while (cantBeThis.includes(picIndex2))
    cantBeThis.push(picIndex2)
}

function render(){
for(var i in allPictures){
    var newLi = document.createElement('li');
    newLi.textContent = numberOfClicks + "votes for the" + allPictures[i].name;
    resultList.appendChild(newLi);
    }   
}

function totalClicks (){
if(numberOfClicks===25){
    render();
}
}

//Event Listener
sectionEl.addEventListener(click, sectionCallBack);
function sectionCallBack(event){
    totalClicks();

if(event.target.id){
    totalClicks++;
    allPictures[event.target.id].clicked++;

    newPics();
    {els{

    }}
}
}

new Picture("img/bag.jpg", "bag");
new Picture("img/banana.jpg", "banana");
new Picture("img/bathroom.jpg", "bathroom");
new Picture("img/boots.jpg", "boots");
new Picture("img/breakfast.jpg", "breakfast");
new Picture("img/bubblegum.jpg", "bubblegum");
new Picture("img/chair.jpg", "chair");
new Picture("img/cthulhu.jpg", "cthulhu");
new Picture("img/dog-duck.jpg", "bag");
new Picture("img/dragon.jpg", "dragon");
new Picture("img/pen.jpg", "pen");
new Picture("img/pet-sweep.jpg", "pet-sweep");
new Picture("img/scissors.jpg", "scissors");
new Picture("img/sweep.png", "sweep");
new Picture("img/shark.jpg", "shark");
new Picture("img/tauntaun.jpg", "tauntaun");
new Picture("img/unicorn.jpg", "unicorn");
new Picture("img/usb.gif", "usb");
new Picture("img/water-can.jpg", "water-can");
new Picture("img/wine-glass.jpg", "wine-glass");
