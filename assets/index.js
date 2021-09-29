// query selectors for inputs
var timeOfDay = document.querySelector('');
var calorieCount = document.querySelector('');
var dishType = document.querySelector('');
// query selector for recipe container
const recipeDivEl = document.querySelector('');
const apiUrl = "https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=011d75e3&app_key=a72bc3edeb9e8c56d05a5b3951a5a64f";

function append(parent, el) {
    return parent.appendChild(el);
}

fetch(apiUrl)
.then((resp) => resp.json())
.then(function(data) {
    let authors = data.hits
    
})
.catch(function(error) {
    console.log(error);
})


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
