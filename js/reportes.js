function traerReporteStatus(){
    console.log("test");
    $.ajax({
        url:"http://129.151.112.156:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            respuestaStatus(respuesta);
        }
    });
}

function respuestaStatus(respuesta){
    let myTable="<table>";
    myTable+="<tr>";
       myTable+="<th>Completadas</th>";
        myTable+="<td>"+respuesta.completed+"</td>";
        myTable+="<th>Canceladas</th>";
        myTable+="<td>"+respuesta.cancelled+"</td>";
        myTable+="</tr>";
    myTable+="</table>";
    $("#resultadoStatus").html(myTable);
    
}


function traerReporteDate(){
    if($("#RstarDate").val().length == 0 || $("#RdevolutionDate").val().length == 0){
        alert("Ingrese Fecha de inicio y de devolución")
     }else{

    var fechaInicio = document.getElementById("RstarDate").value;
    var fechaCierre = document.getElementById("RdevolutionDate").value;
    console.log(fechaInicio);
    console.log(fechaCierre);
    
        $.ajax({
            url:"http://129.151.112.156:8080/api/Reservation/report-dates/"+fechaInicio+"/"+fechaCierre,
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                respuestaDate(respuesta);
            }
        });
    }
}

function respuestaDate(respuesta){

    let myTable="<table>";
    myTable+="<tr>";
    myTable+="<tr><th>Fecha Inicio</th><th>Fecha Final</th><th>Status</th></tr>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="</tr>";
        }
        myTable+="</table>";
        $("#resultadoDate").html(myTable);
}


function traerReporteClientes(){
        $.ajax({
            url:"http://129.151.112.156:8080/api/Reservation/report-clients",
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                respuestaClientes(respuesta);
            }
        });
}

    
function respuestaClientes(respuesta){

    let myTable="<table>";
    myTable+="<tr>";
    myTable+="<tr><th>Nombre</th><th>Correo</th><th>Edad</th><th>Reservas Totales</th></tr>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].client.email+"</td>";
        myTable+="<td>"+respuesta[i].client.age+"</td>";
        myTable+="<td>"+respuesta[i].total+"</td>";
        myTable+="</tr>";
        }
        myTable+="</table>";
        $("#resultadoClientes").html(myTable);
}