let todasLasRecetas = []; // Variable para almacenar todas las recetas cargadas

document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get('categoria');
    if (categoria) {
        cargarRecetasDeCategoria(categoria);
    }
});

function cargarRecetasDeCategoria(categoria) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`)
        .then(response => response.json())
        .then(data => {
            todasLasRecetas = data.meals; // Almacena todas las recetas
            mostrarRecetas(todasLasRecetas); // Muestra la primera página
            crearPaginacion(todasLasRecetas.length, 9); // Asumiendo 9 recetas por página
        })
        .catch(error => console.error('Error al cargar recetas:', error));
}

function mostrarRecetas(recetas, pagina = 1, recetasPorPagina = 9) {
   const contenedor = document.getElementById('recetas-container');
   contenedor.innerHTML = '';

   // Calcula el inicio y final de las recetas para la paginación
   const inicio = (pagina - 1) * recetasPorPagina;
   const final = inicio + recetasPorPagina;

   recetas.slice(inicio, final).forEach(receta => {
       // Aquí se crea el código HTML para cada tarjeta de receta
       const card = `
           <div class="col-md-4 mb-4">
               <div class="card">
                   <img src="${receta.strMealThumb}" class="card-img-top" alt="${receta.strMeal}">
                   <div class="card-body">
                       <h5 class="card-title">
                           <a href="detalle_receta.html?id=${receta.idMeal}">${receta.strMeal}</a>
                       </h5>
                       <!-- Aquí puedes añadir más información o botones si es necesario -->
                   </div>
               </div>
           </div>
       `;
       contenedor.innerHTML += card; // Agrega la tarjeta al contenedor de recetas
   });
}

function crearPaginacion(totalRecetas, recetasPorPagina) {
   const totalPaginas = Math.ceil(totalRecetas / recetasPorPagina);
   const paginacionContenedor = document.getElementById('pagination-container');
   paginacionContenedor.innerHTML = '';

   for (let i = 1; i <= totalPaginas; i++) {
       const botonPagina = document.createElement('button');
       botonPagina.textContent = i;
       botonPagina.classList.add('btn', 'btn-secondary', 'mr-2');
       botonPagina.onclick = () => mostrarRecetas(todasLasRecetas, i, recetasPorPagina);
       paginacionContenedor.appendChild(botonPagina);
   }
}


////////////////////////////////////////////////////////////////////////////////////////////


