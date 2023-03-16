var alerta_Definicion = document.getElementById("alerta_Definicion");

function LoadTableDefinicion() {
    if ($.fn.DataTable.isDataTable('#table_Definicion')){
        
        $('#table_Definicion').DataTable().rows().remove();
        $('#table_Definicion').DataTable().destroy();
    
    }

    $('#table_Definicion').DataTable({
        
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
        ajax: $('#base_url').val()+"/main/getDefinicion",
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
            { "defaultContent": "<editDefinicion class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editDefinicion>"+
            "<deleteDefinicion class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteDefinicion>"

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
            $( 'table_Definicion tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
    $("#table_Definicion").DataTable().ajax.reload(null, true); 
}

document.getElementById("btnAgregar_Definicion").addEventListener("click",function(){

    $("#modal_Definicion").modal("show");
    document.getElementById("title-Definicion").innerHTML = "Agregar Definicion";
    document.getElementById("form_Definicion").reset();
    document.getElementById("Agregar_Definicion").style.display = "block";
    document.getElementById("Modificar_Definicion").style.display = "none";
  
});



// // boton de agregar Caracteristica
document.getElementById("Agregar_Definicion").addEventListener("click", function(){
    $nom_Definicion=document.getElementById("nom_defi").value;
    $desc_Definicion=document.getElementById("desc_defi").value;
    $peso_Definicion=document.getElementById("peso_defi").value;
    $est_Definicion=document.getElementById("est_defi").value;
    
    if($nom_Definicion !=""  && $desc_Definicion != "" && $est_Definicion != ""  && $peso_Definicion != "" ){
      
                
                const postData = { 
                    caracteristica : document.getElementById("nom_defi").value,
                    descripcion : document.getElementById("desc_defi").value,
                    peso : document.getElementById("peso_defi").value,
                    estado : document.getElementById("est_defi").value,
                };
               
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/main/addDefinicion",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                     
                        if (respuesta.error==1) 
                        {
                        
                            
                            $("#modal_Definicion").modal("hide");    
                            document.getElementById("form_Definicion").reset();
                           
                            alerta_Definicion.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            respuesta.msg+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_Definicion").DataTable().ajax.reload(null, false); 
                           
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
$('#table_Definicion tbody').on( 'click', 'editDefinicion', function(){
    $("#modal_Definicion").modal("show");
    document.getElementById("title-Definicion").innerHTML = "Modificar Definicion";
    document.getElementById("form_Definicion").reset();
    document.getElementById("Agregar_Definicion").style.display = "none";
    document.getElementById("Modificar_Definicion").style.display = "block";


    var table = $('#table_Definicion').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    
    if (regNum == '0') {
        //console.log("error");
    }else{
        document.getElementById("id_Definicion").value=regDat[0]["id"];
        document.getElementById("nom_dise").value=regDat[0]["caracteristica"];
        document.getElementById("desc_dise").value=regDat[0]["descripcion"];   
        document.getElementById("peso_dise").value=regDat[0]["peso"];   
        document.getElementById("est_dise").value=regDat[0]["estado"];   
     
    }
});
//guardando la nueva info
document.getElementById("Modificar_Definicion").addEventListener("click",async function(){
    
    $nom_Definicion=document.getElementById("nom_defi").value;
    $desc_Definicion=document.getElementById("desc_defi").value;
    $peso_Definicion=document.getElementById("peso_defi").value;
    $est_Definicion=document.getElementById("est_defi").value;
    
    if($nom_Definicion !=""  && $desc_Definicion != "" && $est_Definicion != ""  && $peso_Definicion != ""){
                
       
                const postData = { 
                    id:document.getElementById("id_Definicion").value,
                    caracteristica : document.getElementById("nom_dise").value,
                    descripcion : document.getElementById("desc_dise").value,
                    peso : document.getElementById("peso_defi").value,
                    estado : document.getElementById("est_dise").value,
                   
                };
              
                try {
                   
                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/main/updateDefinicion",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                       console.log(respuesta);
                        if (respuesta.msg) 
                        {
                            $("#modal_Definicion").modal("hide");    
                            document.getElementById("form_Definicion").reset();
                           
                            alerta_Definicion.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            'Modificado Correctamente'+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_Definicion").DataTable().ajax.reload(null, false); 
                           
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

//eliminar definicion
$('#table_Definicion tbody').on( 'click', 'deleteDefinicion', function(){
     
    //recuperando los datos
    var table = $('#table_Definicion').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    const postData = { 
        id:regDat[0]["id"],
 
    };
    
    try {

        $.ajax({
            method: "POST",
            url: $('#base_url').val()+"/main/deleteDefinicion",
            data: postData,
            dataType: "JSON"
        })

     
        .done(function(respuesta) {
       
            if (respuesta.msg) 
            {
                
                alerta_Definicion.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                respuesta.msg+
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                    '<span aria-hidden="true">&times;</span>'+
                    '</button>'+
                '</div>';

                $("#table_Definicion").DataTable().ajax.reload(null, true); 
               
            }else{
                alerta_Definicion.innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">'+
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
