document.getElementById("show_password").addEventListener("click", function(){
  // console.log("pas1");
    var cambio = document.getElementById("pass");
    if(cambio.type == "password"){
        cambio.type = "text";
        $('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
    }else{
        cambio.type = "password";
        $('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
    }
  });
  
  // $(document).ready(function () {
  // //CheckBox mostrar contraseña
  // $('#ShowPassword').click(function () {
   
  //   $('#Password').attr('type', $(this).is(':checked') ? 'text' : 'password');
  // });
  // });

  
  // $(document).ready(function () {
  // //CheckBox mostrar contraseña
  // $('#Show_password2').click(function () {
  //   console.log("pas22");
  //   $('#Password').attr('type', $(this).is(':checked') ? 'text' : 'password');
  // });
  // });