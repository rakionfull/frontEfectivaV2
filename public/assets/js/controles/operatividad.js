var alerta_Operatividad = document.getElementById("alerta_Operatividad");

function LoadTableOperatividad() {
    if ($.fn.DataTable.isDataTable('#table_Operatividad')){
        
        $('#table_Operatividad').DataTable().rows().remove();
        $('#table_Operatividad').DataTable().destroy();
    
    }

    $('#table_Operatividad').DataTable({
        
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
        ajax: $('#base_url').val()+"/main/getOperatividad",
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
            { "defaultContent": "<editOperatividad class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editOperatividad>"+
            "<deleteOperatividad class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteOperatividad>"

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
            $( 'table_Operatividad tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
    $("#table_Operatividad").DataTable().ajax.reload(null, true); 
}

document.getElementById("btnAgregar_Operatividad").addEventListener("click",function(){

    $("#modal_Operatividad").modal("show");
    document.getElementById("title-Operatividad").innerHTML = "Agregar Operatividad";
    document.getElementById("form_Operatividad").reset();
    document.getElementById("Agregar_Operatividad").style.display = "block";
    document.getElementById("Modificar_Operatividad").style.display = "none";
  
});



// // boton de agregar Caracteristica
document.getElementById("Agregar_Operatividad").addEventListener("click", function(){
    $nom_Operatividad=document.getElementById("nom_opera").value;
    $desc_Operatividad=document.getElementById("desc_opera").value;
    $est_Operatividad=document.getElementById("est_opera").value;
    
    if($nom_Operatividad !=""  && $desc_Operatividad != "" && $est_Operatividad != "" ){
      
                
                const postData = { 
                    caracteristica : document.getElementById("nom_opera").value,
                    descripcion : document.getElementById("desc_opera").value,
                    estado : document.getElementById("est_opera").value,
                };
               
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/main/addOperatividad",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                     
                        if (respuesta.error==1) 
                        {
                        
                            
                            $("#modal_Operatividad").modal("hide");    
                            document.getElementById("form_Operatividad").reset();
                           
                            alerta_Operatividad.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            respuesta.msg+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_Operatividad").DataTable().ajax.reload(null, false); 
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
$('#table_Operatividad tbody').on( 'click', 'editOperatividad', function(){
    $("#modal_Operatividad").modal("show");
    document.getElementById("title-Operatividad").innerHTML = "Modificar Operatividad";
    document.getElementById("form_Operatividad").reset();
    document.getElementById("Agregar_Operatividad").style.display = "none";
    document.getElementById("Modificar_Operatividad").style.display = "block";


    var table = $('#table_Operatividad').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    
    if (regNum == '0') {
        //console.log("error");
    }else{
        document.getElementById("id_Operatividad").value=regDat[0]["id"];
        document.getElementById("nom_opera").value=regDat[0]["caracteristica"];
        document.getElementById("desc_opera").value=regDat[0]["descripcion"];   
        document.getElementById("est_opera").value=regDat[0]["estado"];   
     
    }
});
//guardando la nueva info
document.getElementById("Modificar_Operatividad").addEventListener("click",async function(){
    
    $nom_Operatividad=document.getElementById("nom_opera").value;
    $desc_Operatividad=document.getElementById("desc_opera").value;
    $est_Operatividad=document.getElementById("est_opera").value;
    
    if($nom_Operatividad !=""  && $desc_Operatividad != "" && $est_Operatividad != "" ){
                
       
                const postData = { 
                    id:document.getElementById("id_Operatividad").value,
                    caracteristica : document.getElementById("nom_opera").value,
                    descripcion : document.getElementById("desc_opera").value,
                    estado : document.getElementById("est_opera").value,
                   
                };
              
                try {
                   
                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/main/updateOperatividad",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                       console.log(respuesta);
                        if (respuesta.msg) 
                        {
                            $("#modal_Operatividad").modal("hide");    
                            document.getElementById("form_Operatividad").reset();
                           
                            alerta_Operatividad.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            'Modificado Correctamente'+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_Operatividad").DataTable().ajax.reload(null, false); 
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
$('#table_Operatividad tbody').on( 'click', 'deleteOperatividad', function(){
     
    //recuperando los datos
    var table = $('#table_Operatividad').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    const postData = { 
        id:regDat[0]["id"],
 
    };
    
    try {

        $.ajax({
            method: "POST",
            url: $('#base_url').val()+"/main/deleteOperatividad",
            data: postData,
            dataType: "JSON"
        })

     
        .done(function(respuesta) {
       
            if (respuesta.msg) 
            {
                
                alerta_Operatividad.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                respuesta.msg+
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                    '<span aria-hidden="true">&times;</span>'+
                    '</button>'+
                '</div>';

                $("#table_Operatividad").DataTable().ajax.reload(null, true); 
                cargarOpciones();
            }else{
                alerta_Operatividad.innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">'+
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
