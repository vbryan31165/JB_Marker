/* var divtabla = document.getElementById("cuadro"); // cuadro dentro de la tabla */
var i = 1; //contadora
var botonenviar = document.getElementById("btnagregar");
var botoneditar = document.getElementById("btneditar");
botoneditar.disabled = true; //no habilitado editar

var infoForm = {}; //variable tipo

var personJSONFromLS = localStorage.getItem("calculadora"); //Obtener datos de localStorage
var personFromLS = JSON.parse(personJSONFromLS); // Covertir a objeto

var datos1 = [];
if (personFromLS === null) {
    // Si no existe, creamos un array vacio.
    var datos1 = [];
}

function Mostrar() {
    if (CheckBrowser()) {
        var list =
            "<tr><th>Id</th><th>Valor Producto</th><th>% Descuento</th><th>Descuento</th><th>Opciones</th></tr>\n";
        if (localStorage.getItem("calculadora")) {
            personJSONFromLS = localStorage.getItem("calculadora");
            personFromLS = JSON.parse(personJSONFromLS);
            var i = 1;

            for (const [key, value] of Object.entries(personFromLS)) {
                valor1 = parseFloat(value.numero_1);
                valor2 = parseFloat(value.numero_2);
                resultado = valor1 - valor1 * (valor2 / 100);

                list +=
                    "<tr id=" +
                    value.secuencia.toString() +
                    "><td>" +
                    parseInt(i++) +
                    "</td>\n<td>" +
                    value.numero_1 +
                    "</td>\n<td>" +
                    value.numero_2 +
                    " % " +
                    "</td>\n<td>" +
                    resultado +
                    "</td>\n<td>" +
                    "<a  id=" +
                    value.secuencia.toString() +
                    ' class="btn btn-warning btn-sm " onClick="onEdit(this)">Edit</a><a id=' +
                    value.secuencia.toString() +
                    ' class= "fila btn btn-danger btn-sm" onClick="onDelete(this)" >Delete</aid=>' +
                    "</td></tr>";
            }
        } else {
            if (
                list ==
                "<tr><th>Id</th><th>Valor Producto</th><th>% Descuento</th><th>Descuento</th><th>Opciones</th></tr>\n"
            ) {
                list +=
                    "<tr><td><i>empty</i></td>\n<td><i>empty</i></td>\n<td><i>empty</i></td>\n<td><i>empty</i></td></tr>\n";
            }
        }
        document.getElementById("tbPorcentaje").innerHTML = list;
    } else {
        alert("No soportado local storage");
    }
}

function procesar() {
    personJSONFromLS = localStorage.getItem("calculadora"); //Obtener datos de localStorage
    personFromLS = JSON.parse(personJSONFromLS); // Covertir a objetome
    //calcula y agrega a la fila de la tabla

    var numero1 = document.getElementById("txtnume1").value;
    var numero2 = document.getElementById("txtnume2").value;
    var secuencia = document.getElementById("member_id").value;

    if (isNaN(numero1) || isNaN(numero2)) {
        alert(
            "debe ingresar la informacion en todos los campos y valores numericos"
        );
    } else {
        infoForm["id"] = i++;
        infoForm["numero1"] = numero1;
        infoForm["numero2"] = numero2;
        infoForm["resultado"] = numero1 - numero1 * (numero2 / 100);
        infoForm["secuencia"] = guid();
        console.log(infoForm["secuencia"]);
        ////////////////

        /////////////// insertar a la tabla
        var tabla = document.getElementById("tbPorcentaje");
        var nuevaFila = tabla.insertRow(tabla.lenght);
        nuevaFila.id = infoForm.secuencia;

        cell1 = nuevaFila.insertCell(0);
        cell1.innerText = nuevaFila.id;
        cell1.innerHTML = infoForm.id;

        cell2 = nuevaFila.insertCell(1);
        cell2.innerHTML = infoForm.numero1;

        cell3 = nuevaFila.insertCell(2);
        cell3.innerHTML = infoForm.numero2;

        cell4 = nuevaFila.insertCell(3);
        cell4.innerHTML = infoForm.resultado;

        cell5 = nuevaFila.insertCell(4);

        cell5.innerHTML =
            "<a  id=" +
            infoForm["secuencia"].toString() +
            ' class="btn btn-warning btn-sm " onClick="onEdit(this)">Edit</a><a id=' +
            infoForm["secuencia"] +
            ' class= "fila btn btn-danger btn-sm" onClick="onDelete(this)" >Delete</aid=>';
        //////////////
        /* if (personFromLS === null) {
                    var datos1=[]
                } */

        almacenarLs(infoForm.numero1, infoForm.numero2, infoForm.secuencia);
        //////////////////////

        ///limpia el formulario
        document.getElementById("miForm").reset();
        /*  divtabla.style.display=''; */
        ///muestra la yabla ya que por lo menos se tiene un registro
    }
} ///fin de procesar

///datos nos hace una variavle de tipo objeto
function datos(numero1, numero2, secuencia) {
    this.numero_1 = numero1;
    this.numero_2 = numero2;
    this.secuencia = secuencia;
}

//almacenar
function almacenarLs(numero1, numero2, id) {
    if (personFromLS === null) {
        alert("llego vacio");
        var nuevo = new datos(numero1, numero2, id);
        datos1.push(nuevo);
        var jsonPerson = JSON.stringify(datos1);
        localStorage.setItem("calculadora", jsonPerson);
    } else {
        var nuevo = new datos(numero1, numero2, id); // crea una variable temporal para añadir al localStorage

        //localStorage.setItem('testObject', JSON.stringify(nuevo));
        data = personFromLS.push(nuevo);
        localStorage.setItem("calculadora", JSON.stringify(data));
        //ar data = JSON.stringify(personFromLS);
        localStorage.setItem("calculadora", JSON.stringify(personFromLS));
    }
}

//////editar
function onEdit(td) {
    personJSONFromLS = localStorage.getItem("calculadora"); //Obtener datos de localStorage
    personFromLS = JSON.parse(personJSONFromLS); // Covertir a objetome

    ///cambio de botones
    botoneditar.disabled = false;
    botonenviar.disabled = true;
    selectedRow = td.parentElement.parentElement; //me trae la fila del tr
    id = selectedRow.id; //del selectedRow solo se usara el id del tr
    // Llemanos el formulario con los datos actuales de la vaca a editar
    var encontro = personFromLS.find(function (item) {
        //funcion busqueda, el dato a editar
        return item.secuencia == id;
    });
    //Coloca los datos en el formulario a la hora de editar
    numero1 = document.forms.miForm.txtnume1.value = encontro.numero_1;
    numero2 = document.forms.miForm.txtnume2.value = encontro.numero_2;
    member_id = document.forms.miForm.member_id.value = encontro.secuencia;
}

////////borrar localstorage

function BorrarLs(id) {
    personJSONFromLS = localStorage.getItem("calculadora"); //Obtener datos de localStorage
    personFromLS = JSON.parse(personJSONFromLS); // Covertir a objeto
    var newData = [];
    newData = personFromLS.filter(function (item, index) {
        //filtra menos el que se va a eliminar, de acuerdo al id
        return item.secuencia != id;
    });
    //console.log(newData);
    var data = JSON.stringify(newData); //se convierte a json
    localStorage.setItem("calculadora", data); //almacena a LocalStorage
}

/////// actualizar datos

function actualizarfila() {
    member = document.forms.miForm.member_id.value;
    console.log(member);
    var memberId = personFromLS.find(function (item) {
        return item.secuencia == member;
    });
    memberId.numero_1 = document.forms.miForm.txtnume1.value;
    memberId.numero_2 = document.forms.miForm.txtnume2.value;
    selectedRow.cells[1].innerHTML = memberId.numero_1;
    selectedRow.cells[2].innerHTML = memberId.numero_2;
    resultado = memberId.numero_1 - memberId.numero_1 * (memberId.numero_2 / 100);
    /* memberId.secuencia = document.forms.miForm.member_id.value; */
    if (memberId.numero_1 == "" || memberId.numero_2 == "") {
        alert("debe ingresar la informacion en todos los campos");
    }
    selectedRow.cells[3].innerHTML = resultado;
    console.log(memberId);

    var data = JSON.stringify(personFromLS);
    localStorage.setItem("calculadora", data);
    botoneditar.disabled = true;
    botonenviar.disabled = false;
    document.getElementById("miForm").reset();
}

//////////////

/////////eliminar
function onDelete(td) {
    if (confirm("Estas seguro? si lo borras perderas la informacion")) {
        row = td.parentElement.parentElement;
        document.getElementById("tbPorcentaje").deleteRow(row.rowIndex);
        console.log(row);

        var num = document.getElementById("tbPorcentaje").rows.length;

        if (num == 1) {
            /* divtabla.style.display='none'; */
        }
        console.log("Borar.:  " + row.id);
        id = row.id;
        BorrarLs(id);
    }
}
/////////////
//genera id aleatorio unico
function guid() {
    return parseInt(Date.now() + Math.random());
}
//verifica si el navegador es compatible con localStorage
function CheckBrowser() {
    if ("localStorage" in window && window["localStorage"] !== null) {
        // we can use localStorage object to store data
        return true;
    } else {
        return false;
    }
}

/////////////////////////////////////////////////////////
/////API////////////////////////////////////////////
function dolar() {
    let idRandom = document.getElementById("imgRandom");
    axios
        .get("https://dog.ceo/api/breeds/image/random")
        .then(function (response) {
            console.log(response);

            sc = response.data.message;
            idRandom.innerHTML =
                "<img src='" + response.data.message + "'class='img-fluid'>";
            alert(
                "Este este cachorro es uno de nuestros ejemplares de nuestra fundacion si quieres apoyar con una donacion porfavor entra aqui!: https://MiDog.com.co "
            );
        })

        .catch(function (error) {
            console.log(error);
        });
}
