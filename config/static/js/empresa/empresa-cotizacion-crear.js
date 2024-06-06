console.log("EMPRESA-COTIZACIONES-CREAR JS");
const BASE_URL = "http://127.0.0.1:5000/api";

// ! GLOBAL
let clientes = [];
let clienteSeleccionado = null;

let productos = [];
let productosSeleccionados = [];

let totalValor = 0;

// ! ONLOAD
document.addEventListener("DOMContentLoaded", function () {
  getClientes();
  getProductosConProvedor();
});

// ! HTTP
async function getClientes() {
  try {
    const response = await axios.get(`${BASE_URL}/obtener-clientes`);
    const clientesRes = response.data;
    clientes = clientesRes;
    console.log(clientesRes);
    mostrarClientes(clientesRes);
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
  }
}

async function getProductosConProvedor() {
  try {
    const response = await axios.get(`${BASE_URL}/productos-con-proveedores`);
    const productosRes = response.data;
    productos = productosRes;
    console.log(productosRes);
    mostrarProductos(productosRes);
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
  }
}

async function hacerCotizacion(tipo = 0) {
  const cotizacion = {
    id_vendedor: localStorage.getItem("id_usuario"),
    id_cliente: clienteSeleccionado?.id || null,
    detalles: "",
    valor_total: totalValor,
    fecha: new Date().toISOString(),
    estado: tipo,
  };

  const productos = productosSeleccionados.map((obj) => {
    return {
      id_producto: obj.producto?.id,
      id_provedor: obj.producto?.proveedor_id,
      precio_unitario: obj.producto?.precio_unitario,
      cantidad: obj.cantidad || 0,
      descuento: obj.producto?.descuento || 0,
      iva: obj.producto?.iva || 0,
    };
  });

  const data = {
    cotizacion,
    productos,
  };
  console.log(data);

  try {
    const response = await axios.post(
      `${BASE_URL}/guardar_cotizacion_empresa`,
      data
    );
    console.log(response);

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Cotización creada correctamente",
      showConfirmButton: false,
      timer: 1500,
    });

    setTimeout(() => {
      window.location.href = "/empresa/cotizaciones"
    }, 1500)
  } catch (error) {
    console.log(error);
  }
}

// ! STEPPER
function showStep(step) {
  // Obtener todos los elementos de paso y de línea
  const steps = document.querySelectorAll(".step");
  const lines = document.querySelectorAll(".line");

  // Remover la clase 'active' de todos los elementos de paso y de línea
  steps.forEach((stepElement) => stepElement.classList.remove("active"));
  lines.forEach((line) => line.classList.remove("active"));

  // Agregar la clase 'active' a los pasos y líneas correspondientes
  for (let i = 0; i < step; i++) {
    steps[i].classList.add("active");
    if (i < step - 1) {
      lines[i].classList.add("active");
    }
  }

  // Mostrar el contenido del paso seleccionado
  const stepContents = document.querySelectorAll(".step-content");
  stepContents.forEach((content) => content.classList.remove("active"));
  document.getElementById("step" + step).classList.add("active");
}

// ! PASO #1
function mostrarClientes(clientes) {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = ""; // Limpiar cualquier contenido anterior

  clientes.forEach((cliente) => {
    const row = document.createElement("tr");

    row.innerHTML = `
          <td>${cliente.id}</td>
          <td>${cliente.nombre} ${cliente.apellidos}</td>
          <td>${cliente.cedula}</td>
          <td>${cliente.telefono}</td>
          <td>
            <button class="btn btn-primary" onclick="seleccionarCliente(${cliente.id})"><i class="fas fa-user-plus"></i></button>
          </td>
        `;

    tableBody.appendChild(row);
  });
}

function seleccionarCliente(id, anonima = false) {
  if (anonima) {
    mostrarClienteSeleccionado({}, true);
    clienteSeleccionado = null;
    return;
  }

  const clt = clientes.find((c) => c.id === id);
  clienteSeleccionado = clt;
  console.log("Cliente seleccionado", clienteSeleccionado);
  mostrarClienteSeleccionado(clienteSeleccionado);
}

function mostrarClienteSeleccionado(cliente, anonima = false) {
  const usuarioInfo = document.getElementById("usuarioInfo");

  if (anonima) {
    usuarioInfo.innerHTML = "Cotización anónima";
    return;
  }

  usuarioInfo.innerHTML = `
    <p><b>ID:</b> ${cliente.id}</p>
    <p><b>Nombre:</b> ${cliente.nombre} ${cliente.apellidos}</p>
    <p><b>Cédula:</b> ${cliente.cedula}</p>
    <p><b>Teléfono:</b> ${cliente.telefono}</p>
    <p><b>Dirección:</b> ${cliente.direccion}</p>
  `;
}

// ! PASO #2
function mostrarProductos(productos) {
  const productosTable = document.getElementById("productosTable");
  productosTable.innerHTML = ""; // Limpiar cualquier contenido anterior

  productos.forEach((producto) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${producto.id}</td>
      <td>${producto.nombre}</td>
      <td>${producto.stock_actual}</td>
      <td>${producto.proveedor}</td>
      <td>${producto.descripcion}</td>
      <td><input type="number" id="cantidadProducto${producto.id}" value="1" min="1"></td>
      <td><button class="btn btn-primary" onclick="agregarProducto(${producto.id})">Agregar</button></td>
    `;

    productosTable.appendChild(row);
  });
}

async function agregarProducto(id) {
  const cantidadInput = document.getElementById(`cantidadProducto${id}`);
  const cantidad = cantidadInput.value;

  const producto = productos.find((p) => p.id === id);

  if (!productoYaAgregado(producto)) {
    productosSeleccionados.push({ producto, cantidad });
    mostrarProductosSeleccionados();
    mostrarProductosSeleccionadosPaso3();
  }
}

function mostrarProductosSeleccionados() {
  console.log("Productos seleccionados:", productosSeleccionados);

  const productoSeleccionadoTable = document.getElementById(
    "productoSeleccionadoTable"
  );
  productoSeleccionadoTable.innerHTML = ""; // Limpiar cualquier contenido anterior

  productosSeleccionados.forEach(({ producto, cantidad }) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${producto.nombre}</td>
      <td>${cantidad}</td>
      <td><button class="btn btn-danger" onclick="eliminarProducto(${producto.id})">Eliminar</button></td>
    `;

    productoSeleccionadoTable.appendChild(row);
  });
}

function productoYaAgregado(producto) {
  return productosSeleccionados.some(
    (item) => item.producto.id === producto.id
  );
}

function eliminarProducto(id) {
  productosSeleccionados = productosSeleccionados.filter(
    (item) => item.producto.id !== id
  );
  mostrarProductosSeleccionados();
  mostrarProductosSeleccionadosPaso3();
}

// ! PASO #3
function mostrarProductosSeleccionadosPaso3() {
  const productoSeleccionadoList =
    document.getElementById("resumen-cotizacion");
  const totalCompra = document.querySelector("#total");

  productoSeleccionadoList.innerHTML = ""; // Limpiar cualquier contenido anterior

  let total = 0;

  productosSeleccionados.forEach(({ producto, cantidad }) => {
    const item = document.createElement("div");
    item.classList.add("card-item-ultimo-paso");

    item.innerHTML = `
      <img src="/static/imgs/vendedor/mueble.webp" alt="${producto.nombre}" />
      <div class="info-item">
        <h2>${producto.nombre}</h2>
        <p><strong>Precio:</strong> $${producto.precio_unitario}</p>
        <p><strong>Cantidad:</strong> ${cantidad}</p>
        <p><strong>Descripcion:</strong> ${producto.descripcion}</p>
        </div>
        `;

    productoSeleccionadoList.appendChild(item);

    total += producto.precio_unitario * cantidad;
  });

  // Actualizar el subtotal en el resumen de compra
  totalValor = total;
  totalCompra.textContent = `${total.toFixed(2)}`;
}
