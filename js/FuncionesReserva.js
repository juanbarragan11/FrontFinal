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

//Manejador "POST"
function agregarReservacion() {
    
    if($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0){
        alert("Todos los campos son Obligatorios o el dato Status esta mal escrito")
    }else{  
        let elemento = {
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            bike:{id: +$("#select-bike").val()},
            client:{idClient: +$("#select-client").val()},   
        }

        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://129.151.112.156:8080/api/Reservation/save",
            data: dataToSend,
            datatype: "json",

            success: function (response) {
                console.log(response);
                $("#miListaReservation").empty();
                $("#startDate").val("");
                $("#devolutionDate").val("");
                $("#status").val("");
                alert("Se ha guardado Correctamente")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se guardo Correctamente!")
            }
        });
    }
}



function traerInfoReservacion(){
    $.ajax({
        url: "http://129.151.112.156:8080/api/Reservation/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            respuestaReservacion(response);
        }
    });
}

function respuestaReservacion(response){
   
    let myTable="<table>";
    myTable+="<tr>";
        myTable+="<td>Fecha Inicio</td>";
        myTable+="<td>fecha Devolucion</td>";
        myTable+="<td>Estado</td>";
        myTable+="<td>Bicicleta</td>";
        myTable+="<td>Cliente</td>";
        myTable+="<td>Opcion 1</td>";
        myTable+="<td>Opcion 2</td>";
     "</tr>";
      
    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>"+response[i].startDate+"</td>";
        myTable+="<td>"+response[i].devolutionDate+"</td>";
        myTable+="<td>"+response[i].status+"</td>";
        myTable+="<td>"+response[i].bike.name+"</td>";
        myTable+="<td>"+response[i].client.name+"</td>";
        myTable+='<td><button  onclick="actualizarReservacion(' + response[i].idReservation + ')">Actualizar Reserva</button></td>';
        myTable+='<td><button  onclick="borrarReservacion(' + response[i].idReservation + ')">Borrar Reserva</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#miListaReservation").html(myTable);
}


//Manejador DELETE
function borrarReservacion(idElemento) {
    let elemento = {
        id: idElemento
    }

    let dataToSend = JSON.stringify(elemento);

    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url: "http://129.151.112.156:8080/api/Reservation/" + idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#miListaReservation").empty();
                alert("Dato Reservacion Eliminado")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("Dato Reservacion no Eliminado")
            }
        });
}


//Manejador PUT
function actualizarReservacion(idElemento) {
    
    if($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            idReservation: idElemento,
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            bike:{id: +$("#select-bike").val()},
            client:{idClient: +$("#select-client").val()},
        }

        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url: "http://129.151.112.156:8080/api/Reservation/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#miListaReservation").empty();
                alert("se ha Actualizado Correctamente!")

                //Limpiar Campos
                $("#resultado5").empty();
                $("#startDate").val("");
                $("#devolutionDate").val("");
                $("#status").val("");

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}