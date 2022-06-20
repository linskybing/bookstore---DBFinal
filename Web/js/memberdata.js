let validmeesage = {
    oldpassword: '舊密碼不可為空',
    password: '密碼不可為空',
    passwordcheck: '確認密碼不可為空',
};

async function temp() {
    var data;
    await getAccount().then(r => data = r)
    console.log(data);

    document.querySelector('#name span').innerHTML = getCookie('Name');
    document.querySelector('#accountinfo').innerHTML = data.Account;
    document.querySelector('#emailinfo').innerHTML = data.Email;
    document.querySelector('#addressinfo').value = data.Address;
    document.querySelector('#nameinfo').innerHTML = data.Name;
}
temp();

document.querySelector('.submit input').addEventListener('click', function (e) {
    e.preventDefault();
    let address = document.querySelector('#addressinfo').value
    if (address != "") {
        UpdateAddress(address);
        if (document.querySelector('input[type=file]').value != "") {
            Uploadimg();
        }
    }
    else {
        console.log('地址不可為空')
    }

})

document.querySelector('.submit2 input').addEventListener('click', function (e) {
    e.preventDefault();
    let oldpassword = document.getElementById('oldpassword').value;
    let password = document.getElementById('password').value;
    let passwordcheck = document.getElementById('passwordcheck').value;
    var inputs = document.querySelectorAll('.user_pwd input[type=text],input[type=password]');
    inputs.forEach(input => {
        checkvalidation(input)
    })
    var invalid = document.querySelectorAll('.invalid');
    if (invalid.length == 0) {
        if (compare(password, passwordcheck)) {
            UpdatePassword(oldpassword, password)
            window.location.reload()
        }
        else {
            document.getElementById('passwordchecke').innerHTML = `兩次密碼輸入不一致`;
        }
    }


})

function checkvalidation(input) {
    if (input.value != '') {
        input.classList.remove('invalid');
        document.getElementById(input.id + "e").innerHTML = '';
    }
    else {
        input.classList.add('invalid');
        document.getElementById(input.id + 'e').innerHTML = validmeesage[input.id];
    }
}

function compare(valuea, valueb) {
    return valuea == valueb;
}
console.log('http://localhost:8080/images/Members/' + getCookie('Image'))
document.querySelector('.membericon').src = 'http://localhost:8080/images/Members/' + getCookie('Image');