console.log("EMPRESA-PROVEEDORES-CREAR JS");
const BASE_URL = "http://127.0.0.1:5000/api";

// Evento para capturar el clic en el botón "Guardar"
document.addEventListener("DOMContentLoaded", function () {
  const guardarBtn = document.querySelector(".btn-success");
  guardarBtn.addEventListener("click", function (event) {
    event.preventDefault();
    guardarProveedor();
  });
});

async function guardarProveedor() {
  // Capturar los datos del formulario
  const nombre = document.querySelector(
    'input[type="text"][placeholder="Nombre"]'
  ).value;
  const nit = document.querySelector(
    'input[type="number"][placeholder="Nit"]'
  ).value;
  const direccion = document.querySelector(
    'input[type="text"][placeholder="Dirección"]'
  ).value;
  const estado = document.querySelector('select[name="estado"]').value;

  // Crear el objeto JSON con los datos del proveedor
  const nuevoProveedor = {
    nombre: nombre,
    nit: nit,
    direccion: direccion,
    estado: estado,
  };

  try {
    // Enviar los datos al servidor
    const response = await axios.post(
      `${BASE_URL}/proveedores`,
      nuevoProveedor
    );
    console.log("Proveedor guardado:", response.data);

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Provedor creado correctamente",
      showConfirmButton: false,
      timer: 1500,
    });

    setTimeout(() => {
      window.location.href = "/empresa/provedores";
    }, 120);
  } catch (error) {
    console.error("Error al guardar el proveedor:", error);
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Error al crear el proveedor",
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
