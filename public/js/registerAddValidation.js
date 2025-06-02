// VALIDACIONES DEL FORMULARIO // register add 

window.onload = function () {
    let form = document.querySelector('.login');
    let firstName = document.querySelector('#firstName');
    let lastName = document.querySelector('#lastName');
    let email = document.querySelector('#email');
    let contraseña = document.querySelector('#contraseña');
    let contraseña2 = document.querySelector('#contraseña2');
    let type = document.querySelector('#type');
    let avatar = document.querySelector('#avatar');

    // Helper for generic field validation
    function validateField(field, errorMsg, minLen = 1) {
        if (field.value.trim().length < minLen) {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
            return errorMsg;
        } else {
            field.classList.add('is-valid');
            field.classList.remove('is-invalid');
            return null;
        }
    }

    // Helper for email validation
    function isValidEmail(mail) {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return validRegex.test(mail.value);
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let errores = [];

        // Validate fields
        const firstNameError = validateField(firstName, 'El campo nombre no puede estar vacío y debe tener más de 2 caracteres', 2);
        if (firstNameError) errores.push(firstNameError);

        const lastNameError = validateField(lastName, 'El campo apellido no puede estar vacío y debe tener más de 2 caracteres', 2);
        if (lastNameError) errores.push(lastNameError);

        const emailEmptyError = validateField(email, 'Debe ingresar un email');
        if (emailEmptyError) errores.push(emailEmptyError);
        else if (!isValidEmail(email)) {
            errores.push('Email inválido');
            email.classList.add('is-invalid');
            email.classList.remove('is-valid');
        }

        const passError = validateField(contraseña, 'El campo contraseña no puede estar vacío');
        if (passError) errores.push(passError);

        const pass2Error = validateField(contraseña2, 'El campo repetir contraseña no puede estar vacío');
        if (pass2Error) errores.push(pass2Error);

        if (contraseña.value !== '' && contraseña2.value !== '' && contraseña.value !== contraseña2.value) {
            errores.push('Las contraseñas no coinciden');
            contraseña.classList.add('is-invalid');
            contraseña2.classList.add('is-invalid');
        }

        const typeError = validateField(type, 'Debe seleccionar un tipo de usuario');
        if (typeError) errores.push(typeError);

        const avatarError = validateField(avatar, 'Debe subir un archivo');
        if (avatarError) errores.push(avatarError);

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
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                contraseña: contraseña.value,
                type: type.value,
                avatar: avatar.value
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