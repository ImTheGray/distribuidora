$("#divfrmGestionTienda").dialog({
    autoOpen: true,  // Es el valor por defecto
    close: function () {
        $("#frmGestionTienda")[0].reset();
    },
    hide: "fold",
    show: "fold",
    height:"auto",
    width:"auto",
    modal: "yes",
    resizable:false,
    buttons: [{
        text: "Añadir",
        click: procesoAltaTienda
    },/*{
        text: "Modificar",
        click: procesoModPaciente
    },*/{
        text: "Cancelar",
        click: function() {
                 $(this).dialog("close");
             }
    }]
});


function procesoAltaTienda(){

	if (validarAltaTienda()){

		llamadaAjaxAltaTienda();
	}

}

// Validacion
function validarAltaTienda(){

	var sError="";
	var bValido = true;

  var expreTitulo = /^[a-zA-z\s\ñ\Ñ]{3,50}$/
  if(expreTitulo.test(frmGestionTienda.txtNombre.value) == false){
    bValido = false;
    alert(frmGestionTienda.txtNombre.value);
    sError+= "Campo Nombre requiere de 5 letras mínimo y tiene un máximo de 50. ";
  }

  var expreTitulo = /^[a-zA-z\s\ñ\Ñ]{3,50}$/
  if(expreTitulo.test(frmGestionTienda.txtPais.value) == false){
    bValido = false;
    sError+= "Campo pais requiere de un precio mínimo de 1. ";
  }

  var expreTitulo = /^[a-zA-z\s\ñ\Ñ]{3,50}$/
  if(expreTitulo.test(frmGestionTienda.txtProvincia.value) == false){
    bValido = false;
    sError+= "Campo Provincia requiere de un precio mínimo de 1. ";
  }

  var expreTitulo = /^[a-zA-z\s\ñ\Ñ]{3,50}$/
  if(expreTitulo.test(frmGestionTienda.txtDireccion.value) == false){
    bValido = false;
    sError+= "Campo direccion requiere de un precio mínimo de 1. ";
  }

	if(bValido == false){
		alert(sError); // A sustituir por el uso de un dialogo de mensajes
	}

	return bValido;
}

// Llamada ajax y tratamiento respuesta
function llamadaAjaxAltaTienda(){

	//Creo un objeto literal Tienda
	var oTienda = {
           Nombre     : frmGestionTienda.txtNombre.value,
           Pais       : frmGestionTienda.txtPais.value,
           Provincia  : frmGestionTienda.txtProvincia.value ,
				   Direccion  : frmGestionTienda.txtDireccion.value
				 };

	// Formateo de parametro POST
	var sParametroPOST = "datos=" + JSON.stringify(oTienda);

	// Codifico para envio
	sParametroPOST = encodeURI(sParametroPOST);

	// Script de envio
	var sURL = encodeURI("php/altaTienda.php");

	AjaxTienda(sURL,sParametroPOST);
}


/* LLAMADAS AJAX */
function AjaxTienda(sURL,sParametroPOST){

	oAjaxAltaTienda = objetoXHR();

	oAjaxAltaTienda.open("POST",sURL,true);

	// Para peticiones con metodo POST
    oAjaxAltaTienda.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	oAjaxAltaTienda.onreadystatechange = respuestaAltaTienda;
//	oAjaxAltaProp.addEventListener("readystatechange",respuestaAltaProp,false);

	oAjaxAltaTienda.send(sParametroPOST);
}

function respuestaAltaTienda(){

	if(oAjaxAltaTienda.readyState == 4 && oAjaxAltaTienda.status ==200)	{
		var oArrayRespuesta = JSON.parse(oAjaxAltaTienda.responseText);

		if (oArrayRespuesta[0] == true){
			alert(oArrayRespuesta[1]);

		}
    else {
			alert(oArrayRespuesta[1]);
			$("#divfrmGestionTienda").dialog("close");

		}
	}
}

function objetoXHR() {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            var versionesIE = new Array('Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'Msxml2.XMLHTTP.3.0', 'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP');
            for (var i = 0; i < versionesIE.length; i++) {
                try {
                    return new ActiveXObject(versionesIE[i]);
                } catch (errorControlado) {} //Capturamos el error,
            }
        }
        throw new Error("No se pudo crear el objeto XMLHttpRequest");
}
