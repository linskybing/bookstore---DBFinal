function GetTag() {
    return fetch(apidomain + '/category', {
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
function GetTagRent() {
    return fetch(apidomain + '/categoryforrent', {
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

function PostTag(id, tag) {
    const token = getCookie('token');
    var data = new FormData();
    data.append('CategoryId', tag);
    data.append('ProductId', id);
    return fetch(apidomain + '/tag', {
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

function DeleteTag(id) {
    const token = getCookie('token');
    return fetch(apidomain + '/tag/' + id, {
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

function RecordForChart() {
    return fetch(apidomain + '/dealrforchart', {
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

function RecordForRentChart() {
    return fetch(apidomain + '/dealrforchartr', {
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


// category

function PATCHETag(id, data) {
    const token = getCookie('token');
    var formBody = [];
    var details = data;
    for (var property in details) {
        var encodedKey = encodeURIComponent(property)
        var encodedValue = encodeURIComponent(details[property])
        formBody.push(encodedKey + "=" + encodedValue)
    }
    return fetch(apidomain + '/category/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': token,
        },
        body: formBody.join('&')
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            return data
        })
        .catch(e => {
            console.error('Error:', e)
        })
}

function CreateTag(tag, color) {
    const token = getCookie('token');
    var data = new FormData();
    data.append('Tag', tag);
    data.append('Color', color);
    return fetch(apidomain + '/category', {
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

function DeleteTag(id) {
    const token = getCookie('token');
    return fetch(apidomain + '/category/' + id, {
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
