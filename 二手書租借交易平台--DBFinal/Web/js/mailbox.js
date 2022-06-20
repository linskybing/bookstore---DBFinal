
var problem;
var nowreply;
var nowproblem;

initmailbox();
async function initmailbox() {
    var data;
    await GetUserProblem('p_1').then(r => data = r);
    if (data && data.hasOwnProperty('data')) {
        problem = data.data;
        console.log(problem)
        loadmailbox();
        bindproblem();
    }
    let div = document.createElement('button');
    div.classList.add('problembtn');
    div.innerHTML = `問題回報`;
    div.addEventListener('click', function () {
        displaymodal3();
    })
    document.querySelector('.mailsidebar').appendChild(div);

    document.querySelector('.problembtn').addEventListener('click', function () {
        displaymodal3();
    })
}

function loadmailbox() {
    var tempcount = 0;
    problem.forEach(element => {
        var div = document.createElement('div');
        div.classList.add('mail');
        var content = element.Content;
        var image = getCookie('Image');
        if (content.length > 10) {
            var content = content.substring(0, 10) + "...";
        }

        div.innerHTML = `
        <input type="hidden" value="${element.ProblemId}"/>
        <input id="${element.ProblemId}" type="hidden" value="${tempcount}"/>
        <div class="icon">
            <img src="${(image != '' && image != 'null') ? 'http://localhost:8080/images/Members/' + image : 'http://localhost/image/membericon.png'}" alt="">
        </div>
        <div class="box">
            <div class="title">
                ${element.Title}
            </div>
            <div class="content">
                ${content}
            </div>
        </div>
        `;
        div.addEventListener('click', function () {
            let id = div.querySelector('input').value;
            nowproblem = id;
            document.querySelector('.mail-reply').classList.remove('hidden');
            document.querySelector('.mailcontent .title h2').innerHTML = div.querySelector('.box .title').innerHTML;
            loadcontent(id);
        })

        tempcount++;
        document.querySelector('.mailsidebar').appendChild(div);
    });
}

async function loadcontent(id) {
    var image = getCookie('Image');
    document.querySelector('.mail-inside').innerHTML = `
                        <div id="first">
                            <div class="mail-head">
                                <div class="icon">
                                    <div class="image">
                                        <img src="${(image != '' && image != 'null') ? 'http://localhost:8080/images/Members/' + image : 'http://localhost/image/membericon.png'}" alt="">
                                    </div>
                                    <div class="name">

                                    </div>
                                </div>
                                <div class="date">

                                </div>
                            </div>
                            <div class="mail-inside-content">
                                <p>
                                </p>
                            </div>
                        </div>`;
    let div = document.getElementById('first');
    let img = div.querySelector('.mail-head .icon .image');
    let name = div.querySelector('.mail-head .icon .name');
    let date = div.querySelector('.mail-head .date');
    let index = document.getElementById(id).value;
    let content = div.querySelector('.mail-inside-content p');
    if (getCookie('Image') != 'null' && getCookie('Image')) {
        img.querySelector('img').src = "http://localhost:8080/images/Members/" + getCookie('Image');
        img.classList.remove('hidden');
    }
    name.innerHTML = getCookie('Name') + " (使用者)";
    date.innerHTML = problem[index].CreatedAt;
    content.innerHTML = problem[index].Content;

    var temp;
    await GetProblemReply(problem[index].ProblemId).then(r => temp = r);
    if (temp && temp.hasOwnProperty('data')) {
        nowreply = temp.data;
        nowreply.forEach(e => {
            var image = e.ReplyUserImage;
            let mail = document.createElement('div');
            mail.innerHTML = `
            <div class="mail-head">
                <div class="icon">
                    <div class="image">
                        <img src="${(image) ? 'http://localhost:8080/images/Members/' + image : 'http://localhost/image/membericon.png'}" alt="">
                    </div>
                    <div class="name">
                        ${e.Name}
                    </div>
                </div>
                <div class="date">
                    ${e.CreatedAt}
                </div>
            </div>
            <div class="mail-inside-content">
                <p>
                    ${e.Reply}
                </p>
            </div>
            `;
            if (e.ReplyUser == getCookie('Account')) {
                if (getCookie('Image') != 'null' && getCookie('Image')) {
                    let img = mail.querySelector('.image');
                    let name2 = mail.querySelector('.name');
                    mail.querySelector('img').src = "http://localhost:8080/images/Members/" + getCookie('Image');
                    img.classList.remove('hidden');
                    name2.innerHTML = getCookie('Name') + " (使用者)";
                }
            }
            else {

            }
            document.querySelector('.mail-inside').appendChild(mail);
        })

    }
    console.log(id, index);
}

// 綁定問題回報
function bindproblem() {
    let action = document.querySelector('.mail-reply .footer-action .insert');
    action.addEventListener('click', async function () {
        let content = document.getElementById('reply-textarea');
        let contentvalue = content.value;
        if (contentvalue.length > 0) {
            var e;
            await PostReply(nowproblem, contentvalue).then(r => e = r);
            if (e.hasOwnProperty('ProblemReply')) {
                content.value = ``;
                let mail = document.createElement('div');
                mail.innerHTML = `
                <div class="mail-head">
                    <div class="icon">
                        <div class="image hidden">
                            <img src="" alt="">
                        </div>
                        <div class="name">
                        
                        </div>
                    </div>
                    <div class="date">
                        ${e.CreatedAt}
                    </div>
                </div>
                <div class="mail-inside-content">
                    <p>
                        ${e.Reply}
                    </p>
                </div>
                `;
                if (e.ReplyUser == getCookie('Account')) {
                    if (getCookie('Image') != 'null' && getCookie('Image')) {
                        let img = mail.querySelector('.image');
                        let name2 = mail.querySelector('.name');
                        mail.querySelector('img').src = "http://localhost:8080/images/Members/" + getCookie('Image');
                        img.classList.remove('hidden');
                        name2.innerHTML = getCookie('Name');
                    }
                }
                else {

                }
                document.querySelector('.mail-inside').appendChild(mail);
            }

        }
    })
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
            window.location.reload();

        }
        else {
            document.querySelector('.modal .formerror').innerHTML = '必填欄位不可為空';
            document.querySelector('.modal .formerror').classList.add('erroractive');
        }
    })

}
