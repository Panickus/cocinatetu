// Función para cargar las recetas
function cargarRecetas() {
    fetch('https://www.themealdb.com/api/json/v2/9973533/randomselection.php')
        .then(response => response.json())
        .then(data => {
            mostrarRecetas(data.meals);
        });
}

// Función para mostrar las recetas
function mostrarRecetas(recetas) {
    const contenedor = document.getElementById('recetas-container');
    contenedor.innerHTML = '';

    recetas.forEach((receta, index) => {
        if (index < 9) {
            const card = `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="${receta.strMealThumb}" class="card-img-top" alt="${receta.strMeal}">
                        <div class="card-body">
                            <h5 class="card-title">${receta.strMeal}</h5>
                            <button onclick="mostrarDetallesReceta(${receta.idMeal})" class="btn btn-primary">Ver Más</button>
                        </div>
                    </div>
                </div>
            `;
            contenedor.innerHTML += card;
        }
    });
}

// Función para mostrar los detalles en un modal
function mostrarDetallesReceta(idMeal) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
        .then(response => response.json())
        .then(data => {
            const receta = data.meals[0];
            const modalTitle = document.getElementById('recetaModalLabel');
            const modalBody = document.querySelector('#recetaModal .modal-body');

            modalTitle.textContent = receta.strMeal;
            modalBody.innerHTML = `
                <img src="${receta.strMealThumb}" class="img-fluid" style="max-width: 50%;">
                <p><strong>País:</strong> ${receta.strArea}</p>
                <p><strong>Categoría:</strong> ${receta.strCategory}</p>
                <p>${receta.strInstructions}</p>
            `;

            $('#recetaModal').modal('show');
        });
}

// Cargar recetas cuando la página está lista
document.addEventListener('DOMContentLoaded', cargarRecetas);
//////////////////////////////////////////////////////////////////////////////////////////

// Función para cargar categorías y agregarlas al menú de navegación
function cargarCategorias() {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(response => response.json())
        .then(data => {
            agregarCategoriasAMenu(data.categories);
        })
        .catch(error => console.error('Error al cargar las categorías:', error));
}


document.addEventListener('DOMContentLoaded', function() {
    cargarCategorias();
});

function agregarCategoriasAMenu(categorias) {
    const menuRecetas = document.getElementById('menu-recetas');
    categorias.forEach(categoria => {
        let itemMenu = document.createElement('a');
        itemMenu.href = `recetas.html?categoria=${categoria.strCategory}`;
        itemMenu.classList.add('dropdown-item');
        itemMenu.textContent = categoria.strCategory;
        menuRecetas.appendChild(itemMenu);
    });
}

// Nueva función para cargar recetas por categoría
function cargarRecetasPorCategoria(categoria) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`)
        .then(response => response.json())
        .then(data => {
            mostrarRecetas(data.meals); // Utiliza la misma función mostrarRecetas o una similar
        })
        .catch(error => console.error('Error al cargar recetas de la categoría:', error));
}



//////////////////////////////////////////////////////////////////////////////////////////////
// Código para el formulario de contacto
document.getElementById('formulario-contacto').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene el envío tradicional del formulario

    // Obtiene los valores del formulario
    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var mensaje = document.getElementById('mensaje').value;

    // Aquí puedes agregar la lógica para enviar estos datos a un servidor
    // Por ejemplo, usando AJAX, Fetch API, o enviar a un servicio de correo

    // Muestra un mensaje de confirmación o realiza alguna acción después de enviar
    alert("Mensaje enviado. \n" + "Nombre: " + nombre + "\nEmail: " + email + "\nMensaje: " + mensaje);
});













