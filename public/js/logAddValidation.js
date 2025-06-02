// VALIDACIONES DEL FORMULARIO // log add

window.onload = function(){
    let form = document.querySelector('.login');
    let email = document.querySelector('#email');
    let contraseña = document.querySelector('#contraseña');

    // Helper for email validation
    function isValidEmail(mail) {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return validRegex.test(mail.value);
    }

    // Helper for generic field validation
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

        // Validate email not empty
        const emailEmptyError = validateField(email, 'El campo email no puede estar vacío');
        if (emailEmptyError) errores.push(emailEmptyError);

        // Validate email format only if not empty
        if (!emailEmptyError && !isValidEmail(email)) {
            errores.push('El campo email es inválido');
            email.classList.add('is-invalid');
            email.classList.remove('is-valid');
        }

        // Validate password
        const passError = validateField(contraseña, 'El campo contraseña no puede estar vacío');
        if (passError) errores.push(passError);

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
                email: email.value,
                contraseña: contraseña.value,
            };
            Swal.fire(
                'Muy bien!',
                'Usuario ingresado!',
                'success'
            ).then((result) => {
                if (result.isConfirmed) {
                    form.submit();
                }
            });
        }
    });
}
