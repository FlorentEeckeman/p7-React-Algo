class Recipes {
  
  
    tags = {
      ingredients: [],
      apparels: [],
      ustensils: []
    };
  
    constructor() {
      new TagUI("ingredients");
    }
    
    addTag(type, value){  
      // Ajoute un tag dans l'array
      tags[type].push(value);
      
      // Relancer la recherche avec le nouvel array ingredients : ['carotte']
      const result = filterSearch(searchValue, tags); /// seachValue = input.value
       
      // Reconstruire la liste des ingredients avec selected si besoin
      buildListTag(this.tags);
      
      // Reconstruire els cartes avec le sresultat de filterSearch
      buildRecipeListUI(result)
    }
    
    buildListTag(){
      
       ingredientsList.map((ingredient) => { 
          const element = document.createElement("li");
         if ( tags.ingredients.includes(element))
           {
             li.addClass("selected");
           }
        
       })
      
    }
    
  }
  
  
  
  
  <li data-category="ingedients" data-value="carotte" class="selected" />
  //...
  
  document.addEventListener(("click", (e) => {
    e.target.addClass("selected");
    Tags.addTag(e.dataset.category, e.dataset.value))
  }