
function pagar() {
  res = document.getElementById('idRes');
  IdUser = document.getElementById('idUser').value;
  IdNum = document.getElementById('idNum').value;
  IdPais = document.getElementById('idPais').value;
  IdDona = document.getElementById('IdDonar').value;

  axios.get('https://restcountries.eu/rest/v2/name/' + IdPais)
    .then(function (response) {
      console.log(response);
      console.log(response.data[0].capital);
      if(IdNum == ''){op = ''}else{op = "te enviamos un sms a +"+response.data[0].callingCodes+" "+IdNum+" para contarte que se hizo con tu donacion"}
      res.innerHTML = ".."+"Oye! "+IdUser+" Gracias por donar "+op+" de "+response.data[0].currencies[0].symbol+" "+IdDona+" "+response.data[0].currencies[0].name+"...";
    })
    .catch(function (error) {
      console.log(error);
    });
}







