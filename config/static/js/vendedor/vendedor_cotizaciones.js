
document.getElementById("botonagregar").addEventListener("click", function() {
    
    window.location.href = "/vendedor/hacercotizaciones";
});

//generar listado de cotizaciones

$(document).ready(function() {
    // Fetch and display cotizaciones
    axios.get('/api/cotizaciones')
        .then(response => {
            const cotizacionesBody = $('#cotizaciones-body');
            response.data.forEach(cotizacion => {
                let estado=cotizacion.estado
                if(cotizacion.estado===0){
                    estado="Sin completar"
                    estadoIcono = "<i class='fas fa-exclamation-circle text-warning'></i>";
                }
                else if(cotizacion.estado===1){
                   estado="Compra realizada"
                   estadoIcono = "<i class='fas fa-check-circle text-success'></i>";
                }
                
                cotizacionesBody.append(`
                    <tr>
                        <td>${cotizacion.id_cliente}</td>
                        <td>${cotizacion.id_vendedor}</td>
                        <td>${estadoIcono} ${estado}</td>
                        <td>${cotizacion.valor_total}</td>
                        <td>
                            <button class="btn btn-primary" onclick="verProductos(${cotizacion.id})">Ver</button>
                        </td>
                    </tr>
                `);
            });
        })
        .catch(error => {
            console.error('There was a problem with the axios request:', error);
        });

    window.verProductos = function(id) {
        axios.get(`/api/cotizaciones/${id}/productos`)
            .then(response => {
                console.log(response.data);  // Verifica que estás recibiendo los datos correctos
                const productosList = $('#productos-list');
                productosList.empty();
                response.data.forEach(producto => {
                    productosList.append(`
                        <li class="list-group-item">
                            <h5>Producto: ${producto.producto.nombre}</h5>
                            <p>Descripción: ${producto.producto.descripcion}</p>
                            <p>Proveedor ID: ${producto.id_proveedor}</p>
                            <p>Precio Unitario: ${producto.precio_unitario}</p>
                            <p>Cantidad: ${producto.cantidad}</p>
                            <p>Descuento: ${producto.descuento}</p>
                            <p>IVA: ${producto.iva}</p>
                        </li>
                    `);
                });
                $('#productosModal').modal('show');
            })
            .catch(error => {
                console.error('There was a problem with the axios request:', error);
            });
    };
});




