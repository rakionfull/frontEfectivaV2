var alerta_Objetivo = document.getElementById("alerta_Objetivo");

function LoadTableObjetivo() {
    if ($.fn.DataTable.isDataTable('#table_Objetivo')){
        
        $('#table_Objetivo').DataTable().rows().remove();
        $('#table_Objetivo').DataTable().destroy();
    
    }

    $('#table_Objetivo').DataTable({
        
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
        ajax: $('#base_url').val()+"/main/getObjetivo",
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
            { "defaultContent": "<editObjetivo class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editObjetivo>"+
            "<deleteObjetivo class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteObjetivo>"

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
            $( 'table_Objetivo tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
    $("#table_Objetivo").DataTable().ajax.reload(null, true); 
}

document.getElementById("btnAgregar_Objetivo").addEventListener("click",function(){

    $("#modal_Objetivo").modal("show");
    document.getElementById("title-Objetivo").innerHTML = "Agregar Objetivo";
    document.getElementById("form_Objetivo").reset();
    document.getElementById("Agregar_Objetivo").style.display = "block";
    document.getElementById("Modificar_Objetivo").style.display = "none";
  
});



// // boton de agregar Caracteristica
document.getElementById("Agregar_Objetivo").addEventListener("click", function(){
    $nom_Objetivo=document.getElementById("nom_obje").value;
    $desc_Objetivo=document.getElementById("desc_obje").value;
    $peso_Objetivo=document.getElementById("peso_obje").value;
    $est_Objetivo=document.getElementById("est_obje").value;
    
    if($nom_Objetivo !=""  && $desc_Objetivo != "" && $est_Objetivo != ""  && $peso_Objetivo != "" ){
      
                
                const postData = { 
                    caracteristica : document.getElementById("nom_obje").value,
                    descripcion : document.getElementById("desc_obje").value,
                    peso : document.getElementById("peso_obje").value,
                    estado : document.getElementById("est_obje").value,
                };
               
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/main/addObjetivo",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                     
                        if (respuesta.error==1) 
                        {
                        
                            
                            $("#modal_Objetivo").modal("hide");    
                            document.getElementById("form_Objetivo").reset();
                           
                            alerta_Objetivo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            respuesta.msg+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_Objetivo").DataTable().ajax.reload(null, false); 
                           
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
$('#table_Objetivo tbody').on( 'click', 'editObjetivo', function(){
    $("#modal_Objetivo").modal("show");
    document.getElementById("title-Objetivo").innerHTML = "Modificar Objetivo";
    document.getElementById("form_Objetivo").reset();
    document.getElementById("Agregar_Objetivo").style.display = "none";
    document.getElementById("Modificar_Objetivo").style.display = "block";


    var table = $('#table_Objetivo').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    
    if (regNum == '0') {
        //console.log("error");
    }else{
        document.getElementById("id_Objetivo").value=regDat[0]["id"];
        document.getElementById("nom_obje").value=regDat[0]["caracteristica"];
        document.getElementById("desc_obje").value=regDat[0]["descripcion"];   
        document.getElementById("peso_obje").value=regDat[0]["peso"];   
        document.getElementById("est_obje").value=regDat[0]["estado"];   
     
    }
});
//guardando la nueva info
document.getElementById("Modificar_Objetivo").addEventListener("click",function(){
    
    $nom_Objetivo=document.getElementById("nom_obje").value;
    $desc_Objetivo=document.getElementById("desc_obje").value;
    $peso_Objetivo=document.getElementById("peso_obje").value;
    $est_Objetivo=document.getElementById("est_obje").value;
    
        if($nom_Objetivo !=""  && $desc_Objetivo != "" && $est_Objetivo != ""  && $peso_Objetivo != ""){
                
       
                const postData = { 
                    id:document.getElementById("id_Objetivo").value,
                    caracteristica : document.getElementById("nom_obje").value,
                    descripcion : document.getElementById("desc_obje").value,
                    peso : document.getElementById("peso_obje").value,
                    estado : document.getElementById("est_obje").value,
                   
                };
              
                try {
                   
                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/main/updateObjetivo",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                       console.log(respuesta);
                        if (respuesta.msg) 
                        {
                            $("#modal_Objetivo").modal("hide");    
                            document.getElementById("form_Objetivo").reset();
                           
                            alerta_Objetivo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            'Modificado Correctamente'+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_Objetivo").DataTable().ajax.reload(null, false); 
                           
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

//eliminar Objetivo
$('#table_Objetivo tbody').on( 'click', 'deleteObjetivo', function(){
     
    //recuperando los datos
    var table = $('#table_Objetivo').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    const postData = { 
        id:regDat[0]["id"],
 
    };
    
    try {

        $.ajax({
            method: "POST",
            url: $('#base_url').val()+"/main/deleteObjetivo",
            data: postData,
            dataType: "JSON"
        })

     
        .done(function(respuesta) {
       
            if (respuesta.msg) 
            {
                
                alerta_Objetivo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                respuesta.msg+
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                    '<span aria-hidden="true">&times;</span>'+
                    '</button>'+
                '</div>';

                $("#table_Objetivo").DataTable().ajax.reload(null, true); 
               
            }else{
                alerta_Objetivo.innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">'+
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
