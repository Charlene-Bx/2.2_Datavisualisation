//Creer la <div> qui acceuillera le graphique
let div= document.createElement('div');
div.id='chart-area';    // OU ALORS > div.setAttribute('id','chart-area');

//Placer cette <div> dans le DOM
document.body.appendChild(div);

//Trouver l'élément enfant au dessus duquel on placera le graphique
let table= document.querySelector('table');

//Placer le graphique au dessus du tableau
document.body.insertBefore(div,table);

//Rechercher les données dans le tableaux html
let premiereLigneTable= Array.from(table.querySelectorAll("thead th"));
let dates= premiereLigneTable.slice(2,4);
let titles= [];

dates.forEach(function(a){
    titles.push(a.textContent)
});

let dataset1= [];


let datasTable= Array.from(table.querySelectorAll("tbody tr"));


datasTable.forEach(function(lignes){
    let objet= {};
    
    
    let cases= lignes.querySelectorAll("td");
    objet.name= cases[0].textContent;
    objet.data= cases[1].textContent;

    dataset1.push(objet);

})

// GRAPHIQUE

var data = {
    categories: ['Browser'],
    series: dataset1,
};
var options = {
    chart: {
        width: 1000,
        height: 1000,
        title: titles[0],
        format: function(value, chartType, areaType, valuetype, legendName) {
            if (areaType === 'makingSeriesLabel') { // formatting at series area
                value = value + '%';
            }

            return value;
        }
    },
    series: {
        radiusRange: ['40%', '100%'],
        showLabel: true
    },
    tooltip: {
        suffix: ''
    },
    legend: {
        align: 'bottom'
    }
};
var theme = {
    series: {

        label: {
            color: '#fff',
            fontFamily: 'sans-serif'
        }
    }
};

// For apply theme

tui.chart.registerTheme('myTheme', theme);
options.theme = 'myTheme';

tui.chart.pieChart(div, data, options);
