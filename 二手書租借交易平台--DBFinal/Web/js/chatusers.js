var chatroomlistforuser;
var chatroomlistforseller;
var roomchat = [];
console.log(document.querySelector('.option .active'));
//設定聊天室事件
function CreateChatroomE() {
    const searchBar = document.querySelector(".users .search input"),
        searchBtn = document.querySelector(".users .search button");
    if (searchBtn) {
        searchBtn.addEventListener('click', function () {
            searchBar.classList.toggle("active");
            searchBar.focus();
            searchBtn.classList.toggle("active");

        })
        searchBar.setAttribute('onkeyup', "UpdateUsersList(" + searchBar.id + ")")
    }
}
function CreateChatroomE2() {
    const searchBar = document.querySelector(".users .search input"),
        searchBtn = document.querySelector(".users .search button");
    if (searchBtn) {
        searchBtn.addEventListener('click', function () {
            searchBar.classList.toggle("active");
            searchBar.focus();
            searchBtn.classList.toggle("active");

        })
        searchBar.setAttribute('onkeyup', "UpdateSellerList(" + searchBar.id + ")")
    }
}
//綁定wrapper事件
function BindWrapperEvent() {
    document.querySelector('.chaticon').addEventListener('click', function () {
        document.querySelector('.wrapper').classList.toggle('close');
    })
}

//綁定跳轉賣家聊天室事件
function BindSelleroption() {
    document.querySelector('.selleroption').addEventListener('click', function (e) {
        document.querySelector('.useroption').classList.remove('active');
        e.target.classList.add('active');
        chatroom2();
    })
}

//綁定跳轉賣家事件
function BindUseroption() {
    document.querySelector('.useroption').addEventListener('click', function (e) {
        document.querySelector('.selleroption').classList.remove('active');
        e.target.classList.add('active');
        chatroom();
    })
}

//取得使用者列表
async function ChatroomForUser() {
    let image = getCookie('Image');
    let Name = getCookie('Name');
    let chatitem = document.createElement('div')
    chatitem.classList.add('chatitem');
    chatitem.innerHTML = `
    <div class="chaticon">
    <i class="fa-solid fa-comment-dots"></i>
    </div>
    <div class="wrapper close">
    <section class="users">
        <header>
            <div class="chat-content">
                <img src="${(image != '' && image != 'null') ? 'http://localhost:8080/images/Members/' + image : 'http://localhost/image/membericon.png'}" alt="">
                <div class="details">
                    <span>${Name}</span>
                    <p>在線中</p>
                </div>                
            </div>    
            <div style="font-size: 12px;color: #468669;padding-right:20px;"><i class="fas fa-circle"></i></div>          
        </header>
        <div class="option">
                <div class="useroption active">
                    我是買家
                </div>
                <div class="selleroption">
                    我是賣家
                </div>
        </div>
        <div class="search">
            <span class="text">選擇使用者開始聊天</span>
            <input type="text" placeholder="搜尋使用者" id="searchuser">
            <button>
                <i class="fas fa-search"></i>
            </button>
        </div>
        <div class="users-list">
        </div>
        
    </section>
    </div>
    `
    document.querySelector('body').appendChild(chatitem);

    var data;
    await GetUserChatroom().then(r => data = r);
    chatroomlistforuser = data;
    if (data.hasOwnProperty('data')) {

        let chatitem = document.createElement('div');
        chatitem.classList.add('chatitem');
        let userlist = document.createElement('div');
        userlist.classList.add('users-list');
        data.data.forEach(ele => {
            let a = document.createElement('a');
            a.id = ele.RoomId;
            a.innerHTML = `
            <div class="chat-content">
                <img src="${(ele.SellerImage == null) ? 'http://localhost/image/membericon.png' : 'http://localhost:8080/images/Members/' + ele.SellerImage}" alt="">
                <div class="details">
                    <span>${ele.Seller}</span>
                    <p>${(ele.Message == null) ? '' : ele.Message}</p>
                </div>
            </div>
            <div class="status-dot ${(ele.SellerActive == 1) ? '' : 'offline'}"><i class="fas fa-circle"></i></div>
            `;
            a.setAttribute('onclick', 'EnterChatroom(' + ele.RoomId + ')');
            userlist.appendChild(a);
        });
        document.querySelector('.users .users-list').innerHTML = userlist.innerHTML;
    }
    BindSelleroption();
}

//更新使用者列表
function UpdateUsersList(search) {
    var templist = [];
    let chatitem = document.createElement('div');
    chatitem.classList.add('chatitem');
    let userlist = document.createElement('div');
    userlist.classList.add('users-list');

    if (chatroomlistforuser.hasOwnProperty('data')) {
        chatroomlistforuser.data.forEach(ele => {
            if (ele.Seller == search.value || search.value == '') {
                templist.push(ele);
            }
        })
    }
    templist.forEach(ele => {
        let a = document.createElement('a');
        a.id = ele.RoomId;
        a.innerHTML = `
                    <div class="chat-content">
                        <img src="${(ele.SellerImage == null) ? 'http://localhost/image/membericon.png' : 'http://localhost:8080/images/Members/' + ele.SellerImage}" alt="">
                        <div class="details">
                            <span>${ele.Seller}</span>
                            <p>${(ele.Message == null) ? '' : ele.Message}</p>
                        </div>
                    </div>
                    <div class="status-dot ${(ele.SellerActive == 1) ? '' : 'offline'}"><i class="fas fa-circle"></i></div>
                    `;
        a.setAttribute('onclick', 'EnterChatroom(' + ele.RoomId + ')');
        userlist.appendChild(a);
    })
    document.querySelector('.users .users-list').innerHTML = userlist.innerHTML;
}
/*
var token = getCookie('token');
    let searchtearm = search.value;
    if (searchtearm == '') searchtearm = 'null';
    let xhr = new XMLHttpRequest();
    xhr.open("GET", apidomain + '/chatroomc/' + searchtearm, true);
    xhr.setRequestHeader('Authorization', token);
    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = xhr.response;
                data = JSON.parse(data);
                console.log(data);
                if (data.hasOwnProperty('data')) {
                    let chatitem = document.createElement('div');
                    chatitem.classList.add('chatitem');
                    let userlist = document.createElement('div');
                    userlist.classList.add('users-list');
                    data.data.forEach(ele => {
                        let a = document.createElement('a');
                        a.id = ele.RoomId;                        
                        a.innerHTML = `
                        <div class="chat-content">
                            <img src="${(ele.SellerImage == null) ? '../image/membericon.png' : 'http://localhost:8080/images/Members/' + ele.SellerImage}" alt="">
                            <div class="details">
                                <span>${ele.Seller}</span>
                                <p>${(ele.Message == null) ? '' : ele.Message}</p>
                            </div>
                        </div>
                        <div class="status-dot ${(ele.SellerActive == 1) ? '' : 'offline'}"><i class="fas fa-circle"></i></div>
                        `;
                        a.setAttribute('onclick', 'EnterChatroom(' + ele.RoomId + ')');
                        userlist.appendChild(a);
                    });
                    document.querySelector('.users .users-list').innerHTML = userlist.innerHTML;
                }                
            }
        }
    }
    xhr.send();
 */


//更新賣家使用者列表
function UpdateSellerList(search) {
    var templist = [];
    let chatitem = document.createElement('div');
    chatitem.classList.add('chatitem');
    let userlist = document.createElement('div');
    userlist.classList.add('users-list');
    console.log(chatroomlistforseller)
    if (chatroomlistforseller.hasOwnProperty('data')) {
        chatroomlistforseller.data.forEach(ele => {
            if (ele.Seller == search.value || search.value == '') {
                templist.push(ele);
            }
        })
    }
    templist.forEach(ele => {
        let a = document.createElement('a');
        a.id = ele.RoomId;
        a.innerHTML = `
                    <div class="chat-content">
                        <img src="${(ele.SellerImage == null) ? 'http://localhost/image/membericon.png' : 'http://localhost:8080/images/Members/' + ele.SellerImage}" alt="">
                        <div class="details">
                            <span>${ele.Seller}</span>
                            <p>${(ele.Message == null) ? '' : ele.Message}</p>
                        </div>
                    </div>
                    <div class="status-dot ${(ele.SellerActive == 1) ? '' : 'offline'}"><i class="fas fa-circle"></i></div>
                    `;
        a.setAttribute('onclick', 'EnterChatroom(' + ele.RoomId + ')');
        userlist.appendChild(a);
    })
    document.querySelector('.users .users-list').innerHTML = userlist.innerHTML;
}


var Roomid;
var time;
var count = 0;
//進入聊天室
function EnterChatroom(id) {
    Roomid = id;
    if (roomchat[id] != null) time = roomchat[id][0].CreatedAt;
    ChatDetail(id);
    GetChatCount(id);
}

async function GetChatCount(id) {

    await ChatCount(id).then(r => count = r);

    console.log(count);

}

//聊天室
async function ChatDetail(id) {
    let data;
    if (roomchat[id] == null) {
        await GetChatrecord(id, chatpage, itemnum).then(r => data = r);
        roomchat[id] = data;
        if (roomchat[id].data != null) {
            roomchat[id].data = roomchat[id].data.reverse();
        }

    }
    let item = document.querySelector('.wrapper');
    let active = document.querySelector('.option .active');
    let option = active.classList[0];
    if (option == 'selleroption') {
        var room = "chatroom2()";
        var img = roomchat[id][0].UserImage;
        var name = roomchat[id][0].User;
        var activeperson = roomchat[id][0].UserActive;
    }
    else {
        var room = "chatroom()";
        var img = roomchat[id][0].SellerImage;
        var name = roomchat[id][0].Seller;
        var activeperson = roomchat[id][0].SellerActive;
    }
    item.innerHTML = `
    <section class="chat-area">
        <header>
            <a href="#" class="back-icon" onclick="${room}"><i class="fas fa-arrow-left"></i></a>
            <img src="${(img != null) ? 'http://localhost:8080/images/Members/' + img : 'http://localhost/image/membericon.png'}" alt="">
            <div class="details">
                <span>${name}</span>
                <p>${(activeperson == 1) ? '在線中<span style="display:inline;font-size: 12px;color: #468669;padding:1px 15px;"><i class="fas fa-circle"></i></span>' : '離線<span style="display:inline;font-size: 12px;color: #ccc;padding:1px 15px;"><i class="fas fa-circle"></i></span>'}</p>
            </div>
        </header>        
        <div class="chat-box">           
        </div>
        <form action="#" class="typing-area">
            <input type="text" placeholder="輸入訊息">
            <button><i class="fa-solid fa-paper-plane"></i></button>
        </form>
    </section>`;
    if (roomchat[id].data != null) {
        var token = getCookie('Account');
        time = roomchat[id][0].CreatedAt;
        data = roomchat[id].data
        let box = document.querySelector('.chat-box');

        data.forEach(ele => {
            let div = document.createElement('div');
            if (ele.Creator == token) {
                div.classList.add('chat');
                div.classList.add('outgoing');
                div.innerHTML = `
                <div class="details">
                    <p>${ele.Message}</p>
                </div>
                `;
            }
            else {
                div.classList.add('chat');
                div.classList.add('incoming');
                div.innerHTML = `
                <img src="${(ele.Image == null) ? 'http://localhost/image/membericon.png' : 'http://localhost:8080/images/Members/' + ele.Image}" alt="">
                <div class="details">
                    <p>${(ele.DeletedAt != "0000-00-00 00:00:00") ? '已收回訊息' : ele.Message}</p>
                </div>
                `;
            }
            box.appendChild(div);
        });
        box.scrollTop = box.scrollHeight;
    }
    BindChatInterval();
    let typearea = document.querySelector('.typing-area button').addEventListener('click', function (e) {
        e.preventDefault();
        let message = document.querySelector('.typing-area input').value;
        document.querySelector('.typing-area input').value = '';
        if (message != '') PostMessage(id, message);
        setTimeout(function () { }, 200);
    });

    let divscorll = document.querySelector('.chat-box').addEventListener('scroll', function (e) {
        if (e.target.scrollTop == 0) {
            DynamicChat();
        }
    })

}
var intervalID;
var interval2;
var isrefreshuserlist = false;
var isrefreshsellerlist = true;
function BindChatInterval() {
    intervalID = setInterval("RefreshChat()", 1000);
}

function BindListInterval(type) {
    interval2 = setInterval("RefreshChat()", 1000);
}

async function DynamicChat() {
    if (roomchat[Roomid].data.length < count) {
        chatpage += 1;
        let data;
        await GetChatrecord(Roomid, chatpage, itemnum).then(r => data = r);
        if (data.hasOwnProperty('data')) {
            let temp = data.data;
            let tempold = roomchat[Roomid].data;
            for (i = 0; i < temp.length; i++) {
                tempold[temp.length + i] = tempold[i];
                tempold[i] = temp[i];
                InsertChat(temp[i]);
            }
            roomchat[Roomid].data = tempold;
            console.log(tempold);
        }
    }
}

function InsertChat(ele) {

    let container = document.querySelector('.chat-box');
    let div = document.createElement('div');
    let token = getCookie('Account');
    if (ele.Creator == token) {
        div.classList.add('chat');
        div.classList.add('outgoing');
        div.innerHTML = `
            <div class="details">
                <p>${ele.Message}</p>
            </div>
            `;
    }
    else {
        div.classList.add('chat');
        div.classList.add('incoming');
        div.innerHTML = `
            <img src="${(ele.Image == null) ? 'http://localhost/image/membericon.png' : 'http://localhost:8080/images/Members/' + ele.Image}" alt="">
            <div class="details">
                <p>${(ele.DeletedAt != "0000-00-00 00:00:00") ? '已收回訊息' : ele.Message}</p>
            </div>
            `;
    }
    container.insertBefore(div, container.firstChild);

}

async function RefreshChat() {
    let data;
    await UpdateMessgae(Roomid, time).then(r => data = r);
    if (data.hasOwnProperty('data') && data.data != null) {
        var token = getCookie('Account');
        data = data.data.reverse();
        let box = document.querySelector('.chat-box');
        isrefreshuserlist = true;
        data.forEach(ele => {
            let div = document.createElement('div');
            count += 1;
            if (ele.CreatedAt > time || time == null) {
                time = ele.CreatedAt;
                roomchat[Roomid][0].CreatedAt = ele.CreatedAt;
            }
            if (roomchat[Roomid].data == null) roomchat[Roomid].data = [];
            roomchat[Roomid].data.push(ele);
            if (ele.Creator == token) {
                div.classList.add('chat');
                div.classList.add('outgoing');
                div.innerHTML = `
                 <div class="details">
                     <p>${ele.Message}</p>
                 </div>
                 `;
            }
            else {
                div.classList.add('chat');
                div.classList.add('incoming');
                div.innerHTML = `
                 <img src="${(ele.Image == null) ? 'http://localhost:8080/image/membericon.png' : 'http://localhost:8080/images/Members/' + ele.Image}" alt="">
                 <div class="details">
                     <p>${(ele.DeletedAt != "0000-00-00 00:00:00") ? '已收回訊息' : ele.Message}</p>
                 </div>
                 `;
            }
            box.appendChild(div);
            if (box.scrollHeight / 4 - box.scrollTop < 200) box.scrollTop = box.scrollHeight;
        });
    }
}



async function chatroom() {
    Roomid = null;
    count = 0;
    time = null;
    chatpage = 1;
    let image = getCookie('Image');
    let Name = getCookie('Name');
    clearInterval(intervalID);
    let item = document.querySelector('.wrapper').innerHTML = `  
    <section class="users">
        <header>
            <div class="chat-content">
                <img src="${(image != '' && image != 'null') ? 'http://localhost:8080/images/Members/' + image : 'http://localhost:8080/image/membericon.png'}" alt="">
                <div class="details">
                    <span>${Name}</span>
                    <p>在線中</p>                    
                </div>
            </div> 
            <div style="font-size: 12px;color: #468669;padding-right:20px;"><i class="fas fa-circle"></i></div>                
        </header>
        <div class="option">
                <div class="useroption active">
                    我是買家
                </div>
                <div class="selleroption">
                    我是賣家
                </div>
        </div>
        <div class="search">
            <span class="text">選擇使用者開始聊天</span>
            <input type="text" placeholder="搜尋使用者" id="searchuser">
            <button>
                <i class="fas fa-search"></i>
            </button>
        </div>
        <div class="users-list">
        </div>        
    </section>
    `;
    if (isrefreshuserlist) {
        var data;
        await GetUserChatroom().then(r => data = r);
        chatroomlistforuser = data;
        isrefreshuserlist = false;
    }
    var data = chatroomlistforuser;
    if (data.hasOwnProperty('data')) {
        let chatitem = document.createElement('div');
        chatitem.classList.add('chatitem');
        let userlist = document.createElement('div');
        userlist.classList.add('users-list');
        data.data.forEach(ele => {
            let a = document.createElement('a');
            a.id = ele.RoomId;
            a.innerHTML = `
            <div class="chat-content">
                <img src="${(ele.SellerImage == null) ? 'http://localhost:8080/image/membericon.png' : 'http://localhost:8080/images/Members/' + ele.SellerImage}" alt="">
                <div class="details">
                    <span>${ele.Seller}</span>
                    <p>${(ele.Message == null) ? '' : ele.Message}</p>
                </div>
            </div>
            <div class="status-dot ${(ele.SellerActive == 1) ? '' : 'offline'}"><i class="fas fa-circle"></i></div>
            `;
            a.setAttribute('onclick', 'EnterChatroom(' + ele.RoomId + ')');
            userlist.appendChild(a);
        });
        document.querySelector('.users .users-list').innerHTML = userlist.innerHTML;
    }
    CreateChatroomE();
    BindSelleroption();
}

async function chatroom2() {
    Roomid = null;
    count = 0;
    time = null;
    chatpage = 1;
    let image = getCookie('Image');
    let Name = getCookie('Name');
    clearInterval(intervalID);
    let item = document.querySelector('.wrapper').innerHTML = `  
    <section class="users">
        <header>
            <div class="chat-content">
                <img src="${(image != '' && image != 'null') ? 'http://localhost:8080/images/Members/' + image : 'http://localhost:8080/image/membericon.png'}" alt="">
                <div class="details">
                    <span>${Name}</span>
                    <p>在線中</p>                    
                </div>
            </div> 
            <div style="font-size: 12px;color: #468669;padding-right:20px;"><i class="fas fa-circle"></i></div>                
        </header>
        <div class="option">
                <div class="useroption">
                    我是買家
                </div>
                <div class="selleroption active">
                    我是賣家
                </div>
        </div>
        <div class="search">
            <span class="text">選擇使用者開始聊天</span>
            <input type="text" placeholder="搜尋使用者" id="searchuser">
            <button>
                <i class="fas fa-search"></i>
            </button>
        </div>
        <div class="users-list">
        </div>        
    </section>
    `;
    if (isrefreshsellerlist) {
        var data;
        await GetSellerChatroom().then(r => data = r);
        chatroomlistforseller = data;
        isrefreshsellerlist = false;
    }
    var data = chatroomlistforseller;
    if (data.hasOwnProperty('data')) {
        let chatitem = document.createElement('div');
        chatitem.classList.add('chatitem');
        let userlist = document.createElement('div');
        userlist.classList.add('users-list');
        data.data.forEach(ele => {
            let a = document.createElement('a');
            a.id = ele.RoomId;
            a.innerHTML = `
            <div class="chat-content">
                <img src="${(ele.UserImage == null) ? 'http://localhost:8080/image/membericon.png' : 'http://localhost:8080/images/Members/' + ele.UserImage}" alt="">
                <div class="details">
                    <span>${ele.User}</span>
                    <p>${(ele.Message == null) ? '' : ele.Message}</p>
                </div>
            </div>
            <div class="status-dot ${(ele.UserActive == 1) ? '' : 'offline'}"><i class="fas fa-circle"></i></div>
            `;
            a.setAttribute('onclick', 'EnterChatroom(' + ele.RoomId + ')');
            userlist.appendChild(a);
        });
        document.querySelector('.users .users-list').innerHTML = userlist.innerHTML;
    }
    CreateChatroomE2();
    BindUseroption();
}