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
  document.getElementById("txtMovemnet").textContent = getLevel;
  document.getElementById("inpMovemnet").value = getLevel;
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
var _gecis = false;
var pause = false;
var start = false;
var _empty = false;
var translationTimer;

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

let timerSet;
let timeV;
function TimeStamp(t) {
  timerSet = setInterval(() => {
    t++;
    timeV = t;
  }, 1000);
}

Math.rastgele = function (alt, ust) {
  let sayi = Math.random();
  sayi = sayi * (ust - alt);
  sayi = Math.floor(sayi) + alt;

  return sayi;
};

var ana_kelime;
var celdirici;
var ana_kac;
var celdirici_kac;
var isaretler_dizi = [];
var var_mi = [];
var son_dizi = [];
var kelime_dizisi = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "Ğ",
  "H",
  "I",
  "İ",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "Ö",
  "P",
  "R",
  "S",
  "Ş",
  "T",
  "U",
  "Ü",
  "V",
  "Y",
  "Z",
];

function swAlert() {
  swal({
    title: "Farklı Olanı Bulma Egzersizi",
    text: "Bu egzersizde, satırlarda düzgün aralıklarla dizilmiş karakterlerin içinden dizilimi bozanları tıklayarak belirlemen gerekiyor.",
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

var id;
function startTimer(m, s) {
  document.getElementById("lblSureBox").textContent = m + " : " + s;
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
    tiklama = 1;
    ata(3, gecis);
  }
  s = s + 1;
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
        TimeStamp(1);
        var btnPause = setTimeout(() => {
          document.getElementById("pause").style.display = "block";
          clearTimeout(btnPause);
        }, 2000);

        if (learn == true) {
          document.getElementById("timer").style.display = "block";

          document.getElementById("txtMovemnet").textContent = Number(getLevel);
          document.getElementById("inpMovemnet").value = Number(getLevel);

          document.getElementById("txtSpeed").textContent = Number(getHiz);
          document.getElementById("inpSpeed").value = Number(getHiz);

          startTimerS(dakika, 0);
          ata(3, gecis);
        } else {
          ata(3, gecis);
          //gecis(3);

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

document.getElementById("inpSpeed").oninput = function () {
  document.getElementById("txtSpeed").textContent = this.value;
  if (pause == false) {
    clearTimeout(id);
    clearInterval(translationTimer);
    ata(3, gecis);
  }
};

document.getElementById("inpMovemnet").oninput = function () {
  document.getElementById("txtMovemnet").textContent = this.value;
  if (pause == false) {
    clearTimeout(id);
    clearInterval(translationTimer);
    ata(3, gecis);
  }
};

document.getElementById("pause").addEventListener("click", function () {
  pause = true;
  this.style.display = "none";
  if (learn == true) {
    clearTimeout(idx);
  }
  clearTimeout(id);
  clearInterval(translationTimer);
  document.getElementById("resume").style.display = "block";
  clearInterval(timerSet);
});

document.getElementById("resume").addEventListener("click", function () {
  pause = false;
  this.style.display = "none";
  if (learn == true) {
    startTimerS(minute, second);
  }

  TimeStamp(timeV);
  ata(3, gecis);
  document.getElementById("pause").style.display = "block";
});

function ata(sure, calback) {
  _gecis = false;
  tiklama = 1;
  isaretler_dizi = [];
  var_mi = [];
  son_dizi = [];
  document.getElementById("yerlesen_kelimeler").style.display = "none";
  document.getElementById("transition").style.display = "block";
  document.getElementById("transitionTimer").textContent = "3";

  var zorluk = Number(document.getElementById("txtMovemnet").textContent);
  document.getElementById("yerlesen_kelimeler").innerHTML = "";

  var sira_1 = Math.rastgele(0, kelime_dizisi.length);
  ana_kelime = kelime_dizisi[sira_1];

  var sira_2 = Math.rastgele(0, kelime_dizisi.length);
  celdirici = kelime_dizisi[sira_2];

  if (ana_kelime != celdirici) {
    if (zorluk == 1) {
      ana_kac = Math.rastgele(3, 10);
      celdirici_kac = 96 - ana_kac;

      for (let i = 0; i < ana_kac; i++) {
        isaretler_dizi.push(ana_kelime);
      }

      for (let x = 0; x < celdirici_kac; x++) {
        isaretler_dizi.push(celdirici);
      }

      while (son_dizi.length < 96) {
        var deger = Math.rastgele(0, 96);
        if (var_mi.indexOf(deger) == -1) {
          son_dizi.push(isaretler_dizi[deger]);
          var_mi.push(deger);
        }
      }
      eleman_olustur("h2");
    } else if (zorluk == 2) {
      ana_kac = Math.rastgele(11, 16);
      celdirici_kac = 128 - ana_kac;

      for (let i = 0; i < ana_kac; i++) {
        isaretler_dizi.push(ana_kelime);
      }

      for (let x = 0; x < celdirici_kac; x++) {
        isaretler_dizi.push(celdirici);
      }

      while (son_dizi.length < 128) {
        var deger = Math.rastgele(0, 128);
        if (var_mi.indexOf(deger) == -1) {
          son_dizi.push(isaretler_dizi[deger]);
          var_mi.push(deger);
        }
      }
      eleman_olustur("h3");
    } else if (zorluk == 3) {
      ana_kac = Math.rastgele(16, 21);
      celdirici_kac = 160 - ana_kac;

      for (let i = 0; i < ana_kac; i++) {
        isaretler_dizi.push(ana_kelime);
      }

      for (let x = 0; x < celdirici_kac; x++) {
        isaretler_dizi.push(celdirici);
      }

      while (son_dizi.length < 160) {
        var deger = Math.rastgele(0, 160);
        if (var_mi.indexOf(deger) == -1) {
          son_dizi.push(isaretler_dizi[deger]);
          var_mi.push(deger);
        }
      }
      eleman_olustur("h4");
    }

    calback(sure);
  } else {
    ata(3, gecis);
  }
}

function eleman_olustur(boyut) {
  var tbody = document.getElementById("yerlesen_kelimeler");
  for (let i = 0; i < son_dizi.length; i += 16) {
    var tr = `<tr>
    <td class="fw-bold ${boyut} wordts">${son_dizi[i]}</td>
    <td class="fw-bold ${boyut} wordts">${son_dizi[i + 1]}</td>
    <td class="fw-bold ${boyut} wordts">${son_dizi[i + 2]}</td>
    <td class="fw-bold ${boyut} wordts">${son_dizi[i + 3]}</td>
    <td class="fw-bold ${boyut} wordts">${son_dizi[i + 4]}</td>
    <td class="fw-bold ${boyut} wordts">${son_dizi[i + 5]}</td>
    <td class="fw-bold ${boyut} wordts">${son_dizi[i + 6]}</td>
    <td class="fw-bold ${boyut} wordts">${son_dizi[i + 7]}</td>
    <td class="fw-bold ${boyut} wordts">${son_dizi[i + 8]}</td>
    <td class="fw-bold ${boyut} wordts">${son_dizi[i + 9]}</td>
    <td class="fw-bold ${boyut} wordts">${son_dizi[i + 10]}</td>
    <td class="fw-bold ${boyut} wordts">${son_dizi[i + 11]}</td>
    <td class="fw-bold ${boyut} wordts">${son_dizi[i + 12]}</td>
    <td class="fw-bold ${boyut} wordts">${son_dizi[i + 13]}</td>
    <td class="fw-bold ${boyut} wordts">${son_dizi[i + 14]}</td>
    <td class="fw-bold ${boyut} wordts">${son_dizi[i + 15]}</td>
</tr>`;
    tbody.innerHTML += tr;
  }
}

function gecis(time) {
  var baslama_suresi = time;
  translationTimer = setInterval(() => {
    if (baslama_suresi == 1) {
      clearInterval(translationTimer);
      document.getElementById("transition").style.display = "none";
      document.getElementById("yerlesen_kelimeler").style.display = "block";
      document.getElementById("yerlesen_kelimeler").style.textAlign = "center";

      _gecis = true;
      startTimer(0, 0);
    } else {
      baslama_suresi--;
      document.getElementById("transitionTimer").textContent = baslama_suresi;
    }
  }, 1000);
}

var tiklama = 1;
document
  .getElementById("yerlesen_kelimeler")
  .addEventListener("click", function (e) {
    if (
      e.target.tagName == "TD" &&
      e.target.classList[2] == "wordts" &&
      pause == false
    ) {
      if (e.target.textContent == ana_kelime) {
        console.log(e.target.classList);
        if (tiklama != ana_kac) {
          e.target.classList.remove("wordts");
          e.target.style.backgroundColor = "green";
          tiklama++;
        } else {
          document.getElementById("lblSureBox").textContent = "0 : 0";
          clearInterval(id);
          e.target.style.backgroundColor = "green";
          tiklama = 1;
          var skor = Number(
            document.getElementById("lblDogruSayisiSkor").textContent
          );
          skor++;
          document.getElementById("lblDogruSayisiSkor").textContent = skor;
          var bekleme = setTimeout(() => {
            clearTimeout(bekleme);
            ata(3, gecis);
          }, 1000);
        }
      } else {
        e.target.style.backgroundColor = "red";
      }
    }

    e.stopPropagation();
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
  clearInterval(translationTimer);
  var ogr_dogru_sayisi =
    document.getElementById("lblDogruSayisiSkor").textContent;
  var ogr_yanlis_sayisi = document.getElementById(
    "lblYanlisSayisiSkor"
  ).textContent;
  var test_zaman = document.getElementById("gizli_zaman").value;
  $.ajax({
    type: "POST",
    url: "ajax/ajax_farkli_olan_sonuc.php",
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
