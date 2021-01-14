let introPrompts = [];
let electricalPrompts = [];


let introOptions = [];
let electricalOptions = [];

let trees = [];
let netCarbonEmissions = 0.0; //lbs

let gasCost = 0.0;

let quizSections = [
    "intro",
    "electrical",
    "naturalgas",
]


window.onload = function(){
    console.log("Window Loaded");
    
    var fadeInHeading = "<br><h1 class = \"w3-animate-opacity\">";

    introPrompts = [
        fadeInHeading+"<b>This first tree cleans the CO<sub>2</sub> you exhale in a year.</b></h1><br><center>One mature tree can support two humans.</center>",
        fadeInHeading+"How do you describe yourself?",
    ];

    electricalPrompts = [
        fadeInHeading+"Do you know your monthly electricity bill?",
        fadeInHeading+"What is it?",
        fadeInHeading+"That's okay. We'll use the national average.",
    ];


    introOptions = [
        standardButton("Get Started", 0, 1),                                                                                                        //Intro

        verticalListButton("Independent", 0, 2) + verticalListButton("In College", 0, 2) + verticalListButton("Living With My Parents", 10000, 2),  //How do you describe yourself                                                                                           //National Average Electrical Bill
    ];

    electricalOptions = [
        standardButton("Yes", 0, 3)         + standardButton("No", 0, 4),                                                                           //Do you know electrical bill
        standardButton("Continue", 0, 5)    + standardMoneyInput(),                                                                                 //Submit Electrical Bill
        standardButton("Continue", 100, 5)               
    ]

    go();
}

function buttonClassString(){
    return '<button class = "w3-animate-opacity, w3-button w3-green w3-round-large"';
}

function standardButton(content, lbCO2add, nextQuestionID){
    console.log("Returning a standard button");
    return '<button class = "w3-animate-opacity w3-round-large colored" onclick="nextQuestion('+ lbCO2add +','+nextQuestionID+')">' + content + '</button>';
}

function verticalListButton(content, lbCO2add, nextQuestionID){
    console.log("Returning a standard button");
    return '<button class = "w3-animate-opacity verticalList" onclick="nextQuestion('+ lbCO2add +','+nextQuestionID+')">' + content + '</button><br>';
}


function standardMoneyInput(){
    return '<input type = "NUMBER" class = "fade-in-fast" placeholder = "0.00"><span class = "dollar-sign">$</span>';
}


//w3-button w3-green w3-round-large

function go(){
    
    addFirstTree();
    nextQuestion(0.0, 0);
    
}



function nextQuestion(carbonEmissionAdd, questionNumber){
    netCarbonEmissions += carbonEmissionAdd;
    console.log("Running carbon emissions total for quiz at: " + netCarbonEmissions + "lbs CO2");

    //Where the divisor represents how many lbs CO2 = one tree
    addTrees(carbonEmissionAdd/48);

    var divOptions = document.getElementById("divOptions");
    var divPrompts = document.getElementById("divPrompts");
    
    divPrompts.innerHTML = introPrompts[questionNumber];
    divOptions.innerHTML = introOptions[questionNumber];

}

//Where x is the number of trees to add to the frame
function addTrees(x){
    var renderTrees = document.getElementById("divRenderTrees");

    for(i = 0; i<10*x; i++){
    
    setTimeout(function(){ makeTree(renderTrees); }, Math.random()*10000);

    }
}

function makeTree(renderTrees){
    var t = document.createElement("img");
    t.setAttribute("src", "assets/tree.png");
    t.setAttribute = ('class', 'absolute');
    t.classList.add("absolute");
    //t.classList.add("loadFromBottom");
    //t.classList.add("fade-in");
    
    

    var right = window.innerWidth * Math.random()-50;
    var top = window.innerHeight-450 * Math.random()-100;   //looked good at -100
    if(top>550){ //reroll the closest ones to average further away.
        top = window.innerHeight-450 * Math.random()-100;
    }

    t.style.right = right+"px";
    t.style.top = top+"px";

    var percentHeightFromBottom = .15 + top / window.innerHeight;
    
    var toprounded = Math.round(top);
    var please = String(toprounded);
    t.style.zIndex = please;
    
    var scalemod = Math.pow(percentHeightFromBottom,2);

    t.style.transform = 'scale('+scalemod+')';


    trees.push(t);
    renderTrees.appendChild(t);
    document.body.appendChild(t);
}






function addFirstTree(){
    var renderTrees = document.getElementById("divRenderTrees");
    
    var t = document.createElement("img");
    t.setAttribute("src", "assets/tree.png");
    t.setAttribute = ('class', 'absolute');
    t.classList.add("absolute");
    t.classList.add("fade-in");
    

    var right = window.innerWidth/2;
    var top = window.innerHeight/2;
    var percentHeightFromBottom = .15 + top / window.innerHeight;
    
    var toprounded = Math.round(top);
    var please = String(toprounded);
    t.style.zIndex = please;
    t.style.transform = 'scale('+percentHeightFromBottom+')';

    t.style.right = right+"px";
    t.style.top = top+"px";

    trees.push(t);
    renderTrees.appendChild(t);
    document.body.appendChild(t);
}


function nextQuestionShowEPA(questionNumber){
    var divOptions = document.getElementById("divOptions");
    var divPrompts = document.getElementById("divPrompts");
    
    divPrompts.innerHTML = prompts[questionNumber];
    divOptions.innerHTML = options[questionNumber];

    document.getElementById("divMPG").hidden = false;
    
}