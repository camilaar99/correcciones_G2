// VALIDACIONES DEL FORMULARIO // crearvalidation

window.onload = function(){
    let form = document.querySelector('.login');
    let teamName = document.querySelector('#teamName')
    let descripcion = document.querySelector('#descripcion')
    let imagen = document.querySelector('#imagen')
    let jugador = document.querySelector('#jugador')
    let price = document.querySelector('#price')
    let grupo = document.querySelector('#grupo')

    // Helper function for validation
    function validateField(field, errorMsg) {
        if (field.value.trim() === '') {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
            return errorMsg;
        } else {
            field.classList.add('is-valid');
            field.classList.remove('is-invalid');
            return null;
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let errores = [];

        // Array of fields and their error messages
        const fields = [
            { field: teamName, msg: 'El campo nombre equipo no puede estar vacío' },
            { field: descripcion, msg: 'El campo descripcion no puede estar vacío' },
            { field: imagen, msg: 'Debe subir una imagen' },
            { field: jugador, msg: 'El campo jugador no puede estar vacío' },
            { field: price, msg: 'El campo precio no puede estar vacío' },
            { field: grupo, msg: 'Debe elegir un grupo' }
        ];

        fields.forEach(({ field, msg }) => {
            const error = validateField(field, msg);
            if (error) errores.push(error);
        });

        if (errores.length > 0) {
            let ulErrores = document.querySelector('.errores');
            ulErrores.classList.add('alert-warning');
            ulErrores.innerHTML = '';
            errores.forEach(err => {
                ulErrores.innerHTML += `<li> ${err} </li>`;
            });
            Swal.fire(
                'Cuidado!',
                'Verifica los errores',
                'error'
            );
        } else {
            let body = {
                teamName: teamName.value,
                descripcion: descripcion.value,
                imagen: imagen.value,
                jugador: jugador.value,
                price: price.value,
                grupo: grupo.value
            };
            Swal.fire(
                'Muy bien!',
                'Producto ingresado!',
                'success'
            ).then((result) => {
                if (result.isConfirmed) {
                    form.submit();
                }
            });
        }
    });
}

