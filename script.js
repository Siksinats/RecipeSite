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
    var mealInp = document.querySelector('#description-input')
    mealInp = mealInp.values
    mealInp = addEventListener("keydown", getMeal)
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
            let mealInput = document.querySelector("input").value;
            let ingredientsHTML = '<ul class="ingredients">';
            let mealList = '<ul class="meals">';

            /* Search for meal by name */
                for(let i=0; i<mealInfo.length; i++) {

                    if(mealInfo[i].name === mealInput.toLowerCase()) {
                        let desiredMealIngredients = mealInfo[i].ingredients;

                        for(let i=0; i<desiredMealIngredients.length; i++) {
                            ingredientsHTML += `<li>${desiredMealIngredients[i]}</li>`;
                        }
                    document.querySelector('.full-list').style.display = 'none';
                    }
                }
                document.querySelector('.ingredient_list').innerHTML = ingredientsHTML;

                /* Search for meal by type */
                for(let i=0; i<mealInfo.length; i++) {

                    if(mealInfo[i].type === mealInput.toLocaleLowerCase()) {
                        mealList += `<li class="meal-name">${mealInfo[i].name}</li>`;
                        document.querySelector('.full-list').style.display = 'none';
                        
                    } 
                }

                /*--Write HTML and close <ul>--*/
                document.querySelector('.meal_list').innerHTML = mealList + '</ul>';
                document.querySelector('.ingredient_list').innerHTML = ingredientsHTML + '</ul>';

                /*--Reset fullList display if no changes were made--*/
                if(document.querySelector('.meal_list').innerHTML === '<ul class="meals"></ul>' &&
                document.querySelector('.ingredient_list').innerHTML === '<ul class="ingredients"></ul>') {
                        
                    document.querySelector('.full-list').style.display = 'initial';
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
                listDisplay += `<h3>${listInfo[i].name}</h3> `
            }
            document.querySelector('.full-list').innerHTML = listDisplay
        }
    };
}



  