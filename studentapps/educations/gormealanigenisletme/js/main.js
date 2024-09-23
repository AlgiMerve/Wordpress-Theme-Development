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
var kutu_sira = 1;

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
    title: "Aktif Görme Alanını Genişletme",
    text: "Gözlerimiz bir tek şey üzerinde odaklanmış olsa bile, o cismin çevresinde olan bir sürü bilgiyi de algılama yeteneğine sahiptir. Gözlerini iyi eğiten bir okuyucu aktif görme alanını tam olarak kullanabilir. Bu egzersiz ile gözümüzün görme alanını 4 tarafa doğru geliştirebiliriz.",
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
              kutu(getHiz);
              break;
            case 2:
              cember(getHiz);
              break;
            case 3:
              kutu_fill(getHiz);
              break;
            case 4:
              cember_fill(getHiz);
              break;
          }
          document.getElementById("timer").style.display = "block";
          startTimer(dakika, 0);
        } else {
          kutu(1000);

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
  clearInterval(kutu_interval);
  clearInterval(timerSet);
});

document.getElementById("resume").addEventListener("click", function () {
  pause = false;
  document.getElementById("anaDv_box").innerHTML = "";
  x = 0;
  y = 1;
  kutu_sira = 1;
  this.style.display = "none";
  var speed = Number(document.getElementById("txtSpeed").textContent);
  var level = Number(document.getElementById("txtMovement").textContent);
  switch (level) {
    case 1:
      kutu(speed);
      break;
    case 2:
      cember(speed);
      break;
    case 3:
      kutu_fill(speed);
      break;
    case 4:
      cember_fill(speed);
      break;
  }

  document.getElementById("pause").style.display = "block";
  if (learn == true) {
    startTimer(minute, second);
  }
  TimeStamp(timeV);
});

//İlk range menü
document.getElementById("inpMovement").oninput = function () {
  document.getElementById("txtMovement").textContent = this.value;
  if (pause == false) {
    x = 0;
    y = 1;
    kutu_sira = 1;
    document.getElementById("anaDv_box").innerHTML = "";

    var speed = Number(document.getElementById("txtSpeed").textContent);
    var level = Number(document.getElementById("txtMovement").textContent);

    clearInterval(kutu_interval);

    switch (level) {
      case 1:
        kutu(speed);
        break;
      case 2:
        cember(speed);
        break;
      case 3:
        kutu_fill(speed);
        break;
      case 4:
        cember_fill(speed);
        break;
    }
  }
};

//İlk range menü

//İkinci range menü

document.getElementById("inpSpeed").oninput = function () {
  document.getElementById("txtSpeed").textContent = this.value;
  if (pause == false) {
    var level = Number(document.getElementById("txtMovement").textContent);
    clearInterval(kutu_interval);
    switch (level) {
      case 1:
        kutu(this.value);
        break;
      case 2:
        cember(this.value);
        break;
      case 3:
        kutu_fill(this.value);
        break;
      case 4:
        cember_fill(this.value);
        break;
    }
  }
};

//İkinci range menü

function pauseTimer() {
  PutLearnTime();
  clearInterval(kutu_interval);
  clearInterval(timerSet);
  var test_zaman = document.getElementById("gizli_zaman").value;
  $.ajax({
    type: "POST",
    url: "ajax/ajax_gorme_alani_sonuc.php",
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

function kutu(hiz) {
  var anaDv = document.getElementById("anaDv_box");
  kutu_interval = setInterval(() => {
    if (kutu_sira == 12) {
      document.getElementById("anaDv_box").innerHTML = "";
      kutu_sira = 1;
    } else {
      var div = document.createElement("div");
      div.setAttribute("class", "box");
      div.setAttribute("id", "box_" + kutu_sira);
      div.style.width = kutu_sira * 50 + "px";
      div.style.height = kutu_sira * 50 + "px";
      div.style.left = genis / 2 - kutu_sira * 25 + "px";
      div.style.top = yuksek / 2 - kutu_sira * 25 + "px";
      anaDv.appendChild(div);
      kutu_sira++;
    }
  }, hiz);
}

function cember(hiz) {
  var anaDv = document.getElementById("anaDv_box");
  kutu_interval = setInterval(() => {
    if (kutu_sira == 12) {
      document.getElementById("anaDv_box").innerHTML = "";
      kutu_sira = 1;
    } else {
      var div = document.createElement("div");
      div.setAttribute("class", "circle");
      div.setAttribute("id", "box_" + kutu_sira);
      div.style.width = kutu_sira * 50 + "px";
      div.style.height = kutu_sira * 50 + "px";
      div.style.left = genis / 2 - kutu_sira * 25 + "px";
      div.style.top = yuksek / 2 - kutu_sira * 25 + "px";
      anaDv.appendChild(div);
      kutu_sira++;
    }
  }, hiz);
}

function kutu_fill(hiz) {
  var anaDv = document.getElementById("anaDv_box");
  kutu_interval = setInterval(() => {
    if (kutu_sira == 12) {
      document.getElementById("anaDv_box").innerHTML = "";
      kutu_sira = 1;
    } else {
      var div = document.createElement("div");
      div.setAttribute("class", "box_fill");
      div.setAttribute("id", "box_" + kutu_sira);
      div.style.width = kutu_sira * 50 + "px";
      div.style.height = kutu_sira * 50 + "px";
      div.style.left = genis / 2 - kutu_sira * 25 + "px";
      div.style.top = yuksek / 2 - kutu_sira * 25 + "px";
      anaDv.appendChild(div);
      kutu_sira++;
    }
  }, hiz);
}

function cember_fill(hiz) {
  var anaDv = document.getElementById("anaDv_box");
  kutu_interval = setInterval(() => {
    if (kutu_sira == 12) {
      document.getElementById("anaDv_box").innerHTML = "";
      kutu_sira = 1;
    } else {
      var div = document.createElement("div");
      div.setAttribute("class", "circle_fill");
      div.setAttribute("id", "box_" + kutu_sira);
      div.style.width = kutu_sira * 50 + "px";
      div.style.height = kutu_sira * 50 + "px";
      div.style.left = genis / 2 - kutu_sira * 25 + "px";
      div.style.top = yuksek / 2 - kutu_sira * 25 + "px";
      anaDv.appendChild(div);
      kutu_sira++;
    }
  }, hiz);
}
