miespacio = window.localStorage;
var activo_usern = miespacio.getItem('nomb');
var activo_usera = miespacio.getItem('apel');
var activo_usert = miespacio.getItem('tip');
document.getElementById('dato_usuario').innerHTML =''+activo_usern+" "+activo_usera;

//fin------------------------------------------------

if(activo_usern == null){
    var re = document.getElementById('cerrarw');
    re.style.display = "none";
    document.getElementById('dato_usuario').innerHTML ='<a style="text-decoration:none" class="text-white" href="../html/login.html">Iniciar sesion</a>';
} 

if (activo_usert == "Invitado"){
    var res = document.getElementById('cuad');
    res.style.display = "none";
}
function cerrar(){
    var respuest = confirm("Are you sure you want to log out?");
    if (respuest == true)
    {
        /* miespacio.clear(); */
        miespacio.removeItem("correo");
        miespacio.removeItem("tip");
        miespacio.removeItem("ciudad");
        miespacio.removeItem("nomb");
        miespacio.removeItem("telefono");
        miespacio.removeItem("user");
        miespacio.removeItem("apel");
        miespacio.removeItem("pais");
        console.log("Cerraste sesion");
        location.href="../index.html";
    }
    else
    {
        return false;
    }

}