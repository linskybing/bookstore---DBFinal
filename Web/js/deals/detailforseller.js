var detail;
var mark = 0;
var nowid;
var reivew;
// 載入資料
listinit();
async function listinit() {
    var url = location.href;

    if (url.indexOf('?') != -1) {
        var id = "";
        var ary = url.split('?')[1].split('&');

        for (i = 0; i <= ary.length - 1; i++) {
            if (ary[i].split('=')[0] == 'id') {
                id = ary[i].split('=')[1];
                nowid = id;
                var data;
                await GetRecordDetail(id).then(r => data = r);
                console.log(data);

                if (data) {
                    detail = data;
                    await GetByIdReview(nowid).then(r => reivew = r);
                    console.log(reivew);
                    createform();
                    let tr = document.querySelector('.flex-table tbody tr')
                    tr.innerHTML = `
                        <td>${data.RecordId}</td>
                        <td>${data.Name}</td>
                        <td>${data.Count}</td>
                        <td>${data.Price}</td>
                        <td>${data.Price * data.Count}</td>
                        <td>${data.DealMethod}</td>
                        <td>${data.SentAddress}</td>
                        <td>
                            <button class="check hidden">同意取消</button>
                            <button class="nextstep hidden">商品已寄出</button>
                            <button class="cancel">取消交易</button>
                            <button class="reply">問題回報</button>
                        </td>
                    `;
                    switch (detail.State) {
                        case "待處理": {
                            tr.querySelector('.nextstep').classList.remove('hidden');
                            break;
                        }
                        case "待確認": {
                            break;
                        }
                        case "待評價": {
                            document.querySelector('.form').classList.remove('hidden');
                            break;
                        }
                        case "已取消": {
                            tr.querySelector('.cancel').classList.add('hidden');
                            break;
                        }
                        case "完成交易": {
                            document.querySelector('.form').classList.remove('hidden');
                            tr.querySelector('.cancel').classList.add('hidden');
                            break;
                        }
                    }
                    if (detail.CustomerContent != null && detail.Seller_Agree != 1) {
                        tr.querySelector('.check').classList.remove('hidden');
                        tr.querySelector('.cancel').classList.add('hidden');
                    }
                    tr.querySelector('.check').addEventListener('click', function () {
                        displaymodal2();
                    })
                    tr.querySelector('.nextstep').addEventListener('click', async function () {
                        var temp = {
                            'State': '待確認'
                        }
                        await UpdateDealRecord(nowid, temp);
                        window.location.reload();
                    })
                    tr.querySelector('.cancel').addEventListener('click', function () {
                        displaymodal();
                    })
                    tr.querySelector('.reply').addEventListener('click', function () {
                        displaymodal3();
                    })

                }

            }
        }
    }
}

function createform() {
    let div = document.createElement('div');
    div.classList.add('form')
    div.classList.add('hidden')
    div.innerHTML = `  
    <div class="formerror">
    </div>   
    <div class="formgroup">
        <label for="">評分　　</label>
        <div class="stargroup">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
        </div>
    </div>
    <div class="formgroup">
        <label for="">評價內容</label>
        <textarea></textarea>
    </div>     
    <div class="formgroup btn">
        <button class="nextstep">送出</button>
    </div>                
    `;
    document.querySelector('.right-content').appendChild(div);
    if (reivew && reivew.SellerReview != null) {
        div.querySelector('textarea').innerHTML = reivew.SellerReview;
        div.querySelector('textarea').setAttribute('disabled', 'disabled');
        mark = reivew.SellerScore;
        var array = div.querySelectorAll('.form .stargroup i');
        for (i = 0; i < mark; i++) {
            array[i].style.color = '#ff5100';
        }
        for (j = mark; j < array.length; j++) {
            array[j].style.color = 'black';
        }
        div.querySelector('.btn button').classList.add('hidden')
    }
    else {
        div.querySelector('.btn button').addEventListener('click', function () {
            sendreivew();
        });
        mouseover();
    }


}
// 送出評價
async function sendreivew() {
    var array = document.querySelectorAll('.form .stargroup i');
    var text = document.querySelector('.form textarea').value;
    var count = 0;
    for (i = 0; i < array.length; i++) {
        if (array[i].style.color == "rgb(255, 81, 0)") {
            count++;
        }

    }
    if (count > 1 && text.length > 0) {
        if (reivew.hasOwnProperty('info')) {
            await PostReview2(nowid, count, text);
        }
        else {
            var temp = {
                'SellerReview': text,
                'SellerScore': count
            }
            await PATCHReview(reivew.ReviewId, temp);
        }

        if (reivew.CustomerReview != null) {
            var temp = {
                'State': '完成交易'
            }
            await UpdateDealRecord(nowid, temp);
        }
        window.location.reload();
    }
}
// hover
function mouseover() {
    var array = document.querySelectorAll('.form .stargroup i');
    for (i = 0; i < array.length; i++) {
        array[i].addEventListener('mouseover', function (e) {
            var targetitem = e.target;
            for (i = 0; i < array.length; i++) {
                if (array[i] == targetitem) {
                    for (j = 0; j < array.length; j++) {
                        array[j].style.color = 'black';
                    }
                    for (k = 0; k <= i; k++) {
                        array[k].style.color = '#ff5100';
                    }
                }
            }

        })
        array[i].addEventListener('mouseout', function (e) {
            var targetitem = e.target;
            for (i = 0; i < array.length; i++) {
                if (array[i] == targetitem) {
                    for (j = 0; j < array.length; j++) {
                        array[j].style.color = 'black';
                    }
                    for (k = 0; k < mark; k++) {
                        array[k].style.color = '#ff5100';
                    }
                }
            }

        })
        array[i].addEventListener('click', function (e) {
            var targetitem = e.target;
            for (i = 0; i < array.length; i++) {
                if (array[i] == targetitem) {
                    mark = i + 1;
                    for (j = 0; j < array.length; j++) {
                        array[j].style.color = 'black';
                    }
                    for (k = 0; k <= i; k++) {
                        array[k].style.color = '#ff5100';
                    }
                }
            }

        })
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
    if (detail.SellerContent != null) {
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
                         <textarea type="text" id="content" disabled>${detail.SellerContent}</textarea>
                     </div>
                 </div>
                 <div class="footer">                                             
                     <span class="cancel">關閉</span>
                 </div>
             </div>
        `;
    }
    else {
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
        senddata();
    }
    modal_content = document.querySelector('.modal-content-2');
    closemodal();
    modal_content_event();
}

async function displaymodal2() {
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
                    </ul>                  
                </div> 
            </div>
            <div class="content">
               <div class="formerror">
               </div>             
                <div class="formgroup">
                    <label for="content">取消原因<span class="must">*</span></label>
                    <textarea type="text" id="content" disabled>${detail.CustomerContent}</textarea>
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

async function displaymodal3() {
    modal.classList.remove('hidden');
    modal.innerHTML = `
   <div class="modal-content-2">
            <div class="header">
                <div class="close">
                    <i class="fa-solid fa-xmark"></i>
                </div>                             
                <div class="menu">
                    <ul>
                        <li class="active" id="infoperson">問題回報</li>                      
                </div> 
            </div>
            <div class="content">
               <div class="formerror">
               </div>             
                <div class="formgroup">
                    <label for="pbtitle">問題標題<span class="must">*</span></label>
                    <input type="text" id="pbtitle"></input>
                </div>
                <div class="formgroup">
                    <label for="pbcontent">回報內容<span class="must">*</span></label>
                    <textarea type="text" id="pbcontent"></textarea>
                </div>
            </div>
            <div class="footer">
                <button class="submit" id="submit_d">
                    送出
                </button>                          
                <span class="cancel">取消</span>
            </div>
        </div>
   `;
    modal_content = document.querySelector('.modal-content-2');
    closemodal();
    senddata3();
    modal_content_event();
}

async function displaymodal4() {
    modal.classList.remove('hidden');
    modal.innerHTML = `
   <div class="modal-content-2">
            <div class="header">
                <div class="close">
                    <i class="fa-solid fa-xmark"></i>
                </div>                             
                <div class="menu">
                    <ul>
                        <li class="active" id="infoperson">已寄出商品</li>                      
                </div> 
            </div>
            <div class="content">
               <div class="formerror">
               </div>             
                <div class="formgroup" style="display:flex;justify-content:center;align-items:center;">
                    <h3>請確認商品是否無誤，若沒有任何問題並且確認完畢後，請按領收。</h3>
                </div>
             
            </div>
            <div class="footer" style="display:flex;justify-content:center;align-items:center;">
                <button class="submit" id="submit_d">
                    完成寄送
                </button>                          
                <span class="cancel">取消</span>
            </div>
        </div>
   `;
    modal_content = document.querySelector('.modal-content-2');
    closemodal();
    senddata4();
    modal_content_event();
}


//送出按鈕
function senddata() {
    let btn = document.getElementById('submit_d');

    btn.addEventListener('click', async function () {
        let content = document.querySelector('#content').value;
        if (content.length > 0) {
            document.querySelector('.modal .formerror').innerHTML = '';
            document.querySelector('.modal .formerror').classList.remove('erroractive');
            document.querySelector('.modal .formerror').classList.add('succece');
            document.querySelector('.modal .formerror').innerHTML = '已成功送出請求，請等待賣家回應';
            var temp = {
                'Seller_Agree': 1,
                'SellerContent': content
            }
            await UpdateDealRecord(nowid, temp);
            setTimeout(() => {
                document.querySelector('.modal .formerror').classList.remove('succece');
                document.querySelector('.modal .formerror').innerHTML = '';
                document.querySelector('.modal').classList.toggle('hidden');
            }, 5000);
            window.location.reload();

        }
        else {
            document.querySelector('.modal .formerror').innerHTML = '請說明原因';
            document.querySelector('.modal .formerror').classList.add('erroractive');
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
        window.location.reload();
    })
}

function senddata3() {
    let btn = document.getElementById('submit_d');

    btn.addEventListener('click', async function () {
        let title = document.querySelector('#pbtitle').value;
        let contente = document.querySelector('#pbcontent');
        let content = contente.value;


        if (content.length > 0 && title.length > 0) {
            document.querySelector('.modal .formerror').innerHTML = '';
            document.querySelector('.modal .formerror').classList.remove('erroractive');
            document.querySelector('.modal .formerror').classList.add('succece');
            document.querySelector('.modal .formerror').innerHTML = '已成功送出問題，請等待管理員回應';

            await PostProblem(title, content);
            setTimeout(() => {
                document.querySelector('.modal .formerror').classList.remove('succece');
                document.querySelector('.modal .formerror').innerHTML = '';
                document.querySelector('.modal').classList.toggle('hidden');
            }, 5000);

        }
        else {
            document.querySelector('.modal .formerror').innerHTML = '必填欄位不可為空';
            document.querySelector('.modal .formerror').classList.add('erroractive');
        }
    })

}

function senddata4() {
    let btn = document.getElementById('submit_d');

    btn.addEventListener('click', async function () {
        var temp = {
            'State': '商品確認'
        }
        await UpdateDealRecord(nowid, temp);
        window.location.reload();
    })
}

function compare(a, b) {
    var btn = true;
    if (a != b) btn = false;
    return btn;
}