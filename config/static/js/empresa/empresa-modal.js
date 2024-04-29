
function showModal(params){
    const modal = document.getElementById("modalProductos");
    modal.style.display = 'block';
    
    var closeModal = modal.querySelector('.close');

    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
}
