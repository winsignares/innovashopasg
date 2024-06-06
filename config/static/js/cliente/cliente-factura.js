document.addEventListener('DOMContentLoaded', function() {
    cargarFacturas();
    
});

function cargarFacturas() {
    const clienteId = localStorage.getItem("id_usuario");

    axios.get(`/api/facturas-cliente/${clienteId}`)
        .then(response => {
            console.log(response);
            const facturas = response.data;
            const tableBody = document.querySelector('#myTable tbody');
            tableBody.innerHTML = '';

            facturas.forEach(factura => {
                const row = `
                    <tr>
                        <td>${factura.codigo}</td>
                        <td>${factura.vendedor}</td>
                        <td>${factura.cantidad_productos}</td>
                        <td>${factura.valor_total}</td>
                        <td>${factura.fecha}</td>
                        <td><button onclick="generarPDF(${factura.id})" class="btn-danger"><i class="fas fa-file"></i></button></td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => {
            console.error('Error al cargar las facturas:', error);
        });
}



// function generarPDF(facturaId) {
//     // Lógica para generar el PDF de la factura
//     console.log('Generar PDF para la factura con ID:', facturaId);
// }