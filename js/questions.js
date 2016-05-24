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

var param_array = [];

$(document).ready(function() {

    var poverty_param = getParameterByName('poverty');
    var education_param = getParameterByName('education');
    var abortion_param = getParameterByName('abortion');
    var death_param = getParameterByName('death');
    var security_param = getParameterByName('security');
    var health_param = getParameterByName('health');
    var climate_param = getParameterByName('climate');
    var immigration_param = getParameterByName('immigration');
    var guncontrol_param = getParameterByName('guncontrol');

    if (poverty_param == null) {
        $("#topic_poverty").next().next().remove();
        $("#topic_poverty").next().remove();
        $("#topic_poverty").remove();
    }
    if (education_param == null) {
        $("#topic_education").next().next().remove();
        $("#topic_education").next().remove();
        $("#topic_education").remove();
    }
    if (abortion_param == null) {
        $("#topic_abortion").next().next().remove();
        $("#topic_abortion").next().remove();
        $("#topic_abortion").remove();
    }
    if (death_param == null) {
        $("#topic_deathpenalty").next().next().remove();
        $("#topic_deathpenalty").next().remove();
        $("#topic_deathpenalty").remove();
    }
    if (security_param == null) {
        $("#topic_security").next().next().remove();
        $("#topic_security").next().remove();
        $("#topic_security").remove();
    }
    if (health_param == null) {
        $("#topic_healthcare").next().next().remove();
        $("#topic_healthcare").next().remove();
        $("#topic_healthcare").remove();
    }
    if (climate_param == null) {
        $("#topic_climatechange").next().next().remove();
        $("#topic_climatechange").next().remove();
        $("#topic_climatechange").remove();
    }
    if (immigration_param == null) {
        $("#topic_immigration").next().next().remove();
        $("#topic_immigration").next().remove();
        $("#topic_immigration").remove();
    }
    if (guncontrol_param == null) {
        $("#topic_guncontrol").next().next().remove();
        $("#topic_guncontrol").next().remove();
        $("#topic_guncontrol").remove();
    }

    $("#main-questions-container h2").next().hide();

    $("#main-questions-container h2").click(function() {
        $(this).find(".glyphicon").toggleClass('glyphicon-plus');
        $(this).find(".glyphicon").toggleClass('glyphicon-minus');
        $(this).next().toggle();
        // $( "li.item-ii" ).find( "li" ).css( "background-color", "red" );
        // $(this).next().find("p").css("display", "inline");
        // alert(ptext);
    });

    var questions = qlist["questions_list"];


    for (var i = 0; i < questions.length; i++) {
        // $("h2").after("<div><input id='ex19' type='text' data-provide='slider' data-slider-ticks='[1, 2, 3, 4, 5]'' data-slider-ticks-labels='['Least Importance', ' ', ' ', ' ', Most Importance]' data-slider-min='1' data-slider-max='5' data-slider-step='1' data-slider-value='5' data-slider-tooltip='hide' /></div>");
        //     }

        var slidercode = "<input class=" + "questions_slider" + " qid=" + questions[i]["qid"] + " id=\"ex19\" type=\"text\" data-provide=\"slider\" data-slider-ticks=\"[1, 2, 3, 4, 5]\" data-slider-min=\"1\" data-slider-max=\"5\" data-slider-step=\"1\" data-slider-value=\"1\" data-slider-tooltip=\"hide\"></input><br><br>";

        if (questions[i]["qtopic"] == "poverty") {
            $("#slider_poverty").append(slidercode);
            $("#questions_poverty").append(questions[i]["question"] + "<br><br>");
            $("#slider_poverty").after("<p></p><br>");
            // $("#slider_poverty").attr("qid", questions[i]["qid"]);

        }

        if (questions[i]["qtopic"] == "education") {
            $("#slider_education").append(slidercode);
            $("#questions_education").append(questions[i]["question"] + "<br><br>");
            $("#slider_education").after("<p></p><br>");
        }

        if (questions[i]["qtopic"] == "abortion") {
            $("#slider_abortion").append(slidercode);
            $("#questions_abortion").append(questions[i]["question"] + "<br><br>");
            $("#slider_abortion").after("<p></p><br>");
        }

        if (questions[i]["qtopic"] == "death penalty") {
            $("#slider_deathpenalty").append(slidercode);
            $("#questions_deathpenalty").append(questions[i]["question"] + "<br><br>");
            $("#slider_deathpenalty").after("<p></p><br>");
        }

        if (questions[i]["qtopic"] == "security") {
            $("#slider_security").append(slidercode);
            $("#questions_security").append(questions[i]["question"] + "<br><br>");
            $("#slider_security").after("<p></p><br>");
        }
        if (questions[i]["qtopic"] == "healthcare") {
            $("#slider_healthcare").append(slidercode);
            $("#questions_healthcare").append(questions[i]["question"] + "<br><br>");
            $("#slider_healthcare").after("<p></p><br>");
        }
        if (questions[i]["qtopic"] == "climate change") {
            $("#slider_climatechange").append(slidercode);
            $("#questions_climatechange").append(questions[i]["question"] + "<br><br>");
            $("#slider_climatechange").after("<p></p><br>");
        }

        if (questions[i]["qtopic"] == "immigration") {
            $("#slider_immigration").append(slidercode);
            $("#questions_immigration").append(questions[i]["question"] + "<br><br>");
            $("#slider_immigration").after("<p></p><br>");
        }
        if (questions[i]["qtopic"] == "gun control") {
            $("#slider_guncontrol").append(slidercode);
            $("#questions_guncontrol").append(questions[i]["question"] + "<br><br>");
            $("#slider_guncontrol").after("<p></p><br>");
        }

    }

    if (categories != null) {

        var i;
        for (i = 0; i <= 5; i++) {
            if (categories.indexOf(i) >= 0) {
                // document.getElementById(i).style.display = "inline";
            }
        }
    } else {
        var i;
        for (i = 0; i <= 5; i++) {
            // document.getElementById(i).style.display = "inline";
        }
    }

    for (var i = 0; i <= 36; i++) {
        param_array[i] = 0;
    }


    $("#next-button").click(function(e) {

        var nexturl = "results.html" + "?" + "answers=";

        // param_array[0] = $("input").size();
        //Set to 0 else site bugs out due to double digits
        param_array[0] = 0;

        $(".questions_slider").each(function(index, el) {

            param_array[$(this).attr("qid")] = $(this).attr("value");

        });




        sessionStorage.setItem('myArray', param_array);


        // if (categories != null) {

        //     var i;
        //     for (i = 0; i < 9; i++) {
        //         if (categories.indexOf(i) >= 0)
        //             nexturl += document.getElementById(i+10).name + "=" + document.getElementById(i+10).value;
        //     }
        // } else {
        //     var i;
        //     for (i = 0; i < 9; i++) {
        //            nexturl += document.getElementById(i+10).name + "=" +document.getElementById(i+10).value;
        //     }
        // }



        window.location.href = nexturl;

    });

});

