var alerta_unidades = document.getElementById("alert_unidades");
function inicializaUnidades() {
    $("#select_areaUnidades").empty();
    $("#select_areaUnidades").append('<option value="" selected>Seleccione</option>');
}
function  cargarDatosUnidadesEmpresa(){
       
//cargando las empresas
$.ajax({
    method: "POST",
    url: BASE_URL+"/activo/getEmpresasByActivo",
    dataType: "JSON"
})
.done(function(respuesta) {
   
    if (respuesta) 
    {
        let datos = respuesta;
          
        $("#select_empresaUnidades").empty();
        $("#select_empresaUnidades").append('<option value="" selected>Seleccione</option>');

        datos.data.forEach(dato => {
            
          
                $("#select_empresaUnidades").append('<option value='+dato["id"]+'>'+dato["empresa"]+'</option>');

           
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

}
function cargarDatosUnidadesArea($empresa,$dato) {
 
    //cargando las areas
    const postData = { 
        idempresa:$empresa,
       
        
    }
    console.log(postData);
        $.ajax({
            method: "POST",
            url: BASE_URL+"/activo/getAreasByActivo",
            dataType: "JSON",
            data: postData
        })
        .done(function(respuesta) {
            // console.log(respuesta);
            if (respuesta) 
            {
                let datos = respuesta;
            
               
                    $("#select_areaUnidades").empty();
                    $("#select_areaUnidades").append('<option value="" selected>Seleccione</option>');
                
               

                
                datos.data.forEach(dato => {

                        if(dato["id"] == $dato){
                            $("#select_areaUnidades").append('<option value='+dato["id"]+' selected>'+dato["area"]+'</option>');
                        }else{
                            $("#select_areaUnidades").append('<option value='+dato["id"]+'>'+dato["area"]+'</option>');
                        }
                
                        

                    
                    
                
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
}
function LoadTableUnidades($update,$delete) {
    if ($.fn.DataTable.isDataTable('#table_unidades')){
        
        $('#table_unidades').DataTable().rows().remove();
        $('#table_unidades').DataTable().destroy();
    
    }

    $('#table_unidades').DataTable({
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
        pageLength:5,
        clickToSelect:false,
        ajax: BASE_URL+"/activo/getUnidades",
        aoColumns: [            
            { "data": "id" },            
            { "data": "unidad" },
            { "data": "empresa" },
            { "data": "area" },
            {  "data": "estado",
                        
            "mRender": function(data, type, value) {
                if (data == '1') return  'Activo';
                else return 'Inactivo'
                  

                }
            },
            { "data": "idempresa" },
            { "data": "idarea" },
            {  "data": "id",
                        
            "mRender": function(data, type, value) {
                $cadena = "";
                if ($update == '1'){
                    $cadena =   $cadena +  "<editUnidades class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editUnidades>";
               
                } 
                if ($delete == '1') {
                    $cadena =     $cadena +  "<deleteUnidad class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteUnidad>";
              
                }else return "<i class='fas fa-exclamation-circle text-danger font-size-18'></i>";
                return $cadena;
                

                }
            },
//             { "defaultContent": "<editUnidades class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editUnidades>"+
//             "<deleteUnidad class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteUnidad>"

// },
        ],
        columnDefs: [
            {
                "targets": [ 5,6 ],
                "visible": false,
                "searchable": false
            },
            
        ],
        'drawCallback': function () {
            $( 'table_unidades tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
   
}

document.getElementById("btnAgregar_Unidades").addEventListener("click",function(){
                                
    $("#modal_unidades").modal("show");
    document.getElementById("title-unidades").innerHTML = "Agregar Unidades";
    document.getElementById("form_unidades").reset();
    document.getElementById("Agregar_Unidades").style.display = "block";
    document.getElementById("Modificar_Unidades").style.display = "none";
    inicializaUnidades();
});

// // boton de agregar Unidades
document.getElementById("Agregar_Unidades").addEventListener("click",function(){
    $select_empresaUnidades=document.getElementById("select_empresaUnidades").value;    
    $select_areaUnidades=document.getElementById("select_areaUnidades").value;
    $nom_uni=document.getElementById("nom_uni").value;
    $est_uni=document.getElementById("est_uni").value;
        
    if($select_empresaUnidades !="" && $select_areaUnidades !="" && $nom_uni !=""  && $est_uni != ""){
       
                const postData = { 
                    idempresa:$select_empresaUnidades,
                    idarea:$select_areaUnidades,
                    unidad:$nom_uni,
                    estado:$est_uni,
                    
                };
                
                try {

                    $.ajax({
                        method: "POST",
                        url: BASE_URL+"/activo/addUnidades",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                        if (respuesta.error==1) 
                        {
                        
                            document.getElementById("form_unidades").reset();
                         
                            $('#modal_unidades').modal('hide');
                            alerta_unidades.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            respuesta.msg+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_unidades").DataTable().ajax.reload(null, false); 
                           
                        } else{
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
        console.log("aqui9");
        Swal.fire({
                 icon: 'error',
                 title: 'Error',
                 text: 'Faltan Datos'
               })
  }
   


});
//editar Empresa
$('#table_unidades tbody').on( 'click', 'editUnidades', function(){
    $("#modal_unidades").modal("show");
    document.getElementById("title-unidades").innerHTML = "Modificar";
    document.getElementById("form_unidades").reset();
    document.getElementById("Agregar_Unidades").style.display = "none";
    document.getElementById("Modificar_Unidades").style.display = "block";
    
   
    //recuperando los datos
    var table = $('#table_unidades').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    if (regNum == '0') {
        //console.log("error");
    }else{
        document.getElementById("id_unidades").value=regDat[0]["id"]; 
        document.getElementById("select_empresaUnidades").value=regDat[0]["idempresa"];  
        // cargarDatosUnidadesArea(document.getElementById("select_empresaUnidades").value); 
        cargarDatosUnidadesArea(document.getElementById("select_empresaUnidades").value, regDat[0]["idarea"])
            
            
        
          
        // $('#select_areaUnidades').change();
        // document.getElementById("select_areaUnidades").value=regDat[0]["idarea"]; 
        document.getElementById("nom_uni").value=regDat[0]["unidad"];                
        document.getElementById("est_uni").value=regDat[0]["estado"];      
     
    }
});
//guardando la nueva info
document.getElementById("Modificar_Unidades").addEventListener("click", function(){
    
    $select_empresaUnidades=document.getElementById("select_empresaUnidades").value;    
    $select_areaUnidades=document.getElementById("select_areaUnidades").value;
    $nom_uni=document.getElementById("nom_uni").value;
    $est_uni=document.getElementById("est_uni").value;
    
    if($select_empresaUnidades !="" && $select_areaUnidades !="" && $nom_uni !=""  && $est_uni != ""){
       
                const postData = { 
                    id:document.getElementById("id_unidades").value,
                    idempresa:$select_empresaUnidades,
                    idarea:$select_areaUnidades,
                    unidad:$nom_uni,
                    estado:$est_uni,                    
                };
              
                try {

                    $.ajax({
                        method: "POST",
                        url: BASE_URL+"/activo/updateUnidades",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                       
                        if (respuesta) 
                        {
                            document.getElementById("form_unidades").reset();
                            $('#modal_unidades').modal('hide');
                            alerta_unidades.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            'Unidad Modificada'+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_unidades").DataTable().ajax.reload(null, false); 
                           
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
        console.log("aqui9");
        Swal.fire({
                 icon: 'error',
                 title: 'Error',
                 text: 'Faltan Datos'
               })
  }
   
});
//eliminar Unidada
$('#table_unidades tbody').on( 'click', 'deleteUnidad', function(){
     
    //recuperando los datos
    var table = $('#table_unidades').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    const postData = { 
        id:regDat[0]["id"],
 
    };
    
    try {

        $.ajax({
            method: "POST",
            url: $('#base_url').val()+"/activo/deleteUnidad",
            data: postData,
            dataType: "JSON"
        })

     
        .done(function(respuesta) {
        //  console.log(respuesta);
            if (respuesta.msg) 
            {
                
                alerta_unidades.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                respuesta.msg+
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                    '<span aria-hidden="true">&times;</span>'+
                    '</button>'+
                '</div>';

                $("#table_unidades").DataTable().ajax.reload(null, true); 
               
            }else{
                alerta_unidades.innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">'+
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
document.getElementById("select_empresaUnidades").addEventListener("change",function(){
    console.log($('#select_empresaUnidades').val());
    if($('#select_empresaUnidades').val() != "" ){
        cargarDatosUnidadesArea($('#select_empresaUnidades').val(),"");
    }
    
});