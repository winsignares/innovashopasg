

  //tabla stock
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

//paginacion de productos
document.addEventListener("DOMContentLoaded", function() {
  const productosContainer = document.querySelector("#productos-container .productos");
  const modal = document.querySelector("#modal");
const botonespaginacion=document.querySelector('#pagination-buttons')
  // Función para abrir la modal con los detalles del producto
  function abrirModal(productoId) {
      const producto = document.querySelector("#" + productoId);
      const nombre = producto.querySelector("h3").textContent;
      const precio = producto.querySelector("p").textContent;
      
      // Mostrar los detalles del producto en la modal
      document.getElementById("nombre").value = nombre;
      document.getElementById("codigo").value = productoId;
      document.getElementById("precio_unidad").value = precio;

      modal.style.display = "block";
  }

  // Mostrar productos en la página actual
  function mostrarProductosEnPagina(pagina) {
      const productos = document.querySelectorAll(".producto");
      const productosPorPagina = 6;
      const inicio = (pagina - 1) * productosPorPagina;
      const fin = inicio + productosPorPagina;

      productos.forEach((producto, index) => {
          if (index >= inicio && index < fin) {
              producto.style.display = "block";
          } else {
              producto.style.display = "none";
          }
      });
  }

  // Manejar evento de clic en un producto para abrir la modal
  productosContainer.addEventListener("click", function(event) {
      const productoId = event.target.closest(".producto").id;
      abrirModal(productoId);
  });

  // Mostrar la primera página al cargar la página
  mostrarProductosEnPagina(1);

  // Generar botones de paginación
  function generarBotonesPaginacion() {
      const totalProductos = document.querySelectorAll(".producto").length;
      const totalPaginas = Math.ceil(totalProductos / 6); // Considerando 10 productos por página

      
      for (let i = 1; i <= totalPaginas; i++) {
          const boton = document.createElement("button");
          boton.textContent = i;
          boton.addEventListener("click", function() {
              mostrarProductosEnPagina(i);
          });
          botonespaginacion.appendChild(boton);
      }

  }

  generarBotonesPaginacion();
});


// generar codigo de barras

document.getElementById('generarcod').addEventListener('click', function() {
    const codigo = document.getElementById('codigoInput').value;
    generarCodigoDeBarras(codigo);
});


function generarCodigoDeBarras(codigo) {
    JsBarcode("#codigoDeBarras")
        .options({font: "OCR-B"}) // Aplicar la fuente OCR-B
        .EAN13(codigo, {fontSize: 18, textMargin: 0})
        .blank(20) // Crear espacio entre los códigos de barras
        .render();


}
