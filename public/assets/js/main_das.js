/* Validar solo Números */
var BASE_URL = document.getElementById("base_url").value;
var perfil = $('#perfil').val();
var tiempo = $('#tiempo').val() * 60000;
function soloNumero(e)
{
    var key = window.Event ? e.which : e.keyCode;
    return ((key >= 48 && key <= 57) || (key==8) || (key==45));
}


/* Validar solo Letras */
function soloLetra(e)
{
    var key = window.Event ? e.which : e.keyCode;
    
    var character = String.fromCharCode(key);

    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ_\s]+$/;
    if (!regex.test(character)) {
        e.preventDefault();
    }
}

   
var timeout;
document.onmousemove = function(){ 
    clearTimeout(timeout); 
    contadorSesion(); //aqui cargamos la funcion de inactividad
} 

    function contadorSesion() {
    timeout = setTimeout(function () {
            $.confirm({
                title: 'Alerta de Inactividad!',
                content: 'La sesión esta a punto de expirar.',
                autoClose: 'expirar|10000',//cuanto tiempo necesitamos para cerrar la sess automaticamente
                type: 'red',
                icon: 'fa fa-spinner fa-spin',
                buttons: {
                    expirar: {
                        text: 'Cerrar Sesión',
                        btnClass: 'btn-red',
                        action: function () {
                            salir();
                        }
                    },
                    permanecer: function () {
                        contadorSesion(); //reinicia el conteo
                        clearTimeout(timeout); //reinicia el conteo
                        $.alert('La Sesión ha sido reiniciada!'); //mensaje
                        window.location.href = BASE_URL + "/inicio";
                    }
                }
            });
        }, tiempo);//15 min para no demorar tanto  900000
    }

    function salir() {
            
                        const postData = { 
                        
                        };
                    
                        try {
        
                            $.ajax({
                                method: "POST",
                                url: BASE_URL+"/logout",
                                data: postData,
                                dataType: "JSON"
                            })
                            .done(function(respuesta) {
                            
                            if(respuesta.dato){
                            
                            // setTimeout( function() { window.location.href = BASE_URL+"/login"; }, 2000 );
                                // Swal.fire(
                                //     'Advertencia!!',
                                //     'Deslogeado por Inactividad',
                                //     'warning'
                                //   );
                                Swal.fire({
                                    title: "Advertencia!!",
                                    text:  "Deslogueado por Inactividad",
                                    icon: 'warning',
                                    showCancelButton: false,
                                    confirmButtonText: "Ok",
                                    cancelButtonText: "Cancelar",
                                })
                                .then(resultado => {
                                    if (resultado.value) {
                                            window.location.href = BASE_URL+"/iniciosesion"
                                    } 
                                });
                            }
                                    
                                                    
                            })
                            .fail(function(error) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    text: 'Error, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
                                })
                            })
                            .always(function() {
                            });
                        }
                        catch(err) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Error, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
                            })
                        }
                    
        
        
        
        

    }

    async function getPermisos($opcion) {
       
        let promise = new Promise((resolve, reject) => {
        //   setTimeout(() => resolve("done!"), 1000)
            let result;
    
                const postData = { 
                    perfil: perfil,
                    opcion: $opcion
                };
            //console.log(IDIOMA	);
                    try {
        
                        $.ajax({
                            method: "POST",
                            url: BASE_URL+"/getPermisos",
                            data:postData,
                            dataType: "JSON"
                        })
                        .done(function(respuesta) {
                        
                            //console.log(respuesta.data);
                            resolve(respuesta.data);
                                            
                        })
                            .fail(function(error) {
                                alert("Se produjo el siguiente error: ".err);
                            })
                            .always(function() {
                            });
                        }
                        catch(err) {
                            alert("Se produjo el siguiente error: ".err);
                        }
                       
                                
        });
      
        let resultado = await promise; 
        // permisos = resultado;
        return resultado
  
    }
