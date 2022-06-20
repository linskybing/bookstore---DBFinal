const itemnum = 10;
var chatpage = 1;
function GetUserChatroom() {
    var token = getCookie('token');
    return fetch(apidomain + '/chatroomc/null', {
        method: 'GET',
        headers: {
            'Authorization': token,
        }
    })
        .then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(e => {
            console.error('Error:', error)
        })
}

function GetSellerChatroom() {
    var token = getCookie('token');
    return fetch(apidomain + '/chatrooms/null', {
        method: 'GET',
        headers: {
            'Authorization': token,
        }
    })
        .then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(e => {
            console.error('Error:', error)
        })
}

function UpdateSellerChatroom(search) {
    var token = getCookie('token');
    return fetch(apidomain + '/chatrooms/' + search, {
        method: 'GET',
        headers: {
            'Authorization': token,
        }
    })
        .then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(e => {
            console.error('Error:', error)
        })
}

function UpdateUsersChatroom(search) {
    var token = getCookie('token');
    return fetch(apidomain + '/chatroomc/' + search, {
        method: 'GET',
        headers: {
            'Authorization': token,
        }
    })
        .then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(e => {
            console.error('Error:', error)
        })
}

function GetChatrecord(id, chatpage, itemnum) {
    var token = getCookie('token');
    return fetch(apidomain + '/chatroomr/' + id + '/' + chatpage + '/' + itemnum, {
        method: 'GET',
        headers: {
            'Authorization': token,
        }
    })
        .then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(e => {
            console.error('Error:', error)
        })
}

function GetRoomDetail(id) {
    var token = getCookie('token');
    return fetch(apidomain + '/chatroom/' + id, {
        method: 'GET',
        headers: {
            'Authorization': token,
        }
    })
        .then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(e => {
            console.error('Error:', error)
        })
}

function PostMessage(id, message) {
    var token = getCookie('token');
    var data = new FormData();
    data.append('RoomId', id);
    data.append('Message', message);
    fetch(apidomain + '/chatroomr', {
        method: 'POST',
        headers: {
            'Authorization': token,
        },
        body: data,
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            return res;
        })
        .catch(e => {
            console.error('Error:', error)
        })
}

function UpdateMessgae(id, time) {
    var token = getCookie('token');
    if (time == null) time = "0000-00-00 00:00:00";
    return fetch(apidomain + '/chatroomrrefresh/' + id + '/' + time.replace(' ', '_'), {
        method: 'GET',
        headers: {
            'Authorization': token,
        }
    })
        .then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(e => {
            console.error('Error:', error)
        })
}

function ChatCount(id) {
    var token = getCookie('token');
    return fetch(apidomain + '/chatroomrcount/' + id, {
        method: 'GET',
        headers: {
            'Authorization': token,
        }
    })
        .then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(e => {
            console.error('Error:', error)
        })
}

function CreateChatroom(seller) {
    var token = getCookie('token');
    var data = new FormData();
    data.append('Seller', seller);
    fetch(apidomain + '/chatroom', {
        method: 'POST',
        headers: {
            'Authorization': token,
        },
        body: data,
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            return res;
        })
        .catch(e => {
            console.error('Error:', error)
        })
}