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
  document
    .querySelector("#search-bar-clear")
    .addEventListener("click", function (e) {
      e.preventDefault();
      init();
      clearSearchBar();
    });
}
function searchSecondAlgo(data) {
  let res = [];
  for (var i = 0; i < recipes.length; i++) {
    if (
      recipes[i].name.toLowerCase().includes(data) ||
      recipes[i].description.toLowerCase().includes(data) ||
      recipes[i].ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(data)
      )
    ) {
      res.push(recipes[i]);
    }
  }
  return res;
}
function searchFirstAlgo(data) {
  let res = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(data) ||
      recipe.description.toLowerCase().includes(data) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(data)
      )
  );
  return res;
}
function searchBar(data) {
  const res = searchFirstAlgo(data);
  const res2 = searchSecondAlgo(data);
  console.timeEnd(searchFirstAlgo(data));
  console.timeEnd(searchSecondAlgo(data));
  document.querySelector(".recipes").innerHTML = "";
  document.querySelector(".filters").innerHTML = "";
  var filterIngredient = new FilterElement(res);
  filterIngredient.createFilter();
  res.forEach((element) => {
    var recipe = new RecipeCard(element);
    recipe.card();
  });
}
async function init() {
  var filterIngredient = new FilterElement(recipes);
  filterIngredient.createFilter();
  document.querySelector("#search-bar").addEventListener("input", function (e) {
    e.preventDefault();
    changeSearchBar();
    onClickElement();
    console.log(e.target.value.length);
    if (e.target.value.length > 2) searchBar(e.target.value.toLowerCase());
    else {
      recipes.forEach((element) => {
        var recipe = new RecipeCard(element);
        recipe.card();
      });
    }
  });
}
init();
