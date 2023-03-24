var alerta_Controles = document.getElementById('alerta_Controles');
var arrayData = [];
function cargarDatos(element) {
  
    $opcion = element.id.split('_');
    //cargar la data para todos los tipo tabla
    try {
        $('#spinner-div').show();
        $.ajax({
            method: "GET",
            url: $('#base_url').val()+"/main/getData/"+$opcion[4],
            dataType: "JSON"
        })
        .done(function(respuesta) {
            $('#spinner-div').hide();
            $("#"+element.id).empty();
            $("#"+element.id).append('<option value="" selected>'+element.name+'</option>');
    
           
    
            respuesta.data.forEach(dato => {
                
              
                $("#"+element.id).append('<option value='+dato["id"]+'>'+dato[respuesta.dato]+'</option>');
    
                
                
             
            });
    
        })
    } catch (error) {
        
    }
    
}

function cargarEvaluacion($array) {
    const postData = {
        0: $array
    };
    $.ajax({
        method: "POST",
        url: $('#base_url').val()+"/main/ejecutarEvaluacion",
        data: postData,
        dataType: "JSON"
    })
    .done(function(respuesta) {
        // console.log(respuesta.toString().toUpperCase());
        if(respuesta != ""){
            $('#evaluacion').empty();
            $('#evaluacion').val(respuesta.toString().toUpperCase());
        }

     
    })
  
}
//Realizar consulta ajax para calificar
function EjecutarCalificacion($array,$idCC) {
    
    const postData = {
        0: $array
    };
        
   
    $.ajax({
        method: "POST",
        url: $('#base_url').val()+"/main/calificarControl/"+$idCC,
        data: postData,
        dataType: "JSON"
    })
    .done(function(respuesta) {
        // console.log(respuesta.toString().toUpperCase());
        if(respuesta != ""){
            $('#resultado_'+$idCC).empty();
            $('#resultado_'+$idCC).append(respuesta.toString().toUpperCase());
        }else{
            $('#resultado_'+$idCC).empty();
            $('#resultado_'+$idCC).append("NO HAY CALIFICACION");
        }

        $resultado =  document.querySelectorAll('.resultado');
        $array_resultado = [];
        $resultado.forEach((btn,i) => {  
            if(document.getElementById(btn.id).innerHTML != " "){
                // cargarEvaluacion(btn);
                $dato= btn.id.split('_');
                $array_aux = {
                    idCC: $dato[1],
                    valor : document.getElementById(btn.id).innerHTML,
                };
                    
                
                $array_resultado.push($array_aux);
              
                // console.log(document.getElementById(btn.id).innerHTML );
            }  
          
         });
        
       if($array_resultado.length > 1){
            cargarEvaluacion($array_resultado);
       }
    })
}

//boton de calificar
function Calificar(element) {
    $array = [];
    $arrayData= [];
    event.preventDefault();
    $dato= element.id.split('_');
   
    $valores = document.querySelectorAll(".valor");
    $valores.forEach(element => {
       
        // console.log(element.options[element.selectedIndex].value);
     
        $valor= 0;
        $opcion = element.id.split('_');
   
        if(parseInt($dato[1]) == parseInt($opcion[2])){
               
        if(element.value != ""){
            $valor=element.value;
        }
        if($opcion[4]  == ""){
            $tabla = 0;
        }else{$tabla = $opcion[4]}
        //primer selector
        if($dato[2] == 0){
            
            if($opcion[3] == 0){
                //aqui iria los imputs normales
                $array = {
                    idCC : $opcion[1],
                    valor :$valor,
                    tabla : $tabla,
                };
            }else{
                //aqui los selects
                if($opcion[4] == ""){
                    $array = {
                        idCC : $valor,
                        valor :$valor,
                        tabla : $tabla,
                    };
                }else{
                    $array = {
                        idCC : $valor,
                        valor :$valor,
                        tabla : $tabla,
                    };
                }
               
            }
           
        }else{
            $array = {
                idCC : $valor,
                valor :$valor,
                tabla : $tabla,
            };
        }


        // if(element.type == "text"){
        //     $array = {
        //         idCC : $opcion[1],
        //         valor :$valor,
        //     };
              
        // }else{
        //     $array = {
        //         idCC : $valor,
        //         valor :$valor,
        //     };
              
        // }
          
            
            $arrayData.push($array);
        }
    });
    EjecutarCalificacion($arrayData,parseInt($dato[1]));
    // arrayData = $arrayData;
    
}

window.addEventListener("load", () => {
    $datos = document.querySelectorAll(".tabla");
  
    $data = document.querySelectorAll(".calificar");

    $datos.forEach((btn,i) => {  
       
      cargarDatos(btn);
    });
   
    $data.forEach((btn,i) => {   
         btn.addEventListener('click',()=>Calificar(btn));
      });
     

})


// // boton de agregar Unidades
document.getElementById("btn_AgregarControl").addEventListener("click",function(){
    event.preventDefault();
    var data = $('.js-riesgos-basic-multiple').select2('data');
    var datos = "";
    var datos_text = "";
    data.forEach(element => {
        datos += element.id + "-";
        datos_text += element.text + "-";
    });
    // console.log(datos);
    // console.log(datos_text);
   $array_data = [];
//    &&  datos_text != ""
    if(document.getElementById("evaluacion").value != ""){
        if($('#control').val() != ""  && $('#estado').val()!="" && $('#cobertura').val()!=""){
            $valores = document.querySelectorAll(".valor");
            $valores.forEach((btn,i) => {   
             
               $opcion = btn.id.split('_');
               
               $tabla=0;
               if($opcion[4]  != 0) {
                  
                   $tabla = $opcion[4];
               }
               $array_aux={
                   valor:btn.value,
                   idCC:$opcion[1],
                   nom_tabla:$tabla,
   
               };
               $array_data.push($array_aux);
           });
           // console.log($array_data);
   
   
           const postData = { 
               IDC: $('#IDC').val() ,
               control: $('#control').val() ,
               IDR: datos.slice(0, -1) ,
               // IDR:1,
               riesgo: datos_text.slice(0, -1) ,
               evaluacion: $('#evaluacion').val() ,
               estado: $('#estado').val() ,
               cobertura: $('#cobertura').val() ,
               valores: $array_data,
           }
          
           try {
            $('#spinner-div').show();
               $.ajax({
                   method: "POST",
                   url: $('#base_url').val()+"/main/addControles",
                   data: postData,
                   dataType: "JSON"
               })
               .done(function(respuesta) {
                console.log(respuesta);
                    $('#spinner-div').hide();
                //    console.log(respuesta);
                   if (respuesta.error==1) 
                   {
                   
                      
                                   
                       alerta_Controles.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                       respuesta.msg+
                       '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                           '<span aria-hidden="true">&times;</span>'+
                           '</button>'+
                       '</div>';
                       setTimeout( function() { window.location.href = $('#base_url').val()+"/registro-controles"; }, 3000 );
                                          
                       // window.location = $('#base_url').val()+'/registro-controles';
                   
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
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Faltan Datos'
              })
}
      
    }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Debe realizar la calificación'
                  })
    }
    
    

});

$(document).ready(function() { 
    $('.js-riesgos-basic-multiple').select2({ width: '100%' })
});
