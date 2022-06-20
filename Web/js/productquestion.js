
var question;
var nowreply;
var seller;
initquestion();
async function initquestion() {
    var temp;
    await GetByIdQuestion(pageid).then(r => temp = r);
    console.log(temp);
    const account = getCookie('Account');
    sendtextarea();
    if (account != seller) {
        showtextarea()
    }
    if (temp && temp.hasOwnProperty('data')) {
        question = temp.data;
        loadquestion();
    }
}

function loadquestion() {
    let questionarea = document.querySelector('.question');
    for (i = 0; i < question.length; i++) {
        let div = document.createElement('div');
        div.classList.add('questionbox');
        div.innerHTML = `
            <div class="main">
                <div class="member">
                    <div class="icon">
                        <img src="${(question[i].UserImage != null) ? 'http://localhost:8080/images/Members/' + question[i].UserImage : '../image/membericon.png'}" alt="">
                    </div>
                    <div class="name">
                        ${question[i].UserName}
                    </div>
                </div>
                <div class="q_content">
                    ${question[i].Content}
                </div>
            </div>           
        `;
        if (question[i].Reply != null) {
            let div2 = document.createElement('div');
            div2.classList.add('reply');
            div2.innerHTML = `
            <div class="member">
                <div class="icon">
                    <img src="${(question[i].SellerImage != null) ? 'http://localhost:8080/images/Members/' + question[i].SellerImage : '../image/membericon.png'}" alt="">
                </div>
                <div class="name">
                    ${question[i].SellerName}
                </div>
            </div>
            <div class="q_content">
                ${question[i].Reply}
            </div>
            `;
            div.appendChild(div2);
        }
        else {
            let div2 = document.createElement('div');
            div2.classList.add('reply');
            div2.innerHTML = `
                <input type="hidden" value="${question[i].QuestionId}">
                <button class="replybtn">回覆 <i class="fa-solid fa-reply"></i></button>
            `;
            div2.querySelector('.replybtn').addEventListener('click', function () {
                nowreply = div2.querySelector('input').value;
                showtextarea();
            })
            div.appendChild(div2);
        }
        questionarea.insertBefore(div, questionarea.firstChild);
    }
}


function showtextarea() {
    let box = document.querySelector('.inputbox');
    box.classList.toggle('hidden');
    window.scrollTo(0, document.body.scrollHeight);

}

function sendtextarea() {
    const account = getCookie('Account');
    let btn = document.querySelector('.inputaction #submit');
    if (account == seller) {
        btn.addEventListener('click', async function () {
            let content = document.querySelector('#question_text');
            var content_c = content.value;
            if (content_c.length > 0) {
                document.getElementById('inputboxe').innerHTML = ``;
                var temp = {
                    'Reply': content_c,
                }
                await PATCHQuestion(nowreply, temp);
                window.location.reload();
            }
            else {
                document.getElementById('inputboxe').innerHTML = `請輸入回覆內容!!`;
            }
        });
    }
    else {
        btn.addEventListener('click', async function () {
            let content = document.querySelector('#question_text');
            var content_c = content.value;
            if (content_c.length > 0) {
                await PostQuestion(pageid, content_c);
                window.location.reload();
            }
            else {
                document.getElementById('inputboxe').innerHTML = `請輸入問題內容!!`;
            }
        });
    }

}