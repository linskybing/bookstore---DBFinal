let header = document.querySelector("header");

const token = getCookie("token");
const Name = getCookie("Name");
var timestring;
var today = new Date();
var roleinfo;

if (today.getHours() < 11) {
  timestring = "早安";
} else if (today.getHours() < 13) {
  timestring = "午安";
} else if (today.getHours() < 18) {
  timestring = "下午好";
} else {
  timestring = "晚安";
}

loadheader();
async function loadheader() {
  await initroledata();
  let div = document.createElement("div");
  div.classList.add("nav");

  if (token != "") {
    if (roleinfo) {
      let h = roleinfo.data[0];
      var link;
      switch (h) {
        case "公告管理":
          link = "admin/announcement.html";
          break;
        case "商品種類管理":
          link = "admin/label.html";
          break;
        case "權限管理":
          link = "admin/index_admin_layout.html";
          break;
        case "問題回報":
          link = "admin/mailbox.html";
          break;
        case "報表分析":
          link = "admin/chart.html";
          break;
      }
      div.innerHTML = `
        <ul>
        <li class="logo"><a href="index.html"><img src="../image/logo.png"></a></li>
        <li><a href="index.html">首頁</a></li>
        <li><a href="news.html">公告事項</a></li>
        <li><a href="productlist.html">商品賣場</a></li>
        <li><a href="productlist_rent.html">租借賣場</a></li>
      
        </ul>
        <ul> 
        <li><a href="${link}">前往後臺</a></li>
        <li><a href="cart_2.html">購物車</a></li>    
        <li><a href="profile.html">${timestring}，${Name}</a></li>
        <li id="logout"><a href="#">登出</a></li>
        </ul>
      `;
    } else {
      div.innerHTML = `
        <ul>
        <li class="logo"><a href="index.html"><img src="../image/logo.png"></a></li>
        <li><a href="index.html">首頁</a></li>
        <li><a href="news.html">公告事項</a></li>
        <li><a href="productlist.html">商品賣場</a></li>
        <li><a href="productlist_rent.html">租借賣場</a></li>       
        </ul>
        <ul> 
        <li><a href="cart_2.html">購物車</a></li>    
        <li><a href="profile.html">${timestring}，${Name}</a></li>
        <li id="logout"><a href="#">登出</a></li>
        </ul>
      `;
    }

    ChatroomForUser();
    CreateChatroomE();
    BindWrapperEvent();
  } else {
    div.innerHTML = `
    <ul>
    <li class="logo"><a href="index.html"><img src="../image/logo.png"></a></li>
    <li><a href="index.html">首頁</a></li>
    <li><a href="news.html">公告事項</a></li>
    <li><a href="productlist.html">商品賣場</a></li>
    <li><a href="productlist_rent.html">租借賣場</a></li>    
    </ul>
    <ul>
    <li><a href="login.html">登入</a></li>
    <li><a href="register.html">註冊</a></li>
    </ul>
    `;
  }

  header.appendChild(div);
  if (token != "") {
    let logoutbtn = document
      .getElementById("logout")
      .addEventListener("click", function () {
        Logout();
      });
  }
}

async function initroledata() {
  await getUserroleData().then((r) => (roleinfo = r));
  if (roleinfo) {
    console.log(roleinfo);
  }
}
