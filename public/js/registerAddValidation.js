// VALIDACIONES DEL FORMULARIO //

window.onload = function(){

    let form = document.querySelector('.login');
    let firstName = document.querySelector('#firstName')
    let lastName = document.querySelector('#lastName')
    let email = document.querySelector('#email')
    let contraseña = document.querySelector('#contraseña')
    let contraseña2 = document.querySelector('#contraseña2')
    let type = document.querySelector('#type')
    let avatar = document.querySelector('#avatar')
    

    form.addEventListener('submit', async (e) => {

        //alert('absdfasf')
        console.log("hola")
        e.preventDefault()
        let errores = []

        let firstName = document.querySelector('#firstName')
        let lastName = document.querySelector('#lastName')
        let email = document.querySelector('#email')
        let contraseña = document.querySelector('#contraseña')
        let contraseña2 = document.querySelector('#contraseña2')
        let type = document.querySelector('#type')
        let avatar = document.querySelector('#avatar')

        if (firstName.value == ""){
            errores.push("El campo nombre no puede estar vacío")
            firstName.classList.add('is-invalid')
            firstName.classList.remove('is-valid')
        }
        else {
            firstName.classList.add("is-valid")
            firstName.classList.remove('is-invalid')
        }

        if (lastName.value == ""){
            errores.push("El campo apellido no puede estar vacío")
            lastName.classList.add('is-invalid')
            lastName.classList.remove('is-valid')
        }
        else {
            lastName.classList.add("is-valid")
            lastName.classList.remove('is-invalid')
        }
        if (email.value == ""){
            errores.push("Debe ingresar un email")
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
        if (contraseña2.value == ""){
            errores.push("El campo repetir contraseña no puede estar vacío")
            contraseña2.classList.add('is-invalid')
            contraseña2.classList.remove('is-valid')
        }
        else {
            contraseña2.classList.add("is-valid")
            contraseña2.classList.remove('is-invalid')
        }
        if (type.value == ""){
            errores.push("Debe seleccionar un tipo de usuario")
            type.classList.add('is-invalid')
            type.classList.remove('is-valid')
            console.log(errores)
        }
        else {
            type.classList.add("is-valid")
            type.classList.remove('is-invalid')
        }
        if (avatar.value == ""){
            errores.push("Debe subir un archivo")
            avatar.classList.add('is-invalid')
            avatar.classList.remove('is-valid')
            console.log(errores)
        }
        else {
            avatar.classList.add("is-valid")
            avatar.classList.remove('is-invalid')
            console.log(errores)
        }

        

        if (errores.length > 0) {
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

            let body = {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                contraseña: contraseña.value,
                type: type.value,
                avatar: avatar.value
            }
           

            Swal.fire(
                'Muy bien!',
                'Usuario ingresado!',
                'success'
            )
            
            form.submit()
            
            
        }
        
})
}

