var baslama_suresi = 3;
var pause = false;
var start = false;
var _empty = false;

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
        document.getElementById("txtMovement").textContent = 1;
        document.getElementById("inpMovement").value = 1;

        document.getElementById("txtSpeed").textContent = 1000;
        document.getElementById("inpSpeed").value = 1000;

        document.getElementById("txtFontSize").textContent = 20;
        document.getElementById("inpFontSize").value = 20;

        var btnPause = setTimeout(() => {
          document.getElementById("pause").style.display = "block";
          document.getElementById("finishToApp").style.display = "block";
          clearTimeout(btnPause);
        }, 2000);
        document.getElementById("startmenu").style.display = "none";
        document.getElementById("txt").style.display = "block";
        TimeStamp(1);

        degisenKelime(0, 1000);
        document.getElementById("feature").style.display = "block";
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
  window.location = "../../exercises.php";
});

function pauseTimer() {
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
      tc: dizi_tc[siraNumarasi - 1],
      ad_soyad: dizi_ad[siraNumarasi - 1],
      sure: timeV,
      okunan_kelime_sayisi: ogr_okunan_kelime_sayisi,
      okuma_hizi: ogr_okuma_hizi,
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
      pause = false;
      document.getElementById("resume").style.display = "none";
      document.getElementById("pause").style.display = "block";
      document.getElementById("txt").style.display = "none";
      document.getElementById("feature").style.display = "none";
      document.getElementById("toptitle").style.display = "block";
      document.getElementById("bottomtitle").textContent = "Tıkla";
      document.getElementById("bottomtitle").classList.remove("loa");
      document.getElementById("startmenu").style.display = "block";
      document.getElementById("getWord").textContent = "";
      _empty = false;
    },
  });
}

document.getElementById("finishToApp").addEventListener("click", function () {
  pauseTimer();
  SetInf();
});
