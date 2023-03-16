
var alerta_CalificacionDise = document.getElementById("alerta_CalificacionDise");

function LoadTableCalificacionDise() {
    if ($.fn.DataTable.isDataTable('#table_CalificacionDise')){
        
        $('#table_CalificacionDise').DataTable().rows().remove();
        $('#table_CalificacionDise').DataTable().destroy();
    
    }

    $('#table_CalificacionDise').DataTable({
        
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
        ajax: $('#base_url').val()+"/main/getCalificacionDise",
        aoColumns: [
            { "data": "id" },
            { "data": "clasificacion" },
            { "data": "descripcion" },
            { "data": "condicion" },
            { "data": "valor" },
            
            { "defaultContent": "<editCalificacionDise class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editCalificacionDise>"+
            "<deleteCalificacionDise class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteCalificacionDise>"

},
        ],
        columnDefs: [
            {
                // "targets": [2,4,6 ],
                "visible": false,
                "searchable": false
            },
            
        ],
        'drawCallback': function () {
            $( 'table_CalificacionDise tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
    $("#table_CalificacionDise").DataTable().ajax.reload(null, true); 
}

document.getElementById("btnAgregar_CalificacionDise").addEventListener("click",function(){

    $("#modal_CalificacionDise").modal("show");
    document.getElementById("title-CalificacionDise").innerHTML = "Agregar Clasificacion Diseño";
    document.getElementById("form_CalificacionDise").reset();
    document.getElementById("Agregar_CalificacionDise").style.display = "block";
    document.getElementById("Modificar_CalificacionDise").style.display = "none";
  
});



 // boton de agregar Caracteristica
document.getElementById("Agregar_CalificacionDise").addEventListener("click", function(){
    $nom_CalificacionDise=document.getElementById("nom_calidise").value;
    $desc_CalificacionDise=document.getElementById("desc_calidise").value;
    $condi_CalificacionDise=document.getElementById("condi_calidise").value;
    $valor_CalificacionDise=document.getElementById("valor_calidise").value;
    
    if($nom_CalificacionDise !=""  && $desc_CalificacionDise != "" && $condi_CalificacionDise != ""  && $valor_CalificacionDise != "" ){
      
                
                const postData = { 
                    clasificacion : document.getElementById("nom_calidise").value,
                    descripcion : document.getElementById("desc_calidise").value,
                    condicion : document.getElementById("condi_calidise").value,
                    valor : document.getElementById("valor_calidise").value,
                };
               
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/main/addCalificacionDise",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                     
                        if (respuesta.error==1) 
                        {
                        
                            
                            $("#modal_CalificacionDise").modal("hide");    
                            document.getElementById("form_CalificacionDise").reset();
                           
                            alerta_CalificacionDise.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            respuesta.msg+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_CalificacionDise").DataTable().ajax.reload(null, false); 
                           
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

//editar 
$('#table_CalificacionDise tbody').on( 'click', 'editCalificacionDise', function(){
    $("#modal_CalificacionDise").modal("show");
    document.getElementById("title-CalificacionDise").innerHTML = "Modificar Calificacion Diseño";
    document.getElementById("form_CalificacionDise").reset();
    document.getElementById("Agregar_CalificacionDise").style.display = "none";
    document.getElementById("Modificar_CalificacionDise").style.display = "block";


    var table = $('#table_CalificacionDise').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    
    if (regNum == '0') {
        //console.log("error");
    }else{
        document.getElementById("id_CalificacionDise").value=regDat[0]["id"];
        document.getElementById("nom_calidise").value=regDat[0]["clasificacion"];
        document.getElementById("desc_calidise").value=regDat[0]["descripcion"];   
        document.getElementById("condi_calidise").value=regDat[0]["condicion"];   
        document.getElementById("valor_calidise").value=regDat[0]["valor"];   
     
    }
});
//guardando la nueva info
document.getElementById("Modificar_CalificacionDise").addEventListener("click",function(){
    
    $nom_CalificacionDise=document.getElementById("nom_calidise").value;
    $desc_CalificacionDise=document.getElementById("desc_calidise").value;
    $condi_CalificacionDise=document.getElementById("condi_calidise").value;
    $valor_CalificacionDise=document.getElementById("valor_calidise").value;
    
    if($nom_CalificacionDise !=""  && $desc_CalificacionDise != "" && $condi_CalificacionDise != ""  && $valor_CalificacionDise != "" ){
      
               
       
                const postData = { 
                    id:document.getElementById("id_CalificacionDise").value,
                    clasificacion : document.getElementById("nom_calidise").value,
                    descripcion : document.getElementById("desc_calidise").value,
                    condicion : document.getElementById("condi_calidise").value,
                    valor : document.getElementById("valor_calidise").value,
                   
                };
              
                try {
                   
                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/main/updateCalificacionDise",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                       console.log(respuesta);
                        if (respuesta.msg) 
                        {
                            $("#modal_CalificacionDise").modal("hide");    
                            document.getElementById("form_CalificacionDise").reset();
                           
                            alerta_CalificacionDise.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            'Modificado Correctamente'+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_CalificacionDise").DataTable().ajax.reload(null, false); 
                           
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

//eliminar CalificacionDise
$('#table_CalificacionDise tbody').on( 'click', 'deleteCalificacionDise', function(){
     
    //recuperando los datos
    var table = $('#table_CalificacionDise').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    const postData = { 
        id:regDat[0]["id"],
 
    };
    
    try {

        $.ajax({
            method: "POST",
            url: $('#base_url').val()+"/main/deleteCalificacionDise",
            data: postData,
            dataType: "JSON"
        })

     
        .done(function(respuesta) {
       
            if (respuesta.msg) 
            {
                
                alerta_CalificacionDise.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                respuesta.msg+
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                    '<span aria-hidden="true">&times;</span>'+
                    '</button>'+
                '</div>';

                $("#table_CalificacionDise").DataTable().ajax.reload(null, true); 
               
            }else{
                alerta_CalificacionDise.innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">'+
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
