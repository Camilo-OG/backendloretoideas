const formulario = document.getElementById('formulario');
function enviarDatos( ) {

  const error = document.getElementById('error-datos')
  const nombre = document.getElementById('input-nombre').value
  const descripcion = document.getElementById('input-descripcion').value
  const diametro = document.getElementById('input-diametro').value
  const precio = document.getElementById('input-precio').value
  const imgDescripcion = document.getElementById('input-descripcion-img').value
  
  if( 
  nombre === '' ||
  descripcion === '' || 
  diametro === '' || 
  precio === '' ||
  imgDescripcion === ''
  ) {
    return (error.textContent = "Todos los campos son obligatorios")
  }


  const formData = new FormData();
  formData.append('nombre', nombre);
  formData.append('descripcion', descripcion);
  formData.append('diamtero', diametro);
  formData.append('precio', precio);
  formData.append('imagen', document.getElementById('input-imagen').files[0]);
  formData.append('img_descripcion', imgDescripcion)

  

  fetch('https://backendloretoideas.onrender.com/agregartartaleta',{
    method: "POST",
    body: formData,
  })
  .then((response) => response.json())
  .then(response => {
    console.log({
    Origen: "Recibiendo respuesta de la API",
    status: response.status,
    statusText: response.statusText,
    response: response.text(),
    });
    if (response.status === 200) {
    alert(`Producto ${nombre} creado correctamente`);
    } else {
      alert("Error al crear el producto");
      console.log("no esta recibiendo el status 200")
      response.status(400).json({msg: "error al crear el producto"})
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
