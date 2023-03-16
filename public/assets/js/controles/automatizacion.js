var alerta_Automatizacion = document.getElementById("alerta_Automatizacion");

function LoadTableAutomatizacion() {
    if ($.fn.DataTable.isDataTable('#table_Automatizacion')){
        
        $('#table_Automatizacion').DataTable().rows().remove();
        $('#table_Automatizacion').DataTable().destroy();
    
    }

    $('#table_Automatizacion').DataTable({
        
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
        ajax: $('#base_url').val()+"/main/getAutomatizacion",
        aoColumns: [
            { "data": "id" },
            { "data": "caracteristica" },
            { "data": "descripcion" },
            { "data": "peso" },
            {  "data": "estado",
                        
                "mRender": function(data, type, value) {
                    if (data == '1') return  'Activo';
                    else return 'Inactivo'
                    

                }
            },
            { "defaultContent": "<editAutomatizacion class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editAutomatizacion>"+
            "<deleteAutomatizacion class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteAutomatizacion>"

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
            $( 'table_Automatizacion tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
    $("#table_Automatizacion").DataTable().ajax.reload(null, true); 
}

document.getElementById("btnAgregar_Automatizacion").addEventListener("click",function(){

    $("#modal_Automatizacion").modal("show");
    document.getElementById("title-Automatizacion").innerHTML = "Agregar Automatizacion";
    document.getElementById("form_Automatizacion").reset();
    document.getElementById("Agregar_Automatizacion").style.display = "block";
    document.getElementById("Modificar_Automatizacion").style.display = "none";
  
});



// // boton de agregar Caracteristica
document.getElementById("Agregar_Automatizacion").addEventListener("click", function(){
    $nom_Automatizacion=document.getElementById("nom_auto").value;
    $desc_Automatizacion=document.getElementById("desc_auto").value;
    $peso_Automatizacion=document.getElementById("peso_auto").value;
    $est_Automatizacion=document.getElementById("est_auto").value;
    
    if($nom_Automatizacion !=""  && $desc_Automatizacion != "" && $est_Automatizacion != ""  && $peso_Automatizacion != "" ){
      
                
                const postData = { 
                    caracteristica : document.getElementById("nom_auto").value,
                    descripcion : document.getElementById("desc_auto").value,
                    peso : document.getElementById("peso_auto").value,
                    estado : document.getElementById("est_auto").value,
                };
               
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/main/addAutomatizacion",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                     
                        if (respuesta.error==1) 
                        {
                        
                            
                            $("#modal_Automatizacion").modal("hide");    
                            document.getElementById("form_Automatizacion").reset();
                           
                            alerta_Automatizacion.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            respuesta.msg+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_Automatizacion").DataTable().ajax.reload(null, false); 
                           
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
$('#table_Automatizacion tbody').on( 'click', 'editAutomatizacion', function(){
    $("#modal_Automatizacion").modal("show");
    document.getElementById("title-Automatizacion").innerHTML = "Modificar Automatizacion";
    document.getElementById("form_Automatizacion").reset();
    document.getElementById("Agregar_Automatizacion").style.display = "none";
    document.getElementById("Modificar_Automatizacion").style.display = "block";


    var table = $('#table_Automatizacion').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    
    if (regNum == '0') {
        //console.log("error");
    }else{
        document.getElementById("id_Automatizacion").value=regDat[0]["id"];
        document.getElementById("nom_auto").value=regDat[0]["caracteristica"];
        document.getElementById("desc_auto").value=regDat[0]["descripcion"];   
        document.getElementById("peso_auto").value=regDat[0]["peso"];   
        document.getElementById("est_auto").value=regDat[0]["estado"];   
     
    }
});
//guardando la nueva info
document.getElementById("Modificar_Automatizacion").addEventListener("click",async function(){
    
    $nom_Automatizacion=document.getElementById("nom_auto").value;
    $desc_Automatizacion=document.getElementById("desc_auto").value;
    $peso_Automatizacion=document.getElementById("peso_auto").value;
    $est_Automatizacion=document.getElementById("est_auto").value;
    
    
    if($nom_Automatizacion !=""  && $desc_Automatizacion != "" && $est_Automatizacion != ""  && $peso_Automatizacion != ""){
                
       
                const postData = { 
                    id:document.getElementById("id_Automatizacion").value,
                    caracteristica : document.getElementById("nom_auto").value,
                    descripcion : document.getElementById("desc_auto").value,
                    peso : document.getElementById("peso_auto").value,
                    estado : document.getElementById("est_auto").value,
                   
                };
              
                try {
                   
                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/main/updateAutomatizacion",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                       console.log(respuesta);
                        if (respuesta.msg) 
                        {
                            $("#modal_Automatizacion").modal("hide");    
                            document.getElementById("form_Automatizacion").reset();
                           
                            alerta_Automatizacion.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            'Modificado Correctamente'+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_Automatizacion").DataTable().ajax.reload(null, false); 
                           
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

//eliminar Automatizacion
$('#table_Automatizacion tbody').on( 'click', 'deleteAutomatizacion', function(){
     
    //recuperando los datos
    var table = $('#table_Automatizacion').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    const postData = { 
        id:regDat[0]["id"],
 
    };
    
    try {

        $.ajax({
            method: "POST",
            url: $('#base_url').val()+"/main/deleteAutomatizacion",
            data: postData,
            dataType: "JSON"
        })

     
        .done(function(respuesta) {
       
            if (respuesta.msg) 
            {
                
                alerta_Automatizacion.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                respuesta.msg+
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                    '<span aria-hidden="true">&times;</span>'+
                    '</button>'+
                '</div>';

                $("#table_Automatizacion").DataTable().ajax.reload(null, true); 
               
            }else{
                alerta_Automatizacion.innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">'+
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
