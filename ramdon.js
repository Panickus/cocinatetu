async function obtenerRecetasAleatorias() {
   try {
     const response = await fetch('https://www.themealdb.com/api/json/v2/1/randomselection.php');
     const data = await response.json();

     const recipeContainer = document.getElementById('recipeContainer');

     // Iterar sobre las recetas y mostrarlas en tarjetas
     data.meals.forEach(receta => {
       const nombreReceta = receta.strMeal;
       const imagenReceta = receta.strMealThumb;

       // Crear una tarjeta para cada receta
       const card = document.createElement('div');
       card.className = 'recipe-card';

       // Agregar la imagen y el nombre de la receta a la tarjeta
       card.innerHTML = `<img src="${imagenReceta}" alt="${nombreReceta}">
                         <p>${nombreReceta}</p>`;

       // Agregar la tarjeta al contenedor
       recipeContainer.appendChild(card);
     });
   } catch (error) {
     console.error('Error al obtener las recetas:', error);
   }
 }

 // Llama a la función al cargar la página
 window.onload = obtenerRecetasAleatorias;