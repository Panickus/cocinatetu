const resultsPerPage = 9;
let currentPage = 1;
let allRecipes = []; // Variable global para almacenar todas las recetas

function loadCategories() {
// Hacer la solicitud a la API de categorías
fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
  .then(response => response.json())
  .then(data => {
    const categoriesList = document.getElementById("categoriesList");

    // Limpiar cualquier categoría existente
    categoriesList.innerHTML = "";

    // Crear dinámicamente los elementos de la lista de categorías
    data.categories.forEach(category => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `<a class="dropdown-item" href="#" onclick="loadRecipes('${category.strCategory}')">${category.strCategory}</a>`;
      categoriesList.appendChild(listItem);
    });
  })
  .catch(error => console.error("Hubo un error al cargar las categorías", error));
}


function loadRecipes(category) {
// Hacer la solicitud a la API de recetas por categoría
fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
  .then(response => response.json())
  .then(data => {
    allRecipes = data.meals || []; // Almacenar todas las recetas

    renderRecipes();
  })
  .catch(error => console.error(`Hubo un error al cargar las recetas de la categoría ${category}`, error));
}

function renderRecipes() {
const recipesContainer = document.getElementById("recipeRow");
const paginationContainer = document.getElementById("paginationContainer");
const paginationList = document.getElementById("paginationList");

// Limpiar cualquier receta y paginación existente
recipesContainer.innerHTML = "";
paginationList.innerHTML = "";

// Calcular el número total de páginas
const totalPages = Math.ceil(allRecipes.length / resultsPerPage);

// Validar que currentPage no exceda el rango de páginas
currentPage = Math.min(currentPage, totalPages);
currentPage = Math.max(currentPage, 1);

// Calcular los índices de inicio y fin para las recetas a mostrar
const startIndex = (currentPage - 1) * resultsPerPage;
const endIndex = Math.min(startIndex + resultsPerPage, allRecipes.length);

// Crear dinámicamente los elementos para mostrar las recetas
const recipesToShow = allRecipes.slice(startIndex, endIndex);

recipesToShow.forEach(recipe => {
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

