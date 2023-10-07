class filterUI {
  constructor(type) {
    this.wrapper = document.querySelector(".filters");
    this.title = type;
  }
  filter() {
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
        <div class="filter-elements-list" id="filter-selected-elements-${this.title}">
        </div>
        <ul class="filter-elements" id="filter-elements-${this.title}">
        </ul>
         `;
    let filter = document.createElement("div");
    filter.setAttribute("class", "filter-element");
    filter.setAttribute("id", "filter-element" + this.title);
    filter.innerHTML = filterCard;
    this.wrapper.appendChild(filter);
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
        "filter-selected-elements-" + this.title
      ).style.display = "block";
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
        "filter-selected-elements-" + this.title
      ).style.display = "none";
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
}
