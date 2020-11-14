// P A R C O U R I R   L E   D O M  - - - - - - - - - - - - - - - - - - - - - - - - - - - -

let content= document.querySelector("#mw-content-text");                        //Le conteneur parent
let tableOne= document.querySelectorAll("table")[0];                            //Le premier tableau

//C R E E R   L E   G  R A P H I Q U E - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let graphOne= document.createElement("canvas");                                 //Avec  la Librairy Chart
graphOne.id="myChart";
graphOne.width="400";
graphOne.height="400";

// A J O U T E R   L E   G R A P H I Q U E   D A N S   L E   D O M  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
content.appendChild(graphOne);

// I N S E R E R    L E   G R A P H I Q U E  A  U   D E S S U S   D U   T A B L E A U - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
content.insertBefore(graphOne, tableOne);

// R E C H E R C H E R  L E S   D O N N E E S   D A N S   L E S   T A B L E  A U X   D U   D O  M - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// * * * GRAPHIQUE UN
let trTableOne= Array.from(tableOne.querySelectorAll("tbody tr"));              //selectionner tous les <tr>(lignes) et les regrouper en tableau
let labelsOne= Array.from(trTableOne[0].children);                              //selectionner la premiere ligne (Données de l'axe X)
let labelsOneArray= [];                                                         //creer un tableau des données de la premiére lignes
// let test=Array.from(labelsOne.slice(2,labelsOne.length))
// test.forEach(function(date){
//     console.log(date.children)
// })

labelsOne.forEach(function(label){                                              //pour chaque element du tableau des données de l'axe X
    if(label.innerText.length>0){                                               //si l'element à plus de 0caractéres
        labelsOneArray.push(parseInt(label.innerText));                         //ajouter l'element (label) au tableau  
    }
})


let datasOne= Array.from(tableOne.querySelectorAll("tbody tr"));
datasOne.shift();

let dataSetTableOne= [];
let x=-1;
let tableColor=["#e8f8f5","#d1f2eb","#a3e4d7","#76d7c4","#48c9b0","#1abc9c","#17a589","#148f77","#117864","#0e6251","#eaf2f8","#d4e6f1","#a9cce3","#7fb3d5","#5499c7","#2980b9","#2471a3","#1f618d","#1a5276","#154360","#f5eef8","#ebdef0","#d7bde2","#c39bd3","#af7ac5","#9b59b6","#884ea0","#76448a","#633974","#512e5f","#f4d03f","#b7950b","#f39c12","#7e5109","#d35400"]
datasOne.forEach(function(rowTable){
    
    let object={};
    let datasArr=[];
    let caseTable= Array.from(rowTable.children);                               //creer un tableau pour toutes les données (tr)

    caseTable.shift();                                                          //retirer les numeros
    caseTable.shift();                                                          //retirer les pays

    caseTable.forEach(function(crimeNb){
         datasArr.push(parseInt(crimeNb.innerText));                             //ajouter le contenu des cases
    })
    object.data =datasArr;                                                       //initialiser les propriétées
    object.label= rowTable.children[1].innerText;
    x++;
    object.borderColor= tableColor[x];
    object.fill =false;
    dataSetTableOne.push(object);
})

// * * * GRAPHIQUE DEUX 
// let TitreTableTwo= Array.from(tableTwo.querySelectorAll("thead tr"));           //selectionner tous les <tr> d'en-tête, en faire un tableau
// let CaseTitreTableTwo= Array.from(TitreTableTwo[0].children);                   //selectionner les enfants (<th>) de la premieres ligne                  
// let dates= Array.from(CaseTitreTableTwo.slice(2,4));                            //faire un tableau d'une section des enfants de la premiere ligne

// let categories= [];                                                             //instancier un tableau vide pour recuperer les données

// dates.forEach(function(date){                                                   //pour chaque enfants <th> (case)
//     categories.push(date.innerText);                                            //ajouter la portion de texte au tableau "categories"
// })

// let DatasTableTwo= Array.from(tableTwo.querySelectorAll("tbody tr"));           //selectionner tous les <tr> (lignes) du tableau, en faire un tableau

// let series=[];                                                                  //instancier un tableau vide pour recuperer tous les objets

// DatasTableTwo.forEach(function(info){                                           //pour chaque <tr> (ligne) du tableau
//     let objet={};                                                               //instancier un objet vide
//     let donnees=[];                                                             //instancier un tableau vide

//     let lignes= Array.from(info.querySelectorAll("td"));                        //faire un tableau de tous les <td> (cases) du tableau
//     let pays= lignes[0];                                                        //selection unniquement la premiere <td> (case) de chaque <tr> (ligne) 
    
//     let dataset= lignes.slice(1,lignes.length);                                 //selectioner un  portion de chaque <tr> (ligne)

//     // lignes.shift();
//     // let ouAlors=lignes
//     // console.log('ouAlors:', ouAlors);

//     dataset.forEach(function(a){                                                //pour chacune de ses portions (2 <td>) 
//         donnees.push(parseInt(a.innerText))                                     //ajouter le texte contenu au tableau vide "donnees"
//     })

//     objet.name=pays.innerText;                                                  //instancier la proprieter "name" de notre objet
//     objet.data=donnees;                                                         //instancier la propriété "data" de notre objet
    
//     series.push(objet);                                                         //ajouter chacun de ces objets au tableau vide "series"
// });


//I N S T A N C I E R   L E S   D O N N E S   D E  S   G R A P H I Q U E S    C R E E S - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// * * * GRAPHIQUE UN
new Chart(graphOne, {
    type: 'line',
    data: {
      labels: labelsOneArray,
      datasets: dataSetTableOne
    },
    options: {
      title: {
        display: true,
        text: 'Offences recorded by the police, 2002-12'
      }
    }
  });

// * * * GRAPHIQUE DEUX 

// var data = {
//     categories: categories,
//     series: series,
// };
// var options = {
//     chart: {
//         width: 800,
//         height: 540,
//         title: 'Prison population'
//     },
//     yAxis: {
//         title: "Average",
//     },
//     xAxis: {
//         title: 'Periode',
//     },
//     series: {
//         showDot: false,
//     },
//     tooltip: {
//         suffix: 'prisonners'
//     },
// };
// var theme = {
//     series: {
//         colors: [
//             '#83b14e', '#458a3f', '#295ba0', '#2a4175', '#289399',
//             '#289399', '#617178', '#8a9a9a', '#516f7d', '#dddddd'
//         ]
//     }
// };

// var chart = tui.chart.lineChart(graphTwo, data, options);


  





// Si Javascript est desactivé, les graphiques n'apparaissent pas



