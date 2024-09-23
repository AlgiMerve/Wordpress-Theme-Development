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
var hareket;
var pause = false;
var start = false;
var _empty = false;

var x = 0;
var y = 1;
var sira = 0;

var genis = 700 - 60;
var yuksek = 550 - 60;

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
    title: "Göz Kaslarını Geliştirme Egzersizi",
    text: "Gözlerimizde toplam 6 adet kas var. Göz kaslarını geliştirmek için koordineli olarak hareket ettirmek gerekmektedir. Bu uygulamayı günde en az 5 dakika yaparak göz kaslarınızı geliştirebilirsiniz. Hızınızı ve egzersiz seviyenizi kendinize göre ayarlayabilirsiniz. Bu egzersizde, başını sabit tutarak ekranda hareket eden görseli gözlerinle takip etmen beklenmektedir.",
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
        document.getElementById("startmenu").style.display = "none";
        document.getElementById("txt").style.display = "block";
        document.getElementById("pause").style.display = "block";
        TimeStamp(1);

        if (learn == true) {
          var level = Number(
            document.getElementById("txtMovement").textContent
          );
          switch (level) {
            case 1:
              Z_kisa_hareket(getHiz);
              break;
            case 2:
              N_kisa_hareket(getHiz);
              break;
            case 3:
              Z_uzun_hareket(getHiz);
              break;
            case 4:
              N_uzun_hareket(getHiz);
              break;
            case 5:
              X_hareket(getHiz);
              break;
            case 6:
              Y_hareket(getHiz);
              break;
            case 7:
              M_hareket(getHiz);
              break;
          }
          document.getElementById("timer").style.display = "block";
          startTimer(dakika, 0);
        } else {
          Z_kisa_hareket(1000);
          document.getElementById("feature").style.display = "block";
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
  clearInterval(hareket);
  clearInterval(timerSet);
});

document.getElementById("resume").addEventListener("click", function () {
  pause = false;
  this.style.display = "none";
  var speed = Number(document.getElementById("txtSpeed").textContent);
  var level = Number(document.getElementById("txtMovement").textContent);
  switch (level) {
    case 1:
      Z_kisa_hareket(speed);
      break;
    case 2:
      N_kisa_hareket(speed);
      break;
    case 3:
      Z_uzun_hareket(speed);
      break;
    case 4:
      N_uzun_hareket(speed);
      break;
    case 5:
      X_hareket(speed);
      break;
    case 6:
      Y_hareket(speed);
      break;
    case 7:
      M_hareket(speed);
      break;
  }

  document.getElementById("pause").style.display = "block";
  if (learn == true) {
    startTimer(minute, second);
  }
  TimeStamp(timeV);
});

document.getElementById("inpPicture").oninput = function () {
  var deger = this.value;
  // console.log(deger);
  document.getElementById("ikon").src = "images/ikon" + deger + ".png";
  document.getElementById("imgPicture").src = "images/ikon" + deger + ".png";
};

document.getElementById("inpMovement").oninput = function () {
  document.getElementById("txtMovement").textContent = this.value;
  if (pause == false) {
    x = 0;
    y = 1;
    sira = 0;

    var speed = Number(document.getElementById("txtSpeed").textContent);
    var level = Number(document.getElementById("txtMovement").textContent);

    clearInterval(hareket);

    switch (level) {
      case 1:
        Z_kisa_hareket(speed);
        break;
      case 2:
        N_kisa_hareket(speed);
        break;
      case 3:
        Z_uzun_hareket(speed);
        break;
      case 4:
        N_uzun_hareket(speed);
        break;
      case 5:
        X_hareket(speed);
        break;
      case 6:
        Y_hareket(speed);
        break;
      case 7:
        M_hareket(speed);
        break;
    }
  }
};

document.getElementById("inpSpeed").oninput = function () {
  document.getElementById("txtSpeed").textContent = this.value;
  if (pause == false) {
    var level = Number(document.getElementById("txtMovement").textContent);
    clearInterval(hareket);
    switch (level) {
      case 1:
        Z_kisa_hareket(this.value);
        break;
      case 2:
        N_kisa_hareket(this.value);
        break;
      case 3:
        Z_uzun_hareket(this.value);
        break;
      case 4:
        N_uzun_hareket(this.value);
        break;
      case 5:
        X_hareket(this.value);
        break;
      case 6:
        Y_hareket(this.value);
        break;
      case 7:
        M_hareket(this.value);
        break;
    }
  }
};

function pauseTimer() {
  PutLearnTime();
  clearInterval(hareket);
  clearInterval(timerSet);
  var test_zaman = document.getElementById("gizli_zaman").value;
  $.ajax({
    type: "POST",
    url: "ajax/ajax_goz_sonuc.php",
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

function Z_kisa_hareket(hiz) {
  hareket = setInterval(() => {
    var dizi = [
      genis,
      0,
      0,
      yuksek / 5,
      genis,
      yuksek / 5,
      0,
      (yuksek / 5) * 2,
      genis,
      (yuksek / 5) * 2,
      0,
      (yuksek / 5) * 3,
      genis,
      (yuksek / 5) * 3,
      0,
      (yuksek / 5) * 4,
      genis,
      (yuksek / 5) * 4,
      0,
      yuksek,
      genis,
      yuksek,
      0,
      0,
    ];
    document.getElementById("ikon").style.left = dizi[x] + "px";
    document.getElementById("ikon").style.top = dizi[y] + "px";
    x += 2;
    y += 2;
    sira++;
    if (sira % (dizi.length / 2) == 0) {
      x = 0;
      y = 1;
    }
  }, hiz);
}

function N_kisa_hareket(hiz) {
  hareket = setInterval(() => {
    var dizi = [
      0,
      0,
      0,
      yuksek,
      genis / 5,
      0,
      genis / 5,
      yuksek,
      (genis / 5) * 2,
      0,
      (genis / 5) * 2,
      yuksek,
      (genis / 5) * 3,
      0,
      (genis / 5) * 3,
      yuksek,
      (genis / 5) * 4,
      0,
      (genis / 5) * 4,
      yuksek,
      genis,
      0,
      genis,
      yuksek,
    ];
    // console.log(genis);
    // console.log(yuksek);

    // console.log(sira);
    document.getElementById("ikon").style.left = dizi[x] + "px";
    document.getElementById("ikon").style.top = dizi[y] + "px";
    x += 2;
    y += 2;
    sira++;
    if (sira % (dizi.length / 2) == 0) {
      x = 0;
      y = 1;
    }
  }, hiz);
}

function Z_uzun_hareket(hiz) {
  hareket = setInterval(() => {
    var dizi = [0, 0, genis, 0, 0, yuksek, genis, yuksek];

    document.getElementById("ikon").style.left = dizi[x] + "px";
    document.getElementById("ikon").style.top = dizi[y] + "px";
    x += 2;
    y += 2;
    sira++;
    if (sira % (dizi.length / 2) == 0) {
      x = 0;
      y = 1;
    }
  }, hiz);
}

function N_uzun_hareket(hiz) {
  hareket = setInterval(() => {
    var dizi = [0, 0, 0, yuksek, genis, 0, genis, yuksek];
    document.getElementById("ikon").style.left = dizi[x] + "px";
    document.getElementById("ikon").style.top = dizi[y] + "px";
    x += 2;
    y += 2;
    sira++;
    if (sira % (dizi.length / 2) == 0) {
      x = 0;
      y = 1;
    }
  }, hiz);
}

function X_hareket(hiz) {
  hareket = setInterval(() => {
    var dizi = [
      0,
      0,
      genis / 2,
      yuksek / 2,
      genis,
      yuksek,
      genis,
      0,
      genis / 2,
      yuksek / 2,
      0,
      yuksek,
    ];
    document.getElementById("ikon").style.left = dizi[x] + "px";
    document.getElementById("ikon").style.top = dizi[y] + "px";
    x += 2;
    y += 2;
    sira++;
    if (sira % (dizi.length / 2) == 0) {
      x = 0;
      y = 1;
    }
  }, hiz);
}

function Y_hareket(hiz) {
  hareket = setInterval(() => {
    var dizi = [
      genis / 2,
      0,
      genis / 5,
      yuksek,
      (genis / 5) * 4,
      yuksek / 2,
      genis / 5,
      yuksek / 2,
      (genis / 5) * 4,
      yuksek,
    ];
    document.getElementById("ikon").style.left = dizi[x] + "px";
    document.getElementById("ikon").style.top = dizi[y] + "px";
    x += 2;
    y += 2;
    sira++;
    if (sira % (dizi.length / 2) == 0) {
      x = 0;
      y = 1;
    }
  }, hiz);
}

function M_hareket(hiz) {
  hareket = setInterval(() => {
    var dizi = [
      0,
      0,
      0,
      yuksek / 2,
      0,
      yuksek,
      genis / 2,
      yuksek,
      genis,
      yuksek,
      genis,
      yuksek / 2,
      genis,
      0,
      genis / 2,
      0,
    ];

    document.getElementById("ikon").style.left = dizi[x] + "px";
    document.getElementById("ikon").style.top = dizi[y] + "px";
    x += 2;
    y += 2;
    sira++;
    if (sira % (dizi.length / 2) == 0) {
      x = 0;
      y = 1;
    }
  }, hiz);
}
