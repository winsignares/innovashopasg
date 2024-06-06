console.log("EMPRESA-ORDENES JS");

const BASE_URL = "http://127.0.0.1:5000/api";

async function getOrden() {
    const response = await axios.get(`${BASE_URL}/ordenes_compra_con_productos`);
    const ordenes = response.data;

    console.log(ordenes);

    const tbody = document.querySelector("tbody");

    ordenes.forEach(orden => {
        const row = document.createElement("tr");

        // Coloca el ID de la orden en la primera columna
        const idCell = document.createElement("td");
        idCell.textContent = orden.id;
        row.appendChild(idCell);

        // Coloca un código ficticio en la segunda columna (reemplaza esto con datos reales si los tienes)
        const codigoCell = document.createElement("td");
        codigoCell.textContent = "1212432"; // Reemplaza esto con el código real si está disponible
        row.appendChild(codigoCell);

        // Calcula la cantidad de productos
        const cantidadTotal = orden.productos.reduce((sum, producto) => sum + producto.cantidad, 0);
        const cantidadCell = document.createElement("td");
        cantidadCell.textContent = cantidadTotal;
        row.appendChild(cantidadCell);

        // Calcula el valor total de la orden
        const valorTotal = orden.productos.reduce((sum, producto) => sum + (producto.precio_unitario * producto.cantidad), 0);
        const valorCell = document.createElement("td");
        valorCell.textContent = `$ ${valorTotal.toLocaleString()}`;
        row.appendChild(valorCell);

        // Coloca el botón de acción en la sexta columna
        const accionesCell = document.createElement("td");
        const verBtn = document.createElement("a");
        verBtn.href = `/empresa/ordenes/${orden.id}`;
        verBtn.className = "btn btn-primary";
        verBtn.title = "Ver orden de compra";
        verBtn.innerHTML = '<i class="fas fa-eye"></i>';
        accionesCell.appendChild(verBtn);
        row.appendChild(accionesCell);

        // Agrega la fila a la tabla
        tbody.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", getOrden);
