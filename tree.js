let prompts = [];
let options = [];
let questionNumber = 0;


window.onload = function(){
    console.log("Window Loaded");
    
    var fadeInHeading = "<br><h1 class = \"w3-animate-opacity\">";

    prompts = [
        fadeInHeading+"<b>This is a question about carbon consumption</b></h1>",
        fadeInHeading+"This is another question",
        "The third question"
    ];

    options = [
        "<button class = \"w3-animate-opacity\" onclick=\"nextQuestion()\">LessTrees</button>&nbsp;<button class = \"w3-animate-opacity\" onclick=\"nextQuestion()\">MoreTrees</button>",
        "<form class=\"w3-container w3-card-4 w3-animate-opacity\"><p><input class=\"w3-check\" type=\"checkbox\" checked=\"checked\"><label> I like trees</label></p><p><input class=\"w3-check\" type=\"checkbox\"><label> I'm unopinionated on trees</label></p><p><input class=\"w3-check\" type=\"checkbox\" disabled><label>I hate trees (Disabled)</label></p></form><br><button onclick = \"nextQuestion()\">Submit</button>"
    ];

    go();
}



function go(){
    
    nextQuestion();
    
}

function nextQuestion(){
    var divOptions = document.getElementById("divOptions");
    var divPrompts = document.getElementById("divPrompts");
    
    divPrompts.innerHTML = prompts[questionNumber];
    divOptions.innerHTML = options[questionNumber];
    
    questionNumber++;
}