var BASE_URL = $('#base_url').val();

function  cargarDatosPosEmpresa(){
       
    
    //cargando las empresas
    $.ajax({
        method: "POST",
        url: BASE_URL+"/activo/getEmpresasByActivo",
        dataType: "JSON"
    })
    .done(function(respuesta) {
       console.log(respuesta);
        if (respuesta) 
        {
            let datos = respuesta;
            $("#id_empresa_pos").empty();
            $("#id_empresa_pos").append('<option value="" selected>Empresa</option>');

        

            datos.data.forEach(dato => {

                    if(idempresa == dato['id']){
                        $("#id_empresa_pos").append('<option value='+dato["id"]+' selected>'+dato["empresa"]+'</option>');
                    }else{
                        $("#id_empresa_pos").append('<option value='+dato["id"]+'>'+dato["empresa"]+'</option>');
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

function cargarDatosPosArea($empresa,$dato) {
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
                console.log(respuesta);
                if (respuesta) 
                {
                    let datos = respuesta;
                
    
                   
                    $("#id_area_pos").empty();
                    $("#id_area_pos").append('<option value="" selected>Area</option>');
            
                
            
                    datos.data.forEach(dato => {
                        if(dato["id"] == $dato){
                    
                            $("#id_area_pos").append('<option value='+dato["id"]+' selected>'+dato["area"]+'</option>');
                        }else{
                            $("#id_area_pos").append('<option value='+dato["id"]+'>'+dato["area"]+'</option>');
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

function cargarDatosPosUnidad($empresa,$idarea,$dato) {
        const postData = { 
            idempresa:$empresa,
            idarea:$idarea,
            
        }
      
        //cargando las Unidades
        $.ajax({
            method: "POST",
            url: BASE_URL+"/activo/getUnidadByActivo",
            dataType: "JSON",
            data:postData
        })
        .done(function(respuesta) {
        
            if (respuesta) 
            {
                let datos = respuesta;
            

                $("#id_unidad_pos").empty();
                $("#id_unidad_pos").append('<option value="" selected>Unidad</option>');
        
            
        
                datos.data.forEach(dato => {
                    if(dato["id"] == $dato){
                
                        $("#id_unidad_pos").append('<option value='+dato["id"]+' selected>'+dato["unidad"]+'</option>');
        
                    }else{
                        $("#id_unidad_pos").append('<option value='+dato["id"]+'>'+dato["unidad"]+'</option>'); 
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


function cargarDatosPosPosicion($empresa,$dato) {
    //cargando las areas
    const postData = { 
        idempresa:$empresa,
       
        
    }
    console.log(postData);
        $.ajax({
            method: "POST",
            url: BASE_URL+"/activo/getPosicionByActivo",
            dataType: "JSON",
            data: postData
        })
        .done(function(respuesta) {
            // console.log(respuesta);
            if (respuesta) 
            {
                let datos = respuesta;
            

               
                $("#id_puesto").empty();
                $("#id_puesto").append('<option value="" selected>Posicion/Puesto</option>');
        
            
        
                datos.data.forEach(dato => {
                    if(dato["id"] == $dato){
                
                        $("#id_puesto").append('<option value='+dato["id"]+' selected>'+dato["posicion_puesto"]+'</option>');
                    }else{
                        $("#id_puesto").append('<option value='+dato["id"]+'>'+dato["posicion_puesto"]+'</option>');
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


function cargarDatosPosNombre($empresa,$dato) {
    //cargando Nombre
    const postData = { 
        idempresa:$empresa,
       
        
    }
    // console.log(postData);
        $.ajax({
            method: "POST",
            url: BASE_URL+"/activo/getUserByActivo",
            dataType: "JSON",
            data: postData
        })
        .done(function(respuesta) {
            // console.log(respuesta);
            if (respuesta) 
            {
                let datos = respuesta;
            

               
                $("#id_nombre_pos").empty();
                $("#id_nombre_pos").append('<option value="" selected>Responsable</option>');
        
            
        
                datos.data.forEach(dato => {
                    if(dato["id_us"] == $dato){
                
                        $("#id_nombre_pos").append('<option value='+dato["id_us"]+' selected>'+dato["nombres_us"]+'</option>');
                    }else{
                        $("#id_nombre_pos").append('<option value='+dato["id_us"]+'>'+dato["nombres_us"]+'</option>');
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

function cargarDatosPosEstado($empresa,$dato) {
    //cargando las areas
    const postData = { 
        idempresa:$empresa,
       
        
    }
    console.log(postData);
        $.ajax({
            method: "POST",
            url: BASE_URL+"/activo/getEstadoByActivo",
            dataType: "JSON",
            data: postData
        })
        .done(function(respuesta) {
            
            if (respuesta) 
            {
                let datos = respuesta;
            

               
                $("#id_estado_pos").empty();
                $("#id_estado_pos").append('<option value="" selected>Estado</option>');
        
            
        
                datos.data.forEach(dato => {
                    if(dato["id"] == $dato){
                
                        $("#id_estado_pos").append('<option value='+dato["id"]+' selected>'+dato["estado"]+'</option>');
                    }else{
                        $("#id_estado_pos").append('<option value='+dato["id"]+'>'+dato["estado"]+'</option>');
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

function cargarDatosPosPrioridad($empresa,$dato) {
    //cargando las areas
    const postData = { 
        idempresa:$empresa,
       
        
    }
    console.log(postData);
        $.ajax({
            method: "POST",
            url: BASE_URL+"/activo/getPrioridadByActivo",
            dataType: "JSON",
            data: postData
        })
        .done(function(respuesta) {
           
            if (respuesta) 
            {
                let datos = respuesta;
            

               
                $("#id_prioridad_pos").empty();
                $("#id_prioridad_pos").append('<option value="" selected>Prioridad</option>');
        
            
        
                datos.data.forEach(dato => {
                    if(dato["id"] == $dato){
                
                        $("#id_prioridad_pos").append('<option value='+dato["id"]+' selected>'+dato["prioridad"]+'</option>');
                    }else{
                        $("#id_prioridad_pos").append('<option value='+dato["id"]+'>'+dato["prioridad"]+'</option>');
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

function cargarDatosPosAlerta($empresa,$dato) {
    //cargando las areas
    const postData = { 
        idempresa:$empresa,
       
        
    }
    console.log(postData);
        $.ajax({
            method: "POST",
            url: BASE_URL+"/activo/getAlertaByActivo",
            dataType: "JSON",
            data: postData
        })
        .done(function(respuesta) {
          
            if (respuesta) 
            {
                let datos = respuesta;
            

               
                $("#id_alerta_pos").empty();
                $("#id_alerta_pos").append('<option value="" selected>Alerta de Seguimiento</option>');
        
            
        
                datos.data.forEach(dato => {
                    if(dato["id"] == $dato){
                
                        $("#id_alerta_pos").append('<option value='+dato["id"]+' selected>'+dato["alerta"]+'</option>');
                    }else{
                        $("#id_alerta_pos").append('<option value='+dato["id"]+'>'+dato["alerta"]+'</option>');
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


window.addEventListener("load", () => {
    cargarDatosPosEmpresa();
    
    document.getElementById('id_empresa_pos').disabled  = true;
    document.getElementById('id_area_pos').disabled  = true;
    cargarDatosPosArea(idempresa,idarea);
    // cargarDatosPosPosicion(idempresa);
    cargarDatosPosPosicion(idempresa);
    cargarDatosPosUnidad(idempresa,idarea);
    cargarDatosPosNombre(idempresa);
    cargarDatosPosEstado(idempresa);
    cargarDatosPosPrioridad(idempresa);
    cargarDatosPosAlerta(idempresa);
})

document.getElementById("id_empresa_pos").addEventListener("change",function(){
    
    if($('#id_empresa_pos').val() != "" ){
        cargarDatosPosArea($('#id_empresa_pos').val());
        cargarDatosPosPosicion($('#id_empresa_pos').val());

        cargarDatosPosNombre($('#id_empresa_pos').val());
        cargarDatosPosEstado($('#id_empresa_pos').val());
        cargarDatosPosPrioridad($('#id_empresa_pos').val());
        cargarDatosPosAlerta($('#id_empresa_pos').val());
    }
    
});
document.getElementById("id_area_pos").addEventListener("change",function(){
    
    if($('#id_area_pos').val() != "" ){
        cargarDatosPosUnidad($('#id_empresa_pos').val(),$('#id_area_pos').val());

    }
    
});
function fecha($dato){
    var fecha=$dato;

    var nueva=fecha.split(" ")[0].split("-").join("-");
  
    return nueva;
}