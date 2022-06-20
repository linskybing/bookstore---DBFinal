var list;

async function listinit() {
    var data;
    await GetDealRecordS().then(r => data = r);
    if (data.hasOwnProperty('data')) {
        list = data.data;
        console.log(data.data);
        loadtransation();

    }
}
listinit();
async function loadtransation() {
    if (list) {
        for (i = 0; i < list.length; i++) {
            let div = document.createElement('div');
            div.classList.add('info-item-2');
            div.innerHTML = `
                        <span class="data-label-num">
                            ${list[i].RecordId}
                        </span>
                        <span class="data-label-time">
                            ${list[i].CreatedAt}
                        </span>
                        <span class="data-label-text">
                            ${list[i].State}
                        </span>
                        <span class="data-label-text">
                            ${list[i].DealMethod}
                        </span>
                        <span class="data-label-text">
                            ${(list[i].DealType == 'Buy') ? "購買" : "租借"}
                        </span>                      
                        <div class="info-action data-action">
                            <div class="action">
                                <button class="insert hidden" style="margin-right:10px">已寄出</button>                               
                            </div>
                            <div class="action">
                                <button class="insert complete hidden" style="margin-right:10px">完成交易</button>                               
                            </div>
                        <div class="action hidden">
                            <button class="agree hidden" style="margin-right:10px">同意取消</button>                               
                        </div>
                            <div class="action"> 
                                <button class="delete" style="margin-right:10px">取消交易</button>
                            </div>
                        </div>
            `;
            let id = i;
            nowindex = id;
            div.querySelector('.action .delete').addEventListener('click', function () {
                nowid = list[id].RecordId;
                displaymodal();
            })
            var message;
            await ReadCancel(list[id].RecordId, list[id].Member).then(r => message = r);
            if (message && list[id].Seller_Agree == 0) {
                if (message.hasOwnProperty('Content')) {
                    nowid = list[id].RecordId;
                    var messagec = message.Content;
                    div.querySelector('.delete').classList.add('hidden');
                    div.querySelector('.agree').classList.remove('hidden');
                    div.querySelector('.agree').addEventListener('click', function () {
                        displaymodal2(messagec);
                    })
                }
            }

            if (list[id].Seller_Agree == 1) {
                div.querySelector('.delete').classList.add('hidden');
            }

            if (list[i].State == '待處理') {
                div.querySelector('.action .insert').innerHTML = `已寄出`;
                div.querySelector('.action .insert').classList.remove('hidden');
                let id = i;

                div.addEventListener('click', async function () {
                    var data = {
                        'State': '寄送中'
                    }
                    var re;
                    await UpdateDealRecord(list[id].RecordId, data).then(r => re = r);
                    if (!re.hasOwnProperty('error') && re) {
                        div.querySelector('.action .insert').classList.add('hidden');
                    }
                    window.location.reload();
                })
            }
            else if (list[i].State == '寄送中') {
                div.querySelector('.action .insert').innerHTML = `已寄出`;
            }
            else if (list[i].State == '已取貨') {
                div.querySelector('.action .complete').innerHTML = `完成交易`;
                div.querySelector('.action .complete').classList.remove('hidden');
                div.querySelector('.action .complete').addEventListener('click', async function () {
                    var data = {
                        'State': '完成交易'
                    }
                    var re;
                    await UpdateDealRecord(list[id].RecordId, data).then(r => re = r);
                    if (!re.hasOwnProperty('error') && re) {
                        div.querySelector('.action .complete').classList.add('hidden');
                    }
                    window.location.reload();
                })
            }
            else if (list[i].State == '完成交易') {
                div.querySelector('.action .delete').classList.add('hidden');
            }
            document.querySelector('.personal-info-2').appendChild(div);
        }
    }
}

//modal
let modal = document.querySelector('.modal');
let modal_content;

modal.addEventListener('click', function (e) {
    let element = e.target;
    if (element == modal) {
        modal.classList.toggle('hidden');
    }
})

//關閉modal
function closemodal() {
    let close = document.querySelector('.modal .close');
    close.addEventListener('click', function () {
        modal.classList.add('hidden');
    });

    let cancel = document.querySelector('.modal .cancel');
    cancel.addEventListener('click', function () {
        modal.classList.add('hidden');
    });
}

//modal事件
function modal_content_event() {
    modal_content.display = 'flex';
    modal_content.classList.toggle('open');
}

function displaymodal() {
    modal.classList.remove('hidden');
    modal.innerHTML = `
   <div class="modal-content-2">
            <div class="header">
                <div class="close">
                    <i class="fa-solid fa-xmark"></i>
                </div>                             
                <div class="menu">
                    <ul>
                        <li class="active" id="infoperson">取消交易</li>  
                    </ul>                    
                </div> 
            </div>
            <div class="content">
               <div class="formerror">
               </div>             
                <div class="formgroup">
                    <label for="content">取消原因<span class="must">*</span></label>
                    <textarea type="text" id="content"></textarea>
                </div>
            </div>
            <div class="footer">
                <button class="submit" id="submit_d">
                    取消交易
                </button>                          
                <span class="cancel">取消</span>
            </div>
        </div>
   `;
    modal_content = document.querySelector('.modal-content-2');
    closemodal();
    senddata();
    modal_content_event();
}


async function displaymodal2(message) {
    modal.classList.remove('hidden');
    modal.innerHTML = `
   <div class="modal-content-2">
            <div class="header">
                <div class="close">
                    <i class="fa-solid fa-xmark"></i>
                </div>                             
                <div class="menu">
                    <ul>
                        <li class="active" id="infoperson">同意取消</li>                      
                </div> 
            </div>
            <div class="content">
               <div class="formerror">
               </div>             
                <div class="formgroup">
                    <label for="content">取消原因<span class="must">*</span></label>
                    <textarea type="text" id="content" disabled>${message}</textarea>
                </div>
            </div>
            <div class="footer">
                <button class="submit" id="submit_d">
                    取消交易
                </button>                          
                <span class="cancel">取消</span>
            </div>
        </div>
   `;
    modal_content = document.querySelector('.modal-content-2');
    closemodal();
    senddata2();
    modal_content_event();
}

//送出按鈕
function senddata() {
    let btn = document.getElementById('submit_d');

    btn.addEventListener('click', async function () {
        let content = document.querySelector('#content').value;
        if (content.length > 0) {
            document.querySelector('.formerror').innerHTML = '';
            document.querySelector('.formerror').classList.remove('erroractive');
            var re;
            await CreateDealMessage(nowid, content).then(r => re = r);
            if (re.hasOwnProperty('MessageId')) {
                document.querySelector('.formerror').classList.add('succece');
                document.querySelector('.formerror').innerHTML = '已成功送出請求，請等待買家回應';
                var temp = {
                    'Seller_Agree': 1
                }
                await UpdateDealRecord(nowid, temp);
                setTimeout(() => {
                    document.querySelector('.formerror').classList.remove('succece');
                    document.querySelector('.formerror').innerHTML = '';
                    document.querySelector('.modal').toggle('hidden');
                }, 5000);

                window.location.reload();
            }
        }
        else {
            document.querySelector('.formerror').innerHTML = '請說明原因';
            document.querySelector('.formerror').classList.add('erroractive');
        }
    })
}

//senddata
function senddata2() {
    let btn = document.getElementById('submit_d');

    btn.addEventListener('click', async function () {
        var temp = {
            'State': '已取消',
            'Seller_Agree': 1
        }
        await UpdateDealRecord(nowid, temp);
    })
}

function compare(a, b) {
    var btn = true;
    if (a != b) btn = false;
    return btn;
}