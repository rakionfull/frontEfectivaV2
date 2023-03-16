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
                
    
                   
                    $("#id_area").empty();
                    $("#id_area").append('<option value="" selected>Seleccione</option>');
            
                
            
                    datos.data.forEach(dato => {
                        if(dato["id"] == $dato){
                    
                            $("#id_area").append('<option value='+dato["id"]+' selected>'+dato["area"]+'</option>');
                        }else{
                            $("#id_area").append('<option value='+dato["id"]+'>'+dato["area"]+'</option>');
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
            

                $("#id_unidad").empty();
                $("#id_unidad").append('<option value="" selected>Seleccione</option>');
        
            
        
                datos.data.forEach(dato => {
                    if(dato["id"] == $dato){
                
                        $("#id_unidad").append('<option value='+dato["id"]+' selected>'+dato["unidad"]+'</option>');
        
                    }else{
                        $("#id_unidad").append('<option value='+dato["id"]+'>'+dato["unidad"]+'</option>'); 
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
                console.log(respuesta);
                if (respuesta) 
                {
                    let datos = respuesta;
                
    
                   
                    $("#id_puesto").empty();
                    $("#id_puesto").append('<option value="" selected>Seleccione</option>');
            
                
            
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
    window.addEventListener("load", () => {
       
    })

    document.getElementById("id_empresa").addEventListener("change",function(){
        // console.log($('#select_areaMacro').val());
        if($('#id_empresa').val() != "" ){
            cargarDatosPosArea($('#id_empresa').val());
            cargarDatosPosPosicion($('#id_empresa').val());
        }
        
    });
    document.getElementById("id_area").addEventListener("change",function(){
        // console.log($('#select_areaMacro').val());
        if($('#id_area').val() != "" ){
            cargarDatosPosUnidad($('#id_empresa').val(),$('#id_area').val());
        }
        
    });