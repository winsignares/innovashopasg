
console.log("EMPRESA-COTIZACIONES-VER JS");
const BASE_URL = "http://127.0.0.1:5000/api";

async function getClientes(cotizacionId) {
  try {
    const response = await axios.get(
      `${BASE_URL}/empresa/cotizaciones/${cotizacionId}`
    );
    const cotizacion = response.data;
    console.log(cotizacion);
    mostrarCotizacion(cotizacion);
  } catch (error) {
    console.error("Error al obtener la cotización:", error);
  }
}

function getOrderIdFromUrl() {
  const path = window.location.pathname;
  return path.split('/').pop();
}

function mostrarCotizacion(cotizacion) {
  document.getElementById('cliente-nombre').textContent = cotizacion.cliente.nombre + ' ' + cotizacion.cliente.apellidos;
  document.getElementById('vendedor-nombre').textContent = cotizacion.vendedor.nombre + ' ' + cotizacion.vendedor.apellidos;
  document.getElementById('cotizacion-fecha').textContent = cotizacion.fecha;
  document.getElementById('cotizacion-estado').textContent = cotizacion.estado === 1 ? 'Compra' : 'Cotización';

  const productosLista = document.getElementById('productos-lista');
  productosLista.innerHTML = '';

  cotizacion.productos.forEach(producto => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${producto.nombre}</td>
      <td>${producto.descripcion}</td>
      <td>${producto.codigo}</td>
      <td>${producto.precio_unitario}</td>
      <td>${producto.descuento}</td>
      <td>${producto.iva}</td>
    `;
    productosLista.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  const id = getOrderIdFromUrl();
  getClientes(id);
});