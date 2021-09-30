// query selectors for inputs
var timeOfDay = document.querySelector('.time-of-day');
var calorieCount = document.querySelector('#output');
var dishType = document.querySelector('.meal-type');
// query selector for recipe container
const img = document.querySelectorAll(".recipeImg");
const recipeLabel = document.querySelectorAll(".recipeText");
const card = document.querySelectorAll("#card")
const apiUrl = "https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=011d75e3&app_key=a72bc3edeb9e8c56d05a5b3951a5a64f";

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

let hitsNum = randomInt(0,19)

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            console.log(data.hits)
            for (var i = 0; i < 4; i++) {
                let hitsNum = randomInt(0,20);
                console.log(hitsNum)
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

// John's go at the dropdown menu
$('#checkboxlist').hover(function () {

   var is_open =
   $(this).hasClass("open");
   if(is_open) {
       $(this).removeClass("open");
   } 
   else {
       $(this).addClass("open");
   }
  
    });
// expanded check capability
$(document).on('click','li',function(){
        $(this).find('input[type="checkbox"]').prop('checked',true);
       });



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

$("#cookbook-submit").on("click", function(event) {
    event.preventDefault();
    var searchTerm = $("#cookbook-search").val().trim();
    var apiUrl = `http://openlibrary.org/search.json?q=${searchTerm}+cookbook`

    fetch(apiUrl)
    .then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                if($("#cookbooks p")) {
                    $("#cookbooks p").each(function() {
                        this.remove();
                    })
                }
                for(var i = 0; i < 3; i++) {
                    var bookTitle = data.docs[i].title;
                    var isbn = data.docs[i].isbn[0];
                    console.log(bookTitle);
                    var bookSuggestEl = $("<a></a>").text(bookTitle);
                    bookSuggestEl.attr("href", "http://openlibrary.org/isbn/" + isbn);
                    $("#cookbooks").append(bookSuggestEl);
                    $("#cookbooks").append($("<br />"));
                }
            });
        }
        else {
            console.log("fetch failed");
        }
    })
    .catch(function(error) {
        console.log("Could not connect to Open Library.");
    })
});
