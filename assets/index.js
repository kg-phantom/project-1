// query selectors for inputs
// var timeOfDay = document.querySelector('');
// var calorieCount = document.querySelector('');
// var dishType = document.querySelector('');
// query selector for recipe container
var recipeDivEl = document.querySelector('recipe-display');
// misc variables
var recipeDisplayEl = document.querySelector('.recipe-display');
var recipeIdCounter = 0;



// get user input and fetch recipes

// gather user input parameters

// Create variables to hold user input parameters

// Send parameters to fetch() function to get a list of recipe datapoints
var recipeFetch = function() {
    var apiUrl = "https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=011d75e3&app_key=a72bc3edeb9e8c56d05a5b3951a5a64f";
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        var selectionArray = [0, 1, 2, 3, 4];
        for(var i = 0; i < selectionArray.length; i++)
        // assign variable to the elements returned from the api call
        var recipeName = data['hits'][selectionArray[i]]['recipe']['label'];
        var recipeImg = data['hits'][selectionArray[i]]['recipe']['image'];
        // not sure what other data we want to display for the recipes, but it will be stored as variables here

        // package data returned as an array
        var recipeDataObj = {
            name: recipeName,
            image: recipeImg
        }
        // send recipe data to function to create recipe display
        generateRecipes(recipeDataObj);
    });
};
var generateRecipes = function(recipeDataObj) {
     // generate elements for each recipe
     var recipeContainerEl = document.createElement('div');
     recipeContainerEl.className = "";
     // create id as a custom attribute
     recipeContainerEl.setAttribute('data-recipe-id', recipeIdCounter);
     recipeContainerEl.style.background = recipeDataObj.image;
     // create title
     var titleEl = document.createElement('h2');
     titleEl.textContent = recipeDataObj.name;
     titleEl.className = "";
     recipeContainerEl.appendChild(titleEl);
     
     recipeDisplayEl.appendChild(recipeContainerEl);

     // increment recipeIdCounter by one for next recipe
     recipeIdCounter++;
};


// filter results based off of intolerances/diet checkboxes

// display dropdown menu of nutritional info when a recipe is clicked
// var dropDown = function(event) {
//     event.preventDefault();

// recipeDivEl.addEventListener('click', dropDown);

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
                if($("#cookbooks a")) {
                    $("#cookbooks a").each(function() {
                        this.remove();
                    })
                    $("#cookbooks br").each(function() {
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