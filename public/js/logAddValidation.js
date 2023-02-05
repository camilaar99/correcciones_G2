// VALIDACIONES DEL FORMULARIO // log add

window.onload = function(){

    let form = document.querySelector('.login');

    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        let errores = []

        let email = document.querySelector('#email')
        let contraseña = document.querySelector('#contraseña')

        function ValidateEmail(mail) {
            var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (mail.value.match(validRegex)) {
                return true
            }
            else{
                return false
            }
        }


        let validMail=ValidateEmail(email);

        if (email.value == ""){
            errores.push("El campo email no puede estar vacío")
            email.classList.add('is-invalid')
            email.classList.remove('is-valid')
        }
        else {
            email.classList.add("is-valid")
            email.classList.remove('is-invalid')
        }

        if (validMail==false){
            errores.push("El campo email es inválido")
            email.classList.add('is-invalid')
            email.classList.remove('is-valid')
        }
        else {
            email.classList.add("is-valid")
            email.classList.remove('is-invalid')
        }

        if (contraseña.value == ""){
            errores.push("El campo contraseña no puede estar vacío")
            contraseña.classList.add('is-invalid')
            contraseña.classList.remove('is-valid')
        }
        else {
            contraseña.classList.add("is-valid")
            contraseña.classList.remove('is-invalid')
        }

        

        if (errores.length > 0) {
            console.log(errores)
            let ulErrores = document.querySelector('.errores')
            ulErrores.classList.add("alert-warning")
            ulErrores.innerHTML = ""
            for (let i = 0; i < errores.length; i++) {
                ulErrores.innerHTML += `<li> ${errores[i]} </li>`
            }
            Swal.fire(
                'Cuidado!',
                'Verifica los errores',
                'error'
            )
        }
        else {

            console.log(errores)
            let body = {
                email: email.value,
                contraseña: contraseña.value,
            }

            Swal.fire(
                'Muy bien!',
                'Usuario ingresado!',
                'success'
            ).then((result)=>{
                if (result.isConfirmed){
                    form.submit()
                }
            })
            
            }
        
})
}
