const contenedor = document.getElementById('contenedor')

fetch("https://backendloretoideas.onrender.com/mostrar")
.then(response => response.json())
.then(tortas => {
  tortas.forEach(torta => {
    imprimir(torta)
  });
})
.catch( error => console.log(error))

function imprimir (torta) {
  
  let porcionesString = torta.porciones[0]
  let precioString = torta.precio[0]

  function transformarArray (str) {
    const array = JSON.parse(str)
    const numeros = array.map((element) => parseFloat(element));
    return numeros
  }

  porciones = transformarArray(porcionesString)
  precios = transformarArray(precioString)

  const clase = "table-succes";

  const inyectarHTML = 
  '<tr class="' + clase + '">' +
  '<td class="' + clase + '">' + torta.nombre + '</td>' +
  '<td class="' + clase + '">' + torta.descripcion + '</td>' +
  '<td class="' + clase + '">' + '<ul>' 
  + '<li>' + porciones[0] + ' porciones - $' + precios[0] + '</li>'
  + '<li>' + porciones[1] + ' porciones - $' + precios[1] + '</li>'
  + '<li>' + porciones[2] + ' porciones - $' + precios[2] + '</li>'
  + '<li>' + porciones[3] + ' porciones - $' + precios[3] + '</li>'
  + '<li>' + porciones[4] + ' porciones - $' + precios[4] + '</li>'
  + '</ul>' + '</td>' + 
  '<td class="' + clase + '">' + torta.status + '</td>' +
  '<td class="' + clase + '">' + '<img src="../uploads/' + torta.imagen + '" alt="' + torta.img_descripcion + '"' + 'style="height: 100px; width: 100px;"' + '>' + '</td>' 
  + '</tr>'
  
  contenedor.innerHTML += inyectarHTML

}
