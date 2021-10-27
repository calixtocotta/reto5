function data_user(){
    $.get("/user", function (data) {
        $("#user").html(data.name);
        //console.log(data.name);
    });
    $.get("/photo", function (data_photo) {
        $("#photo").attr("src",data_photo.foto_id);
        //console.log(data_photo.foto_id);
        //$("#resultado").html("<p class='loader text-center'>Cargando...</p>"); 
    });
    
}