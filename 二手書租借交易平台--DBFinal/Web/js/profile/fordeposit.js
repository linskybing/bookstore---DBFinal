var data;

initdeposit();
async function initdeposit() {
    await GetDeposit().then(r => data = r);
    if (data && data.hasOwnProperty('data')) {
        data = data.data;
        loadpage();
        checkall();
        insertbtn();
        binddelete();
    }
    console.log(data);
}


let modal = document.querySelector('.modal');


modal.addEventListener('click', function (e) {
    let element = e.target;
    if (element == modal) {
        document.body.classList.toggle('bodyhidden');
        modal.classList.toggle('hidden');
    }
})

// checkbox
function checkall() {
    let checkbox_all = document.querySelector('.checkbox_head input');
    checkbox_all.addEventListener('click', function () {
        checkboxes = document.getElementsByName('product');

        checkboxes.forEach(element => {
            element.checked = checkbox_all.checked;
        });
    });
}

// 載入頁面
function loadpage() {
    data.forEach(element => {
        let div = document.createElement('div');
        div.classList.add('table_content');
        div.innerHTML = `   
        <div class="checkbox">
            <input type="checkbox" id="p_${element.DepositId}" name="product" value="${element.DepositId}">
            <label for="p_${element.DepositId}"><i class="fa-solid fa-check"></i></label>
        </div>             
        <div class="productprice">
        ${element.BankId}
        </div>
        <div class="productname">
            ${element.DepositAccount}
        </div>  
    `;
        document.querySelector('.product_table').appendChild(div);
    })
}

//綁定insert按鈕
function insertbtn() {
    var insert = document.querySelector('.table_action .insert');
    insert.addEventListener('click', function () {
        document.body.classList.toggle('bodyhidden');
        modal.classList.toggle('hidden');
        displaymodal();
    })
}

//綁定delete按鈕
function binddelete() {
    var h_delete = document.querySelector('.table_action .delete');
    h_delete.addEventListener('click', async function () {
        checkboxes = document.getElementsByName('product');

        checkboxes.forEach(element => {
            if (element.checked) {
                var re
                DELETEDeposit(element.value).then(r => re = r);
                console.log(re);
                window.location.reload();
            }
        });
    })
}

//顯示modal內容
let modal_content = document.querySelector('.modal-content-2')
function displaymodal() {
    modal.innerHTML = `
    <div class="modal-content-2">
        <div class="header">
            <div class="close">
                <i class="fa-solid fa-xmark"></i>
            </div>
            <div class="modal-title">
                <h3>新增帳戶</h3>
            </div>
            <div class="menu">
                <ul>
                    <li class="active">帳戶資訊</li>                  
                </ul>
            </div>
        </div>
        <div class="content">
            <div class="formerror">               
            </div>
            <div class="formgroup">
                <label for="bankid">銀行編號<span class="must">*</span></label>
                <input type="text" id="bankid">
            </div>
            <div class="formgroup">
                <label for="bankaccount">銀行帳戶<span class="must">*</span></label>
                <input type="text" id="bankaccount">
            </div>                     
        </div>
        <div class="footer">
            <button class="submit">
                新增帳戶
            </button>
            <span class="cancel">取消</span>
        </div>
    </div>
    `;
    let btn = document.querySelector('.modal .submit');
    btn.addEventListener('click', async function () {
        let bid = modal.querySelector('.content #bankid').value;
        let account = modal.querySelector('.content #bankaccount').value;

        if (bid.length > 0 && account.length > 0) {
            document.querySelector('.formerror').classList.remove('erroractive');
            document.querySelector('.formerror').innerHTML = '';
            document.querySelector('.formerror').classList.add('succece');
            document.querySelector('.formerror').innerHTML = '新增成功';
            await PostDeposit(bid, account);
            window.location.reload();
        }
        else {
            document.querySelector('.formerror').classList.add('erroractive');
            document.querySelector('.formerror').innerHTML = '必填欄位不可為空';
        }
    })
    closemodal();
    modal_content_event('.modal .modal-content-2');
}


//關閉modal
function closemodal() {
    let close = document.querySelector('.modal .close');
    close.addEventListener('click', function () {
        document.body.classList.toggle('bodyhidden');
        modal.classList.add('hidden');
    });

    let cancel = document.querySelector('.modal .cancel');
    cancel.addEventListener('click', function () {
        document.body.classList.toggle('bodyhidden');
        modal.classList.add('hidden');
    });
}

//modal事件
function modal_content_event(type) {
    let modal_content = document.querySelector(type);
    modal_content.display = 'flex'
    modal_content.classList.toggle('open');
}