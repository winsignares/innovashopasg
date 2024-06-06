console.log("EMPRESA-INVENTARIO-CREAR JS");

const BASE_GENERAL_URL = "http://127.0.0.1:5000/general";
const BASE_URL = "http://127.0.0.1:5000/api";

// ! CODIGO DE BARRAS
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

// ! GET PROVEDORES
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

// ! GUARDAR
let imagenUrl = "";

// Evento para manejar la carga de la imagen
document.getElementById("imagen").addEventListener("change", function (event) {
  var file = event.target.files[0];
  var formData = new FormData();
  formData.append("imagen", file);

  axios
    .post("/api/upload-imagen", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(function (response) {
      imagenUrl = response.data.url; // Asignar la URL de la imagen
      console.log('imgUrl: ' + imagenUrl);
    })
    .catch(function (error) {
      console.error("Error al subir la imagen:", error);
      alert("Hubo un error al subir la imagen");
    });
});

document
  .getElementById("btnguardar-producto")
  .addEventListener("click", function (event) {
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
        text: "llene todos los datos requeridos",
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
      var stock_actual = document.querySelector(
        'input[name="stock_actual"]'
      ).value;
      var stock_minimo = document.querySelector(
        'input[name="stock_minimo"]'
      ).value;
      var precio_unitario = document.querySelector(
        'input[name="PrecioVenta"]'
      ).value;
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

      var endpoint = "/api/productos-guardar"; // Asegúrate de que la URL coincide con la del servidor
      axios
        .post(endpoint, {
          nombre: nombre,
          codigo: codigo,
          precio_unitario: precio_unitario,
          iva: iva,
          stock_actual: stock_actual,
          stock_minimo: stock_minimo,
          id_proveedor: id_proveedor,
          cantidad: cantidad,
          img: imagenUrl, // Incluir la URL de la imagen
        })
        .then(function (response) {
          const productoId = response.data.id; // Obtener el ID del producto guardado

          // Obtener los productos alternos seleccionados
          const selectedAlternos = [];
          document
            .querySelectorAll(
              '#productoAlternativoList input[type="checkbox"]:checked'
            )
            .forEach((checkbox) => {
              selectedAlternos.push(parseInt(checkbox.value));
            });

          // Guardar productos alternos
          if (selectedAlternos.length > 0) {
            axios
              .post("/api/productos/alternos/guardar", {
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
          //   location.reload();
          window.location.href = "/empresa/inventario";

          Swal.fire({
            text: "Producto guardado exitosamente.",
            icon: "success",
          });
        })
        .catch(function (error) {
          console.error("Error al guardar producto:", error);
          alert("Hubo un error en guardar el producto");
        });
    }
  });

// ! PRODUCTO ALTERNO
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
