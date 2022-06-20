var constdata = null;
var taglist;
var tempcount;
const pageitem = 10;
var totalpage;
var nowpage = 1;

initTag();
async function initTag() {
    if (!constdata) {
        var data;
        await GetTag().then(r => data = r);
        document.querySelector('.tag2').addEventListener('click', function () {
            displaymodal3()
        })
        if (data && data.hasOwnProperty('data')) {
            constdata = data.data;
            taglist = [...constdata];
            tempcount = taglist.length;
            console.log(taglist);
            paging();
            loadTag();
        }
    }
    else {
        paging();
        loadTag();
    }


}

function loadTag() {
    if (taglist) {
        var data = taglist;
        document.querySelector('.content-table tbody').innerHTML = ``;
        for (i = (nowpage - 1) * pageitem; i < (nowpage) * pageitem && i < tempcount; i++) {
            let item = document.createElement('tr');
            item.classList.add('item');
            var onIndex = i;
            item.innerHTML = `                   
                    <td>
                        <div class="text">${data[i].CategoryId}</div>
                    </td>
                    <td>
                        <div class="text">${data[i].Tag}</div>
                    </td>
                    <td>
                        <div class="text">
                            <div class="tag"></div>
                        </div>
                    </td>
                    <td>
                        <div class="text">
                        <input class="index" type="hidden" value="${onIndex}"/>
                        <span class="insert btnspan" id="editbtn_${onIndex}"><i class="fa-solid fa-pen-to-square"></i></span>
                        <span class="delete btnspan" id="deletebtn_${onIndex}"><i class="fa-solid fa-trash-can"></i></span>
                        </div>
                    </td>              
            `;
            item.querySelector('.insert').addEventListener('click', function (e) {
                let element = e.target;
                let index = document.querySelectorAll('.insert i');
                for (j = 0; j < index.length; j++) {
                    if (index[j] == element) {
                        let value = index[j].parentElement.parentElement.querySelector('input').value;
                        displaymodal(value);
                    }
                }
            })
            item.querySelector('.delete').addEventListener('click', function (e) {
                let element = e.target;
                let index = document.querySelectorAll('.delete i');
                for (j = 0; j < index.length; j++) {
                    if (index[j] == element) {
                        let value = index[j].parentElement.parentElement.querySelector('input').value;
                        displaymodal2(value);
                    }
                }
            })
            item.querySelector('.tag').style.background = data[i].Color;
            document.querySelector('.content-table tbody').appendChild(item);
        }
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
                    initTag();
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
                    initTag();
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
                    initTag();
                })
            }
        }
    }
}

// modal
let modal = document.querySelector(".modal");
let modal_content;

modal.addEventListener("click", function (e) {
    let element = e.target;
    if (element == modal) {
        modal.classList.toggle("hidden");
    }
});

//關閉modal
function closemodal() {
    let close = document.querySelector(".modal .close2");
    close.addEventListener("click", function () {
        modal.classList.add("hidden");
    });

    let cancel = document.querySelector(".modal .cancel");
    cancel.addEventListener("click", function () {
        modal.classList.add("hidden");
    });
}

//modal事件
function modal_content_event() {
    modal_content.display = "flex";
    modal_content.classList.toggle("open");
}


async function displaymodal(itemindex) {
    modal.classList.remove('hidden');
    modal.innerHTML = `
   <div class="modal-content-2">
            <div class="header">
                <div class="close2">
                    <i class="fa-solid fa-xmark"></i>
                </div>                             
                <div class="menu">
                    <ul>
                        <li class="active" id="infoperson">修改標籤</li>                      
                </div> 
            </div>
            <div class="content2">
               <div class="formerror">
               </div>             
                <div class="formgroup">
                    <label for="name">標籤名稱<span class="must">*</span></label>
                    <input type="text" id="name" value="${taglist[itemindex].Tag}"></input>
                </div>
                <div class="formgroup">
                    <label for="color">標籤色票<span class="must">*</span></label>
                    <input type="color" id="color" value="${taglist[itemindex].Color}"/>
                </div>
            </div>
            <div class="footer">
                <button class="submit" id="submit_d">
                    送出
                </button>                          
                <span class="cancel">取消</span>
            </div>
        </div>
   `;
    modal_content = document.querySelector('.modal-content-2');
    closemodal();
    senddata(itemindex);
    modal_content_event();
}

async function displaymodal2(itemindex) {
    modal.classList.remove('hidden');
    modal.innerHTML = `
   <div class="modal-content-2">
            <div class="header">
                <div class="close2">
                    <i class="fa-solid fa-xmark"></i>
                </div>   
            </div>
            <div class="content2" style=" display:flex;align-items:center;flex-direction: column;">
                <div class="formerror">
               </div> 
              <h3>確定是否要刪除該標籤?</h3>
            </div>
            <div class="footer"  style=" display:flex;justify-content:center;">
                <button class="submit" id="submit_d">
                    確定
                </button>                          
                <span class="cancel">取消</span>
            </div>
        </div>
   `;
    modal_content = document.querySelector('.modal-content-2');
    closemodal();
    senddata2(itemindex);
    modal_content_event();
}
// insert
async function displaymodal3(itemindex) {
    modal.classList.remove('hidden');
    modal.innerHTML = `
   <div class="modal-content-2">
            <div class="header">
                <div class="close2">
                    <i class="fa-solid fa-xmark"></i>
                </div>                             
                <div class="menu">
                    <ul>
                        <li class="active" id="infoperson">修改標籤</li>                      
                </div> 
            </div>
            <div class="content2">
               <div class="formerror">
               </div>             
                <div class="formgroup">
                    <label for="name">標籤名稱<span class="must">*</span></label>
                    <input type="text" id="name" value=""></input>
                </div>
                <div class="formgroup">
                    <label for="color">標籤色票<span class="must">*</span></label>
                    <input type="color" id="color" value=""/>
                </div>
            </div>
            <div class="footer">
                <button class="submit" id="submit_d">
                    送出
                </button>                          
                <span class="cancel">取消</span>
            </div>
        </div>
   `;
    modal_content = document.querySelector('.modal-content-2');
    closemodal();
    senddata3(itemindex);
    modal_content_event();
}

function senddata(itemindex) {
    let btn = document.getElementById('submit_d');

    btn.addEventListener('click', async function () {
        let name = document.querySelector('#name').value;
        let color = document.querySelector('#color').value;

        if (name.length > 0 && color.length > 0) {
            if (checkexist(name, itemindex)) {

                var temp = {
                    Tag: name,
                    Color: color
                }
                var r;
                await PATCHETag(taglist[itemindex].CategoryId, temp).then(res => r = res);
                if (r && r.hasOwnProperty('error')) {
                    document.querySelector('.modal .formerror').innerHTML = r.error;
                    document.querySelector('.modal .formerror').classList.add('erroractive');
                }
                else {
                    document.querySelector('.modal .formerror').innerHTML = '';
                    document.querySelector('.modal .formerror').classList.remove('erroractive');
                    document.querySelector('.modal .formerror').classList.add('succece');
                    document.querySelector('.modal .formerror').innerHTML = '修改成功';
                    setTimeout(() => {
                        document.querySelector('.modal .formerror').classList.remove('succece');
                        document.querySelector('.modal .formerror').innerHTML = '';
                        document.querySelector('.modal').classList.toggle('hidden');
                        window.location.reload();
                    }, 2000);
                }

            }
            else {
                document.querySelector('.modal .formerror').innerHTML = '標籤名稱不可重複';
                document.querySelector('.modal .formerror').classList.add('erroractive');
            }


        }
        else {
            document.querySelector('.modal .formerror').innerHTML = '必填欄位不可為空';
            document.querySelector('.modal .formerror').classList.add('erroractive');
        }
    })

}
// delete
function senddata2(itemindex) {
    let btn = document.getElementById('submit_d');

    btn.addEventListener('click', async function () {

        var r
        await DeleteTag(taglist[itemindex].CategoryId).then(res => r = res);
        if (r && r.hasOwnProperty('error')) {
            document.querySelector('.modal .formerror').innerHTML = r.error;
            document.querySelector('.modal .formerror').classList.add('erroractive');
        }
        else {
            window.location.reload();
        }
    });
}

function senddata3(itemindex) {
    let btn = document.getElementById('submit_d');

    btn.addEventListener('click', async function () {
        let name = document.querySelector('#name').value;
        let color = document.querySelector('#color').value;

        if (name.length > 0 && color.length > 0) {
            if (checkexist(name, itemindex)) {
                document.querySelector('.modal .formerror').innerHTML = '';
                document.querySelector('.modal .formerror').classList.remove('erroractive');
                document.querySelector('.modal .formerror').classList.add('succece');
                document.querySelector('.modal .formerror').innerHTML = '新增成功';

                await CreateTag(name, color);
                setTimeout(() => {
                    document.querySelector('.modal .formerror').classList.remove('succece');
                    document.querySelector('.modal .formerror').innerHTML = '';
                    document.querySelector('.modal').classList.toggle('hidden');
                }, 5000);
                //window.location.reload();
            }
            else {
                document.querySelector('.modal .formerror').innerHTML = '標籤名稱不可重複';
                document.querySelector('.modal .formerror').classList.add('erroractive');
            }


        }
        else {
            document.querySelector('.modal .formerror').innerHTML = '必填欄位不可為空';
            document.querySelector('.modal .formerror').classList.add('erroractive');
        }
    })

}

function checkexist(string, index = null) {
    var btn = true;

    if (taglist) {
        for (i = 0; i < taglist.length; i++) {
            if (taglist[i].Tag == string && index && taglist[index].Tag != string) {
                btn = false;
            }
        }
    }
    return btn;
}