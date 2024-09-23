var learn = false;
var dakika;
var tam_url = window.location.href;
var kisim = tam_url.split("?");
var nextUrl;
var getLevel;
var getSeviye;
if (kisim[1]) {
  var getSure = kisim[1].split("&")[0].split("=")[1];
  getLevel = Number(kisim[1].split("&")[1].split("=")[1]);
  getSeviye = Number(kisim[1].split("&")[2].split("=")[1]) + 1;
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
    if ((m == 0 && s == 00) || _value < deger) {
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
var start = false;
var _empty = false;

var _value;

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
    title: "Sayıları Sıralama Egzersizi",
    text: "Karışık olarak verilmiş olan sayıları doğru bir şekilde sırlamanız gerekmektedirç Bu egzersiz ile göz kaslarınız gelişirken odaklanma seviyenizde de bir artış yaşanacaktır.",
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

document.querySelector(".startmenu").addEventListener("click", function () {
  if (_empty == false) {
    document.getElementById("toptitle").style.display = "none";
    document.getElementById("bottomtitle").textContent = baslama_suresi;
    document.getElementById("bottomtitle").classList.add("loa");
    var startTimerFirs = setInterval(() => {
      if (baslama_suresi <= 1) {
        TimeStamp(1);
        clearInterval(startTimerFirs);
        document.getElementById("startmenu").style.display = "none";
        document.getElementById("txt").style.display = "block";
        if (learn == true) {
          switch (getLevel) {
            case 1:
              createTable(10, 2, 5);
              break;
            case 2:
              createTable(50, 10, 5);
              break;
            case 3:
              createTable(100, 10, 10);
              break;
          }

          document.getElementById("timer").style.display = "block";
          startTimer(dakika, 0);
        } else {
          createTable(10, 2, 5);
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

document.getElementById("inpMovement").oninput = function () {
  document.getElementById("txtMovement").textContent = this.value;
  var _table = document.getElementById("show");
  deger = 1;
  switch (Number(this.value)) {
    case 1:
      _table.innerHTML = "";
      createTable(10, 2, 5);
      break;
    case 2:
      _table.innerHTML = "";
      createTable(50, 10, 5);
      break;
    case 3:
      _table.innerHTML = "";
      createTable(100, 10, 10);
      break;
  }
};

document.getElementById("inpFontSize").oninput = function () {
  document.getElementById("txtFontSize").textContent = this.value;
  $("td").css("font-size", Number(this.value));
};

//Tablonun oluşturulması ve sayıların tabloya yerleştirilmesi işlemi Başlangıç

//Sayfadaki yerlere
var deger = 1;

document.getElementById("show").addEventListener("click", function (e) {
  if (e.target.textContent == _value && deger >= _value - 1) {
    clearTimeout(timerSet);
    var finish = setTimeout(() => {
      pauseTimer();
      clearTimeout(finish);
    }, 1500);

    swal("Egzersiz sona ermiştir :)");
    //veritabanı kaydını yapıcaz
  }
  if (e.target.textContent == deger) {
    if (deger == 1) {
      start = true;
    }
    e.target.className = "style";
    deger++;
  }
  e.preventDefault();
});

let timerSet;
let timeV;
let timeS;
function TimeStamp(t) {
  timerSet = setInterval(() => {
    t++;
    timeV = t;
  }, 1000);
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

function pauseTimer() {
  PutLearnTime();
  clearTimeout(timerSet);
  var test_zaman = document.getElementById("gizli_zaman").value;
  $.ajax({
    type: "POST",
    url: "ajax/ajax_sayibulma.php",
    data: {
      bayi_kod: bayi_kod,
      tc: tc_no,
      ad_soyad: ad_soyad,
      sure: timeV,
      son_isaret_sayisi: deger - 1,
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

function createTable(value, column, line) {
  var rastgeleSayi;
  var sayac = 0;
  var dizi = [];
  var degisken = dizi.length;

  _value = value;
  while (Number(degisken) < value) {
    rastgeleSayi = Math.floor(Math.random() * value) + 1;
    var kosul = dizi.indexOf(rastgeleSayi);
    if (kosul == -1) {
      dizi.push(rastgeleSayi);
      degisken++;
    }
  }

  var table = document.createElement("table");
  table.className = "table table-striped table-hover";
  var tbdy = document.createElement("tbody");
  var tbody = table.appendChild(tbdy);
  for (var i = 0; i < column; i++) {
    var tr = document.createElement("tr");
    tbody.appendChild(tr);
    for (var j = 0; j < line; j++) {
      var td = document.createElement("td");
      td.innerHTML = dizi[sayac];
      sayac++;
      td.id = "sira_" + sayac;
      tr.appendChild(td);
    }
  }

  document.getElementById("show").appendChild(table);
}

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
