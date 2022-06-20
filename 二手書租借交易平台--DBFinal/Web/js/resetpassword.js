let validmeesage = {
    password: '密碼不可為空',
    passwordcheck: '確認密碼不可為空',
};

document.querySelector('.formgroup .sendbtn').addEventListener('click', function () {
    let password = document.querySelector('#password').value
    let passwordcheck = document.querySelector('#passwordcheck').value
    let token = getQueryVariable('token')

    compare(password, passwordcheck);
    var inputs = document.querySelectorAll('.form input');
    inputs.forEach(input => {
        checkvalidation(input)
    })
    var invalid = document.querySelectorAll('.invalid');

    if (invalid.length == 0) {
        document.querySelector('.load').style.display = 'block';
        document.querySelector('.loadmask').style.display = 'block';
        ResetPassword(password, passwordcheck, token)
    }
})

function checkvalidation(input) {
    if (input.value != '') {
        input.classList.remove('invalid');
        document.getElementById(input.id + 'e').innerHTML = ''
    }
    else {
        input.classList.add('invalid');
        document.getElementById(input.id + 'e').innerHTML = validmeesage[input.id];
    }
}

function compare(valuea, valueb) {
    return valuea == valueb;
}