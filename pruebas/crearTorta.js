const formulario = document.getElementById('formulario');
function enviarDatos( ) {

  const error = document.getElementById('error-datos')
  const nombre = document.getElementById('input-nombre').value
  const descripcion = document.getElementById('input-descripcion').value
  const porcion1 = document.getElementById('input-porcion1').value
  const precio1 = document.getElementById('input-precio1').value
  const porcion2 = document.getElementById('input-porcion2').value
  const precio2 = document.getElementById('input-precio2').value
  const porcion3 = document.getElementById('input-porcion3').value
  const precio3 = document.getElementById('input-precio3').value
  const porcion4 = document.getElementById('input-porcion4').value
  const precio4 = document.getElementById('input-precio4').value
  const porcion5 = document.getElementById('input-porcion5').value
  const precio5 = document.getElementById('input-precio5').value
  const imgDescripcion = document.getElementById('input-descripcion-img').value
  

  if( 
  nombre === '' ||
  descripcion === '' || 
  porcion1 === '' || 
  precio1 === '' ||
  porcion2 === '' ||
  precio2 === '' ||
  porcion3 === '' ||
  precio3 === '' || 
  porcion4 === '' || 
  precio4 === '' || 
  porcion5 === '' ||
  precio5 === '' ||
  imgDescripcion === ''
  ) {
    return (error.textContent = "Todos los campos son obligatorios")
  }

  const porcionesArray = [porcion1, porcion2, porcion3, porcion4, porcion5];
  const precioArray = [precio1, precio2, precio3, precio4, precio5];

  

  const formData = new FormData();
  formData.append('nombre', nombre);
  formData.append('descripcion', descripcion);
  formData.append('porciones', JSON.stringify(porcionesArray));
  formData.append('precio', JSON.stringify(precioArray));
  formData.append('imagen', document.getElementById('input-imagen').files[0]);
  formData.append('img_descripcion', imgDescripcion)

  

  fetch('http://localhost:3000/agregartorta',{
    method: "POST",
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
      /*   document.getElementById('input-image').value = "";
        nombre = "";
        descripcion = "";
        porcion1 = "";
        porcion2 = "";
        porcion3 = "";
        porcion4 = "";
        porcion5 = "";
        precio1 = "";
        precio2 = "";
        precio3 = "";
        precio4 = "";
        precio5 = ""; */

        alert(`Producto ${nombre} creado correctamente`);
      } else {
        alert("Error al crear el producto");
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
