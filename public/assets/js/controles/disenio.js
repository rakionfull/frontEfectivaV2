var alerta_Disenio = document.getElementById("alerta_Disenio");

function LoadTableDisenio() {
    if ($.fn.DataTable.isDataTable('#table_Disenio')){
        
        $('#table_Disenio').DataTable().rows().remove();
        $('#table_Disenio').DataTable().destroy();
    
    }

    $('#table_Disenio').DataTable({
        
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
        // scrollX: true,
        // fixedColumns:   {
        //     heightMatch: 'none'
        // },
        responsive: true,
        autoWidth: false,
        // processing: true,
        lengthMenu:[5,10,25,50],
        pageLength:10,
        clickToSelect:false,
        ajax: $('#base_url').val()+"/main/getDisenio",
        aoColumns: [
            { "data": "id" },
            { "data": "caracteristica" },
            { "data": "descripcion" },
            {  "data": "estado",
                        
                "mRender": function(data, type, value) {
                    if (data == '1') return  'Activo';
                    else return 'Inactivo'
                    

                }
            },
            { "defaultContent": "<editDisenio class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editDisenio>"+
            "<deleteDisenio class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteDisenio>"

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
            $( 'table_Disenio tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
    $("#table_Disenio").DataTable().ajax.reload(null, true); 
}

document.getElementById("btnAgregar_Disenio").addEventListener("click",function(){

    $("#modal_Disenio").modal("show");
    document.getElementById("title-Disenio").innerHTML = "Agregar Diseño";
    document.getElementById("form_Disenio").reset();
    document.getElementById("Agregar_Disenio").style.display = "block";
    document.getElementById("Modificar_Disenio").style.display = "none";
  
});



// // boton de agregar Caracteristica
document.getElementById("Agregar_Disenio").addEventListener("click", function(){
    $nom_Disenio=document.getElementById("nom_dise").value;
    $desc_Disenio=document.getElementById("desc_dise").value;
    $est_Disenio=document.getElementById("est_dise").value;
    
    if($nom_Disenio !=""  && $desc_Disenio != "" && $est_Disenio != "" ){
      
                
                const postData = { 
                    caracteristica : document.getElementById("nom_dise").value,
                    descripcion : document.getElementById("desc_dise").value,
                    estado : document.getElementById("est_dise").value,
                };
               
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/main/addDisenio",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                     
                        if (respuesta.error==1) 
                        {
                        
                            
                            $("#modal_Disenio").modal("hide");    
                            document.getElementById("form_Disenio").reset();
                           
                            alerta_Disenio.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            respuesta.msg+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_Disenio").DataTable().ajax.reload(null, false); 
                            cargarOpciones();
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

//editar Caracteristica
$('#table_Disenio tbody').on( 'click', 'editDisenio', function(){
    $("#modal_Disenio").modal("show");
    document.getElementById("title-Disenio").innerHTML = "Modificar Diseño";
    document.getElementById("form_Disenio").reset();
    document.getElementById("Agregar_Disenio").style.display = "none";
    document.getElementById("Modificar_Disenio").style.display = "block";


    var table = $('#table_Disenio').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    
    if (regNum == '0') {
        //console.log("error");
    }else{
        document.getElementById("id_Disenio").value=regDat[0]["id"];
        document.getElementById("nom_dise").value=regDat[0]["caracteristica"];
        document.getElementById("desc_dise").value=regDat[0]["descripcion"];   
        document.getElementById("est_dise").value=regDat[0]["estado"];   
     
    }
});
//guardando la nueva info
document.getElementById("Modificar_Disenio").addEventListener("click",async function(){
    
    $nom_Disenio=document.getElementById("nom_dise").value;
    $desc_Disenio=document.getElementById("desc_dise").value;
    $est_Disenio=document.getElementById("est_dise").value;
    
    if($nom_Disenio !=""  && $desc_Disenio != "" && $est_Disenio != "" ){
                
       
                const postData = { 
                    id:document.getElementById("id_Disenio").value,
                    caracteristica : document.getElementById("nom_dise").value,
                    descripcion : document.getElementById("desc_dise").value,
                    estado : document.getElementById("est_dise").value,
                   
                };
              
                try {
                   
                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/main/updateDisenio",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                       console.log(respuesta);
                        if (respuesta.msg) 
                        {
                            $("#modal_Disenio").modal("hide");    
                            document.getElementById("form_Disenio").reset();
                           
                            alerta_Disenio.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            'Modificado Correctamente'+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_Disenio").DataTable().ajax.reload(null, false); 
                            cargarOpciones();
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

//eliminar cobertura
$('#table_Disenio tbody').on( 'click', 'deleteDisenio', function(){
     
    //recuperando los datos
    var table = $('#table_Disenio').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    const postData = { 
        id:regDat[0]["id"],
 
    };
    
    try {

        $.ajax({
            method: "POST",
            url: $('#base_url').val()+"/main/deleteDisenio",
            data: postData,
            dataType: "JSON"
        })

     
        .done(function(respuesta) {
       
            if (respuesta.msg) 
            {
                
                alerta_Disenio.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                respuesta.msg+
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                    '<span aria-hidden="true">&times;</span>'+
                    '</button>'+
                '</div>';

                $("#table_Disenio").DataTable().ajax.reload(null, true); 
                cargarOpciones();
            }else{
                alerta_Disenio.innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">'+
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
