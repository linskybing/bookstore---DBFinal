if (getCookie("Image") != "null" && getCookie("Image")) {
  document.querySelector(".membericon .icon img").src =
    "http://localhost:8080/images/Members/" + getCookie("Image");
}
if (getCookie("Name")) {
  document.querySelector("#name span").innerHTML = getCookie("Name");
}
let buyer = document.getElementById("buyer_m");
buyer.addEventListener("click", function () {
  var ns = buyer.nextElementSibling;
  ns.classList.toggle("close");
  buyer.querySelector(".arrow").classList.toggle("rotate");
});

let seller = document.getElementById("seller_m");
if (seller) {
  seller.addEventListener("click", function () {
    var ns = seller.nextElementSibling;
    ns.classList.toggle("close");
    seller.querySelector(".arrow").classList.toggle("rotate");
  });
}

document.getElementById("filein").addEventListener("change", async function (e) {
  view_upload_image(e);

  var image;
  await Uploadimg().then(r => image = r);

  setCookie('Image', image.data);
});

function view_upload_image(e) {
  e = e.target;
  var x = new FileReader();
  x.readAsDataURL(e.files[0]);

  x.onloadend = function () {
    document.querySelector(".membericon .icon img").src = this.result;
  };
}
