console.log("EMPRESA-VENDEDORES JS");
const BASE_URL = "http://127.0.0.1:5000/api";

let vendedores = [];
let vendedorEditarId = 0;

// Cargar vendedores al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  getVendedores();
  setupModal();
});

// Obtener vendedores desde la API
async function getVendedores() {
  try {
    const response = await axios.get(`${BASE_URL}/obtener-vendedores`);
    vendedores = response.data;

    console.log(vendedores);
    mostrarVendedores();
  } catch (error) {
    console.error("Error al obtener los vendedores:", error);
  }
}

// Mostrar los vendedores en la tabla
function mostrarVendedores() {
  const tbody = document.querySelector("table tbody");
  tbody.innerHTML = "";

  vendedores.forEach(vendedor => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${vendedor.id}</td>
      <td>${vendedor.nombre}</td>
      <td>${vendedor.apellidos}</td>
      <td>${vendedor.cedula}</td>
      <td>${vendedor.direccion}</td>
      <td>${vendedor.usuario}</td>
      <td>
        <button class="btn btn-primary" onclick="abrirModalEditar(${vendedor.id})">Editar</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

// Configurar el modal
function setupModal() {
  const modal = document.getElementById("modalVendedor");
  const span = document.getElementsByClassName("close")[0];
  const guardarCambiosBtn = document.getElementById("guardarCambios");

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  guardarCambiosBtn.onclick = function() {
    guardarCambiosVendedor();
  }
}

// Abrir el modal de edición
function abrirModalEditar(id) {
  const modal = document.getElementById("modalVendedor");
  vendedorEditarId = id;
  const vendedor = vendedores.find(v => v.id === id);

  if (vendedor) {
    document.getElementById("nombre").value = vendedor.nombre;
    document.getElementById("apellidos").value = vendedor.apellidos;
    document.getElementById("cedula").value = vendedor.cedula;
    document.getElementById("direccion").value = vendedor.direccion;
    document.getElementById("telefono").value = vendedor.telefono;
    document.getElementById("usuario").value = vendedor.usuario;

    modal.style.display = "block";
  }
}

// Guardar los cambios del vendedor
async function guardarCambiosVendedor() {
  const nombre = document.getElementById("nombre").value;
  const apellidos = document.getElementById("apellidos").value;
  const cedula = document.getElementById("cedula").value;
  const direccion = document.getElementById("direccion").value;
  const telefono = document.getElementById("telefono").value;
  const usuario = document.getElementById("usuario").value;

  try {
    await axios.put(`${BASE_URL}/vendedores/${vendedorEditarId}`, {
      nombre,
      apellidos,
      cedula,
      direccion,
      telefono,
      usuario
    });

    // Cerrar el modal
    const modal = document.getElementById("modalVendedor");
    modal.style.display = "none";

    // Recargar la lista de vendedores
    getVendedores();
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Cambios guardados",
      showConfirmButton: false,
      timer: 1500
  });
  } catch (error) {
    console.error("Error al actualizar el vendedor:", error);
  }
}

function eliminarVendedor(id) {
  // Lógica para eliminar el vendedor
  console.log("Eliminar vendedor con ID:", id);
}
