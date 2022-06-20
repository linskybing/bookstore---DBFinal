var constdata = [];

var tagdetail = []

var tagcount;
var taglabel = [];
var taglabeldata = [];

var Bar;
var Polor;
const MaxCount = 7;
initchart();
async function initchart() {
  // 獲取資料  
  await RecordForChart().then(r => tagdetail = r);
  console.log(tagdetail);

  //tagdetail.length;
  tagcount = tagdetail.length;

  // init
  labelInit();
  loadTag();
  showTag();

  // 圖表
  var ctx = document.getElementById("Bar");
  Bar = new Chart(ctx, loadBar());

  var ctx2 = document.getElementById("Polor");
  Polor = new Chart(ctx2, loadPolor());
}


function labelInit() {
  for (i = 0; i < tagdetail.length; i++) {
    taglabel.push(tagdetail[i].Tag);
  }
  constdata = [...tagdetail];
  for (i = MaxCount - 1; i < tagdetail.length; i++) {
    delete tagdetail[i];
    tagcount--;
  }
}

// Chart
const colorset = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
];

const borderset = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
];

// Bar圖表
function loadBar() {
  var config = {
    type: "bar",
    data: fetchBardata(),
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "各分類交易金額",
          position: "top",
          font: {
            size: 16,
          },
        },
      },
    },
  };

  return config;
}

//更新
function updateBar() {
  Bar.data = fetchBardata();
  Bar.update();
}

//月份陣列
function getMonth() {
  var month = [];
  // 取得input date的起始日期與結束日期
  let start = new Date(document.getElementById("date-start").value);
  let end = new Date(document.getElementById("date-end").value);
  //取得月份陣列
  for (i = start.getFullYear(); i <= end.getFullYear(); i++) {
    for (j = start.getMonth() + 1; j <= end.getMonth() + 1; j++) {
      month.push(i + "/" + j);
    }
  }
  return month;
}

//計算該月份交易金額
function getAmount(month, type) {
  var Amount = [];
  var temp = [];
  for (i = 0; i < tagcount; i++) {
    if (tagdetail[i] && tagdetail[i].Tag == type) {
      temp.push(tagdetail[i].Data);
    }
  }
  for (i = 0; i < month.length; i++) {
    var date = new Date(month[i]);
    var total = 0;

    for (j = 0; j < temp[0].length; j++) {
      var datatime = new Date(temp[0][j].Time);
      datatime = new Date(
        datatime.getFullYear() + "/" + (datatime.getMonth() + 1)
      );
      if (datatime - date == 0) {
        total += temp[0][j].Amount;
      }
    }
    Amount.push(total);
  }

  return Amount;
}

//取得圖標x軸
function fetchBarlabel() {
  var label = getMonth();

  return label;
}

//取得datasets
function fetchDatesets() {
  var datasets = [];
  var month = getMonth();
  for (k = 0; k < tagcount; k++) {
    var tempdata = {
      label: tagdetail[k].Tag,
      data: getAmount(month, tagdetail[k].Tag),
      backgroundColor: colorset[k],
      borderColor: borderset[k],
      borderWidth: 1,
    };

    datasets.push(tempdata);
  }

  return datasets;
}

function fetchBardata() {
  var data = {
    labels: fetchBarlabel(),
    datasets: fetchDatesets(),
  };

  return data;
}

//polor圖表
function loadPolor() {
  var config = {
    type: "polarArea",
    data: fetchPolordata(),
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "各分類交易數量",
          position: "top",
          font: {
            size: 16,
          },
        },
      },
    },
  };

  return config;
}

//更新
function updatePolor() {
  Polor.data = fetchPolordata();
  console.log(fetchPolordata());
  Polor.update();
}

function fetchPolorlabel() {
  var label = [];

  Object.entries(tagdetail).forEach(([key, value]) => {
    if (value) {
      label.push(value.Tag);
    }
  });

  return label;
}

// 各種類交易數量
function fetchPolorDataCount() {
  var data = [];
  Object.entries(tagdetail).forEach(([key, value]) => {
    if (value) {
      let e = value.Data;
      var total = 0;
      for (i = 0; i < e.length; i++) {
        let start = new Date(document.getElementById("date-start").value);
        let end = new Date(document.getElementById("date-end").value);
        let etime = new Date(e[i].Time);
        if (etime <= end && etime >= start) total += e[i].Count;
      }
      data.push(total);
    }
  });
  return data;
}

function fetchPolordata() {
  var data = {
    labels: fetchPolorlabel(),
    datasets: [
      {
        data: fetchPolorDataCount(),
        backgroundColor: colorset,
        borderColor: borderset,
        borderWidth: 1,
      },
    ],
  };

  return data;
}

// category
bindPlusbtn();
function bindPlusbtn() {
  let plus = document.querySelector(".plus");
  plus.addEventListener("click", function () {
    let list = document.querySelector(".category");
    list.classList.toggle("hidden");
    plus.classList.toggle("plus-bg");
  });
}

//date
bindDateinput();
function bindDateinput() {
  let inputs = document.querySelectorAll("input[type=date]");
  inputs.forEach((e) => {
    e.addEventListener("change", function () {
      updateBar();
      updatePolor();
    });
  });
}

function loadTag() {
  let category = document.querySelector(".category");
  for (i = 0; i < constdata.length; i++) {
    if (constdata[i]) {
      let li = document.createElement("li");
      li.classList.add("item");
      if (i < MaxCount - 1) {
        li.innerHTML = `
            <input type="checkbox" id="${constdata[i].CategoryId}" value="${constdata[i].Tag}" checked />
            <label for="${constdata[i].CategoryId}">${constdata[i].Tag}</label>
        `;
      } else {
        li.innerHTML = `
            <input type="checkbox" id="${constdata[i].CategoryId}" value="${constdata[i].Tag}"/>
            <label for="${constdata[i].CategoryId}">${constdata[i].Tag}</label>
        `;
      }

      var box = li.querySelector("input");
      box.addEventListener("change", function (e) {
        let checked = e.target.checked;
        if (checked) {
          if (tagcount < MaxCount - 1) {
            addTagdata(e.target.value);
          } else {
            alert("最多選取6個種類");
            e.target.checked = false;
          }
        } else {
          removeTagdata(e.target.value);
        }
        console.log(tagcount);
      });
      category.appendChild(li);
    }
  }
}

//添加種類資料
function addTagdata(type) {
  Object.entries(constdata).forEach(([key, value]) => {
    if (value && value.Tag == type) {
      tagcount++;
      tagdetail[tagcount - 1] = value;
      updateBar();
      updatePolor();
      showTag();
    }
  });
}

//添加刪除資料
function removeTagdata(type) {
  Object.entries(tagdetail).forEach(([key, value]) => {
    if (value && value.Tag == type) {
      for (a = Number(key); a < tagcount - 1; a++) {
        tagdetail[a] = tagdetail[a + 1];
      }
      delete tagdetail[tagcount - 1];
      tagcount--;
      updateBar();
      updatePolor();
      showTag();
    }
  });
}

// table
function loadTable() {
  let table = document.querySelector(".flex-table");
  let tbody = table.querySelector("tbody");
  let tag = document.querySelector(".active-tag");
  tbody.innerHTML = ``;
  for (i = 0; i < tagcount; i++) {
    if (tagdetail[i].Tag == tag.innerHTML) {
      for (j = 0; j < tagdetail[i].Data.length; j++) {
        var data = tagdetail[i].Data[j];
        let tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${data.RecordId}</td>
          <td>${data.Name}</td>
          <td>${data.Count}</td>
          <td>${data.Amount}</td>
          <td>${data.Time}</td>
        `;
        tbody.appendChild(tr);
      }
    }
  }
}

function showTag() {
  let taglist = document.querySelector(".taglist");
  taglist.innerHTML = "";
  for (i = 0; i < tagcount; i++) {
    let div = document.createElement("div");
    div.classList.add("tag");
    div.innerHTML = tagdetail[i].Tag;
    div.style.border = `1px solid ${borderset[i]}`;

    if (i == 0) {
      div.classList.add("active-tag");
      div.style.background = colorset[i];
    }

    div.addEventListener("click", function (e) {
      let active = document.querySelector(".active-tag");
      active.classList.remove("active-tag");
      active.style.background = "transparent";
      let element = e.target;
      let tag = document.querySelectorAll(".tag");
      for (tagindex = 0; tagindex < tag.length; tagindex++) {
        if (element == tag[tagindex]) {
          div.classList.add("active-tag");
          div.style.background = colorset[tagindex];
          loadTable();
        }
      }
    });
    taglist.appendChild(div);
  }
  loadTable();
}
