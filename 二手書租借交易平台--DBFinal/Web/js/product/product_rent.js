var category;
var templist2;
var productlist;
var templist;
var nowpage = 1;
var totalpage;
var productcount;
var tempcount;
var pageitem = 10;
getcategory();
getproduct();
priceselect();
sortselect();
async function getcategory() {
    urlparams = geturlobject();
    var data;
    await GetTag().then(r => data = r);

    if (data.hasOwnProperty('data')) {
        category = data.data;
    }
    Object.entries(category).forEach((key, value) => {
        var tag = document.createElement('div');
        tag.classList.add('tag');
        if (urlparams.hasOwnProperty('Category')) {
            var list = urlparams.Category.split(',');
            list.forEach(e => {
                if (e == category[value].Tag) {
                    tag.classList.add('active');
                }
            })
        }
        tag.innerHTML = `       
            <input id="c_${category[value].Tag}" type="hidden" value="${category[value].Tag}">            
            ${category[value].Tag}        
        `;
        tag.addEventListener('click', function () {
            let c = this.querySelector('input').value;
            if (this.classList.contains('active')) {

                if (urlparams.Category) {
                    let cstring = urlparams.Category;
                    if (cstring.search(',' + c) != -1) cstring = cstring.replace(',' + c, '');
                    else if (cstring.search(c + ',') != -1) cstring = cstring.replace(c + ',', '');
                    else if (cstring.search(c) != -1) cstring = cstring.replace(c, '');
                    urlparams.Category = cstring;
                    if (urlparams.Category.length <= 0) {
                        delete urlparams.Category;
                    }
                }
                this.classList.toggle('active');
            }
            else {
                if (!urlparams.Category) {
                    Object.assign(urlparams, {
                        Category: c
                    });
                }
                else {
                    Object.assign(urlparams, {
                        Category: urlparams.Category + "," + c
                    });
                }
                this.classList.toggle('active');
            }

            var paramstr = objtoparam(urlparams);
            if (paramstr.length > 0) {
                paramstr = '?' + paramstr;
                window.location.href = geturi() + paramstr;
            }
            else {
                window.location.href = geturi();
            }
        })
        document.querySelector('.category-select').appendChild(tag);
    })
}

function priceselect() {
    if (urlparams.hasOwnProperty('Price')) {
        var list = urlparams.Price.split(',');
        let priceselect = document.querySelectorAll('.price-select .tag');

        list.forEach(e => {
            for (j = 0; j < priceselect.length; j++) {
                if (e == priceselect[j].id) {
                    priceselect[j].classList.add('active');
                }
            }
        })
    }
    let priceselect = document.querySelectorAll('.price-select .tag');
    for (i = 0; i < priceselect.length; i++) {
        priceselect[i].addEventListener('click', function () {
            let c = this.id;

            if (this.classList.contains('active')) {

                if (urlparams.Price) {
                    let cstring = urlparams.Price;
                    if (cstring.search(',' + c) != -1) cstring = cstring.replace(',' + c, '');
                    else if (cstring.search(c + ',') != -1) cstring = cstring.replace(c + ',', '');
                    else if (cstring.search(c) != -1) cstring = cstring.replace(c, '');
                    urlparams.Price = cstring;
                    if (urlparams.Price.length <= 0) {
                        delete urlparams.Price;
                    }
                }
                this.classList.toggle('active');
            }
            else {
                if (!urlparams.Price) {
                    Object.assign(urlparams, {
                        Price: c
                    });
                }
                else {
                    Object.assign(urlparams, {
                        Price: urlparams.Price + "," + c
                    });
                }
                this.classList.toggle('active');
            }

            var paramstr = objtoparam(urlparams);
            if (paramstr.length > 0) {
                paramstr = '?' + paramstr;
                window.location.href = geturi() + paramstr;
            }
            else {
                window.location.href = geturi();
            }
        })
    }
}

function sortselect() {
    if (urlparams.hasOwnProperty('Sort')) {
        var list = urlparams.Sort.split(',');
        let priceselect = document.querySelectorAll('.sort-select .tag');

        list.forEach(e => {
            for (j = 0; j < priceselect.length; j++) {
                if (e == priceselect[j].id) {
                    priceselect[j].classList.add('active');
                }
            }
        })
    }
    let priceselect = document.querySelectorAll('.sort-select .tag');
    for (i = 0; i < priceselect.length; i++) {
        priceselect[i].addEventListener('click', function () {
            let c = this.id;

            if (this.classList.contains('active')) {

                if (urlparams.Sort) {
                    let cstring = urlparams.Sort;
                    if (cstring.search(',' + c) != -1) cstring = cstring.replace(',' + c, '');
                    else if (cstring.search(c + ',') != -1) cstring = cstring.replace(c + ',', '');
                    else if (cstring.search(c) != -1) cstring = cstring.replace(c, '');
                    urlparams.Sort = cstring;
                    if (urlparams.Sort.length <= 0) {
                        delete urlparams.Sort;
                    }
                }
                this.classList.toggle('active');
            }
            else {
                if (!urlparams.Sort) {
                    Object.assign(urlparams, {
                        Sort: c
                    });
                }
                else {
                    Object.assign(urlparams, {
                        Sort: urlparams.Sort + "," + c
                    });
                }
                this.classList.toggle('active');
            }

            var paramstr = objtoparam(urlparams);
            if (paramstr.length > 0) {
                paramstr = '?' + paramstr;
                window.location.href = geturi() + paramstr;
            }
            else {
                window.location.href = geturi();
            }
        })
    }
}
async function getproduct() {
    var data;
    await MutiSearchRent(geturlparams()).then(r => data = r);
    if (data.hasOwnProperty('data') && data.data != null) {
        constlist = data.data;
        productlist = constlist;
        productcount = productlist.length;
        templist = productlist;
        templist2 = productlist;
        tempcount = productcount;
        paging();
    }

}
//分頁
function paging() {
    totalpage = Math.ceil((tempcount / pageitem));
    let page = document.querySelector('.page ul');
    page.innerHTML = ``;
    for (i = -6; i < tempcount + 5; i++) {
        if (i > 0 && i <= totalpage) {
            if (nowpage == 1 && i == 1) {
                let li = document.createElement('li');
                li.classList.add("no-drap");
                li.innerHTML = `                
                    <span>
                        <i class="fa-solid fa-angle-left">
                        </i>
                    </span>               
                `;
                page.appendChild(li);
            }
            else if (i == 1) {
                let li = document.createElement('li');
                li.innerHTML = `                
                    <span id="pre">
                        <i class="fa-solid fa-angle-left">
                        </i>
                    </span>               
                `;
                page.appendChild(li);
                document.getElementById('pre').addEventListener('click', function () {
                    nowpage = nowpage - 1;
                    paging();
                })
            }
            if (i == nowpage) {
                let li = document.createElement('li');
                li.innerHTML = `                
                <span>
                    <li class="active"><span>${i}</span></li>
                </span>               
                 `;
                page.appendChild(li);
            }
            else {
                let li = document.createElement('li');
                li.innerHTML = `                
                <span>
                    <li id="page-${i}"><span>${i}</span></li>
                </span>               
                 `;
                page.appendChild(li);
                document.getElementById('page-' + i).addEventListener('click', function () {
                    nowpage = this.id[this.id.indexOf('-') + 1];
                    paging();
                })
            }
            if (nowpage == totalpage && i == totalpage) {
                let li = document.createElement('li');
                li.classList.add("no-drap");
                li.innerHTML = `                
                    <span>
                        <i class="fa-solid fa-angle-right">
                        </i>
                    </span>               
                `;
                page.appendChild(li);
            }
            else if (i == totalpage) {
                let li = document.createElement('li');
                li.innerHTML = `                
                    <span id="next">
                        <i class="fa-solid fa-angle-right">
                        </i>
                    </span>               
                `;
                page.appendChild(li);

                document.getElementById('next').addEventListener('click', function () {
                    nowpage += 1;
                    paging();
                })
            }
        }
    }
    pageproduct(templist);
}
//分頁資料
function pageproduct(templist) {
    let productblock = document.querySelector('.product');
    productblock.innerHTML = ``;
    for (i = (nowpage - 1) * pageitem; i < nowpage * pageitem; i++) {
        if (i < tempcount) {
            let nowdata = templist[i];
            let div = document.createElement('div');
            div.classList.add('item');
            div.innerHTML = `
                        <a href="product_rent.html?id=${nowdata.ProductId}">
                            <img src="${(nowdata.Image != null) ? "http://localhost:8080/images/Products/" + nowdata.Image[0].Image : "https://imagepng.org/wp-content/uploads/2019/08/google-chrome-icon-1.png"}"
                                alt="" width="250px" height="250px">
                        </a>
                        <div class="detail">
                            <div class="p-title">${nowdata.Name}</div>
                            <div class="p-category">            
                                <div class="p-price">${nowdata.RentPrice}  NT/天</div>                
                                <span class="cart add ${(nowdata.InCart == 0) ? '' : 'hidden'}">
                                    <i class="fa-solid fa-cart-arrow-down"></i>                                  
                                </span>
                                <span class="cart2 remove ${(nowdata.InCart != 0) ? '' : 'hidden'}">                                
                                    <i class="fa-solid fa-cart-arrow-down"></i> 
                                </span>
                            </div>
                           
                        </div>
            `;
            let add = div.querySelector('.add');
            let remove = div.querySelector('.remove');
            add.addEventListener('click', async function () {
                if (money < nowdata.Price) {
                    displaypaymodal(nowdata);
                }
                else {
                    await AddtoCart(nowdata.ProductId, 1, 'Buy');

                    var incart;
                    await InCart(nowdata.ProductId).then(r => incart = r);
                    if (incart) {
                        add.classList.toggle('hidden');
                        remove.classList.toggle('hidden');
                    }
                }
            })
            remove.addEventListener('click', async function () {
                await DeleteCartItem(nowdata.ProductId);
                var incart;
                await InCart(nowdata.ProductId).then(r => incart = r);
                if (!incart) {
                    add.classList.toggle('hidden');
                    remove.classList.toggle('hidden');
                }
            })
            productblock.appendChild(div);
        }
    }
}


// function sortbyprice(type) {
//     for (i = 0; i < templist.length; i++) {
//         for (j = 0; j < templist.length - i - 1; j++) {
//             if (sort(type, templist[j].RentPrice, templist[j + 1].RentPrice)) {
//                 var temp = templist[j];
//                 templist[j] = templist[j + 1]
//                 templist[j + 1] = temp;
//             }
//         }
//     }
// }

// function sort(type, a, b) {
//     let btn = false;
//     if (type == 'DESC') {
//         if (a < b) {
//             btn = true;
//         }
//     }
//     else {
//         if (a > b) {
//             btn = true;
//         }
//     }
//     return btn;
// }

// //設定option事件
// function setoption() {
//     let select = document.querySelector('select');
//     select.addEventListener('change', function () {
//         let option = document.querySelectorAll('option');
//         option.forEach(e => {
//             if (e.selected) {
//                 switch (e.value) {
//                     case "依價格高到低排序":
//                         sortbyprice('DESC');
//                         paging();
//                         break;
//                     case "依價格低到高排序":
//                         sortbyprice('ASC');
//                         paging();
//                     case "依日期排序":
//                     case "依觀看數排序":
//                 }
//             }
//         })
//     })
// }

// //篩選類別
// function categoryselect(category) {
//     templist = [];
//     Object.entries(productlist).forEach((key, value) => {
//         var data = productlist[value].Category;
//         if (data) {
//             var count = data.length;
//             for (i = 0; i < count; i++) {
//                 if (data[i].Tag == category) {
//                     templist.push(productlist[value]);
//                 }
//             }
//         }

//     });
//     templist2 = templist;
//     tempcount = templist.length;
//     let option = document.querySelectorAll('option');
//     option.forEach(e => {
//         if (e.selected) {
//             switch (e.value) {
//                 case "依價格高到低排序":
//                     sortbyprice('DESC');
//                     paging();
//                     break;
//                 case "依價格低到高排序":
//                     sortbyprice('ASC');
//                     paging();
//                 case "依日期排序":
//                 case "依觀看數排序":
//             }
//         }
//     })
//     paging();
// }
bindsearch();
function bindsearch() {
    let input = document.getElementById('searchproduct');
    input.addEventListener('keyup', function () {
        let text = this.value;
        searchproduct(text);
    })
}

function searchproduct(search) {
    nowpage = 1;
    templist = templist2;
    var temp = [];
    for (i = 0; i < templist.length; i++) {
        if (templist[i].Name.search(search) >= 0) {
            temp.push(templist[i]);
        }
    }
    templist = temp;
    tempcount = temp.length;
    paging();
}



// setoption()
