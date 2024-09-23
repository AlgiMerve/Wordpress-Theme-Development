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
  getHiz = kisim[1].split("&")[1].split("=")[1];
  getSeviye = Number(kisim[1].split("&")[2].split("=")[1]) + 1;
  document.getElementById("txtSpeed").textContent = getHiz;
  document.getElementById("inpSpeed").value = getHiz;
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

  // console.log(getSeviye);

  // Diğer eğitimin Url Alma
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

function startTimerS(m, s) {
  minute = m;
  second = s;
  document.getElementById("timer").textContent = m + " : " + s;
  if (s == 00) {
    s = 60;
    m--;
  }

  s = s - 1;

  idx = setTimeout(function () {
    if (m == 0 && s == 00) {
      clearInterval(idx);
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
      startTimerS(m, s);
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
    title: "Renkleri Algılama Egzersizi",
    text: "İnsanın beyin yapısına göre sol tarafımız kelimeleri söylemeye çalışırken, sağ tarafımız renkleri söylemeye çalışır. Bu egzersiz ile dikkat, odaklanma ve konsantrasyon sevinizde artış olacaktır. Ekrana renk isimleri farklı renklerde gelecektir. Klaveye veya fareyi kullanarak yazan kelime ile renk aynıysa D, farklıysa Y düğmesine basınız.",
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
    window.location = "../../login.php";
  }
});

Math.rastgele = function (alt, ust) {
  let sayi = Math.random();
  sayi = sayi * (ust - alt);
  sayi = Math.floor(sayi) + alt;

  return sayi;
};

var cevap;

var dizi_renk_ad = [
  "SİYAH-black",
  "MAVİ-blue",
  "YEŞİL-green",
  "KIRMIZI-red",
  "SARI-yellow",
  "MOR-purple",
  "PEMBE-pink",
  "TURUNCU-orange",
  "KAHVERENGİ-brown",
  "GRİ-grey",
];

var dizi_renk = [
  "black",
  "blue",
  "green",
  "red",
  "yellow",
  "purple",
  "pink",
  "orange",
  "brown",
  "grey",
];

var id;
function startTimer(m, s) {
  document.getElementById("lblSureBox").textContent = m + ":" + s;
  var hiz = Number(document.getElementById("txtSpeed").textContent);

  id = setTimeout(function () {
    startTimer(m, s);
  }, 1000);

  if (s > hiz) {
    document.getElementById("lblSureBox").textContent = "0 : 0";
    var skor = Number(
      document.getElementById("lblYanlisSayisiSkor").textContent
    );
    skor++;
    document.getElementById("lblYanlisSayisiSkor").textContent = skor;
    clearTimeout(id);
    startTimer(0, 0);
    renk_ata();
  }
  s = s + 1;
}

function isaretGorunGizleDogru(m) {
  var gorungizlenisaret = document.getElementById("imgControl");
  setTimeout(function () {
    gorungizlenisaret.src = "images/true.png";
    gorungizlenisaret.style.display = "block";
    setTimeout(function () {
      gorungizlenisaret.style.display = "none";
    }, m);
  }, m);
}

function isaretGorunGizleYanlis(m) {
  var gorungizlenisaret = document.getElementById("imgControl");
  setTimeout(function () {
    gorungizlenisaret.src = "images/false.png";
    gorungizlenisaret.style.display = "block";
    setTimeout(function () {
      gorungizlenisaret.style.display = "none";
    }, m);
  }, m);
}

window.onkeydown = function (olay) {
  if (olay.keyCode == 68) {
    if (start == true && pause == false) {
      if (cevap == "dogru") {
        var dogru_skor = Number(
          document.getElementById("lblDogruSayisiSkor").textContent
        );
        dogru_skor++;
        document.getElementById("lblDogruSayisiSkor").textContent = dogru_skor;
        isaretGorunGizleDogru(300);
        clearTimeout(id);
        document.getElementById("lblSureBox").textContent = "0 : 0";
        startTimer(0, 0);
        renk_ata();
      } else {
        var yanlis_skor = Number(
          document.getElementById("lblYanlisSayisiSkor").textContent
        );
        yanlis_skor++;
        document.getElementById("lblYanlisSayisiSkor").textContent =
          yanlis_skor;
        isaretGorunGizleYanlis(300);
        clearTimeout(id);
        document.getElementById("lblSureBox").textContent = "0 : 0";
        startTimer(0, 0);
        renk_ata();
      }
    }
  } else if (olay.keyCode == 89) {
    if (start == true && pause == false) {
      if (cevap == "yanlis") {
        var dogru_skor = Number(
          document.getElementById("lblDogruSayisiSkor").textContent
        );
        dogru_skor++;
        document.getElementById("lblDogruSayisiSkor").textContent = dogru_skor;
        isaretGorunGizleDogru(300);
        clearTimeout(id);
        document.getElementById("lblSureBox").textContent = "0 : 0";
        startTimer(0, 0);
        renk_ata();
      } else {
        var yanlis_skor = Number(
          document.getElementById("lblYanlisSayisiSkor").textContent
        );
        yanlis_skor++;
        document.getElementById("lblYanlisSayisiSkor").textContent =
          yanlis_skor;
        isaretGorunGizleYanlis(300);
        clearTimeout(id);
        document.getElementById("lblSureBox").textContent = "0 : 0";
        startTimer(0, 0);
        renk_ata();
      }
    }
  }
};

document.getElementById("btntrue").addEventListener("click", function () {
  if (start == true && pause == false) {
    if (cevap == "dogru") {
      var dogru_skor = Number(
        document.getElementById("lblDogruSayisiSkor").textContent
      );
      dogru_skor++;
      document.getElementById("lblDogruSayisiSkor").textContent = dogru_skor;
      isaretGorunGizleDogru(300);
      clearTimeout(id);
      document.getElementById("lblSureBox").textContent = "0 : 0";
      startTimer(0, 0);
      renk_ata();
    } else {
      var yanlis_skor = Number(
        document.getElementById("lblYanlisSayisiSkor").textContent
      );
      yanlis_skor++;
      document.getElementById("lblYanlisSayisiSkor").textContent = yanlis_skor;
      isaretGorunGizleYanlis(300);
      clearTimeout(id);
      document.getElementById("lblSureBox").textContent = "0 : 0";
      startTimer(0, 0);
      renk_ata();
    }
  }
});

document.getElementById("btnfalse").addEventListener("click", function () {
  if (start == true && pause == false) {
    if (cevap == "yanlis") {
      var dogru_skor = Number(
        document.getElementById("lblDogruSayisiSkor").textContent
      );
      dogru_skor++;
      document.getElementById("lblDogruSayisiSkor").textContent = dogru_skor;
      isaretGorunGizleDogru(300);
      clearTimeout(id);
      document.getElementById("lblSureBox").textContent = "0 : 0";
      startTimer(0, 0);
      renk_ata();
    } else {
      var yanlis_skor = Number(
        document.getElementById("lblYanlisSayisiSkor").textContent
      );
      yanlis_skor++;
      document.getElementById("lblYanlisSayisiSkor").textContent = yanlis_skor;
      isaretGorunGizleYanlis(300);
      clearTimeout(id);
      document.getElementById("lblSureBox").textContent = "0 : 0";
      startTimer(0, 0);
      renk_ata();
    }
  }
});

function renk_ata() {
  var renk_ad = dizi_renk_ad[Math.rastgele(0, dizi_renk_ad.length)];
  var asil_yazi = renk_ad.split("-");

  var yazi_renk = dizi_renk[Math.rastgele(0, dizi_renk.length)];

  document.getElementById("yazi").textContent = asil_yazi[0];
  document.getElementById("yazi").style.color = yazi_renk;

  if (asil_yazi[1] == yazi_renk) {
    cevap = "dogru";
  } else {
    cevap = "yanlis";
  }
}

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
        TimeStamp(1);
        document.getElementById("startmenu").style.display = "none";
        document.getElementById("txt").style.display = "block";
        var btnPause = setTimeout(() => {
          document.getElementById("pause").style.display = "block";
          clearTimeout(btnPause);
        }, 2000);
        if (learn == true) {
          document.getElementById("timer").style.display = "block";
          startTimerS(dakika, 0);
          startTimer(0, 0);
          renk_ata();
        } else {
          document.getElementById("feature").style.display = "block";
          startTimer(0, 0);
          renk_ata();
        }
      } else {
        baslama_suresi--;
        document.getElementById("bottomtitle").textContent = baslama_suresi;
      }
    }, 1000);
  }
  _empty = true;
});

document.getElementById("inpSpeed").oninput = function () {
  document.getElementById("txtSpeed").textContent = this.value;
};

document.getElementById("inpFontSize").oninput = function () {
  document.getElementById("txtFontSize").textContent = this.value;
  document.getElementById("yazi").style.fontSize = this.value + "px";
};

document.getElementById("pause").addEventListener("click", function () {
  document.getElementById("btntrue").setAttribute("disabled", true);
  document.getElementById("btnfalse").setAttribute("disabled", true);
  pause = true;
  this.style.display = "none";
  clearInterval(id);
  document.getElementById("resume").style.display = "block";
  if (learn == true) {
    clearTimeout(idx);
  }
  clearInterval(timerSet);
});

document.getElementById("resume").addEventListener("click", function () {
  document.getElementById("btntrue").removeAttribute("disabled");
  document.getElementById("btnfalse").removeAttribute("disabled");
  pause = false;
  this.style.display = "none";
  var hiz = Number(document.getElementById("txtSpeed").textContent);
  if (learn == true) {
    startTimerS(minute, second);
  }
  TimeStamp(timeV);
  startTimer(0, 0);
  renk_ata();
  document.getElementById("pause").style.display = "block";
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
  clearTimeout(id);
  clearInterval(timerSet);

  var ogr_dogru_sayisi =
    document.getElementById("lblDogruSayisiSkor").textContent;
  var ogr_yanlis_sayisi = document.getElementById(
    "lblYanlisSayisiSkor"
  ).textContent;
  var test_zaman = document.getElementById("gizli_zaman").value;
  $.ajax({
    type: "POST",
    url: "ajax/ajax_dogru_renk_sonuc.php",
    data: {
      bayi_kod: bayi_kod,
      tc: tc_no,
      ad_soyad: ad_soyad,
      dogru_sayisi: ogr_dogru_sayisi,
      yanlis_sayisi: ogr_yanlis_sayisi,
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
