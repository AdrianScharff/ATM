// Declaracion de variables
const cuentas = [
    { usuario: 'Mike23', saldo: 500, password: 'Mike321' },
    { usuario: 'Lisa47', saldo: 900, password: 'Lisa123' },
    { usuario: 'Jackson52', saldo: 300, password: 'Jack321' },
    { usuario: 'Emily66', saldo: 200, password: 'Emi123' },
    { usuario: 'James99', saldo: 1700, password: 'James321' },
];
// secciones
const homeSection = document.querySelector('.home-section');
const passwordSection = document.querySelector('.password-section');
const optionsSection = document.querySelector('.options-section');
const balanceSection = document.querySelector('.balance-section');
const enterSection = document.querySelector('.enter-section');
const enteredAmountSection = document.querySelector('.entered-amount-section');
const withdrawSection = document.querySelector('.withdraw-section');
const withdrawnAmountSection = document.querySelector('.withdrawn-amount-section');
// inputs
const homeInput = document.getElementById('home-input');
const passwordInput = document.getElementById('pw-input');
const enterInput = document.getElementById('en-input');
const withdrawInput = document.getElementById('wd-input');
// forms
const homeForm = document.querySelector('.home-form');
const passwordForm = document.querySelector('.password-form');
const enterForm = document.querySelector('.enter-form');
const withdrawForm = document.querySelector('.withdraw-form');
// buttons
const balanceBtn = document.getElementById('balance-btn');
const enterBtn = document.getElementById('enter-btn');
const withdrawBtn = document.getElementById('withdraw-btn');
const btnHomeNext = document.querySelector('.btn-home-next');
const btnPasswordNext = document.querySelector('.btn-password-next');
const btnCloseHome = document.querySelector('.close-home');
const btnClosePassword = document.querySelector('.close-password');
const btnEnterNext = document.querySelector('.btn-enter-next');
const btnWithdrawNext = document.querySelector('.btn-withdraw-next');
const btnSiBigger = document.querySelector('.siBigger');
const btnNoBigger = document.querySelector('.noBigger');
const btnSiSmaller = document.querySelector('.siSmaller');
const btnNoSmaller = document.querySelector('.noSmaller');
const btnBack = document.querySelector('.btn-back');
const btnBackOptions = document.querySelector('.btn-back-options');
// Text elements
const balanceNum = document.querySelector('.balance-num');
const balanceNumEntered = document.querySelector('.balance-num-entered');
const balanceNumWithdrawn = document.querySelector('.balance-num-withdrawn');
const balanceNumUp = document.getElementById('balance-num-up');
const balanceNumDown = document.getElementById('balance-num-down');
const homeAlert = document.querySelector('.home-alert');
const passwordAlert = document.querySelector('.password-alert');
const ruleBiggerAlert = document.querySelector('.rule-bigger-alert');
const ruleSmallerAlert = document.querySelector('.rule-smaller-alert');

// Definicion de funciones
const checkUser = () => {
    const userEntered = homeInput.value;
    if (cuentas.some(obj => obj.usuario === userEntered)) {
        homeSection.classList.add('d-none');
        passwordSection.classList.remove('d-none');
        cuentas.forEach((cuenta) => {
            if (userEntered === cuenta.usuario) {
                passwordForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    checkPassword(cuenta);
                });
            }
        });
    }
    else {
        homeAlert.classList.remove('d-none');
    }
}

const checkPassword = (cuenta) => {
    const passwordEntered = passwordInput.value;
    setOptions(cuenta);
    if (passwordEntered === cuenta.password) {
        passwordSection.classList.add('d-none');
        optionsSection.classList.remove('d-none');
    }
    else {
        passwordAlert.classList.remove('d-none');
    }
}

const setOptions = (cuenta) => {
    balanceBtn.addEventListener('click', () => {
        checkBalance(cuenta)
    });
    enterBtn.addEventListener('click', () => {
        enterAmount(cuenta);
    });
    withdrawBtn.addEventListener('click', () => {
        withdrawAmount(cuenta);
    });
}

const closeAlert = (alert) => {
    alert.classList.add('d-none');
}

const checkBalance = (cuenta) => {
    balanceNum.innerText = cuenta.saldo;
    optionsSection.classList.add('d-none');
    balanceSection.classList.remove('d-none');
    btnBack.classList.remove('d-none');
}

const enterAmount = (cuenta) => {
    enterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const valueEntered = parseInt(enterInput.value);
        const sumEntered = valueEntered + cuenta.saldo;
        if (sumEntered <= 990) {
            displayEntered(cuenta, valueEntered, sumEntered);
        }
        else {
            btnEnterNext.classList.add('d-none');
            ruleBiggerAlert.classList.remove('d-none');
            btnSiBigger.addEventListener('click', () => {
                displayEntered(cuenta, valueEntered, sumEntered);
            });
            btnNoBigger.addEventListener('click', () => {
                ruleBiggerAlert.classList.add('d-none');
                btnEnterNext.classList.remove('d-none');
                enterInput.value = "";
            });
        }
    });
    enterInput.value = "";
    optionsSection.classList.add('d-none');
    enterSection.classList.remove('d-none');
    btnBack.classList.remove('d-none');
}

const withdrawAmount = (cuenta) => {
    withdrawForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const valueWithdrawn = parseInt(withdrawInput.value);
        const subtractWithdrawn = cuenta.saldo - valueWithdrawn;
        if (subtractWithdrawn >= 10) {
            displayWithdrawn(cuenta, valueWithdrawn, subtractWithdrawn);
        }
        else {
            btnWithdrawNext.classList.add('d-none');
            ruleSmallerAlert.classList.remove('d-none');
            btnSiSmaller.addEventListener('click', () => {
                displayWithdrawn(cuenta, valueWithdrawn, subtractWithdrawn);
            });
            btnNoSmaller.addEventListener('click', () => {
                ruleSmallerAlert.classList.add('d-none');
                btnWithdrawNext.classList.remove('d-none');
                withdrawInput.value = "";
            });
        }
    });
    withdrawInput.value = "";
    optionsSection.classList.add('d-none');
    withdrawSection.classList.remove('d-none');
    btnBack.classList.remove('d-none');
}

const displayEntered = (cuenta, val, sum) => {
    balanceNumEntered.innerText = val;
    balanceNumUp.innerText = sum;
    cuenta.saldo = sum;
    enterSection.classList.add('d-none');
    enteredAmountSection.classList.remove('d-none');
    btnBackOptions.classList.remove('d-none');
}

const displayWithdrawn = (cuenta, val, sub) => {
    balanceNumWithdrawn.innerText = val;
    balanceNumDown.innerText = sub;
    cuenta.saldo = sub;
    withdrawSection.classList.add('d-none');
    withdrawnAmountSection.classList.remove('d-none');
    btnBackOptions.classList.remove('d-none');
}

const goBack = (currentSection, previousSection) => {
    currentSection.classList.add('d-none');
    previousSection.classList.remove('d-none');
}

// Llamado de eventos
homeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    checkUser();
});

btnCloseHome.addEventListener('click', () => {
    closeAlert(homeAlert);
});

btnClosePassword.addEventListener('click', () => {
    closeAlert(passwordAlert);
});

btnBack.addEventListener('click', () => {
    if (!balanceSection.classList.contains('d-none')) {
        goBack(balanceSection, optionsSection);
    }
    else if (!enterSection.classList.contains('d-none')) {
        goBack(enterSection, optionsSection);
    }
    else if (!withdrawSection.classList.contains('d-none')) {
        goBack(withdrawSection, optionsSection);
    }
    else if (!enteredAmountSection.classList.contains('d-none')) {
        goBack(enteredAmountSection, enterSection);
        if(!ruleBiggerAlert.classList.contains('d-none')) {
            ruleBiggerAlert.classList.add('d-none');
            btnEnterNext.classList.remove('d-none');
        }
        btnBackOptions.classList.add('d-none');
        enterInput.value = "";
    }
    else {
        goBack(withdrawnAmountSection, withdrawSection);
        if(!ruleSmallerAlert.classList.contains('d-none')) {
            ruleSmallerAlert.classList.add('d-none');
            btnWithdrawNext.classList.remove('d-none');
        }
        btnBackOptions.classList.add('d-none');
        withdrawInput.value = "";
    }
    if (!optionsSection.classList.contains('d-none')) {
        btnBack.classList.add('d-none');
    }
});

btnBackOptions.addEventListener('click', () => {
    if (!enteredAmountSection.classList.contains('d-none')) {
        goBack(enteredAmountSection, optionsSection);
    }
    else {
        goBack(withdrawnAmountSection, optionsSection);
    }
    btnBack.classList.add('d-none');
    btnBackOptions.classList.add('d-none');
    if(!ruleBiggerAlert.classList.contains('d-none')) {
        ruleBiggerAlert.classList.add('d-none');
        btnEnterNext.classList.remove('d-none');
    }
    if(!ruleSmallerAlert.classList.contains('d-none')) {
        ruleSmallerAlert.classList.add('d-none');
        btnWithdrawNext.classList.remove('d-none');
    }
});