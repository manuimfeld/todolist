/*** VARIABLES ***/
let form = document.getElementById('form')
let ul = document.getElementById('ul')
let tareasContenedor = []


/*** FUNCIONES AL CARGAR LA PÁGINA ***/
/* Con esta función convierto el item del localStorage de Strin a Array y lo pusheo a la let tareasContenedor */
let guardado = () => {
    let conver = JSON.parse(localStorage.getItem("tareas"))
    
    if (conver != null) {
        conver.map(tarea => {
            tareasContenedor.push(tarea)
        })
    } 
}

/* Con esta función muestro los elementos que tengo en la let tareasContenedor, agregando un li en el body del html*/
let mostrarTareas = (e) => {
    e.map(tareaNueva => {
        let newLi = document.createElement('li')
        let newDiv = document.createElement('div')

        let newP = document.createElement('p')
        let newPcont = document.createTextNode(tareaNueva)
        newP.appendChild(newPcont)

        let tareaFinalizada = document.createElement('button')
        let tareaFcont = document.createTextNode('Finalizar')
        tareaFinalizada.appendChild(tareaFcont)
        tareaFinalizada.style.background = "#2578bb"

        let newB = document.createElement('button')
        let newBcont = document.createTextNode('Borrar')
        newB.appendChild(newBcont)

        newLi.appendChild(newP)
        newDiv.appendChild(tareaFinalizada)
        newDiv.appendChild(newB)
        newDiv.className = 'tarea-opcion'
        newLi.appendChild(newDiv)
        ul.appendChild(newLi)

        tareaFinalizada.addEventListener('click', () => {
            newP.style.textDecoration = "line-through";
        })

        newB.addEventListener("click", function (e) {

            /* Busco el indice del elemento seleccionado y despues lo uso para borrarlo en el localStorage*/
            let borrar = newP.textContent
            let index = tareasContenedor.indexOf(borrar);
            tareasContenedor.splice(index, 1);
            localStorage.setItem("tareas", JSON.stringify(tareasContenedor))

            /* Elimino el elemento li clickeado. */
            newDiv.parentNode.parentNode.removeChild(newDiv.parentNode);
        });
    })
}

/* llamo a las funciones cuando carga la página */
guardado()
mostrarTareas(tareasContenedor)


/*** FUNCIONES ***/
let setTarea = (e) => {
    localStorage.setItem("tareas", [JSON.stringify(e)])
}


/*** EVENTOS ***/

/* Agarro el valor del input, lo pusheo a la let tareasContenedor, convierto esa let en json y lo guardo en localStorage */
form.addEventListener('submit',  (e) => {
    e.preventDefault()
    let tarea = document.getElementById('tarea').value

    if (tarea.length > 0) {
        tareasContenedor.push(tarea)
        setTarea(tareasContenedor)
        form.reset()

        if (tareasContenedor.length > 0) {
            /* Si el array contiene elementos, voy a crear y mostrar el ultimo elemento del array en pantalla */
            return mostrarTareas(tareasContenedor.slice(-1))
        }
    } else {
        alert('No puedes agregar una tarea vacía, por favor escribe una tarea.')
    }
})

