console.log("EMPRESA-INVENTARIO-STOCK JSS");

const BASE_GENERAL_URL = "http://127.0.0.1:5000/general";
const BASE_URL = "http://127.0.0.1:5000/api";


document.addEventListener("DOMContentLoaded", getProductos);

async function getProductos() {
    const response = await axios.get(`${BASE_URL}/productos`);
    const productos = response.data;

    console.log(productos);

    const tbody = document.querySelector("tbody");

    productos.forEach(producto => {
        const row = document.createElement("tr");

        // Coloca el código del producto en la primera columna
        const codigoCell = document.createElement("td");
        codigoCell.textContent = producto.codigo;
        row.appendChild(codigoCell);

        // Coloca el nombre del producto en la segunda columna
        const nombreCell = document.createElement("td");
        nombreCell.textContent = producto.nombre;
        row.appendChild(nombreCell);

        // Coloca la cantidad en stock en la tercera columna
        const cantidadCell = document.createElement("td");
        cantidadCell.textContent = producto.stock_actual;

        const cantidadMinimaCell = document.createElement("td");
        cantidadMinimaCell.textContent = producto.stock_minimo;

        // Determina el color del círculo según las condiciones especificadas
        const circleColor = determinarColorCirculo(producto.stock_actual, producto.stock_minimo);
        cantidadCell.innerHTML = `${producto.stock_actual} <i style="color:${circleColor}" class="fas fa-circle"></i>`;
        row.appendChild(cantidadCell);
        row.appendChild(cantidadMinimaCell);

        // Coloca el valor unitario en la cuarta columna
        const valorCell = document.createElement("td");
        valorCell.textContent = `$ ${producto.precio_unitario}`;
        row.appendChild(valorCell);

        // Agrega la fila a la tabla
        tbody.appendChild(row);
    });
}

// Función para determinar el color del círculo según las condiciones especificadas
function determinarColorCirculo(stockActual, stockMinimo) {
    if (stockActual <= stockMinimo) {
        return "red";
    } else if (stockActual <= stockMinimo * 2) {
        return "yellow";
    } else {
        return "green";
    }
}
