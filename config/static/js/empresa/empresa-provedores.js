console.log("EMPRESA-PROVEEDORES JS");
const BASE_URL = "http://127.0.0.1:5000/api";

let provedores = [];
let provedorEditarId = 0;

// Cargar proveedores al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  getVendedores();
});

// Obtener proveedores desde la API
async function getVendedores() {
  try {
    const response = await axios.get(`${BASE_URL}/proveedores`);
    const proveedoresRes = response.data;
    provedores = proveedoresRes;

    mostrarProveedores(proveedoresRes);
  } catch (error) {
    console.error("Error al obtener los proveedores:", error);
  }
}

// Mostrar proveedores en la tabla
function mostrarProveedores(proveedores) {
  const tbody = document.querySelector(".tbody-provedores");
  tbody.innerHTML = ""; // Limpiar cualquier contenido anterior

  proveedores.forEach((proveedor) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${proveedor.id}</td>
      <td>${proveedor.nombre}</td>
      <td>${proveedor.nit}</td>
      <td>${proveedor.correo}</td>
      <td>${proveedor.estado}</td>
      <td>
        <button class="btn btn-warning editar-btn">Editar</button>
        <a href="/empresa/provedores/${proveedor.id}" class="btn btn-primary"><i class="fas fa-archive"></i></a>
      </td>
    `;
    tbody.appendChild(row);
  });

  // Agregar eventos a los botones de editar
  const editarButtons = document.querySelectorAll(".editar-btn");
  editarButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const row = this.closest("tr");
      const id = row.querySelector("td:nth-child(1)").textContent;
      const nombre = row.querySelector("td:nth-child(2)").textContent;
      const nit = row.querySelector("td:nth-child(3)").textContent;
      const correo = row.querySelector("td:nth-child(4)").textContent;
      const estado = row.querySelector("td:nth-child(5)").textContent;

      provedorEditarId = id;

      abrirModalEditarProveedor({ id, nombre, nit, correo, estado });
    });
  });
}

// Función para abrir la modal de edición del proveedor
function abrirModalEditarProveedor(proveedor) {
  const modal = document.getElementById("modalProductos");
  const nombreInput = modal.querySelector("#nombre");
  const nitInput = modal.querySelector("#nit");
  const correoInput = modal.querySelector("#correo");
  const estadoInput = modal.querySelector("#estado");

  nombreInput.value = proveedor.nombre;
  nitInput.value = proveedor.nit;
  correoInput.value = proveedor.correo;
  estadoInput.value = proveedor.estado;

  modal.style.display = "block";
}

// Cerrar la modal cuando se hace clic en el botón de cierre
const closeBtn = document.querySelector("#modalProductos .close");
closeBtn.addEventListener("click", function () {
  const modal = document.getElementById("modalProductos");
  modal.style.display = "none";
});

// Guardar los cambios cuando se hace clic en el botón de "Guardar cambios"
const guardarCambiosBtn = document.getElementById("guardarCambios");
guardarCambiosBtn.addEventListener("click", async function () {
  const modal = document.getElementById("modalProductos");
  modal.style.display = "none";

  const nombre = modal.querySelector("#nombre").value;
  const nit = modal.querySelector("#nit").value;
  const correo = modal.querySelector("#correo").value;
  const estado = modal.querySelector("#estado").value;

  const data = {
    nombre,
    nit,
    correo,
    estado
  };

  try {
    const response = await axios.put(`${BASE_URL}/provedores/${provedorEditarId}`, data);
    console.log(response?.data);

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Cambios guardados",
      showConfirmButton: false,
      timer: 1500,
    });
    
    getVendedores();
  } catch (error) {
    console.log(error);
  }
});
