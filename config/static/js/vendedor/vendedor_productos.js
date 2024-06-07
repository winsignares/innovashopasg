//tabla stock
document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.getElementById("tableBody");
  const numElementos = document.getElementById("numElementos");
  const pagination = document.getElementById("pagination");

  numElementos.addEventListener("change", function () {
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

      button.addEventListener("click", function () {
        showPage(i);
      });

      pagination.appendChild(button);
    }
  }
});
//buscar
function buscar() {
  const input = document.getElementById("search");
  const filter = input.value.toUpperCase();
  const table = document.getElementById("myTable");
  const rows = table.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    let firstCol = rows[i].getElementsByTagName("td")[0];
    if (firstCol) {
      let idValue = firstCol.textContent || firstCol.innerText;
      if (idValue.trim().toUpperCase() === filter) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }
  }
}

//paginacion de productos
document.addEventListener("DOMContentLoaded", function () {
  const productosContainer = document.querySelector(
    "#productos-container .productos"
  );
  const modal = document.querySelector("#modal");
  const botonespaginacion = document.querySelector("#pagination-buttons");

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

  // Mostrar la primera página al cargar la página
  mostrarProductosEnPagina(1);

  // Generar botones de paginación
  function generarBotonesPaginacion() {
    const totalProductos = document.querySelectorAll(".producto").length;
    const totalPaginas = Math.ceil(totalProductos / 6); // Considerando 10 productos por página

    for (let i = 1; i <= totalPaginas; i++) {
      const boton = document.createElement("button");
      boton.textContent = i;
      boton.addEventListener("click", function () {
        mostrarProductosEnPagina(i);
      });
      botonespaginacion.appendChild(boton);
    }
  }

  generarBotonesPaginacion();
});

// generar el precio de venta
document
  .getElementById("precio_unitario")
  .addEventListener("input", calcularPrecioVenta);
document.getElementById("Iva").addEventListener("change", calcularPrecioVenta);
function calcularPrecioVenta() {
  const valorUnitario =
    parseFloat(document.getElementById("precio_unitario").value) || 0;
  const ivaAplicado = document.getElementById("Iva").checked;
  const iva = ivaAplicado ? 0.19 : 0;
  const precioVenta = valorUnitario * (1 + iva);
  document.getElementById("precioVenta").value = precioVenta.toFixed(2);
  return precioVenta;
}

// generar codigo de barras
generar_descargar_codigoboton = document.getElementById("generarcod");
generar_descargar_codigoboton.addEventListener("click", function () {
  const codigo = document.getElementById("codigoInput").value;
  console.log(parseInt(codigo));
  if (codigo.length === 12) {
    generarCodigoDeBarras(codigo);
  } else {
    Swal.fire({
      title: "",
      text: "El codigo debe ser un numero de 12 digitos",
      icon: "info",
    });
  }
});
function generarCodigoDeBarras(codigo) {
  const img = document.getElementById("codigoDeBarras");
  const canvas = document.createElement("canvas");
  JsBarcode(canvas, codigo, {
    format: "EAN13",
    font: "OCR-B",
    fontSize: 18,
    textMargin: 0,
    margin: 20, // Crear espacio entre los códigos de barras
  });
  img.src = canvas.toDataURL("image/png");
  descargarCodigoDeBarras(img.src, codigo);
}
function descargarCodigoDeBarras(dataURL, codigo) {
  const downloadLink = document.createElement("a");
  downloadLink.href = dataURL;
  downloadLink.download = `codigo_${codigo}.png`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

// obetener los nombres de los proveedores y ponerlos en el select
document.addEventListener("DOMContentLoaded", function () {
  let proveedorSelect = document.getElementById("proveedor");
  let endpoint = "/api/nombres-proveedores";
  axios
    .get(endpoint)
    .then(function (response) {
      const proveedores = response.data;
      proveedores.forEach((proveedor) => {
        const option = document.createElement("option");
        option.value = proveedor.id;
        option.textContent = proveedor.nombre;
        proveedorSelect.appendChild(option);
      });
    })
    .catch(function (error) {
      console.error("Hubo un error al obtener los proveedores:", error);
    });
});

//sacar los productos de la base de datos y mostrarlos
document.addEventListener("DOMContentLoaded", function () {
  endpoint = "/api/productos-listado";
  axios
    .get(endpoint)
    .then(function (response) {
      const productos = response.data;
      console.log(productos);
      const container = document.getElementById("productos-container");

      productos.forEach(function (producto) {
        const card = document.createElement("div");
        card.classList.add("col-md-4");

        url_imagen = producto.img ? "http://127.0.0.1:5000/" + producto.img : '/static/imgs/empresa/producto-defecto.png';


        card.innerHTML = `
                    <div class="card">
                        <img style="max-width:300px; max-height:300px" src="${url_imagen}">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">$ ${producto.precio_unitario} </p>
                            <button onclick="mostrarInformacionProducto(this)" class="btn btn-primary"
                            data-id="${producto.id}"
                            data-nombre="${producto.nombre}"
                            data-descripcion="${producto.descripcion}"
                            data-codigo="${producto.codigo}"
                            data-precio_unitario="${producto.precio_unitario}"
                            data-stock_actual="${producto.stock_actual}"
                            data-stock_minimo="${producto.stock_minimo}"
                            data-img="${producto.img}">
                                <i class="fas fa-eye"></i>
                                Ver
                            </button>
                        </div>
                    </div>
                `;
        container.appendChild(card);
      });
    })
    .catch(function (error) {
      console.error("Error al obtener los productos:", error);
    });
});

//modal de la info de los productos
function mostrarInformacionProducto(button) {
  console.log(button);
  const id = button.getAttribute("data-id");
  const nombre = button.getAttribute("data-nombre");
  const descripcion = button.getAttribute("data-descripcion");
  const codigo = button.getAttribute("data-codigo");
  const precio_unitario = button.getAttribute("data-precio_unitario");
  const stock_actual = button.getAttribute("data-stock_actual");
  const stock_minimo = button.getAttribute("data-stock_minimo");
  const img = button.getAttribute("data-img");

  const contenido = `
        <h5>${nombre}</h5>
        <p><strong>Descripción:</strong> ${descripcion}</p>
        <p><strong>Código:</strong> ${codigo}</p>
        <p><strong>Precio unitario:</strong> $ ${precio_unitario} </p>
        <p><strong>Stock actual:</strong> ${stock_actual}</p>
        <p><strong>Stock mínimo:</strong> ${stock_minimo}</p>
        <img src="${img}" alt="${nombre}" style="max-width: 100%;">
    `;

  document.getElementById("productoInfoBody").innerHTML = contenido;
  $("#productoInfoModal").modal("show");
}

//ver stock
// Función para obtener los datos de productos con proveedores desde el servidor
function obtenerProductosConProveedores() {
  axios
    .get("/api/productos-con-proveedores")
    .then((response) => {
      // Limpiar el cuerpo de la tabla
      var tableBody = document.getElementById("tableBody");
      tableBody.innerHTML = "";

      // Iterar sobre los datos recibidos y agregar filas a la tabla
      response.data.forEach((producto) => {
        // Determinar el color del círculo basado en el stock actual y el stock mínimo
        let circleColor = "";
        if (producto.stock_actual === 0) {
          circleColor = "red";
        } else if (producto.stock_actual === producto.stock_minimo) {
          console.log(producto.stock_actual);
          circleColor = "yellow";
        } else {
          circleColor = "green";
        }

        // Generar la fila de la tabla con el círculo de color
        var newRow = `<tr>
                            <td>${producto.id}</td>
                            <td>${producto.nombre}</td>
                            <td>
                                <span class="stock-circle" style="background-color: ${circleColor};"></span>
                                ${producto.stock_actual}
                            </td>
                            <td>${producto.proveedor}</td>
                            <td>${producto.descripcion}</td>
                            <td>
                            <button class="btn btn-success" onclick="actualizarStock(this)" 
                            data-proveedor="${producto.proveedor_id}"
                            data-producto="${producto.id} 
                            ">
                            <i class="fas fa-truck"></i>
                        </button>
                        <input type="number" class="ordendecompra" placeholder="Cantidad" id="cantidadordendecompra-${producto.id}">
                          </tr>`;
        tableBody.innerHTML += newRow;
      });
    })
    .catch((error) => {
      console.error(
        "Error al obtener los datos de productos y proveedores:",
        error
      );
    });
}

//orden de compra
function actualizarStock(boton) {
  let productoId = boton.getAttribute("data-producto");
  let proveedorId = boton.getAttribute("data-proveedor");
  let cantidadInput = document.getElementById(
    `cantidadordendecompra-${productoId}`.trim()
  );
  const cantidad = parseInt(cantidadInput.value);

  if (isNaN(cantidad) || cantidad <= 0) {
    Swal.fire({
      text: "Porfavor, ingrese una cantidad valida",
      icon: "warning",
    });
    return;
  }
  // Realizar la solicitud POST para actualizar el stock y crear la orden de compra
  axios
    .post("/api/actualizar", {
      producto_id: productoId,
      cantidad: cantidad,
      id_usuario_emisor: localStorage.getItem("id_usuario")
    })
    .then((response) => {
      Swal.fire({
        text: "Stock actualizado y orden de compra creada exitosamente.",
        icon: "success",
      });

      location.reload();
    })
    .catch((error) => {
      console.error(
        "Error al actualizar el stock y crear la orden de compra:",
        error
      );
      alert("Hubo un error al actualizar el stock y crear la orden de compra.");
    });
}

// Llamar a la función para obtener los datos cuando la página se cargue
document.addEventListener("DOMContentLoaded", obtenerProductosConProveedores);

// modlpara cargar la modal de los productos alternativos
document
  .getElementById("btnproductoalternativo")
  .addEventListener("click", function () {
    // Realizar solicitud HTTP GET a la API de productos
    axios
      .get("/api/productos")
      .then((response) => {
        console.log(response);
        const data = response.data; // Obtener los datos de la respuesta
        console.log(data);
        const productList = document.getElementById("productoAlternativoList");
        productList.innerHTML = "";
        data.forEach((product) => {
          const listItem = document.createElement("li");
          listItem.className = "list-group-item";
          listItem.innerHTML = `
                    <div class="d-flex justify-content-between">
                        <div>
                            <img src="" alt="${product.nombre}" style="width: 50px; height: 50px; margin-right: 10px;">
                            <strong>${product.nombre}</strong> - $${product.precio_unitario}
                        </div>
                        <div>
                            <input type="checkbox" value="${product.id}">
                        </div>
                    </div>
                `;
          productList.appendChild(listItem);
        });
        // Mostrar la modal después de cargar los productos
        const modalproductos = new bootstrap.Modal(
          document.getElementById("productoAlternativoModal")
        );
        modalproductos.show();
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  });

// Event listener para cerrar la modal
document.getElementById("cerrarModal").addEventListener("click", function () {
  const modal = new bootstrap.Modal(
    document.getElementById("productoAlternativoModal")
  );
  modal.hide();
});

//guardar los productos
document.getElementById("btnguardar-producto").addEventListener("click", function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe y recargue la página

    var inputs = document.getElementsByTagName("input");
    var camposVacios = [];

    for (var i = 0; i < inputs.length; i++) {
        if (
            inputs[i].tagName.toLowerCase() === "input" &&
            inputs[i].hasAttribute("required")
        ) {
            if (inputs[i].value.trim() === "") {
                camposVacios.push(inputs[i]);
            }
        }
    }

    if (camposVacios.length > 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Llene todos los datos requeridos",
        });

        // Agregar clase a los campos vacíos después de la alerta
        for (var j = 0; j < camposVacios.length; j++) {
            camposVacios[j].classList.add("campo-vacio");
        }
    } else {
        const form = document.querySelector("form");

        var nombre = document.querySelector('input[name="Nombre"]').value;
        var codigo = document.querySelector('input[name="Codigo"]').value;
        var iva = document.querySelector('input[name="Iva"]:checked') ? 19 : 0;
        var stock_actual = document.querySelector('input[name="stock_actual"]').value;
        var stock_minimo = document.querySelector('input[name="stock_minimo"]').value;
        var precio_unitario = document.querySelector('input[name="PrecioVenta"]').value;
        var id_proveedor = document.querySelector("#proveedor").value; // ID del proveedor seleccionado
        var cantidad = document.querySelector('input[name="stock_actual"]').value; // Cantidad actual

        // Validar que el ID del proveedor no sea la opción predeterminada
        if (id_proveedor === "seleccionar") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Selecciona un proveedor",
            });
            return;
        }

        // Obtener el archivo de imagen
        var fileInput = document.querySelector('input[name="Imagen"]');
        var file = fileInput.files[0];

        // Crear FormData para la imagen
        var formData = new FormData();
        formData.append("imagen", file);

        // Subir la imagen primero
        axios.post("/api/upload-imagen", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(function (response) {
            var imagenUrl = response.data.url;

            // Ahora que la imagen está cargada, guardar el producto con la URL de la imagen
            var endpoint = "/api/productos-guardar"; // Asegúrate de que la URL coincide con la del servidor
            axios.post(endpoint, {
                nombre: nombre,
                codigo: codigo,
                precio_unitario: precio_unitario,
                iva: iva,
                stock_actual: stock_actual,
                stock_minimo: stock_minimo,
                id_proveedor: id_proveedor,
                cantidad: cantidad,
                img: imagenUrl // Añadir la URL de la imagen
            })
            .then(function (response) {
                Swal.fire({
                    text: "Producto guardado exitosamente.",
                    icon: "success",
                });
                const productoId = response.data.id; // Obtener el ID del producto guardado

                // Obtener los productos alternos seleccionados
                const selectedAlternos = [];
                document.querySelectorAll('#productoAlternativoList input[type="checkbox"]:checked').forEach((checkbox) => {
                    selectedAlternos.push(parseInt(checkbox.value));
                });

                // Guardar productos alternos
                if (selectedAlternos.length > 0) {
                    axios.post("/api/productos/alternos/guardar", {
                        id_producto_principal: productoId,
                        ids_productos_alternos: selectedAlternos,
                    })
                    .then(function (response) {
                        alert("Productos alternos guardados exitosamente");
                    })
                    .catch(function (error) {
                        console.error("Error al guardar productos alternos:", error);
                        alert("Hubo un error en guardar los productos alternos");
                    });
                }

                form.reset();
                location.reload();
            })
            .catch(function (error) {
                console.error("Error al guardar producto:", error);
                alert("Hubo un error en guardar el producto");
            });
        })
        .catch(function (error) {
            console.error("Error al subir la imagen:", error);
            alert("Hubo un error en subir la imagen");
        });
    }
});


document.getElementById("cerrarModal").addEventListener("click", function () {
  $("#productoAlternativoModal").modal("hide");
});
