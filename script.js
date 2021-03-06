if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    /*--Display the entire recipe list at start--*/
    fullDisplay();

    /*--Test the value of the box by btn--*/
    // var mealBtn = document.querySelector("#getMealBtn")
    //mealBtn.addEventListener("click", getMeal) 
    
    /*--Test the value of the box by typing--*/
    var mealInp = document.querySelector('#description-input');
    mealInp.addEventListener("keydown", getMeal)
}

function getMeal() { 

    /*--Request info from data.json--*/
    var meals = new XMLHttpRequest();
    meals.open("GET", "data.json", true);
    meals.send();
    meals.onreadystatechange = function() {
   
        /*--Check readyState and init variables--*/
        if (meals.readyState === 4 && meals.status == 200) {
            let mealInfo = JSON.parse(meals.responseText);
            let mealInput = document.querySelector("#description-input").value;

            /* Search for meal by name */
                sort(mealInfo, mealInput, 'name', '.name-list')
            
            /* Search for meal by type */
                sort(mealInfo, mealInput, 'type', '.type-list')

            /* Search for meal by ingredient */
                sort(mealInfo, mealInput, 'ingredients', '.ingredient-list')

            /*--Reset fullList display if no changes were made--*/
                if(document.querySelector('.type-list').innerHTML === '' &&
                document.querySelector('.name-list').innerHTML === '' &&
                document.querySelector('.ingredient-list').innerHTML === '') {
                        
                    document.querySelector('.full-list').style.display = 'flex';
                    
                }    
        }     
    };
}

function fullDisplay() {
    var fullList = new XMLHttpRequest();
    fullList.open("GET", "data.json", true);
    fullList.send();
    let listDisplay = '';
    fullList.onreadystatechange = function() {
        if (fullList.readyState === 4 && fullList.status == 200) {
            listInfo = JSON.parse(fullList.responseText);
            
            for(let i=0; i<listInfo.length; i++) {
                listDisplay += `<a class="" href="" data-toggle="modal" data-target="#recipeModal">
                <div class="mealCard grow shadow card m-2 mb-3" style="width: 18rem;">
                    <img src="${listInfo[i].picture}" class="card-img-top card-img-height" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${listInfo[i].name}</h5>
                    <p class="card-text">${listInfo[i].description}</p>
                    </div>
                </div>
              </a> `


            }
            document.querySelector('.full-list').innerHTML = listDisplay

            for(let i=0; i<listInfo.length; i++) {
                let recipeBtn = document.getElementsByClassName('mealCard');
                recipeBtn[i].addEventListener('click', function() {
                    recipeModal(listInfo[i].name, listInfo[i].ingredients);
                })
            }
            

            
            
        }
    };
}

function sort(list, input, filter, listType) {
    let mealListHTML = [];
    let breakStatus = false;
    let updatedMealList= [];

    
    

    for(let i=0; i<list.length; i++) {
        for(let j=0; j<list[i][filter].length; j++) {
            let currentItem = list[i][filter][j].toLowerCase()
            let currentItemSplit = list[i][filter][j].toLowerCase().split(" ")
            for(let x=0; x<currentItemSplit.length; x++){
            if(input.match(currentItemSplit[x]) !== null && document.querySelector(listType).children !== list[i].name)  {
                
                updatedMealList.push(list[i])
                
                mealListHTML.push(`<a class="" href="" data-toggle="modal" data-target="#recipeModal">
                    <div class="mealCard fade-in grow shadow card m-2 mb-3" style="width: 18rem;">
                    <img src="${listInfo[i].picture}" class="card-img-top card-img-height img-thumbnail " alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${listInfo[i].name}</h5>
                        <p class="card-text">${listInfo[i].description}</p>
                        </div>
                    </div>
                    </a>`);
                    
                document.querySelector('.full-list').style.display = 'none';                
            

                if(input.length > list[i][filter][j].length) {
                    breakStatus = true;
                    break;
                }
            }
        }
        
            
        }
        if(breakStatus == true) {
            break;
        }
        
        
        if(i+1 == list.length) {

            updatedMealListHTML = [...new Set(mealListHTML)]
            console.log(updatedMealListHTML)
            for(let i=0; i<document.querySelector(listType).querySelectorAll('.card-title').length; i++) {
                console.log(document.querySelector(listType).querySelectorAll('.card-title')[i])
                console.log(updatedMealList)
                if(document.querySelector(listType).querySelectorAll('.card-title')[i] == updatedMealList[i].name) {
                    document.querySelector(listType).querySelectorAll('.card-title')[i]
                }
            }
            for(let i=0; i<updatedMealListHTML.length; i++) {
                
                document.querySelector(listType).innerHTML += mealListHTML[i]; 
            }
        
            for(let i=0; i<updatedMealListHTML.length; i++) {
                
                let recipeBtn = document.querySelector(listType)
                recipeBtn = recipeBtn.children
                recipeBtn[i].addEventListener('click', function() {
                    recipeModal(updatedMealList[i].name, updatedMealList[i].ingredients);
                })
            }
            
        } 
    }   
 
}

function recipeModal(name, ingredients) {
    console.log(ingredients)
    let ingredientList = '';
    for(let i=0; i<ingredients.length; i++) {
        ingredientList += `<li>${ingredients[i]}</li>`
    }

    let modalHTML = `
    <div class="modal fade" id="recipeModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="loginModalLabel">${name}</h5>
          <ul>
            ${ingredientList}
          </ul>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    </div>
  </div>`

  document.querySelector('.recipeModal').innerHTML = modalHTML
}






  