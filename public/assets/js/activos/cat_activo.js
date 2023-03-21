var alerta_cat_activo = document.getElementById("alert_catActivo");
function cargarDatosCatActivo() {
    
    //Carga todas las tipo de activo
    try {

       $.ajax({
           method: "POST",
           url: $('#base_url').val()+"/activo/getTipoActivoByActivo",
           dataType: "JSON"
       })
       .done(function(respuesta) {
           if (respuesta) 
           {
               let datos = respuesta["data"];
               //console.log(datos);
               $("#idvalor_catActivo").empty();
               $("#idvalor_catActivo").append('<option value=>Tipo</option>');
               datos.forEach(dato => {
                   $("#idvalor_catActivo").append('<option value='+dato["id"]+'>'+dato["tipo"]+'</option>');
               });
           } 
           else
           { //swal("Error", "Error al recoger los datos", "error"); }
           }
       })
       .fail(function(error) {
           // alert("Se produjo el siguiente error: ".err);
       })
       .always(function() {
       });
   }
   catch(err) {
       // alert("Se produjo el siguiente error: ".err);
   }
}



function LoadTableCatActivo ($update,$delete) {
    if ($.fn.DataTable.isDataTable('#table_cat_activo')){
        
        $('#table_cat_activo').DataTable().rows().remove();
        $('#table_cat_activo').DataTable().destroy();
    
    }

    $('#table_cat_activo').DataTable({
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
        // scrollY: "200px",
        // fixedColumns:   {
        //     heightMatch: 'none'
        // },
        responsive: true,
        autoWidth: false,
        // processing: true,
        lengthMenu:[5,10,25,50],
        pageLength:10,
        clickToSelect:false,
        ajax: $('#base_url').val()+"/activo/getCatActivo",
        aoColumns: [
            { "data": "id" },
            { "data": "categoria" },
            { "data": "tipo" },
            { "data": "idtipo" },
            { "data": "estado",
                        
            "mRender": function(data, type, value) {
                if (data == '1') return  'Activo';
                else return 'Inactivo'
                  

                }
            },
            {  "data": "id",
                        
            "mRender": function(data, type, value) {
                $cadena = "";
                if ($update == '1'){
                    $cadena =   $cadena +  "<editCat_activo class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editCat_activo>";
               
                } 
                if ($delete == '1') {
                    $cadena =     $cadena +  "<deleteCat_activo class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteCat_activo>";
              
                }else return "<i class='fas fa-exclamation-circle text-danger font-size-18'></i>";
                return $cadena;
                

                }
            },
//             { "defaultContent": "<editCat_activo class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editCat_activo>"+
//             "<deleteCat_activo class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteCat_activo>"

// },
        ],
        columnDefs: [
            {
                 "targets": [ 3 ],
                "visible": false,
                "searchable": false
            },
            
        ],
        'drawCallback': function () {
            $( 'table_cat_activo tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
   
}

//validamos
async function validacionCatActivo(){

    let result; /* Variable Resultado de Funcion */

    // Validar existe
        try {

            const postData = {           
                categoria:document.getElementById("nom_categoria").value,
                idtipo:document.getElementById("idvalor_catActivo").value
            };

            await $.ajax({
                method: "POST",
                url: $('#base_url').val()+"/activo/validarCatActivo",
                data: postData,
                dataType: "JSON"
            })
            .done(function(respuesta) {
               console.log(respuesta);
                result = respuesta;
            })
            .fail(function(error) {
                // alert("Se produjo el siguiente error: ".err);
            })
            .always(function() {
            });
        }
        catch(err) {
            // alert("Se produjo el siguiente error: ".err);
        }
    // /.Validar existe

    return result; /* Retorno de Resultado */

};


document.getElementById("btnAgregar_catActivo").addEventListener("click",function(){
                                
    $("#modal_cat_activo").modal("show");
    document.getElementById("title-cat_activo").innerHTML = "Agregar Tipo de Activo";
    document.getElementById("form_cat_activo").reset();
    document.getElementById("Agregar_cat_activo").style.display = "block";
    document.getElementById("Modificar_cat_activo").style.display = "none";
});

// boton de agregar Tipo Activo
document.getElementById("Agregar_cat_activo").addEventListener("click",async function(){
    $nom_cat=document.getElementById("nom_categoria").value;
    $est_cat=document.getElementById("est_catActivo").value;
    $idvalor=document.getElementById("idvalor_catActivo").value;
    
    if($nom_cat !=""  && $est_cat != "" && $idvalor != ""){
       
        // if (!(await validacionCatActivo())){
           
                const postData = { 
                    categoria:document.getElementById("nom_categoria").value,
                    idtipo:document.getElementById("idvalor_catActivo").value,
                    estado:$est_cat
                    
                };
               
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/activo/addCatActivo",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                        console.log(respuesta);
                        // if (respuesta) 
                        // {
                        //     document.getElementById("form_tipo_activo").reset();
                        //     $('#modal_cat_activo').modal('hide');
                        //     alerta_cat_activo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                        //     'Categoría de activo Registrado Correctamente'+
                        //     '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                        //         '<span aria-hidden="true">&times;</span>'+
                        //         '</button>'+
                        //     '</div>';
                        //     $("#table_cat_activo").DataTable().ajax.reload(null, false); 
                           
                        // } 
                        if (respuesta.error==1) 
                        {
                            document.getElementById("form_cat_activo").reset();
                            $('#modal_cat_activo').modal('hide');
                            alerta_cat_activo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'
                            +  respuesta.msg +
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_cat_activo").DataTable().ajax.reload(null, false); 
                           
                        } else{
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: respuesta.msg
                              })
                        }
                    })
                    .fail(function(error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudo agregar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
                        })
                    })
                    .always(function() {
                    });
                }
                catch(err) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo agregar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
                    })
                }
        // }else{
        //         Swal.fire({
        //                  icon: 'error',
        //                  title: 'Error',
        //                  text: 'La categoría de activo ya se encuentra registrado'
        //                })
        // }
           
       
    }else{
        console.log("aqui4");
        Swal.fire({
                 icon: 'error',
                 title: 'Error',
                 text: 'Faltan Datos'
               })
  }
   


});

//editar Cat de activo
$('#table_cat_activo tbody').on( 'click', 'editCat_activo', function(){
    $("#modal_cat_activo").modal("show");
    document.getElementById("title-cat_activo").innerHTML = "Modificar Tipo de Activo";
    document.getElementById("form_cat_activo").reset();
    document.getElementById("Agregar_cat_activo").style.display = "none";
    document.getElementById("Modificar_cat_activo").style.display = "block";
   
    //recuperando los datos
    var table = $('#table_cat_activo').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    if (regNum == '0') {
        //console.log("error");
    }else{
      
        document.getElementById("id_cat_activo").value=regDat[0]["id"];
        document.getElementById("nom_categoria").value=regDat[0]["categoria"];
        document.getElementById("idvalor_catActivo").value=regDat[0]["idtipo"];
        document.getElementById("est_catActivo").value=regDat[0]["estado"];
        
     
    }
});
//guardando la nueva info
document.getElementById("Modificar_cat_activo").addEventListener("click", function(){
    
    $nom_cat=document.getElementById("nom_categoria").value;
    $est_cat=document.getElementById("est_catActivo").value;
    $idvalor=document.getElementById("idvalor_catActivo").value;
    
    if($nom_cat !=""  && $est_cat != "" && $idvalor != ""){
       
                const postData = { 
                    id:document.getElementById("id_cat_activo").value,
                    categoria:document.getElementById("nom_categoria").value,
                    idtipo:document.getElementById("idvalor_catActivo").value,
                    estado:$est_cat
                };
              
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/activo/updateCatActivo",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                       
                        if (respuesta) 
                        {
                            document.getElementById("form_tipo_activo").reset();
                            $('#modal_cat_activo').modal('hide');
                            alerta_cat_activo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            'Modificado Correctamente'+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_cat_activo").DataTable().ajax.reload(null, false); 
                           
                        } 
                        
                    })
                    .fail(function(error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudo editar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
                        })
                    })
                    .always(function() {
                    });
                }
                catch(err) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo editar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
                    })
                }
            
           
       
    }else{
        console.log("aqui4");
        Swal.fire({
                 icon: 'error',
                 title: 'Error',
                 text: 'Faltan Datos'
               })
     }
   
});
//eliminar cat_activo
$('#table_cat_activo tbody').on( 'click', 'deleteCat_activo', function(){
     
    //recuperando los datos
    
    var table = $('#table_cat_activo').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    
    const postData = { 
        id:regDat[0]["id"],
 
    };
    
    try {

        $.ajax({
            method: "POST",
            url: $('#base_url').val()+"/activo/deleteCatActivo",
            data: postData,
            dataType: "JSON"
        })

     
        .done(function(respuesta) {
        //  console.log(respuesta);
            if (!respuesta.error) 
            {
                alerta_cat_activo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                respuesta.msg+
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                    '<span aria-hidden="true">&times;</span>'+
                    '</button>'+
                '</div>';

                $("#table_cat_activo").DataTable().ajax.reload(null, true); 
               
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: respuesta.msg
                })
            } 
            
        })
        .fail(function(error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo eliminar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
            })
        })
        .always(function() {
        });
    }
    catch(err) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
        })
    }
});
