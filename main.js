/* generate password button */
const buttonGenerate = document.getElementById('buttonGenerate');
/* copied button */
const copiedButton = document.querySelector('.passContainer img');
/* input password */
const inputPassword = document.getElementById('password');
/* text copied */
const textCopied = document.getElementsByClassName('textCopied');
/* checkboxs */
const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const numberOption = document.getElementById('number');
const symbols = document.getElementById('symbols');
/* range & range h2 indicator */
const range = document.querySelector('input[type="range"]');
const rangeh2 = document.querySelector('.lengthContainer h2');
/* Text and Marks of Strength */
const strengthMark = Array.from(document.querySelectorAll('.graficContainer div'))
const strengthText = document.querySelector('.graficContainer span')
/* Options Allowed */
const symbolsAllowed = '~`!@#$%^&*()_-+={[}]|\:;”‘.?/';
const upperAllowed = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerAllowed = 'abcdefghijklmnopqrstuvwxyz';
const numberAllowed = '0123456789';

/* FUNCTIONS */
const randomize = (values) => {
    values = Array.from(values)
    values.sort(() => Math.random() - 0.5);
    return values.join('');
}
const cleanStrengthIndicator = () => {
    strengthMark.forEach(mark => {
        mark.classList.remove('orange', 'yellow', 'green', 'red');
    });
    strengthText.textContent = '';
}
const strengthIndicator = (level) => {
    cleanStrengthIndicator();
    for (let i = 0; i <= level; i++) {
        switch (level) {
            case 0:
                strengthMark[i].classList.add('red');
                strengthText.textContent = 'TOO WEAK!';
                break;
            case 1:
                strengthMark[i].classList.add('orange');
                strengthText.textContent = 'WEAK';
                break;
            case 2:
                strengthMark[i].classList.add('yellow');
                strengthText.textContent = 'MEDIUM';
                break;
            case 3:
                strengthMark[i].classList.add('green');
                strengthText.textContent = 'STRONG';
                break;
            default:
                break;
        }
    }
}
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const generatePartialPass = () => {
    let password = '';
    uppercase.checked ? password += upperAllowed[getRandomInt(0, 25)] : null
    lowercase.checked ? password += lowerAllowed[getRandomInt(0, 25)] : null
    numberOption.checked ? password += numberAllowed[getRandomInt(0, 9)] : null
    symbols.checked ? password += symbolsAllowed[getRandomInt(0, 27)] : null
    return password
}
const determineStrength = () => {
    if (range.value < 4) {
        strengthIndicator(0)
    } else {
        strengthIndicator(1)
        let amountIncludes = 0;

        uppercase.checked && amountIncludes++
        lowercase.checked && amountIncludes++
        numberOption.checked && amountIncludes++
        symbols.checked && amountIncludes++

        switch (amountIncludes) {
            case 0:
                cleanStrengthIndicator()
                break;
            case 1:
                strengthIndicator(0)
                break;
            case 2:
                strengthIndicator(1)
                break;
            case 3:
                strengthIndicator(2)
                break;
            case 4:
                strengthIndicator(3)
                break;
            default:
                break;
        }
    }
}

/* Listeners */
buttonGenerate.addEventListener('click', () => {
    let passw = '';
    for (let i = 0; i < range.value; i++) {
        passw += generatePartialPass()
        if (passw.length > range.value) {
            i = range.value
        }
    }
    const correctLenght = passw.substring(0, range.value);
    inputPassword.value = randomize(correctLenght);
    determineStrength();
})
copiedButton.addEventListener('click', () => {
    if (inputPassword.value) {
        navigator.clipboard.writeText(inputPassword.value)
            .then(() => {
                textCopied[0].textContent = 'COPIED';
                setTimeout(() => {
                    textCopied[0].textContent = '';
                }, 2000);
            })
            .catch((error) => {
                console.error('Error al copiar al portapapeles:', error);
            });
    }
})
range.addEventListener("input", () => {
    let rangeValue = range.value * (100 / 20) + '%'
    rangeh2.textContent = range.value;
    range.style.setProperty('--litters-range', rangeValue)
})