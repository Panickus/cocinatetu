 // Función para obtener las últimas 8 recetas de la API y mostrarlas en la página
 async function obtenerUltimasRecetas() {
   try {
     const response = await fetch('https://www.themealdb.com/api/json/v2/1/latest.php');
     const data = await response.json();

     const recetasContainer = document.getElementById('recetasContainer');

     // Iterar sobre las últimas 8 recetas
     data.meals.slice(0, 8).forEach(receta => {
       const nombreReceta = receta.strMeal;
       const imagenReceta = receta.strMealThumb;

       // Crear un elemento de columna Bootstrap para cada receta
       const col = document.createElement('div');
       col.className = 'col-md-3 mb-4';

       // Crear la tarjeta de la receta con imagen y nombre
       const card = document.createElement('div');
       card.className = 'card text-center';

       const imagen = document.createElement('img');
       imagen.className = 'card-img-top';
       imagen.src = imagenReceta;
       imagen.alt = 'Imagen de la receta';

       const cardBody = document.createElement('div');
       cardBody.className = 'card-body';

       const nombre = document.createElement('h5');
       nombre.className = 'card-title';
       nombre.innerText = nombreReceta;

       // Agregar elementos a la tarjeta y la tarjeta a la columna
       cardBody.appendChild(nombre);
       card.appendChild(imagen);
       card.appendChild(cardBody);
       col.appendChild(card);

       // Agregar la columna al contenedor de recetas
       recetasContainer.appendChild(col);
     });
   } catch (error) {
     console.error('Error al obtener las recetas:', error);
   }
 }

 // Llama a la función al cargar la página
 window.onload = obtenerUltimasRecetas;

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
