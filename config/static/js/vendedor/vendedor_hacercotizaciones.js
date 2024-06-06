let productosSeleccionados = [];
let clienteSeleccionado = null;
let cantidad= null;
let productosGlobal = [];
let total=null;


function buscar() {
    const input = document.getElementById('busca');
    const filter = input.value.toUpperCase();
    const table = document.getElementById('Table-productos');
    const rows = table.getElementsByTagName('tr');
  
    for (let i = 0; i < rows.length; i++) {
        let firstCol = rows[i].getElementsByTagName('td')[0];
        if (firstCol) {
            let idValue = firstCol.textContent || firstCol.innerText;
            if (idValue.trim().toUpperCase() === filter) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    }
  }
function buscar1() {
    const input = document.getElementById("search1");
    console.log(input);
    const filter = input.value.toUpperCase();
    const table = document.getElementById("Table-productos");
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


function showStep(step) {
  // Obtener todos los elementos de paso y de línea
  const steps = document.querySelectorAll('.step');
  const lines = document.querySelectorAll('.line');

  // Remover la clase 'active' de todos los elementos de paso y de línea
  steps.forEach(stepElement => stepElement.classList.remove('active'));
  lines.forEach(line => line.classList.remove('active'));

  // Agregar la clase 'active' a los pasos y líneas correspondientes
  for (let i = 0; i < step; i++) {
      steps[i].classList.add('active');
      if (i < step - 1) {
          lines[i].classList.add('active');
      }
  }
  
  // Mostrar el contenido del paso seleccionado
  const stepContents = document.querySelectorAll('.step-content');
  stepContents.forEach(content => content.classList.remove('active'));
  document.getElementById('step' + step).classList.add('active');
}
//meotdos de tablas
document.addEventListener("DOMContentLoaded", function() {
  const tableBody = document.getElementById("tableBody");
  const numElementos = document.getElementById("numElementos");
  const pagination = document.getElementById("pagination");

  numElementos.addEventListener("change", function() {
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

          button.addEventListener("click", function() {
              showPage(i);
          });

          pagination.appendChild(button);
      }
  }
});

function buscar() {
const input = document.getElementById('search');
const filter = input.value.toUpperCase();
const table = document.getElementById('myTable');
const rows = table.getElementsByTagName('tr');

for (let i = 0; i < rows.length; i++) {
    let firstCol = rows[i].getElementsByTagName('td')[0];
    if (firstCol) {
        let idValue = firstCol.textContent || firstCol.innerText;
        if (idValue.trim().toUpperCase() === filter) {
          rows[i].style.display = '';
      } else {
          rows[i].style.display = 'none';
      }
    }
}
}
//agrgar prodctos pag
document.addEventListener("DOMContentLoaded", function() {
    const tableBody = document.getElementById("tableBody-productos");
    const numElementos = document.getElementById("itemelementos");
    const pagination = document.getElementById("paginacion");
  
    numElementos.addEventListener("change", function() {
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
  
            button.addEventListener("click", function() {
                showPage(i);
            });
  
            pagination.appendChild(button);
        }
    }
  });
  





//añade la infomacion de usuario
document.addEventListener("DOMContentLoaded", function() {
  const tableRows = document.querySelectorAll("#tableBody tr");

  tableRows.forEach(row => {
      const userID = row.querySelector("td:first-child").textContent; // Obtener el ID del usuario
      const addButton = row.querySelector(".agregar");

      addButton.addEventListener("click", function() {
          const userName = row.querySelector("td:nth-child(2)").textContent; // Obtener el nombre del usuario
          const comprasHechas = row.querySelector("td:nth-child(3)").textContent; // Obtener las compras hechas

          const usuarioSeleccionadoDiv = document.querySelector(".usuario-seleccionado");
          usuarioSeleccionadoDiv.innerHTML = `
              <h4>Usuario Seleccionado:</h4>
              <p><strong>ID:</strong> ${userID}</p>
              <p><strong>Nombre:</strong> ${userName}</p>
              <p><strong>Compras Hechas:</strong> ${comprasHechas}</p>
          `;
      });
  });
});



function hacercotizacion(tipo) {
    console.log(clienteSeleccionado);
    console.log(clienteSeleccionado.id_cliente);
    if (!clienteSeleccionado) {
        alert('Seleccione un cliente antes de crear la orden de compra.');
        return;
    }

    nueva_cotizacion = {
        id_vendedor: localStorage.getItem("id_usuario"),
        id_cliente: clienteSeleccionado.id_cliente,
        estado: tipo,
        total:total
    };
    console.log(nueva_cotizacion);
    // Envía la nueva cotización al servidor para guardarla en la base de datos
    axios.post('/api/guardar_cotizacion',nueva_cotizacion)
    .then(data => {
        let id_cotizacion=data.data.id;
        console.log('Cotización guardada:', data);
        // Ahora guardamos los productos relacionados con esta cotización
            productosSeleccionados.forEach(producto => {
                axios.get(`/api/producto/${producto.id}/proveedor`)
                .then(response => {
                    const id_proveedor = response.data;
                    console.log(id_proveedor);
                    producto.id_cotizacion = data.id; // Agregamos el ID de la cotización
                    const dataproducto ={
                        id_cotizacion:id_cotizacion,
                        id_producto:producto.id,
                        id_proveedor:id_proveedor,
                        precio_unitario:producto.precio_unitario,
                        cantidad:parseInt(cantidad, 10),
                        descuento:0,
                        iva:producto.iva
                    }
            
                    axios.post('/api/actualizar/compra', {
                        producto_id: producto.id,
                        cantidad: parseInt(cantidad)
                    })
                    axios.post('/api/guardar_producto_cotizacion', dataproducto)
                    .then(data => {
                        console.log('Producto de cotización guardado:', data);
                        Swal.fire({
                            title: "cotizacion guardada correctamente",
                            text: "",
                            icon: "success"
                        });
                        location.reload();
                    })
                    .catch(error => {
                        console.error('Error al guardar producto de cotización:', error);
                    });
                })
                .catch(error => {
                    console.error('Error al obtener el proveedor:', error);
                }); 
            });

        
    })
    .catch(error => {
        console.error('Error al guardar cotización:', error);
    });
}

function agregarProducto(event, boton, id_producto) {
 
    // Obtener los detalles del producto
    let producto = productosGlobal.find((p) => p.id == id_producto);
    // var productos = JSON.parse(producto);
    productosSeleccionados.push(producto)

    const filaProducto = boton.closest('tr');
    const nombre = filaProducto.querySelector('td:nth-child(2)').textContent;
    const idProducto = boton.dataset.cantidad; 

    const cantidadInput = document.getElementById(`cantidadordendecompra-${idProducto}`);
   
    cantidad = cantidadInput.value;

    total=total+ (producto.precio_unitario *cantidad)
            actualizarTotal(total)
    // Crear una nueva fila con los detalles del producto
    const filaNueva = document.createElement('tr');
    filaNueva.innerHTML = `
        <td>${nombre}</td>
        <td>${cantidad}</td>
        <td><button type="button" class="btn btn-danger btn-eliminar ">
        <i class="fas fa-trash-alt"></i>
      </button></td>
    `;
    // Agregar la nueva fila a la tabla de productos agregados
    const tablaProductosAgregados = document.querySelector('.producttable tbody');
    tablaProductosAgregados.appendChild(filaNueva);
    // Añadir el producto al div con cards
    const divProductos = document.querySelector('.cards-container');
    const cardProducto = document.createElement('div');
    cardProducto.classList.add('card-item');
    // Suponiendo que tienes los detalles adicionales del producto en las columnas de la tabla
    const descripcion = filaProducto.querySelector('td:nth-child(5)').textContent;

    cardProducto.innerHTML = `
        <img src="" alt="${nombre}">
        <div class="info-item">
            <h2>${nombre}</h2>
            <p><strong>Cantidad:</strong> ${cantidad}</p>
            <p><strong>Detalles:</strong></p>
            <ul>
                <li>${descripcion}</li>
            </ul>
        </div>
    `;
   
    divProductos.appendChild(cardProducto);
    // Agregar evento de clic al botón de eliminar
const btnEliminar = filaNueva.querySelector('.btn-eliminar');
btnEliminar.addEventListener('click', function() {
    // Obtener la cantidad del producto que se está eliminando
    const cantidadEliminada = parseInt(filaNueva.querySelector('td:nth-child(2)').textContent);
    
    // Eliminar fila de la tabla
    tablaProductosAgregados.removeChild(filaNueva);
    // Eliminar tarjeta del producto
    divProductos.removeChild(cardProducto);
    
    // Eliminar el producto de la lista de productos seleccionados
    const index = productosSeleccionados.findIndex(p => p.id === id_producto);
    if (index !== -1) {
        productosSeleccionados.splice(index, 1);
    }
    
    // Actualizar el total restando el costo del producto eliminado
    total -= (producto.precio_unitario * cantidadEliminada);
    actualizarTotal(total);
});
}


function actualizarTotal(total) {
    // Verifica si total es null o undefined
    if (total == null) {
        total = 0;
    }
    
    // Actualiza el contenido del elemento HTML
    document.getElementById("total-placeholder").textContent = total;
}


// tabla stock
document.addEventListener("DOMContentLoaded", function () {
    axios.get('/api/productos-con-proveedores')
    .then(response => {
        // Limpiar el cuerpo de la tabla
        var tableBody = document.getElementById('tableBody-productos');
        tableBody.innerHTML = '';

        productosGlobal = response.data
      
        // Iterar sobre los datos recibidos y agregar filas a la tabla
        response.data.forEach(producto => {
           
            // Determinar el color del círculo basado en el stock actual y el stock mínimo
            let circleColor = '';
            if (producto.stock_actual === 0) {
                circleColor = 'red';
            } else if (producto.stock_actual === producto.stock_minimo) {
                console.log(producto.stock_actual);
                circleColor = 'yellow';
            } else {
                circleColor = 'green';
            }

           
            // Generar la fila de la tabla con el círculo de color
            var newRow = `<tr>
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>
                    <span class="stock-circle" style="background-color: ${circleColor};"></span>
                    ${producto.stock_actual}
                </td>
                <td>${producto.proveedor}</td>
                <td>${producto.descripcion}</td>
                <td>
                    <button class="btn btn-success" onclick="agregarProducto(event, this, ${producto.id})" data-cantidad="${producto.id}" data-producto="${JSON.stringify(producto)}>
                        <i class="fas fa-shopping-cart"></i> <!-- Corregí el nombre de la clase del icono -->
                    </button>
                    <input type="number" class="cantidadordendecompra-${producto.id}" placeholder="Cantidad" id="cantidadordendecompra-${producto.id}">
                </td>
            </tr>`;
            tableBody.innerHTML += newRow;
          
        });
      
    })

    .catch(error => {
        console.error('Error al obtener los datos de productos y proveedores:', error);
    });
});


//manda los clientes a la lista
document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("tableBody");

    // Función para agregar un cliente seleccionado
 function agregarClienteSeleccionado(cliente) {

        const usuarioSeleccionadoDiv = document.querySelector(".usuario-seleccionado");
        usuarioSeleccionadoDiv.innerHTML = `
            <h4>Usuario seleccionado:</h4>
            <p>Cédula: ${cliente.cedula}</p>
            <p>Nombre: ${cliente.nombre}</p>
            <p>Cantidad de compras: ${cliente.cantidadCompras}</p>
        `;
    }

    // Función para manejar clic en el botón "Agregar Cliente"
    function handleAgregarCliente(event) {
        const button = event.target;
        const row = button.closest("tr");
        const cedula = row.querySelector("td:first-child").textContent;
        const nombre = row.querySelector("td:nth-child(3)").textContent;
        const cantidadCompras = row.querySelector("td:nth-child(4)").textContent;
        const id_cliente = row.querySelector("td:nth-child(2)").textContent;
        const cliente = { id_cliente, cedula, nombre, cantidadCompras };
        clienteSeleccionado=cliente;
        agregarClienteSeleccionado(cliente);
    }

    // Hacer una solicitud para obtener los datos de los clientes desde el servidor
    axios.get("/api/obtener-clientes")
        .then((response) => {
            let clientes = response.data;
            clientes.forEach((cliente) => {

                obtenerCantidadComprasCliente(cliente.id)
                    .then(function(cantidadC) {
                        cliente.cantidadCompras = cantidadC; // Agregar cantidad de compras al objeto cliente
                        const row = document.createElement("tr");
                        row.innerHTML = `
                            <td>${cliente.cedula}</td>
                            <td>${cliente.id}</td>
                            <td>${cliente.nombre}</td>
                            <td>${cantidadC}</td>
                            <td>      
                                <button class="agregarC agregar">
                                    <i class="fas fa-user-plus"></i>
                                </button>
                            </td>
                        `;
                        tableBody.appendChild(row);
                        const agregarButton = row.querySelector(".agregar");
                        agregarButton.addEventListener("click", handleAgregarCliente);
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
document.addEventListener("DOMContentLoaded", function () {
    const botonCotizacionAnonima = document.querySelector(".btn-primary");
    const usuarioSeleccionadoDiv = document.querySelector(".usuario-seleccionado");

    botonCotizacionAnonima.addEventListener("click", function () {
        usuarioSeleccionadoDiv.innerHTML = "<h4>Usuario seleccionado:</h4><p>cotización anónima</p>";
    });
});

  function obtenerCantidadComprasCliente(id) {
    // Realizar una solicitud GET a la API para obtener la cantidad de compras del cliente
    return axios.get(`/api/obtener-cantidad-compras/${id}`)
        .then(function (response) {
            
            // Obtener la cantidad de compras del cliente desde la respuesta
            var cantidadCompras = response.data.cantidad_compras;
            // Verificar la cantidad de compras y establecer el estado correspondiente

            // Aquí puedes hacer lo que necesites con el estado obtenido
    
            
            // Devolver la cantidad de compras
         
            return cantidadCompras;

        })
        .catch(function (error) {
            // Manejar errores si ocurre alguno en la solicitud
            console.error("Error al obtener la cantidad de compras del cliente:", error);
            // Devolver null en caso de error
            return null;
        });
}
