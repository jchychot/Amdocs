function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var categories = getParameterByName('categories');




$(document).ready(function() {

    // Candidate positions
    var colbert = [-1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 3];
    var santorum = [-1, 2, 3, 5, 4, 2, 3, 5, 4, 2, 3, 5, 4, 2, 3, 5, 4, 2, 3, 5, 4, 2, 3, 5, 4, 2, 3, 5, 4, 2, 3, 5, 4, 2, 3, 5, 1];

    var answer_array = sessionStorage.getItem('myArray');
    //alert(answer_array);

    //Colbert overall percentage
    var overall_num1 = 0;

    //Santorum overall percentage
    var overall_num2 = 0;


    //Issue percentages
    var poverty_num1 = 0;
    var education_num1 = 0;
    var abortion_num1 = 0;
    var deathpenalty_num1 = 0;
    var security_num1 = 0;
    var healthcare_num1 = 0;
    var climatechange_num1 = 0;
    var immigration_num1 = 0;
    var guncontrol_num1 = 0;

    var poverty_num2 = 0;
    var education_num2 = 0;
    var abortion_num2 = 0;
    var deathpenalty_num2 = 0;
    var security_num2 = 0;
    var healthcare_num2 = 0;
    var climatechange_num2 = 0;
    var immigration_num2 = 0;
    var guncontrol_num2 = 0;

    // if (overall_num1 == overall_num2) {
    //     $("#colbert").hide();
    //     $("#colbert").show();
    // }

    var colbert_results = [];
    var santorum_results = [];

    var issue_match_percent_colbert = 0;
    var issue_match_percent_santorum = 0;
    
    //Start Calc %

    for (var i = 2; i <= 72; i += 2) {
        if (answer_array[i] != null && answer_array[i] >= 1 && answer_array[i] <= 5) {
            var question_match_percent_colbert = (1 - (Math.abs(colbert[i / 2] - answer_array[i]) / ((answer_array[i] + colbert[i / 2]) / 2))) * 100;
            var question_match_percent_santorum = (1 - (Math.abs(santorum[i / 2] - answer_array[i]) / ((answer_array[i] + santorum[i / 2]) / 2))) * 100;
            // alert(question_match_percent_colbert);
            issue_match_percent_colbert += question_match_percent_colbert;
            issue_match_percent_santorum += question_match_percent_santorum;

            if (i == 8) {
                // alert(issue_match_percent_colbert);
                poverty_num1 = Math.round(issue_match_percent_colbert / 4);
                // alert(poverty_num1);
                poverty_num2 = Math.round(issue_match_percent_santorum / 4);
            }
            if (i == 16) {
                education_num1 = Math.round(issue_match_percent_colbert / 4);
                education_num2 = Math.round(issue_match_percent_santorum / 4);
            }
            if (i == 24) {
                abortion_num1 = Math.round(issue_match_percent_colbert / 4);
                abortion_num2 = Math.round(issue_match_percent_santorum / 4);
            }
            if (i == 32) {
                deathpenalty_num1 = Math.round(issue_match_percent_colbert / 4);
                deathpenalty_num2 = Math.round(issue_match_percent_santorum / 4);
            }
            if (i == 40) {
                security_num1 = Math.round(issue_match_percent_colbert / 4);
                security_num2 = Math.round(issue_match_percent_santorum / 4);
            }
            if (i == 48) {
                healthcare_num1 = Math.round(issue_match_percent_colbert / 4);
                healthcare_num2 = Math.round(issue_match_percent_santorum / 4);
            }
            if (i == 56) {
                climatechange_num1 = Math.round(issue_match_percent_colbert / 4);
                climatechange_num2 = Math.round(issue_match_percent_santorum / 4);
            }
            if (i == 64) {
                immigration_num1 = Math.round(issue_match_percent_colbert / 4);
                immigration_num2 = Math.round(issue_match_percent_santorum / 4);
            }
            if (i == 72) {
                guncontrol_num1 = Math.round(issue_match_percent_colbert / 4);
                guncontrol_num2 = Math.round(issue_match_percent_santorum / 4);
            }
        }
        if (i % 8 == 0) {
            issue_match_percent_colbert = 0;
            issue_match_percent_santorum = 0;
        }

    }


    // overall_num1 = Math.round((poverty_num1 + education_num1 + abortion_num1 + deathpenalty_num1 + security_num1 + healthcare_num1 + climatechange_num1 + immigration_num1 + guncontrol_num1) / 9);
    // overall_num2 = Math.round((poverty_num2 + education_num2 + abortion_num2 + deathpenalty_num2 + security_num2 + healthcare_num2 + climatechange_num2 + immigration_num2 + guncontrol_num2) / 9);

    colbert_results.push(poverty_num1);
    colbert_results.push(education_num1);
    colbert_results.push(abortion_num1);
    colbert_results.push(deathpenalty_num1);
    colbert_results.push(security_num1);
    colbert_results.push(healthcare_num1);
    colbert_results.push(climatechange_num1);
    colbert_results.push(immigration_num1);
    colbert_results.push(guncontrol_num1);

    santorum_results.push(poverty_num2);
    santorum_results.push(education_num2);
    santorum_results.push(abortion_num2);
    santorum_results.push(deathpenalty_num2);
    santorum_results.push(security_num2);
    santorum_results.push(healthcare_num2);
    santorum_results.push(climatechange_num2);
    santorum_results.push(immigration_num2);
    santorum_results.push(guncontrol_num2);

    var num_issues = 0;

    for (var i = 0; i < colbert_results.length; i++) {
        if (colbert_results[i] != 0) {
            overall_num1 += colbert_results[i];
            overall_num2 += santorum_results[i];
            num_issues++;
        }
    }

    overall_num1 = Math.round(overall_num1/num_issues);
    overall_num2 = Math.round(overall_num2/num_issues);
    
    colbert_results.push(overall_num1)
    santorum_results.push(overall_num2)

    //answer_array = sessionStorage.getItem('myArray');
    sessionStorage.setItem('colbert_results', colbert_results);
    sessionStorage.setItem('santorum_results', santorum_results);

    //End calc %


    var oliver = 0;
    var jfk = 0;
     if (overall_num1 < overall_num2) {
         $("#colbert_wins").hide();
         $("#santorum_loses").hide();
         oliver = overall_num1 + 5;
         jfk = overall_num2 - 10;
    }

    if (overall_num1 >  overall_num2) {
        $("#santorum_wins").hide();
        $("#colbert_loses").hide();
        oliver = overall_num1 - 10;
        jfk = overall_num2 + 5;
   }

   document.getElementById('colbert_percentage').innerHTML=overall_num1 + "%";
   document.getElementById('colbert_percentage2').innerHTML=overall_num1 + "%";
   document.getElementById('santorum_percentage').innerHTML=overall_num2 + "%";
   document.getElementById('santorum_percentage2').innerHTML=overall_num2 + "%";
   document.getElementById('oliver_percentage').innerHTML=oliver + "%";
   document.getElementById('oliver_percentage2').innerHTML=oliver + "%";
   document.getElementById('jfk_percentage').innerHTML=jfk + "%";
   document.getElementById('jfk_percentage2').innerHTML=jfk + "%";




});
