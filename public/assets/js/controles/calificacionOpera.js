
var alerta_CalificacionOpera = document.getElementById("alerta_CalificacionOpera");

function LoadTableCalificacionOpera() {
    if ($.fn.DataTable.isDataTable('#table_CalificacionOpera')){
        
        $('#table_CalificacionOpera').DataTable().rows().remove();
        $('#table_CalificacionOpera').DataTable().destroy();
    
    }

    $('#table_CalificacionOpera').DataTable({
        
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
        ajax: $('#base_url').val()+"/main/getCalificacionOpera",
        aoColumns: [
            { "data": "id" },
            { "data": "clasificacion" },
            { "data": "descripcion" },
            { "data": "condicion" },
            { "data": "valor" },
            
            { "defaultContent": "<editCalificacionOpera class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editCalificacionOpera>"+
            "<deleteCalificacionOpera class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteCalificacionOpera>"

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
            $( 'table_CalificacionOpera tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
    $("#table_CalificacionOpera").DataTable().ajax.reload(null, true); 
}

document.getElementById("btnAgregar_CalificacionOpera").addEventListener("click",function(){

    $("#modal_CalificacionOpera").modal("show");
    document.getElementById("title-CalificacionOpera").innerHTML = "Agregar Clasificacion Operatividad";
    document.getElementById("form_CalificacionOpera").reset();
    document.getElementById("Agregar_CalificacionOpera").style.display = "block";
    document.getElementById("Modificar_CalificacionOpera").style.display = "none";
  
});



 // boton de agregar Caracteristica
document.getElementById("Agregar_CalificacionOpera").addEventListener("click", function(){
    $nom_CalificacionOpera=document.getElementById("nom_caliopera").value;
    $desc_CalificacionOpera=document.getElementById("desc_caliopera").value;
    $condi_CalificacionOpera=document.getElementById("condi_caliopera").value;
    $valor_CalificacionOpera=document.getElementById("valor_caliopera").value;
    
    if($nom_CalificacionOpera !=""  && $desc_CalificacionOpera != "" && $condi_CalificacionOpera != ""  && $valor_CalificacionOpera != "" ){
      
                
                const postData = { 
                    clasificacion : document.getElementById("nom_caliopera").value,
                    descripcion : document.getElementById("desc_caliopera").value,
                    condicion : document.getElementById("condi_caliopera").value,
                    valor : document.getElementById("valor_caliopera").value,
                };
               
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/main/addCalificacionOpera",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                     
                        if (respuesta.error==1) 
                        {
                        
                            
                            $("#modal_CalificacionOpera").modal("hide");    
                            document.getElementById("form_CalificacionOpera").reset();
                           
                            alerta_CalificacionOpera.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            respuesta.msg+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_CalificacionOpera").DataTable().ajax.reload(null, false); 
                           
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
$('#table_CalificacionOpera tbody').on( 'click', 'editCalificacionOpera', function(){
    $("#modal_CalificacionOpera").modal("show");
    document.getElementById("title-CalificacionOpera").innerHTML = "Modificar Calificacion Operatividad";
    document.getElementById("form_CalificacionOpera").reset();
    document.getElementById("Agregar_CalificacionOpera").style.display = "none";
    document.getElementById("Modificar_CalificacionOpera").style.display = "block";


    var table = $('#table_CalificacionOpera').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    
    if (regNum == '0') {
        //console.log("error");
    }else{
        document.getElementById("id_CalificacionOpera").value=regDat[0]["id"];
        document.getElementById("nom_caliopera").value=regDat[0]["clasificacion"];
        document.getElementById("desc_caliopera").value=regDat[0]["descripcion"];   
        document.getElementById("condi_caliopera").value=regDat[0]["condicion"];   
        document.getElementById("valor_caliopera").value=regDat[0]["valor"];   
     
    }
});
//guardando la nueva info
document.getElementById("Modificar_CalificacionOpera").addEventListener("click",function(){
    
    $nom_CalificacionOpera=document.getElementById("nom_caliopera").value;
    $desc_CalificacionOpera=document.getElementById("desc_caliopera").value;
    $condi_CalificacionOpera=document.getElementById("condi_caliopera").value;
    $valor_CalificacionOpera=document.getElementById("valor_caliopera").value;
    
    if($nom_CalificacionOpera !=""  && $desc_CalificacionOpera != "" && $condi_CalificacionOpera != ""  && $valor_CalificacionOpera != "" ){
      
               
       
                const postData = { 
                    id:document.getElementById("id_CalificacionOpera").value,
                    clasificacion : document.getElementById("nom_caliopera").value,
                    descripcion : document.getElementById("desc_caliopera").value,
                    condicion : document.getElementById("condi_caliopera").value,
                    valor : document.getElementById("valor_caliopera").value,
                   
                };
              
                try {
                   
                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/main/updateCalificacionOpera",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                       console.log(respuesta);
                        if (respuesta.msg) 
                        {
                            $("#modal_CalificacionOpera").modal("hide");    
                            document.getElementById("form_CalificacionOpera").reset();
                           
                            alerta_CalificacionOpera.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            'Modificado Correctamente'+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_CalificacionOpera").DataTable().ajax.reload(null, false); 
                           
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

//eliminar CalificacionOpera
$('#table_CalificacionOpera tbody').on( 'click', 'deleteCalificacionOpera', function(){
     
    //recuperando los datos
    var table = $('#table_CalificacionOpera').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    const postData = { 
        id:regDat[0]["id"],
 
    };
    
    try {

        $.ajax({
            method: "POST",
            url: $('#base_url').val()+"/main/deleteCalificacionOpera",
            data: postData,
            dataType: "JSON"
        })

     
        .done(function(respuesta) {
       
            if (respuesta.msg) 
            {
                
                alerta_CalificacionOpera.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                respuesta.msg+
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                    '<span aria-hidden="true">&times;</span>'+
                    '</button>'+
                '</div>';

                $("#table_CalificacionOpera").DataTable().ajax.reload(null, true); 
               
            }else{
                alerta_CalificacionOpera.innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">'+
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
