'use strict';

//global variable
var allPictures = [];
var totalClicks = 0;
var previousDisplays = [];
var picNames = [];
var clicksPerPix = [];

//link JS to html
var img1 = document.createElement('img');
var img2 = document.createElement('img');
var img3 = document.createElement('img');
var sectionEl = document.getElementById('clickerBox');
var resultList = document.getElementById('voteResult');
// var resultTitle = document.getElementsByTagName('h1');

function Pictures(url, name) {
    this.name = name;
    this.url = url;
    this.numberOfClicks = 0;
    this.timesDisplayed = 0;
    allPictures.push(this);
    picNames.push(this.name);
}

new Pictures("./img/bag.jpg", "bag");
new Pictures("./img/banana.jpg", "banana");
new Pictures("./img/bathroom.jpg", "bathroom");
new Pictures("./img/boots.jpg", "boots");
new Pictures("./img/breakfast.jpg", "breakfast");
new Pictures("./img/bubblegum.jpg", "bubblegum");
new Pictures("./img/chair.jpg", "chair");
new Pictures("./img/cthulhu.jpg", "cthulhu");
new Pictures("./img/dog-duck.jpg", "bag");
new Pictures("./img/dragon.jpg", "dragon");
new Pictures("./img/pen.jpg", "pen");
new Pictures("./img/pet-sweep.jpg", "pet-sweep");
new Pictures("./img/scissors.jpg", "scissors");
new Pictures("./img/sweep.png", "sweep");
new Pictures("./img/shark.jpg", "shark");
new Pictures("./img/tauntaun.jpg", "tauntaun");
new Pictures("./img/unicorn.jpg", "unicorn");
new Pictures("./img/usb.gif", "usb");
new Pictures("./img/water-can.jpg", "water-can");
new Pictures("./img/wine-glass.jpg", "wine-glass");

function hideH1 (){
    var resultTitle = document.getElementById('result-title');
    resultTitle.style.display = "none";
    if(totalClicks === 6){
        resultTitle.style.display = "block";
    }
}
hideH1();

function getRandomPic() {
    return Math.floor(Math.random() * allPictures.length);
}

function newPics() {
    // displayed pic index numbers 
    var picIndex0 = getRandomPic();
    var picIndex1 = getRandomPic();
    var picIndex2 = getRandomPic();

    while (picIndex0 === picIndex1 || picIndex0 === picIndex2 || picIndex1 === picIndex2 || previousDisplays.includes(picIndex0) || previousDisplays.includes(picIndex1) || previousDisplays.includes(picIndex2)) {
        var picIndex0 = getRandomPic();
        var picIndex1 = getRandomPic();
        var picIndex2 = getRandomPic();
    }
    img1.src = allPictures[picIndex0].url;
    img1.alt = allPictures[picIndex0].name;
    allPictures[picIndex0].timesDisplayed++;
    
    img2.src = allPictures[picIndex1].url;
    img2.alt = allPictures[picIndex1].name;
    allPictures[picIndex1].timesDisplayed++;
    
    img3.src = allPictures[picIndex2].url;
    img3.alt = allPictures[picIndex2].name;
    allPictures[picIndex2].timesDisplayed++;

    sectionEl.appendChild(img1);
    sectionEl.appendChild(img2);
    sectionEl.appendChild(img3);

    previousDisplays = [];
    previousDisplays.push(picIndex0);
    previousDisplays.push(picIndex1);
    previousDisplays.push(picIndex2);
}

//Event Listener
function onClick(event) {
    console.log('here');
    console.log(event);
    totalClicks++;

    for (var i in allPictures) {
        if (event.target.alt === allPictures[i].name) {
            allPictures[i].numberOfClicks++;
        }
    }

    if (totalClicks === 6) {
        // return resultList;
        console.log('maxVotes');
        sectionEl.removeEventListener('click', onClick);
        hideH1();
        render();
        voteTracker();
        localStorageData();
        renderChartJs();
    }

    newPics();
}


function voteTracker (){
    for(var i in allPictures){
        clicksPerPix.push(allPictures[i].numberOfClicks)
    }
}

//rendering results
function render() {
    for (var i in allPictures) {
        var newLi = document.createElement('li');
        newLi.textContent = allPictures[i].numberOfClicks + " votes for the " + allPictures[i].name;
        resultList.appendChild(newLi);
    }
}


//Local Storage - better to locate this at the bottom - local storage is the first step for data persistence 
//When you send info to local storage you stringfy and hen you want to access it you parse it 
function localStorageData (){
    var collectedVotes = [];
console.log(localStorage.storageContent);
    if (localStorage.storageContent) {
        console.log("localStorage exists");
        for (var i in clicksPerPix){
            collectedVotes[i] = clicksPerPix[i] + JSON.parse(localStorage.storageContent)[i];
        }
    }
    else {
        console.log("No localStorage");
        collectedVotes = clicksPerPix;
    }

    localStorage.storageContent = JSON.stringify(collectedVotes);
}

//link JS to HTML to display/ render the voteChart and ctx or context is conventional name for chart functions  
function renderChartJs (){
    var ctx = document. getElementById('voteChart').getContext('2d');

    var chartColors = ['#614126', '#907A67', '#614126', '#907A67', '#614126', '#907A67', '#614126', '#907A67', '#614126', '#907A67', '#614126', '#907A67', '#614126', '#907A67', '#614126', '#907A67', '#614126', '#907A67', '#614126', '#907A67'];

  var busmallChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: picNames,
      datasets: [{
        label: 'Vote Result',
        data: JSON.parse(localStorage.storageContent),
        backgroundColor: chartColors,
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }],
        xAxes: [{
          ticks: {
            autoSkip: false
          }
        }]
      }
    }
  });
}

sectionEl.addEventListener('click', onClick);
newPics();
