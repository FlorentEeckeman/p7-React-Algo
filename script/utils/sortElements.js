async function sortElement(type, recipes, elements) {
  switch (type) {
    case "ingredients":
      if (!elements) {
        let container = [];
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
        const backToArray = [...uniqueSet];
        console.log(backToArray);
        return backToArray;
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
        const backToArray = [...uniqueSet];
        console.log(backToArray);
        return backToArray;
      }

      break;
    case "appliance":
      if (!elements) {
        let container = [];
        recipes.forEach((element) => {
          container.push(
            element[type].charAt(0).toUpperCase() +
              element[type].toLowerCase().slice(1)
          );
        });
        container.flat();
        const elementRes = container.flat();
        console.log(elementRes);
        const uniqueSet = new Set(elementRes);
        const backToArray = [...uniqueSet];
        console.log(backToArray);
        return backToArray;
      } else {
        let container = [];
        recipes.forEach((item) => {
          const expression =
            elements.charAt(0).toUpperCase() + elements.toLowerCase().slice(1);
          const regex = new RegExp(expression);
          const test = item[type];
          if (test.match(regex)) {
            container.push(
              item[type].charAt(0).toUpperCase() +
                item[type].toLowerCase().slice(1)
            );
          }
        });
        container.flat();
        const uniqueSet = new Set(container);
        const backToArray = [...uniqueSet];
        console.log(backToArray);
        return backToArray;
      }
      break;
    case "ustensils":
      if (!elements) {
        let container = [];
        recipes.forEach((element) => {
          element[type].forEach((recipe) => {
            container.push(
              recipe.charAt(0).toUpperCase() + recipe.toLowerCase().slice(1)
            );
          });
        });
        const uniqueSet = new Set(container.flat());
        const backToArray = [...uniqueSet];
        console.log(backToArray);
        return backToArray;
      } else {
        let container = [];
        recipes.forEach((recipe) => {
          recipe[type].forEach((item) => {
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
        const backToArray = [...uniqueSet];
        console.log(backToArray);
        return backToArray;
      }
      break;
    default:
      console.log("non trouvé");
  }
}
