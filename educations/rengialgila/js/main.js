var baslama_suresi = 3;
var pause = false;
var start = false;
var _empty = false;

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

        document.getElementById("txtSpeed").textContent = 5;
        document.getElementById("inpSpeed").value = 5;

        document.getElementById("txtFontSize").textContent = 70;
        document.getElementById("inpFontSize").value = 70;

        var btnPause = setTimeout(() => {
          document.getElementById("pause").style.display = "block";
          document.getElementById("finishToApp").style.display = "block";
          clearTimeout(btnPause);
        }, 2000);
        document.getElementById("feature").style.display = "block";
        startTimer(0, 0);
        renk_ata();
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
  clearInterval(timerSet);
});

document.getElementById("resume").addEventListener("click", function () {
  document.getElementById("btntrue").removeAttribute("disabled");
  document.getElementById("btnfalse").removeAttribute("disabled");
  pause = false;
  this.style.display = "none";
  TimeStamp(timeV);
  startTimer(0, 0);
  renk_ata();
  document.getElementById("pause").style.display = "block";
});

document.getElementById("times").addEventListener("click", function () {
  window.location = "../../exercises.php";
});

function pauseTimer() {
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
