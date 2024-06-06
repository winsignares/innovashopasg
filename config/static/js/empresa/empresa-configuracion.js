console.log("EMPRESA-CONFIGURACION JS");

const BASE_GENERAL_URL = "http://127.0.0.1:5000/general";
const BASE_URL = "http://127.0.0.1:5000/api";

let id_empresa = 0;

async function getEmpresaInfo() {
    const response = await axios.get(`${BASE_GENERAL_URL}/empresas-info`);
    const empresa = response.data;

    console.log(empresa);
    id_empresa = empresa.id

    // Actualizar valores en los campos correspondientes
    document.getElementById("nombre-empresa").value = empresa.nombre;
    document.getElementById("nit-empresa").value = empresa.nit;
    document.getElementById("correo-empresa").value = empresa.correo;
    document.getElementById("porcentaje-ganancia").value = empresa.porcentaje_ganancia;
    document.getElementById("iva-establecido").value = empresa.iva_establecido;
    document.getElementById("descuento-general").value = empresa.descuento_general;
    document.getElementById("vigencia-licencia-fin").value = empresa.vigencia_licencia_fin;
}

async function guardarCambios() {
    const nombreEmpresa = document.getElementById("nombre-empresa").value;
    const nitEmpresa = document.getElementById("nit-empresa").value;
    const correoEmpresa = document.getElementById("correo-empresa").value;
    const porcentajeGanancia = document.getElementById("porcentaje-ganancia").value;
    const ivaEstablecido = document.getElementById("iva-establecido").value;
    const descuentoGeneral = document.getElementById("descuento-general").value;
    const vigenciaLicenciaFin = document.getElementById("vigencia-licencia-fin").value;

    const empresaData = {
        nombre: nombreEmpresa,
        nit: nitEmpresa,
        correo: correoEmpresa,
        porcentaje_ganancia: parseInt(porcentajeGanancia), // Parsear a entero
        iva_establecido: parseInt(ivaEstablecido), // Parsear a entero
        descuento_general: parseInt(descuentoGeneral), // Parsear a entero
        vigencia_licencia_fin: vigenciaLicenciaFin
    };

    console.log(empresaData);

    try {
        const response = await axios.put(`${BASE_GENERAL_URL}/empresas/${id_empresa}`, empresaData);
        console.log(response.data); 

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Cambios guardados",
            showConfirmButton: false,
            timer: 1500
        });
    } catch (error) {
        console.error("Error al guardar cambios:", error);
        alert("¡Ocurrió un error al guardar los cambios!");

        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Cambios no guardados",
            showConfirmButton: false,
            timer: 1500
        });
    }
}

document.addEventListener("DOMContentLoaded", getEmpresaInfo);

document.querySelector(".btn.btn-warning").addEventListener("click", guardarCambios);
