/* global fetch */

//function traerInformacion(){location.reload(true);}
//Función para actualizar cada 60 segundos(60000 milisegundos)
//setInterval("traerInformacion()",60000);

function traerInformacion(){
    $("#id").hide()
    $("#resultado").html("<p class='loader text-center'>Cargando...</p>");
    $.ajax({
        url:"http://144.22.228.79:80/api/Category/all",
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
    <th>NOMBRE</th>
    <th>DESCRIPCIÓN</th>
    <th></th>
    </thead></tr>`;
    myTable += tableHeader;
    for (i=0; i<items.length; i++ ) {
        
        myTable+="<tr>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].description+"</td>";
        myTable+="<td> <button class='mx-auto btn-danger btn-gradient' onclick='borrarElemento("+items[i].id+")'>Borrar</button> <button class='mx-auto btn-danger btn-gradient' id='editar' onclick='Editar("+items[i].id+")'>Editar</button> </td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").html(myTable);
}

function Editar(items){
    //$("#resultado").html("<p class='loader text-center'>Cargando...</p>");
    $.ajax({
        url:"http://144.22.228.79:80/api/Category/"+items,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //console.log(respuesta);
            
            $("#name").val(respuesta.name),
            $("#description").val(respuesta.description),
            $("#id").val(respuesta.id),

            $("#btn-actualizar").show()
            $("#btn-guardar").hide()
        }
    });
}

function validar(opcion){
    
    if ($('#name').val().length == 0 || $('#description').val().length == 0) {
        //console.log($('#name').val());
        //console.log($('#description').val());
        $("#validarCampos").html("<h4 style='color: red'>Todos los campos son necesarios</h4>");
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
        name:$("#name").val(),
        description:$("#description").val()
    };
    let dataToSend=JSON.stringify(myData);
    //console.log(dataToSend);
    $.ajax({
        url: "http://144.22.228.79:80/api/Category/save",
        type: "POST",
        data: dataToSend,
        contentType:"application/JSON",
        datatype: "JSON",
        success:function(respuesta){
            $(".registro").val(""),
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
        id:$("#id").val(),
        name:$("#name").val(),
        description:$("#description").val()

    };
    let dataToSendE=JSON.stringify(myDataEditar);
    //console.log(dataToSendE);
    $.ajax({
        url:"http://144.22.228.79:80/api/Category/update",
        type:"PUT",
        data:dataToSendE,
        contentType:"application/JSON",
        dataType:"JSON",
        //async: false,
        success:function(respuestaE){
            $(".registro").val("");
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
            $("#validarCampos").html("<h4 style='color: red'>El usuario no se encuentra registrado</h4>");
        },
    });
}

function borrarElemento(idElemento){
    $.ajax({
        url:"http://144.22.228.79:80/api/Category/"+idElemento,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            swal({
                title: "Desea eliminar esta categoria?",
                text: respuesta.name,
                icon: "warning",
                buttons: true,
                dangerMode: true,
              }).then((ok) => {
                if (ok) {
                    eliminar(idElemento);
                } else {
                  swal("Operación cancelada");
                }
              });
        }
    });
}

function eliminar(idElemento){
    $.ajax({
        url: "http://144.22.228.79:80/api/Category/"+idElemento,
        type: "DELETE",
        contentType:"application/JSON",
        dataType: "JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacion();
        }
    });
    swal("Categoria eliminado", {
        icon: "success",
      });
}


