document.addEventListener('DOMContentLoaded', function() {
   const params = new URLSearchParams(window.location.search);
   const idReceta = params.get('id');
   if (idReceta) {
       cargarDetalleReceta(idReceta);
   }
});

function cargarDetalleReceta(idReceta) {
   fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idReceta}`)
       .then(response => response.json())
       .then(data => {
           const receta = data.meals[0];
           mostrarDetalleReceta(receta);
       })
       .catch(error => console.error('Error al cargar detalles de la receta:', error));
}

function mostrarDetalleReceta(receta) {
   const contenedor = document.getElementById('detalle-receta-container');
   const ingredientes = obtenerIngredientes(receta);
   const videoEmbedUrl = obtenerVideoEmbedUrl(receta.strYoutube);

   contenedor.innerHTML = `
       <h1>${receta.strMeal}</h1>
       <img src="${receta.strMealThumb}" alt="${receta.strMeal}" class="img-fluid">
       <p><strong>Categoría:</strong> ${receta.strCategory}</p>
       <p><strong>Área:</strong> ${receta.strArea}</p>
       <h3>Ingredientes</h3>
       <table class="table">
           ${ingredientes}
       </table>
       <h3>Instrucciones</h3>
       <p>${receta.strInstructions}</p>
       ${videoEmbedUrl ? `<h3>Video de Receta</h3><iframe width="560" height="315" src="${videoEmbedUrl}" frameborder="0" allowfullscreen></iframe>` : ''}
   `;
}

function obtenerVideoEmbedUrl(url) {
   const urlObj = new URL(url);
   const videoId = urlObj.searchParams.get('v');
   return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

function obtenerIngredientes(receta) {
   let ingredientesHTML = '';
   for(let i = 1; i <= 20; i++) {
       const ingrediente = receta[`strIngredient${i}`];
       const medida = receta[`strMeasure${i}`];
       if(ingrediente && medida) {
           ingredientesHTML += `<tr><td>${ingrediente}</td><td>${medida}</td></tr>`;
       }
   }
   return ingredientesHTML;
}
