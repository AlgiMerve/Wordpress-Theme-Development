var DatabaseID;

Math.rastgele = function (alt, ust) {
  let sayi = Math.random();
  sayi = sayi * (ust - alt);
  sayi = Math.floor(sayi) + alt;

  return sayi;
};

// Çift Ekran Modu Uygulama

document.getElementById("question").addEventListener("click", function () {
  swAlert();
});


let timerSet;
let timeV;
function TimeStamp(t) {
  timerSet = setInterval(() => {
    t++;
    timeV = t;
  }, 1000);
}


document.getElementById("newPage").addEventListener("click", bas);
var numara = Math.rastgele(10000000000, 99999999999);
DatabaseID = numara;

function createDatabase() {
  $.ajax({
    type: "POST",
    url: "ajax/ajax_db_create.php",
    data: {
      id_num: numara,
    },
    success: function (sonuc) {
      if (sonuc == true) {
        console.log("Başarılı");
      } else {
        swal("Bir hata oluştu !!!");
      }
    },
  });
}

function bas() {
  createDatabase();
  document.getElementById("newPage").style.display = "none";
  document.getElementById("AppStart").style.display = "block";

  PopupCenter("newpage.php?id=" + numara, "DualScreen", "900", "500", {
    toolbar: 1,
    resizable: 1,
    location: 1,
    menubar: 1,
    status: 1,
  });
}

function PopupCenter(url, title, w, h, opts) {
  var _innerOpts = "";
  if (opts !== null && typeof opts === "object") {
    for (var p in opts) {
      if (opts.hasOwnProperty(p)) {
        _innerOpts += p + "=" + opts[p] + ",";
      }
    }
  }
  // Fixes dual-screen position, Most browsers, Firefox
  var dualScreenLeft =
    window.screenLeft != undefined ? window.screenLeft : screen.left;
  var dualScreenTop =
    window.screenTop != undefined ? window.screenTop : screen.top;

  var width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : screen.width;
  var height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : screen.height;

  var left = width / 2 - w / 2 + dualScreenLeft;
  var top = height / 2 - h / 2 + dualScreenTop;
  var newWindow = window.open(
    url,
    title,
    _innerOpts +
      " width=" +
      w +
      ", height=" +
      h +
      ", top=" +
      top +
      ", left=" +
      left
  );

  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus();
  }
}
// Çift Ekran Modu Uygulama
