//function traerInformacion(){location.reload(true);}
//Función para actualizar cada 60 segundos(60000 milisegundos)
//setInterval("traerInformacion()",60000);

function traerInformacion(){
    $("#resultado").html("<p class='loader text-center'>Cargando...</p>"); 
    $.ajax({
        url:"http://localhost:80/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(items){
    let myTable="<table id='informacion'>";
    let tableHeader = `<thead><tr>
    <th>NAME</th>
    <th>AGE</th>
    <th>EMAIL</th>
    <th>PASSWORD</th>
    <th></th>
    </thead></tr>`;
    myTable += tableHeader;


    for (i=0; i<items.length; i++ ) {
        myTable+="<tr>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].age+"</td>";
        myTable+="<td>"+items[i].email+"</td>";
        myTable+="<td>"+items[i].password+"</td>";
        myTable+="<td> <button class='mx-auto btn-danger btn-gradient' onclick='borrarElemento("+items[i].idClient+")'>Borrar</button> <button class='mx-auto btn-danger btn-gradient' onclick='Editar("+items[i].idClient+")'>Editar</button> </td>";
        // + items[i].name + items[i].email + items[i].age
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").html(myTable);
}

function Editar(items){
    $.ajax({
        url:"http://localhost:80/api/Client/"+items,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //console.log(respuesta);
            $("#id").val(respuesta.idClient),
            $("#name").val(respuesta.name),
            $("#age").val(respuesta.age),
            $("#email").val(respuesta.email),
            $("#password").val(respuesta.password)

            $("#btn-actualizar").show()
            $("#btn-guardar").hide()
        }
    });
}

function validar(opcion){
    if ($('#name').val().length == 0 || $('#email').val().length == 0 || $('#age').val().length == 0 || $('#age').val().length == 0) {
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
};


function guardarInformacion(){
    let myData={
        name:$("#name").val(),
        email:$("#email").val(),
        age:$("#age").val(),
        password:$("#password").val(),
    };
    let dataToSend=JSON.stringify(myData);
    //console.log(dataToSend);
    $.ajax({
        url: "http://localhost:80/api/Client/save",
        type: "POST",
        data: dataToSend,
        contentType:"application/JSON",
        datatype: "JSON",
        //async: false,
        success:function(respuesta){
            $(".datos-entrada").val("")
            $("#validarCampos").html("<h4 style='color: green'>Se ha registrado exitosamente</h4>");
            setTimeout(
                function(){ 
                    document.getElementById("validarCampos").innerHTML = "";
                }, 6000
                );
            traerInformacion();
        },
        error: function(respuesta) {
            $("#validarCampos").html("<h4 style='color: red'>El usuario ya se encuentra registrado</h4>");
        },
    });
    
}

function editarInformacion(){
    
    let myDataEditar={
        idClient:$("#id").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        age:$("#age").val(),
        password:$("#password").val(),
    };
    let dataToSendE=JSON.stringify(myDataEditar);
    $.ajax({
        url:"http://localhost:80/api/Client/update",
        type:"PUT",
        data:dataToSendE,
        contentType:"application/JSON",
        dataType:"JSON",
        //async: false,
        success:function(respuestaE){
            $(".datos-entrada").val("");
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
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: "http://localhost:80/api/Client/"+idElemento,
        type: "DELETE",
        data: dataToSend,
        contentType:"application/JSON",
        dataType: "JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#validarCampos").html("<h4 style='color: green'>Se ha eliminado exitosamente</h4>");
            setTimeout(
                function(){ 
                    document.getElementById("validarCampos").innerHTML = "";
                }, 6000
                );
            traerInformacion();
        }
    });
}


