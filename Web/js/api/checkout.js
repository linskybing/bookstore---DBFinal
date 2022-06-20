function Order(id, way, phone, address, type) {
    const token = getCookie('token');
    var data = new FormData()
    data.append('ShoppingId', id);
    data.append('State', '待處理');
    data.append('DealMethod', way);
    data.append('SentAddress', address);
    data.append('Phone', phone);
    data.append('DealType', type);
    return fetch(apidomain + '/dealr', {
        method: 'POST',
        headers: {
            'Authorization': token,
        },
        body: data
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
