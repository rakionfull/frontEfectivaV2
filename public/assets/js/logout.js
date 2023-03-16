
document.getElementById("btn_Logout").addEventListener("click",function(){
    event.preventDefault();
                const postData = { 
                 
                };
              
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/logout",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                       
                       if(respuesta.dato){
                        Swal.fire({
                            title: "Exito!!",
                            text:  "Deslogeo normal por sistema",
                            icon: 'success',
                            showCancelButton: false,
                            confirmButtonText: "Ok",
                            cancelButtonText: "Cancelar",
                        })
                        .then(resultado => {
                            if (resultado.value) {
                                    window.location.href = $('#base_url').val()+"/login"
                            } 
                        });
                        //setTimeout( function() { window.location.href = BASE_URL+"/login"; }, 2000 );
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
            

   


});