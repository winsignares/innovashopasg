document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.getElementById("tableBody");
  const numElementos = document.getElementById("numElementos");
  const pagination = document.getElementById("pagination");

  numElementos.addEventListener("change", function () {
    showPage(1); // Mostrar la primera página al cambiar el número de elementos
  });

  function showPage(pageNumber) {
    const elementosPorPagina = parseInt(numElementos.value);
    const rows = tableBody.querySelectorAll("tr");

    const startIndex = (pageNumber - 1) * elementosPorPagina;
    const endIndex = pageNumber * elementosPorPagina;

    rows.forEach((row, index) => {
      if (index >= startIndex && index < endIndex) {
        row.style.display = "table-row";
      } else {
        row.style.display = "none";
      }
    });

    renderPagination(rows.length, pageNumber, elementosPorPagina);
  }

  function renderPagination(totalItems, currentPage, itemsPerPage) {
    pagination.innerHTML = "";

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.innerText = i;

      if (i === currentPage) {
        button.classList.add("active");
      }

      button.addEventListener("click", function () {
        showPage(i);
      });

      pagination.appendChild(button);
    }
  }
});

function buscar() {
  const input = document.getElementsByClassName("search");
  if (!input) {
    console.error("No se pudo encontrar el elemento de búsqueda.");
    return; // Salir de la función si no se encontró el elemento
  }

  const filter = input.value.trim().toUpperCase();
  const table = document.getElementsByClassName("myTable");
  const rows = table.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    let firstCol = rows[i].getElementsByTagName("td")[0];
    if (firstCol) {
      let idValue = firstCol.textContent || firstCol.innerText;
      if (idValue.trim().toUpperCase() === filter) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }
  }
}

//guardar cliente en la bdd

function guardarNuevoCliente() {
  var inputs = document.getElementsByTagName('input');
    var camposVacios = [];

    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].tagName.toLowerCase() === 'input' && inputs[i].hasAttribute('required')) {
            if (inputs[i].value.trim() === '') {
                camposVacios.push(inputs[i]);
            }
        }
    }

    if (camposVacios.length > 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "llene todos los datos requeridos",
          });

        // Agregar clase a los campos vacíos después de la alerta
        for (var j = 0; j < camposVacios.length; j++) {
            camposVacios[j].classList.add('campo-vacio');
        }
    } 
    
    
    else {
// Obtener los valores del formulario
var nombre = document.getElementById("nombre").value;
var nit = document.getElementById("nit").value;
var direccion = document.getElementById("direccion").value;
var telefono = document.getElementById("telefono").value;
var email = document.getElementById("email").value;
var usuario = document.getElementById("usuario").value;
var contraseña = document.getElementById("contraseña").value;

// Crear un objeto con los datos del cliente
let cliente = {
  nombre: nombre,
  nit: nit,
  direccion: direccion,
  telefono: telefono,
  correo: email,
  usuario: usuario,
  contraseña: contraseña,
};

// Enviar los datos al servidor usando Axios
axios
  .post("/api/agregar/cliente", cliente)

  .then((response) => {
    Swal.fire({
      title: "",
      text: "Cliente agregado exitosamente",
      icon: "success"
    });
    // Limpiar el formulario después de agregar el cliente
    document.getElementById("nombre").value = "";
    document.getElementById("nit").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("email").value = "";
    document.getElementById("usuario").value = "";
    document.getElementById("contraseña").value = "";
    location.reload(true);
  })
  .catch((error) => {
    console.error("Error:", error);
    alert("Error al agregar el cliente");
  });

    }
  

}

//tabla cliente
document.addEventListener("DOMContentLoaded", function () {
  // Obtener el cuerpo de la tabla
  const tableBody = document.getElementById("tableBody");
  let clienteActual = null;
  // Hacer una solicitud para obtener los datos de los clientes desde el servidor
  axios
    .get("/api/obtener-clientes")

    .then((response) => {
      let clientes = response.data;

      clientes.forEach((cliente) => {
        console.log(cliente);
        
        obtenerCantidadComprasCliente(cliente.id)
        .then(function(cantidadC) {
            const row = document.createElement("tr");
            console.log(cliente);
            row.innerHTML = `
                <td>${cliente.cedula}</td>
                <td>${cliente.nombre}</td>
                <td>${cantidadC}</td>
                <td>
                <button class="editar" onclick='editarCliente(this)' 
                            data-cedula="${cliente.cedula}"
                            data-nombre="${cliente.nombre}"
                            data-direccion="${cliente.direccion}"
                            data-telefono="${cliente.telefono}">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                <button class="eliminar" id="eliminar"  onclick="eliminarCliente(this)" data-cedula="${cliente.cedula}" data-nombre="${cliente.nombre}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
            `;
            tableBody.appendChild(row);
        })
        .catch(function(error) {
            console.error("Error al obtener la cantidad de compras del cliente:", error);
            // Manejar el error adecuadamente, por ejemplo, mostrar un mensaje al usuario
        });
        
        
      });
    
    })
    
    .catch(function (error) {
      console.error("Error al obtener los datos de los clientes:", error);
    });
});

function editarCliente(button) {
    
    const cedula = button.getAttribute('data-cedula');
    const nombre = button.getAttribute('data-nombre');
    const direccion = button.getAttribute('data-direccion');
    const telefono = button.getAttribute('data-telefono');

    document.getElementById("nombre2").value = nombre 
    document.getElementById("nit2").value = cedula; // Suponiendo que 'cedula' es equivalente a 'NIT o Identificación'
    document.getElementById("direccion2").value = direccion;
    document.getElementById("telefono2").value = telefono;
    
    
    $("#clienteModal").modal('show');
}
document.getElementById("guardar-cambios").addEventListener("click", function () {
   
    const nombre = document.getElementById("nombre2").value.split(' ')[0];
    const apellidos = document.getElementById("nombre2").value.split(' ').slice(1).join(' ');
    const cedula = document.getElementById("nit2").value;
    const direccion = document.getElementById("direccion2").value;
    const telefono = document.getElementById("telefono2").value;
    

    const data = {
        nombre: nombre,
        apellidos: apellidos,
        cedula: cedula,
        direccion: direccion,
        telefono: telefono,
        email: email
    };

    axios.put(`/api/actualizar-cliente/${cedula}`,data)
        .then(response => {
            console.log("Cliente actualizado:", response.data);
            $("#clienteModal").modal('hide');
        })
        .catch(error => {
            console.error("Error al actualizar el cliente:", error);
        });
});
document.getElementById("cerrarmodal").addEventListener("click", function () {
$("#clienteModal").modal('hide');
       
});

function eliminarCliente(boton) {
    // console.log(cliente)
    var cedula = boton.getAttribute('data-cedula');
   

    // Confirmar si el usuario realmente desea eliminar el cliente
    if (confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
      // Realizar una solicitud DELETE para eliminar el cliente con la cédula especificada
      axios
        .delete(`/api/eliminar-cliente/${cedula}`)
        .then(function (response) {
            // Mostrar un mensaje de éxito
            alert("Cliente eliminado con éxito");
                var fila = boton.closest('tr');
                // Eliminar la fila de la tabla
                fila.remove();
           
        })
        .catch(function (error) {
          // Mostrar un mensaje de error si ocurre un error en la solicitud
          console.error("Error al eliminar el cliente:", error);
          alert("Error al eliminar el cliente. Consulta la consola para más detalles.");
        });
    }
  }
  
  function obtenerCantidadComprasCliente(id) {
    console.log(id);
    // Realizar una solicitud GET a la API para obtener la cantidad de compras del cliente
    return axios.get(`/api/obtener-cantidad-compras/${id}`)
        .then(function (response) {
            console.log(response);
            // Obtener la cantidad de compras del cliente desde la respuesta
            var cantidadCompras = response.data.cantidad_compras;
            // Verificar la cantidad de compras y establecer el estado correspondiente

            // Aquí puedes hacer lo que necesites con el estado obtenido
            console.log(`El cliente con ID ${id} ha realizado ${cantidadCompras} compras.`);
            
            // Devolver la cantidad de compras
            console.log(cantidadCompras)
            return cantidadCompras;

        })
        .catch(function (error) {
            // Manejar errores si ocurre alguno en la solicitud
            console.error("Error al obtener la cantidad de compras del cliente:", error);
            // Devolver null en caso de error
            return null;
        });
}


