/* global fetch */

//function traerInformacion(){location.reload(true);}
//Función para actualizar cada 60 segundos(60000 milisegundos)
//setInterval("traerInformacion()",60000);

function traerInformacion() {
    $("#resultado").html("<p class='loader text-center'>Cargando...</p>");
    $.ajax({
        url: "http://144.22.228.79:80/api/Reservation/report-clients",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            //console.log(respuesta);
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
    let myTable = "<table id='informacion'>";
    let tableHeader = `<thead><tr>
    <th>TOTAL</th>
    <th>CLIENT-NAME</th>
    <th>STATUS</th>
    <th></th>
    </thead></tr>`;
    myTable += tableHeader;
    var countStatusCreated = 0;
    var countStatusCompleted = 0;
    var countStatusCancelled = 0;

    items.forEach(element => {
        myTable += "<tr>";
        myTable += "<td>" + element.total + "</td>";
        myTable += "<td>" + element.client.name + "</td>";

        element.client.reservations.forEach(reserv => {
            if (reserv.status == "created") {
                countStatusCreated += 1;
            } else if (reserv.status == "completed") {
                countStatusCompleted += 1;
            } else {
                countStatusCancelled += 1;
            }
        })

        myTable += "<td>" + countStatusCreated + " Created, " + countStatusCompleted + " Completed and " + countStatusCancelled + " Cancelled" + "</td>";
        myTable += "</tr>";

        countStatusCreated = 0;
        countStatusCompleted = 0;
        countStatusCancelled = 0;
    });

    myTable += "</table>";
    $("#resultado").html(myTable);
}