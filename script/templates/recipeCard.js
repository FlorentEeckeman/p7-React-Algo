class RecipeCard {
  constructor(elements) {
    this.elements = elements;
  }
  addIngredients(item, id) {
    let ingredient;
    item.quantity
      ? (ingredient = `<div class="recipe-card-ingredient-item">${item.ingredient}</div>
    <p class="recipe-card-quantity">${item.quantity}</p>`)
      : (ingredient = `<div class="recipe-card-ingredient-item">${item.ingredient}</div>`);
    if (item.unit) {
      ingredient = `<div class="recipe-card-ingredient-item">${item.ingredient}</div>
      <p class="recipe-card-quantity">${item.quantity} ${item.unit}</p>`;
    }
    const container = document.querySelector("#card-ingredients-items-" + id);
    let element = document.createElement("div");
    element.setAttribute("class", "recipe-ingredients-item");
    element.innerHTML = ingredient;
    container.appendChild(element);
  }
  card() {
    let card = `
    <div class="recipe-card">
      <div class="recipe-card-img" style="background-image: url('/assets/photos/Photos P7 JS Les petits plats/${this.elements.image}')"></div>
      <div class="recipe-card-text">
        <h2>${this.elements.name}</h2>
        <div class="">
          <h3 class="">RECETTE</h3>
          <p class="card-description">${this.elements.description}</p>
        </div>
        <div class="">
          <h3 class="">INGREDIENTS</h3>
          <div class="card-ingredients-items" id="card-ingredients-items-${this.elements.id}"></div>
        </div>
      </div>
    </div>
    <div class="recipe-time">${this.elements.time}min</div>
    `;
    const container = document.querySelector(".recipes");
    let filter = document.createElement("div");
    filter.setAttribute("class", "recipe-element");
    filter.innerHTML = card;
    container.appendChild(filter);
    this.elements.ingredients.forEach((element) => {
      this.addIngredients(element, this.elements.id);
    });
  }
}
