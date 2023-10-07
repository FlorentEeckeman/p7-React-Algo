async function sortElement(type, recipes, elements) {
  let result = { Ingrédients: [], Appareils: [], Ustensiles: [] };
  switch (type) {
    case "Ingrédients":
      if (!elements) {
        let container = [];
        // console.log(recipes);
        recipes.forEach((element) => {
          element["ingredients"].forEach((recipe) => {
            container.push(
              recipe["ingredient"].charAt(0).toUpperCase() +
                recipe["ingredient"].toLowerCase().slice(1)
            );
          });
        });
        container.flat();
        const uniqueSet = new Set(container);
        result.Ingrédients = [...uniqueSet];
        return result;
      } else {
        let container = [];
        recipes.forEach((item) => {
          item["ingredients"].forEach((recipe) => {
            const expression =
              elements.charAt(0).toUpperCase() +
              elements.toLowerCase().slice(1);
            const regex = new RegExp(expression);
            const test = recipe["ingredient"];
            if (test.match(regex)) {
              container.push(
                recipe["ingredient"].charAt(0).toUpperCase() +
                  recipe["ingredient"].toLowerCase().slice(1)
              );
            }
          });
        });
        container.flat();
        const uniqueSet = new Set(container);
        result.Ingrédients = [...uniqueSet];
        return result;
      }

      break;
    case "Appareils":
      if (!elements) {
        let container = [];
        recipes.forEach((element) => {
          container.push(
            element["appliance"].charAt(0).toUpperCase() +
              element["appliance"].toLowerCase().slice(1)
          );
        });
        container.flat();
        const elementRes = container.flat();
        const uniqueSet = new Set(elementRes);
        result.Appareils = [...uniqueSet];
        return result;
      } else {
        let container = [];
        recipes.forEach((item) => {
          const expression =
            elements.charAt(0).toUpperCase() + elements.toLowerCase().slice(1);
          const regex = new RegExp(expression);
          const test = item["appliance"];
          if (test.match(regex)) {
            container.push(
              item["appliance"].charAt(0).toUpperCase() +
                item["appliance"].toLowerCase().slice(1)
            );
          }
        });
        container.flat();
        const uniqueSet = new Set(container);
        result.Appareils = [...uniqueSet];
        return result;
      }
      break;
    case "Ustensiles":
      if (!elements) {
        let container = [];
        recipes.forEach((element) => {
          element["ustensils"].forEach((recipe) => {
            container.push(
              recipe.charAt(0).toUpperCase() + recipe.toLowerCase().slice(1)
            );
          });
        });
        const uniqueSet = new Set(container.flat());
        result.Ustensiles = [...uniqueSet];
        return result;
      } else {
        let container = [];
        recipes.forEach((recipe) => {
          recipe["ustensils"].forEach((item) => {
            const expression =
              elements.charAt(0).toUpperCase() +
              elements.toLowerCase().slice(1);
            const regex = new RegExp(expression);
            const test = item;
            if (test.match(regex)) {
              container.push(
                item.charAt(0).toUpperCase() + item.toLowerCase().slice(1)
              );
            }
          });
        });
        container.flat();
        const uniqueSet = new Set(container);
        result.Ustensiles = [...uniqueSet];
        return result;
      }
      break;
    default:
  }
}
