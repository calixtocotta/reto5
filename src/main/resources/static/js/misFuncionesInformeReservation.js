/* global fetch */

//function traerInformacion(){location.reload(true);}
//Función para actualizar cada 60 segundos(60000 milisegundos)
//setInterval("traerInformacion()",60000);

function traerInformacion(){
    
    //console.log($('#startDate').val(),$('#devolutionDate').val())
    var fechaInicial = new Date($('#startDate').val());
    var fechaFinal = new Date($('#devolutionDate').val());
    if($('#startDate').val()=="" || $('#devolutionDate').val()==""){
        swal("Ha ocurrido un error", "Debe selecionar una fecha", "error");
    }else{
        if(fechaInicial<=fechaFinal){
            $("#resultado").html("<p class='loader text-center'>Cargando...</p>");
            $.ajax({
                url:"http://144.22.228.79:80/api/Reservation/report-dates/"+$('#startDate').val()+"/"+$('#devolutionDate').val(),
                type:"GET",
                datatype:"JSON",
                success:function(respuesta){
                    //console.log(respuesta);
                    if(respuesta.length==0){
                        $("#resultado").html("<p class='loader text-center'>No hay resultado</p>");
                    }else{
                        pintarRespuesta(respuesta);
                    }
                }
            });
        }else{
            swal("Ha ocurrido un error", "La fecha final debe ser mayor a la fecha inicial", "error");
        }
    }
}

function pintarRespuesta(items){
    let myTable="<table id='informacion'>";
    let tableHeader = `<thead><tr>
    <th>STARTDATE</th>
    <th>DEVOLUTIONDATE</th>
    <th>SKATE</th>
    <th>CLIENT</th>
    <th>STATUS</th>
    <th></th>
    </thead></tr>`;
    myTable += tableHeader;

    for (i=0; i<items.length; i++ ) {
        myTable+="<tr>";
        myTable+="<td>"+items[i].startDate+"</td>";
        myTable+="<td>"+items[i].devolutionDate+"</td>";
        myTable+="<td>"+items[i].skate.name+"</td>";
        myTable+="<td>"+items[i].client.name+"</td>";
        myTable+="<td>"+items[i].status+"</td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").html(myTable);
}