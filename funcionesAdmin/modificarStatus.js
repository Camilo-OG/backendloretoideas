const selectId = document.getElementById('select-id')
const parametro = document.getElementById('modify')
const newValue = document.getElementById('modify-value')
const error = document.getElementById('error')


fetch("https://backendloretoideas.onrender.com/mostrar")
.then(Response => Response.json())
.then(tortas => {
  tortas.forEach(torta => {
    getId(torta)  
  });
})

function getId (torta) { 
  const injectHTML = '<option value='+ torta._id
  +'>' + torta.nombre + '- Estado: '+ torta.status +'</option>'
  selectId.innerHTML += injectHTML
}

function modifyValue () {
  const id = selectId.value
  const status = newValue.value

  const data = {
    status: status
  };

  fetch(`https://backendloretoideas.onrender.com/modificar/${id}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error("Error al realizar la solicitud fetch:", error);
  });
}