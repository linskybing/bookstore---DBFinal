//同步引入
var loadstate = 0;
var key = false;
function unlock() {
  key = false;
}
/*導覽列 */
document.getElementById("menubtn").addEventListener("click", closesidebar);
document.getElementById("closesidebar").addEventListener("click", closesidebar);
function closesidebar() {
  document.getElementById("sidebar").classList.toggle("close");
}

/*Fetch Html */
var analyzebtn = true;
//authorication.html
// fetch("authorication.html")
//   .then((reponse) => reponse.text())
//   .then((txt) => {
//     const mainblock = document.getElementById("mainblock");
//     mainblock.innerHTML = txt;
//     var script = document.createElement("script");
//     script.type = "text/javascript";
//     script.src = "js/authorication.js";
//     document.body.appendChild(script);
//   })
//   .catch((e) => {
//     console.log(e);
//   });


// //analyze.html
// document.getElementById("analyzebtn").addEventListener("click", function () {
//   fetch("analyze.html")
//     .then((reponse) => reponse.text())
//     .then((txt) => {
//       const mainblock = document.getElementById("mainblock");
//       mainblock.innerHTML = txt;
//       if (analyzebtn) {
//         loadanalyzescript("js/chart.js");
//         analyzebtn = false;
//         document.getElementById("sidebar").classList.toggle("close");
//       } else {
//         loadchart();
//       }
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// });

// function loadanalyzescript(url) {
//   var script = document.createElement("script");
//   script.type = "text/javascript";
//   script.src = url;
//   script.onload = function () {
//     var script2 = document.createElement("script");
//     script2.type = "text/javascript";
//     script2.src = "js/analyze.js";
//     document.body.appendChild(script2);
//   };
//   document.body.appendChild(script);
// }

// /*report.html */
// document.getElementById('reportbtn').addEventListener("click",function(){
//   fetch("report.html")
//   .then((reponse) => reponse.text())
//   .then((txt) => {
//     const mainblock = document.getElementById("mainblock");
//     mainblock.innerHTML = txt;
//     var script = document.createElement("script");
//     script.type = "text/javascript";
//     script.src = "js/authorication.js";
//     document.body.appendChild(script);
//     document.getElementById("sidebar").classList.toggle("close");
//   })
//   .catch((e) => {
//     console.log(e);
//   });
// });

// /*report_envelope.html */
// /*document.getElementById('report_e_btn').addEventListener("click",function(){
//   fetch("report_envelope.html")
//   .then((reponse) => reponse.text())
//   .then((txt) => {
//     const mainblock = document.getElementById("mainblock");
//     mainblock.innerHTML = txt;
//     var script = document.createElement("script");
//     script.type = "text/javascript";
//     script.src = "js/authorication.js";
//     document.body.appendChild(script);
//     document.getElementById("sidebar").classList.toggle("close");
//   })
//   .catch((e) => {
//     console.log(e);
//   });
// });*/
// /*announcement.html*/
// document.getElementById('announcementbtn').addEventListener("click",function(){
//   fetch("announcement.html")
//   .then((reponse) => reponse.text())
//   .then((txt) => {
//     const mainblock = document.getElementById("mainblock");
//     mainblock.innerHTML = txt;
//     var script = document.createElement("script");
//     script.type = "text/javascript";
//     script.src = "js/authorication.js";
//     document.body.appendChild(script);
//     document.getElementById("sidebar").classList.toggle("close");
//   })
//   .catch((e) => {
//     console.log(e);
//   });
// });
