console.log("EMPRESA-ORDENES JS");

const BASE_URL = "http://127.0.0.1:5000/api";

function getOrderIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.pathname.split('/').pop());
    return urlParams.get('id');
}

async function getOrden(id) {
    try {
        const response = await axios.get(`${BASE_URL}/ordenes_compra/${id}`);
        const orden = response.data;

        console.log(orden);
        updateOrderDetails(orden);
    } catch (error) {
        console.error('Error fetching order:', error);
    }
}

function updateOrderDetails(orden) {
    const ordenDetails = document.querySelector('.orden-details');
    const productosTbody = document.querySelector('table tbody');

    // Limpiar contenido previo
    ordenDetails.innerHTML = '';
    productosTbody.innerHTML = '';

    // Actualizar detalles de la orden
    ordenDetails.innerHTML = `
        <p><b>Código: </b>${orden.id}</p>
        <p><b>Usuario emisor: </b>${orden.usuario_emisor.nombre} ${orden.usuario_emisor.apellidos} - CC: ${orden.usuario_emisor.cedula}</p>
        <p><b>Estado: </b>${orden.estado === 1 ? 'Completada' : 'Pendiente'}</p>
        <p><b>Fecha emisión: </b>${new Date(orden.fecha).toLocaleDateString('es-ES')}</p>
        <hr>
        <p><b>IVA (19%): $</b>${calculateIVA(orden.productos)}</p>
        <p><b>Total sin IVA: $</b>${calculateTotalSinIVA(orden.productos)}</p>
        <p><b>Total: $</b>${calculateTotal(orden.productos)}</p>
    `;

    // Actualizar listado de productos
    orden.productos.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.codigo}</td>
            <td>$ ${producto.precio_unitario.toLocaleString()}</td>
        `;
        productosTbody.appendChild(row);
    });
}

function calculateIVA(productos) {
    const total = productos.reduce((sum, producto) => sum + (producto.precio_unitario * producto.cantidad), 0);
    return (total * 0.19).toLocaleString();
}

function calculateTotalSinIVA(productos) {
    const total = productos.reduce((sum, producto) => sum + (producto.precio_unitario * producto.cantidad), 0);
    return total.toLocaleString();
}

function calculateTotal(productos) {
    const totalSinIVA = productos.reduce((sum, producto) => sum + (producto.precio_unitario * producto.cantidad), 0);
    const iva = totalSinIVA * 0.19;
    return (totalSinIVA + iva).toLocaleString();
}

document.addEventListener("DOMContentLoaded", () => {
    const orderId = window.location.pathname.split('/').pop();
    getOrden(orderId);
});
