function autoInicioCategoria(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.112.156:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}
//Manejador GET
function traerInfoBicicleta() {
    $.ajax({
        url: "http://129.151.112.156:8080/api/Bike/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            respuestaBicicleta(response);
        }

    });
}

function respuestaBicicleta(response){

    let myTable="<table>"
    myTable+="<tr>";
        myTable+="<td>Nombre</td>";
        myTable+="<td>Modelo</td>";
        myTable+="<td>Año</td>";
        myTable+="<td>Descripcion</td>";
        myTable+="<td>Categoria</td>";
        myTable+="<td>Opcion 1</td>";
        myTable+="<td>Opcion 2</td>";
    "</tr>";

    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>" + response[i].name + "</td>";
        myTable+="<td>" + response[i].brand + "</td>";
        myTable+="<td>" + response[i].year + "</td>";
        myTable+="<td>" + response[i].description + "</td>";
        myTable+="<td>" + response[i].category.name + "</td>";
        myTable+='<td><button onclick="actualizarBicicleta(' + response[i].id + ')">Actualizar Bicicleta</button></td>';
        myTable+='<td><button onclick="borrarBicicleta(' + response[i].id + ')"> Borrar Bicicleta</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoBike1").html(myTable);
}


function agregarBicicleta() {

    if($("#name2").val().length == 0 || $("#brand").val().length == 0 || $("#year").val().length == 0 || $("#description2").val().length == 0){
       alert("Todos los campos son obligatorios")
    }else{

            let elemento = {
                name: $("#name2").val(),
                brand: $("#brand").val(),
                year: $("#year").val(),
                description: $("#description2").val(),
                category:{id: +$("#select-category").val()},
            }

            let dataToSend = JSON.stringify(elemento);
            console.log(elemento);

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "http://129.151.112.156:8080/api/Bike/save",
                data: dataToSend,
                datatype: 'json',

                success: function (response) {
                    console.log(response);
                    console.log("Dato Bicicleta Almacenado");
                    //Limpiar Campos
                    $("#resultado2").empty();
                    $("#name2").val("");
                    $("#brand").val("");
                    $("#year").val("");
                    $("#description2").val("");
                    

                    //Listar Tabla
                    alert("Dato Almacenado Correctamente")
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Error, Dato No Almacenado")
                }
            });
    }
}

//Manejador DELETE
function borrarBicicleta(idElemento) {
    var elemento = {
        id: idElemento
    }

    var dataToSend = JSON.stringify(elemento);
    console.log(dataToSend);
    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url: "http://129.151.112.156:8080/api/Bike/" + idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#resultadoBike1").empty();
                alert("Dato Bicicleta Eliminado")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error, Dato No Eliminado")
            }
        });
}

//Manejador PUT
function actualizarBicicleta(idElemento) {
    
    if($("#name2").val().length == 0 || $("#brand").val().length == 0 || $("#year").val().length == 0 || $("#description2").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            id: idElemento,
            name: $("#name2").val(),
            brand: $("#brand").val(),
            year: $("#year").val(),
            description: $("#description2").val(),
            category:{id: +$("#select-category").val()},
        }

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url:"http://129.151.112.156:8080/api/Bike/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#resultadoBike1").empty();
                listarSkate();
                alert("se ha Actualizado Correctamente!")

                //Limpiar Campos
                $("#resultadoBike1").empty();
                $("#id").val("");
                $("#name2").val("");
                $("#brand").val("");
                $("#year").val("");
                $("#description2").val("");


            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}
