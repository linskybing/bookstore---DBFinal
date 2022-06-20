
function GetUserProblem(state) {
    var token = getCookie('token');
    return fetch(apidomain + '/problemlistu/' + state, {
        method: 'GET',
        headers: {
            'Authorization': token,
        }
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

function GetProblemReply(id) {
    var token = getCookie('token');
    return fetch(apidomain + '/problemreply/' + id, {
        method: 'GET',
        headers: {
            'Authorization': token,
        }
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


function GetAdminProblem(state) {
    var token = getCookie('token');
    return fetch(apidomain + '/problemlista/' + state, {
        method: 'GET',
        headers: {
            'Authorization': token,
        }
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

function GetByIdProblem(id) {
    var token = getCookie('token');
    return fetch(apidomain + '/problemlist/' + id, {
        method: 'GET',
        headers: {
            'Authorization': token,
        }
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

function PostProblem(Title, content) {
    const token = getCookie('token');
    var data = new FormData();
    data.append('Title', Title);
    data.append('Content', content);
    return fetch(apidomain + '/problemlist', {
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

function PostReply(id, content) {
    const token = getCookie('token');
    var data = new FormData();
    data.append('ProblemId', id);
    data.append('Reply', content);
    return fetch(apidomain + '/problemreply', {
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

function PATCHProblem(id, data) {
    const token = getCookie('token')
    var formBody = []
    var details = data
    for (var property in details) {
        var encodedKey = encodeURIComponent(property)
        var encodedValue = encodeURIComponent(details[property])
        formBody.push(encodedKey + "=" + encodedValue)
    }
    return fetch(apidomain + '/problemlist/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': token,
        },
        body: formBody.join('&')
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.hasOwnProperty('info')) return true;
            return false;
        })
        .catch(e => {
            console.error('Error:', e)
        })
}

function DELETEProblem(id) {
    const token = getCookie('token');
    return fetch(apidomain + '/problemlist/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': token,
        },
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