function showStep(step) {
  // Obtener todos los elementos de paso y de línea
  const steps = document.querySelectorAll('.step');
  const lines = document.querySelectorAll('.line');

  // Remover la clase 'active' de todos los elementos de paso y de línea
  steps.forEach(stepElement => stepElement.classList.remove('active'));
  lines.forEach(line => line.classList.remove('active'));

  // Agregar la clase 'active' a los pasos y líneas correspondientes
  for (let i = 0; i < step; i++) {
      steps[i].classList.add('active');
      if (i < step - 1) {
          lines[i].classList.add('active');
      }
  }
  
  // Mostrar el contenido del paso seleccionado
  const stepContents = document.querySelectorAll('.step-content');
  stepContents.forEach(content => content.classList.remove('active'));
  document.getElementById('step' + step).classList.add('active');
}

//meotdos de tablas
document.addEventListener("DOMContentLoaded", function() {
  const tableBody = document.getElementById("tableBody");
  const numElementos = document.getElementById("numElementos");
  const pagination = document.getElementById("pagination");

  numElementos.addEventListener("change", function() {
      showPage(1); // Mostrar la primera página al cambiar el número de elementos
  });

  function showPage(pageNumber) {
      const elementosPorPagina = parseInt(numElementos.value);
      const rows = tableBody.querySelectorAll("tr");

      const startIndex = (pageNumber - 1) * elementosPorPagina;
      const endIndex = pageNumber * elementosPorPagina;

      rows.forEach((row, index) => {
          if (index >= startIndex && index < endIndex) {
              row.style.display = "table-row";
          } else {
              row.style.display = "none";
          }
      });

      renderPagination(rows.length, pageNumber, elementosPorPagina);
  }

  function renderPagination(totalItems, currentPage, itemsPerPage) {
      pagination.innerHTML = "";

      const totalPages = Math.ceil(totalItems / itemsPerPage);

      for (let i = 1; i <= totalPages; i++) {
          const button = document.createElement("button");
          button.innerText = i;

          if (i === currentPage) {
              button.classList.add("active");
          }

          button.addEventListener("click", function() {
              showPage(i);
          });

          pagination.appendChild(button);
      }
  }
});

function buscar() {
const input = document.getElementById('search');
const filter = input.value.toUpperCase();
const table = document.getElementById('myTable');
const rows = table.getElementsByTagName('tr');

for (let i = 0; i < rows.length; i++) {
    let firstCol = rows[i].getElementsByTagName('td')[0];
    if (firstCol) {
        let idValue = firstCol.textContent || firstCol.innerText;
        if (idValue.trim().toUpperCase() === filter) {
          rows[i].style.display = '';
      } else {
          rows[i].style.display = 'none';
      }
    }
}
}

//añade la infomacion de usuario
document.addEventListener("DOMContentLoaded", function() {
  const tableRows = document.querySelectorAll("#tableBody tr");

  tableRows.forEach(row => {
      const userID = row.querySelector("td:first-child").textContent; // Obtener el ID del usuario
      const addButton = row.querySelector(".agregar");

      addButton.addEventListener("click", function() {
          const userName = row.querySelector("td:nth-child(2)").textContent; // Obtener el nombre del usuario
          const comprasHechas = row.querySelector("td:nth-child(3)").textContent; // Obtener las compras hechas

          const usuarioSeleccionadoDiv = document.querySelector(".usuario-seleccionado");
          usuarioSeleccionadoDiv.innerHTML = `
              <h4>Usuario Seleccionado:</h4>
              <p><strong>ID:</strong> ${userID}</p>
              <p><strong>Nombre:</strong> ${userName}</p>
              <p><strong>Compras Hechas:</strong> ${comprasHechas}</p>
          `;
      });
  });
});

//agrgar prodctos
document.addEventListener("DOMContentLoaded", function() {
  const tableBody = document.getElementById("tableBody-productos");
  const numElementos = document.getElementById("itemelementos");
  const pagination = document.getElementById("paginacion");

  numElementos.addEventListener("change", function() {
      showPage(1); // Mostrar la primera página al cambiar el número de elementos
  });

  function showPage(pageNumber) {
      const elementosPorPagina = parseInt(numElementos.value);
      const rows = tableBody.querySelectorAll("tr");

      const startIndex = (pageNumber - 1) * elementosPorPagina;
      const endIndex = pageNumber * elementosPorPagina;

      rows.forEach((row, index) => {
          if (index >= startIndex && index < endIndex) {
              row.style.display = "table-row";
          } else {
              row.style.display = "none";
          }
      });

      renderPagination(rows.length, pageNumber, elementosPorPagina);
  }

  function renderPagination(totalItems, currentPage, itemsPerPage) {
      pagination.innerHTML = "";

      const totalPages = Math.ceil(totalItems / itemsPerPage);

      for (let i = 1; i <= totalPages; i++) {
          const button = document.createElement("button");
          button.innerText = i;

          if (i === currentPage) {
              button.classList.add("active");
          }

          button.addEventListener("click", function() {
              showPage(i);
          });

          pagination.appendChild(button);
      }
  }
});

function buscar() {
  const input = document.getElementById('busca');
  const filter = input.value.toUpperCase();
  const table = document.getElementById('Table-productos');
  const rows = table.getElementsByTagName('tr');

  for (let i = 0; i < rows.length; i++) {
      let firstCol = rows[i].getElementsByTagName('td')[0];
      if (firstCol) {
          let idValue = firstCol.textContent || firstCol.innerText;
          if (idValue.trim().toUpperCase() === filter) {
              rows[i].style.display = '';
          } else {
              rows[i].style.display = 'none';
          }
      }
  }
}

//agregar productos al carrito

function agregarProducto(event) {
  // Obtener los detalles del producto
  const filaProducto = event.target.closest('tr');
  const nombre = filaProducto.querySelector('td:nth-child(2)').textContent;
  const cantidad = filaProducto.querySelector('input.cantidad').value;

  // Crear una nueva fila con los detalles del producto
  const filaNueva = document.createElement('tr');
  filaNueva.innerHTML = `
      <td>${nombre}</td>
      <td>${cantidad}</td>
      <td><button class="ver"><i class="fas fa-eye"></i></button></td>
  `;

  // Agregar la nueva fila a la tabla de productos agregados
  const tablaProductosAgregados = document.querySelector('.producttable');
  tablaProductosAgregados.querySelector('tbody').appendChild(filaNueva);
}

// Agregar el evento 'click' a los botones 'agregar'
const botonesAgregar = document.querySelectorAll('button.agregar');
botonesAgregar.forEach((boton) => {
  boton.addEventListener('click', agregarProducto);
});
