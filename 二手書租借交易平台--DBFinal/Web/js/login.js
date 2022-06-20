let validmeesage = {
    account: '帳號不可為空',
    password: '密碼不可為空',
    email: '電子信箱不可為空'
};

function checkvalidation(input) {
    if (input.value != '') {
        input.classList.remove('invalid');
    }
    else {
        input.classList.add('invalid');
        document.getElementById(input.id + 'e').innerHTML = validmeesage[input.id];
    }
}

if (getCookie('token')) {
    window.location.href = 'index.html';
}

function isEmail(strEmail) {
    var email = document.getElementById('email');
    if (strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/) != -1) {
        document.getElementById('emaile').innerHTML = '';
        email.classList.remove('invalid');
    }
    else {
        email.classList.add('invalid');
        document.getElementById('emaile').innerHTML = '電子信箱格式不正確';
    }
}

function bindforget() {
    document.querySelector('.forget').addEventListener('click', function () {
        document.querySelector('.title h1').innerHTML = `忘記密碼`;
        let form = document.querySelector('.form');
        form.innerHTML = `
            <div class="formgroup">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#858585;" class="bi bi-person"
                    viewBox="0 0 16 16">
                    <path
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                </svg>
                <input type="text" placeholder="帳號" id="account">
            </div>
            <div class="error" id="accounte">
    
            </div>
            <div class="formgroup">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                class="bi bi-envelope" viewBox="0 0 16 16">
                <path
                    d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
            </svg>
            <input type="text" placeholder="電子信箱" id="email" required>
             </div>
            <div class="error" id="emaile">
            </div>
            <div class="login">
                <a href="#">登入</a>
            </div>
            <div class="formgroup">
                <div class="sendbtn">
                    <span>送出</span>
                </div>
            </div>
            <div class="formgroup">
                </a>
            </div>
        `
        document.querySelector('#email').addEventListener('change', function (account) {

            let value = document.querySelector('#email').value;
            isEmail(value);

        })
        bindlogin();
    })
    document.querySelector('.sendbtn').addEventListener('click', function () {
        let account = document.getElementById('account').value;
        let password = document.getElementById('password').value;
        console.log(account, password);
        var inputs = document.querySelectorAll('.form input');
        inputs.forEach(input => {
            checkvalidation(input)
        })
        var invalid = document.querySelectorAll('.invalid');

        if (invalid.length == 0) {
            document.querySelector('.load').style.display = 'block';
            document.querySelector('.loadmask').style.display = 'block';
            Login(account, password);
        }
    })
}

function bindlogin() {
    document.querySelector('.login').addEventListener('click', function () {
        document.querySelector('.title h1').innerHTML = `會員登入`;
        let form = document.querySelector('.form');
        form.innerHTML = `
        <div class="formgroup">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#858585;" class="bi bi-person"
            viewBox="0 0 16 16">
            <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
        </svg>
        <input type="text" placeholder="帳號" id="account">
        </div>
        <div class="error" id="accounte">

        </div>
        <div class="formgroup">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                class="bi bi-lock-fill" viewBox="0 0 16 16">
                <path
                    d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
            </svg>
            <input type="password" placeholder="密碼" id="password">
        </div>
        <div class="error" id="passworde">
        </div>
        <div class="forget">
            <a href="#">忘記密碼？</a>
        </div>
        <div class="formgroup">
            <div class="sendbtn">
                <span>登入</span>
            </div>
        </div>
        <div class="formgroup">
            </a>
        </div>
        `

        bindforget();
    })
    document.querySelector('.sendbtn').addEventListener('click', function () {
        let account = document.getElementById('account').value;
        let email = document.getElementById('email').value;
        console.log(account, email);
        var inputs = document.querySelectorAll('.form input');
        inputs.forEach(input => {
            checkvalidation(input)
        })
        var invalid = document.querySelectorAll('.invalid');

        if (invalid.length == 0) {
            document.querySelector('.load').style.display = 'block';
            document.querySelector('.loadmask').style.display = 'block';
            ForgetPassword(account, email);
        }
    })
}

bindforget();
