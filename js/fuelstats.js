window.onload = function(){
    console.log("Fuelstats.js enabled");
    getModelYears();
}

/*
EPA Webcodes
Get model years available ->         https://www.fueleconomy.gov/ws/rest/vehicle/menu/year
Get makers for that year  ->         https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=2012
Get models for a make     ->         https://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=2012&make=Honda
Get a list of options for a model -> https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=2012&make=Honda&model=Fit
    -This also gets the vehicle ID
Get MPG from ID           ->         https://www.fueleconomy.gov/ws/rest/ympg/shared/ympgVehicle/26425
*/


  //////////////////////////////////////////////////////////////
 /////////////////  MODEL YEAR ///////////////////////////////
/////////////////////////////////////////////////////////////
function getModelYears(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            parseYears(this.responseText);
      }
    };
    xhttp.open("GET", "https://www.fueleconomy.gov/ws/rest/vehicle/menu/year", true);
    xhttp.send();
}

function parseYears(val){
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(val, "text/xml");
    var elements = xmlDoc.getElementsByTagName("value");
    
    var htmlString = "";
    for(var i = 0; i<elements.length; i++){
        
        htmlString += "<option value = \"" + elements[i].innerHTML + "\">"+ elements[i].innerHTML +"</option>";
        //console.log(elements[i]);
    }

    document.getElementById("selectYear").innerHTML = htmlString;
    document.getElementById("selectMake").disabled = false;
}


  //////////////////////////////////////////////////////////////
 /////////////////  Manufacturers  ///////////////////////////
/////////////////////////////////////////////////////////////

function getMakes(){

    var str = document.getElementById("selectYear").value;
    console.log("Getting makes for year " + str);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            parseMakes(this.responseText);
      }
    };
    xhttp.open("GET", "https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year="+str, true);
    xhttp.send();
}


function parseMakes(val){
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(val, "text/xml");
    var elements = xmlDoc.getElementsByTagName("value");
    
    var htmlString = "";
    for(var i = 0; i<elements.length; i++){
        
        htmlString += "<option value = \"" + elements[i].innerHTML + "\">"+ elements[i].innerHTML +"</option>";
        //console.log(elements[i]);
    }

    document.getElementById("selectMake").innerHTML = htmlString;
    document.getElementById("selectModel").disabled = false;
}

  //////////////////////////////////////////////////////////////
 /////////////////  MODELS      ///////////////////////////////
//////////////////////////////////////////////////////////////


function getModels(){
    var year = document.getElementById("selectYear").value;
    var make = document.getElementById("selectMake").value;
    var query = "year=" + year + "&make=" + make;
    console.log("Getting models for query " + query);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            parseModels(this.responseText);
      }
    };
    xhttp.open("GET", "https://www.fueleconomy.gov/ws/rest/vehicle/menu/model?"+query, true);
    xhttp.send();
}


function parseModels(val){
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(val, "text/xml");
        var elements = xmlDoc.getElementsByTagName("value");
        
        var htmlString = "";
        for(var i = 0; i<elements.length; i++){
            htmlString += "<option value = \"" + elements[i].innerHTML + "\">"+ elements[i].innerHTML +"</option>";
            //console.log(elements[i]);
        }
    
        document.getElementById("selectModel").innerHTML = htmlString;
        document.getElementById("selectOptions").disabled = false;  
}




  //////////////////////////////////////////////////////////////
 /////////////////  OPTIONS ///////////////////////////////////
//////////////////////////////////////////////////////////////



function getOptions(){
    var year = document.getElementById("selectYear").value;
    var make = document.getElementById("selectMake").value;
    var model = document.getElementById("selectModel").value;
    var query = "year=" + year + "&make=" + make + "&model=" + model;
    console.log("Getting options for query " + query);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            parseOptions(this.responseText);
      }
    };
    xhttp.open("GET", "https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?"+query, true);
    xhttp.send();
}


function parseOptions(val){
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(val, "text/xml");
    var elements = xmlDoc.getElementsByTagName("menuItem");
    
    var htmlString = "";
    for(var i = 0; i<elements.length; i++){
        htmlString += "<option value = \"" + elements[i].childNodes[1].innerHTML + "\">"+ elements[i].childNodes[0].innerHTML +"</option>";
        //console.log(elements[i]);
    }

    document.getElementById("selectOptions").innerHTML = htmlString;
}


  /////////////////////////////////////////////////////////////
 /////////////////  MPG     // ///////////////////////////////
/////////////////////////////////////////////////////////////

function getMPG(){
    var carID = document.getElementById("selectOptions").value;
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            parseMPG(this.responseText);
      }
    };
    xhttp.open("GET", "https://www.fueleconomy.gov/ws/rest/ympg/shared/ympgVehicle/"+carID, true);
    xhttp.send();
    
}


function parseMPG(val){
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(val, "text/xml");
    var elements = xmlDoc.getElementsByTagName("avgMpg");

    console.log("average MPG for this car: " + elements[0].innerHTML);
    document.getElementById("pResult").innerHTML = "You get " + elements[0].innerHTML + " mpg."
}



function calculateCarbonConsumption(){

}