// query selectors for inputs
var timeOfDay = document.querySelector('');
var calorieCount = document.querySelector('');
var dishType = document.querySelector('');
// query selectors for recipe datapoints

// misc variables
var recipeDisplayEl = document.querySelector('.recipe-display');
var recipeIdCounter = 0;


// get user input and fetch recipes

// get elements with the user input values

// Create variables to hold user input parameters.

// Send parameters to fetch() function to get a list of recipes.
var recipeFetch = function() {
    var apiUrl = "https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=011d75e3&app_key=a72bc3edeb9e8c56d05a5b3951a5a64f";
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // assign variable to the elements returned from the api call
        var recipeName = data['hits']['index numb for array']['label'];
        var recipeImg = data['hits']['index number from array']['image'];
        
    });
};

// generate elements for each recipe
var createRecipes = function("data from fetch") {
    var recipeContainerEl = document.createElement('div');
    recipeContainerEl.className = "";
    // create id as a custom attribute
    recipeContainerEl.setAttribute('data-recipe-id', recipeIdCounter);
    recipeContainerEl.style.background = "reference to 'image' element from api return";
    // create title
    var titleH2 = document.createElement('h2');
    titleH2.textContent = "example title";
    titleH2.className = "";
    recipeContainerEl.appendChild(titleH2);
    
    recipeDisplayEl.appendChild(recipeContainerEl);

};


// filter results based off of intolerances/diet checkboxes

// display dropdown menu of nutritional info when a recipe is clicked