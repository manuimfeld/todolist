/*** VARIABLES ***/
let form = document.getElementById('form')
let ul = document.getElementById('ul')
let tareasContenedor = []

/* Con esta función muestro el numero de tareas existentes en el array */
function todocounter() {
    return document.getElementById('todo-number').innerText = `Hay ${tareasContenedor.length} tareas pendientes`
}

/* Con esta función agrego las tareas existentes en el array al LocalStorage */
let setTodo = (e) => {
    localStorage.setItem("tareas", [JSON.stringify(e)])
}

/* Con esta función recorro el localStorage y lo convierto a Array, despues lo pusheo a tareasContenedor */
let guardado = () => {
    let conver = JSON.parse(localStorage.getItem("tareas"))
    
    if (conver.length > 0) {
        conver.map(tarea => {
            tareasContenedor.push(tarea)
        })
        todocounter()
    } 
}

/* Con esta función recorro el array de tareas y los agrego a la página */
let showTodo = (e) => {
    e.map(tareaNueva => {
        let newLi = document.createElement('li')
        let newDiv = document.createElement('div')

        let newInputCheck = document.createElement('input')
        newInputCheck.setAttribute('type', 'checkbox')

        let newP = document.createElement('p')
        let newPcont = document.createTextNode(tareaNueva)
        newP.appendChild(newPcont)

        let newB = document.createElement('button')
        let newBcont = document.createTextNode('Borrar')
        newB.appendChild(newBcont)

        newLi.appendChild(newInputCheck)
        newLi.appendChild(newP)

        newDiv.appendChild(newB)
        newDiv.className = 'tarea-opcion'

        newLi.appendChild(newDiv)
        ul.appendChild(newLi)

        newB.addEventListener("click", function (e) {
            /* Busco el indice del elemento seleccionado y despues lo uso para borrarlo en el localStorage*/
            let borrar = newP.textContent
            let index = tareasContenedor.indexOf(borrar);
            tareasContenedor.splice(index, 1);
            setTodo(tareasContenedor)

            /* Elimino el elemento li clickeado y actualizo las tareas pendientes */
            newDiv.parentNode.parentNode.removeChild(newDiv.parentNode);
            todocounter()
        });
    })
}

/* llamo a las funciones cuando carga la página 

verifico que haya tareas en el LocalStorage */
guardado()
/* Agrego las tareas que hay en el LocalStorage a la página */
showTodo(tareasContenedor)

/*** EVENTO DEL FORMULARIO PARA AGREGAR TAREAS 
 * 
Agarro el valor del input, lo pusheo a la let tareasContenedor, convierto esa let en json y lo guardo en localStorage */
form.addEventListener('submit',  (e) => {
    e.preventDefault()
    let tarea = document.getElementById('tarea').value

    if (tarea.length > 0) {
        tareasContenedor.push(tarea)
        setTodo(tareasContenedor)
        todocounter()
        form.reset()

        if (tareasContenedor.length > 0) {
            /* Si el array contiene elementos, voy a crear y mostrar el ultimo elemento del array en pantalla */
            return showTodo(tareasContenedor.slice(-1))
        }
    } else {
        alert('No puedes agregar una tarea vacía, por favor escribe una tarea.')
    }
})