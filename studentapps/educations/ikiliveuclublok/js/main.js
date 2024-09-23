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
  var getHiz = kisim[1].split("&")[2].split("=")[1];
  var getSutun = kisim[1].split("&")[3].split("=")[1];
  getSeviye = Number(kisim[1].split("&")[4].split("=")[1]) + 1;
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

var sira = 0;
var timerTravel;

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
    title: "İkili ve Üçlü Blok Egzersizi",
    text: "Bu egzersizde, başını sabit tutarak ve iç seslendirme yapmadan, bloklarda vurgulanan kelimeleri gözlerinle soldan sağa doğru takip etmen bekleniyor. Kelimeleri, fotoğrafa bakar gibi bir bütün olarak görmeye çalışmalısın. İlk başlarda kelimeleri okuyamaman normal, önemli olan bütün olarak görmeye çalışman.",
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
          Ata(Number(getLevel), Number(getSutun), Number(getHiz), Gez);
          document.getElementById("timer").style.display = "block";
          startTimer(dakika, 0);
        } else {
          Ata(1, 2, 1000, Gez);
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
    clearInterval(id);
  }
  clearInterval(timerTravel);
  clearInterval(timerSet);
});

document.getElementById("resume").addEventListener("click", function () {
  pause = false;
  this.style.display = "none";
  Gez(Number(document.getElementById("txtSpeed").textContent));
  document.getElementById("pause").style.display = "block";
  if (learn == true) {
    startTimer(minute, second);
  }
  TimeStamp(timeV);
});

//İlk range menü
document.getElementById("inpMovement").oninput = function () {
  clearInterval(timerTravel);
  document.getElementById("txtMovement").textContent = this.value;
  var hiz = Number(document.getElementById("txtSpeed").textContent);
  var sutun = Number(document.getElementById("txtColumn").textContent);
  if (pause == false) {
    sira = 0;
    document.getElementById("txtrow").textContent = "";
    Ata(Number(this.value), sutun, hiz, Gez);
  }
};

//İlk range menü

//İkinci range menü

document.getElementById("inpSpeed").oninput = function () {
  clearInterval(timerTravel);
  document.getElementById("txtSpeed").textContent = this.value;
  if (pause == false) {
    Gez(Number(this.value));
  }
};

//İkinci range menü

//Üçüncü range menü

document.getElementById("inpColumn").oninput = function () {
  clearInterval(timerTravel);
  document.getElementById("txtColumn").textContent = this.value;
  var hiz = Number(document.getElementById("txtSpeed").textContent);
  var seviye = Number(document.getElementById("txtMovement").textContent);
  if (pause == false) {
    sira = 0;
    document.getElementById("txtrow").textContent = "";
    Ata(seviye, Number(this.value), hiz, Gez);
  }
};

//Üçüncü range menü

function pauseTimer() {
  PutLearnTime();
  clearInterval(timerTravel);
  clearInterval(timerSet);
  var test_zaman = document.getElementById("gizli_zaman").value;
  $.ajax({
    type: "POST",
    url: "ajax/ajax_ikili_uclu_sonuc.php",
    data: {
      bayi_kod: bayi_kod,
      tc: tc_no,
      ad_soyad: ad_soyad,
      sure: timeV,
      zaman: test_zaman,
    },
    success: function (res) {
      if (learn != true && learn != true) {
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

function highlightFunction(elt) {
  if (elt != null) {
    //Pembeye benzer renk
    elt.style.backgroundColor = "#e99fff";
  }
}

function unHighlightFunction() {
  $(".word").css({
    "background-color": "#d3d3d3",
    color: "black",
    border: "none",
  });
}

function Ata(level, column, speed, calback) {
  var _column = column;
  $.ajax({
    type: "POST",
    url: "ajax/ajax_kelime_getir.php",
    data: { level, column },
    success: function (data) {
      var div = document.getElementById("txtrow");
      var dizi = data.split("_*_");
      dizi.pop();
      if (_column == 3) {
        for (let i = 0; i < dizi.length; i++) {
          var divs = `<div class="word col-4 text-center my-1 fw-bold h4 rounded-pill">${dizi[i]}</div>`;
          div.innerHTML += divs;
        }
      } else {
        for (let i = 0; i < dizi.length; i++) {
          var divs = `<div class="word col-6 text-center my-1 fw-bold h4 rounded-pill">${dizi[i]}</div>`;
          div.innerHTML += divs;
        }
      }

      calback(speed);
    },
  });
}

function Gez(speed) {
  var element_sayisi = document.getElementById("txtrow").childElementCount;
  var seviye = Number(document.getElementById("txtMovement").textContent);
  var hiz = Number(document.getElementById("txtSpeed").textContent);
  var sutun = Number(document.getElementById("txtColumn").textContent);

  timerTravel = setInterval(() => {
    if (sira != element_sayisi) {
      if (sira > 0) {
        unHighlightFunction();
      }
      highlightFunction(document.getElementById("txtrow").children[sira]);
      sira++;
    } else {
      clearInterval(timerTravel);
      document.getElementById("txtrow").textContent = "";
      sira = 0;
      Ata(seviye, sutun, hiz, Gez);
    }
  }, speed);
}
