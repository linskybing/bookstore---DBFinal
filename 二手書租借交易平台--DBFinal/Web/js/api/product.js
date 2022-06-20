
function GetSellerProduct(state) {
    var token = getCookie('token');
    return fetch(apidomain + '/products/' + state, {
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

function MutiSearch(url) {
    var token = getCookie('token');
    return fetch(apidomain + '/mutisearch?' + url, {
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

function MutiSearchRent(url) {
    var token = getCookie('token');
    return fetch(apidomain + '/mutisearchr?' + url, {
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

function GetRecomment(id, state) {
    var token = getCookie('token');
    return fetch(apidomain + '/product/' + id + '/' + state, {
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

function GetSellerProductRent(state) {
    var token = getCookie('token');
    return fetch(apidomain + '/productsr/' + state, {
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

function GetAllProduct() {
    var token = getCookie('token');
    return fetch(apidomain + '/product', {
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

function GetAllProductForrent() {
    var token = getCookie('token');
    return fetch(apidomain + '/product_rent', {
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

function GetSingle(id) {
    var token = getCookie('token');
    return fetch(apidomain + '/product/' + id, {
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

function UpdateProductInfo(data, id) {
    const token = getCookie('token')
    var formBody = []
    var details = data
    for (var property in details) {
        var encodedKey = encodeURIComponent(property)
        var encodedValue = encodeURIComponent(details[property])
        formBody.push(encodedKey + "=" + encodedValue)
    }
    return fetch(apidomain + '/product/' + id, {
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

function Uploadpimg(id) {
    const token = getCookie('token');
    var fileinput = new FormData()
    var inputs = document.querySelectorAll('.type-fill input[type="file"]');
    for (i = 0; i < inputs.length - 1; i++) {
        fileinput.append('file[]', inputs[i].files[0], inputs[i].files[0].name);
    }
    return fetch(apidomain + '/productimage/' + id, {
        method: 'POST',
        headers: {
            'Authorization': token,
        },
        body: fileinput
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

function InsertProduct(data) {
    const token = getCookie('token');
    var sdata = new FormData()
    Object.entries(data).forEach(([key, value]) => {
        sdata.append(key, value);
    })
    console.log(sdata);
    return fetch(apidomain + '/product', {
        method: 'POST',
        headers: {
            'Authorization': token,
        },
        body: sdata
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

function InsertProductRent(data) {
    const token = getCookie('token');
    var sdata = new FormData()
    Object.entries(data).forEach(([key, value]) => {
        sdata.append(key, value);
    })
    console.log(sdata);
    return fetch(apidomain + '/productr', {
        method: 'POST',
        headers: {
            'Authorization': token,
        },
        body: sdata
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

function DeleteProduct(id) {
    const token = getCookie('token');
    return fetch(apidomain + '/product/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': token,
        },
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

function DeleteImg(id) {
    const token = getCookie('token');
    return fetch(apidomain + '/productimage/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': token,
        },
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

function AddtoCart(id, count, type) {
    const token = getCookie('token');
    var sdata = new FormData()
    sdata.append('ProductId', id);
    sdata.append('Count', count);
    sdata.append('Type', type);
    console.log(sdata);
    return fetch(apidomain + '/list', {
        method: 'POST',
        headers: {
            'Authorization': token,
        },
        body: sdata
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

function InCart(id) {
    const token = getCookie('token');
    return fetch(apidomain + '/incart/' + id, {
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

function DeleteCartItem(id) {
    const token = getCookie('token');
    return fetch(apidomain + '/list/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': token,
        },
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

