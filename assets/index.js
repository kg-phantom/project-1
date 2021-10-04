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
            for (var i = 0; i < 6; i++) {
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



const modalElements = $('#preferences-overlay, #preferences');

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
    var apiUrl = `https://openlibrary.org/search.json?q=${searchTerm}+cookbook`

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
                if($(".no-results")) {
                    $(".no-results").remove();
                }
                if(data.numFound != 0) {
                    for(var i = 0; i < 5; i++) {
                        if(data.docs[i]) {
                            var bookNum = randomInt(0, (data.docs.length - 1));
                            var bookTitle = data.docs[bookNum].title;
                            var bookSuggestEl = $("<a></a>").text(bookTitle);
                            if(data.docs[bookNum].isbn) {
                                var isbn = data.docs[bookNum].isbn[0];
                                bookSuggestEl.attr("href", "https://openlibrary.org/isbn/" + isbn);
                            }
                            else if(data.docs[bookNum].oclc) {
                                var oclc = data.docs[bookNum].oclc[0];
                                bookSuggestEl.attr("href", "https://openlibrary.org/oclc/" + oclc);
                            }
                            else {
                                var lccn = data.docs[bookNum].lccn[0];
                                bookSuggestEl.attr("href", "https://openlibrary.org/lccn/" + lccn);
                            }
                            bookSuggestEl.attr("target", "_blank");
                            $("#cookbooks").append(bookSuggestEl);
                            $("#cookbooks").append($("<br />"));
                        }  
                    }
                }
                else {
                    var noResultsEl = $("<p></p>").text("There are no cookbooks for \"" + searchTerm + "\".");
                    noResultsEl.addClass("no-results");
                    $("#cookbooks").append(noResultsEl);
                }
            });
        }
        else {
            var cookbookModal = $("#cookbook-overlay, #cookbook-modal");
            cookbookModal.addClass("active");
            $(".close-modal").on("click", function() {
                cookbookModal.removeClass("active");
            })
            $("#ok-btn").on("click", function() {
                cookbookModal.removeClass("active");
            });
        }
    })
    .catch(function(error) {
        var cookbookModal = $("#cookbook-overlay, #cookbook-modal");
        cookbookModal.addClass("active");
        $(".close-modal").on("click", function() {
            cookbookModal.removeClass("active");
        })
        $("#ok-btn").on("click", function() {
            cookbookModal.removeClass("active");
        })
    })
});
