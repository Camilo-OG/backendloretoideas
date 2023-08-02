const contenedor = document.getElementById('contenedor')

fetch("https://backendloretoideas.onrender.com/mostrartartaletas")
.then(response => response.json())
.then(tartaleta => {
  tartaleta.forEach(tartaleta => {
    imprimir(tartaleta)
  });
})
.catch( error => console.log(error))

function imprimir (tartaleta) {
  
  const clase = "table-succes";

  const inyectarHTML = 
  '<tr class="' + clase + '">' +
  '<td class="' + clase + '">' + tartaleta.nombre + '</td>' +
  '<td class="' + clase + '">' + tartaleta.descripcion + '</td>' +
  '<td class="' + clase + '">' + '<ul>' 
  + '<li>' + tartaleta.diametro + ' centimetros - $' + tartaleta.precio + '</li>'
  + '</ul>' + '</td>' + 
  '<td class="' + clase + '">' + tartaleta.status + '</td>' +
  '<td class="' + clase + '">' + '<img src="../uploads/' + tartaleta.imagen + '" alt="' + tartaleta.img_descripcion + '"' + 'style="height: 100px; width: 100px;"' + '>' + '</td>' 
  + '</tr>'
  
  contenedor.innerHTML += inyectarHTML

}
