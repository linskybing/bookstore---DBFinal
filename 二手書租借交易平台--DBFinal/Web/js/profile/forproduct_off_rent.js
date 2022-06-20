var prodcutonlist;
var onIndex = 0;
var nowIndex = 0;
var nowType = "off";
var tempdata = {};

var constproduct;
var nowpage = 1;
var totalpage;
var productcount;
var tempcount;
var pageitem = 10;
var refreshproductbtn = true;

let modal = document.querySelector(".modal");

modal.addEventListener("click", function (e) {
  let element = e.target;
  if (element == modal) {
    document.body.classList.toggle("bodyhidden");
    modal.classList.toggle("hidden");
  }
});

//綁定insert按鈕

function insertbtn() {
  var insert = document.querySelector('.table_action .insert');
  insert.addEventListener('click', async function () {
    checkboxes = document.getElementsByName('product');

    await checkboxes.forEach(element => {
      if (element.checked) {
        var re;
        var dataobj = {
          'State': 'on'
        }
        re = turnoff(dataobj, element.value);
        console.log(re);

      }
    });

  })
}

//綁定check事件
function checkall() {
  let checkbox_all = document.querySelector(".checkbox_head input");
  checkbox_all.addEventListener("click", function () {
    checkboxes = document.getElementsByName("product");

    checkboxes.forEach((element) => {
      element.checked = checkbox_all.checked;
    });
  });
}

//綁定delete按鈕
function binddelete() {
  var h_delete = document.querySelector(".table_action .delete");
  h_delete.addEventListener("click", async function () {
    checkboxes = document.getElementsByName("product");

    checkboxes.forEach((element) => {
      if (element.checked) {
        var re;
        var dataobj = {
          State: "off",
        };
        re = turnoff(dataobj, element.value);
        console.log(re);

      }
    });
  });
}
//message modal

function displaymessage(id, type) {
  var data;
  data = GetDataArray(type);
  nowIndex = id;
  nowType = type;
  modal.innerHTML = `
    <div class="modal-content-2" style="width: 20%!important;min-width: 400px;">
    <div class="header">
        <div class="close">
            <i class="fa-solid fa-xmark"></i>
        </div>
        <div class="message">
            <div class="icon">
                <i class="fa-solid fa-triangle-exclamation"></i>
            </div>
            <div class="text">
                一旦刪除後，將無法再看到此商品
            </div>
            <div class="action">
                <button class="delete">
                    刪除商品
                </button>
                <span class="cancel">取消</span>
            </div>
        </div>
    </div>
    </div>
    `;
  closemodal();
  modal_content_event(".modal .modal-content-2");
  document
    .querySelector(".modal .action .delete")
    .addEventListener("click", async function () {
      var re;
      await DeleteProduct(data[nowIndex].ProductId).then((r) => (re = r));
      if (re.hasOwnProperty("error")) {
        document.querySelector(".modal .message").innerHTML = ` 
           
                 
                        <div class="icon">
                            <i class="fa-solid fa-circle-exclamation"></i>
                        </div>
                        <div class="text">
                            ${re.error}
          `;

      } else {
        document.querySelector(".modal .message").innerHTML = `
            
                        <div class="icon" style="color:green;">
                            <i class="fa-solid fa-circle-check"></i>
                        </div>
                        <div class="text">
                            ${re.info}
                        </div>                     
          
            `;
        refreshproductbtn = true;
        GetOnProduct("null");
        setTimeout(() => {
          document.querySelector(".modal").classList.toggle("hidden");
        }, 3000);
      }
    });
}
//顯示modal內容
let modal_content = document.querySelector(".modal-content-2");
function displaymodal() {
  modal.innerHTML = `
    <div class="modal-content-2">
        <div class="header">
            <div class="close">
                <i class="fa-solid fa-xmark"></i>
            </div>
            <div class="modal-title">
                <h3>上架商品</h3>
            </div>
            <div class="menu">
                <ul>
                    <li class="active">商品資訊</li>                  
                </ul>
            </div>
        </div>
        <div class="content">
            <div class="formerror">               
            </div>
            <div class="formgroup">
                <label class="label2" for="editname">商品名稱<span class="must">*</span></label>
                <input type="text" id="editname">
            </div>
            <div class="formgroup">
                <label class="label2" for="editprice">成本價<span class="must">*</span></label>
                <input type="text" id="editprice">
            </div>
            <div class="formgroup">
                <label class="label2" for="store">庫存<span class="must">*</span></label>
                <input type="text" id="store">
            </div>
            <div class="formgroup">
                <label class="label2" for="editrent">最大租借天數<span class="must">*</span></label>
                <input type="text" id="editrent">
            </div>         
            <div class="formgroup">
              <label class="label2" for="rentprice">租借價格(天)<span class="must">*</span>&nbsp; </label>
              <input type="text" id="rentprice" value="">
            </div>
            <div class="formgroup">
                <label class="label2" for="description">商品敘述<span class="must">*</span> </label>
                <textarea id="description"></textarea>
            </div>        
        </div>
        <div class="footer">
            <button class="submit">
                上架商品
            </button>
            <span class="cancel">取消</span>
        </div>
    </div>
    `;
  let btn = document.querySelector(".modal .submit");
  btn.addEventListener("click", async function () {
    let Name = document.querySelector("#editname").value;
    let Price = document.querySelector("#editprice").value;
    let Inventory = document.querySelector("#store").value;
    let Description = document.querySelector("#description").value;
    let maxrent = document.querySelector('#editrent').value;
    let rentprice = document.querySelector('#rentprice').value;
    tempdata = Object.assign(tempdata, { Name: Name });
    tempdata = Object.assign(tempdata, { Price: Price });
    tempdata = Object.assign(tempdata, { Inventory: Inventory });
    tempdata = Object.assign(tempdata, { Description: Description });
    tempdata = Object.assign(tempdata, { MaxRent: maxrent });
    tempdata = Object.assign(tempdata, { RentPrice: rentprice });
    if (validate(tempdata)) {
      if (
        !checkRate(parseInt(tempdata.Price)) ||
        !checkRate(parseInt(tempdata.Inventory)) ||
        !checkRate(parseInt(tempdata.MaxRent)) ||
        !checkRate(parseInt(tempdata.RentPrice))
      ) {
        numbererror();
      } else {
        var data;
        data = GetDataArray(nowType);
        document.querySelector(".formerror").classList.remove("erroractive");
        document.querySelector(".formerror").innerHTML = "";
        var re;
        await InsertProductRent(tempdata).then((r) => (re = r));
        if (re.hasOwnProperty("error")) {
          document.querySelector(".formerror").classList.add("erroractive");
          document.querySelector(".formerror").innerHTML = re.error;
        } else {
          document.querySelector(".formerror").classList.add("succece");
          document.querySelector(".formerror").innerHTML = re.info;
          refreshproductbtn = true;
          GetOnProduct("null");
          setTimeout(() => {
            document.querySelector(".formerror").classList.remove("succece");
          }, 3000);
        }
      }
    } else {
      document.querySelector(".formerror").classList.add("erroractive");
      document.querySelector(".formerror").innerHTML = "必填資料不可為空";
    }
  });
  closemodal();
  modal_content_event(".modal .modal-content-2");
}
//取得資料陣列
function GetDataArray(type) {
  var data;
  if (type == "on") {
    data = prodcutonlist;
  } else if (type == "off") {
    data = prodcutofflist;
  } else {
    data = replenishment;
  }
  return data;
}

function deletemodal(id, type) {
  var data;
  data = GetDataArray(type);
  nowIndex = id;
  nowType = type;
}

//修改資訊modal
function editmodal(id, type) {
  var data;
  data = GetDataArray(type);
  nowIndex = id;
  nowType = type;
  modal.innerHTML = `
    <div class="modal-content-2">
        <div class="header">
            <div class="close">
                <i class="fa-solid fa-xmark"></i>
            </div>
            <div class="modal-title">
                <h3>修改商品</h3>
            </div>
            <div class="menu">
                <ul>
                    <li class="active" id="product">商品資訊</li>                    
                    <li id="photo">商品圖片</li>
                    <li id="category">商品標籤</li>
                </ul>
            </div>
        </div>
        <div class="content">
            <div class="formerror">                    
            </div>
            <div class="formgroup">
                <label class="label2" for="editname">商品名稱<span class="must">*</span></label>
                <input type="text" id="editname" value="${data[id].Name}">
            </div>
            <div class="formgroup">
                <label class="label2" for="editprice">成本價<span class="must">*</span></label>
                <input type="text" id="editprice" value="${data[id].Price}">
            </div>
            <div class="formgroup">
                <label class="label2" for="store">庫存<span class="must">*</span></label>
                <input type="text" id="store" value="${data[id].Inventory}">
            </div>
            <div class="formgroup">
                <label class="label2" for="editrent">最大租借天數</label>
                <input type="text" id="editrent" value="${data[id].MaxRent}">
            </div>
            <div class="formgroup">
                  <label class="label2" for="rentprice">租借價格(天)&nbsp;</label>
                  <input type="text" id="rentprice" value="${data[id].RentPrice}">
            </div>
            <div class="formgroup">
                <label class="label2" for="description">商品敘述<span class="must">*</span></label>
                <textarea id="description">${ntobr(data[id].Description)}</textarea>
            </div>            
        </div>
        <div class="footer">
            <button class="submit now" id="submit_p">
                更新資料
            </button>
            <button class="submit hidden" id="submit_r">
                更新資料
            </button>
            <button class="submit hidden" id="submit_i">
                新增圖片
            </button>
            <button class="submit hidden" id="submit_c">
                更新資料
            </button>
            <span class="cancel">取消</span>
        </div>
    </div>
    `;

  closemodal();
  modal_content_event(".modal .modal-content-2");
  modal_image_info();
  modal_category_info();
  modal_product_info();
  sendeditdata();
}

//送出修改資料
function sendeditdata() {
  let btn = document.querySelector("#submit_p");
  btn.addEventListener("click", async function () {
    var data;
    data = GetDataArray(nowType);
    let Name = document.querySelector("#editname").value;
    let Price = document.querySelector("#editprice").value;
    let Inventory = document.querySelector("#store").value;
    let Description = document.querySelector("#description").value;
    let maxrent = document.querySelector('#editrent').value;
    let rentprice = document.querySelector('#rentprice').value;
    tempdata = Object.assign(tempdata, { Name: Name });
    tempdata = Object.assign(tempdata, { Price: Price });
    tempdata = Object.assign(tempdata, { Inventory: Inventory });
    tempdata = Object.assign(tempdata, { Description: Description });
    tempdata = Object.assign(tempdata, { MaxRent: maxrent });
    tempdata = Object.assign(tempdata, { RentPrice: rentprice });
    if (
      !checkRate(parseInt(tempdata.Price)) ||
      !checkRate(parseInt(tempdata.Inventory)) ||
      !checkRate(parseInt(tempdata.MaxRent)) ||
      !checkRate(parseInt(tempdata.RentPrice))
    ) {
      numbererror();
    } else if (validate(tempdata)) {
      UpdateInfo(tempdata);
    } else {
      document.querySelector(".formerror").classList.add("erroractive");
      document.querySelector(".formerror").innerHTML = "必填資料不可為空";
    }
  });
  document
    .getElementById("submit_i")
    .addEventListener("click", async function () {
      var re;
      var data;
      data = GetDataArray(nowType);
      await Uploadpimg(data[nowIndex].ProductId).then((r) => (re = r));

      if (re.hasOwnProperty("error")) {
        document.querySelector(".formerror").classList.add("erroractive");
        document.querySelector(".formerror").innerHTML = re.error;
      } else {
        document.querySelector(".formerror").classList.add("succece");
        document.querySelector(".formerror").innerHTML = re.info;
        refreshproductbtn = true;
        GetOnProduct("null");
        setTimeout(() => {
          document.querySelector(".formerror").classList.remove("succece");
        }, 3000);
      }
    });
  document
    .getElementById("submit_c")
    .addEventListener("click", async function () {
      var re;
      var data;
      data = GetDataArray(nowType);
      trundatatoid();

      for (i = 0; i < tmp.length; i++) {
        await PostTag(data[nowIndex].ProductId, tmp[i]).then((r) => (re = r));
        if (re && re.hasOwnProperty("Id")) {
          delete re.ProductId;
          if (prodcutonlist[nowIndex].Category) {
            prodcutonlist[nowIndex].Category.push(re);
          } else {
            prodcutonlist[nowIndex].Category = re;
          }
        }
      }
      for (i = 0; i < delarray.length; i++) {
        await DeleteTag(delarray[i]).then((r) => (re = r));

        Object.entries(prodcutonlist[nowIndex].Category).forEach(
          (key, value) => {
            if (prodcutonlist[nowIndex].Category[value].Id == delarray[i]) {
              delete prodcutonlist[nowIndex].Category[value];
            }
          }
        );
      }
      tmp = [];
      delarray = [];
      refreshproductbtn = true;
      GetOnProduct("null");
      inittag();
      if (re) {
        if (re.hasOwnProperty("error")) {
          document.querySelector(".formerror").classList.add("erroractive");
          document.querySelector(".formerror").innerHTML = re.error;
        } else {
          document.querySelector(".formerror").classList.add("succece");
          document.querySelector(".formerror").innerHTML = "資料修改成功";
          setTimeout(() => {
            document.querySelector(".formerror").classList.remove("succece");
          }, 3000);
        }
      }
    });
}

//上架for all
async function turnoff(dataobj, value) {
  var re;
  await UpdateProductInfo(dataobj, value).then((r) => (re = r));
  refreshproductbtn = true;
  GetOnProduct("null");
  return re;
}
//送出資訊for modal
async function UpdateInfo(tempdata) {
  var data;
  data = GetDataArray(nowType);
  document.querySelector(".formerror").classList.remove("erroractive");
  document.querySelector(".formerror").innerHTML = "";
  var re;
  await UpdateProductInfo(tempdata, data[nowIndex].ProductId).then(
    (r) => (re = r)
  );
  if (re.hasOwnProperty("error")) {
    document.querySelector(".formerror").classList.add("erroractive");
    document.querySelector(".formerror").innerHTML = re.error;
  } else {
    document.querySelector(".formerror").classList.add("succece");
    document.querySelector(".formerror").innerHTML = re.info;
    refreshproductbtn = true;
    GetOnProduct("null");
    setTimeout(() => {
      document.querySelector(".formerror").classList.remove("succece");
    }, 3000);
  }
}

//數量級錯
function numbererror() {
  document.querySelector(".formerror").classList.add("erroractive");
  document.querySelector(".formerror").innerHTML =
    "數量欄位必須為正整數且大於0";
}

//驗證資料是否為空
function validate(data) {
  var btn = true;
  Object.entries(data).forEach(([key, value]) => {
    if (value.length == 0) btn = false;
  });
  return btn;
}

//判斷正整數
function checkRate(nubmer) {
  if (/^[0-9]*[1-9][0-9]*$/.test(nubmer)) return true;
  else return false;
}

//關閉modal
function closemodal() {
  let close = document.querySelector(".modal .close");
  close.addEventListener("click", function () {
    document.body.classList.toggle("bodyhidden");
    modal.classList.add("hidden");
  });

  let cancel = document.querySelector(".modal .cancel");
  cancel.addEventListener("click", function () {
    document.body.classList.toggle("bodyhidden");
    modal.classList.add("hidden");
  });
}

//modal事件
function modal_content_event(type) {
  let modal_content = document.querySelector(type);
  modal_content.display = "flex";
  modal_content.classList.toggle("open");
}


//點擊商品資訊

function modal_product_info() {
  let product = document.getElementById("product");
  product.addEventListener("click", function () {
    var data;
    data = GetDataArray(nowType);
    let now = document.querySelector(".now");
    now.classList.remove("now");
    now.classList.add("hidden");
    let btn = document.getElementById("submit_p");
    btn.classList.remove("hidden");
    btn.classList.add("now");
    let content = document.querySelector(".modal .content");
    content.innerHTML = `
            <div class="formerror">                    
            </div>
            <div class="formgroup">
                <label class="label2" for="editname">商品名稱</label>
                <input type="text" id="editname" value="${data[nowIndex].Name}">
            </div>
            <div class="formgroup">
                <label class="label2" for="editprice">成本價</label>
                <input type="text" id="editprice" value="${data[nowIndex].Price}">
            </div>
            <div class="formgroup">
                <label class="label2" for="store">庫存</label>
                <input type="text" id="store" value="${data[nowIndex].Inventory}">
            </div>
            <div class="formgroup">
                <label class="label2" for="description">商品敘述</label>
                <textarea id="description">${ntobr(data[nowIndex].Description)}</textarea>
            </div> 
            <div class="formgroup">
              <label class="label2" for="editrent">最大租借天數</label>
              <input type="text" id="editrent" value="${data[nowIndex].MaxRent}">
            </div>
            <div class="formgroup">
              <label class="label2" for="rentprice">租借價格(天)&nbsp;</label>
              <input type="text" id="rentprice" value="${data[nowIndex].RentPrice}">
            </div>
        `;
    modal_product_event();
  });
}

//商品資訊所需事件
function modal_product_event() {
  let active = document.querySelector(".modal .active");
  active.classList.remove("active");
  let product = document.querySelector("#product");
  product.classList.add("active");
}

//點擊商品圖片
function modal_image_info() {
  let photo = document.getElementById("photo");
  photo.addEventListener("click", function () {
    var data;
    data = GetDataArray(nowType);
    let now = document.querySelector(".now");
    now.classList.remove("now");
    now.classList.add("hidden");
    let btn = document.getElementById("submit_i");
    btn.classList.remove("hidden");
    btn.classList.add("now");
    imgcount = 0;
    let content = document.querySelector(".modal .content");
    content.innerHTML = `
            <div class="formerror">                    
            </div>
            <div class="formgroup">
                <label>商品圖片</label>
            </div>
            <div class="formgroup type-fill">                
            </div>
        `;
    loadallimage();
    createfileitem();
    modal_image_event();
  });
}
//載入商品圖片
function loadallimage() {
  var data;
  data = GetDataArray(nowType);
  if (data[nowIndex].Image != null) {
    var image = data[nowIndex].Image;
    image.forEach((e) => {
      let div = document.createElement("div");
      div.classList.add("img-item-2");
      div.innerHTML = `
            <img src="http://localhost:8080/images/Products/${e.Image}" alt="" id="img_exist_${e.Image}" class="">
            <div class="remove exit" id="remove_exist_${e.ImageId}">
                <i class="fa-solid fa-xmark"></i>
            </div>
            `;
      document.querySelector(".type-fill").appendChild(div);
      document.getElementById("remove_exist_" + e.ImageId).onclick = removeexit;
    });
  }
}

function removeexit(e) {
  let removeitem = e.target.parentNode.parentNode;
  if (removeitem.classList[0] == "img-item-2") {
    removeitem.remove();
    var result = e.target.parentNode.id.replace("remove_exist_", "");
    DeleteImg(result);
    var count = document.querySelectorAll(".img-item , .img-item-2").length;
    if (count == 0) createfileitem();
  }
}
//商品圖片事件
function modal_image_event() {
  let active = document.querySelector(".modal .active");
  active.classList.remove("active");
  let photo = document.querySelector("#photo");
  photo.classList.add("active");
}

//圖片即時預覽
var imgcount = 1;
function view_upload_image(e) {
  id = e.target.id;
  var x = new FileReader();
  x.readAsDataURL(this.files[0]);

  x.onloadend = function () {
    let img = document.querySelector("#img_photo_" + imgcount);
    img.classList.remove("hidden");
    document.querySelector("#label_" + id).classList.add("hidden");
    let remove = document.querySelector("#remove_" + imgcount);
    remove.classList.remove("hidden");
    remove.onclick = removeimg;
    createfileitem();
    img.src = this.result;
  };
}

//remove icon
function removeimg(e) {
  let imgcontent = document.querySelector(".type-fill");
  let removeitem = e.target.parentNode.parentNode;
  if (removeitem.classList[0] == "img-item") {
    removeitem.remove();
    createfileitem();
  }
}

//創造img_item
function createfileitem() {
  var count = document.querySelectorAll(".img-item , .img-item-2").length;
  var count2 = document.querySelectorAll(".img-item label:not(.hidden)").length;
  if (count < 5 && count2 < 1) {
    imgcount += 1;
    let div = document.createElement("div");
    div.classList.add("img-item");
    div.id = imgcount;
    div.innerHTML = `
        <label for="photo_${imgcount}" id="label_photo_${imgcount}">
        <i class="fa-solid fa-plus"></i>
        </label>
        <input type="file" id="photo_${imgcount}">
        <img src="" alt="" id="img_photo_${imgcount}" class="hidden">
        <span class="hidden remove" id="remove_${imgcount}">
            <i class="fa-solid fa-xmark"></i>
        </span>
        `;
    document.querySelector(".type-fill").appendChild(div);
    let image = document.getElementById("photo_" + imgcount);
    image.addEventListener("change", view_upload_image);
  }
}

//點擊商品種類管理
function modal_category_info() {
  let category = document.getElementById("category");
  category.addEventListener("click", function () {
    var data;
    data = GetDataArray(nowType);
    let now = document.querySelector(".now");
    now.classList.remove("now");
    now.classList.add("hidden");
    let btn = document.getElementById("submit_c");
    btn.classList.remove("hidden");
    btn.classList.add("now");
    let active = document.querySelector(".modal .menu .active");
    active.classList.remove("active");
    category.classList.add("active");
    let content = document.querySelector(".modal .content");
    content.innerHTML = `
            <div class="formerror">
            </div>
            <div class="formgroup" style="background-color: white;">
                <label>商品標籤</label>
                <div class="fakeinput">                    
                    <input type="text" id="edittag" value="">
                    <div class="tagsearch">
                        <ul class="searchresult">
                        </ul>
                    </div>
                </div>
            </div>
            <div class="formgroup" id="taglist">
            </div>          
        `;
    inittag();
  });
}

//載入商品陣列
async function GetOnProduct(search) {
  if (refreshproductbtn) {
    var data;
    await GetSellerProductRent(nowType).then(r => data = r);
    if (data && data.hasOwnProperty('data') && data.data) {
      constproduct = data.data;
      productofflist = constproduct;
      tempcount = constproduct.length;
      nowpage = 1;
      paging()
      refreshproductbtn = false;
    }

  }
  else {
    paging();
  }
  ClearContent();
  if (prodcutonlist) {
    prodcutonlist.forEach((element) => {
      let div = document.createElement("div");
      div.classList.add("table_content");
      div.innerHTML = `   
            <div class="checkbox">
                <input type="checkbox" id="p_${element.ProductId
        }" name="product" value="${element.ProductId}">
                <label for="p_${element.ProductId
        }"><i class="fa-solid fa-check"></i></label>
            </div>
            <div class="productimg">
                ${element.Image == null
          ? ""
          : '<img src="http://localhost:8080/images/Products/' +
          element.Image[0].Image +
          '" alt="">'
        }               
            </div >
            <div class="productname">
                ${formatecontent(element.Name)}
            </div>
            <div class="productprice">
            ${element.Price} NT
            </div>
            <div class="store">
            ${element.Inventory}
            </div>
            <div class="product_action">
                <input type="hidden" name="" id="index_${element.ProductId
        }" value="${onIndex}">
                <span id="editbtn_${onIndex}"><i class="fa-solid fa-pen-to-square"></i></span>
                <span id="deletebtn_${onIndex}"><i class="fa-solid fa-trash-can"></i></span>
            </div>
`;
      document.querySelector(".product_table").appendChild(div);
      let edit = document.querySelector("#editbtn_" + onIndex);
      edit.addEventListener("click", function () {
        document.body.classList.toggle("bodyhidden");
        modal.classList.toggle("hidden");
        var getindex = document.getElementById("index_" + element.ProductId);
        editmodal(getindex.value, nowType);
      });
      let deletebtn = document.querySelector("#deletebtn_" + onIndex);
      deletebtn.addEventListener("click", function () {
        document.body.classList.toggle("bodyhidden");
        modal.classList.toggle("hidden");
        var getindex = document.getElementById("index_" + element.ProductId);
        displaymessage(getindex.value, nowType);
      });
      onIndex += 1;
    });
  }
}


function ClearContent() {
  onIndex = 0;
  document.querySelector('.product_table').innerHTML = `
  <div class="table_action" >
      <div class="h1"></a></div >
          <div class="action">
              <button class="insert">
                  上架商品
              </button>               
          </div>
  </div >
  <div class="table_thead">
      <div class="checkbox_head">
          <input type="checkbox" id="p_all">
              <label for="p_all"><i class="fa-solid fa-check"></i></label>
      </div>
      <div class="productimg_head">
          商品圖片
      </div>
      <div class="productname_head">
          商品名稱
      </div>
      <div class="productprice_head">
          價格
      </div>
      <div class="store_head">
          剩餘庫存
      </div>
      <div class="prodcut_action_head">
          操作
      </div>
  </div>
`;
  checkall();
  insertbtn();
}

//上傳商品圖片

GetOnProduct("null");
function formatecontent(string) {
  if (string.length > 10) {
    string = string.substring(0, 10) + ".....";
  }
  return string;
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
          GetOnProduct('null')
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
          GetOnProduct('null')
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
          GetOnProduct('null')
        })
      }
    }
  }
  prodcutonlist = [];
  for (i = (nowpage - 1) * pageitem; i < nowpage * pageitem && i < tempcount; i++) {
    prodcutonlist.push(constproduct[i]);
  }
  console.log(prodcutonlist, (nowpage - 1) * pageitem, nowpage * pageitem, nowpage);
}

function ntobr(str) {
  return str.replace('/\n/g', '<br/>');
}
