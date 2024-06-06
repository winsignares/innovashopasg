console.log("EMPRESA-INVENTARIO JSS");

const BASE_GENERAL_URL = "http://127.0.0.1:5000/general";
const BASE_URL = "http://127.0.0.1:5000/api";

document.addEventListener("DOMContentLoaded", getProductos);

async function getProductos() {
    const response = await axios.get(`${BASE_URL}/productos`);
    const productos = response.data;

    console.log(productos);

    const inventarioWrapper = document.querySelector('.inventario-wrapper');
    
    // Limpiar el contenido actual
    inventarioWrapper.innerHTML = '';

    // Recorrer la lista de productos y agregar cada uno al HTML
    productos.forEach((producto, index) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = producto.img ? "http://127.0.0.1:5000/" + producto.img : '/static/imgs/empresa/producto-defecto.png';
        img.classList.add('card-img-top');
        img.alt = '...';

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = producto.nombre;

        const btn = document.createElement('a');
        btn.classList.add('btn', 'btn-warning');
        btn.innerHTML = '<i class="fas fa-edit"></i> Editar';
        btn.onclick = () => openEditModal(producto);

        cardBody.appendChild(title);
        cardBody.appendChild(btn);

        card.appendChild(img);
        card.appendChild(cardBody);

        inventarioWrapper.appendChild(card);
    });
}

function openEditModal(producto) {
    const modal = document.getElementById('modalProductos');
    const closeModal = modal.querySelector('.close');
    const modalContent = modal.querySelector('.modal-content');

    // Rellenar los campos de entrada con los detalles del producto
    modalContent.querySelector('#nombreProducto').value = producto.nombre;
    modalContent.querySelector('#descripcionProducto').value = producto.descripcion;
    modalContent.querySelector('#codigoProducto').value = producto.codigo;
    modalContent.querySelector('#precioProducto').value = producto.precio_unitario;
    modalContent.querySelector('#imgProducto').value = producto.img;
    modalContent.querySelector('#stockActual').value = producto.stock_actual;
    modalContent.querySelector('#stockMinimo').value = producto.stock_minimo;
    modalContent.querySelector('#descuentoProducto').value = producto.descuento;
    modalContent.querySelector('#estadoProducto').value = producto.estado;
    modalContent.querySelector('#ivaProducto').value = producto.iva;

    // Abrir la modal
    modal.style.display = 'block';

    // Cerrar la modal al hacer clic en la X
    closeModal.onclick = function() {
        modal.style.display = 'none';
    };

    // Guardar los cambios al hacer clic en el botón de guardar
    const guardarBtn = modalContent.querySelector('#guardarProducto');
    guardarBtn.onclick = async function() {
        // Recopilar los datos actualizados del producto
        const nuevoProducto = {
            id: producto.id,
            nombre: modalContent.querySelector('#nombreProducto').value,
            descripcion: modalContent.querySelector('#descripcionProducto').value,
            codigo: modalContent.querySelector('#codigoProducto').value,
            precio_unitario: modalContent.querySelector('#precioProducto').value,
            img: modalContent.querySelector('#imgProducto').value,
            stock_actual: modalContent.querySelector('#stockActual').value,
            stock_minimo: modalContent.querySelector('#stockMinimo').value,
            descuento: modalContent.querySelector('#descuentoProducto').value,
            estado: modalContent.querySelector('#estadoProducto').value,
            iva: modalContent.querySelector('#ivaProducto').value
            // Puedes agregar más campos según sea necesario
        };

        // Aquí debes enviar los datos actualizados del producto a tu API para guardarlos
        console.log('Datos actualizados del producto:', nuevoProducto);
        const response = await axios.put(`${BASE_URL}/productos/${producto.id}`, nuevoProducto);
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Cambios guardados",
            showConfirmButton: false,
            timer: 1500
        });
        getProductos();

        console.log(response);

        // Cerrar la modal después de guardar los cambios
        modal.style.display = 'none';
    };

    // Cerrar la modal al hacer clic fuera de ella
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

