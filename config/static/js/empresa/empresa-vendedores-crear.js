console.log("EMPRESA-PROVEEDORES-CREAR JS");
const BASE_URL = "http://127.0.0.1:5000/api";

document.addEventListener("DOMContentLoaded", function () {
  const guardarBtn = document.querySelector("#guardar");
  guardarBtn.addEventListener("click", guardarVendedor);
});

function guardarVendedor() {
  const nombres = document.querySelector("#nombres").value;
  const apellidos = document.querySelector("#apellidos").value;
  const cedula = document.querySelector("#cedula").value;
  const direccion = document.querySelector("#direccion").value;
  const usuario = document.querySelector("#usuario").value;
  const clave = document.querySelector("#clave").value;
  const telefono = document.querySelector("#telefono").value;

  const nuevoVendedor = {
    nombres: nombres,
    apellidos: apellidos,
    telefono: telefono,
    cedula: cedula,
    direccion: direccion,
    usuario: usuario,
    contraseña: clave,
  };

  enviarVendedor(nuevoVendedor);
}

async function enviarVendedor(vendedor) {
  try {
    const response = await axios.post(`${BASE_URL}/vendedores`, vendedor);
    console.log("Vendedor creado:", response.data);

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Login correcto",
      showConfirmButton: false,
      timer: 1500,
    });

    setTimeout(() => {
      window.location.href = "/empresa/vendedores";
    }, 1500);
    // Aquí puedes agregar lógica adicional después de enviar el vendedor, como redireccionar a otra página o mostrar un mensaje de éxito
  } catch (error) {
    console.error("Error al crear el vendedor:", error);
    // Aquí puedes manejar errores, como mostrar un mensaje al usuario
  }
}
