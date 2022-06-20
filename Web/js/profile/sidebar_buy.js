let leftsidebar = document.querySelector(".left-sidebar ul");
var money;
var balance;
//modal
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
  let close = document.querySelector(".modal .close");
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

inithead();
async function inithead() {
  var data;
  await GetBalance().then((r) => (data = r));
  if (data && data.hasOwnProperty("Code1")) {
    money = data.Code1;
    balance = data.Code2;
    if (balance != 1) {
      var buyer2 = document.getElementById("seller_m");
      buyer2.remove();
      let li = document.createElement("li");
      li.id = balance;
      li.innerHTML = "賣家刊登費";

      li.addEventListener("click", function () {
        displaypaymodal();
      });
      leftsidebar.appendChild(li);
    }
  }
}

if (token == "") {
  window.location.href = "index.html";
}

function displaypaymodal() {
  modal.classList.remove("hidden");
  modal.innerHTML = `
    <div class="modal-content-2">
             <div class="header">
                 <div class="close">
                     <i class="fa-solid fa-xmark"></i>
                 </div>
                 <div class="modal-title">
                     <h3>繳納刊登費</h3>
                 </div>
                 <div class="menu">
                     <ul>
                         <li class="active" id="infoperson">刊登費</li>                         
                     </ul>
                 </div>
             </div>
             <div class="content">
                <div class="formerror">
                </div>
                <div class="formgroup">
                    <label for="payid">付款編號</label>　
                    <input type="text" id="fee" value="${getCookie(
                      "Account"
                    )}057426" disabled>
                </div>
                 <div class="formgroup">
                     <label for="fee">金額(元)</label>　
                     <input type="text" id="fee" value="300" disabled>
                 </div>
                 <div class="formgroup">
                     <label for="cardid">信用卡號<span class="must">*</span></label>　
                     <input type="text" id="cardid" value="">
                 </div>
                 <div class="formgroup">
                    <label for="cardcheck">三碼檢查碼<span class="must">*</span></label>
                    <input type="text" id="cardcheck" value="">
                 </div>
                 <div class="formgroup">
                    <label for="date">信用卡到期(月/年)</label>　
                    <select id="month">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                    <span>　/　</span>
                    <select id="year">                        
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                        <option value="2030">2030</option>
                        <option value="2031">2031</option>
                        <option value="2032">2032</option>
                        <option value="2033">2033</option>
                    </select>
                 </div>
             </div>
             <div class="footer">
                 <button class="submit" id="submit_d">
                     確認付款
                 </button>               
                 <span class="cancel">取消</span>
             </div>
         </div>
    `;
  modal_content = document.querySelector(".modal-content-2");
  closemodal();
  pay();
  modal_content_event();
}

function pay() {
  let btn = document.getElementById("submit_d");

  btn.addEventListener("click", async function () {
    let formerror = document.querySelector(".modal .formerror");
    var name = document.getElementById("cardid").value;
    var address = document.getElementById("cardcheck").value;
    if (name.length > 0 && address.length > 0) {
      var re;
      await UpdateUserBalance().then((r) => (re = r));
      if (re) {
        if (re.hasOwnProperty("info")) {
          formerror.innerHTML = `付款成功`;
          formerror.classList.remove("erroractive");
          formerror.classList.add("succece");
          window.location.reload();
        } else {
          formerror.innerHTML = `付款失敗`;
          formerror.classList.add("erroractive");
        }
      }
    } else {
      formerror.classList.add("erroractive");
      document.querySelector(".formerror").innerHTML = `必填欄位不可為空`;
    }
  });
}
