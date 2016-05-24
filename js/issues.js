$(document).ready(function() {

    var answer_array = sessionStorage.getItem('myArray');
    var colbert_results = sessionStorage.getItem('colbert_results');
    var santorum_results = sessionStorage.getItem('santorum_results');

    //Fixes issue with session storage storing an array as a strong
    colbert_results = colbert_results.split(',');
    santorum_results = santorum_results.split(',');


    //alert(answer_array);

    //Colbert overall percetage
    var overall_num1 = colbert_results[9];

    //Santorum overall percentage
    var overall_num2 = santorum_results[9];

    //Issue percentages
    // step's num 
    var poverty_num1 = colbert_results[0];
    var education_num1 = colbert_results[1];
    var abortion_num1 = colbert_results[2];
    var deathpenalty_num1 = colbert_results[3];
    var security_num1 = colbert_results[4];
    var healthcare_num1 = colbert_results[5];
    var climatechange_num1 = colbert_results[6];
    var immigration_num1 = colbert_results[7];
    var guncontrol_num1 = colbert_results[8];
    // rick's num 
    var poverty_num2 = santorum_results[0];
    var education_num2 = santorum_results[1];
    var abortion_num2 = santorum_results[2];
    var deathpenalty_num2 = santorum_results[3];
    var security_num2 = santorum_results[4];
    var healthcare_num2 = santorum_results[5];
    var climatechange_num2 = santorum_results[6];
    var immigration_num2 = santorum_results[7];
    var guncontrol_num2 = santorum_results[8];


    var step = " - Stephen Colbert";
    var rick = " - Rick Santorum";
    var i;
    // setting percentage 
    document.getElementById("0").innerHTML = (poverty_num1 > poverty_num2) ? poverty_num1 : poverty_num2 + "%";
    document.getElementById("1").innerHTML = (education_num1 > education_num2) ? education_num1 : education_num2 + "%";
    document.getElementById("2").innerHTML = (abortion_num1 > abortion_num2) ? abortion_num1 : abortion_num2 + "%";
    document.getElementById("3").innerHTML = (deathpenalty_num1 > deathpenalty_num2) ? deathpenalty_num1 : deathpenalty_num2 + "%";
    document.getElementById("4").innerHTML = (security_num1 > security_num2) ? security_num1 : security_num2 + "%";
    document.getElementById("5").innerHTML = (healthcare_num1 > healthcare_num2) ? healthcare_num1 : healthcare_num2 + "%";
    document.getElementById("6").innerHTML = (climatechange_num1 > climatechange_num2) ? climatechange_num1 : climatechange_num2 + "%";
    document.getElementById("7").innerHTML = (immigration_num1 > immigration_num2) ? immigration_num1 : immigration_num2 + "%";
    document.getElementById("8").innerHTML = (guncontrol_num1 > guncontrol_num2) ? guncontrol_num1 : guncontrol_num2 + "%";
    // setting name 
    document.getElementById("10").innerHTML += (poverty_num1 > poverty_num2) ? step : rick;
    document.getElementById("11").innerHTML += (education_num1 > education_num2) ? step : rick;
    document.getElementById("12").innerHTML += (abortion_num1 > abortion_num2) ? step : rick;
    document.getElementById("13").innerHTML += (deathpenalty_num1 > deathpenalty_num2) ? step : rick;
    document.getElementById("14").innerHTML += (security_num1 > security_num2) ? step : rick;
    document.getElementById("15").innerHTML += (healthcare_num1 > healthcare_num2) ? step : rick;
    document.getElementById("16").innerHTML += (climatechange_num1 > climatechange_num2) ? step : rick;
    document.getElementById("17").innerHTML += (immigration_num1 > immigration_num2) ? step : rick;
    document.getElementById("18").innerHTML += (guncontrol_num1 > guncontrol_num2) ? step : rick;

    for (i = 0 ; i < 9 ;i++){
        if(document.getElementById(i).innerHTML == "0%"){
                document.getElementById(i).innerHTML = "N/A"; 
    document.getElementById(i+10).innerHTML = "N/A"; 

    }
    }
});
