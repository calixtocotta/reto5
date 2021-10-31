/* global fetch */

//function traerInformacion(){location.reload(true);}
//Función para actualizar cada 60 segundos(60000 milisegundos)
//setInterval("traerInformacion()",60000);

function itemsSkate(){
    $.ajax({
        url:"http://144.22.228.79:80/api/Skate/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let mySelect="<select id='skate'>";
            mySelect+="<option value='null' id='select-skate'>Selecione una patineta</option>"
            for(i=0;i<respuesta.length;i++){
                mySelect+="<option value="+respuesta[i].id+" id='skate-"+respuesta[i].id+"'>"+ respuesta[i].name+"</option>";
            }
            mySelect+="</select>"
            $("#resultado-skate").html(mySelect); 
        }
    });
}

function itemsClient(){
    $.ajax({
        url:"http://144.22.228.79:80/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let mySelect="<select id='client'>";
            mySelect+="<option value='null' id='select-client'>Selecione un usuario</option>"
            for(i=0;i<respuesta.length;i++){
                mySelect+="<option value="+respuesta[i].idClient+" id='client-"+respuesta[i].idClient+"'>"+ respuesta[i].name+"</option>";
                
            }
            mySelect+="</select>"
            $("#resultado-client").html(mySelect); 
            $("#idReservation").hide()
        }
    });
}

function traerInformacion(){
    $("#resultado").html("<p class='loader text-center'>Cargando...</p>");
    var objFecha = new Date;
    var dia  = objFecha.getDate();
    var mes  = objFecha.getMonth()+1;
    var anio = objFecha.getFullYear();
    // Devuelve: '1/2/2011':
    //console.log( dia + "/" + mes + "/" + anio );
    $("#startDate").attr("min",anio+"-"+mes+"-"+dia)
    $("#devolutionDate").attr("min",anio+"-"+mes+"-"+dia)
    
    $.ajax({
        url:"http://144.22.228.79:80/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //console.log(respuesta);
            
            pintarRespuesta(respuesta);
        }
    });
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
        myTable+="<td> <button class='mx-auto btn-danger btn-gradient' onclick='borrarElemento("+items[i].idReservation+")'>Borrar</button> <button class='mx-auto btn-danger btn-gradient' id='editar' onclick='Editar("+items[i].idReservation+")'>Editar</button> </td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").html(myTable);
}

function Editar(items){
    //console.log(items);
    $.ajax({
        url:"http://144.22.228.79:80/api/Reservation/"+items,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let fechaStartDate="";
            //console.log(respuesta.startDate[3]);
            for (i=0; i < respuesta.startDate.length; i++) {
                //console.log(respuesta.startDate[i]);
                if(respuesta.startDate[i]=="T"){
                    break;
                }else{
                    fechaStartDate+=respuesta.startDate[i];
                }
            }
            let fechaDevolutionDate="";
            //console.log(respuesta.startDate[3]);
            for (i=0; i < respuesta.devolutionDate.length; i++) {
                //console.log(respuesta.startDate[i]);
                if(respuesta.devolutionDate[i]=="T"){
                    break;
                }else{
                    fechaDevolutionDate+=respuesta.devolutionDate[i];
                }
            }
            //console.log(fechaStartDate);
            
            
            $("#skate-"+respuesta.skate.id).attr("selected", true)
            $("#client-"+respuesta.client.idClient).attr("selected", true)
            $("#"+respuesta.status).attr("selected", true)
            //console.log(respuesta.status);
            $("#startDate").val(fechaStartDate),
            $("#devolutionDate").val(fechaDevolutionDate),
            $("#idReservation").val(respuesta.idReservation),

            $("#btn-actualizar").show()
            $("#btn-guardar").hide()
        }
    });
}

function validar(opcion){
    if ($('#startDate').val().length == 0 || $('#devolutionDate').val().length == 0) {
        $("#validarCampos").html("<h4 style='color: red'>Todos los campos son necesarios</h4>");
        if($("#skate").val() == "null"){
            $("#validarCampos").html("<h4 style='color: red'>Selecione una patineta</h4>");
        }else if( $("#client").val() == "null"){
            $("#validarCampos").html("<h4 style='color: red'>Selecione un cliente</h4>");
        }else if($("#Status").val() == "null"){
            $("#validarCampos").html("<h4 style='color: red'>Selecione un estado</h4>");
        }
        return false;
    }else{
        if (opcion == 1){
            $("#validarCampos").html("<p class='loader text-center' style='color: green'>Guardando...</p>");
            setTimeout(
                function(){ 
                    guardarInformacion(); ;
                }, 6000
            );
        }else{
            $("#validarCampos").html("<p class='loader text-center' style='color: blue'>Actualizando...</p>");
            setTimeout(
                function(){ 
                    editarInformacion(); ;
                }, 6000
            );
        }
    }
}

function guardarInformacion(){
    let myData={
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        skate:{"id":$("#skate").val()},
        client:{"idClient":$("#client").val()},
        status:$("#Status").val()
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    
    $.ajax({
        url: "http://144.22.228.79:80/api/Reservation/save",
        type: "POST",
        data: dataToSend,
        contentType:"application/JSON",
        datatype: "JSON",
        success:function(respuesta){
            $(".registro").val(""),
            $("#select-skate").attr("selected", true),
            $("#select-client").attr("selected", true),
            $("#select-status").attr("selected", true),
            $("#validarCampos").html("<h4 style='color: green'>Se ha registrado exitosamente</h4>");
            setTimeout(
                function(){ 
                    document.getElementById("validarCampos").innerHTML = "";
                }, 6000
                );
            traerInformacion();
        },
        error: function(respuesta) {
            //console.log(respuesta);
            //console.log(respuesta.abort.name);
            if(respuesta.abort.name=="abort"){
                $("#validarCampos").html("<h4 style='color: red'>Ha ocurrido un error " + respuesta.status +"</h4>");
            }else{
                $("#validarCampos").html("<h4 style='color: red'>El usuario ya se encuentra registrado</h4>");
            }
        },
    });
    
    
}

function editarInformacion(){
    
    let myDataEditar={
        idReservation:$("#idReservation").val(),
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        skate:{"id":$("#skate").val()},
        client:{"idClient":$("#client").val()}
    };
    let dataToSendE=JSON.stringify(myDataEditar);
    //console.log(dataToSendE);
    $.ajax({
        url:"http://144.22.228.79:80/api/Reservation/update",
        type:"PUT",
        data:dataToSendE,
        contentType:"application/JSON",
        dataType:"JSON",
        //async: false,
        success:function(respuestaE){
            $(".registro").val("");
            $("#select-skate").attr("selected", true),
            $("#select-client").attr("selected", true),
            $("#btn-guardar").show()
            $("#validarCampos").html("<h4 style='color: green'>Se ha actualizado exitosamente</h4>");
            setTimeout(
                function(){ 
                    document.getElementById("validarCampos").innerHTML = "";
                }, 6000
                );
            traerInformacion();
        },
        error:function(respuestaE) {
            console.log(respuestaE);
            $("#validarCampos").html("<h4 style='color: red'>Ha ocurrido un error</h4>");
        },
    });
}

function borrarElemento(idElemento){
    //console.log(idElemento);

    $.ajax({
        url:"http://144.22.228.79:80/api/Reservation/"+idElemento,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            swal({
                title: "Desea eliminar este mensaje?",
                text: respuesta.startDate,
                icon: "warning",
                buttons: true,
                dangerMode: true,
              }).then((ok) => {
                if (ok) {
                    eliminar(idElemento);
                } else {
                  swal("Operacion cancelada!");
                }
              });
        }
    });
}

function eliminar(idElemento){
    $.ajax({
        url: "http://144.22.228.79:80/api/Reservation/"+idElemento,
        type: "DELETE",
        contentType:"application/JSON",
        dataType: "JSON",
        success:function(respuesta){
            $("#resultado").empty();
            //$("#validarCampos").html("<h4 style='color: green'>Se ha eliminado exitosamente</h4>");
            traerInformacion();
        }
    });
    swal("Reserva cancelada", {
        icon: "success",
      });
};


