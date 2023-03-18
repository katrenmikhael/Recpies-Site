////////////// variables //////////////
let open = false;
let navItemsWidth = $(".nav-items").width();
let navLinks = document.querySelector(".nav-items li");
let nameMealInput = document.getElementById("searchName");
let letterMealInput = document.getElementById("searchLetter");
let allCategory = [];
let allArea = [];
let itemShowed = [];
let allIngredients = [];
let formData = document.querySelector("form");
let inputs = document.querySelectorAll("form input");
///////////fire when start///////////////
closeNav();
getMealAll(" ");
/////////////events/////////////////////
$(".search").click(() => {
  $(".search-sec").show(100);
  $(".category-sec").hide(100);
  $(".filterCategory-sec").hide(100);
  $(".filterIngredients-sec").hide(100);
  $(".area-sec").hide(100);
  $(".filterArea-sec").hide(100);
  $(".details-sec").hide(100);
  $(".Ingredients-sec").hide(100);

  $(".contactUs-sec").removeClass("d-flex");

  $("body").addClass("overflow-hidden");
  closeNav();
});

$(".category").click(() => {
  $(".loader").show();
  $(".search-sec").hide(100);
  $(".category-sec").show(100);
  $(".filterCategory-sec").hide(100);
  $(".filterIngredients-sec").hide(100);
  $(".filterArea-sec").hide(100);
  $(".area-sec").hide(100);
  $(".details-sec").hide(100);
  $(".Ingredients-sec").hide(100);
  $(".contactUs-sec").removeClass("d-flex");

  $("body").addClass("overflow-hidden");
  closeNav();
  getCategory();
});

$(".Ingredients").click(() => {
  $(".loader").show();
  $(".search-sec").hide(100);
  $(".category-sec").hide(100);
  $(".filterCategory-sec").hide(100);
  $(".filterIngredients-sec").hide(100);
  $(".contactUs-sec").remove("d-flex");

  $(".filterArea-sec").hide(100);
  $(".area-sec").hide(100);
  $(".details-sec").hide(100);
  $(".Ingredients-sec").show(100);
  $("body").addClass("overflow-hidden");
  closeNav();
  getIngredients();
});

$(".contact").click(() => {
  $(".search-sec").hide(100);
  $(".category-sec").hide(100);
  $(".filterCategory-sec").hide(100);
  $(".filterIngredients-sec").hide(100);
  $(".contactUs-sec").addClass("d-flex");
  $(".filterArea-sec").hide(100);
  $(".area-sec").hide(100);
  $(".details-sec").hide(100);
  $(".Ingredients-sec").hide(100);
  $("body").addClass("overflow-hidden");
  closeNav();
});

$(".close-open-icon").click(function () {
  if (open) {
    closeNav();
  } else {
    openNav();
  }
});
$("#searchName").keyup(() => {
  $(".loader").show();
  getMealByName(nameMealInput.value);
});
$("#searchLetter").keyup(() => {
  $(".loader").show();
  if (letterMealInput.value == "" || letterMealInput.value == null) {
    getMealByLetter();
  } else {
    getMealByLetter(letterMealInput.value);
  }
});
$(".area").click(() => {
  $(".loader").show();
  $(".search-sec").hide(100);
  $(".category-sec").hide(100);
  $(".filterCategory-sec").hide(100);
  $(".filterArea-sec").hide(100);
  $(".area-sec").show(100);
  $(".details-sec").hide(100);
  $(".Ingredients-sec").hide(100);
  $(".contactUs-sec").removeClass("d-flex");

  $("body").addClass("overflow-hidden");
  closeNav();
  getArea();
});
formData.addEventListener("input", function () {
  if (
    validateName(inputs[0]) &&
    validateEmail(inputs[1]) &&
    validateNumber(inputs[2]) &&
    validateAge(inputs[3]) &&
    validatePassword(inputs[4]) &&
    validateRepassword(inputs[5], inputs[4])
  ) {
    document.getElementById("btnSubmit").disabled = false;
    // console.log("kkkk");
  } else {
    document.getElementById("btnSubmit").disabled = true;
  }
});

$(formData).submit(function (e) {
  e.preventDefault();
});
/////////////functions//////////////////////////

async function getMealAll(mealId = "A") {
  mealsContainer = ``;
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealId}`
  );

  let response = await api.json();
  itemShowed = response;
  console.log(response.meals[0]);
  for (let i = 0; i < response.meals.length; i++) {
    mealsContainer += `<div class="meal col-md-3  my-2 " onclick="getDetails(${i})">
      <div class="mealContainer w-100 position-relative overflow-hidden">
          <div class="image w-100">
            <img src="${response.meals[i].strMealThumb}" class="w-100 h-100 m-0 p-0" alt="meal-img">
          </div>
          <div class="text-layer position-absolute w-100 h-100 bg-light bg-opacity-50 text-dark d-flex align-items-center top-100">
            <h3>${response.meals[i].strMeal}</h3>
          </div>
      </div>
    </div>`;
  }
  $(".loader").hide(1000);
  document.getElementById("meals-cols").innerHTML = mealsContainer;
}

function closeNav() {
  $(".fa-indent").removeClass("d-none");
  $(".fa-xmark").addClass("d-none");
  for (let i = 0; i < 5; i++) {
    console.log(i);
    $(".nav-items li")
      .eq(i)
      .animate(
        {
          top: "200%",
        },
        (i + 5) * 100
      );
  }
  $(".home").animate({ left: `-${navItemsWidth}` }, 500);

  open = false;
}
function openNav() {
  $(".fa-indent").addClass("d-none");
  $(".fa-xmark").removeClass("d-none");
  for (let i = 0; i < 5; i++) {
    $(".nav-items li")
      .eq(i)
      .animate(
        {
          top: "0",
        },
        (i + 5) * 100
      );
  }
  $(".home").animate({ left: `0` }, 500);
  open = true;
}
async function getMealByName(mealName) {
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
  );
  const response = await api.json();
  itemShowed = response;
  displayMeals(response, "searchResult");
  $(".loader").hide(1000);
}

function displayMeals(result, idSection) {
  resultContainer = ``;
  if (result.meals) {
    for (let i = 0; i < result.meals.length; i++) {
      resultContainer += `
    <div class="meal col-md-3  my-2 " onclick="getDetails(${i})">
      <div class="mealContainer w-100 position-relative overflow-hidden">
          <div class="image w-100">
            <img src="${result.meals[i].strMealThumb}" class="w-100 h-100 m-0 p-0" alt="meal-img">
          </div>
          <div class="text-layer position-absolute w-100 h-100 bg-light bg-opacity-50 text-dark d-flex align-items-center top-100">
            <h3>${result.meals[i].strMeal}</h3>
          </div>
      </div>
    </div>
    `;
    }
  }

  document.getElementById(idSection).innerHTML = resultContainer;
}

async function getMealByLetter(MealLetter = "a") {
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${MealLetter}`
  );
  let response = await api.json();

  itemShowed = response;
  displayMeals(response, "searchResult");
  $(".loader").hide(1000);
}

async function getCategory() {
  const api = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const response = await api.json();
  allCategory = response;
  displayCategory(response);
  $(".loader").hide(1000);
}

function displayCategory(result) {
  categoryContainer = ``;

  for (let i = 0; i < result.categories.length; i++) {
    categoryContainer += `
    
                <div class="meal col-md-3  my-2 text-center " onclick="getCategoryItems(${i})">
                  <div class="mealContainer w-100 position-relative overflow-hidden">
                    <img src="${result.categories[i].strCategoryThumb}" class="w-100" alt="meal-img">
                    <div class="text-layer position-absolute w-100 h-100 bg-light bg-opacity-50 text-dark top-100">
                        <h3>${result.categories[i].strCategory}</h3>
                        <p>${result.categories[i].strCategoryDescription}</p>
                    </div>
                  </div>  
                </div> 
          
    `;
  }
  document.getElementById("categoryResult").innerHTML = categoryContainer;
}

async function getCategoryItems(index) {
  $(".loader").show();
  $(".search-sec").hide(100);
  $(".category-sec").hide(100);
  $(".area-sec").hide(100);
  $(".Ingredients-sec").hide(100);
  $(".filterCategory-sec").show(100);
  $("body").addClass("overflow-hidden");
  closeNav();
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${allCategory.categories[index].strCategory}`
  );
  const response = await api.json();
  console.log(response);
  itemShowed = response;
  showCategoryItems(response);
  $(".loader").hide(1000);
}

function showCategoryItems(result) {
  itemsContainer = ``;
  for (let i = 0; i < result.meals.length; i++) {
    itemsContainer += `
    <div class="meal col-md-3  my-2 " onclick="getDetails(${i})">
      <div class="mealContainer w-100 position-relative overflow-hidden">
          <div class="image w-100">
            <img src="${result.meals[i].strMealThumb}" class="w-100 h-100 m-0 p-0" alt="meal-img">
          </div>
          <div class="text-layer position-absolute w-100 h-100 bg-light bg-opacity-50 text-dark d-flex align-items-center top-100">
            <h6>${result.meals[i].strMeal}</h6>
          </div>
      </div>
    </div>
    `;
  }

  document.getElementById("filterCategory").innerHTML = itemsContainer;
}

async function getArea() {
  const api = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  const response = await api.json();
  allArea = response;
  showArea(response);
  $(".loader").hide(1000);
}

function showArea(result) {
  areaContainer = ``;
  for (let i = 0; i < result.meals.length; i++) {
    areaContainer += `
    <div class="meal col-md-3 text-light text-center my-2" onclick="getAreaItems(${i})">
                    <div class="icon-home text-light fs-1 fw-bolder w-100">
                        <i class="fa-solid fa-house-laptop fs-1 w-100"></i>
                    </div>
                    <h3>${result.meals[i].strArea}</h3>
                </div>
    `;
  }
  document.getElementById("areas").innerHTML = areaContainer;
}
async function getAreaItems(index) {
  // console.log(allArea.meals[index].strArea);
  $(".loader").show();
  $(".search-sec").hide(100);
  $(".category-sec").hide(100);
  $(".filterCategory-sec").hide(100);
  $(".area-sec").hide(100);
  $(".filterArea-sec").show(100);
  $(".Ingredients-sec").hide(100);
  $("body").addClass("overflow-hidden");
  closeNav();
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${allArea.meals[index].strArea}`
  );
  const response = await api.json();
  itemShowed = response;
  console.log(response);
  showAreaItems(response);
  $(".loader").hide(1000);
}
function showAreaItems(result) {
  ItemsContainer = ``;
  for (let i = 0; i < result.meals.length; i++) {
    ItemsContainer += `
    <div class="meal col-md-3  my-2 " onclick="getDetails(${i})">
      <div class="mealContainer w-100 position-relative overflow-hidden">
          <div class="image w-100">
            <img src="${result.meals[i].strMealThumb}" class="w-100 h-100 m-0 p-0" alt="meal-img">
          </div>
          <div class="text-layer position-absolute w-100 h-100 bg-light bg-opacity-50 text-dark d-flex align-items-center top-100">
            <h6>${result.meals[i].strMeal}</h6>
          </div>
      </div>
    </div>
    `;
  }

  document.getElementById("areaItems").innerHTML = ItemsContainer;
}

async function getDetails(index) {
  $(".loader").show();
  $(".search-sec").hide(100);
  $(".category-sec").hide(100);
  $(".filterCategory-sec").hide(100);
  $(".filterIngredients-sec").hide(100);
  $(".area-sec").hide(100);
  $(".filterArea-sec").hide(100);
  $(".Ingredients-sec").hide(100);
  $(".details-sec").show(100);

  $("body").addClass("overflow-hidden");
  closeNav();
  // console.log(itemShowed.meals[index].idMeal);
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemShowed.meals[index].idMeal}`
  );
  const response = await api.json();
  console.log(response);
  showDetails(response);
  $(".loader").hide(1000);
}
function showDetails(result) {
  let recipes = [];
  for (let i = 0; i < 20; i++) {
    if (
      result.meals[0][`strIngredient${i}`] != null &&
      result.meals[0][`strIngredient${i}`] != ""
    ) {
      recipes.push(
        result.meals[0][`strIngredient${i}`] +
          " " +
          result.meals[0][`strMeasure${i}`]
      );
    }
  }
  htmlRecipes = ``;
  for (let i = 0; i < recipes.length; i++) {
    htmlRecipes += `
    <li class="alert-info rounded-2 mx-3 my-2 fs-5 p-2">${recipes[i]}</li>
    `;
  }
  let tags = [];
  if (result.meals[0].strTags) {
    let tags = result.meals[0].strTags.split(",");
    console.log(tags);
  }

  let htmlTags = ``;
  for (let i = 0; i < tags.length; i++) {
    htmlTags += `
    <li class="alert-danger rounded-2 mx-3 my-2 fs-5 p-2 ">${tags[i]}</li>
    `;
  }
  detailsContainer = `
  
  <div class="col-md-4 text-light text-center my-4">
    <div class="image rounded rounded-3">
        <img src="${result.meals[0].strMealThumb}" class="w-100" alt="meal-img rounded rounded-3">
    </div>
    <h3>${result.meals[0].strMeal}</h3>
  </div>
  <div class="col-md-8 my-4 p-2 text-light">
    <div class="instruction">
        <h3>Instructions</h3>
        <p>${result.meals[0].strInstructions}</p>
    </div>
    <div class="recipe-info">
        <h3>Area: <span>${result.meals[0].strArea}</span> </h3>
        <h3>Category: <span>${result.meals[0].strCategory}</span></h3>
        <h3>Recipes : 
            <ul class="d-flex flex-wrap   my-2">
              ${htmlRecipes}
            </ul>
        </h3>
        <h3>Tags : 
            <ul class="d-flex flex-wrap  my-2">
            ${htmlTags}
            </ul>
        </h3>
        <div class="btns my-3">
            <a href="${result.meals[0].strSource}" class="btn btn-success p-2">Source</a>
            <a href="${result.meals[0].strYoutube}" class="btn btn-danger p-2">Youtube</a>
        </div>
    </div>
  </div>
  `;
  document.getElementById("detailsMeal").innerHTML = detailsContainer;
}

async function getIngredients() {
  const api = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  const response = await api.json();
  allIngredients = response;
  showIngredients(response);
  $(".loader").hide(1000);
}

function showIngredients(result) {
  ingredientsContainer = ``;
  for (let i = 0; i < result.meals.length; i++) {
    ingredientsContainer += `
    <div class="meal col-md-3 text-center text-light my-3" onclick="getIngredientsItems(${i})" >
                    <div class="image fs-1 w-100">                        
                        <i class="fa-solid fa-drumstick-bite"></i>
                    </div>
                    <h3>${result.meals[i].strIngredient}</h3>
                </div>
    `;
  }
  document.getElementById("IngredientsResult").innerHTML = ingredientsContainer;
}

async function getIngredientsItems(index) {
  $(".loader").show();
  $(".search-sec").hide(100);
  $(".category-sec").hide(100);
  $(".filterCategory-sec").hide(100);
  $(".filterIngredients-sec").show(100);
  $(".area-sec").hide(100);
  $(".filterArea-sec").hide(100);
  $(".details-sec").hide(100);
  $(".Ingredients-sec").hide(100);

  $("body").addClass("overflow-hidden");
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${allIngredients.meals[index].strIngredient}`
  );
  const response = await api.json();
  itemShowed = response;
  showIngredientsItems(response);
  $(".loader").hide(1000);
}
function showIngredientsItems(result) {
  ItemsContainer = ``;
  for (let i = 0; i < result.meals.length; i++) {
    ItemsContainer += `
    <div class="meal col-md-3  my-2 " onclick="getDetails(${i})">
      <div class="mealContainer w-100 position-relative overflow-hidden">
          <div class="image w-100">
            <img src="${result.meals[i].strMealThumb}" class="w-100 h-100 m-0 p-0" alt="meal-img">
          </div>
          <div class="text-layer position-absolute w-100 h-100 bg-light bg-opacity-50 text-dark d-flex align-items-center top-100">
            <h6>${result.meals[i].strMeal}</h6>
          </div>
      </div>
    </div>
    `;
  }

  document.getElementById("ingredientsItems").innerHTML = ItemsContainer;
}

function validateName(input) {
  let regex = /^[A-Za-z]{4,}$/;

  if (regex.test(input.value)) {
    $(".name-validate").addClass("valid-feedback");
    return true;
  } else {
    $(".name-validate").removeClass("valid-feedback");
    return false;
  }
}

function validateEmail(input) {
  regex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (regex.test(input.value)) {
    $(".email-validate").addClass("valid-feedback");
    return true;
  } else {
    $(".email-validate").removeClass("valid-feedback");
    return false;
  }
}

function validateNumber(input) {
  regex = /^01[0125][0-9]{8}$/;
  if (regex.test(input.value)) {
    $(".phone-validate").addClass("valid-feedback");
    return true;
  } else {
    $(".phone-validate").removeClass("valid-feedback");
    return false;
  }
}

function validateAge(input) {
  regex = /^[1-9][0-9]{0,1}$/;
  if (regex.test(input.value)) {
    $(".age-validate").addClass("valid-feedback");
    return true;
  } else {
    $(".age-validate").removeClass("valid-feedback");
    return false;
  }
}
function validatePassword(input) {
  regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (regex.test(input.value)) {
    $(".password-validate").addClass("valid-feedback");
    return true;
  } else {
    $(".password-validate").removeClass("valid-feedback");
    return false;
  }
}

function validateRepassword(input, password) {
  regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (regex.test(input.value) && password.value == input.value) {
    $(".repassword-validate").addClass("valid-feedback");
    return true;
  } else {
    $(".repassword-validate").removeClass("valid-feedback");
    return false;
  }
}
