document.addEventListener("DOMContentLoaded", function () {
  const recipeContainer = document.getElementById("recipe-container");

  fetch("https://www.themealdb.com/api/json/v2/1/latest.php")
      .then(response => response.json())
      .then(data => {
          // Extraemos las primeras 9 recetas
          const recipes = data.meals.slice(0, 9);

          // Creamos las tarjetas de Bootstrap
          recipes.forEach(recipe => {
              const card = document.createElement("div");
              card.classList.add("card", "mb-3");

              const img = document.createElement("img");
              img.src = recipe.strMealThumb;
              img.classList.add("card-img-top");

              const cardBody = document.createElement("div");
              cardBody.classList.add("card-body");

              const title = document.createElement("h5");
              title.classList.add("card-title");
              title.textContent = recipe.strMeal;

              const description = document.createElement("p");
              description.classList.add("card-text");
              description.textContent = recipe.strInstructions.substring(0, 100) + "...";

              cardBody.appendChild(title);
              cardBody.appendChild(description);

              card.appendChild(img);
              card.appendChild(cardBody);

              recipeContainer.appendChild(card);
          });
      })
      .catch(error => console.error("Error al obtener las recetas:", error));
});


// Mostrar solo las primeras 9 recetas
recipes.slice(0, 9).forEach((recipe, index) => {
  const card = document.createElement("div");
  card.className = "card col-md-4";
  card.innerHTML = `
    <img src="${recipe.strMealThumb}" class="card-img-top" alt="${recipe.strMeal}">
    <div class="card-body">
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#recipeModal" onclick="showRecipeDetails(${index})">${recipe.strMeal}</button>
    </div>
  `;
  latestRecipesContainer.appendChild(card);
});


// Función para mostrar detalles de la receta en el modal
function showRecipeDetails(index) {
const modalTitle = document.getElementById("recipeModalLabel");
const modalBody = document.getElementById("recipeModalBody");

// Obtenemos los detalles de la receta según el índice
fetch("https://www.themealdb.com/api/json/v2/1/latest.php")
  .then(response => response.json())
  .then(data => {
    const recipe = data.meals[index];
    modalTitle.innerText = `Detalles de la Receta - ${recipe.strMeal}`;
    modalBody.innerHTML = `
      <img src="${recipe.strMealThumb}" class="img-fluid mb-3" alt="${recipe.strMeal}" style="max-width: 50%; height: auto;">
      <p><strong>Nombre:</strong> ${recipe.strMeal}</p>
      <p><strong>Categoría:</strong> ${recipe.strCategory}</p>
      <p><strong>Área:</strong> ${recipe.strArea}</p>
      <p><strong>Instrucciones:</strong> ${recipe.strInstructions}</p>`;
  })
  .catch(error => console.error("Hubo un error al obtener los detalles de la receta", error));
}

 const hamburguesaMenu = document.querySelector('.hamburguesa-menu');
 const navUl = document.querySelector('nav ul');

 hamburguesaMenu.addEventListener('click', () => {
     navUl.classList.toggle('show');
 });
 

 // Mostrar 10 recetas ramdon
 fetch('https://www.themealdb.com/api/json/v2/1/randomselection.php')
        .then(response => response.json())
        .then(data => {
          const results = document.getElementById('results');
          let row;
          for (let i = 0; i < data.meals.length; i++) {
            if (i % 3 === 0) {
              row = document.createElement('div');
              row.classList.add('row');
              results.appendChild(row);
            }
            const item = document.createElement('div');
            item.classList.add('col-sm-4');
            item.classList.add('item');
            item.innerHTML = `<img src="${data.meals[i].strMealThumb}" alt="${data.meals[i].strMeal}"><p>${data.meals[i].strMeal}</p>`;
            row.appendChild(item);
          }
        });


        document.addEventListener("DOMContentLoaded", () => {
          // Hacemos la solicitud fetch a la API
          fetch("https://www.themealdb.com/api/json/v2/1/randomselection.php")
            .then(response => response.json())
            .then(data => {
              // Llamamos a la función para mostrar las recetas en tarjetas
              displayRecipes(data.meals);
            })
            .catch(error => console.error("Hubo un error al obtener las recetas", error));
        });
      
        // Función para mostrar las recetas en tarjetas Bootstrap
        function displayRecipes(recipes) {
          const recipeContainer = document.getElementById("recipeContainer");
      
          recipes.forEach(recipe => {
            const card = document.createElement("div");
            card.className = "card col-md-4";
            card.innerHTML = `
              <img src="${recipe.strMealThumb}" class="card-img-top" alt="${recipe.strMeal}">
              <div class="card-body">
                <h5 class="card-title">${recipe.strMeal}</h5>
                <p class="card-text">${recipe.strInstructions}</p>
                <a href="#" class="btn btn-primary">Detalles</a>
              </div>
            `;
            recipeContainer.appendChild(card);
          });
        }
