//Şimdilik Kısım
var learn = false;
var dakika;
var tam_url = window.location.href;
var kisim = tam_url.split("?");
var getHiz;
var nextUrl;
var getSeviye;
if (kisim[1]) {
  var getSure = kisim[1].split("&")[0].split("=")[1];
  var getLevel = kisim[1].split("&")[1].split("=")[1];
  getHiz = kisim[1].split("&")[2].split("=")[1];
  getSeviye = Number(kisim[1].split("&")[3].split("=")[1]) + 1;
  document.getElementById("txtMovement").textContent = getLevel;
  document.getElementById("inpMovement").value = getLevel;
  document.getElementById("txtSpeed").textContent = getHiz;
  dakika = getSure / 60;
  learn = true;

  if ((getSeviye - 1) % 8 != 0) {
    var deger = (getSeviye - 1) % 8;
    for (let i = 1; i <= deger; i++) {
      document.getElementById("learn" + i).children[0].style.backgroundColor =
        "green";
    }
  } else {
    var deger = 8;
    for (let i = 1; i <= deger; i++) {
      document.getElementById("learn" + i).children[0].style.backgroundColor =
        "green";
    }
  }

  $.ajax({
    type: "POST",
    url: "../../js/ajax/ajax_getUrl.php",
    data: {
      getSeviye,
    },
    success: function (event) {
      nextUrl = event;
    },
  });
}

var minute;
var second;
function startTimer(m, s) {
  minute = m;
  second = s;
  document.getElementById("timer").textContent = m + " : " + s;
  if (s == 00) {
    s = 60;
    m--;
  }

  s = s - 1;

  id = setTimeout(function () {
    if (m == 0 && s == 00) {
      clearInterval(id);
      document.getElementById("timer").textContent = "0 : 0";
      pauseTimer();
      StudientSave();
      if ((getSeviye - 1) % 8 == 0) {
        PutTime();
      }
      swal("Eğitiminiz Tamamlandı");
      var locat = setTimeout(() => {
        window.location = "../../" + nextUrl;
        clearTimeout(locat);
      }, 2000);
    } else {
      startTimer(m, s);
    }
  }, 1000);
}

//Şimdilik Kısım

var bayi_kod;
var ad_soyad;
var tc_no;
var baslama_suresi = 3;
var pause = false;
var start = false;
var _empty = false;

function StudientSave() {
  $.ajax({
    type: "POST",
    url: "../../js/ajax/ajax_putLearn.php",
    data: {
      ad_soyad,
      tc_no,
      getSeviye,
    },
    success: function (event) {
      console.log(event);
    },
  });
}

function PutTime() {
  var time = document.getElementById("gizli_zaman").value.split(" ")[0];
  $.ajax({
    type: "POST",
    url: "../../js/ajax/ajax_putTime.php",
    data: {
      ad_soyad,
      tc_no,
      time,
    },
    success: function (event) {
      console.log(event);
    },
  });
}

function PutLearnTime() {
  var time = document.getElementById("gizli_zaman").value.split(" ")[0];
  $.ajax({
    type: "POST",
    url: "../../js/ajax/ajax_putLearnTime.php",
    data: {
      ad_soyad,
      tc_no,
      time,
    },
    success: function (event) {
      console.log(event);
    },
  });
}

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

window.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("user")) {
    document.getElementById("body_id").style.display = "block";
    var bilgiler = JSON.parse(localStorage.getItem("user"));
    bayi_kod = bilgiler.bayi;
    ad_soyad = bilgiler.ad;
    tc_no = bilgiler.tc;

    swal({
      title: "Sayfayı Tam Ekran Yap!",
      text: "Daha iyi bir kullanıcı deneyimi yaşamak için egzersizleri tam ekranda yapmanı tavsiye ederiz. TAMAM’a tıkladığında otomatik olarak tam ekrana yönlendirileceksin. ‘Esc’ tuşuna basarak tam ekrandan çıkabilirsin.",
      icon: "info",
      buttons: ["HAYIR", "TAMAM"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        toggleFullScreen();
      }
    });
  } else {
    window.location = "../../../login.php";
  }
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
        var btnPause = setTimeout(() => {
          document.getElementById("pause").style.display = "block";
          clearTimeout(btnPause);
        }, 2000);
        TimeStamp(1);

        if (learn == true) {
          ilkKelimeGorunGizlen(getHiz);
          kelimeGetir();
          document.getElementById("timer").style.display = "block";
          startTimer(dakika, 0);
        } else {
          ilkKelimeGorunGizlen(1000);
          kelimeGetir();
          document.getElementById("feature").style.display = "block";
        }
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
  if (learn == true) {
    clearTimeout(id);
  }
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
  if (learn == true) {
    startTimer(minute, second);
  }
  TimeStamp(timeV);
});

document.getElementById("times").addEventListener("click", function () {
  if (start == true && learn != true) {
    pauseTimer();
  } else {
    if (learn == true) {
      window.location = "../../index.php";
    } else {
      window.location = "../../exercises.php";
    }
  }
});

function pauseTimer() {
  PutLearnTime();
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
      tc: tc_no,
      ad_soyad: ad_soyad,
      sure: timeV,
      ogr_dogru_sayisi: ogr_dogru_sayisi,
      ogr_yanlis_sayisi: ogr_yanlis_sayisi,
      zaman: test_zaman,
    },
    success: function (res) {
      if (learn != true) {
        window.location = "../../exercises.php";
      }
    },
  });
}

//-----------------------------------------------------------------

//Tam ekran yapma kodları
function toggleFullScreen() {
  if (
    (document.fullScreenElement && document.fullScreenElement !== null) ||
    (!document.mozFullScreen && !document.webkitIsFullScreen)
  ) {
    if (document.documentElement.requestFullScreen) {
      document.documentElement.requestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen(
        Element.ALLOW_KEYBOARD_INPUT
      );
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}
//Tam ekran yapma kodları
//-----------------------------------------------------------------
// Rastgele sayı üretme kodları
