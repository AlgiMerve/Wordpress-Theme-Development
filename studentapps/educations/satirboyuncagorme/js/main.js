//Şimdilik Kısım
var learn = false;
var dakika;
var tam_url = window.location.href;
var kisim = tam_url.split("?");
var getHiz;
var nextUrl;
var getUzaklik;
var getSeviye;
if (kisim[1]) {
  var getSure = kisim[1].split("&")[0].split("=")[1];
  var getLevel = Number(kisim[1].split("&")[1].split("=")[1]);
  getHiz = kisim[1].split("&")[2].split("=")[1];
  getUzaklik = Number(kisim[1].split("&")[3].split("=")[1]);
  getSeviye = Number(kisim[1].split("&")[4].split("=")[1]) + 1;

  document.getElementById("txtDistance").textContent = getUzaklik;
  document.getElementById("inpDistance").value = getUzaklik;
  document.getElementById("txtSpeed").textContent = getHiz;
  document.getElementById("inpSpeed").value = getHiz;
  document.getElementById("txtMovement").textContent = getLevel;
  document.getElementById("inpMovement").value = getLevel;
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
    title: "Satır Boyunca Görme Egzersizi",
    text: "Bu uygulama ile gözün satır boyunca daha geniş bir alanı görmesini sağlayabilirsiniz. Ekranın ortasında ki çizgiye odaklanarak kenarlardaki kelime ve kelime gruplarını gözlerinizi hareket ettirmeden okumaya çalışın.",
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
        start = true;
        clearInterval(startTimerFirs);
        TimeStamp(1);
        document.getElementById("startmenu").style.display = "none";
        document.getElementById("txt").style.display = "block";
        document.getElementById("pause").style.display = "block";

        if (learn == true) {
          document.getElementById("timer").style.display = "block";
          startTimer(dakika, 0);
          nextWord(getHiz);
          switch (getUzaklik) {
            case 1:
              document.getElementById("word_1").style.right = "16px";
              document.getElementById("word_2").style.left = "16px";
              break;
            case 2:
              document.getElementById("word_1").style.right = "64px";
              document.getElementById("word_2").style.left = "64px";
              break;
            case 3:
              document.getElementById("word_1").style.right = "150px";
              document.getElementById("word_2").style.left = "150px";
              break;
            case 4:
              document.getElementById("word_1").style.right = "200px";
              document.getElementById("word_2").style.left = "200px";
              break;
            case 5:
              document.getElementById("word_1").style.right = "260px";
              document.getElementById("word_2").style.left = "260px";
              break;
          }
        } else {
          document.getElementById("feature").style.display = "block";
          nextWord(1000);
        }
      } else {
        baslama_suresi--;
        document.getElementById("bottomtitle").textContent = baslama_suresi;
      }
    }, 1000);
  }
  _empty = true;
});

document.getElementById("pause").addEventListener("click", function () {
  pause = true;
  this.style.display = "none";
  document.getElementById("resume").style.display = "block";
  if (learn == true) {
    clearTimeout(id);
  }
  clearInterval(timerSet);
  clearInterval(_interval);
});

document.getElementById("resume").addEventListener("click", function () {
  pause = false;
  this.style.display = "none";
  var hiz = Number(document.getElementById("txtSpeed").textContent);
  if (learn == true) {
    startTimer(minute, second);
  }
  nextWord(hiz);
  document.getElementById("pause").style.display = "block";
  TimeStamp(timeV);
});

document.getElementById("inpMovement").oninput = function () {
  document.getElementById("txtMovement").textContent = this.value;
};

document.getElementById("inpSpeed").oninput = function () {
  document.getElementById("txtSpeed").textContent = this.value;
  if (pause != true) {
    clearInterval(_interval);
    nextWord(Number(this.value));
  }
};

document.getElementById("inpFontSize").oninput = function () {
  document.getElementById("txtFontSize").textContent = this.value;
  $(".wrd").css("font-size", Number(this.value));
};

document.getElementById("inpDistance").oninput = function () {
  document.getElementById("txtDistance").textContent = this.value;
  switch (Number(this.value)) {
    case 1:
      document.getElementById("word_1").style.right = "16px";
      document.getElementById("word_2").style.left = "16px";
      break;
    case 2:
      document.getElementById("word_1").style.right = "64px";
      document.getElementById("word_2").style.left = "64px";
      break;
    case 3:
      document.getElementById("word_1").style.right = "150px";
      document.getElementById("word_2").style.left = "150px";
      break;
    case 4:
      document.getElementById("word_1").style.right = "200px";
      document.getElementById("word_2").style.left = "200px";
      break;
    case 5:
      document.getElementById("word_1").style.right = "260px";
      document.getElementById("word_2").style.left = "260px";
      break;
  }
};

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
  clearTimeout(timerSet);
  clearInterval(_interval);
  var test_zaman = document.getElementById("gizli_zaman").value;
  $.ajax({
    type: "POST",
    url: "ajax/ajax_satir_boyu_sonuc.php",
    data: {
      bayi_kod: bayi_kod,
      tc: tc_no,
      ad_soyad: ad_soyad,
      sure: timeV,
      zaman: test_zaman,
    },
    success: function (res) {
      if (learn != true) {
        window.location = "../../exercises.php";
      }
    },
  });
}

var _interval;
function nextWord(speed) {
  _interval = setInterval(() => {
    kelimeGetir(Number(document.getElementById("txtMovement").textContent));
  }, speed);
}

function kelimeGetir(seviye_kelime) {
  $.ajax({
    type: "POST",
    url: "ajax/ajax_kelime_getir.php",
    data: { seviye_kelime },
    success: function (data) {
      document.getElementById("word_1").textContent = "";
      document.getElementById("word_2").textContent = "";
      var degerler = data.split("_?_");
      document.getElementById("word_1").textContent = degerler[0];
      document.getElementById("word_2").textContent = degerler[1];
    },
  });
}

//-----------------------------------------------------------------
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
