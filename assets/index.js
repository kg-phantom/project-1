// query selectors for inputs
var timeOfDay = document.querySelector('.time-of-day');
var calorieCount = document.querySelector('#output');
var dishType = document.querySelector('.meal-type');
// query selector for recipe container
const img = document.querySelectorAll(".recipeImg");
const recipeLabel = document.querySelectorAll(".recipeText");
const card = document.querySelectorAll("#card")
const apiUrl = "https://api.edamam.com/api/recipes/v2?type=public&q=lunch&app_id=011d75e3&app_key=a72bc3edeb9e8c56d05a5b3951a5a64f";

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

let hitsNum = randomInt(0,20)

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            console.log(data.hits)
            for (var i = 0; i < 4; i++) {
                let hitsNum = randomInt(0,20);
                img[i].src = data.hits[hitsNum].recipe.image;
                recipeLabel[i].innerHTML = data.hits[hitsNum].recipe.label;
                console.log(data.hits[hitsNum].recipe.shareAs);
                console.log(card)
                card[i].onclick = function () {
                    location.href = data.hits[hitsNum].recipe.shareAs;
                }
                console.log(data.hits[hitsNum].recipe.label);
                randomInt(0,20);
            }
        }
    };
    xhttp.open("GET", apiUrl, true);
    xhttp.send();
}

loadDoc();


const modalElements = $('.modal-overlay, .modal');

$('.settings').click(function() {
    modalElements.addClass('active');
})

$('.close-modal').click(function() {
    modalElements.removeClass('active');
})

var slider = document.getElementById("myRange");
var output = document.getElementById("output");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}
