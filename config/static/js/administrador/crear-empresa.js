console.log("EMPRESA-LISTADO JS")

const BASE_GENERAL_URL = 'http://127.0.0.1:5000/general'
const BASE_URL = 'http://127.0.0.1:5000/api'

document.getElementById('crear-empresa-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Obtén los valores de los campos del formulario
    const nombre = document.getElementById('nombre').value;
    const nit = document.getElementById('nit').value;
    const correo = document.getElementById('correo').value;
    const url_asociada = document.getElementById('url_asociada').value;
    const vigencia_licencia_fin = document.getElementById('vigencia_licencia_fin').value;

    // Crea el objeto de datos a enviar
    const empresaData = {
      nombre,
      nit,
      correo,
      url_asociada,
      vigencia_licencia_fin
    };

    console.log(empresaData);

    try {
        const response = await axios.post(BASE_GENERAL_URL + '/empresas/create', empresaData);
        console.log('Empresa creada:', response.data);

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Empresa creada",
            showConfirmButton: false,
            timer: 1500
        });

        setTimeout(function() {
            window.location.href = "http://127.0.0.1:5000/administrador/empresas";
        }, 1000);
    } catch (error) {
      console.error('Error creando la empresa:', error);

      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error al crear la empresa",
        showConfirmButton: false,
        timer: 1500
      });
    }
  });