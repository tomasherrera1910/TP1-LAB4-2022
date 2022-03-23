const login = async() => {
    const user = document.getElementById('inputUsuario').value
    const pass = document.getElementById('inputClave').value
    const url = `http://168.194.207.98:8081/tp/login.php?user=${user}&pass=${pass}`
    // usuario para entrar mjmartinez password 123456
    return fetch(url, {
        method: 'POST', 
        body: JSON.stringify({user, pass}), 
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
    //   .catch(error => console.error(error))
    //   .then(response => console.log(response))
}
const checkLogin = async() => {
    const response = await login()
    console.log(response)
    const label = document.getElementById('label')
    const anchor = document.getElementById('anchor')
    
    
    if(response.respuesta === 'ERROR'){
        label.hidden = false;
        label.textContent = response.mje
        label.style.color = 'red'
    } 
    else if(response.respuesta === 'OK'){
        label.textContent = response.mje
        label.style.color = 'green'
        label.hidden = false;
        anchor.hidden = false;

}
}
 

