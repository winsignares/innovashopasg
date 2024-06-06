function cargarCotizacionesPendientes() {
    const clienteId = localStorage.getItem("id_usuario")
    

    if (!clienteId) {
        console.error('No se encontró clienteId en el localStorage');
        return;
    }

    axios.get(`/api/cotizaciones-pendientes/${clienteId}`)
        .then(response => {
            console.log(response.data); // Inspecciona la respuesta

            const cotizaciones = response.data;

            const tableBody = document.querySelector('#table-pendientes tbody');

            tableBody.innerHTML = '';

            cotizaciones.forEach(cotizacion => {
                const row = `
                    <tr>
                        <td>${cotizacion.codigo}</td>
                        <td>${cotizacion.vendedor}</td>
                        <td>${cotizacion.cantidad_productos}</td>
                        <td>${cotizacion.valor_total}</td>
                        <td>${cotizacion.fecha}</td>
                        <td><button onclick="generarPDF(${cotizacion.id})" class="btn-danger" ><i class="fas fa-file-pdf"></i></button></td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => {
            console.error('Error al cargar las cotizaciones pendientes:', error);
        });
}
document.addEventListener('DOMContentLoaded', function() {
    cargarCotizacionesPendientes();
    
});