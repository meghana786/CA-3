function fetchRandomMeal(){
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(data =>{
        const meal=data.meals[0];
        const mealContent=document.getElementById('mealContent');
        mealContent.innerHTML=`<img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p>${meal.strMeal}</p>
        `;
        mealContent.addEventListener('click',()=>{
            displayIngredients(meal);
        });

    })
    .catch(error=>{
        console.error('Error in fetching the data',error);

    });
}
function displayIngredients(meal){
    const ingredients=`
    <div class="modal">
    <div class="modal-content">
    <span class="close">&times;</span>
    <h3>${meal.strMeal}</h3>
    <ul>
    ${getIngredientList(meal)}
    </ul>
    </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend',ingredients);
    const modal=document.querySelector('.modal');
    window.addEventListener('click',event =>{
        if(event.target === modal){
            modal.remove();
        }
    });
    const closeButton=document.querySelector('.close');
    closeButton.addEventListener('click',() =>{
        modal.remove();
    });
}
function getIngredientList(meal){
    let ingredientList='';
    for(let i=1;i<=20;i++){
        const ingredient=meal[`strIngredient${i}`];
        const measure=meal[`strMeasure${i}`];
        if(ingredient && ingredient.trim() !==''){
            ingredientList += `<li>${ingredient} - ${measure}</li>`;
        }
    }
    return ingredientList;
}
document.addEventListener('DOMContentLoaded',fetchRandomMeal)
function fetchSearchedCategory(category){
    const apiurl=`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    fetch(apiurl)
    .then(response => response.json())
    .then(data =>{
        const searchedCategoryContent=document.getElementById('searchedCategoryContent');
        searchedCategoryContent.innerHTML='';
        if(data.meals){
            data.meals.forEach(meal =>{
                searchedCategoryContent.innerHTML+=`
                <div class="meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <p>${meal.strMeal}</p>
                </div>
                `;
            });

        }
        else{
            searchedCategoryContent.innerHTML='<p>No meals found for this category.</p>';
        }
        document.getElementById('searchedCategories').classList.remove('hidden');
    })
    .catch(error =>{
        console.error('Error in fetching searched category:',error);
    });
}
document.addEventListener('DOMContentLoaded',function(){
document.getElementById('searchBtn').addEventListener('click',function(){
    const searchInputValue=document.getElementById('search').value.trim();
    if(searchInputValue !== ''){
        fetchSearchedCategory(searchInputValue);
    }
    else{
        console.log('Please enter the meal to search!!');
    }
});
});
