var baslama_suresi = 3;
var _gecis = false;
var pause = false;
var start = false;
var _empty = false;
var translationTimer;
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
    ata(3, gecis);
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
      ata(3, gecis);
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
      ata(3, gecis);
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
      ata(3, gecis);
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
      ata(3, gecis);
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
        document.getElementById("txtMovemnet").textContent = 1;
        document.getElementById("inpMovemnet").value = 1;

        document.getElementById("txtSpeed").textContent = 15;
        document.getElementById("inpSpeed").value = 15;

        document.getElementById("txtFontSize").textContent = 22;
        document.getElementById("inpFontSize").value = 22;

        var btnPause = setTimeout(() => {
          document.getElementById("pause").style.display = "block";
          document.getElementById("finishToApp").style.display = "block";
          clearTimeout(btnPause);
        }, 2000);
        ata(3, gecis);
        document.getElementById("feature").style.display = "block";
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

document.getElementById("inpFontSize").oninput = function () {
  document.getElementById("txtFontSize").textContent = this.value;
  $(".box").css("font-size", Number(this.value));
};

document.getElementById("pause").addEventListener("click", function () {
  pause = true;
  this.style.display = "none";
  clearInterval(translationTimer);
  document.getElementById("inpYazi").setAttribute("disabled", true);
  clearTimeout(id);
  document.getElementById("resume").style.display = "block";
  clearInterval(timerSet);
});

document.getElementById("resume").addEventListener("click", function () {
  pause = false;
  this.style.display = "none";
  document.getElementById("inpYazi").removeAttribute("disabled");
  document.getElementById("inpYazi").focus();
  TimeStamp(timeV);
  ata(3, gecis);
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
    ata(3, gecis);
  }
}

function eleman_olustur(left, top, deger) {
  var div = document.getElementById("yerlesen_kelimeler");
  var span = document.createElement("span");
  span.innerHTML = deger;
  span.setAttribute("class", "box");
  span.style.left = left + "px";
  span.style.top = top + "px";
  span.style.fontSize =
    Number(document.getElementById("txtFontSize").textContent) + "px";
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
  window.location = "../../exercises.php";
});

function pauseTimer() {
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
      tc: dizi_tc[siraNumarasi - 1],
      ad_soyad: dizi_ad[siraNumarasi - 1],
      dogru_sayisi: ogr_dogru_sayisi,
      yanlis_sayisi: ogr_yanlis_sayisi,
      zaman: test_zaman,
    },
    success: function (res) {
      var tblKisiSayisi =
        document.getElementById("modal_body_table").childElementCount;
      if (tblKisiSayisi <= siraNumarasi) {
        document.getElementById("dsbMdlFinish").style.display = "inline";
        document.getElementById("btnModalClose").style.display = "none";
      }

      siraNumarasi++;
      document.getElementById("studientName").textContent =
        dizi_ad[siraNumarasi - 1];
      baslama_suresi = 3;
      document.getElementById("lblDogruSayisiSkor").textContent = 0;
      document.getElementById("lblYanlisSayisiSkor").textContent = 0;
      document.getElementById("inpYazi").removeAttribute("disabled");
      pause = false;
      document.getElementById("lblSureBox").textContent = "0 : 0";
      document.getElementById("resume").style.display = "none";
      document.getElementById("pause").style.display = "block";
      document.getElementById("txt").style.display = "none";
      document.getElementById("feature").style.display = "none";
      document.getElementById("toptitle").style.display = "block";
      document.getElementById("bottomtitle").textContent = "Tıkla";
      document.getElementById("bottomtitle").classList.remove("loa");
      document.getElementById("startmenu").style.display = "block";
      _empty = false;
    },
  });
}

document.getElementById("finishToApp").addEventListener("click", function () {
  pauseTimer();
  SetInf();
});
