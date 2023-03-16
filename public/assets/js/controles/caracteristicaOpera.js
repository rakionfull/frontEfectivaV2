var alerta_CaracteristicaOpera = document.getElementById("alerta_CaracteristicaOpera");

function LoadTableCaracteristicaOpera() {
    if ($.fn.DataTable.isDataTable('#table_CaracteristicaOpera')){
        
        $('#table_CaracteristicaOpera').DataTable().rows().remove();
        $('#table_CaracteristicaOpera').DataTable().destroy();
    
    }

    $('#table_CaracteristicaOpera').DataTable({
        
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
        ajax: $('#base_url').val()+"/main/getCaracteristicaOpera",
        aoColumns: [
            { "data": "id" },
            { "data": "caracteristica" },
            { "data": "descripcion" },            
            { "defaultContent": "<editCaracteristicaOpera class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editCaracteristicaOpera>"+
            "<deleteCaracteristicaOpera class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteCaracteristicaOpera>"

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
            $( 'table_CaracteristicaOpera tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
    $("#table_CaracteristicaOpera").DataTable().ajax.reload(null, true); 
}

document.getElementById("btnAgregar_CaracteristicaOpera").addEventListener("click",function(){

    $("#modal_CaracteristicaOpera").modal("show");
    document.getElementById("title-CaracteristicaOpera").innerHTML = "Agregar Caracteristica de Operatividad";
    document.getElementById("form_CaracteristicaOpera").reset();
    document.getElementById("Agregar_CaracteristicaOpera").style.display = "block";
    document.getElementById("Modificar_CaracteristicaOpera").style.display = "none";
  
});



 // boton de agregar Caracteristica
document.getElementById("Agregar_CaracteristicaOpera").addEventListener("click", function(){
    $nom_CaracteristicaOpera=document.getElementById("nom_caractopera").value;
    $desc_CaracteristicaOpera=document.getElementById("desc_caractopera").value;
    
    
    if($nom_CaracteristicaOpera !=""  && $desc_CaracteristicaOpera != "" ){
      
                
                const postData = { 
                    caracteristica : document.getElementById("nom_caractopera").value,
                    descripcion : document.getElementById("desc_caractopera").value,
                  
                };
               
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/main/addCaracteristicaOpera",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                     
                        if (respuesta.error==1) 
                        {
                        
                            
                            $("#modal_CaracteristicaOpera").modal("hide");    
                            document.getElementById("form_CaracteristicaOpera").reset();
                           
                            alerta_CaracteristicaOpera.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            respuesta.msg+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_CaracteristicaOpera").DataTable().ajax.reload(null, false); 
                           
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
$('#table_CaracteristicaOpera tbody').on( 'click', 'editCaracteristicaOpera', function(){
    $("#modal_CaracteristicaOpera").modal("show");
    document.getElementById("title-CaracteristicaOpera").innerHTML = "Modificar Caracteristica Operatividad";
    document.getElementById("form_CaracteristicaOpera").reset();
    document.getElementById("Agregar_CaracteristicaOpera").style.display = "none";
    document.getElementById("Modificar_CaracteristicaOpera").style.display = "block";


    var table = $('#table_CaracteristicaOpera').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    
    if (regNum == '0') {
        //console.log("error");
    }else{
        document.getElementById("id_CaracteristicaOpera").value=regDat[0]["id"];
        document.getElementById("nom_caractopera").value=regDat[0]["caracteristica"];
        document.getElementById("desc_caractopera").value=regDat[0]["descripcion"];   
       
     
    }
});
//guardando la nueva info
document.getElementById("Modificar_CaracteristicaOpera").addEventListener("click",function(){
    
    $nom_CaracteristicaOpera=document.getElementById("nom_caractopera").value;
    $desc_CaracteristicaOpera=document.getElementById("desc_caractopera").value;

    if($nom_CaracteristicaOpera !=""  && $desc_CaracteristicaOpera != ""  ){
      
               
       
                const postData = { 
                    id:document.getElementById("id_CaracteristicaOpera").value,
                    caracteristica : document.getElementById("nom_caractopera").value,
                    descripcion : document.getElementById("desc_caractopera").value,
                  
                   
                };
              
                try {
                   
                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/main/updateCaracteristicaOpera",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                       console.log(respuesta);
                        if (respuesta.msg) 
                        {
                            $("#modal_CaracteristicaOpera").modal("hide");    
                            document.getElementById("form_CaracteristicaOpera").reset();
                           
                            alerta_CaracteristicaOpera.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            'Modificado Correctamente'+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_CaracteristicaOpera").DataTable().ajax.reload(null, false); 
                           
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

//eliminar CaracteristicaOpera
$('#table_CaracteristicaOpera tbody').on( 'click', 'deleteCaracteristicaOpera', function(){
     
    //recuperando los datos
    var table = $('#table_CaracteristicaOpera').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    const postData = { 
        id:regDat[0]["id"],
 
    };
    
    try {

        $.ajax({
            method: "POST",
            url: $('#base_url').val()+"/main/deleteCaracteristicaOpera",
            data: postData,
            dataType: "JSON"
        })

     
        .done(function(respuesta) {
       
            if (respuesta.msg) 
            {
                
                alerta_CaracteristicaOpera.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                respuesta.msg+
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                    '<span aria-hidden="true">&times;</span>'+
                    '</button>'+
                '</div>';

                $("#table_CaracteristicaOpera").DataTable().ajax.reload(null, true); 
               
            }else{
                alerta_CaracteristicaOpera.innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">'+
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
