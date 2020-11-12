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



setInterval(function(){

    fetch(`https://canvasjs.com/services/data/datapoints.php?xstart=${Math.floor(Math.random()*10)}&ystart=${Math.floor(Math.random()*10)}&length=10&type=json`)                            
    .then(response => response.json()) 
    .then((data)=>console.log(`data: ${data}`))                                                                       
    .catch(error => console.log("Erreur : " + error));
    
}, 1000);
