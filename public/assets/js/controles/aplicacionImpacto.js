var alerta_AplicacionImpacto = document.getElementById("alerta_AplicacionImpacto");
var escenario =  $('#escenario').val();
function CargarDisenioImpacto() {
    
    
    //cargando las calificaicon de disneio
    $.ajax({
        method: "GET",
        url: $('#base_url').val()+"/main/getDisenioCalificacion",
        dataType: "JSON"
    })
    .done(function(respuesta) {
       

        if (respuesta) 
        {
            let datos = respuesta;
          

            $("#disenio_impac").empty();
            $("#disenio_impac").append('<option value="" selected>Diseño</option>');

           

            datos.data.forEach(dato => {
                
              
                    $("#disenio_impac").append('<option value='+dato["id"]+'>'+dato["caracteristica"]+'</option>');

                
                
             
            });
        } 
        else
        {  }
    
    })
    .fail(function(error) {
        // alert("Se produjo el siguiente error: ".err);
    })
    .always(function() {
    });

    

   
}

function LoadTableAplicacionImpacto($update,$delete) {
    if ($.fn.DataTable.isDataTable('#table_AplicacionImpacto')){
        
        $('#table_AplicacionImpacto').DataTable().rows().remove();
        $('#table_AplicacionImpacto').DataTable().destroy();
    
    }

    $('#table_AplicacionImpacto').DataTable({
        
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
        ajax: $('#base_url').val()+"/main/getAplicacionImpacto",
        aoColumns: [
            { "data": "id" },
            { "data": "idclasificacion" },
            { "data": "disenio" },
            { "data": "posicion" },
            { "data": "descripcion" },
            {
                data:null,
                "mRender":function(data){
                    $cadena = "";
                    if ($update == '1'){
                        $cadena =   $cadena +  `<editAplicacionImpacto data-id="${data.id}" class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editAplicacionImpacto>`;
                    
                    } 
                    if ($delete == '1') {
                        $cadena =     $cadena +  `<deleteAplicacionImpacto data-id="${data.id}" class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteAplicacionImpacto>`
                    }else return "<i class='fas fa-exclamation-circle text-danger font-size-18'></i>";
                    return $cadena;
                        
                }
            },
//             { "defaultContent": "<editAplicacionImpacto class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editAplicacionImpacto>"+
//             "<deleteAplicacionImpacto class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteAplicacionImpacto>"

// },
        ],
        columnDefs: [
            {
                "targets": [1 ],
                "visible": false,
                "searchable": false
            },
            
        ],
        'drawCallback': function () {
            $( 'table_AplicacionImpacto tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
    $("#table_AplicacionImpacto").DataTable().ajax.reload(null, true); 
}

document.getElementById("btnAgregar_AplicacionImpacto").addEventListener("click",function(){

    $("#modal_AplicacionImpacto").modal("show");
    document.getElementById("title-AplicacionImpacto").innerHTML = "Agregar Evaluacion de Control";
    document.getElementById("form_AplicacionImpacto").reset();
    document.getElementById("Agregar_AplicacionImpacto").style.display = "block";
    document.getElementById("Modificar_AplicacionImpacto").style.display = "none";
    if(escenario == 1){
        document.getElementById("apart_porcentaje_impac").style.display = "block";
    }else{
        document.getElementById("apart_posicion_impac").style.display = "block";
    }
});



// // boton de agregar evlauacion de control
document.getElementById("Agregar_AplicacionImpacto").addEventListener("click", function(){
    $escenario_proba=document.getElementById("escenario_impac").value;
    $disenio_proba=document.getElementById("disenio_impac").value;
    $posicion_proba="";
    $desc_proba=document.getElementById("desc_impac").value;
    if(escenario == 1){
        $posicion_proba=document.getElementById("porcentaje_impac").value;
    }else{
        $posicion_proba = document.getElementById("posicion_impac").value;
    }

    if($escenario_proba !=""  && $disenio_proba != "" && $posicion_proba != ""   && $desc_proba != ""){
      
                
                const postData = { 
                    escenario: document.getElementById("escenario_impac").value,
                    disenio:document.getElementById("disenio_impac").value,
                    posicion: $posicion_proba,
                    descripcion: document.getElementById("desc_impac").value,
                };
               
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/main/addAplicacionImpacto",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                     console.log(respuesta);
                        if (respuesta.error==1) 
                        {
                        
                            
                            $("#modal_AplicacionImpacto").modal("hide");    
                            document.getElementById("form_AplicacionImpacto").reset();
                           
                            alerta_AplicacionImpacto.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            respuesta.msg+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_AplicacionImpacto").DataTable().ajax.reload(null, false); 
                            CargarDisenioProbabilidad();
                        }else{
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: respuesta.msg
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
        
           
       
    }else{
        
        Swal.fire({
                 icon: 'error',
                 title: 'Error',
                 text: 'Debe completar todos los campos'
               })
  }

});

//editar  evlauacion de control
$('#table_AplicacionImpacto tbody').on( 'click', 'editAplicacionImpacto', function(){
    $("#modal_AplicacionImpacto").modal("show");
    document.getElementById("title-AplicacionImpacto").innerHTML = "Modificar Aplicacion de la Probabilidad";
    document.getElementById("form_AplicacionImpacto").reset();
    document.getElementById("Agregar_AplicacionImpacto").style.display = "none";
    document.getElementById("Modificar_AplicacionImpacto").style.display = "block";


    var table = $('#table_AplicacionImpacto').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    
    if (regNum == '0') {
        //console.log("error");
    }else{
        document.getElementById("id_AplicacionImpacto").value=regDat[0]["id"];
        document.getElementById("disenio_impac").value=regDat[0]["idclasificacion"];
        document.getElementById("desc_impac").value=regDat[0]["descripcion"];   
        document.getElementById("posicion_impac").value=regDat[0]["posicion"];   
        document.getElementById("escenario_impac").value=regDat[0]["escenario"];  
        if(escenario == 1){
            document.getElementById("apart_porcentaje_proba").style.display = "block";
        }else{
            document.getElementById("apart_posicion_proba").style.display = "block";
        }
        if(escenario == 1){
            document.getElementById("porcentaje_proba").value = regDat[0]["posicion"];
        }else{
            document.getElementById("posicion_proba").value= regDat[0]["posicion"];
        } 
    }
});
//guardando  evlauacion de control
document.getElementById("Modificar_AplicacionImpacto").addEventListener("click",function(){
    
    $escenario_proba=document.getElementById("escenario_impac").value;
    $disenio_proba=document.getElementById("disenio_impac").value;
    $posicion_proba="";
    $desc_proba=document.getElementById("desc_impac").value;
    if(escenario == 1){
        $posicion_proba=document.getElementById("porcentaje_impac").value;
    }else{
        $posicion_proba = document.getElementById("posicion_impac").value;
    }
    if($escenario_proba !=""  && $disenio_proba != "" && $posicion_proba != ""   && $desc_proba != ""){
      
                
                const postData = { 
                    escenario: document.getElementById("escenario_impac").value,
                    disenio:document.getElementById("disenio_impac").value,
                    posicion: $posicion_proba,
                    descripcion: document.getElementById("desc_impac").value,
                    id : document.getElementById("id_AplicacionImpacto").value,
                };
               
                try {
                   
                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/main/updateAplicacionImpacto",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                      
                        if (respuesta.msg) 
                        {
                            $("#modal_AplicacionImpacto").modal("hide");    
                            document.getElementById("form_AplicacionImpacto").reset();
                           
                            alerta_AplicacionImpacto.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            'Modificado Correctamente'+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_AplicacionImpacto").DataTable().ajax.reload(null, false); 
                            CargarDisenioProbabilidad();
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

//eliminar  evlauacion de control
$('#table_AplicacionImpacto tbody').on( 'click', 'deleteAplicacionImpacto', function(){
     
    //recuperando los datos
    var table = $('#table_AplicacionImpacto').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    const postData = { 
        id:regDat[0]["id"],
 
    };
    
    try {

        $.ajax({
            method: "POST",
            url: $('#base_url').val()+"/main/deleteAplicacionImpacto",
            data: postData,
            dataType: "JSON"
        })

     
        .done(function(respuesta) {
       
            if (respuesta.msg) 
            {
                
                alerta_AplicacionImpacto.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                respuesta.msg+
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                    '<span aria-hidden="true">&times;</span>'+
                    '</button>'+
                '</div>';

                $("#table_AplicacionImpacto").DataTable().ajax.reload(null, true); 
                cargarOpciones();
            }else{
                alerta_AplicacionImpacto.innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">'+
                respuesta.error+
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                    '<span aria-hidden="true">&times;</span>'+
                    '</button>'+
                '</div>';
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