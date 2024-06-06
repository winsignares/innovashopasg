console.log("EMPRESA-INVENTARIO-STOCK JSS");

const BASE_GENERAL_URL = "http://127.0.0.1:5000/general";
const BASE_URL = "http://127.0.0.1:5000/api";

// ! ONLOAD
document.addEventListener("DOMContentLoaded", function () {
  getClientes();
});

// ! HTTP
async function getClientes() {
  try {
    const response = await axios.get(`${BASE_URL}/obtener-clientes`);
    const clientesRes = response.data;
    clientes = clientesRes;
    console.log(clientesRes);
    populateTable(clientesRes); // Llamar a la función para poblar la tabla
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
  }
}

// Función para poblar la tabla con los datos de los clientes
function populateTable(clientes) {
  const tbody = document.querySelector("table tbody");
  tbody.innerHTML = ''; // Limpiar el contenido existente

  clientes.forEach(cliente => {
    const tr = document.createElement("tr");

    const codigoTd = document.createElement("td");
    codigoTd.textContent = cliente.id;
    tr.appendChild(codigoTd);

    const razonSocialTd = document.createElement("td");
    razonSocialTd.textContent = cliente.nombre + " " + cliente.apellidos;
    tr.appendChild(razonSocialTd);

    const nitTd = document.createElement("td");
    nitTd.textContent = cliente.cedula;
    tr.appendChild(nitTd);

    const fechaUnionTd = document.createElement("td");
    fechaUnionTd.textContent = new Date().toLocaleDateString(); // Placeholder, actual value should come from the server if available
    tr.appendChild(fechaUnionTd);

    const informeTd = document.createElement("td");
    const informeLink = document.createElement("a");
    informeLink.href = "#"; // Placeholder, actual link should be provided
    informeLink.textContent = "Descargar";
    informeLink.classList.add("btn", "btn-primary", "btn-sm");
    informeLink.onclick = async () => {
      const res = await axios.get(`${BASE_URL}/cliente-informes/${cliente.id}`);
      console.log(res.data);
      generarPDF(res.data);
    }

    informeTd.appendChild(informeLink);
    tr.appendChild(informeTd);

    tbody.appendChild(tr);
  });
}

// ! PDF
function generarPDF(data) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const clienteInfo = [
    ['Nombre', data.nombre],
    ['Apellidos', data.apellidos],
    ['Cédula', data.cedula],
    ['Dirección', data.direccion],
    ['Teléfono', data.telefono]
  ];

  doc.text(`Informe del Cliente: ${data.nombre} ${data.apellidos}`, 10, 10);
  doc.autoTable({
    startY: 20,
    head: [['Campo', 'Valor']],
    body: clienteInfo,
  });

  data.cotizaciones.forEach((cotizacion, index) => {
    const cotizacionInfo = [
      ['ID', cotizacion.id],
      ['Detalles', cotizacion.detalles],
      ['Fecha', new Date(cotizacion.fecha).toLocaleDateString()],
      ['Valor Total', cotizacion.valor_total],
      ['Estado', cotizacion.estado ? 'Activo' : 'Inactivo'],
      ['Vendedor', `${cotizacion.vendedor.nombre} ${cotizacion.vendedor.apellidos}`]
    ];

    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 10,
      head: [[`Cotización ${index + 1}`, "valor"]],
      body: cotizacionInfo.map(info => [info[0], info[1]]),
    });

    const productosInfo = cotizacion.productos.map(producto => [
      producto.id,
      producto.id_producto,
      producto.cantidad,
      producto.precio_unitario,
      producto.descuento,
      producto.iva,
    ]);

    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 10,
      head: [['ID', 'ID Producto', 'Cantidad', 'Precio Unitario', 'Descuento', 'IVA']],
      body: productosInfo,
    });
  });

  doc.save('informe_cliente.pdf');
}