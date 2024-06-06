console.log("LOGIN JS")

const BASE_URL = 'http://127.0.0.1:5000/api'
const BASE_GENERAL_URL = 'http://127.0.0.1:5000/general'
const BASE_AUTH_URL = 'http://127.0.0.1:5000/auth'

const formData = {
    usuario: '',
    clave: '',
    rol: {
        id: 0,
        nombre: ''
    },
    empresa: {
        id: 0,
        nombre: ''
    },
}

// ! ROLES
async function getRoles(){
    const response = await axios.get(BASE_URL + "/roles")
    return response?.data || [];
}

async function updateSelect(){
    const select = document.getElementById('rol-select');
    const roles = await getRoles();

    console.log('Roles', roles);

    formData.rol = {
        id: roles[0]?.id,
        nombre: roles[0]?.rol
    }

    select.innerHTML = '';

    roles.forEach(role => {
        const option = document.createElement('option');
        option.value = role.rol;
        option.text = role.rol.charAt(0).toUpperCase() + role.rol.slice(1);
        option.setAttribute('data-id', role.id); // Set custom attribute for id
        select.appendChild(option);
    });

    // Add change event listener
    select.addEventListener('change', (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        formData.rol.nombre = selectedOption.value;
        formData.rol.id = selectedOption.getAttribute('data-id');
        console.log('Selected Role:', formData.rol);
    });
}

// ! ROLES
// async function getEmpresas(){
//     const response = await axios.get(BASE_GENERAL_URL + "/empresas")
//     return response?.data || [];
// }

// async function updateSelectEmpresa(){
//     const select = document.getElementById('empresa-select');
//     const empresas = await getEmpresas();

//     console.log('Empresas', empresas);

//     select.innerHTML = '';

//     empresas.forEach(empresa => {
//         const option = document.createElement('option');
//         option.value = empresa.nombre;
//         option.text = empresa.nombre.charAt(0).toUpperCase() + empresa.nombre.slice(1);
//         option.setAttribute('data-id', empresa.id); // Set custom attribute for id
//         select.appendChild(option);
//     });

//     // Add change event listener
//     select.addEventListener('change', (event) => {
//         const selectedOption = event.target.options[event.target.selectedIndex];
//         formData.empresa.nombre = selectedOption.value;
//         formData.empresa.id = selectedOption.getAttribute('data-id');
//         console.log('Selected empresa:', formData.empresa);
//     });
// }

document.addEventListener("DOMContentLoaded", function() {
    updateSelect();
    // updateSelectEmpresa();
});

document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    // Retrieve values from form fields
    formData.usuario = document.getElementById('username').value;
    formData.clave = document.getElementById('password').value;

    // Make POST request using Axios
    console.log('formData', formData);

    try {
        const response = await axios.post(BASE_URL + '/login', formData);
        console.log('Login successful:', response.data);

        localStorage.setItem("id_usuario", response?.data?.usuario?.id);
        localStorage.setItem("rol_name", formData.rol.nombre);
        localStorage.setItem("empresa_bbdd_prefix", formData.empresa.nombre);

        setTimeout(function() {
            window.location.href = "http://127.0.0.1:5000/" + formData.rol.nombre.toLowerCase().trim();
        }, 500);

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login correcto",
            showConfirmButton: false,
            timer: 1500
        });
    } catch (error) {
        // console.error('Login failed:', error.response.data);
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Error en el login",
            showConfirmButton: false,
            timer: 1500
        });
    }
});