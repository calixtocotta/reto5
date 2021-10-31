function traerInformacion(){location.reload(true);}
//Función para actualizar cada 4 segundos(4000 milisegundos)
  setInterval("traerInformacion()",600000);

function itemsCategory(){
    $.ajax({
        url:"http://144.22.228.79:80/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let mySelect="<select id='category'>";
            mySelect+="<option value='null' id='select-category'>Selecione una categoria</option>"
            for(i=0;i<respuesta.length;i++){
                mySelect+="<option value="+respuesta[i].id+" id="+respuesta[i].id+">"+ respuesta[i].name+"</option>";
            }
            mySelect+="</select>"
            $("#resultado-category").html(mySelect); 
        }
    });
}

function traerInformacion(){
    $("#id").hide()
    $("#resultado").html("<p class='loader text-center'>Cargando...</p>"); 
    $.ajax({
        url:"http://144.22.228.79:80/api/Skate/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);

        }
    });
}

function pintarRespuesta(items){
    $("#informacion").remove();
    let myTable="<table id='informacion'>";
    let tableHeader = `<thead><tr>
    <th>NAME</th>
    <th>BRAND</th>
    <th>YEAR</th>
    <th>DESCRIPTION</th>
    <th>CATEGORY</th>
    <th></th>
    </thead></tr>`;
    myTable += tableHeader;

    
    for (i=0; i<items.length; i++ ) {
        
        myTable+="<tr>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].brand+"</td>";
        myTable+="<td>"+items[i].year+"</td>";
        myTable+="<td>"+items[i].description+"</td>";
        myTable+="<td>"+items[i].category.name+"</td>";
        myTable+="<td> <button class='mx-auto btn-danger btn-gradient' onclick='borrarElemento("+items[i].id+")'>Borrar</button> <button class='mx-auto btn-danger btn-gradient' onclick='Editar("+items[i].id+")'>Editar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    //$("#id").val(items.length+1)
    $("#resultado").html(myTable);
}

function Editar(items){
    $.ajax({
        url:"http://144.22.228.79:80/api/Skate/"+items,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //console.log(respuesta);
            //id: 4, name: 'Tabla ganadora', brand: 'Sk8', year: 2020, description: 'Tabla ganadora'
            $("#name").val(respuesta.name),
            $("#description").val(respuesta.description),
            $("#id").val(respuesta.id),
            $("#year").val(respuesta.year),
            $("#brand").val(respuesta.brand),
            $("#"+respuesta.category.id).attr("selected", true)
            $("#btn-actualizar").show()
            $("#btn-guardar").hide()
        }
    });
}

function validar(opcion){
    //console.log($("#category").val())
    if ($('#brand').val().length == 0 || $('#year').val().length == 0 || $('#category').val() == "null" || $('#name').val().length == 0 || $('#description').val().length == 0) {
        if($("#category").val()=="null"){
            $("#validarCampos").html("<h4 style='color: red'>Selecione una categoria</h4>");
        }else{
            $("#validarCampos").html("<h4 style='color: red'>Todos los campos son necesarios</h4>");
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
};

//id: 1, name: 'Tabla ganadora', brand: 'Sk8', year: 2020, description: 'Tabla ganadora'
function guardarInformacion(){
    let myData={
        name:$("#name").val(),
        brand:$("#brand").val(),
        year:$("#year").val(),
        description:$("#description").val(),
        category:{"id":$("#category").val()}
    };
    let dataToSend=JSON.stringify(myData);
    //console.log(dataToSend);
    
    $.ajax({
        url: "http://144.22.228.79:80/api/Skate/save",
        type: "POST",
        data: dataToSend,
        contentType:"application/JSON",
        datatype: "JSON",
        success:function(respuesta){
            
            $(".datos-entrada").val(""),
            $("#select-category").attr("selected", true),
            $("#validarCampos").html("<h4 style='color: green'>Se ha registrado exitosamente</h4>");
            setTimeout(
                function(){ 
                    document.getElementById("validarCampos").innerHTML = "";
                }, 6000
                );
            traerInformacion();
            
        }
    });
    traerInformacion();
    
}


function editarInformacion(){
    
    let myData={
        id:$("#id").val(),
        name:$("#name").val(),
        brand:$("#brand").val(),
        year:$("#year").val(),
        description:$("#description").val(),
        category:{"id":$("#category").val()}
    };
    let dataToSend=JSON.stringify(myData)
    //console.log(dataToSend);
    //console.log();

    $.ajax({
        url: "http://144.22.228.79:80/api/Skate/update",
        type: "PUT",
        data: dataToSend,
        contentType:"application/JSON",
        dataType: "JSON",
        success:function(respuesta){
            $(".datos-entrada").val(""),
            $("#select-category").attr("selected", true),
            $("#validarCampos").html("<h4 style='color: green'>Se ha registrado exitosamente</h4>");
            setTimeout(
                function(){ 
                    document.getElementById("validarCampos").innerHTML = "";
                }, 6000
                );
            traerInformacion();
        }
    });
}

function borrarElemento(idElemento){
    $.ajax({
        url:"http://144.22.228.79:80/api/Skate/"+idElemento,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            swal({
                title: "Desea eliminar esta Patineta?",
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
        url: "http://144.22.228.79:80/api/Skate/"+idElemento,
        type: "DELETE",
        contentType:"application/JSON",
        dataType: "JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacion();
        }
    });
    swal("Patineta eliminado", {
        icon: "success",
      });
}
