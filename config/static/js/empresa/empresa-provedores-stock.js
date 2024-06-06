console.log("EMPRESA-PROVEEDORES-STOCK JS");
const BASE_URL = "http://127.0.0.1:5000/api";

let proveedor = {};

// Cargar proveedores al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  const id = getOrderIdFromUrl();
  getProveedoresStock(id);
});

function getOrderIdFromUrl() {
  const path = window.location.pathname;
  return path.split("/").pop();
}

// Obtener proveedores desde la API
async function getProveedoresStock(id) {
  try {
    const response = await axios.get(`${BASE_URL}/proveedores/${id}/stock`);
    const proveedorRes = response.data;
    proveedor = proveedorRes;

    console.log(proveedor);

    // Mostrar la información del proveedor
    mostrarInformacionProveedor(proveedor);

    // Llenar la tabla con los productos
    llenarTablaProductos(proveedor.productos);
  } catch (error) {
    console.error("Error al obtener los proveedores:", error);
  }
}

function mostrarInformacionProveedor(proveedor) {
  const ordenDetailsDiv = document.querySelector(".orden-details");
  ordenDetailsDiv.innerHTML = `
    <p><b>Nombre: </b>${proveedor.nombre}</p>
    <p><b>Nit: </b>${proveedor.nit}</p>
    <p><b>Correo: </b>${proveedor.correo}</p>
    <p><b>Estado: </b>${proveedor.estado}</p>
  `;
}

function llenarTablaProductos(productos) {
  const tbody = document.querySelector(".table tbody");
  tbody.innerHTML = ""; // Limpiar cualquier dato existente

  productos.forEach((producto) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${producto.codigo}</td>
      <td>${producto.nombre}</td>
      <td>${proveedor.nombre}</td>
      <td>${producto.cantidad}</td>
      <td>${producto.precio_unitario}</td>
      <td><button class="btn btn-primary btn-sm" onclick="abrirModalAgregarStock(${producto.id})">Añadir Stock</button></td>
    `;

    tbody.appendChild(row);
  });
}

// Obtener la modal y el botón para cerrarla
const modal = document.getElementById("modalAgregarStock");
const closeModalBtn = modal.querySelector(".close");

// Función para abrir la modal
function abrirModalAgregarStock(id_producto) {
  const producto = proveedor.productos.find((p) => p.id === id_producto);

  // Mostrar la modal
  modal.style.display = "block";

  // Rellenar la información del producto en la modal
  document.getElementById("productName").textContent = producto.nombre;
  document.getElementById("currentStock").textContent = producto.cantidad;
  document.getElementById("productId").value = id_producto;
  // Cerrar la modal cuando se haga clic en la "x"
  closeModalBtn.onclick = function () {
    modal.style.display = "none";
  };

  // Añadir un listener al formulario para evitar que se recargue la página
  document
    .getElementById("addStockForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const productId = document.getElementById("productId").value;
      const quantity = document.getElementById("quantity").value;

      // Aquí puedes enviar productId y quantity al endpoint con Axios
      // Ejemplo de cómo enviar una solicitud POST con Axios
      const data = {
        id_provedor: proveedor.id,
        id_producto: productId,
        cantidad: quantity,
      };

      console.log(data);
      try {
        const response = await axios.post(
          `${BASE_URL}/inventario_proveedor/agregar_stock`,
          data
        );
        console.log("Respuesta del servidor:", response.data);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Stock actualizado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });

        const id = getOrderIdFromUrl();
        getProveedoresStock(id);
      } catch (error) {
        console.error("Error al enviar la solicitud:", error);
      }

      cerrarModalAgregarStock();
    });

  // Cerrar la modal si el usuario hace clic fuera de ella
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

// Función para cerrar la modal
function cerrarModalAgregarStock() {
  modal.style.display = "none";
}
