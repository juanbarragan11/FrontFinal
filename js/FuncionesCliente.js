/////////Tabla Cliente////////////////////////////

function traerInfoCliente(){
    $.ajax({
        url: "http://129.151.112.156:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            respuestaCliente(response);
        }
    });
}

function respuestaCliente(respuesta){
    let myTable="<table>"
        myTable+="<tr>";
        myTable+="<td>Email</td>";
        myTable+="<td>Contraseña</td>";
        myTable+="<td>Nombre</td>";
        myTable+="<td>Edad</td>";
        myTable+="<td>Opcion 1</td>";
        myTable+="<td>Opcion 2</td>";
    "</tr>";

    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td> <button onclick=' actualizarInfoCliente("+respuesta[i].idClient+")'>Actualizar Cliente</button>";
        myTable+="<td> <button onclick='borrarCliente("+respuesta[i].idClient+")'>Borrar Cliente</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado3").html(myTable);
}

function agregarCliente(){
    let var2 = {
        email:$("#Clemail").val(),
        password:$("#Clpassword").val(),
        name:$("#Clname").val(),
        age:$("#Clage").val(),
     
        };
       
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://129.151.112.156:8080/api/Client/save",
       
        
        success:function(response) {
            console.log(response);
            console.log("Dato Cliente Almacenado");
            alert("Dato Cliente Almacenado");
            window.location.reload()
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
        }
        });

}

function actualizarInfoCliente(idElemento){
    let myData={
        idClient:idElemento,
        email:$("#Clemail").val(),
        password:$("#Clpassword").val(),
        name:$("#Clname").val(),
        age:$("#Clage").val(),
    };

    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    
    $.ajax({
        url:"http://129.151.112.156:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado3").empty();
            $("#idClient").val("");
            $("#Clemail").val("");
            $("#Clpassword").val("");
            $("#Clname").val("");
            $("#Clage").val("");
            traerInfoCliente();
            alert("Dato Cliente Actualizado")
        }
    });

}

function borrarCliente(idElemento){
    let myData={
        idClient:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url:"http://129.151.112.156:8080/api/Client/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado3").empty();
            traerInfoCliente();
            alert("Dato Cliente Eliminado.")
        }
    });

}