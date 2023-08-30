function clearSearchBar() {
  document.getElementById("search-bar").value = "";
  document.getElementById("search-bar-clear").style.display = "none";
}
function changeSearchBar() {
  document.getElementById("search-bar-clear").style.display = "inline-block";
}

function clearSearchSubBar() {
  document.getElementById("filter-sub-input").value = "";
  document.getElementById("filter-sub-search-close").style.display = "none";
}
function changeSearchSubBar() {
  document.getElementById("filter-sub-search-close").style.display = "flex";
}

function onClickElement() {
  document.querySelector("#search-bar").addEventListener("focus", function (e) {
    e.preventDefault();
    changeSearchBar();
  });
  document
    .querySelector("#search-bar-clear")
    .addEventListener("focus", function (e) {
      e.preventDefault();
      changeSearchBar();
    });
  document.querySelector("#search-bar").addEventListener("blur", function (e) {
    e.preventDefault();
    clearSearchBar();
  });
}
function searchBar(data) {
  const res = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(data) ||
      recipe.description.toLowerCase().includes(data) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(data)
      )
  );
  document.querySelector(".recipes").innerHTML = "";
  document.querySelector(".filters").innerHTML = "";
  var filterIngredient = new FilterElement("ingredients", res);
  filterIngredient.createFilter();
  var filterAppareil = new FilterElement("appliance", res);
  filterAppareil.createFilter();
  var filterUstensiles = new FilterElement("ustensils", res);
  filterUstensiles.createFilter();
  res.forEach((element) => {
    var recipe = new RecipeCard(element);
    recipe.card();
  });
}
async function init() {
  var filterIngredient = new FilterElement("ingredients", recipes);
  filterIngredient.createFilter();
  var filterAppareil = new FilterElement("appliance", recipes);
  filterAppareil.createFilter();
  var filterUstensiles = new FilterElement("ustensils", recipes);
  filterUstensiles.createFilter();
  document.querySelector("#search-bar").addEventListener("input", function (e) {
    e.preventDefault();
    if (e.target.value.length >= 3) searchBar(e.target.value.toLowerCase());
  });
  recipes.forEach((element) => {
    var recipe = new RecipeCard(element);
    recipe.card();
  });
}
init();
