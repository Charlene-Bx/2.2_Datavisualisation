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

let graphique1 = document.createElement("div");
graphique1.setAttribute('id', 'chart-area');
document.body.appendChild(graphique1);



let tutecalme= setInterval(function(){

    fetch(`https://canvasjs.com/services/data/datapoints.php?xstart=${Math.floor(Math.random()*10)}&ystart=${Math.floor(Math.random()*10)}&length=10&type=json`)                            
    .then(response=> response.json())                                                //Transformer la reponse de la [promise] en JSON
    .then(data=> displayData(data))                                                  //Recupere les données de la reponse et lui appliquer la fonction "displayData"                                                                     
    .catch(error=> console.log("Erreur : " + error));
    
}, 1000);
let datasSet=[];
function displayData(x){
    x.forEach(element => {
        data={};
        axeX=parseInt(element[0]);
        axeY=parseInt(element[1]);
        data.x=axeX;
        data.y=axeY;

        datasSet.push(data)
    });
    console.log(`dataSet: ${datasSet}`)
}

clearInterval(tutecalme);

// var dataPoints = [];
// $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=10&length=10&type=json", function(data) { 

//     $.each(data, function(key, value){
//         dataPoints.push({x: value[0], y: parseInt(value[1])});
//     });
//     chart = new CanvasJS.Chart("chartContainer",{
//         title:{
//             text:"Live Chart with dataPoints from External JSON"
//         },
//         data: [{
//         type: "line",
//         dataPoints : dataPoints,
//         }]
//     });
//     chart.render();
//     updateChart();
// });

//Graphique AREA 
var container = document.getElementById('chart-area');
var data = {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    series: [
        {
            name: 'Seoul',
            data: [20, 40, 25, 50, 15, 45, 33, 34, 20, 30, 22, 13]
        },
        {
            name: 'Sydney',
            data: [5, 30, 21, 18, 59, 50, 28, 33, 7, 20, 10, 30]
        },
        {
            name: 'Moskva',
            data: [30, 5, 18, 21, 33, 41, 29, 15, 30, 10, 33, 5]
        }
    ]
};
var options = {
    chart: {
        width: 1160,
        height: 540,
        title: '24-hr Average Temperature'
    },
    series: {
        zoomable: true,
        showDot: false,
        areaOpacity: 1
    },
    yAxis: {
        title: 'Temperature (Celsius)',
        pointOnColumn: true
    },
    xAxis: {
        title: 'Month'
    },
    tooltip: {
        suffix: '°C'
    }
};
var theme = {
    series: {
        colors: [
            '#83b14e', '#458a3f', '#295ba0', '#2a4175', '#289399',
            '#289399', '#617178', '#8a9a9a', '#516f7d', '#dddddd'
        ]
    }
};
// For apply theme
// tui.chart.registerTheme('myTheme', theme);
// options.theme = 'myTheme';
tui.chart.areaChart(container, data, options);


