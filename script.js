//*======================= New Javascript start from here========================
const emptyPlaceholder = (event) => {
    event.target.placeholder = "";
}
const fillPlaceholder = (event) => {
    event.target.placeholder = "Enter Your Name";
}

//* Initially my button was dis-active 
document.getElementById("btn_1").disabled = true;
document.getElementById("btn_2").disabled = true;

const start = document.querySelector("#start");
const input = document.querySelector("input");
const label = document.querySelector("label");
const timeRemaining = document.querySelector("#timeRemaining");
const questionRemainingTime = document.querySelector("#queTimeRemaining");
const home = document.querySelector("#home");
const restart = document.querySelector("#restart");
const analysis = document.querySelector("#analysis");
const gamePage = document.querySelector(".gamePage");
const analysisPage = document.querySelector(".analysisPage");
const lastBtn = document.querySelector("#lastBtn");
const loadingPage = document.querySelector(".loadingPage");
const button_1 = document.querySelector("#btn_1");
const button_2 = document.querySelector("#btn_2");
const questions = document.querySelector("#questions");
let paraResponse;
const responses = document.querySelector("#responses");

let paraAnswer;
let ans;
const answers = document.querySelector("#answers"); 

let placeHolderValue;
let count = 100;
let questionCount;
let timer;
let num, nums;


const removePlaceholder = () => {
    placeHolderValue = document.querySelector("input").value;
    input.classList.add("hide");
    label.textContent = `Username : ${placeHolderValue}`;
}


const generateSignAndNum = () => {
    let num = document.getElementById("getNumber").innerText;
    let sign = Math.floor(Math.random() * 2) + 1;
    if(sign === 1) {
        //* console.log("Plus");
        //* It Means Plus (+) and Multiply (*)
        // todo - First of all generate (MULTIPLY) number
        let multiply = Math.floor(Math.random() * 100) + 1;
        document.getElementById("btn_2").innerText = `x ${multiply}`;

        // todo - Second we need to generate (ADD) number
        let plus = num * multiply; //* 6 * 5 = 30 
        let minNum = plus - (num * 2); //* 30 - (6 * 2) = 18 
        let maxNum = plus + (num * 2); //* 30 + (6 * 2) = 42
        minNum = minNum - num;  //* 18 - 6 = 12
        maxNum = maxNum - num;  //* 42 - 6 = 36
        let positiveNumber = (maxNum - minNum) + 1; //* (36 - 12) + 1 = 25
        let genNum = Math.floor(Math.random() * positiveNumber) + minNum;
        if(genNum <= 0) genNum = 322;
        document.getElementById("btn_1").innerText = `+ ${genNum}`;
    }
    else {
        //* It Means Minus (-) and Divide (/)
        //* console.log("Minus");
        let num1 = parseInt(num);
        num1 = Math.abs(num);
        let generateNum_1 = Math.floor(Math.random() * num1) + 1;
        document.getElementById("btn_2").innerText = `- ${generateNum_1}`;
        let n = num1;
        n = (n / 2);
        if(n === 0) n = 10;
        let generateNum_2 = Math.floor(Math.random() * n) + 1;
        document.getElementById("btn_1").innerText = `/ ${generateNum_2}`;
    }
    //! console.log(button_1.textContent);
    //! console.log(button_2.textContent);
    const para = document.createElement("p");
    para.classList.add("paraAnalysis");
    para.classList.add("kalam-bolder");
    para.textContent = `${button_1.textContent}    ${button_2.textContent}`
    questions.appendChild(para);
    
    paraResponse = document.createElement("p");
    paraResponse.classList.add("paraAnalysis");
    paraResponse.classList.add("kalam-bolder");
    if(paraResponse.textContent === "")
    paraResponse.textContent = `NOTHING`;
    responses.appendChild(paraResponse);

    paraAnswer = document.createElement("p");
    paraAnswer.classList.add("paraAnalysis");
    paraAnswer.classList.add("kalam-bolder");
    let btn1 = button_1.textContent;
    let btn2 = button_2.textContent;
    let sign1 = btn1[0];
    let sign2 = btn2[0];
    btn1 = btn1.substring(1);
    btn2 = btn2.substring(1);
    btn1 = btn1.trim();
    btn2 = btn2.trim();
    btn1 = parseInt(btn1);
    btn2 = parseInt(btn2);
    num = parseInt(num);
    console.log(sign1);
    console.log(sign2);
    if(sign1 === '+') {
        if((nums + btn1) >= (nums * btn2)) nums = nums + btn1;
        else nums = nums * btn2;
    }
    else if(sign2 === '+') {
        if((nums + btn2) >= (nums * btn1)) nums = nums + btn2;
        else nums = nums * btn1;
    }
    else if(sign2 === '/') {
        if((nums - btn1) >= (nums / btn2)) nums = nums - btn1;
        else {
            nums = nums / btn2;
            nums = Math.floor(nums);
        }
    }
    else if(sign1 === '/') {
        if((nums - btn2) >= (nums / btn1)) nums = nums - btn2;
        else {
            nums = nums / btn1;
            nums = Math.floor(nums);
        }
    }
    paraAnswer.textContent = nums;
    answers.appendChild(paraAnswer);
}

const generateNumber = () => { 
    num = Math.floor(Math.random() * 15) + 1;
    nums = num;
    document.getElementById("getNumber").innerText = num;
    generateSignAndNum();
    document.querySelector("#showInitialValue").textContent = `Starting Number : ${num}`;
}

const startTimer = () => {
    generateNumber();
    count = 100;
    questionCount = 20;
    timer = setInterval(() => {
        count--;
        questionCount--;
        timeRemaining.textContent = `Time Remaining : ${count}`;
        questionRemainingTime.textContent = `Question Change In : ${questionCount}`;
        if(questionCount == 0) {
            questionCount = 20;
            if(count != 0)
            generateSignAndNum();
        }
        if(count == 0) {
            document.getElementById("btn_1").disabled = true;
            document.getElementById("btn_2").disabled = true;
            clearInterval(timer);
            gamePage.classList.remove("show");
            gamePage.classList.add("hide");
            loadingPage.classList.remove("hide");
            loadingPage.classList.add("show");
            setTimeout(() => {
                analysisPage.classList.remove("hide");
                analysisPage.classList.add("show");
                loadingPage.classList.remove("show");
                loadingPage.classList.add("hide");
                if(num >= nums) 
                document.querySelector("span").textContent = `You won the game by ${num - nums} points`;
                else 
                document.querySelector("span").textContent = `You lost the game by ${nums - num} points`;
                
                document.querySelector("#showName").textContent = `UserName : ${placeHolderValue}`;
                document.body.style.backgroundColor = "#1B3022";
            }, 3000);
        }
   }, 1000);
} 

const startGame = () => {
    placeHolderValue = document.querySelector("input").value;
    if(placeHolderValue === "") {
        alert("Please enter your name...");
    }
    else {
        document.getElementById("btn_1").disabled = false;
        document.getElementById("btn_2").disabled = false;
        removePlaceholder();
        startTimer();
    }
}
start.addEventListener('click', startGame);

const calculate = (getBtn) => {
    let num = document.getElementById("getNumber").innerText;
    num = parseInt(num);
    let str = getBtn;
    let sign = str[0];
    str = str.substr(1);
    str.trim();
    let number = parseInt(str);
    if(sign === '+') num = num + number;
    else if(sign === '-') num = num - number;
    else if(sign === 'x') num = num * number;
    else {
        if(num % number === 0) num = num / number;
        else {
            num = num / number;
            num = Math.floor(num);
        }
    }
    document.getElementById("getNumber").innerText = num;
}

button_1.addEventListener('click', (event) => {
    calculate(button_1.innerText);
    generateSignAndNum();
    paraResponse.textContent = `${button_1.innerText}`;
})

button_2.addEventListener('click', (event) => {
    calculate(button_2.innerText);
    generateSignAndNum();
    paraResponse.textContent = `${button_2.innerText}`;
})


home.addEventListener('click', () => {
    if(count == 0 || count == 100) 
    window.location.href = "index.html";
})

restart.addEventListener('click', () => {
    window.location.href = "gamePage.html";
})

analysis.addEventListener('click', () => {
    if(count <= 99 && count >= 1) {
        clearInterval(timer);
        document.getElementById("btn_1").disabled = true;
        document.getElementById("btn_2").disabled = true;
        gamePage.classList.add("hide");
        analysisPage.classList.remove("hide");
        analysisPage.classList.add("show");
        if(num >= nums) 
        document.querySelector("span").textContent = `You won the game by ${num - nums} points`;
        else 
        document.querySelector("span").textContent = `You lost the game by ${nums - num} points`;
        
        document.querySelector("#showName").textContent = `UserName : ${placeHolderValue}`;
        document.body.style.backgroundColor = "#1B3022";
    }
}) 


lastBtn.addEventListener('click', () => {
    window.location.href = "index.html";
}) 