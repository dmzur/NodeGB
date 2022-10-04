const colors = require('colors');

let firstNum = parseInt(process.argv[2]);
let secondNum = parseInt(process.argv[3]);
let numStack = [];
let steps = 0;

if (isNaN(firstNum) || isNaN(secondNum) || (firstNum >= secondNum)) {
    console.log("Введённые данные некорректны:")
    if (isNaN(firstNum)) {
        console.log(colors.red(`Нижняя граница не является числом: ${firstNum}`))
    }
    else if (isNaN(secondNum)) {
        console.log(colors.red(`Верхняя граница не является числом: ${secondNum}`))
    }
    else if (firstNum >= secondNum) {
        console.log(colors.red(`Верхняя граница равна или ниже нижней`))
    }
    return false
}

function isPrime(num) {
    let i = 2;
    while (i < num / 2) {
        if (num % i == 0) {
            return false;
        }
        i++;
    }
    return true;
};

while (firstNum <= secondNum) {
    if (isPrime(firstNum) && firstNum >= 2) {
        numStack.push(firstNum)
    }
    firstNum++;
};

numStack.forEach(el => {
    switch (steps) {
        case 0:
            console.log(colors.red(el));
            break;
        case 1:
            console.log(colors.yellow(el));
            break;
        case 2:
            console.log(colors.green(el));
    }
    steps == 2 ? (steps = 0) : steps++;
    return;
});