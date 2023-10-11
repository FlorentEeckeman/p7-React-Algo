class FilterElement {
  constructor(elements, name) {
    this.title = ["Ingrédients", "Appareils", "Ustensiles"];
    this.elements = elements;
    this.name = name;
    this.recipes = elements;
    this.wrapper = document.querySelector(".filters");
    this.tag = { Ingrédients: [], Appareils: [], Ustensiles: [] };
  }
  createFilter() {
    let container = document.querySelector(".filters");
    container.innerHTML = "";
    this.title.forEach((title) => {
      const element = new filterUI(title);
      element.filter();
      this.sortElements(title, this.elements);
      this.initInput(title);
    });
    this.counter();
  }
  checkTag(tags) {
    let res = false;
    for (const tag of Object.entries(tags)) {
      if (tag[1].length !== 0) res = true;
    }
    return res;
  }
  initInput(title) {
    const inputElement = "#filter-sub-input" + title;
    const that = this;
    this.wrapper
      .querySelector(inputElement)
      .addEventListener("input", async function (e) {
        e.preventDefault();
        that.cleanSearchTag(title);
        that.initTag(title, e);
      });
  }

  addListenerOnList(title, id) {
    const divElement = "#filter-element-" + title + id;
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
  async initTag(title, e) {
    const that = this;
    const res = await this.researchSort(title, e.target.value);
    document.getElementById("filter-elements-" + title).innerHTML = "";
    res[title].forEach((element) => {
      document.getElementById(
        "filter-elements-" + title
      ).innerHTML += `<li id="filter-element-${title}-${element
        .replace(/\s/g, "")
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll(`'`, "")
        .replaceAll(`%`, "")}" data-category="${title}">${element}</li>`;
    });
    res[title].forEach((element) => {
      this.addListenerOnList(
        title,
        element
          .replace(/\s/g, "")
          .replaceAll("(", "")
          .replaceAll(")", "")
          .replaceAll(`'`, "")
          .replaceAll(`%`, "")
      );
    });
  }
  addTag(category, tag) {
    this.tag[category].push(tag);
    this.elements = recipesSort(this.recipes, this.tag);
    this.title.forEach((title) => {
      this.tagSort(title);
      this.sortElements(title, this.elements, this.tag);
    });
    this.counter();
  }
  removeTag(category, tag) {
    var index = this.tag[category].indexOf(tag);
    if (index !== -1) {
      this.tag[category].splice(index, 1);
    }
    if (this.checkTag(this.tag)) {
      this.elements = recipesSort(this.recipes, this.tag);
      this.title.forEach((title) => {
        this.tagSort(title);
        this.sortElements(title, this.elements, this.tag);
      });
    } else {
      this.elements = recipesSort(this.recipes, this.tag);
      this.title.forEach((title) => {
        this.tagSort(title);
        this.sortElements(title, this.elements);
      });
    }
    this.counter();
  }
  tagSort(category, element) {
    let container = document.querySelector(".tags-" + category);
    container.innerHTML = "";
    let tag = document.querySelector("#filter-selected-elements-" + category);
    tag.innerHTML = "";
    if (this.tag.Ingrédients && category === "Ingrédients") {
      for (const tag of this.tag.Ingrédients) {
        this.tagUi(tag, category);
        this.tagOnList(tag, category);
      }
    }
    if (this.tag.Appareils && category === "Appareils") {
      for (const tag of this.tag.Appareils) {
        this.tagUi(tag, category);
        this.tagOnList(tag, category);
      }
    }
    if (this.tag.Ustensiles && category === "Ustensiles") {
      for (const tag of this.tag.Ustensiles) {
        this.tagUi(tag, category);
        this.tagOnList(tag, category);
      }
    }
  }
  cleanSearchTag(category) {
    const that = this;
    let container = document.getElementById(
      "filter-sub-search-close" + category
    );
    container.style.display = "block";
    container.addEventListener("click", function (e) {
      e.preventDefault();
      document.getElementById("filter-sub-input" + category).value = "";
      that.initTag(category, e);
      document.getElementById(
        "filter-sub-search-close" + category
      ).style.display = "none";
    });
  }
  tagUi(tag, title) {
    const container = document.querySelector(".tags-" + title);
    const that = this;
    const tagId = tag
      .replace(/\s/g, "")
      .replaceAll("(", "")
      .replaceAll(")", "")
      .replaceAll(`'`, "")
      .replaceAll(`%`, "");
    const filterCard = `
    <div>${tag}</div>
    <div class="tag-close" id="tag-close-${tagId}" data-category="${title}" data-value="${tag}">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
    <path d="M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5" stroke="#1B1B1B" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    </div>
    `;
    let filter = document.createElement("div");
    filter.setAttribute("class", "tag-element");
    filter.innerHTML = filterCard;
    container.appendChild(filter);
    container
      .querySelector("#tag-close-" + tagId)
      .addEventListener("click", function (e) {
        e.preventDefault();
        console.log(e.target.dataset.category, e.target.dataset.value, e);
        that.removeTag(e.target.dataset.category, e.target.dataset.value);
      });
  }
  tagOnList(tag, title) {
    const container = document.querySelector(
      "#filter-selected-elements-" + title
    );
    console.log(tag);
    const that = this;
    const tagId = tag
      .replace(/\s/g, "")
      .replaceAll("(", "")
      .replaceAll(")", "")
      .replaceAll(`'`, "")
      .replaceAll(`%`, "");
    const filterCard = `
    <div class="filter-selected-element" id="filter-selected-element-${tagId}" data-tags="${title}">${tag}</div>
      <div class="tag-close" id="filter-selected-close-${tagId}" data-category="${title}" data-testValue="${tag}"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none" >
      <circle cx="8.5" cy="8.5" r="8.5" fill="black"/>
      <path d="M11 11L8.5 8.5M8.5 8.5L6 6M8.5 8.5L11 6M8.5 8.5L6 11" stroke="#FFD15B" stroke-linecap="round" stroke-linejoin="round"/>
      </svg></div>
    `;
    let filter = document.createElement("div");
    filter.setAttribute("class", "tag-element-selected");
    filter.innerHTML = filterCard;
    container.appendChild(filter);
    container
      .querySelector("#filter-selected-close-" + tagId)
      .addEventListener("click", function (e) {
        console.log(e.target.dataset.category, e.target.dataset.testvalue, e);
        that.removeTag(e.target.dataset.category, e.target.dataset.testvalue);
      });
  }
  async sortElements(title, elements, tagname) {
    let container = document.getElementById("filter-element" + title);
    let filter;
    filter = document.querySelector("#filter-elements-" + title);
    filter.innerHTML = "";

    let res;
    if (tagname) {
      res = await sortElement(title, elements);
      for (const tag of tagname[title]) {
        var index = res[title].indexOf(tag);
        if (index !== -1) {
          res[title].splice(index, 1);
        }
      }
      let result = recipesSort(elements, tagname);
      document.querySelector(".recipes").innerHTML = "";
      this.elements = result;
      result.forEach((element) => {
        var recipe = new RecipeCard(element);
        recipe.card();
      });
    } else {
      res = await sortElement(title, elements);
      document.querySelector(".recipes").innerHTML = "";
      this.recipes.forEach((element) => {
        var recipe = new RecipeCard(element);
        recipe.card();
      });
    }
    res[title].forEach((element) => {
      filter.innerHTML += `<li id="filter-element-${title}-${element
        .replace(/\s/g, "")
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll(`'`, "")
        .replaceAll(`%`, "")}" data-category="${title}">${element}</li>`;
    });
    container.appendChild(filter);
    res[title].forEach((element) => {
      this.addListenerOnList(
        title,
        element
          .replace(/\s/g, "")
          .replaceAll("(", "")
          .replaceAll(")", "")
          .replaceAll(`'`, "")
          .replaceAll(`%`, "")
      );
    });
  }
  counter() {
    const container = document.getElementById("counter");
    container.innerHTML = "";
    const filterCard = `
    ${this.elements.length} recettes
    `;
    let filter = document.createElement("div");
    filter.setAttribute("class", "counter-element");
    filter.innerHTML = filterCard;
    container.appendChild(filter);
  }
}
