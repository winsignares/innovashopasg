console.log("EMPRESA-COTIZACIONES JS");
const BASE_URL = "http://127.0.0.1:5000/api";

async function getCotizaciones() {
  try {
    const response = await axios.get(`${BASE_URL}/cotizaciones-completa`);
    const cotizaciones = response.data;
    console.log(cotizaciones);
    mostrarCotizaciones(cotizaciones);
  } catch (error) {
    console.error("Error al obtener las cotizaciones:", error);
  }
}

function mostrarCotizaciones(cotizaciones) {
  const tbody = document.querySelector("table tbody");
  tbody.innerHTML = ""; // Limpiar contenido existente

  cotizaciones.forEach((cotizacion) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
                    <td>${cotizacion.id}</td>
                    <td>${cotizacion.cliente.nombre} ${
      cotizacion.cliente.apellidos
    }</td>
                    <td>${cotizacion.vendedor.nombre} ${
      cotizacion.vendedor.apellidos
    }</td>
                    <td>${cotizacion.detalles}</td>
                    <td>${cotizacion.fecha}</td>
                    <td>${cotizacion.valor_total.toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                    })}</td>
                    <td>
                        <a href="/empresa/cotizaciones/${
                          cotizacion.id
                        }" class="btn btn-primary btn-sm">Ver</a>
                        </td>
                        `;
    // <button class="btn btn-danger btn-sm">Eliminar</button>

    tbody.appendChild(fila);
  });
}

document.addEventListener("DOMContentLoaded", getCotizaciones);
