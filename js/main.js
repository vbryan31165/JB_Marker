showtask();
let addCompra = document.getElementById("addCompra");
let addComprabtn = document.getElementById("addComprabtn");

addComprabtn.addEventListener("click", function () {
    addCompraval = addCompra.value;
    if (addCompraval.trim() != 0) {
        let webtask = localStorage.getItem("Compra");
        if (webtask == null) {
            taskObj = [];
        } else {
            taskObj = JSON.parse(webtask);
        }
        taskObj.push({ producto: addCompraval, Estado: false });

        localStorage.setItem("Compra", JSON.stringify(taskObj));
        addCompra.value = "";
    }
    showtask();
});

// show tabla
function showtask() {
    let webtask = localStorage.getItem("Compra");
    if (webtask == null) {
        taskObj = [];
    } else {
        taskObj = JSON.parse(webtask);
    }
    let html = "";
    let addedtasklist = document.getElementById("addedtasklist");
    taskObj.forEach((item, index) => {
        if (item.Estado == true) {
            taskCompleteValue = `<td class="completed">${item.producto}</td>`;
        } else {
            taskCompleteValue = `<td>${item.producto}</td>`;
        }
        html += `<tr>
                    <th scope="row">${index + 1}</th>
                    ${taskCompleteValue}
                    <td><button type="button" onclick="edittask(${index})" class="btn btn-warning "><i class="bi bi-pencil-square"></i> Editar</button></td>
                    <td><button type="button" onclick="deleteitem(${index})" class=" btn btn-danger"><i class="bi bi-trash-fill"></i>Eliminar</button></td>
                </tr>`;
    });
    addedtasklist.innerHTML = html;
}

// edit compra
function edittask(index) {
    let saveindex = document.getElementById("saveindex");
    let addComprabtn = document.getElementById("addComprabtn");
    let savetaskbtn = document.getElementById("savetaskbtn");
    saveindex.value = index;
    let webtask = localStorage.getItem("Compra");
    let taskObj = JSON.parse(webtask);

    addCompra.value = taskObj[index]["producto"];
    addComprabtn.style.display = "none";
    savetaskbtn.style.display = "block";
}

// save compra
let savetaskbtn = document.getElementById("savetaskbtn");
savetaskbtn.addEventListener("click", function () {
    let addComprabtn = document.getElementById("addComprabtn");
    let webtask = localStorage.getItem("Compra");
    let taskObj = JSON.parse(webtask);
    let saveindex = document.getElementById("saveindex").value;

    for (keys in taskObj[saveindex]) {
        if (keys == "producto") {
            taskObj[saveindex].producto = addCompra.value;
        }
    }

    savetaskbtn.style.display = "none";
    addComprabtn.style.display = "block";
    localStorage.setItem("Compra", JSON.stringify(taskObj));
    addCompra.value = "";
    showtask();
});
// delete elemento ingresado
function deleteitem(index) {
    let webtask = localStorage.getItem("Compra");
    let taskObj = JSON.parse(webtask);
    taskObj.splice(index, 1);
    localStorage.setItem("Compra", JSON.stringify(taskObj));
    showtask();
}

// delete todos los productos
let deleteallbtn = document.getElementById("deleteallbtn");
deleteallbtn.addEventListener("click", function () {
    let savetaskbtn = document.getElementById("savetaskbtn");
    let addComprabtn = document.getElementById("addComprabtn");
    let webtask = localStorage.getItem("Compra");
    let taskObj = JSON.parse(webtask);
    if (webtask == null) {
        taskObj = [];
    } else {
        taskObj = JSON.parse(webtask);
        taskObj = [];
    }
    savetaskbtn.style.display = "none";
    addComprabtn.style.display = "block";
    localStorage.setItem("Compra", JSON.stringify(taskObj));
    showtask();
});

//funcion exportar tabla
function exportTableToExcel(tableID, filename = "") {
    var downloadLink;
    var dataType = "application/vnd.ms-excel";
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, "%20");

    // Especifica el nombre del archivo 
    filename = filename ? filename + ".xls" : "excel_data.xls";

    //Crea el link de descarga en el boton 
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(["ufeff", tableHTML], {
            type: dataType,
        });
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        // Create a link to the file
        downloadLink.href = "data:" + dataType + ", " + tableHTML;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }
}
