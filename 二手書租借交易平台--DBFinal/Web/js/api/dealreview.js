
function GetByIdReview(id) {
    var token = getCookie('token');
    return fetch(apidomain + '/dealreviewd/' + id, {
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

function PostReview(id, score, review) {
    const token = getCookie('token');
    var data = new FormData();
    data.append('RecordId', id);
    data.append('CustomerScore', score);
    data.append('CustomerReview', review);
    return fetch(apidomain + '/dealreview', {
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

function PostReview2(id, score, review) {
    const token = getCookie('token');
    var data = new FormData();
    data.append('RecordId', id);
    data.append('SellerScore', score);
    data.append('SellerReview', review);
    return fetch(apidomain + '/dealreview2', {
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

function PATCHReview(id, data) {
    const token = getCookie('token')
    var formBody = []
    var details = data
    for (var property in details) {
        var encodedKey = encodeURIComponent(property)
        var encodedValue = encodeURIComponent(details[property])
        formBody.push(encodedKey + "=" + encodedValue)
    }
    return fetch(apidomain + '/dealreview/' + id, {
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

function DELETEReview(id) {
    const token = getCookie('token');
    return fetch(apidomain + '/dealreview/' + id, {
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