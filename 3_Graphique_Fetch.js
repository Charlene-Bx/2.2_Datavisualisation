// AJAX est une technique pour accéder aux serveurs Web à partir d'une page Web.

var objetAjax = new XMLHttpRequest();                                                 //Créer un nouvel objet AJAX "XMLHttpRequest"
objetAjax.open("GET", "https://canvasjs.com/services/data/datapoints.php");           //Ouvrir la connexion, pour "getter" sur l'url
objetAjax.send();                                                                     //Envoyer la requête ("getter" sur l'url)
objetAjax.onreadystatechange = function(){                                            //Recuperer le résultat de la requête
    if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {                //Si readyState(etat de la requete)=="done" et que le statut est "ok"
        var response = JSON.parse(this.responseText);
        console.log(`avec AJAX: ${response}`);
    }
};

// FETCH , comme AJAX, mais plus récente et plus puissante. 

fetch("https://canvasjs.com/services/data/datapoints.php")                            //Créer une methode fetch() qui renverra un objet [promise]
.then(response => response.json())                                                    //[.then] execute un code quand la [promise] est resolue: on obtient une [response]
.then(response => console.log(`avec FETCH: ${response}`))                             //Traduire la reponse au format JSON, et l'envoyer dans la console
.catch(error => console.log("Erreur : " + error));                                    //[.catch] execute du code en cas d'erreur (code 404, ou 500)



//////////////////////////////////////////////// * * * * * * * * * E X O * * * * * * * * ////////////////////////////////////////////////


let graphique1 = document.createElement("canvas");                                       //Créer la div qui acceuillera le graphique
graphique1.id="line-chart";
content.appendChild(graphique1);
content.insertBefore(graphique1, tableOne)

setInterval(function(){

    fetch(`https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=${Math.floor(Math.random()*10)}&length=10&type=json`)                            
    .then(response=> response.json())                                                //Transformer la reponse de la [promise] en JSON
    .then(data=> displayData(data))                                                  //Recupere les données de la reponse et lui appliquer la fonction "displayData"                                                                     
    .catch(error=> console.log("Erreur : " + error));
    
}, 1000);


function displayData(x){
    let dataY = [];
    let dataX = [];
    x.forEach(element => {
        dataY.push(element[1]);
        dataX.push(element[0]);
    });
    new Chart(graphique1, {
        type: 'line',
        data: {
          labels: dataX,
          datasets: [{ 
              data: dataY,
              borderColor: "#3e95cd",
              fill: false
            }
          ]
        },
      });
};
