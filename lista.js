
const search = () => {
    resetTabla()
    const busqueda = document.getElementById('searchInput').value
    mostrarBoton()
    mostrarTabla(busqueda.toLowerCase())
}

const showUsers = async(busqueda = null) => {
    return fetch(busqueda ? `http://168.194.207.98:8081/tp/lista.php?action=BUSCAR&usuario=${busqueda}`
                          : 'http://168.194.207.98:8081/tp/lista.php?action=BUSCAR')
    .then(response => response.json())
    .then(data => users = data)
    .catch(e =>console.error(e))
}

const lockAndUnlock = (url) => {
    return fetch(url)
    .then(response => response.json())
    .catch(e =>console.error(e))
}

const imgConfig = (tr, user) => {
    let tdLock = tr.appendChild(document.createElement('td'))
    let tdUnlock = tr.appendChild(document.createElement('td'))
    let imgLock = tdLock.appendChild(document.createElement('img'))
    let imgUnlock = tdUnlock.appendChild(document.createElement('img'))

    imgLock.src = './images/lock.png'
    imgLock.width = 50
    imgLock.onclick = async() => { 
        const {respuesta} = await lockAndUnlock(`http://168.194.207.98:8081/tp/lista.php?action=BLOQUEAR&idUser=${user.id}&estado=Y`);
        if(respuesta === 'OK'){
            tr.style.backgroundColor = "#fd9f8b" 
        }else{
            alert('HUBO UN ERROR')
        }
    }
    
    imgUnlock.src = './images/unlock.png'
    imgUnlock.width = 50
    imgUnlock.onclick = async() => {
        const {respuesta} = await lockAndUnlock(`http://168.194.207.98:8081/tp/lista.php?action=BLOQUEAR&idUser=${user.id}&estado=Y`);
        if(respuesta === 'OK'){
            tr.style.backgroundColor = "#cef8c6" 
        }else{
            alert('HUBO UN ERROR')
        }
    }
    
    user.bloqueado === 'N' ?  tr.style.backgroundColor = "#cef8c6"   
                           :  tr.style.backgroundColor = "#fd9f8b" 
}

const mostrarTabla = async(busqueda  = null) => {
    const users = await showUsers(busqueda)
    const myTable= document.getElementById("tbody")
    users.forEach((user) => {
        
    let newTr = document.createElement('tr');
     
    let tdId = newTr.appendChild(document.createElement('td'))
    let tdUsuario = newTr.appendChild(document.createElement('td'))
    let tdBloqueado = newTr.appendChild(document.createElement('td'))
    let tdApellido = newTr.appendChild(document.createElement('td'))
    let tdNombre = newTr.appendChild(document.createElement('td'))
    imgConfig(newTr, user)
       
    tdId.textContent = user.id
    tdUsuario.textContent = user.usuario
    tdBloqueado.textContent = user.bloqueado
    tdApellido.textContent = user.apellido
    tdNombre.textContent = user.nombre

    myTable.appendChild(newTr)
    }
    )
}

const resetTabla = () => {
    document.getElementById("tbody").innerHTML = ''
}
const mostrarTodos = () => {
    resetTabla()
    mostrarTabla()
    mostrarBoton()
    const searchInput = document.getElementById('searchInput')
    searchInput.value = '';
}
const mostrarBoton = () => {
    const botonMostrar = document.getElementById('botonMostrar')
    botonMostrar.hidden = !botonMostrar.hidden
}

mostrarTabla()
