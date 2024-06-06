
function buscar1() {
    const input = document.getElementById("search1");
    console.log(input.value);
    const filter = input.value.toUpperCase();
    const table = document.getElementById("tablaProductos");
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
  function buscar() {
    const input = document.getElementById("search");
    console.log(input.value);
    const filter = input.value.toUpperCase();
    const table = document.getElementById("myTable");
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

document.addEventListener('DOMContentLoaded', () => {
    // Llama a la función para cargar los productos
    cargarProductos();
    
    // Agrega un listener para el botón de mostrar gráfico
    // document.getElementById('botonGrafico').addEventListener('click', () => {
    //     mostrarGrafico();
    // });
});

// Función para cargar los productos desde el servidor
function cargarProductos() {
    // Realiza una solicitud GET al servidor
    axios.get('/api/informe')
        .then(response => {
            // Maneja la respuesta exitosa
            const productos = response.data; // Suponiendo que la respuesta contiene los datos en formato JSON
            mostrarProductosEnTabla(productos);
        })
        .catch(error => {
            // Maneja los errores
            console.error('Error al cargar los productos:', error);
        });
}

// Función para mostrar los productos en la tabla
function mostrarProductosEnTabla(productos) {
    const tablaBody = document.querySelector('#tablaProductos tbody');
    
    // Limpia el contenido de la tabla antes de agregar nuevos productos
    tablaBody.innerHTML = '';

    // Itera sobre cada producto y agrega una fila a la tabla
    productos.forEach(producto => {
        const fila = `
            <tr>
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.precio_unitario}</td>
                <td>${producto.veces_compradas}</td>
                <td><button class="generar" onclick="mostrarGrafico()"><i class="fas fa-chart-bar"></i></button></td>
            </tr>
        `;
        tablaBody.innerHTML += fila;
    });
}

// // Función para mostrar el gráfico (aquí puedes implementar tu lógica para mostrar el gráfico)
// function mostrarGrafico() {
//     alert('Aquí iría la lógica para mostrar el gráfico');
// }
 



// Realiza la solicitud Axios para obtener los datos de las facturas o cotizaciones
axios.get('/api/facturas-cotizaciones')
.then(response => {
    // Maneja la respuesta y crea las filas de la tabla
    const facturasCotizaciones = response.data; // Suponiendo que la respuesta contiene una lista de facturas o cotizaciones

    const tablaBody = document.querySelector('#myTable tbody');
    facturasCotizaciones.forEach((facturaCotizacion, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${facturaCotizacion.cliente}</td>
            <td>${facturaCotizacion.vendedor}</td>
            <td>${facturaCotizacion.fecha}</td>
            <td> $${facturaCotizacion.valor}</td>
            <td><button onclick="descargarPDF(${facturaCotizacion.id})" class="generar" ><i class="fas fa-file-pdf"></i></button></td>
        `;
        tablaBody.appendChild(fila);
    });
})
.catch(error => {
    console.error('Error al obtener las facturas o cotizaciones:', error);
});


    // // Función para descargar el PDF
    // function descargarPDF(idFactura) {
    //     // Lógica para descargar el PDF con el ID de la factura
    //    
    // }