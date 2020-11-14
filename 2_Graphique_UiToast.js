//Creer la <div> qui acceuillera le graphique
let div= document.createElement('div');
div.id='chart-area';    // OU ALORS > div.setAttribute('id','chart-area');

//Trouver l'élément enfant au dessus duquel on placera le graphique
let tableTwo= document.querySelectorAll("table")[1];

//Placer cette <div> dans le DOM
content.appendChild(div);

//Placer le graphique au dessus du tableau
content.insertBefore(div,tableTwo);

//Rechercher les données dans le tableaux html
let premiereLigneTable= Array.from(tableTwo.querySelectorAll("thead th"));
let dates= premiereLigneTable.slice(2,4);
let titles= [];

dates.forEach(function(a){
    titles.push(a.textContent)
});




let datasTable= Array.from(tableTwo.querySelectorAll("tbody tr"));
let data1= []
let data2= []
let pays = []
datasTable.forEach(function(lignes){
    
    let x = lignes.querySelector("td").innerText;
    let y = Array.from(lignes.querySelectorAll("td"));
    
    
    pays.push(x)
    data1.push(parseInt(y[1].innerText))
    data2.push(parseInt(y[2].innerText))
    
    
    
})
console.log('data1:', data1)




// GRAPHIQUE
var data = {
    categories: pays,
    series: [
        {
            name: titles[0],
            data: data1
        },
        {
            name: titles [1],
            data: data2
        }
    ]
};
var options = {
    chart: {
        width: 800,
        height: 650,
        title: 'Average of Prisonniers',
        format: '1,000'
    },
    yAxis: {
        title: 'pays'
    },
    xAxis: {
        title: 'prisonniers',
        min: 0,
        max: 350,
        suffix: ''
    },
     series: {
         showLabel: false
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

tui.chart.barChart(div, data, options);


