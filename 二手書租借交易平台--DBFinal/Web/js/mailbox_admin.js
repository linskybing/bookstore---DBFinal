
var problem;
var nowreply;
var nowproblem;
initmailbox();
async function initmailbox() {
    var data;
    await GetAdminProblem('p_1').then(r => data = r);
    if (data && data.hasOwnProperty('data')) {
        problem = data.data;
        console.log(problem)
        loadmailbox();
        bindproblem();
    }
}

function loadmailbox() {
    var tempcount = 0;
    problem.forEach(element => {
        var image = element.PostUserImage;
        var div = document.createElement('div');
        div.classList.add('mail');
        var content = element.Content;

        if (content.length > 10) {
            var content = content.substring(0, 10) + "...";
        }

        div.innerHTML = `
        <input type="hidden" value="${element.ProblemId}"/>
        <input id="${element.ProblemId}" type="hidden" value="${tempcount}"/>
        <div class="icon">
            <img src="${(image) ? 'http://localhost:8080/images/Members/' + image : 'http://localhost/image/membericon.png'}" alt="">
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

    document.querySelector('.mail-inside').innerHTML = `
                        <div id="first">
                            <div class="mail-head">
                                <div class="icon">
                                    <div class="image">
                                        <img src="http://localhost/image/membericon.png" alt="">
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
    let postimage = problem[index].PostUserImage;
    if (postimage) {
        img.querySelector('img').src = 'http://localhost:8080/images/Members/' + postimage;
        img.classList.remove('hidden');
    }
    name.innerHTML = problem[index].PostUser + " (使用者)";
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
                    name2.innerHTML = getCookie('Name');
                }
            }
            else {
                if (getCookie('Image') != 'null' && getCookie('Image')) {
                    let img = mail.querySelector('.image');
                    let name2 = mail.querySelector('.name');
                    mail.querySelector('img').src = "http://localhost:8080/images/Members/" + image;
                    img.classList.remove('hidden');
                    name2.innerHTML = getCookie('Name');
                }
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