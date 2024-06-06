console.log("EMPRESA-LISTADO JS");

const BASE_GENERAL_URL = "http://127.0.0.1:5000/general";
const BASE_URL = "http://127.0.0.1:5000/api";

// ! HTTP
async function getEmpresas() {
  const response = await axios.get(BASE_GENERAL_URL + "/empresas");
  return response?.data || [];
}

async function getEmpresaById(id) {
  const response = await axios.get(`${BASE_GENERAL_URL}/empresas/${id}`);
  return response?.data;
}

document.addEventListener("DOMContentLoaded", async function () {
  const empresas = await getEmpresas();
  console.log("Empresas", empresas);
  const tbody = document.getElementById("empresas-tbody");

  empresas.forEach((empresa) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${empresa.nombre}</td>
        <td>${empresa.nit}</td>
        <td>${empresa.correo}</td>
        <td>${empresa.porcentaje_ganancia}</td>
        <td>${empresa.iva_establecido}</td>
        <td>${empresa.descuento_general}</td>
        <td>${empresa.vigencia_licencia_fin}</td>
        <td>
          <a href="${empresa.url_asociada}" class="btn btn-warning edit-btn" data-id="${empresa.id}" title="Editar">
            <i class="fas fa-pen"></i>
          </a>
        </td>
        <td>
          <a class="btn btn-danger delete-btn" data-id="${empresa.id}" title="Eliminar producto">
            <i class="fas fa-trash"></i>
          </a>
        </td>
      `;

    tbody.appendChild(tr);
  });

  // Añade el manejador de eventos para los botones de edición
  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", async function (event) {
      event.preventDefault();
      const empresaId = this.getAttribute("data-id");
      const empresa = await getEmpresaById(empresaId);
      abrirModal(empresa);
    });
  });

  // Añade el manejador de eventos para los botones de eliminación
  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", async function (event) {
      event.preventDefault();
      const empresaId = this.getAttribute("data-id");
      confirmarEliminacion(empresaId);
    });
  });
});

async function confirmarEliminacion(id) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar!',
    cancelButtonText: 'No, cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      console.log('Empresa a eliminar con ID:', id);
      eliminarEmpresa(id);
    } else {
      console.log('Eliminación cancelada');
    }
  });
}

async function eliminarEmpresa(id) {
  try {
    console.log(id);
    const response = await axios.delete(`${BASE_GENERAL_URL}/empresas/${id}`);
    console.log('Empresa eliminada:', response.data);

    // Refrescar la página después de la eliminación
    window.location.reload();
  } catch (error) {
    console.error('Error eliminando la empresa:', error);
  }
}


// document.addEventListener("DOMContentLoaded", async function () {
//   const empresas = await getEmpresas();
//   console.log("Empresas", empresas);
//   const tbody = document.getElementById("empresas-tbody");

//   empresas.forEach((empresa) => {
//     const tr = document.createElement("tr");

//     tr.innerHTML = `
//         <td>${empresa.nombre}</td>
//         <td>${empresa.nit}</td>
//         <td>${empresa.correo}</td>
//         <td>${empresa.porcentaje_ganancia}</td>
//         <td>${empresa.iva_establecido}</td>
//         <td>${empresa.descuento_general}</td>
//         <td>${empresa.vigencia_licencia_fin}</td>
//         <td>
//           <a href="${empresa.url_asociada}" class="btn btn-warning edit-btn" data-id="${empresa.id}" title="Editar">
//             <i class="fas fa-pen"></i>
//           </a>
//         </td>
//         <td>
//           <a class="btn btn-danger" title="Eliminar producto">
//             <i class="fas fa-trash"></i>
//           </a>
//         </td>
//       `;

//     tbody.appendChild(tr);
//   });

//   // Añade el manejador de eventos para los botones de edición
//   document.querySelectorAll(".edit-btn").forEach((button) => {
//     button.addEventListener("click", async function (event) {
//       event.preventDefault();
//       const empresaId = this.getAttribute("data-id");
//       const empresa = await getEmpresaById(empresaId);
//       abrirModal(empresa);
//     });
//   });
// });

function abrirModal(empresa) {
  // Rellenar los campos del formulario con los datos de la empresa
  document.getElementById("nombre").value = empresa.nombre;
  document.getElementById("nit").value = empresa.nit;
  document.getElementById("correo").value = empresa.correo;
  document.getElementById("porcentaje_ganancia").value =
    empresa.porcentaje_ganancia;
  document.getElementById("iva_establecido").value = empresa.iva_establecido;
  document.getElementById("descuento_general").value =
    empresa.descuento_general;
  document.getElementById("vigencia_licencia_fin").value =
    empresa.vigencia_licencia_fin;

  // Mostrar el modal
  const modal = document.getElementById("modalEmpresa");
  modal.style.display = "block";

  // Guardar cambios
  const guardarCambiosBtn = document.getElementById("guardarCambiosBtn");
  guardarCambiosBtn.onclick = function () {
    actualizarEmpresa(empresa.id);
  };
}

async function actualizarEmpresa(id) {
  const empresaActualizada = {
    nombre: document.getElementById("nombre").value,
    nit: document.getElementById("nit").value,
    correo: document.getElementById("correo").value,
    porcentaje_ganancia: document.getElementById("porcentaje_ganancia").value,
    iva_establecido: document.getElementById("iva_establecido").value,
    descuento_general: document.getElementById("descuento_general").value,
    vigencia_licencia_fin: document.getElementById("vigencia_licencia_fin")
      .value,
  };

  try {
    const response = await axios.put(
      `${BASE_GENERAL_URL}/empresas/${id}`,
      empresaActualizada
    );
    console.log("Empresa actualizada:", response.data);

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Cambios guardados",
      showConfirmButton: false,
      timer: 1500,
    });

    setTimeout(function () {
      window.location.reload();
    }, 1000);

    const modal = document.getElementById("modalEmpresa");
    modal.style.display = "none";
  } catch (error) {
    console.error("Error creando la empresa:", error);

    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Error al editar la empresa",
      showConfirmButton: false,
      timer: 1500,
    });
  }
}

// Manejo del cierre del modal
document.querySelector(".close").onclick = function () {
  const modal = document.getElementById("modalEmpresa");
  modal.style.display = "none";
};
