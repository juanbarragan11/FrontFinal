function autoInicioRelacionCliente(){
    $.ajax({
        url:"http://129.151.112.156:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let $select = $("#select-client");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
            }); 
        }
    
    })
}

function autoInicioBike(){
    $.ajax({
        url:"http://129.151.112.156:8080/api/Bike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let $select = $("#select-bike");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
            }); 
        }
    
    })
}


function traerInfoMensaje(){
    $.ajax({
        url:"http://129.151.112.156:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            respuestaMensaje(respuesta);
        }
    })

}

function respuestaMensaje(respuesta){

    let myTable="<table>"
        myTable+="<tr>";
        myTable+="<td>Mensaje</td>";
        myTable+="<td>Bicicleta</td>";
        myTable+="<td>Cliente</td>";
        myTable+="<td>Opcion 1</td>";
        myTable+="<td>Opcion 2</td>";
    "</tr>";

    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td>"+respuesta[i].bike.name+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td> <button onclick=' actualizarInfoMensaje("+respuesta[i].idMessage+")'>Actualizar Mensaje</button>";
        myTable+="<td> <button onclick='borrarMensaje("+respuesta[i].idMessage+")'>Borrar Mensaje</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoMensajes").html(myTable);
}

function agregarMensaje(){
    if ($("#messagetext").val().length==0 ){
        alert("Todos los campos son obligatorios");
    }else{
    
    let var2 = {
        messageText:$("#messagetext").val(),
        bike:{id: +$("#select-bike").val()},
        client:{idClient: +$("#select-client").val()},
        };
       
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://129.151.112.156:8080/api/Message/save",
       
        
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
        });
    }
}

function actualizarInfoMensaje(idElemento){
    let myData={
        idMessage:idElemento,
        messageText:$("#messagetext").val(),
        bike:{id: +$("#select-bike").val()},
        client:{idClient: +$("#select-client").val()},

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.112.156:8080/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMensajes").empty();
            $("#messagetext").val("");
            traerInfoMensaje();
            alert("Dato Mensaje Actualizado")
        }
    });

}

function borrarMensaje(idElemento){
    let myData={
        idMessage:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url:"http://129.151.112.156:8080/api/Message/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInfoMensaje();
            alert("Dato Mensaje Eliminado.")
        }
    });

}