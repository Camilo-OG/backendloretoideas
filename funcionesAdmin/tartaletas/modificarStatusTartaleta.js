const selectId = document.getElementById('select-id')
const parametro = document.getElementById('modify')
const newValue = document.getElementById('modify-value')
const error = document.getElementById('error')


fetch("https://backendloretoideas.onrender.com/agregartartaleta")
.then(Response => Response.json())
.then(tartaletas => {
  tartaletas.forEach(tartaleta => {
    getId(tartaleta)  
  });
})

function getId (tartaleta) { 
  const injectHTML = '<option value='+ tartaleta._id
  +'>' + tartaleta.nombre + '- Estado: '+ tartaleta.status +'</option>'
  selectId.innerHTML += injectHTML
}

function modifyValue () {
  const id = selectId.value
  const status = newValue.value

  const data = {
    status: status
  };

  fetch(`https://backendloretoideas.onrender.com/modificartartaleta/${id}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
})
  .then(response => response.json())
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