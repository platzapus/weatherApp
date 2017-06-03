var currentTF, currentTC;
var tempType = "F";
var hiC = new Array();
var loC = new Array();
var hiF = new Array();
var loF = new Array();

$(document).ready(function() {
  var city, region, country, iconUrl, fIconUrl = null;
  var condition, castDay, castDate, castDateNum, castCond, hiT, loT,  rainPercent;
  apiKey = "5a016a401841cf64";
  var backPic = [["cloudy","http://www.publicdomainpictures.net/pictures/80000/velka/above-the-clouds-1395609876Ldx.jpg"],["sunny","http://www.publicdomainpictures.net/pictures/110000/velka/blue-sky-1413574853HUg.jpg"],["rainy","http://www.publicdomainpictures.net/pictures/70000/velka/background-with-rain.jpg"],["snowy","http://www.publicdomainpictures.net/pictures/10000/velka/snow-covered-mountains-11288014279zESc.jpg"]];
  
});

 $.get("https://cors-anywhere.herokuapp.com/http://freegeoip.net/json/", function(data) {
   city = data.city;
   region = data.region_code;
   zCode = data.zip_code;
   console.log(region);
   $('#city').text(city);
   $('#region').text(region);
   //console.log(zCode);
   
   $.get("https://api.wunderground.com/api/" + apiKey + "/conditions/q/" + zCode + ".json", function(data) {
     iconUrl = data.current_observation.icon_url;
     condition = data.current_observation.weather;
     currentTF = data.current_observation.temp_f;
     currentTC = data.current_observation.temp_c;
     $('#tempNum').text(currentTF+' '+tempType);
     $('#weatherIcon').html("<img id='mainIcon' src=" + iconUrl + ">");
     $('#weatherStatus').text(condition);
     //console.log(condition);
     
      $.get("https://api.wunderground.com/api/" + apiKey + "/forecast/q/" + region + "/" + city + ".json", function(cast) {
        currentDay = cast.forecast.simpleforecast.forecastday[0].date.weekday;
        currentMonth = cast.forecast.simpleforecast.forecastday[0].date.monthname;
        currentDate = cast.forecast.simpleforecast.forecastday[0].date.day;
        $('#dateBox').text(currentDay+', '+currentMonth+' '+currentDate);
        for(i=1;i<4;i++){
          castDay = cast.forecast.simpleforecast.forecastday[i].date.weekday;
          castDate = cast.forecast.simpleforecast.forecastday[i].date.monthname;
          castDateNum = cast.forecast.simpleforecast.forecastday[i].date.day;
          hiT = cast.forecast.simpleforecast.forecastday[i].high.fahrenheit;
          loT = cast.forecast.simpleforecast.forecastday[i].low.fahrenheit;
          fIconUrl = cast.forecast.simpleforecast.forecastday[i].icon_url;
          castCond = cast.forecast.simpleforecast.forecastday[i].conditions;
          rainPercent = cast.forecast.simpleforecast.forecastday[i].pop;
          hiF[i] = hiT;
          loF[i] = loT;
          hiC[i] = Math.round((hiT - 32) * (5/9));
          loC[i] = Math.round((loT - 32) * (5/9));
          
          $('#weekDay'+i).text(castDay);
          $('#date'+i).text(castDate + ' ' + castDateNum);
          $('#temps'+i).html('Hi: ' +hiT +" &degF | Lo: "+ loT+"  &degF");
          $('#fcastIcon'+i).html('<img class="forecastIcon" src=' + fIconUrl + '>');
          $('#fcastCond'+i).text(castCond);
          $('#precipPer'+i).text('Precipitation:'+' '+rainPercent+'%');
       
     }});
   });
 });

$('#tempNum').click(function(){
    $('input[type="radio"]').not(':checked').prop("checked", true);
    typeSwap();
  
});

$('input[type=radio][name=fOrC]').on('change', function(){
  typeSwap();
  });


 function typeSwap(){
   
  if(tempType=="F"){
    tempType="C";
     document.getElementById("tempNum").innerHTML = currentTC + " &degC";
    /*document.getElementById('temps1').innerHTML = "Hi: "+hiC[1]+" | Lo: "+loC[1];*/
    for(i=1;i<4;i++){
        document.getElementById("temps"+i).innerHTML = "Hi: "+hiC[i]+" &degC | Lo: "+loC[i]+" &degC";
        };
  }
  else{
    tempType="F";
    document.getElementById("tempNum").innerHTML = currentTF + " &degF";
    for(i=1;i<4;i++){
      document.getElementById("temps"+i).innerHTML = "Hi: "+hiF[i]+" &degF | Lo: "+loF[i]+" &degF";
    }
  }
  
  
};