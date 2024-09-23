var baslama_suresi = 3;
var pause = false;
var start = false;
var _empty = false;

function swAlert() {
  swal({
    title: "Takistoskop Egzersizi",
    text: "Takistoskop gözün görme çevikliğini arttırma çalışmalarında kullanılan bir araçtır.",
    icon: "info",
    button: "TAMAM",
  });
}

document.getElementById("question").addEventListener("click", function () {
  swAlert();
});

var gorungizlenkelime = document.getElementById("getWord");
var gorungizlenisaret = document.getElementById("imgControl");

// console.log(gorungizlenisaret.children[0].setAttribute('src', "images/check.png"));
function kelimeGörünGizle(t) {
  setTimeout(function () {
    gorungizlenkelime.style.opacity = "1";
    setTimeout(function () {
      gorungizlenkelime.style.opacity = "0";
    }, t);
  }, t);
}
function ilkKelimeGorunGizlen(t) {
  setTimeout(function () {
    gorungizlenkelime.style.opacity = "0";
  }, t);
}

function isaretGorunGizleDogru(m) {
  // gorungizlenisaret.children[0].setAttribute('src', "images/check.png");
  setTimeout(function () {
    gorungizlenisaret.src = "images/true.png";
    gorungizlenisaret.style.display = "block";
    setTimeout(function () {
      gorungizlenisaret.style.display = "none";
    }, m);
  }, m);
}

function isaretGorunGizleYanlis(m) {
  gorungizlenisaret.src = "images/false.png";
  setTimeout(function () {
    gorungizlenisaret.style.display = "block";
    setTimeout(function () {
      gorungizlenisaret.style.display = "none";
    }, m);
  }, m);
}

function kelimeGetir() {
  var seviye = Number(document.getElementById("txtMovement").textContent);
  $.ajax({
    type: "POST",
    url: "ajax/ajax_kelime_getir.php",
    data: { seviye },
    success: function (data) {
      document.getElementById("getWord").textContent = data;
      document.getElementById("inpYazi").focus();
    },
  });
}

var inpyazi = document.getElementById("inpYazi");
var karsi_kelime = document.getElementById("getWord");
var skor_dogru = document.getElementById("lblDogruSayisiSkor");
var skor_yanlis = document.getElementById("lblYanlisSayisiSkor");
inpyazi.addEventListener("keyup", (e) => {
  if (pause != true) {
    if (e.keyCode === 13) {
      var hiz = Number(document.getElementById("txtSpeed").textContent);
      kelimeGetir();
      // console.log(e.target.value);
      kelimeGörünGizle(hiz);

      if (
        e.target.value.toLowerCase() == karsi_kelime.textContent.toLowerCase()
      ) {
        isaretGorunGizleDogru(400);
        var d1 = Number(skor_dogru.textContent);
        d1++;
        skor_dogru.textContent = d1;
      } else {
        isaretGorunGizleYanlis(400);
        var y1 = Number(skor_yanlis.textContent);
        y1++;
        skor_yanlis.textContent = y1;
      }
      inpyazi.value = "";
    }
  }
});

document.getElementById("button_addon").addEventListener("click", function () {
  if (pause != true) {
    var hiz = Number(document.getElementById("txtSpeed").textContent);
    kelimeGetir();
    kelimeGörünGizle(hiz);

    if (inpyazi.value.toLowerCase() == karsi_kelime.textContent.toLowerCase()) {
      isaretGorunGizleDogru(400);
      var d1 = Number(skor_dogru.textContent);
      d1++;
      skor_dogru.textContent = d1;
    } else {
      isaretGorunGizleYanlis(400);
      var y1 = Number(skor_yanlis.textContent);
      y1++;
      skor_yanlis.textContent = y1;
    }
    inpyazi.value = "";
  }
});

let timerSet;
let timeV;
function TimeStamp(t) {
  timerSet = setInterval(() => {
    t++;
    timeV = t;
  }, 1000);
}

document.querySelector(".startmenu").addEventListener("click", function () {
  if (_empty == false) {
    document.getElementById("toptitle").style.display = "none";
    document.getElementById("bottomtitle").textContent = baslama_suresi;
    document.getElementById("bottomtitle").classList.add("loa");
    var startTimerFirs = setInterval(() => {
      if (baslama_suresi <= 1) {
        clearInterval(startTimerFirs);
        start = true;
        document.getElementById("startmenu").style.display = "none";
        document.getElementById("txt").style.display = "block";

        document.getElementById("txtMovement").textContent = 1;
        document.getElementById("inpMovement").value = 1;

        document.getElementById("txtSpeed").textContent = 1000;
        document.getElementById("inpSpeed").value = 1000;

        document.getElementById("txtFontSize").textContent = 20;
        document.getElementById("inpFontSize").value = 20;

        

        var btnPause = setTimeout(() => {
          document.getElementById("pause").style.display = "block";
          document.getElementById("finishToApp").style.display = "block";
          clearTimeout(btnPause);
        }, 2000);
        TimeStamp(1);
        ilkKelimeGorunGizlen(1000);
        kelimeGetir();
        document.getElementById("feature").style.display = "block";

        //Kelimeler gelmeye başlayacak
      } else {
        baslama_suresi--;
        document.getElementById("bottomtitle").textContent = baslama_suresi;
      }
    }, 1000);
  }
  _empty = true;
});

document.getElementById("inpMovement").oninput = function () {
  document.getElementById("txtMovement").textContent = this.value;
};

document.getElementById("inpSpeed").oninput = function () {
  document.getElementById("txtSpeed").textContent = this.value;
};

document.getElementById("inpFontSize").oninput = function () {
  document.getElementById("txtFontSize").textContent = this.value;
  document.getElementById("getWord").style.fontSize = this.value + "px";
};

document.getElementById("pause").addEventListener("click", function () {
  pause = true;
  this.style.display = "none";
  document.getElementById("inpYazi").setAttribute("disabled", true);
  document.getElementById("resume").style.display = "block";
  clearInterval(timerSet);
});

document.getElementById("resume").addEventListener("click", function () {
  pause = false;
  this.style.display = "none";
  var hiz = Number(document.getElementById("txtSpeed").textContent);
  kelimeGetir();
  kelimeGörünGizle(hiz);
  document.getElementById("inpYazi").removeAttribute("disabled");
  document.getElementById("pause").style.display = "block";
  TimeStamp(timeV);
});

document.getElementById("times").addEventListener("click", function () {
  window.location = "../../exercises.php";
});

function pauseTimer() {
  clearInterval(timerSet);
  var ogr_yanlis_sayisi = document.getElementById(
    "lblYanlisSayisiSkor"
  ).textContent;
  var ogr_dogru_sayisi =
    document.getElementById("lblDogruSayisiSkor").textContent;
  var test_zaman = document.getElementById("gizli_zaman").value;
  $.ajax({
    type: "POST",
    url: "ajax/ajax_takistoskop.php",
    data: {
      bayi_kod: bayi_kod,
      tc: dizi_tc[siraNumarasi - 1],
      ad_soyad: dizi_ad[siraNumarasi - 1],
      sure: timeV,
      ogr_dogru_sayisi: ogr_dogru_sayisi,
      ogr_yanlis_sayisi: ogr_yanlis_sayisi,
      zaman: test_zaman,
    },
    success: function (res) {
      var tblKisiSayisi =
        document.getElementById("modal_body_table").childElementCount;
      if (tblKisiSayisi <= siraNumarasi) {
        document.getElementById("dsbMdlFinish").style.display = "inline";
        document.getElementById("btnModalClose").style.display = "none";
      }

      siraNumarasi++;
      document.getElementById("studientName").textContent =
        dizi_ad[siraNumarasi - 1];
      baslama_suresi = 3;
      document.getElementById("lblDogruSayisiSkor").textContent = 0;
      document.getElementById("lblYanlisSayisiSkor").textContent = 0;
      document.getElementById("inpYazi").removeAttribute("disabled");
      pause = false;
      document.getElementById("resume").style.display = "none";
      document.getElementById("pause").style.display = "block";
      document.getElementById("txt").style.display = "none";
      document.getElementById("feature").style.display = "none";
      document.getElementById("toptitle").style.display = "block";
      document.getElementById("bottomtitle").textContent = "Tıkla";
      document.getElementById("bottomtitle").classList.remove("loa");
      document.getElementById("startmenu").style.display = "block";
      document.getElementById("getWord").style.opacity = 1;
      _empty = false;
    },
  });
}

document.getElementById("finishToApp").addEventListener("click", function () {
  pauseTimer();
  SetInf();
});
