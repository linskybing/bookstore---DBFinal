function GetByIdQuestion(id) {
    var token = getCookie('token');
    return fetch(apidomain + '/productquestion/' + id, {
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

function PostQuestion(id, content) {
    const token = getCookie('token');
    var data = new FormData();
    data.append('ProductId', id);
    data.append('Content', content);
    return fetch(apidomain + '/productquestion', {
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

function PATCHQuestion(id, data) {
    const token = getCookie('token')
    var formBody = []   
    var details = data
    for (var property in details) {
        var encodedKey = encodeURIComponent(property)
        var encodedValue = encodeURIComponent(details[property])
        formBody.push(encodedKey + "=" + encodedValue)
    }
    return fetch(apidomain + '/productquestion/' + id, {
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

function DELETEQuestion(id) {
    const token = getCookie('token');
    return fetch(apidomain + '/productquestion/' + id, {
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