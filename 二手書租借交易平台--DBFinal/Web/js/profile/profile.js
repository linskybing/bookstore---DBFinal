
//帳號
let validmeesage = {
   oldpassword: '舊密碼不可為空',
   password: '密碼不可為空',
   passwordcheck: '確認密碼不可為空',
};
var userdata;
async function temp() {

   await getAccount().then(r => userdata = r)
   data = userdata;
   console.log(userdata);

   document.querySelector('#name span').innerHTML = getCookie('Name');
   document.querySelector('#accountinfo').innerHTML = data.Account;
   document.querySelector('#emailinfo').innerHTML = data.Email;
   document.querySelector('#address').innerHTML = data.Address;
   document.querySelector('#nameinfo').innerHTML = data.Name;
}
temp();

document.getElementById('click-modal-name').addEventListener('click', function () {

   displaymodal();
})
document.getElementById('click-modal-address').addEventListener('click', function () {

   displaymodal();
})

document.getElementById('click-modal-password').addEventListener('click', function () {

   displaymodal();
})

function displaymodal() {
   modal.classList.remove('hidden');
   modal.innerHTML = `
   <div class="modal-content">
            <div class="header">
                <div class="close">
                    <i class="fa-solid fa-xmark"></i>
                </div>
                <div class="modal-title">
                    <h3>更新個人資訊</h3>
                </div>
                <div class="menu">
                    <ul>
                        <li class="active" id="infoperson">修改資訊</li>
                        <li id="passwordbtn">修改密碼</li>
                    </ul>
                </div>
            </div>
            <div class="content">
               <div class="formerror">
               </div>
                <div class="formgroup">
                    <label for="editname">姓名<span class="must">*</span></label>
                    <input type="text" id="editname" value="${userdata.Name}">
                </div>
                <div class="formgroup">
                    <label for="editaddress">地址<span class="must">*</span></label>
                    <input type="text" id="editaddress" value="${(userdata.Address != null) ? userdata.Address : ''}">
                </div>
            </div>
            <div class="footer">
                <button class="submit" id="submit_d">
                    更新資料
                </button>
                <button class="submit hidden" id="submit_p">
                  更新資料
               </button>
                <span class="cancel">取消</span>
            </div>
        </div>
   `;
   console.log(userdata.Address);
   modal_content = document.querySelector('.modal-content');
   closemodal();
   senddata();
   modal_password_info();
   modal_person_info();
   modal_content_event();
}

function modal_password_info() {
   let passwordbtn = document.getElementById('passwordbtn');
   passwordbtn.addEventListener('click', function () {
      let content = document.querySelector('.modal .content');
      content.innerHTML = `
                  <div class="formerror">
                  </div>
                   <div class="formgroup">
                       <label for="oldpassword">舊密碼<span class="must">*</span></label>
                       <input type="password" id="oldpassword" value="">
                   </div>
                   <div class="formgroup">
                       <label for="newpassword">新密碼<span class="must">*</span></label>
                       <input type="password" id="newpassword" value="">
                   </div>
                   <div class="formgroup">
                   <label for="checkpassword">密碼確認<span class="must">*</span></label>
                   <input type="password" id="checkpassword" value="">
      `;
      document.querySelector('.menu .active').classList.remove('active');
      document.querySelector('.menu #passwordbtn').classList.add('active');
      document.querySelector('#submit_d').classList.add('hidden');
      document.querySelector('#submit_p').classList.remove('hidden');
   })
}
function modal_person_info() {
   let infoperson = document.getElementById('infoperson');
   infoperson.addEventListener('click', function () {
      let content = document.querySelector('.modal .content');
      content.innerHTML = `
      <div class="formerror">
      </div>
       <div class="formgroup">
           <label for="editname">姓名<span class="must">*</span></label>
           <input type="text" id="editname" value="${userdata.Name}">
       </div>
       <div class="formgroup">
           <label for="editaddress">地址<span class="must">*</span></label>
           <input type="text" id="editaddress" value="${userdata.Address}">
       </div>
      `;
      document.querySelector('.menu .active').classList.remove('active');
      document.querySelector('.menu #infoperson').classList.add('active');
      document.querySelector('#submit_p').classList.add('hidden');
      document.querySelector('#submit_d').classList.remove('hidden');
   })
}

//送出按鈕
function senddata() {
   let btn = document.getElementById('submit_d');

   btn.addEventListener('click', async function () {
      let formerror = document.querySelector('.modal .formerror');
      var name = document.getElementById('editname').value;
      var address = document.getElementById('editaddress').value;
      if (name.length > 0 && address.length > 0) {
         var re;
         await UserUpdatedata(name, address).then(r => re = r);
         if (re) {
            if (re.hasOwnProperty('info')) {
               formerror.innerHTML = `更新成功`;
               formerror.classList.remove('erroractive');
               formerror.classList.add('succece');
               setCookie('Name', name);
               temp();
            }
            else {
               formerror.innerHTML = `更新失敗`;
               formerror.classList.add('erroractive');
            }

         }

      }
      else {
         formerror.classList.add('erroractive');
         document.querySelector('.formerror').innerHTML = `必填欄位不可為空`;
      }
   })
   let btn2 = document.getElementById('submit_p');
   btn2.addEventListener('click', async function () {
      let formerror = document.querySelector('.modal .formerror');
      var opassword = document.getElementById('oldpassword').value;
      var npassword = document.getElementById('newpassword').value;
      var cpassword = document.getElementById('checkpassword').value;
      if (opassword.length > 0 && npassword.length > 0 && npassword.length > 0) {
         if (compare(npassword, cpassword)) {
            var re;
            await UpdatePassword(opassword, npassword).then(r => re = r);
            if (re) {
               if (re.hasOwnProperty('info')) {
                  formerror.innerHTML = `更新成功`;
                  formerror.classList.remove('erroractive');
                  formerror.classList.add('succece');
                  setCookie('Name', name);
                  temp();
               }
               else {
                  formerror.innerHTML = `更新失敗`;
                  formerror.classList.add('erroractive');
               }

            }
         }
         else {
            formerror.classList.add('erroractive');
            document.querySelector('.formerror').innerHTML = `兩次密碼輸入不一致`;
         }

      }
      else {
         formerror.classList.add('erroractive');
         formerror.innerHTML = `必填欄位不可為空`;
      }
   })
}


function compare(a, b) {
   var btn = true;
   if (a != b) btn = false;
   return btn;
}

document.getElementById('filein').addEventListener('change', function (e) {
   view_upload_image(e);
   Uploadimg();
})


function view_upload_image(e) {
   e = e.target;
   var x = new FileReader;
   x.readAsDataURL(e.files[0]);

   x.onloadend = function () {
      document.querySelector('.membericon .icon img').src = this.result;
   }
}