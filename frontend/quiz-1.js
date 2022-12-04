
var time=45;
var setcount = setInterval(function () {
    if(time<=0){
        //alert("time up!");  //for this one I just added a alert
        // endquiz();  //you can create a function that will be called when time is over
        clearInterval(setcount);
    }
    else{
        document.getElementsByClassName("count")[0].innerHTML=time;
        time--;
    }
}, 1000);
function check(){
    var c = 0;
    var q1 = document.quiz.question1.value;
    var q2 = document.quiz.question2.value;
    var q3 = document.quiz.question3.value;
    var q4 = document.quiz.question4.value;
    var q5 = document.quiz.question5.value;
    var quiz = document.getElementById('quiz');
    if(q1=="Javascript"){c++};
    if(q2=="Russia"){c++};
    if(q3=="Delhi"){c++};
    if(q4=="178"){c++};
    if(q5=="36"){c++};
    var result = document.getElementById('result')
    quiz.style.display = "none";

    var totalQuestions = 5;
    var correct = c;
    var percentage = correct/totalQuestions*100;
    var passed = false;

    //if percentage is greater than equal to 70, then you are qualified to get certificate
    if(percentage>=70){
        passed = true;
    }
    result.innerHTML = `
      <h3>Your percentage is: ${percentage} %</h3>
      <button onClick="handleGetCertificate()" ${passed?"": "disabled"}>Get certificate</button>
      <button onClick="handleReAttempt()">Re-attempt</button>

    `
}

function handleGetCertificate(){
    alert("Clicked of get certificate");
}

function handleReAttempt(){
    alert("Clicked of get Re attempt");
}
