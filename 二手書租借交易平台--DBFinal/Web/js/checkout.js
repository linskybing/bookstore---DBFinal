async function temp() {
    var data;
    await getAccount().then(r => data = r)
    console.log(data);

    document.querySelector('#name2').value = data.Name;
    document.querySelector('#email').value = data.Email;
}
temp();

var cartlist;
var total = 0;
async function cartjsinit() {
    var data;
    await GetUserCart().then(r => data = r);
    if (data.hasOwnProperty('data')) {
        cartlist = data.data;
        console.log(data.data);
        loadcart();

    }
}

function loadcart() {
    let ul = document.querySelector('.order_info_group ul');
    if (cartlist.length > 0) {
        var total = 0;
        for (i = 0; i < cartlist.length; i++) {
            var priceper = (cartlist[i].Type == "Rent") ? cartlist[i].RentPrice : cartlist[i].Price;
            let li = document.createElement('li');
            li.classList.add('order_info');
            li.classList.add('commodity');
            li.innerHTML = `
            <span>
            ${cartlist[i].Name}
            </span>
            <span>${cartlist[i].Count}${(cartlist[i].Type == 'Buy') ? "(本)" : "(天)"}</span>
            <span>$${priceper * cartlist[i].Count}</span>
            `;
            total += priceper * cartlist[i].Count;
            ul.appendChild(li);
        }
        let li = document.createElement('li');
        li.classList.add('order_info');
        li.innerHTML = `
            <label>總計</label>
            <span>$${total}</span>
            `;
        ul.appendChild(li);
        document.querySelector('.submit').addEventListener('click', async function () {
            let address = document.querySelector('#address_info');
            let phone = document.querySelector('#phone');
            let radio = document.getElementsByName('way');
            let check;
            for (i = 0; i < radio.length; i++) {
                if (radio[i].checked) {
                    check = radio[i].value;
                }
            }
            if (address.value.length > 0 && phone.value > 0) {
                for (i = 0; i < cartlist.length; i++) {
                    var data = {
                        'State': '下訂單'
                    }
                    var re;
                    await Order(cartlist[i].ShoppingId, check, phone.value, address.value, cartlist[i].Type).then(r => re = r);
                    if (!re.hasOwnProperty('error')) {

                        await UpdateCart(cartlist[i].ShoppingId, data);
                        window.location.href = 'transaction_history.html'
                    }
                }

            }
            else {
                alert('必填欄位不可為空');
            }
        })
    }
}
cartjsinit();
