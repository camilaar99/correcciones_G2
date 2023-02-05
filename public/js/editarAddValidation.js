// VALIDACIONES DEL FORMULARIO // editaradd

window.onload = function(){

    let form = document.querySelector('.login');
    let teamName = document.querySelector('#teamName')
    let descripcion = document.querySelector('#descripcion')
    let imagen = document.querySelector('#imagen')
    let jugador = document.querySelector('#jugador')
    let price = document.querySelector('#price')
    let grupo = document.querySelector('#grupo')
    
    

    form.addEventListener('submit', async (e) => {
        console.log("hola")
        e.preventDefault()
        let errores = []

        let teamName = document.querySelector('#teamName')
        let descripcion = document.querySelector('#descripcion')
        let imagen = document.querySelector('#imagen')
        let jugador = document.querySelector('#jugador')
        let price = document.querySelector('#price')
        let grupo = document.querySelector('#grupo')

        if (teamName.value == ''){
            errores.push("El campo nombre no puede estar vacío")
            teamName.classList.add('is-invalid')
            teamName.classList.remove('is-valid')
        }
        else {
            teamName.classList.add("is-valid")
            teamName.classList.remove('is-invalid')
        }

        if (descripcion.value == ''){
            errores.push("El campo descripcion no puede estar vacío")
            descripcion.classList.add('is-invalid')
            descripcion.classList.remove('is-valid')
        }
        else {
            descripcion.classList.add("is-valid")
            descripcion.classList.remove('is-invalid')
        }
        if (imagen.value == ""){
            errores.push("Debe subir una imagen")
            imagen.classList.add('is-invalid')
            imagen.classList.remove('is-valid')
        }
        else {
            imagen.classList.add("is-valid")
            imagen.classList.remove('is-invalid')
        }
        if (jugador.value == ""){
            errores.push("El campo jugador no puede estar vacío")
            jugador.classList.add('is-invalid')
            jugador.classList.remove('is-valid')
        }
        else {
            jugador.classList.add("is-valid")
            jugador.classList.remove('is-invalid')
        }
        if (price.value == ""){
            errores.push("El campo precio no puede estar vacío")
            price.classList.add('is-invalid')
            price.classList.remove('is-valid')
            console.log(errores)
        }
        else {
            price.classList.add("is-valid")
            price.classList.remove('is-invalid')
        }
        if (grupo.value == ""){
            errores.push("Debe Elegir un grupo")
            grupo.classList.add('is-invalid')
            grupo.classList.remove('is-valid')
            console.log(errores)
        }
        else {
            grupo.classList.add("is-valid")
            grupo.classList.remove('is-invalid')
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
                teamName: teamName.value,
                descripcion: descripcion.value,
                imagen: imagen.value,
                jugador: jugador.value,
                price: price.value,
                grupo: grupo.value
            }
           

            Swal.fire(
                'Muy bien!',
                'Producto ingresado!',
                'success'
            ).then((result)=>{
                if (result.isConfirmed){
                    form.submit()
                }
            })
            
            
        }
        
})
}