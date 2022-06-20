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


    if (roleinfo) {
        header.innerHTML = `
        <div class="menucontainer">
            <div class="navblock">
            <a href="../index.html">
                <div id="brand"><img src="../../image/logo2.png" width="100px" width="200px"></div>
            </a>                        
            </div>
            <div id="navright">
                <ul class="inline-block-nav">              
                <li>
                    <a href="../cart_2.html"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                        class="bi bi-cart4" viewBox="0 0 16 16">
                        <path
                        d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                    </svg></a>
                </li>
                <li>
                    <a href="../profile.html"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                        class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path fill-rule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg></a>
                </li>
                <li>
                    <a href="#">
                    <svg id="menubtn" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                        class="bi bi-list" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                    </svg>
                    </a>
                </li>
                </ul>
               </div>
            </div>
        `;
        /*導覽列 */
        let sidebar = document.getElementById('sidebar');
        document.getElementById('sidebar').innerHTML = `
        <div id="closeblock">
            <a href="#" id="closesidebar"> &times; </a>
        </div>
        <div id="imageBlock">
        <div id="iconMember" style="overflow: hidden">
            <img src="../../image/user2.png" width="100%" height="100%" style="border-radius: 50%" />
        </div>
        </div>
        <div class="baritem"  id="authlink">
        <a href="index_admin_layout.html">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-fill"
            viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>

            &nbsp;&nbsp;權限管理
        </a>
        </div>
        <div class="baritem" id="labellink">
        <a href="label.html" >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags"
            viewBox="0 0 16 16">
            <path
                d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z" />
            <path
                d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z" />
            </svg>
            &nbsp;&nbsp;商品標籤管理
        </a>
        </div>
        <div class="baritem" id="announcementbtn">
        <a href="announcement.html" id="announcementlink">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-megaphone"
            viewBox="0 0 16 16">
            <path
                d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0v-.214c-2.162-1.241-4.49-1.843-6.912-2.083l.405 2.712A1 1 0 0 1 5.51 15.1h-.548a1 1 0 0 1-.916-.599l-1.85-3.49a68.14 68.14 0 0 0-.202-.003A2.014 2.014 0 0 1 0 9V7a2.02 2.02 0 0 1 1.992-2.013 74.663 74.663 0 0 0 2.483-.075c3.043-.154 6.148-.849 8.525-2.199V2.5zm1 0v11a.5.5 0 0 0 1 0v-11a.5.5 0 0 0-1 0zm-1 1.35c-2.344 1.205-5.209 1.842-8 2.033v4.233c.18.01.359.022.537.036 2.568.189 5.093.744 7.463 1.993V3.85zm-9 6.215v-4.13a95.09 95.09 0 0 1-1.992.052A1.02 1.02 0 0 0 1 7v2c0 .55.448 1.002 1.006 1.009A60.49 60.49 0 0 1 4 10.065zm-.657.975 1.609 3.037.01.024h.548l-.002-.014-.443-2.966a68.019 68.019 0 0 0-1.722-.082z" />
            </svg>
            &nbsp;&nbsp;公告管理
        </a>
        </div>
        <div class="baritem" id="reportbtn">
        <a href="mailbox.html" id="maillink">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-envelope"
            viewBox="0 0 16 16">
            <path
                d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
            </svg>
            &nbsp;&nbsp;問題回報
        </a>
        </div>
        <div class="baritem" id="analyzebtn">
        <a href="chart.html" id="chartlink">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-graph-up"
            viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z" />
            </svg>
            &nbsp;&nbsp;分析報表
        </a>
        </div>
        <div class="baritem" id="logout">
        <span href="">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
            class="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z" />
            <path fill-rule="evenodd"
                d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
            </svg>
            &nbsp;&nbsp;登出
        </span>
        </div>
        `;
        if (!permissionsearch(roleinfo.data, "報表分析")) document.getElementById('analyzebtn').remove();
        if (!permissionsearch(roleinfo.data, "問題回報")) document.getElementById('reportbtn').remove();
        if (!permissionsearch(roleinfo.data, "公告管理")) document.getElementById('announcementbtn').remove();
        if (!permissionsearch(roleinfo.data, "商品種類管理")) document.getElementById('labellink').remove();
        if (!permissionsearch(roleinfo.data, "權限管理")) document.getElementById('authlink').remove();
        document.getElementById("menubtn").addEventListener("click", closesidebar);
        document.getElementById("closesidebar").addEventListener("click", closesidebar);
        function closesidebar() {
            document.getElementById("sidebar").classList.toggle("close");
        }
        if (getCookie("Image") != "null" && getCookie("Image")) {
            document.querySelector("#iconMember img").src =
                "http://localhost:8080/images/Members/" + getCookie("Image");
        }
    }
    else {
        window.location.href = "../index.html";
    }

    ChatroomForUser();
    CreateChatroomE();
    BindWrapperEvent();


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
    await getUserroleData().then(r => roleinfo = r);
}

function permissionsearch(data, string) {
    var btn = false;
    if (data) {
        for (i = 0; i < data.length; i++) {
            if (data[i] == string) btn = true;
        }
    }
    return btn;
}