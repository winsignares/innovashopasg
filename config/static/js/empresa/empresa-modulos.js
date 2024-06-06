console.log("EMPRESA-MODULOS JS");

const BASE_GENERAL_URL = "http://127.0.0.1:5000/general";
const BASE_URL = "http://127.0.0.1:5000/api";

let id_empresa = 0;

async function getEmpresaInfo() {
    const response = await axios.get(`${BASE_GENERAL_URL}/empresas-info`);
    const empresa = response.data;

    console.log(empresa);
    id_empresa = empresa.id;

    getModulosEmpresa();
}

async function getModulosEmpresa() {
    const response = await axios.get(`${BASE_GENERAL_URL}/empresas/${id_empresa}/modulos`);
    const modulos = response.data;

    console.log(modulos);

    fillTable(modulos);
}

function fillTable(data) {
    const tbody = document.querySelector('.main-section-dashboard .table tbody');

    // Limpiar la tabla antes de llenarla
    tbody.innerHTML = '';

    // Recorrer todos los módulos disponibles
    data.todos_los_modulos.forEach(modulo => {
        // Buscar si el módulo está asociado a la empresa
        const moduloEmpresa = data.modulos_empresa.find(mod => mod.id_modulo === modulo.id);

        // Crear una fila para cada módulo
        const row = document.createElement('tr');

        // Añadir el nombre del módulo
        const nombreCell = document.createElement('td');
        nombreCell.textContent = modulo.nombre;
        row.appendChild(nombreCell);

        // Añadir la fecha de obtención del módulo si está asociado a la empresa
        // const fechaObtencionCell = document.createElement('td');
        // fechaObtencionCell.textContent = moduloEmpresa ? '15/3/2028' /* Utiliza la fecha de obtención del objeto moduloEmpresa */ : 'No obtenido';
        // row.appendChild(fechaObtencionCell);

        // Añadir la fecha de fin de licencia si está asociado a la empresa
        const fechaFinCell = document.createElement('td');
        fechaFinCell.textContent = moduloEmpresa ? moduloEmpresa.fecha_fin : 'No disponible';
        row.appendChild(fechaFinCell);

        // Agregar la fila a la tabla
        tbody.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", getEmpresaInfo);
