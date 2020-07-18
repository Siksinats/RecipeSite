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
            let ingredientsHTML = '<div class="ingredients">';
            let mealList = '';

            /* Search for meal by name */
                sort(mealInfo, mealInput, 'name')
               

                /* Search for meal by type */
                for(let i=0; i<mealInfo.length; i++) {

                    if(mealInfo[i].type.toLocaleLowerCase() === mealInput.toLocaleLowerCase()) {
                        mealList += `<div class="grow fade-in shadow card m-2 mb-3" style="width: 18rem;">
                        <img src="${listInfo[i].picture}" class="card-img-top card-img-height img-thumbnail " alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${listInfo[i].name}</h5>
                          <p class="card-text">${listInfo[i].description}</p>
                        </div>
                      </div>`;
                        document.querySelector('.full-list').style.display = 'none';
                        
                    } 
                }

                /*--Write HTML and close <div>--*/
                document.querySelector('.meal_list').innerHTML = mealList;
                
                console.log(document.querySelector('.ingredient_list').innerHTML)

                /*--Reset fullList display if no changes were made--*/
                if(document.querySelector('.meal_list').innerHTML === '' &&
                document.querySelector('.ingredient_list').innerHTML === '') {
                        
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
                listDisplay += `<div class="grow fade-in shadow card m-2 mb-3" style="width: 18rem;">
                <img src="${listInfo[i].picture}" class="card-img-top card-img-height img-thumbnail " alt="...">
                <div class="card-body">
                  <h5 class="card-title">${listInfo[i].name}</h5>
                  <p class="card-text">${listInfo[i].description}</p>
                </div>
              </div>
              `
            }
            document.querySelector('.full-list').innerHTML = listDisplay
        }
    };
}

function sort(list, input, filter) {
    let mealList = ''
    for(let i=0; i<list.length; i++) {

        if(list[i][filter].toLowerCase() === input.toLowerCase()) {
            mealList += `<div class="grow fade-in shadow card m-2 mb-3" style="width: 18rem;">
            <img src="${listInfo[i].picture}" class="card-img-top card-img-height img-thumbnail " alt="...">
            <div class="card-body">
              <h5 class="card-title">${listInfo[i].name}</h5>
              <p class="card-text">${listInfo[i].description}</p>
            </div>
          </div>`;
            document.querySelector('.full-list').style.display = 'none';
            console.log(mealList)
        }
        console.log(i)
        if(i+1 == list.length) {
            console.log(mealList)
            document.querySelector('.ingredient_list').innerHTML = mealList; 
            console.log(document.querySelector('.ingredient_list').innerHTML)
        }
    }   
 
}



  