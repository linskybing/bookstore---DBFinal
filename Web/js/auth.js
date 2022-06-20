var role;
var tempcount;
const pageitem = 10;
var totalpage;
var nowpage = 1;

var nowrolearray = [];

initRole();
async function initRole() {
    if (!role) {
        var data;
        await GetRole().then(r => data = r);

        document.querySelector('.function-btn .tag2').addEventListener('click', function () {
            displaymodal3();
        })
        if (data) {
            role = data;
            tempcount = role.length;
            loadrole();
            paging();
        }
    }
    else {
        loadrole();
        paging();
    }

}



function loadrole() {
    if (role) {
        var data = role;
        let tableblock = document.querySelector('.tableblock');
        tableblock.innerHTML = `
        <table class="content-table">
            <thead>
            <th class="table-item">角色編號</th>
            <th class="table-item">角色名稱</th>
            <th class="table-item">操作</th>
            </thead>
            <tbody>
            </tbody>
        </table>
        `;
        tableblock.querySelector('.content-table tbody').innerHTML = ``;
        for (i = (nowpage - 1) * pageitem; i < (nowpage) * pageitem && i < tempcount; i++) {
            let item = document.createElement('tr');
            item.classList.add('item');
            var onIndex = i;
            item.innerHTML = `                   
                    <td>
                        <div class="text">${data[i].RoleId}</div>
                    </td>
                    <td>
                        <div class="text">${data[i].RoleName}</div>
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
                        break;
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
            if (data[i].Count > 0) {
                item.querySelector('.delete').remove();
            }
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

function permissionArray(data) {
    nowrolearray = [];
    var array = [0, 0, 0, 0, 0];
    if (data) {
        for (j = 0; j < data.length; j++) {
            if (data[j].FunctionName == "公告管理") array[0] = 1;
            if (data[j].FunctionName == "商品種類管理") array[1] = 1;
            if (data[j].FunctionName == "權限管理") array[2] = 1;
            if (data[j].FunctionName == "問題回報") array[3] = 1;
            if (data[j].FunctionName == "報表分析") array[4] = 1;
        }
    }
    nowrolearray = array;
    return array;
}


function displaymodal(itemindex) {
    var array = permissionArray(role[itemindex].Data);
    modal.classList.remove('hidden');
    modal.innerHTML = `
   <div class="modal-content-2">
            <div class="header">
                <div class="close2">
                    <i class="fa-solid fa-xmark"></i>
                </div>                             
                <div class="menu">
                    <ul>
                        <li class="active" id="infoperson">修改角色</li>                      
                </div> 
            </div>
            <div class="content2">
               <div class="formerror">
               </div>             
                <div class="formgroup">
                    <label for="name">角色名稱<span class="must">*</span></label>
                    <input type="text" id="name" value="${role[itemindex].RoleName}"></input>
                </div>
               <div class="formgroup">
                   <lable class="label" for=""}>角色權限　　</lable>
               </div>
               <div class="formgroup">
                 <div class="checkboxgroup">                   
                    <input id="p_1" type="checkbox" value="1" ${array[0] ? 'checked' : ''}/>
                    <lable class="label" for="p_1">公告管理</lable>
                </div>
                <div class="checkboxgroup">                   
                    <input id="p_2" type="checkbox" value="2" ${array[1] ? 'checked' : ''}/>
                    <lable class="label" for="p_2" >商品種類管理</lable>
                </div>
                <div class="checkboxgroup">                   
                    <input id="p_3" type="checkbox" value="3" ${array[2] ? 'checked' : ''}/>
                    <lable class="label" for="p_3">權限管理</lable>
                </div>
                <div class="checkboxgroup">                   
                    <input id="p_4" type="checkbox" value="4" ${array[3] ? 'checked' : ''}/>
                    <lable class="label" for="p_4">問題回報</lable>
                </div>
                <div class="checkboxgroup">                   
                    <input id="p_5" type="checkbox" value="5" ${array[4] ? 'checked' : ''}/>
                    <lable class="label" for="p_5">報表分析</lable>
                </div>
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

async function getpermissionlist(itemindex) {
    let checkboxes = document.querySelectorAll('.checkboxgroup input');
    var insertlist = [];
    var deletelist = [];
    for (i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked && nowrolearray[i] == 0) {
            insertlist.push(checkboxes[i].value);
        }
        else if (!checkboxes[i].checked && nowrolearray[i] == 1) {
            deletelist.push(checkboxes[i].value);
        }
    }
    console.log(deletelist, insertlist);

    for (i = 0; i < insertlist.length; i++) {
        await PostPermisson(role[itemindex].RoleId, insertlist[i]);
    }

    for (i = 0; i < deletelist.length; i++) {
        await DELETEPermisson(role[itemindex].RoleId, deletelist[i]);
    }

}

function senddata(itemindex) {
    let btn = document.getElementById('submit_d');

    btn.addEventListener('click', async function () {
        let name = document.querySelector('#name').value;


        if (name.length > 0) {

            var r;

            var temp = {
                RoleName: name
            }
            await PATCHRole(role[itemindex].RoleId, temp);
            await getpermissionlist(itemindex);


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
        else {
            document.querySelector('.modal .formerror').innerHTML = '必填欄位不可為空';
            document.querySelector('.modal .formerror').classList.add('erroractive');
        }
    })

}

function displaymodal2(itemindex) {
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
              <h3>確定是否要刪除該角色?</h3>
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
// delete
function senddata2(itemindex) {
    let btn = document.getElementById('submit_d');

    btn.addEventListener('click', async function () {

        var r
        await DELETERole(role[itemindex].RoleId).then(res => r = res);
        if (r && r.hasOwnProperty('error')) {
            document.querySelector('.modal .formerror').innerHTML = r.error;
            document.querySelector('.modal .formerror').classList.add('erroractive');
        }
        else {
            window.location.reload();
        }
    });
}

function displaymodal3() {
    modal.classList.remove('hidden');
    modal.innerHTML = `
   <div class="modal-content-2">
            <div class="header">
                <div class="close2">
                    <i class="fa-solid fa-xmark"></i>
                </div>                             
                <div class="menu">
                    <ul>
                        <li class="active" id="infoperson">新增角色</li>                      
                </div> 
            </div>
            <div class="content2">
               <div class="formerror">
               </div>             
                <div class="formgroup">
                    <label for="name">角色名稱<span class="must">*</span></label>
                    <input type="text" id="name" value=""></input>
                </div>
               <div class="formgroup">
                   <lable class="label" for=""}>角色權限　　</lable>
               </div>
               <div class="formgroup">
                 <div class="checkboxgroup">                   
                    <input id="p_1" type="checkbox" value="1" />
                    <lable class="label" for="p_1">公告管理</lable>
                </div>
                <div class="checkboxgroup">                   
                    <input id="p_2" type="checkbox" value="2"/>
                    <lable class="label" for="p_2" >商品種類管理</lable>
                </div>
                <div class="checkboxgroup">                   
                    <input id="p_3" type="checkbox" value="3" />
                    <lable class="label" for="p_3">權限管理</lable>
                </div>
                <div class="checkboxgroup">                   
                    <input id="p_4" type="checkbox" value="4"/>
                    <lable class="label" for="p_4">問題回報</lable>
                </div>
                <div class="checkboxgroup">                   
                    <input id="p_5" type="checkbox" value="5"/>
                    <lable class="label" for="p_5">報表分析</lable>
                </div>
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
    senddata3();
    modal_content_event();
}

function senddata3() {
    let btn = document.getElementById('submit_d');

    btn.addEventListener('click', async function () {
        let name = document.querySelector('#name').value;

        if (name.length > 0) {
            var temp;
            await PostRole(name).then(r => temp = r);
            if (temp && !temp.hasOwnProperty('error')) {
                document.querySelector('.modal .formerror').innerHTML = '';
                document.querySelector('.modal .formerror').classList.remove('erroractive');
                document.querySelector('.modal .formerror').classList.add('succece');
                document.querySelector('.modal .formerror').innerHTML = '新增成功';
                let a_id = role.length;
                role[a_id] = temp;
                permissionArray([]);
                getpermissionlist(a_id);
                console.log(temp);

                setTimeout(() => {
                    document.querySelector('.modal .formerror').classList.remove('succece');
                    document.querySelector('.modal .formerror').innerHTML = '';
                    document.querySelector('.modal').classList.toggle('hidden');
                }, 2000);
            }
            else {
                document.querySelector('.modal .formerror').innerHTML = '新增錯誤';
                document.querySelector('.modal .formerror').classList.add('erroractive');
            }

        }
        else {
            document.querySelector('.modal .formerror').innerHTML = '必填欄位不可為空';
            document.querySelector('.modal .formerror').classList.add('erroractive');
        }
    })
}