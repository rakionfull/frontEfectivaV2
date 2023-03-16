var alerta_Prueba = document.getElementById("alerta_Prueba");

function LoadTablePrueba() {
    if ($.fn.DataTable.isDataTable('#table_Prueba')){
        
        $('#table_Prueba').DataTable().rows().remove();
        $('#table_Prueba').DataTable().destroy();
    
    }

    $('#table_Prueba').DataTable({
        
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
        ajax: $('#base_url').val()+"/main/getPrueba",
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
            { "defaultContent": "<editPrueba class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editPrueba>"+
            "<deletePrueba class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deletePrueba>"

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
            $( 'table_Prueba tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
    $("#table_Prueba").DataTable().ajax.reload(null, true); 
}

document.getElementById("btnAgregar_Prueba").addEventListener("click",function(){

    $("#modal_Prueba").modal("show");
    document.getElementById("title-Prueba").innerHTML = "Agregar Prueba";
    document.getElementById("form_Prueba").reset();
    document.getElementById("Agregar_Prueba").style.display = "block";
    document.getElementById("Modificar_Prueba").style.display = "none";
  
});



// // boton de agregar Caracteristica
document.getElementById("Agregar_Prueba").addEventListener("click", function(){
    $nom_Prueba=document.getElementById("nom_prueba").value;
    $desc_Prueba=document.getElementById("desc_prueba").value;
    $peso_Prueba=document.getElementById("peso_prueba").value;
    $est_Prueba=document.getElementById("est_prueba").value;
    
    if($nom_Prueba !=""  && $desc_Prueba != "" && $est_Prueba != ""  && $peso_Prueba != "" ){
      
                
                const postData = { 
                    caracteristica : document.getElementById("nom_prueba").value,
                    descripcion : document.getElementById("desc_prueba").value,
                    peso : document.getElementById("peso_prueba").value,
                    estado : document.getElementById("est_prueba").value,
                };
               
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/main/addPrueba",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                     
                        if (respuesta.error==1) 
                        {
                        
                            
                            $("#modal_Prueba").modal("hide");    
                            document.getElementById("form_Prueba").reset();
                           
                            alerta_Prueba.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            respuesta.msg+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_Prueba").DataTable().ajax.reload(null, false); 
                           
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
$('#table_Prueba tbody').on( 'click', 'editPrueba', function(){
    $("#modal_Prueba").modal("show");
    document.getElementById("title-Prueba").innerHTML = "Modificar Prueba";
    document.getElementById("form_Prueba").reset();
    document.getElementById("Agregar_Prueba").style.display = "none";
    document.getElementById("Modificar_Prueba").style.display = "block";


    var table = $('#table_Prueba').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    
    if (regNum == '0') {
        //console.log("error");
    }else{
        document.getElementById("id_Prueba").value=regDat[0]["id"];
        document.getElementById("nom_prueba").value=regDat[0]["caracteristica"];
        document.getElementById("desc_prueba").value=regDat[0]["descripcion"];   
        document.getElementById("peso_prueba").value=regDat[0]["peso"];   
        document.getElementById("est_prueba").value=regDat[0]["estado"];   
     
    }
});
//guardando la nueva info
document.getElementById("Modificar_Prueba").addEventListener("click",async function(){
    
    $nom_Prueba=document.getElementById("nom_prueba").value;
    $desc_Prueba=document.getElementById("desc_prueba").value;
    $peso_Prueba=document.getElementById("peso_prueba").value;
    $est_Prueba=document.getElementById("est_prueba").value;
    
    if($nom_Prueba !=""  && $desc_Prueba != "" && $est_Prueba != ""  && $peso_Prueba != ""){
                
       
                const postData = { 
                    id:document.getElementById("id_Prueba").value,
                    caracteristica : document.getElementById("nom_prueba").value,
                    descripcion : document.getElementById("desc_prueba").value,
                    peso : document.getElementById("peso_prueba").value,
                    estado : document.getElementById("est_prueba").value,
                   
                };
              
                try {
                   
                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/main/updatePrueba",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                       console.log(respuesta);
                        if (respuesta.msg) 
                        {
                            $("#modal_Prueba").modal("hide");    
                            document.getElementById("form_Prueba").reset();
                           
                            alerta_Prueba.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            'Modificado Correctamente'+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_Prueba").DataTable().ajax.reload(null, false); 
                           
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

//eliminar Prueba
$('#table_Prueba tbody').on( 'click', 'deletePrueba', function(){
     
    //recuperando los datos
    var table = $('#table_Prueba').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    const postData = { 
        id:regDat[0]["id"],
 
    };
    
    try {

        $.ajax({
            method: "POST",
            url: $('#base_url').val()+"/main/deletePrueba",
            data: postData,
            dataType: "JSON"
        })

     
        .done(function(respuesta) {
       
            if (respuesta.msg) 
            {
                
                alerta_Prueba.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                respuesta.msg+
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                    '<span aria-hidden="true">&times;</span>'+
                    '</button>'+
                '</div>';

                $("#table_Prueba").DataTable().ajax.reload(null, true); 
               
            }else{
                alerta_Prueba.innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">'+
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
