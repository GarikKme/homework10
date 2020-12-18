let start = document.querySelector('.start'),
    overlay = document.querySelector('.overlay'),
    modal1 = document.querySelector('.modal1'),
    modal2 = document.querySelector('.modal2'),
    modal3 = document.querySelector('.modal3'),
    maxBtn = document.querySelector('#max-btn'),
    maxValue = document.querySelector('#max'),
    minBtn = document.querySelector('#min-btn'),
    minValue = document.querySelector('#min'),
    btnClose = document.querySelector('#close-modals');

    document.querySelector('.card').style.display = "none";

start.onclick = function () {
    overlay.style.display = "block";
    modal1.style.display = "flex";
}


minValue.addEventListener('input', () => {
    
    //min value
    minValue.value = (minValue.value < -999) ? minValue.value = -999 : minValue.value = minValue.value;
    console.log(typeof minValue.value);
    
})

//if user did not enter a number -> check
minBtn.addEventListener('click', function () {
    if (isNaN(minValue.value) || minValue.value == null) {
        minValue.value = 0;
        alert('Введите число корректно!!!');
    }
    modal1.style.display = "none";
    modal2.style.display = "flex";
})


//===========================================

const strToNum = str => str.value ? parseInt(str.value) : 0;

maxValue.addEventListener('input', () => {
    //max  value
    maxValue.value = (maxValue.value > 999) ? maxValue.value = 999 : maxValue.value = maxValue.value;
    console.log(typeof maxValue.value);
})

//if user did not enter a number -> check

maxBtn.addEventListener('click', function () {
    //if user did not enter a number -> check
    if (isNaN(maxValue.value) || maxValue.value == null) {
        maxValue.value = 0;
        alert('Введите число корректно!!!');
    }

    modal2.style.display = "none";
    modal3.style.display = "block";
    showMin();
    showMax();

})

function showMin() {
    document.querySelector('#showMin').innerHTML = `${minValue.value}`;
}
function showMax() {
    document.querySelector('#showMax').innerHTML = `${maxValue.value}`;
}

let answerNumber = Math.floor((strToNum(minValue.value) + strToNum(maxValue.value)) / 2);
console.log(answerNumber);
let orderNumber = 1;
let gameRun = true;


btnClose.onclick = function() {
    modal3.style.display = "none";
    overlay.style.display = "none";
    document.querySelector('.card').style.display = "block";
}


const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

orderNumberField.innerText = orderNumber;
answerField.innerText = `Вы загадали число ${answerNumber }?`;

document.getElementById('btnRetry').addEventListener('click', function () {
    minValue.value = 0;
    maxValue.value = 100;
    orderNumber = 0;
    window.location.reload();
    
})


document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun) {
        if (minValue.value === maxValue.value) {
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue.value = answerNumber + 1;
            answerNumber = Math.floor((strToNum(minValue) + strToNum(maxValue)) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const questionRandom = Math.round(Math.random());
            const questionPhrase = (questionRandom === 1) ? `Возможно ${answerNumber }?` : `Да это точно ${answerNumber }`;
            answerField.innerText = questionPhrase;
        }
    }
})

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun) {
        if (minValue.value === maxValue.value) {
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue.value = answerNumber;
            answerNumber = Math.floor((strToNum(minValue) + strToNum(maxValue)) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const questionRandom = Math.round(Math.random());
            const questionPhrase = (questionRandom === 1) ? `Все таки ${answerNumber }?` : `Ну ладно ${answerNumber }`;
            answerField.innerText = questionPhrase;
        }
    }
})




document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun) {
        let luckyRandom = Math.floor(Math.random() * 3);
        let luckyField = "";
        switch (luckyRandom) {
            case 0:
                luckyField = `Я знал что это\n ${answerNumber }\n \u{1F60E}`
                answerField.innerText = luckyField;
                break;
            case 1:
                luckyField = `Без шансов \n ${answerNumber }\n \u{1F60E}`
                answerField.innerText = luckyField;
                break;
            case 2:
                luckyField = `Я всегда угадываю\n\u{1F60E}`
                answerField.innerText = luckyField;
                break;
            default:
                break;
        }

        gameRun = false;
    }
})