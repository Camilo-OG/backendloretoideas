const formulario = document.getElementById('formulario');
const selectId = document.getElementById('select-id')
fetch("https://backendloretoideas.onrender.com/agregartartaleta")
.then(Response => Response.json())
.then(tartaleta => {
  tartaleta.forEach(tartaleta => {
    getId(tartaleta)  
  });
})

function getId (tartaleta) { 
  const injectHTML = '<option value='+ tartaleta._id
  +'>' + tartaleta.nombre + '</option>'
  selectId.innerHTML += injectHTML
}

function enviarDatos () {

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
  formData.append('diametro', diametro);
  formData.append('precio', precio);
  formData.append('imagen', document.getElementById('input-imagen').files[0]);
  formData.append('img_descripcion', imgDescripcion)

  const id = selectId.value

  fetch(`https://backendloretoideas.onrender.com/modificartartaletafull/${id}`,{
    method: "PUT",
    body: formData,
  })
  .then((response) => response.json())
    .then(function (response) {
      console.log({
        Origen: "Recibiendo respuesta de la API",
        status: response.status,
        statusText: response.statusText,
        response: response.text(),
      });
      if (response.status === 200) {
        alert(`Producto actualizado correctamente`);
      } else {
        alert("Error al actualizar el producto");
        response.status(400).json({msg: "error al actualizar el producto"})
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
