var alerta_area_empresa = document.getElementById("alert_area_empresa");
function LoadTableAreaEmpresa($update,$delete) {
    
    
    //cargando las empresas
    $.ajax({
        method: "POST",
        url: $('#base_url').val()+"/activo/getEmpresasByActivo",
        dataType: "JSON"
    })
    .done(function(respuesta) {
       

        if (respuesta) 
        {
            let datos = respuesta;
          

            $("#select_empresa").empty();
            $("#select_empresa").append('<option value="" selected>Empresa</option>');

           

            datos.data.forEach(dato => {
                
              
                    $("#select_empresa").append('<option value='+dato["id"]+'>'+dato["empresa"]+'</option>');

                
                
             
            });
        } 
        else
        {  }
    
    })
    .fail(function(error) {
        alert("Se produjo el siguiente error: ".err);
    })
    .always(function() {
    });


    

    if ($.fn.DataTable.isDataTable('#table_area_empresa')){
        
        $('#table_area_empresa').DataTable().rows().remove();
        $('#table_area_empresa').DataTable().destroy();
    
    }

    $('#table_area_empresa').DataTable({
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
        ajax: $('#base_url').val()+"/activo/getArea",
        aoColumns: [
            { "data": "id" },
            { "data": "id" },
            { "data": "idempresa" },
            { "data": "area" },
            { "data": "empresa" },            
            {  "data": "estado",
                        
            "mRender": function(data, type, value) {
                if (data == '1') return  'Activo';
                else return 'Inactivo'
                  

                }
            },
            {  "data": "id",
                        
            "mRender": function(data, type, value) {
                $cadena = "";
                if ($update == '1'){
                    $cadena =   $cadena +  "<editAreaEmpresa class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editAreaEmpresa>";
               
                } 
                if ($delete == '1') {
                    $cadena =     $cadena +  "<deleteAreaEmpresa class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteAreaEmpresa>";
              
                }else return "<i class='fas fa-exclamation-circle text-danger font-size-18'></i>";
               
                }
            },
//             { "defaultContent": "<editAreaEmpresa class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='mdi mdi-pencil font-size-18'></i></editAreaEmpresa>"+
//             "<deleteAreaEmpresa class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='mdi mdi-trash-can font-size-18'></i></deleteAreaEmpresa>"

// },
        ],
        columnDefs: [
            {
                "targets": [ 1,2 ],
                "visible": false,
                "searchable": false
            },
            
        ],
        'drawCallback': function () {
            $( 'table_area tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
   
}

//area empresa
document.getElementById("btnAgregar_area_empresa").addEventListener("click",function(){
                                
    $("#modal_area_empresa").modal("show");    
    document.getElementById("title-area-empresa").innerHTML = "Agregar";
    document.getElementById("form_area_empresa").reset();
    document.getElementById("Agregar_area_empresa").style.display = "block";
    document.getElementById("Modificar_area_empresa").style.display = "none";
});


// // boton de agregar Area Empresa
document.getElementById("Agregar_area_empresa").addEventListener("click",function(){
    $select_empresa=document.getElementById("select_empresa").value;    
    $nom_area=document.getElementById("nom_area").value;
    $est_area_empresa=document.getElementById("est_area_empresa").value;
    console.log($select_empresa);
    console.log($nom_area);
    console.log($est_area_empresa);
    if($select_empresa !=""  && $nom_area != "" && $est_area_empresa != ""){
       
                const postData = { 
                     empresa:$select_empresa,
                     area:$nom_area, 
                     estado:$est_area_empresa,                    
                };
               
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/activo/addArea",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                        if (respuesta.error==1) 
                        {
                        
                            
                            $("#modal_area_empresa").modal("hide");    
                            document.getElementById("form_area_empresa").reset();
                           
                            alerta_area_empresa.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            respuesta.msg+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_area_empresa").DataTable().ajax.reload(null, false); 
                           
                        }else{
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: respuesta.msg
                              })
                        } 
                        
                    })
                    .fail(function(error) {
                        alert("Error en el ajax");
                    })
                    .always(function() {
                    });
                }
                catch(err) {
                    alert("Error en el try");
                }
            
           
       
    }else{
       
        Swal.fire({
                 icon: 'error',
                 title: 'Error',
                 text: 'Faltan Datos'
               })
  }
   


});

// // editar Area
$('#table_area_empresa tbody').on( 'click', 'editAreaEmpresa', function(){
    $("#modal_area_empresa").modal("show");
    document.getElementById("title-area-empresa").innerHTML = "Modificar";
    document.getElementById("form_area_empresa").reset();
    document.getElementById("Agregar_area_empresa").style.display = "none";
    document.getElementById("Modificar_area_empresa").style.display = "block";
   
    //recuperando los datos
    var table = $('#table_area_empresa').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    if (regNum == '0') {
        //console.log("error");
    }else{
        console.log(regDat[0]["idempresa"]);
        document.getElementById("id_area_empresa").value=regDat[0]["id"]; 
        document.getElementById("select_empresa").value=regDat[0]["idempresa"];
        document.getElementById("nom_area").value=regDat[0]["area"];                
        document.getElementById("est_area_empresa").value=regDat[0]["estado"];
     
    }
});

//guardando la nueva info
document.getElementById("Modificar_area_empresa").addEventListener("click", function(){
    
    $select_empresa=document.getElementById("select_empresa").value;
    $nom_area=document.getElementById("nom_area").value;
    $est_area_empresa=document.getElementById("est_area_empresa").value;
    
    
    if($select_empresa !=""  && $nom_area != "" && $est_area_empresa != ""){
       
                const postData = { 
                    id:document.getElementById("id_area_empresa").value,
                    idempresa:$select_empresa,
                    area:$nom_area, 
                    estado:$est_area_empresa,   
                  
                };
              
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/activo/updateArea",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                       
                        if (respuesta) 
                        {
                            document.getElementById("form_area_empresa").reset();
                            
                            alerta_area_empresa.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            'Modificado'+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_area_empresa").DataTable().ajax.reload(null, false); 
                           
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

//eliminar Empresa
$('#table_area_empresa tbody').on( 'click', 'deleteAreaEmpresa', function(){
     
    //recuperando los datos
    var table = $('#table_area_empresa').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    const postData = { 
        id:regDat[0]["id"],
 
    };
    
    try {

        $.ajax({
            method: "POST",
            url: $('#base_url').val()+"/activo/deleteArea",
            data: postData,
            dataType: "JSON"
        })

     
        .done(function(respuesta) {
        //  console.log(respuesta);
            if (respuesta.msg) 
            {
                
                alerta_area_empresa.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                respuesta.msg+
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                    '<span aria-hidden="true">&times;</span>'+
                    '</button>'+
                '</div>';

                $("#table_area_empresa").DataTable().ajax.reload(null, true); 
               
            }else{
                alerta_area_empresa.innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">'+
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
