function traerInfoCategoria(){
        $.ajax({
        url:"http://129.151.112.156:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            respuestaCategoria(respuesta);
        }
    });
}

function respuestaCategoria(respuesta){
    let myTable="<table>"
        myTable+="<tr>";
        myTable+="<td>Nombre</td>";
        myTable+="<td>Descripcion</td>";
        myTable+="<td>Opcion 1</td>";
        myTable+="<td>Opcion 2</td>";
    "</tr>";
    
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button onclick=' actualizarInfoCategoria("+respuesta[i].id+")'>Actualizar Categoria</button>";
        myTable+="<td> <button onclick='borrarCategoria("+respuesta[i].id+")'>Borrar Categoria</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}


function agregarCategoria(){
    if ($("#Cname").val().length==0 || $("#Cdescription").val().length==0){
        alert("Todos los campos son obligatorios");
    }else{
   
    let var2 = {
        name:$("#Cname").val(),
        description:$("#Cdescription").val()
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://129.151.112.156:8080/api/Category/save",
       
        
        success:function(response) {
            console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });}

}

function actualizarInfoCategoria(idElemento){
    
    if ($("#Cname").val().length==0 || $("#Cdescription").val().length==0){
        alert("Todos los campos son obligatorios");
    }else{
    
    
    let myData={
        id:idElemento,
        name:$("#Cname").val(),
        description:$("#Cdescription").val()

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.112.156:8080/api/Category/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado1").empty();
            $("#id").val("");
            $("#Cname").val("");
            $("#Cdescription").val("");
            traerInformacionCategorias();
            alert("se ha Actualizado correctamente la categoria")
        }
    });}

}

function borrarCategoria(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url:"http://129.151.112.156:8080/api/Category/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado1").empty();
            alert("Dato Eliminado");
            traerInformacionCategorias();
        }
    });

}
