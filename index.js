document.addEventListener("DOMContentLoaded", function () {
   const recipeContainer = document.getElementById("recipe-container");
   const modalBody = document.getElementById("modal-body");

   fetch("https://www.themealdb.com/api/json/v2/1/latest.php")
       .then(response => response.json())
       .then(data => {
           const recipes = data.meals.slice(0, 9);

           recipes.forEach((recipe, index) => {
               // Crear una nueva fila para cada conjunto de tres recetas
               if (index % 3 === 0) {
                   const row = document.createElement("div");
                   row.classList.add("row");
                   recipeContainer.appendChild(row);
               }

               const card = document.createElement("div");
               card.classList.add("card", "mb-3", "col-md-4");

               const img = document.createElement("img");
               img.src = recipe.strMealThumb;
               img.classList.add("card-img-top");

               const cardBody = document.createElement("div");
               cardBody.classList.add("card-body");

               const title = document.createElement("h5");
               title.classList.add("card-title");
               title.textContent = recipe.strMeal;

               const detailsButton = document.createElement("button");
               detailsButton.classList.add("btn", "btn-primary");
               detailsButton.textContent = "Detalles";
               detailsButton.setAttribute("data-toggle", "modal");
               detailsButton.setAttribute("data-target", "#recipeModal");
               detailsButton.addEventListener("click", () => showRecipeDetails(recipe));

               cardBody.appendChild(title);
               cardBody.appendChild(detailsButton);

               card.appendChild(img);
               card.appendChild(cardBody);

               // Añadir la tarjeta a la fila actual
               const currentRow = recipeContainer.lastChild;
               currentRow.appendChild(card);
           });
       })
       .catch(error => console.error("Error al obtener las recetas:", error));
});

// Función para mostrar detalles en el modal
function showRecipeDetails(recipe) {
   const modalTitle = document.getElementById("recipeModalLabel");
   modalTitle.textContent = `Detalles de la Receta - ${recipe.strMeal}`;

   const modalBody = document.getElementById("modal-body");
   modalBody.innerHTML = `
       <img src="${recipe.strMealThumb}" class="img-fluid mb-3" alt="${recipe.strMeal}">
       <p><strong>Categoría:</strong> ${recipe.strCategory}</p>
       <p><strong>Área:</strong> ${recipe.strArea}</p>
       <p><strong>Instrucciones:</strong> ${recipe.strInstructions}</p>
   `;
}


const resultsPerPage = 9;
let currentPage = 1;
let allRecipes = []; // Variable global para almacenar todas las recetas

document.addEventListener("DOMContentLoaded", function () {
   loadCategories();
 });
 
 function loadCategories() {
   fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
     .then(response => response.json())
     .then(data => {
       const categoriesList = document.getElementById("categoriesList");
       categoriesList.innerHTML = "";
 
       data.categories.forEach(category => {
         const listItem = document.createElement("a");
         listItem.className = "dropdown-item";
         listItem.href = "#";
         listItem.textContent = category.strCategory;
         listItem.addEventListener("click", function(event) {
           event.preventDefault();
           loadRecipes(category.strCategory);
         });
 
         categoriesList.appendChild(listItem);
       });
     })
     .catch(error => console.error("Hubo un error al cargar las categorías", error));
 }
 
 function loadRecipes(category) {
   fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
     .then(response => response.json())
     .then(data => {
       allRecipes = data.meals || [];
       renderRecipes();
     })
     .catch(error => console.error(`Hubo un error al cargar las recetas de la categoría ${category}:`, error));
 }
 
 function renderRecipes() {
   const recipesContainer = document.getElementById("recipeRow");
   recipesContainer.innerHTML = "";
 
   allRecipes.forEach(recipe => {
     const recipeCard = document.createElement("div");
     recipeCard.className = "col-md-4 mb-4";
     recipeCard.innerHTML = `
       <div class="card">
         <img src="${recipe.strMealThumb}" class="card-img-top" alt="${recipe.strMeal}">
         <div class="card-body">
           <h5 class="card-title" data-bs-toggle="modal" data-bs-target="#recipeModal" onclick="loadRecipeDetails('${recipe.strMeal}', '${recipe.strMealThumb}', '${recipe.strInstructions}')">${recipe.strMeal}</h5>
         </div>
       </div>
     `;
     recipesContainer.appendChild(recipeCard);
   });
 }
 

// Crear dinámicamente los elementos para la paginación
for (let i = 1; i <= totalPages; i++) {
  const listItem = document.createElement("li");
  listItem.className = "page-item";
  listItem.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i})">${i}</a>`;
  if (i === currentPage) {
    listItem.classList.add("active");
  }
  paginationList.appendChild(listItem);
}
}

function changePage(page) {
currentPage = page;
renderRecipes();
}

// Recargar las recetas con la página actual
const selectedCategory = document.querySelector(".dropdown-item.active");
if (selectedCategory) {
  loadRecipes(selectedCategory.textContent);
}

// Desplazarse hacia arriba de manera suave
window.scrollTo({
  top: 0,
  behavior: 'smooth'
});





