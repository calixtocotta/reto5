/* global fetch */

//function traerInformacion(){location.reload(true);}
//Función para actualizar cada 60 segundos(60000 milisegundos)
//setInterval("traerInformacion()",60000);

function traerInformacion() {
    $("#resultado").html("<p class='loader text-center'>Cargando...</p>");
    $.ajax({
        url: "http://144.22.228.79:80/api/Reservation/report-status",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            if (respuesta.length == 0) {
                $("#resultado").html("<p class='loader text-center'>No hay resultado</p>");
                swal("No hay resultados", "Debe registrar una reservacion", "error");
            } else {
                pintarRespuesta(respuesta);
            }
        }
    });
}

function pintarRespuesta(items) {
    var parametros = [];
    var valores = [];

    parametros.push("completed");  
    parametros.push("cancelled");
    valores.push(items.completed);
    valores.push(parseInt(items.cancelled));

    var data = [{
        x: parametros,
        y: valores,
        type: "bar"
    }];
    $("#resultado").html(""); //Yo utilizo esta linea para mostrar la animacion de cargar con los estilos
    Plotly.newPlot("resultado",data);
}