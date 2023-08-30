class FilterElement {
  constructor(title, elements, name, recipes) {
    this.title = title;
    this.elements = elements;
    this.name = name;
    this.recipes = recipes;
    this.wrapper = document.querySelector(".filters");
    this.tag = { ingredients: [], appliance: [], ustensils: [] };
  }
  createFilter() {
    const filterCard = `
    <div class="filter-btn">
      <div>${this.title}</div>
      <div
        class="chevron-down chevronClick"
        id="ingredient-chevron-down${this.title}"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="black"
          class="bi bi-chevron-down"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </div>
      <div
        class="chevron-up chevronClick"
        id="ingredient-chevron-up${this.title}"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="8"
          viewBox="0 0 15 8"
          fill="none"
        >
          <path
            d="M1 7L7.5 1L14 7"
            stroke="#1B1B1B"
            stroke-linecap="round"
          />
        </svg>
      </div>
    </div>
    <div class="filter-sub-elements" id="filter-sub-elements-${this.title}">
      <div class="filter-sub-search">
        <input
          type="text"
          class="filter-sub-input"
          id="filter-sub-input${this.title}"
        />
        <div
          class="filter-sub-search-close"
          id="filter-sub-search-close${this.title}"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
          >
            <path
              d="M7 7L4 4M4 4L1 1M4 4L7 1M4 4L1 7"
              stroke="#7A7A7A"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <circle
            cx="5"
            cy="5"
            r="4.75"
            stroke="#7A7A7A"
            stroke-width="0.5"
          />
          <line
            x1="9.17678"
            y1="9.32322"
            x2="13.6768"
            y2="13.8232"
            stroke="#7A7A7A"
            stroke-width="0.5"
          />
        </svg>
      </div>
    </div>
     `;
    let filter = document.createElement("div");
    filter.setAttribute("class", "filter-element");
    filter.setAttribute("id", "filter-element" + this.title);
    filter.innerHTML = filterCard;
    this.wrapper.appendChild(filter);
    sortElement(this.title, this.elements);
    this.sortElements();
    this.initInput();
    this.onClickElementDown();
    this.onClickElementUp();
  }
  dropdownIngredient() {
    const element = document.getElementById("filter-sub-elements-" + this.title)
      .style.display;
    if (!element) {
      document.getElementById("filter-element" + this.title).style.height =
        "auto";
      document.getElementById(
        "filter-sub-elements-" + this.title
      ).style.display = "flex";
      document.getElementById("filter-elements-" + this.title).style.display =
        "block";
      document.getElementById(
        "ingredient-chevron-up" + this.title
      ).style.display = "block";
      document.getElementById(
        "ingredient-chevron-down" + this.title
      ).style.display = "none";
    } else {
      document.getElementById("filter-element" + this.title).style.height =
        "56px";
      document.getElementById("filter-elements-" + this.title).style.display =
        "none";
      document.getElementById(
        "filter-sub-elements-" + this.title
      ).style.display = "";
      document.getElementById(
        "ingredient-chevron-up" + this.title
      ).style.display = "none";
      document.getElementById(
        "ingredient-chevron-down" + this.title
      ).style.display = "block";
    }
  }
  dropdownIngredientTest() {
    console.log(this.title);
  }
  initInput() {
    const inputElement = "#filter-sub-input" + this.title;
    const that = this;
    this.wrapper
      .querySelector(inputElement)
      .addEventListener("input", async function (e) {
        e.preventDefault();
        const res = await that.researchSort(that.title, e.target.value);
        console.log(res);
        document.getElementById("filter-elements-" + that.title).innerHTML = "";
        res.forEach((element) => {
          document.getElementById(
            "filter-elements-" + that.title
          ).innerHTML += `<li id="filter-element-${element
            .replace(/\s/g, "")
            .replaceAll("(", "")
            .replaceAll(")", "")
            .replaceAll(`'`, "")
            .replaceAll(`%`, "")}" data-category="${
            that.title
          }">${element}</li>`;
        });
        res.forEach((element) => {
          that.addListenerOnList(
            element
              .replace(/\s/g, "")
              .replaceAll("(", "")
              .replaceAll(")", "")
              .replaceAll(`'`, "")
              .replaceAll(`%`, "")
          );
        });
      });
  }
  onClickElementDown() {
    const divElement = "#ingredient-chevron-down" + this.title;
    const that = this;
    this.wrapper
      .querySelector(divElement)
      .addEventListener("click", function (e) {
        e.preventDefault();
        that.dropdownIngredient();
      });
  }
  onClickElementUp() {
    const divElement = "#ingredient-chevron-up" + this.title;
    const that = this;
    this.wrapper
      .querySelector(divElement)
      .addEventListener("click", function (e) {
        e.preventDefault();
        that.dropdownIngredient();
      });
  }
  addListenerOnList(id) {
    const divElement = "#filter-element-" + id;
    const that = this;
    this.wrapper
      .querySelector(divElement)
      .addEventListener("click", function (e) {
        e.preventDefault();
        that.addTag(e.target.dataset.category, e.target.textContent);
      });
  }
  researchSort(title, element) {
    const res = sortElement(title, this.elements, element);
    return res;
  }
  addTag(category, tag) {
    console.log(tag);
    this.tag[category].push(tag);
    this.tagSort();
    this.sortElements(this.tag);
  }
  removeTag(category, tag) {
    console.log(tag);
    var index = this.tag[category].indexOf(tag);
    console.log(index);
    if (index !== -1) {
      this.tag[category].splice(index, 1);
    }
    console.log(this.tag[category]);
    this.tagSort();
    this.sortElements(this.tag);
  }
  tagSort(title, element) {
    let container = document.querySelector(".tags-" + this.title);
    container.innerHTML = "";
    if (this.tag.ingredients) {
      for (const tag of this.tag.ingredients) {
        this.tagUi(tag);
      }
    }
    if (this.tag.appliance) {
      for (const tag of this.tag.appliance) {
        this.tagUi(tag);
      }
    }
    if (this.tag.ustensils) {
      for (const tag of this.tag.ustensils) {
        this.tagUi(tag);
      }
    }
  }
  tagUi(tag) {
    const container = document.querySelector(".tags-" + this.title);
    const that = this;
    const tagId = tag
      .replace(/\s/g, "")
      .replaceAll("(", "")
      .replaceAll(")", "")
      .replaceAll(`'`, "")
      .replaceAll(`%`, "");
    const filterCard = `
    <div>${tag}</div>
    <div class="tag-close" id="tag-close-${tagId}" data-category="${this.title}" data-value="${tag}">X</div>
    `;
    let filter = document.createElement("div");
    filter.setAttribute("class", "tag-element");
    filter.innerHTML = filterCard;
    container.appendChild(filter);
    container
      .querySelector("#tag-close-" + tagId)
      .addEventListener("click", function (e) {
        e.preventDefault();
        that.removeTag(e.target.dataset.category, e.target.dataset.value);
      });
  }
  async sortElements(tagname) {
    let container = document.getElementById("filter-element" + this.title);

    let filter;
    let res;
    if (tagname) {
      filter = document.querySelector("#filter-elements-" + this.title);
      filter.innerHTML = "";
      console.log(tagname[this.title]);
      res = await sortElement(this.title, this.elements);
      for (const tag of tagname[this.title]) {
        var index = res.indexOf(tag);
        if (index !== -1) {
          res.splice(index, 1);
        }
      }
      console.log(res);
      let result;
      for (const [key, value] of Object.entries(tagname)) {
        console.log(value);
        console.log(key);
        console.log(tagname);
        console.log(this.elements);
        for (const item in tagname[key]) {
          console.log(tagname[key][item]);

          const sorted = this.elements.filter(
            (recipe) =>
              recipe.ingredients.some((ingredient) =>
                ingredient.ingredient
                  .toLowerCase()
                  .includes(tagname[key][item].toLowerCase())
              ) ||
              recipe.appliance
                .toLowerCase()
                .includes(tagname[key][item].toLowerCase()) ||
              recipe.ustensils.some((ustensil) =>
                ustensil
                  .toLowerCase()
                  .includes(tagname[key][item].toLowerCase())
              )
          );
          result = sorted;
        }
      }
      console.log(result);
      document.querySelector(".recipes").innerHTML = "";
      document.querySelector(".filter-elements").innerHTML = "";
      this.elements = result;
      result.forEach((element) => {
        var recipe = new RecipeCard(element);
        recipe.card();
      });
    } else {
      filter = document.createElement("ul");
      filter.setAttribute("class", "filter-elements");
      filter.setAttribute("id", "filter-elements-" + this.title);
      res = await sortElement(this.title, this.elements);
    }

    res.forEach((element) => {
      filter.innerHTML += `<li id="filter-element-${element
        .replace(/\s/g, "")
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll(`'`, "")
        .replaceAll(`%`, "")}" data-category="${this.title}">${element}</li>`;
    });
    this.researchSort();
    container.appendChild(filter);
    res.forEach((element) => {
      this.addListenerOnList(
        element
          .replace(/\s/g, "")
          .replaceAll("(", "")
          .replaceAll(")", "")
          .replaceAll(`'`, "")
          .replaceAll(`%`, "")
      );
    });
  }
}
