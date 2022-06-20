const apidomain = "http://localhost:8080";

function Register(account, password, name, email) {
  var data = new FormData();
  data.append("Account", account);
  data.append("Password", password);
  data.append("Name", name);
  data.append("Email", email);
  fetch(apidomain + "/user", {
    method: "POST",
    headers: {},
    body: data,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.hasOwnProperty("error")) {
        document.querySelector(".load").style.display = "none";
        document.querySelector(".loadmask").style.display = "none";
        if (res["error"].hasOwnProperty("Account")) {
          document.getElementById("accounte").innerHTML = res.error.Account[0];
        }
        if (res["error"].hasOwnProperty("Password")) {
          document.getElementById("passworde").innerHTML =
            res.error.Password[0];
        }
        if (res["error"].hasOwnProperty("Name")) {
          document.getElementById("namee").innerHTML = res.error.Name[0];
        }
        if (res["error"].hasOwnProperty("Email")) {
          document.getElementById("emaile").innerHTML = res.error.Email[0];
        }
      } else {
        document.querySelector(".form").innerHTML = `
                <div class="formgroup">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="green" class="bi bi-send" viewBox="0 0 16 16">
                    <path
                        d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                </svg>
                </div>
                <div class="formgroup">
                    <h1>郵件已送出，請去信箱查看</h1>
                </div>
                <div class="formgroup">
                    </a>
                </div>
               `;
        document.querySelector(".load").style.display = "none";
        document.querySelector(".loadmask").style.display = "none";
      }
    })
    .catch((e) => {
      console.error("Error:", error);
    });
}

function GetBalance() {
  const token = getCookie("token");
  return fetch(apidomain + "/balance", {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((e) => {
      console.error("Error:", e);
    });
}

function UpdateUserBalance() {
  const token = getCookie("token");
  var formBody = [];
  var details = {
    Balance: 1,
  };
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  return fetch(apidomain + "/user/patch", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Authorization: token,
    },
    body: formBody,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((e) => {
      console.error("Error:", e);
    });
}

function UpdateUserMoney(amount) {
  const token = getCookie("token");
  var formBody = [];
  var details = {
    Money: amount,
  };
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  return fetch(apidomain + "/user/patch", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Authorization: token,
    },
    body: formBody,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((e) => {
      console.error("Error:", e);
    });
}

function CheckAccount(account) {
  fetch(apidomain + "/user/check/" + account, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (!res) {
        document.getElementById("account").classList.add("invalid");
        document.getElementById("accounte").innerHTML = "此帳號已經存在";
      } else {
        document.getElementById("account").classList.remove("invalid");
        document.getElementById("accounte").innerHTML = "";
      }
    })
    .catch((e) => {
      console.error("Error:", error);
    });
}

function Login(Account, Password) {
  var data = new FormData();
  data.append("Account", Account);
  data.append("Password", Password);
  fetch(apidomain + "/user/login", {
    method: "POST",
    headers: {},
    body: data,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.hasOwnProperty("error")) {
        document.getElementById("passworde").innerHTML = res.error;
        document.querySelector(".load").style.display = "none";
        document.querySelector(".loadmask").style.display = "none";
      } else if (res.hasOwnProperty("token")) {
        setCookie("token", res.token, 1);
        setCookie("Account", res.Account, 1);
        setCookie("Name", res.Name, 1);
        setCookie("RoleId", res.RoleId, 1);
        setCookie("CartId", res.CartId, 1);
        setCookie("Image", res.Image, 1);
        window.location.href = "index.html";
      }
    })
    .catch((e) => {
      console.error("Error:", e);
    });
}

function Logout(Account, Password) {
  const token = getCookie("token");
  fetch(apidomain + "/user/logout", {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      clearCookie("token");
      clearCookie("Account");
      clearCookie("Name");
      clearCookie("RoleId");
      clearCookie("CartId");
      window.location.href = "index.html";
    })
    .catch((e) => {
      console.error("Error:", e);
    });
}

function ForgetPassword(Account, Email) {
  var data = new FormData();
  data.append("Account", Account);
  data.append("Email", Email);
  fetch(apidomain + "/user/forget", {
    method: "POST",
    headers: {},
    body: data,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.hasOwnProperty("error")) {
        document.getElementById("email").innerHTML = res.error;
        document.querySelector(".load").style.display = "none";
        document.querySelector(".loadmask").style.display = "none";
      } else if (res.hasOwnProperty("info")) {
        document.querySelector(".load").style.display = "none";
        document.querySelector(".loadmask").style.display = "none";
        document.querySelector(".form").innerHTML = `
                <div class="formgroup">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="green" class="bi bi-send" viewBox="0 0 16 16">
                    <path
                        d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                </svg>
                </div>
                <div class="formgroup">
                    <h1>郵件已送出，請去信箱查看</h1>
                </div>
                <div class="formgroup">
                    </a>
                </div>
               `;
      }
    })
    .catch((e) => {
      console.error("Error:", e);
    });
}

function getAccount() {
  const token = getCookie("token");
  return fetch(apidomain + "/users", {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.error("Error:", error);
    });
}

//更新地址
function UpdateAddress($addr) {
  const token = getCookie("token");
  var formBody = [];
  var details = {
    Address: $addr,
  };
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  fetch(apidomain + "/user/address", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Authorization: token,
    },
    body: formBody,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((e) => {
      console.error("Error:", e);
    });
}

//更新
function UserUpdatedata(name, address) {
  const token = getCookie("token");
  var formBody = [];
  var details = {
    Name: name,
    Address: address,
  };
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  return fetch(apidomain + "/user/update", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Authorization: token,
    },
    body: formBody.join("&"),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((e) => {
      console.error("Error:", e);
    });
}
function UpdatePassword(oldPassword, newPassword) {
  const token = getCookie("token");
  var formBody = [];
  var details = {
    oldPassword: oldPassword,
    newPassword: newPassword,
  };
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  return fetch(apidomain + "/user/password", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Authorization: token,
    },
    body: formBody.join("&"),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((e) => {
      console.error("Error:", e);
    });
}

//更新
function ResetPassword(password, passwordcheck, token) {
  var data = new FormData();
  data.append("Password", password);
  data.append("PasswordCheck", passwordcheck);
  data.append("Token", token);
  fetch(apidomain + "/user/forgetv", {
    method: "POST",
    headers: {},
    body: data,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.hasOwnProperty("error")) {
        document.querySelector(".load").style.display = "none";
        document.querySelector(".loadmask").style.display = "none";

        if (res["error"].hasOwnProperty("PasswordCheck")) {
          document.getElementById("passwordchecke").innerHTML =
            res.error.PasswordCheck[0];
        }
        if (res["error"].hasOwnProperty("Password")) {
          document.getElementById("passworde").innerHTML =
            res.error.Password[0];
        } else {
          document.querySelector("#tokene").innerHTML = res.error;
        }
      } else {
        document.querySelector(".load").style.display = "none";
        document.querySelector(".loadmask").style.display = "none";

        document.querySelector(".form").innerHTML = `
                <div class="formgroup">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
              </svg>
                </div>
                <div class="formgroup">
                    <h1>修改成功</h1>
                </div>
                <div class="formgroup">
                    </a>
                </div>
               `;
      }
    })
    .catch((e) => {
      console.error("Error:", e);
    });
}

//上傳大頭貼
function Uploadimg() {
  const token = getCookie("token");
  var input = document.querySelector("#filein");
  var fileinput = new FormData();
  fileinput.append("file[]", input.files[0]);
  fetch(apidomain + "/user/img", {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: fileinput,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      input.value = "";
      if (data.hasOwnProperty("data")) {
        setCookie("Image", data.data);
      }

      return data;
    })
    .catch((e) => {
      console.error("Error:", e);
    });
}

//取得Cookie
function getCookie(cookiename) {
  let name = cookiename + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//設置
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

//清除cookie
function clearCookie(name) {
  setCookie(name, "", -1);
}

function getQueryVariable(variable) {
  let query = window.location.search.substring(1);
  let vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

function getUserroleData() {
  const token = getCookie("token");
  return fetch(apidomain + '/userpermission', {
    method: 'GET',
    headers: {
      'Authorization': token,
    }
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(e => {
      console.error('Error:', error)
    })
}

function objtoparam(obj) {
  var str = "";
  for (var key in obj) {
    if (str != "") {
      str += "&";
    }
    str += key + "=" + encodeURIComponent(obj[key]);
  }
  return str;
}

function geturlparams() {
  var url = location.href;
  var string = "";
  if (url.indexOf('?') != -1) {
    var id = "";
    string = url.split('?')[1];
  }
  return string;
}

function geturi() {
  var url = location.href;
  var string = "";
  if (url.indexOf('?') != -1) {
    var id = "";
    string = url.split('?')[0];
  }
  return string;
}

function geturlobject() {
  var search = location.search.substring(1); 
  if (search) {
    return JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) })
  }
  else {
    return {};
  }

}