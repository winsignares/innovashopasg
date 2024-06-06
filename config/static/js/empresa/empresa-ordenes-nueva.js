console.log("EMPRESA-ORDENES JS");

const BASE_URL = "http://127.0.0.1:5000/api";
let productosSeleccionados = [];

async function getProductos() {
    const response = await axios.get(`${BASE_URL}/productos`);
    const productos = response.data;
    console.log(productos);
    mostrarProductos(productos);
}

function mostrarProductos(productos) {
    const productosLista = document.querySelector("#productos-lista tbody");
    productosLista.innerHTML = ""; // Limpiar la lista antes de agregar productos
    productos.forEach(producto => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <th scope="row">${producto.codigo}</th>
            <td>${producto.nombre}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.stock_actual}</td>
            <td>
                <button class="btn btn-warning" onclick="agregarProducto(${producto.id}, '${producto.codigo}', '${producto.nombre}', '${producto.descripcion}', ${producto.stock_actual})">
                    <i class="fas fa-plus"></i>
                </button>
            </td>
        `;
        productosLista.appendChild(row);
    });
}

function agregarProducto(id, codigo, nombre, descripcion, stock_actual) {
    if (productosSeleccionados.some(producto => producto.id === id)) {
        alert("El producto ya ha sido agregado.");
        return;
    }
    
    const productosAgregados = document.querySelector("#productos-agregados tbody");
    const row = document.createElement("tr");
    row.dataset.id = id;
    row.innerHTML = `
        <th scope="row">${codigo}</th>
        <td>${nombre}</td>
        <td>${descripcion}</td>
        <td>${stock_actual}</td>
        <td>
            <input type="number" class="empresa-general-input" min="1" max="${stock_actual}" value="1">
        </td>
        <td>
            <button class="btn btn-danger" onclick="eliminarProducto(${id})">
                <i class="fas fa-minus"></i>
            </button>
        </td>
    `;
    productosAgregados.appendChild(row);
    
    productosSeleccionados.push({ id, codigo, nombre, descripcion, stock_actual, cantidad: 1 });
}

function eliminarProducto(id) {
    const row = document.querySelector(`#productos-agregados tbody tr[data-id='${id}']`);
    row.remove();
    productosSeleccionados = productosSeleccionados.filter(producto => producto.id !== id);
}

async function generarOrden() {
    const productosAgregados = document.querySelectorAll("#productos-agregados tbody tr");
    const productosOrden = Array.from(productosAgregados).map(row => {
        const id = row.dataset.id;
        const cantidad = row.querySelector("input").value;
        return {
            id: id,
            cantidad: cantidad
        };
    });

    const data = {
        id_usuario_emisor: localStorage.getItem("id_usuario"),
        fecha: new Date().toISOString(),  // Fecha actual en formato ISO 8601
        estado: 1,
        productos: productosOrden
    };

    console.log("Orden generada: ", data);
    // Aquí puedes hacer una solicitud a la API para enviar la orden
    const response = await axios.post(`${BASE_URL}/ordenes`, data);
    console.log(response);

    window.location.href = "/empresa/ordenes"
}

document.addEventListener("DOMContentLoaded", getProductos);
document.querySelector("#btn-generar-orden").addEventListener("click", generarOrden);
