function recipesSort(recipes, tags) {
  for (const [key, value] of Object.entries(tags)) {
    for (const item in tags[key]) {
      const sorted = recipes.filter(
        (recipe) =>
          recipe.ingredients.some((ingredient) =>
            ingredient.ingredient
              .toLowerCase()
              .includes(tags[key][item].toLowerCase())
          ) ||
          recipe.appliance
            .toLowerCase()
            .includes(tags[key][item].toLowerCase()) ||
          recipe.ustensils.some((ustensil) =>
            ustensil.toLowerCase().includes(tags[key][item].toLowerCase())
          )
      );
      recipes = sorted;
    }
  }
  return recipes;
}
