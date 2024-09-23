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

var ana_kelime;
var celdirici;
var ana_kac;
var celdirici_kac;
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
    title: "Harf Sayma Egzersizi",
    text: "Bu çalışma size hızlı görmeyi, anlamayı, hafızayı, dikkat ve konsantrasyonu arttırmayı sağlar. Karşınıza rastgele harfler ve sayılar gelecektir. Size sorulan harfin sayısını kutucuğa yazın ve ⏎(Enter) tuşuna basın.",
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
    ata(3,gecis);
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

var inpyazi = document.getElementById("inpYazi");

inpyazi.addEventListener("keyup", (e) => {
  if (e.keyCode === 13 && _gecis == true && pause != true && start == true) {
    // console.log("Doğru cevap : " + ana_kac);
    if (inpyazi.value == ana_kac) {
      inpyazi.focus();
      var skor_dogru = Number(
        document.getElementById("lblDogruSayisiSkor").textContent
      );
      skor_dogru++;
      document.getElementById("lblDogruSayisiSkor").textContent = skor_dogru;
      isaretGorunGizleDogru(500);
      document.getElementById("lblSureBox").textContent = "0 : 0";
      clearTimeout(id);
      ata(3,gecis);
      inpyazi.value = "";
    } else {
      inpyazi.focus();
      var skor_yanlis = Number(
        document.getElementById("lblYanlisSayisiSkor").textContent
      );
      skor_yanlis++;
      document.getElementById("lblYanlisSayisiSkor").textContent = skor_yanlis;
      isaretGorunGizleYanlis(500);
      document.getElementById("lblSureBox").textContent = "0 : 0";
      clearTimeout(id);
      ata(3,gecis);
      inpyazi.value = "";
    }
  }
});

document.getElementById("button_addon").addEventListener("click", function () {
  var inpyazi = document.getElementById("inpYazi");
  if (_gecis == true && pause != true) {
    if (inpyazi.value == ana_kac) {
      inpyazi.focus();
      var skor_dogru = Number(
        document.getElementById("lblDogruSayisiSkor").textContent
      );
      skor_dogru++;
      document.getElementById("lblDogruSayisiSkor").textContent = skor_dogru;
      isaretGorunGizleDogru(500);
      document.getElementById("lblSureBox").textContent = "0 : 0";
      clearTimeout(id);
      ata(3,gecis);
      inpyazi.value = "";
    } else {
      inpyazi.focus();
      var skor_yanlis = Number(
        document.getElementById("lblYanlisSayisiSkor").textContent
      );
      skor_yanlis++;
      document.getElementById("lblYanlisSayisiSkor").textContent = skor_yanlis;
      isaretGorunGizleYanlis(500);
      document.getElementById("lblSureBox").textContent = "0 : 0";
      clearTimeout(id);
      ata(3,gecis);
      inpyazi.value = "";
    }
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
        TimeStamp(1);
        var btnPause = setTimeout(() => {
          document.getElementById("pause").style.display = "block";
          clearTimeout(btnPause);
        }, 2000);

        if (learn == true) {
          document.getElementById("timer").style.display = "block";
          startTimerS(dakika, 0);
          ata(3,gecis);
        } else {
          ata(3,gecis);
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
    ata(3,gecis);
  }
};

document.getElementById("inpMovemnet").oninput = function () {
  document.getElementById("txtMovemnet").textContent = this.value;
  if (pause == false) {
    clearTimeout(id);
    clearInterval(translationTimer);
    ata(3,gecis);
  }
};

document.getElementById("inpFontSize").oninput = function () {
  document.getElementById("txtFontSize").textContent = this.value;
  $(".box").css("font-size", Number(this.value));
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
  ata(3,gecis);
  document.getElementById("pause").style.display = "block";
});

function ata(sure, callback) {
  _gecis = false;
  document.getElementById("yerlesen_kelimeler").style.display = "none";
  document.getElementById("transition").style.display = "block";
  document.getElementById("transitionTimer").textContent = "3";

  var zorluk = Number(document.getElementById("txtMovemnet").textContent);
  document.getElementById("yerlesen_kelimeler").innerHTML = "";
  var sira_1 = Math.rastgele(0, kelime_dizisi.length);
  ana_kelime = kelime_dizisi[sira_1];
  document.getElementById("ana_kelime_kendisi").textContent = ana_kelime;

  var sira_2 = Math.rastgele(0, kelime_dizisi.length);
  celdirici = kelime_dizisi[sira_2];

  if (ana_kelime != celdirici) {
    if (zorluk == 1) {
      ana_kac = Math.rastgele(3, 10);
      celdirici_kac = Math.rastgele(0, 4);
    } else if (zorluk == 2) {
      ana_kac = Math.rastgele(11, 16);
      celdirici_kac = Math.rastgele(3, 6);
    } else if (zorluk == 3) {
      ana_kac = Math.rastgele(16, 21);
      celdirici_kac = Math.rastgele(6, 9);
    }

    for (let i = 0; i < ana_kac; i++) {
      var yatay = Math.rastgele(0, 700);
      var dikey = Math.rastgele(0, 380);
      eleman_olustur(yatay, dikey, ana_kelime);
    }

    for (let x = 0; x < celdirici_kac; x++) {
      var yatay_celdirici = Math.rastgele(0, 700);
      var dikey_celdirici = Math.rastgele(0, 380);
      eleman_olustur(yatay_celdirici, dikey_celdirici, celdirici);
    }

    callback(sure);
  } else {
    ata(3,gecis);
  }
}

function eleman_olustur(left, top, deger) {
  var div = document.getElementById("yerlesen_kelimeler");
  var span = document.createElement("span");
  span.innerHTML = deger;
  span.setAttribute("class", "box");
  span.style.left = left + "px";
  span.style.top = top + "px";
  div.appendChild(span);
}

function gecis(time) {
  var baslama_suresi = time;
  translationTimer = setInterval(() => {
    if (baslama_suresi == 1) {
      clearInterval(translationTimer);
      document.getElementById("transition").style.display = "none";
      document.getElementById("yerlesen_kelimeler").style.display = "block";
      document.getElementById("inpYazi").focus();
      _gecis = true;
      startTimer(0, 0);
    } else {
      baslama_suresi--;
      document.getElementById("transitionTimer").textContent = baslama_suresi;
    }
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
    url: "ajax/ajax_dogru_sayi_sonuc.php",
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
