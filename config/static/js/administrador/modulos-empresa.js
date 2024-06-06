console.log("MODULOS-EMPRESA JS");

const BASE_GENERAL_URL = "http://127.0.0.1:5000/general";
const BASE_URL = "http://127.0.0.1:5000/api";

let current_empresa_id = 0;

// ! HTTP
async function getEmpresas() {
  const response = await axios.get(BASE_GENERAL_URL + "/empresas");
  return response?.data || [];
}

async function getModulosEmpresa(id_empresa) {
  const response = await axios.get(BASE_GENERAL_URL + "/empresas/" + id_empresa + "/modulos");
  return response?.data || [];
}

async function getEmpresaInfo(id) {
  const response = await axios.get(`${BASE_GENERAL_URL}/empresas/${id}`);
  return response?.data;
}

// ! LISTADO DE EMPRESAS
async function cargarEmpresas() {
  const empresas = await getEmpresas();
  console.log("Empresas", empresas);
  const tbody = document.getElementById("empresas-tbody");

  if (tbody) {
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
                <a class="btn btn-primary" data-id="${empresa.id}" title="Ver modulos">
                <i class="fas fa-eye"></i>
                </a>
            </td>
            `;

      tbody.appendChild(tr);
    });

    document.querySelectorAll(".btn-primary").forEach((button) => {
      button.addEventListener("click", function () {
        const empresaId = this.getAttribute("data-id");
        // Redirige al usuario a la página de módulos con el ID de la empresa
        window.location.href = `/administrador/modulos/${empresaId}`;
      });
    });
  }
}

// ! MODULOS
async function cargarModulos() {
  const currentUrl = window.location.href;
  const lastSlashIndex = currentUrl.lastIndexOf("/");
  const empresaId = +currentUrl.substring(lastSlashIndex + 1);

  current_empresa_id = empresaId;

  if (typeof empresaId === "number" && !isNaN(empresaId)) {
      console.log("ID de la empresa:", empresaId);
      const empresa = await getEmpresaInfo(empresaId);
      const modulosData = await getModulosEmpresa(empresaId);

      const modulosEmpresa = modulosData.modulos_empresa;
      const todosLosModulos = modulosData.todos_los_modulos;

      console.log(empresa);
      console.log(modulosEmpresa);
      console.log(todosLosModulos);

      // * INFO EMPRESA:
      document.getElementById("nombre-empresa").textContent = empresa.nombre;
      document.getElementById("nit-empresa").textContent = empresa.nit;
      document.getElementById("correo-empresa").textContent = empresa.correo;
      document.getElementById("porcentaje-empresa").textContent = empresa.porcentaje_ganancia + '%';
      document.getElementById("iva-empresa").textContent = empresa.iva_establecido + '%';
      document.getElementById("descuento-empresa").textContent = empresa.descuento_general + '%';
      document.getElementById("vigencia-empresa").textContent = empresa.vigencia_licencia_fin;

      // * MODULOS
      // Seleccionar el contenedor de los módulos
      const modulosContainer = document.getElementById("modulos-container");

      // Crear un conjunto de IDs de módulos activos para fácil referencia
      const modulosActivos = new Set(modulosEmpresa.map(moduloEmpresa => moduloEmpresa.id_modulo));

      // Iterar sobre todos los módulos y crear botones para cada uno
      todosLosModulos.forEach(modulo => {
          const boton = document.createElement("button");
          boton.className = "boton";
          boton.textContent = modulo.nombre;

          if (modulosActivos.has(modulo.id)) {
              boton.classList.add("boton-activo");

              const div = document.createElement("div");
              div.className = "btn btn-warning";
              div.textContent = "Extender";
              div.onclick = function() {
                  showModal(modulo);
              };

              const fecha_exp = document.createElement("div");
              let fecha_fin = modulosEmpresa.find(mod => 
                mod.id_modulo === modulo.id
              ).fecha_fin;
              fecha_exp.innerHTML = "Fecha fin: " + fecha_fin


              boton.appendChild(div);
              boton.appendChild(fecha_exp);
          } else {
              boton.classList.add("boton-inactivo");

              const div = document.createElement("div");
              div.className = "btn btn-secondary";
              div.textContent = "Activar";
              div.onclick = function(){
                showActivateModal(modulo);
              }

              boton.appendChild(div);
          }

          modulosContainer.appendChild(boton);
      });
  }
}

// ! SHOW MODAL EXTEND
function showModal(modulo){
  console.log("fn showModal. Modulo ", modulo);
  console.log("current_empresa_id: ", current_empresa_id);

  const modal = document.getElementById("modalProductos");

  modal.style.display = "block";
  document.querySelector(".close").onclick = function(){
    modal.style.display = "none";
  }

  document.getElementById("nombre_modulo_modal").innerText = modulo?.nombre || "";

  const extendBtns = document.getElementsByClassName("extend-btn")
  
  for (const btn of extendBtns) {
    btn.onclick = async function(event){
      const duration = event.target.getAttribute("data-extension");

      const data = {
        duration,
        id_modulo: modulo?.id,
        id_empresa: current_empresa_id
      }

      console.log(data);

      const response = await axios.put(BASE_GENERAL_URL + '/empresas/modulos/extend', data);
      console.log(response);

      modal.style.display = "none";

      const modulosContainer = document.getElementById("modulos-container");
      while (modulosContainer.firstChild) {
          modulosContainer.removeChild(modulosContainer.firstChild);
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Periodo extendido correctamente",
        showConfirmButton: false,
        timer: 1500
    });

      cargarEmpresas()
      cargarModulos()
    }
  }
}

// Llamadas a las funciones después de definirlas
document.addEventListener("DOMContentLoaded", cargarEmpresas);
document.addEventListener("DOMContentLoaded", cargarModulos);
