const formulario = document.getElementById('formulario');
function enviarDatos( ) {

  const error = document.getElementById('error-datos')
  const nombre = document.getElementById('input-nombre').value
  const apellido = document.getElementById('input-apellido').value
  const username = document.getElementById('input-username').value
  const password = document.getElementById('input-password').value
  
  
  if( 
  nombre === '' ||
  apellido === '' || 
  username === '' || 
  password === '' 
  ) {
    
    return (error.textContent = `Todos los campos son obligatorios`)
  }
  const formData = new FormData();
  formData.append('nombre', nombre);
  formData.append('apellido', apellido);
  formData.append('username', username);
  formData.append('password', password);
  

  fetch('https://backendloretoideas.onrender.com/user/crear',{
    method: "POST",
    body: formData,
  })
  .then(function (response) {
    console.log({
      Origen: "Recibiendo respuesta de la API",
      status: response.status,
      statusText: response.statusText,
      response: response.text(),
    });
    if (response.status === 200) {
    alert(`Usuario: ${username} creado correctamente`);
    } else {
      alert(`Error al crear el usuario: ${username}`);
      console.log("no esta recibiendo el status 200")
      response.status(400).json({msg: "error al crear el usuario"})
    }
  })
  .catch(function (error) {
    console.log(error);
  });

}

formulario.addEventListener('submit', (e)=>{
  e.preventDefault();
  
  enviarDatos()
})
