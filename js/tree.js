let prompts = [];
let options = [];
let trees = [];
let questionNumber = 0;
let netCarbonEmissions = 0.0; //lbs


window.onload = function(){
    console.log("Window Loaded");
    
    var fadeInHeading = "<br><h1 class = \"w3-animate-opacity\">";

    prompts = [
        fadeInHeading+"<b>This is a question about carbon consumption</b></h1><br>This first tree cleans the CO2 that you exhale in a year.  One mature tree can support two humans",
        fadeInHeading+"This is another question",
        fadeInHeading+"Do you have a car?",
        fadeInHeading+"Do you know your car's average gas mileage?",
        fadeInHeading+"Then Let's Find Out"
    ];

    options = [
        standardButton("Less Trees", 20, 1) + '&nbsp;' + standardButton("More Trees", 1000, 1),
        "<form class=\"w3-container w3-card-4 w3-animate-opacity\"><p><input class=\"w3-check\" type=\"checkbox\" checked=\"checked\"><label> I like trees</label></p><p><input class=\"w3-check\" type=\"checkbox\"><label> I'm unopinionated on trees</label></p><p><input class=\"w3-check\" type=\"checkbox\" disabled><label>I hate trees (Disabled)</label></p></form><br><button onclick = \"nextQuestion(200)\">Submit</button>",
        "<button class = \"w3-animate-opacity\" onclick=\"nextQuestion(5000)\">Yes</button>&nbsp;<button class = \"w3-animate-opacity\" onclick=\"nextQuestion()\">No</button>",
        "<button class = \"w3-animate-opacity\" onclick=\"nextQuestion()\">Yes</button>&nbsp;<button class = \"w3-animate-opacity\" onclick=\"nextQuestionShowEPA()\">No</button>",
        "<button class = \"w3-animate-opacity\" onclick=\"nextQuestion()\">Move On</button>"
    ];

    go();
}

function buttonClassString(){
    return '<button class = "w3-animate-opacity, w3-button w3-green w3-round-large"';
}

<<<<<<< Updated upstream
function standardButton(content, lbCO2add, nextQuestionID){
    return '<button class = "w3-animate-opacity w3-round-large colored" onclick="nextQuestion('+ lbCO2add +')">' + content + '</button>';
=======
function standardButton(content, lbCO2add, nextQuestionID, classlist){
    return '<button class = "w3-animate-opacity, w3-button w3-green w3-round-large" onclick="nextQuestion('+ lbCO2add +')">' + content + '</button>';
>>>>>>> Stashed changes
}

//w3-button w3-green w3-round-large

function go(){
    
    addFirstTree();
    nextQuestion(0.0);
    
}



function nextQuestion(carbonEmissionAdd){
    netCarbonEmissions += carbonEmissionAdd;
    console.log("Running carbon emissions total for quiz at: " + netCarbonEmissions + "lbs CO2");

    //Where the divisor represents how many lbs CO2 = one tree
    addTrees(carbonEmissionAdd/48);

    var divOptions = document.getElementById("divOptions");
    var divPrompts = document.getElementById("divPrompts");
    
    divPrompts.innerHTML = prompts[questionNumber];
    divOptions.innerHTML = options[questionNumber];
    
    questionNumber++;
}

//Where x is the number of trees to add to the frame
function addTrees(x){
    var renderTrees = document.getElementById("divRenderTrees");

    for(i = 0; i<x*2; i++){
    
    var t = document.createElement("img");
    t.setAttribute("src", "/assets/tree.png");
    t.setAttribute = ('class', 'absolute');
    t.classList.add("absolute");
    t.classList.add("fade-in");
    

    var right = window.innerWidth * Math.random()-50;
    var top = window.innerHeight * Math.random()-100;


    t.style.right = right+"px";
    t.style.top = top+"px";


    trees.push(t);
    renderTrees.appendChild(t);
    document.body.appendChild(t);

    }
}

function addFirstTree(){
    var renderTrees = document.getElementById("divRenderTrees");
    
    var t = document.createElement("img");
    t.setAttribute("src", "/assets/tree.png");
    t.setAttribute = ('class', 'absolute');
    t.classList.add("absolute");
    t.classList.add("fade-in");
    

    var right = window.innerWidth/2;
    var top = window.innerHeight/2;


    t.style.right = right+"px";
    t.style.top = top+"px";

    trees.push(t);
    renderTrees.appendChild(t);
    document.body.appendChild(t);
}


function nextQuestionShowEPA(){
    var divOptions = document.getElementById("divOptions");
    var divPrompts = document.getElementById("divPrompts");
    
    divPrompts.innerHTML = prompts[questionNumber];
    divOptions.innerHTML = options[questionNumber];

    document.getElementById("divMPG").hidden = false;
    
    questionNumber++;
}