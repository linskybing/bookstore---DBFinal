var list;
var tempcount;
var totalpage;
var nowpage = 1;
const pageitem = 10;
// 載入資料
listinit();
async function listinit() {
    var data;
    await GetDealRecord('s_4').then(r => data = r);

    if (data && data.hasOwnProperty('data')) {
        list = getbuy(data.data);
        tempcount = list.length;
        console.log(list);
        loadtransation();
    }
}
function getbuy(data) {
    var temp = [];
    for (i = 0; i < data.length; i++) {
        if (data[i].DealType == 'Buy') {
            temp.push(data[i]);
        }
    }
    return temp;
}

async function loadtransation() {
    if (list) {
        document.querySelector('.product_table').innerHTML = `
        <div class="table_thead">                        
                        <div class="order table_column">
                            訂單編號
                        </div>
                        <div class="p_name table_column_2">
                            商品名稱
                        </div>
                        <div class="d_name table_column">
                            總計
                        </div>
                        <div class="d_date table_column">
                            交易日期
                        </div>
        </div>
        `;
        for (i = 0; i < list.length && i < nowpage * pageitem - 1; i++) {
            let div = document.createElement('a');
            div.href = "transaction_detail.html?id=" + list[i].RecordId;
            div.innerHTML = `
            <div class="table_content table_column_parent">
                <div class="table_column">
                    ${list[i].RecordId}
                </div> 
                <div class="table_column_2">
                ${list[i].Name}
                </div> 
                <div class="table_column">
                ${list[i].Count * list[i].Price}$
                </div>
                <div class="table_column">
                ${list[i].CreatedAt}
                </div> 
            </div>
            `;
            document.querySelector('.product_table').appendChild(div);
        }
        paging()
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
                    <li class="active">${i}</li>
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
}