var alerta_ValoracionRiesgo = document.getElementById("alerta_ValoracionRiesgo");


function cargarProbabilidadRiesgo() {
    //cargando las probabilidades
    $.ajax({
        method: "GET",
        url: $('#base_url').val()+"/main/getProbabilidadRiesgoByActivo",
        dataType: "JSON"
    })
    .done(function(respuesta) {
       

        if (respuesta) 
        {
            let datos = respuesta;
          

            $("#id_probabilidad").empty();
            $("#id_probabilidad").append('<option value="" selected>Probabilidad</option>');

           
           
            datos.data.forEach(dato => {
                
              
                    $("#id_probabilidad").append('<option value='+dato["id"]+'>'+dato["descripcion"]+'</option>');
                   
                
                
             
            });
           
           
        } 
        else
        {  }
    
    })
    .fail(function(error) {
        alert("Se produjo el siguiente error: ".err);
    })
    .always(function() {
    });


    
}
function cargarImpactoRiesgo() {
      //cargando las probabilidades
      $.ajax({
        method: "GET",
        url: $('#base_url').val()+"/main/getImpactoRiesgoByActivo",
        dataType: "JSON"
    })
    .done(function(respuesta) {
       

        if (respuesta) 
        {
            let datos = respuesta;
          

            $("#id_impacto").empty();
            $("#id_impacto").append('<option value="" selected>Impacto</option>');

            

            datos.data.forEach(dato => {
                
              
                    $("#id_impacto").append('<option value='+dato["id"]+'>'+dato["descripcion"]+'</option>');

                
                
             
            });
        } 
        else
        {  }
    
    })
    .fail(function(error) {
        alert("Se produjo el siguiente error: ".err);
    })
    .always(function() {
    });
}
function loadTableValoracionRiesgo($update,$delete) {
    
    
    

    if ($.fn.DataTable.isDataTable('#table_ValoracionRiesgo')){
        
        $('#table_ValoracionRiesgo').DataTable().rows().remove();
        $('#table_ValoracionRiesgo').DataTable().destroy();
    
    }

    $('#table_ValoracionRiesgo').DataTable({
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
            "infoFiltered": "(Filtrado de _MAX_ total entradas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        },
        scrollX: true,
        fixedColumns:   {
            heightMatch: 'none'
        },
        responsive: false,
        autoWidth: false,
        // processing: true,
        lengthMenu:[5,10,25,50],
        pageLength:10,
        clickToSelect:false,
        ajax: $('#base_url').val()+"/main/getValoracionRiesgo",
        aoColumns: [
            { "data": "id" },
            { "data": "idProbabilidad" },
            { "data": "probabilidad" },
            { "data": "idImpacto" },
            { "data": "impacto" },
            { "data": "valor" },
            {
                data:null,
                "mRender":function(data){
                    $cadena = "";
                    if ($update == '1'){
                        $cadena =   $cadena +  `<editValoracionRiesgo data-id="${data.id}" class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editValoracionRiesgo>`;
                    
                    } 
                    if ($delete == '1') {
                        $cadena =     $cadena +  `<deleteValoracionRiesgo data-id="${data.id}" class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteValoracionRiesgo>`
                    }else return "<i class='fas fa-exclamation-circle text-danger font-size-18'></i>";
                    return $cadena;
                        
                }
            },
//             { "defaultContent": "<editValoracionRiesgo class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='mdi mdi-pencil font-size-18'></i></editValoracionRiesgo>"+
//             "<deleteValoracionRiesgo class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='mdi mdi-trash-can font-size-18'></i></deleteValoracionRiesgo>"

// },
        ],
        columnDefs: [
            {
                "targets": [ 1,3 ],
                "visible": false,
                "searchable": false
            },
            
        ],
        'drawCallback': function () {
            $( 'table_area tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
   
}

//area empresa
document.getElementById("btnAgregar_ValoracionRiesgo").addEventListener("click",function(){
                                
    $("#modal_ValoracionRiesgo").modal("show");    
    document.getElementById("title-ValoracionRiesgo").innerHTML = "Agregar";
    document.getElementById("form_ValoracionRiesgo").reset();
    document.getElementById("Agregar_ValoracionRiesgo").style.display = "block";
    document.getElementById("Modificar_ValoracionRiesgo").style.display = "none";
});


// // boton de agregar Area Empresa
document.getElementById("Agregar_ValoracionRiesgo").addEventListener("click",function(){
    $probabilidad=document.getElementById("id_probabilidad").value; 
    $impacto=document.getElementById("id_impacto").value;    
    $valor=document.getElementById("valor_valoracion").value;
  
    if($probabilidad !=""  && $impacto != "" && $valor != ""){
       
                const postData = { 
                     probabilidad:$probabilidad,
                     impacto:$impacto, 
                     valor:$valor,                    
                };
               
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/main/addValoracionRiesgo",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                        if (respuesta.error==1) 
                        {
                        
                            
                            $("#modal_ValoracionRiesgo").modal("hide");    
                            document.getElementById("form_ValoracionRiesgo").reset();
                           
                            alerta_ValoracionRiesgo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            respuesta.msg+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_ValoracionRiesgo").DataTable().ajax.reload(null, false); 
                            cargarMatrisRiesgo();
                        }else{
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: respuesta.msg
                              })
                        } 
                        
                    })
                    .fail(function(error) {
                        alert("Error en el ajax");
                    })
                    .always(function() {
                    });
                }
                catch(err) {
                    alert("Error en el try");
                }
            
           
       
    }else{
       
        Swal.fire({
                 icon: 'error',
                 title: 'Error',
                 text: 'Faltan Datos'
               })
  }
   


});

 // editar Area
$('#table_ValoracionRiesgo tbody').on( 'click', 'editValoracionRiesgo', function(){
    $("#modal_ValoracionRiesgo").modal("show");
    document.getElementById("title-ValoracionRiesgo").innerHTML = "Modificar";
    document.getElementById("form_ValoracionRiesgo").reset();
    document.getElementById("Agregar_ValoracionRiesgo").style.display = "none";
    document.getElementById("Modificar_ValoracionRiesgo").style.display = "block";
   
    //recuperando los datos
    var table = $('#table_ValoracionRiesgo').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    if (regNum == '0') {
        //console.log("error");
    }else{
        console.log(regDat[0]["idempresa"]);
        document.getElementById("id_ValoracionRiesgo").value=regDat[0]["id"]; 
        document.getElementById("id_probabilidad").value=regDat[0]["idProbabilidad"];
        document.getElementById("id_impacto").value=regDat[0]["idImpacto"];
        document.getElementById("valor_valoracion").value=regDat[0]["valor"];                
      
    }
});

//guardando la nueva info
document.getElementById("Modificar_ValoracionRiesgo").addEventListener("click", function(){
    
    $probabilidad=document.getElementById("id_probabilidad").value; 
    $impacto=document.getElementById("id_impacto").value;    
    $valor=document.getElementById("valor_valoracion").value;
  
    if($probabilidad !=""  && $impacto != "" && $valor != ""){
       
                const postData = { 
                    id:document.getElementById("id_ValoracionRiesgo").value,
                    probabilidad:$probabilidad,
                    impacto:$impacto, 
                    valor:$valor,                    
                };
               
              
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/main/updateValoracionRiesgo",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                       console.log(respuesta);
                        if (respuesta) 
                        {
                            $("#modal_ValoracionRiesgo").modal("hide");
                            document.getElementById("form_ValoracionRiesgo").reset();
                            
                            alerta_ValoracionRiesgo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            'Modificado'+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_ValoracionRiesgo").DataTable().ajax.reload(null, false); 
                            cargarMatrisRiesgo();
                        } 
                        
                    })
                    .fail(function(error) {
                        // alert("Error en el ajax");
                    })
                    .always(function() {
                    });
                }
                catch(err) {
                    // alert("Error en el try");
                }
            
           
       
    }else{
       
        Swal.fire({
                 icon: 'error',
                 title: 'Error',
                 text: 'Faltan Datos'
               })
  }
   
});

//eliminar
$('#table_ValoracionRiesgo tbody').on( 'click', 'deleteValoracionRiesgo', function(){
     
    //recuperando los datos
    var table = $('#table_ValoracionRiesgo').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    const postData = { 
        id:regDat[0]["id"],
 
    };
    
    try {

        $.ajax({
            method: "POST",
            url: $('#base_url').val()+"/main/deleteValoracionRiesgo",
            data: postData,
            dataType: "JSON"
        })

     
        .done(function(respuesta) {
             console.log(respuesta);
            if (!respuesta.error) 
            {
                
                alerta_ValoracionRiesgo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                respuesta.msg+
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                    '<span aria-hidden="true">&times;</span>'+
                    '</button>'+
                '</div>';

                $("#table_ValoracionRiesgo").DataTable().ajax.reload(null, true); 
               
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: respuesta.error
                })
            } 
            
        })
        .fail(function(error) {
            // alert("Error en el ajax");
        })
        .always(function() {
        });
    }
    catch(err) {
        // alert("Error en el try");
    }
});

function generateData(count, yrange) {
    console.log(count);
    console.log(yrange);
    var i = 0;
    var series = [];
    while (i < count) {
      var x = (i + 1).toString();
      var y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    
      series.push({
        x: x,
        y: y
      });
      i++;
    }
    console.log(series);
    return series;
}


async function cargarMatrisRiesgo() {

    let promise = new Promise((resolve, reject) => {
    //   setTimeout(() => resolve("done!"), 1000)
    let result;
          
                            $.ajax({
                                method: "GET",
                                // url: $('#base_url').val()+"/main/getDataMatriz",
                                url: $('#base_url').val()+"/main/getProbabilidadRiesgoByActivo",
                                dataType: "JSON"
                            })
                            .done(function(respuesta) {
                           
                               resolve(respuesta['data']);
        
                            })
                            
    });
    let promise2 = new Promise((resolve, reject) => {
        //   setTimeout(() => resolve("done!"), 1000)
        let result;
              
                                $.ajax({
                                    method: "GET",
                                    url: $('#base_url').val()+"/main/getImpactoRiesgoByActivo",
                                   
                                    dataType: "JSON"
                                })
                                .done(function(respuesta) {
                               
                                   resolve(respuesta['data']);
            
                                })
                                
        });
        let promise3 = new Promise((resolve, reject) => {
            //   setTimeout(() => resolve("done!"), 1000)
            let result;
                  
                                    $.ajax({
                                        method: "GET",
                                        url: $('#base_url').val()+"/main/getDataMatriz",
                                       
                                        dataType: "JSON"
                                    })
                                    .done(function(respuesta) {
                                   
                                       resolve(respuesta['data']);
                
                                    })
                                    
            });
    let resultado = await promise; // wait until the promise resolves (*
    let resultado2 = await promise2;
    let resultado3 = await promise3;

        var datos_matriz = document.getElementById("datos");
        $cont = 0;
        datos_matriz.innerHTML  = "";
        $cadena_inicio= "";
        resultado.forEach(element => {
           
            if($cont==0){
                $cadena_inicio = $cadena_inicio +  "<tr>"+
                "<td rowspan='5' style='width:85px'><p style='transform: rotate(270deg)''>Probabilidad</p> </td>"+
                "<td >"+element.descripcion+"<br> " +element.valor1+" - "+element.valor2+ "</td>";
                for (let index = 0; index < resultado2.length; index++) {
                  
                    // const element = array[index];
                        if($cont == 0){
                            $aux = 0;
                            resultado3.forEach(dato => {
                              
                                if(element.valor1+" - "+element.valor2 == dato.valorProbabilidad 
                                && resultado2[index]['valor1']+" - "+resultado2[index]['valor2'] == dato.valorImpacto){
                                   
                                    $cadena_inicio = $cadena_inicio+ "<td >"+element.valor2 * resultado2[index]['valor2'] +" <br>"+dato.valor+"</td>"; 
                                    
                                }
                                // else{
                                //     if($aux == 0){
                                //         $cadena_inicio = $cadena_inicio+ "<td >"+element.valor2 * resultado2[index]['valor2'] +"</td>"; 
                                //     }
                        
                                //     $aux++;
                                // }
                               
                            });
                          
                        }
                    
                   }
              
            }else{
             
                $cadena_inicio = $cadena_inicio + "<tr>"+
                    "<td >"+element.descripcion+"<br> " +element.valor1+" - "+element.valor2+ "</td>";
                 
                   for (let index = 0; index < resultado2.length; index++) {
                  
                    // const element = array[index];
                        if($cont < resultado2.length){
                            $aux = 0;
                            resultado3.forEach(dato => {
                                
                                if(element.valor1+" - "+element.valor2 == dato.valorProbabilidad 
                                && resultado2[index]['valor1']+" - "+resultado2[index]['valor2'] == dato.valorImpacto){
                                 
                                    $cadena_inicio = $cadena_inicio+ "<td >"+element.valor2 * resultado2[index]['valor2'] +" <br>"+dato.valor+"</td>"; 
                                    // $aux++;
                                }
                                // else{
                                //     if($aux == 0){
                                //         $cadena_inicio = $cadena_inicio+ "<td >"+element.valor2 * resultado2[index]['valor2'] +"</td>"; 
                                //     }
                        
                                //     $aux++;
                                // }
                                // console.log( dato.valorImpacto);
                                // console.log( dato.valorProbabilidad);
                                // if(dato.valorProbabilidad  == ""
                                // || dato.valorImpacto ==  ""){
                                //     console.log( dato.valorImpacto);
                                //     console.log( dato.valorProbabilidad);
                                //     $cadena_inicio = $cadena_inicio+ "<td >"+element.valor2 * resultado2[index]['valor2'] +"</td>"; 
                                //     // $aux++;
                                // }
                                // else{
                                   
                                //     if($aux == 0){
                                //         console.log("ahora aqui");
                                //     // //     console.log("ahora aqui");
                                //     //    $cadena_inicio = $cadena_inicio+ "<td >"+element.valor2 * resultado2[index]['valor2'] +"</td>"; 
                                //     //  
                                //      }
                                //      $aux++;
                                   
                                // }
                               
                            });
                            // $cadena_inicio = $cadena_inicio+ "<td >"+element.valor2 * resultado2[index]['valor2'] +"</td>"; 
                        }
                    
                   }
              
            }
            $cont ++;
           
        });
        datos_matriz.innerHTML += $cadena_inicio;

        $cont2 = 0;
        $cadena  = "";
      $inicio= "<tr> <td rowspan='2' colspan='2'></td>";
      $fin = "</tr><tr><td colspan='5'>Impacto</td></tr>"
        resultado2.forEach(element => {
            if($cont2 == 0){
                
              $cadena = $cadena + $inicio+"<td >"+element.descripcion+"<br>"+element.valor1+" - "+element.valor2+"</td>";
            }else{
                if($cont2 == resultado2.length-1){
                    
                    $cadena = $cadena +"<td >"+element.descripcion+"<br>"+element.valor1+" - "+element.valor2+"</td>"+$fin;
                }else{
                    
                    $cadena = $cadena +"<td >"+element.descripcion+"<br>"+element.valor1+" - "+element.valor2+"</td>";
                }
              
            }
          
            // datos_matriz.innerHTML += "<tr>"+
                  
            //     "<td rowspan='2' colspan='2'></td>"+
            
                
            //     "<td >Insignificante</td>"+
            //     "<td >Menor</td>"+
            //     "<td >Moderado</td>
            //     <td >Alcalde</td>
            //     <td >Catastrófico</td>
            // </tr>
            $cont2 ++;
        });
        datos_matriz.innerHTML += $cadena;
    
}