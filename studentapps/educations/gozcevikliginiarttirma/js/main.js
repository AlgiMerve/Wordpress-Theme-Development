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
  var getLevel = Number(kisim[1].split("&")[1].split("=")[1]);
  getHiz = kisim[1].split("&")[2].split("=")[1];
  getSeviye = Number(kisim[1].split("&")[3].split("=")[1]) + 1;
  document.getElementById("txtMovement").textContent = getLevel;
  document.getElementById("inpMovement").value = getLevel;
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
    if ((m == 0 && s == 00) || baslangic_deger >= gelenYaziDeger.length) {
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
    title: "Göz Çevikliğini Arttırma Egzersizi",
    text: "Bu egzersiz göz kaslarını geliştirme ve göz çevikliğini arttırmanın yanı sıra dikkatinizi de geliştirecektir.",
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

Math.rastgele = function (alt, ust) {
  let sayi = Math.random();
  sayi = sayi * (ust - alt);
  sayi = Math.floor(sayi) + alt;

  return sayi;
};

let timerSet;
let timeV;
function TimeStamp(t) {
  timerSet = setInterval(() => {
    t++;
    timeV = t;
  }, 1000);
}

function okumaHizi(kelimesayi, sure) {
  return parseInt((kelimesayi / sure) * 60);
}

document.querySelector(".startmenu").addEventListener("click", function () {
  if (_empty == false) {
    document.getElementById("toptitle").style.display = "none";
    document.getElementById("bottomtitle").textContent = baslama_suresi;
    document.getElementById("bottomtitle").classList.add("loa");
    shred();
    var startTimerFirs = setInterval(() => {
      if (baslama_suresi <= 1) {
        clearInterval(startTimerFirs);
        start = true;
        var btnPause = setTimeout(() => {
          document.getElementById("pause").style.display = "block";
          clearTimeout(btnPause);
        }, 2000);
        document.getElementById("startmenu").style.display = "none";
        document.getElementById("txt").style.display = "block";
        TimeStamp(1);
        if (learn == true) {
          document.getElementById("timer").style.display = "block";
          startTimer(dakika, 0);
          degisenKelime(0, getHiz);
        } else {
          degisenKelime(0, 1000);
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

var Fulltext;
function shred() {
  var allText = document.getElementById("lblHiddenArticle").textContent;
  allText.trim();
  Fulltext = allText.split(" ");
}

document.getElementById("inpMovement").oninput = function () {
  document.getElementById("txtMovement").textContent = this.value;
};

document.getElementById("inpSpeed").oninput = function () {
  document.getElementById("txtSpeed").textContent = this.value;
  var speed = Number(document.getElementById("txtSpeed").textContent);
  if (pause == false) {
    clearInterval(sure);
    degisenKelime(kelimeSirasi, speed);
  }
};

document.getElementById("inpFontSize").oninput = function () {
  document.getElementById("txtFontSize").textContent = this.value;
  document.getElementById("getWord").style.fontSize = this.value + "px";
};

document.getElementById("pause").addEventListener("click", function () {
  okunanKelime = Number(document.getElementById("gizli_okunan_kelime").value);
  pause = true;
  this.style.display = "none";
  document.getElementById("resume").style.display = "block";
  if (learn == true) {
    clearTimeout(id);
  }
  clearInterval(sure);
  clearInterval(timerSet);
  swal({
    text: "Okuma Hızın : " + okumaHizi(okunanKelime, timeV) + " kelime/dakika",
    button: "TAMAM",
  });
});

document.getElementById("resume").addEventListener("click", function () {
  pause = false;
  var level = Number(document.getElementById("txtMovement").textContent);
  this.style.display = "none";
  document.getElementById("pause").style.display = "block";
  var speed = Number(document.getElementById("txtSpeed").textContent);
  if (learn == true) {
    startTimer(minute, second);
  }
  TimeStamp(timeV);
  degisenKelime(kelimeSirasi + level, speed);
});

//Kelime hesaplama

var sure;
var kelimeSirasi;
var baslangic_deger;
var gelenYaziDeger;
function degisenKelime(d, v) {
  var gidenYazi = document.getElementById("getWord");
  gelenYaziDeger = Fulltext;
  var okunan_kelime = document.getElementById("gizli_okunan_kelime");

  baslangic_deger = d;
  // var progres = Fulltext.length / 600;
  sure = setInterval(function () {
    var genis = Math.rastgele(0, 680);
    var yuksek = Math.rastgele(0, 520);
    var hseviye = Number(document.getElementById("txtMovement").textContent);
    // var prog = document.getElementById("lblOkunanKelimeSayisi");
    // var newProgres = progres * Number(hseviye);

    // document.getElementById("okumaHizi").textContent = okumaHizi(
    //   Fulltext.length,
    //   timeV
    // );

    if (Number(hseviye) == 1) {
      document.getElementById("getWord").style.left = genis + "px";
      document.getElementById("getWord").style.top = yuksek + "px";
      gidenYazi.textContent = gelenYaziDeger[baslangic_deger];
      okunan_kelime.value = baslangic_deger + 1;
      kelimeSirasi = baslangic_deger;
      baslangic_deger++;
      // prog.style.width = newProgres * kelimeSirasi + "px";
    } else if (Number(hseviye) == 2) {
      document.getElementById("getWord").style.left = genis + "px";
      document.getElementById("getWord").style.top = yuksek + "px";
      gidenYazi.textContent =
        gelenYaziDeger[baslangic_deger] +
        " " +
        gelenYaziDeger[baslangic_deger + 1];
      okunan_kelime.value = baslangic_deger + 2;
      kelimeSirasi = baslangic_deger;
      baslangic_deger += 2;
      // prog.style.width = newProgres * kelimeSirasi + "px";
    } else if (Number(hseviye) == 3) {
      document.getElementById("getWord").style.left = genis + "px";
      document.getElementById("getWord").style.top = yuksek + "px";
      gidenYazi.textContent =
        gelenYaziDeger[baslangic_deger] +
        " " +
        gelenYaziDeger[baslangic_deger + 1] +
        " " +
        gelenYaziDeger[baslangic_deger + 2];
      okunan_kelime.value = baslangic_deger + 3;
      kelimeSirasi = baslangic_deger;
      baslangic_deger += 3;
      // prog.style.width = newProgres * kelimeSirasi + "px";
    } else if (Number(hseviye) == 4) {
      document.getElementById("getWord").style.left = genis + "px";
      document.getElementById("getWord").style.top = yuksek + "px";
      gidenYazi.textContent =
        gelenYaziDeger[baslangic_deger] +
        " " +
        gelenYaziDeger[baslangic_deger + 1] +
        " " +
        gelenYaziDeger[baslangic_deger + 2] +
        " " +
        gelenYaziDeger[baslangic_deger + 3];
      okunan_kelime.value = baslangic_deger + 4;
      kelimeSirasi = baslangic_deger;
      baslangic_deger += 4;
      // prog.style.width = newProgres * kelimeSirasi + "px";
    }

    if (baslangic_deger >= gelenYaziDeger.length) {
      okunanKelime = Number(
        document.getElementById("gizli_okunan_kelime").value
      );
      clearInterval(sure);
      gidenYazi.textContent = "SON.";
      clearTimeout(timerSet);
      document.getElementById("pause").style.display = "none";
      document.getElementById("resume").style.display = "none";

      swal({
        text:
          "Okuma Hızın : " + okumaHizi(okunanKelime, timeV) + " kelime/dakika",
        button: "TAMAM",
      });
    }
  }, v);
}

//-------------------------------------------------------------

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
  clearInterval(sure);
  clearInterval(timerSet);
  var ogr_okunan_kelime_sayisi = document.getElementById(
    "gizli_okunan_kelime"
  ).value;
  var ogr_okuma_hizi = okumaHizi(ogr_okunan_kelime_sayisi, timeV);
  var test_zaman = document.getElementById("gizli_zaman").value;
  $.ajax({
    type: "POST",
    url: "ajax/ajax_goz_cevikligi.php",
    data: {
      bayi_kod: bayi_kod,
      tc: tc_no,
      ad_soyad: ad_soyad,
      sure: timeV,
      okunan_kelime_sayisi: ogr_okunan_kelime_sayisi,
      okuma_hizi: ogr_okuma_hizi,
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
