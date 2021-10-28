function traerInformacion(){location.reload(true);}
//Función para actualizar cada 60 segundos(60000 milisegundos)
setInterval("traerInformacion()",60000);

function traerInformacion(){
    $("#resultado").html("<p class='loader text-center'>Cargando...</p>"); 
    $.ajax({
        url:"http://localhost:80/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(items){
    let myTable="<table id='informacion'>";
    let tableHeader = `<thead><tr>
    <th>ID</th>
    <th>MENSAJE</th>
    <th></th>
    </thead></tr>`;
    myTable += tableHeader;


    for (i=0; i<items.length; i++ ) {
        myTable+="<tr>";
        myTable+="<td>"+items[i].id+"</td>";
        myTable+="<td>"+items[i].messagetext+"</td>";
        myTable+="<td> <button class='mx-auto btn-danger btn-gradient' onclick='borrarElemento("+items[i].id+")'>Borrar</button> <button class='mx-auto btn-danger btn-gradient' onclick='recuperarInformacion("+items[i].id+")'>Editar</button> </td>";
        // + items[i].name + items[i].email + items[i].age
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").html(myTable);
}

function recuperarInformacion(id){
    let idMensaje = id;
    $.ajax({
        url:"https://g8f8de2cd8423f5-dbreto1.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaM){
            console.log(respuestaM);
            informacion(idMensaje,respuestaM.items);
            
            
        }
    });  
}

function informacion(idM,itemsM){
    for (i=0; i<itemsM.length; i++ ) {
        if (idM == itemsM[i].id){
            $(".idM").val(itemsM[i].id),
            $(".messagetextM").val(itemsM[i].messagetext)
        }
    }
}

function validar(){
    if ($('#id').val().length == 0 || $('#messagetext').val().length == 0) {
        alert('Todos los campos son necesarios');
        return false;
    }else{
        guardarInformacion();
    }
};

function guardarInformacion(){
    let myData={
        id:$("#id").val(),
        messagetext:$("#messagetext").val()
    }
    let dataToSend=JSON.stringify(myData)

    $.ajax({
        url: "https://g8f8de2cd8423f5-dbreto1.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
        type: "POST",
        data: dataToSend,
        contentType:"application/JSON",
        datatype: "JSON",
        success:function(respuesta){
            
            $("#id").val(""),
            $("#messagetext").val(""),
            
            
            alerta("Se ha guardado con exito");
            traerInformacion();
        }
    });
    traerInformacion();
}




function editarInformacion(){
    
    let myData={
        id:$("#id").val(),
        messagetext:$("#messagetext").val()
    };
    let dataToSend=JSON.stringify(myData)

    $.ajax({
        url: "https://g8f8de2cd8423f5-dbreto1.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
        type: "PUT",
        data: dataToSend,
        contentType:"application/JSON",
        dataType: "JSON",
        success:function(respuesta){
            
            $("#id").val(""),
            $("#messagetext").val("")
            alerta("Se ha actualizado con exito");
            traerInformacion();
            
        }
    });
    traerInformacion();
}

function borrarElemento(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: "https://g8f8de2cd8423f5-dbreto1.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
        type: "DELETE",
        data: dataToSend,
        contentType:"application/JSON",
        dataType: "JSON",
        success:function(respuesta){
            traerInformacion();
            alert("Se la eliminado con exito.");
        }
    });
}

$(document).ready(function(){
    traerInformacion();
})