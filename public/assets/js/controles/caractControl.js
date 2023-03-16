var alerta_caractControl = document.getElementById("alerta_caractControl");

function LoadTableCaractControl() {
    if ($.fn.DataTable.isDataTable('#table_caract_control')){
        
        $('#table_caract_control').DataTable().rows().remove();
        $('#table_caract_control').DataTable().destroy();
    
    }

    $('#table_caract_control').DataTable({
        
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
        ajax: $('#base_url').val()+"/main/getCaractControl",
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
            { "defaultContent": "<editCaractControl class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editCaractControl>"+
            "<deleteCaractControl class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteCaractControl>"

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
            $( 'table_caract_control tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
    $("#table_caract_control").DataTable().ajax.reload(null, true); 
}

document.getElementById("btnAgregar_CaractControl").addEventListener("click",function(){

    $("#modal_caractControl").modal("show");
    document.getElementById("title-caractControl").innerHTML = "Agregar Caracteristica de Control";
    document.getElementById("form_caractControl").reset();
    document.getElementById("Agregar_CaractControl").style.display = "block";
    document.getElementById("Modificar_CaractControl").style.display = "none";
    if(tipo == ""){
        document.getElementById("condi_opcion").style.display  = "none";
        document.getElementById("peso_opcion").style.display  = "none";
        document.getElementById("valor_opcion").style.display  = "none";
    }
});



// // boton de agregar Caracteristica
document.getElementById("Agregar_CaractControl").addEventListener("click", function(){
    $nom_caractControl=document.getElementById("nom_caract").value;
    $desc_caractContro=document.getElementById("desc_caract").value;
    $est_caractControl=document.getElementById("est_caract").value;
    
    if($nom_caractControl !=""  && $desc_caractContro != "" && $est_caractControl != "" ){
      
                
                const postData = { 
                    caracteristica : document.getElementById("nom_caract").value,
                    descripcion : document.getElementById("desc_caract").value,
                    estado : document.getElementById("est_caract").value,
                };
               
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/main/addCaractControl",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                     
                        if (respuesta.error==1) 
                        {
                        
                            
                            $("#modal_caractControl").modal("hide");    
                            document.getElementById("form_caractControl").reset();
                           
                            alerta_caractControl.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            respuesta.msg+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_caract_control").DataTable().ajax.reload(null, false); 
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
$('#table_caract_control tbody').on( 'click', 'editCaractControl', function(){
    $("#modal_caractControl").modal("show");
    document.getElementById("title-caractControl").innerHTML = "Modificar Cobertura";
    document.getElementById("form_caractControl").reset();
    document.getElementById("Agregar_CaractControl").style.display = "none";
    document.getElementById("Modificar_CaractControl").style.display = "block";


    var table = $('#table_caract_control').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    
    if (regNum == '0') {
        //console.log("error");
    }else{
        document.getElementById("id_caractControl").value=regDat[0]["id"];
        document.getElementById("nom_caract").value=regDat[0]["caracteristica"];
        document.getElementById("desc_caract").value=regDat[0]["descripcion"];   
        document.getElementById("est_caract").value=regDat[0]["estado"];   
     
    }
});
//guardando la nueva info
document.getElementById("Modificar_CaractControl").addEventListener("click",async function(){
    
    $nom_caractControl=document.getElementById("nom_caract").value;
    $desc_caractContro=document.getElementById("desc_caract").value;
    $est_caractControl=document.getElementById("est_caract").value;
    
    if($nom_caractControl !=""  && $desc_caractContro != "" && $est_caractControl != "" ){
                
       
                const postData = { 
                    id:document.getElementById("id_caractControl").value,
                    caracteristica : document.getElementById("nom_caract").value,
                    descripcion : document.getElementById("desc_caract").value,
                    estado : document.getElementById("est_caract").value,
                   
                };
              
                try {
                   
                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/main/updateCaractControl",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                       console.log(respuesta);
                        if (respuesta.msg) 
                        {
                            $("#modal_caractControl").modal("hide");    
                            document.getElementById("form_caractControl").reset();
                           
                            alerta_caractControl.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            'Modificado Correctamente'+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_caract_control").DataTable().ajax.reload(null, false); 
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
$('#table_caract_control tbody').on( 'click', 'deleteCaractControl', function(){
     
    //recuperando los datos
    var table = $('#table_caract_control').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    const postData = { 
        id:regDat[0]["id"],
 
    };
    
    try {

        $.ajax({
            method: "POST",
            url: $('#base_url').val()+"/main/deleteCaractControl",
            data: postData,
            dataType: "JSON"
        })

     
        .done(function(respuesta) {
       
            if (respuesta.msg) 
            {
                
                alerta_caractControl.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                respuesta.msg+
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                    '<span aria-hidden="true">&times;</span>'+
                    '</button>'+
                '</div>';

                $("#table_caract_control").DataTable().ajax.reload(null, true); 
                cargarOpciones();
            }else{
                alerta_caractControl.innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">'+
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
