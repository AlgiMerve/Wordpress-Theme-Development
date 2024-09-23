var baslama_suresi = 3;
var pause = false;
var start = false;
var _empty = false;

function swAlert() {
  swal({
    title: "Hızlı Görme Egzersizi",
    text: "Hızlı Görme Uygulaması gözün görme çevikliğini arttırma çalışmalarında kullanılan bir egzersizdir.",
    icon: "info",
    button: "TAMAM",
  });
}

document.getElementById("question").addEventListener("click", function () {
  swAlert();
});

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
        start = true;
        clearInterval(startTimerFirs);
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

//Kelime hesaplama

var sure;
var kelimeSirasi;
var baslangic_deger;
var gelenYaziDeger;
function degisenKelime(d, v) {
  var gidenYazi = document.getElementById("getWord");
  gelenYaziDeger = Fulltext;
  var okunan_kelime = document.getElementById("lblOkunanKelimeSayisi");

  baslangic_deger = d;
  var progres = 600 / Fulltext.length; //4
  sure = setInterval(function () {
    var hseviye = Number(document.getElementById("txtMovement").textContent);
    var prog = document.getElementById("lblOkunanKelimeSayisi");
    var newProgres = progres;

    document.getElementById("okumaHizi").textContent = okumaHizi(
      Number(prog.textContent),
      timeV
    );

    if (Number(hseviye) == 1) {
      gidenYazi.textContent = gelenYaziDeger[baslangic_deger];
      okunan_kelime.textContent = baslangic_deger + 1;
      kelimeSirasi = baslangic_deger;
      baslangic_deger++;
      prog.style.width = newProgres * kelimeSirasi + "px";
    } else if (Number(hseviye) == 2) {
      gidenYazi.textContent =
        gelenYaziDeger[baslangic_deger] +
        " " +
        gelenYaziDeger[baslangic_deger + 1];
      okunan_kelime.textContent = baslangic_deger + 2;
      kelimeSirasi = baslangic_deger;
      baslangic_deger += 2;
      prog.style.width = newProgres * kelimeSirasi + "px";
    } else if (Number(hseviye) == 3) {
      gidenYazi.textContent =
        gelenYaziDeger[baslangic_deger] +
        " " +
        gelenYaziDeger[baslangic_deger + 1] +
        " " +
        gelenYaziDeger[baslangic_deger + 2];
      okunan_kelime.textContent = baslangic_deger + 3;
      kelimeSirasi = baslangic_deger;
      baslangic_deger += 3;
      prog.style.width = newProgres * kelimeSirasi + "px";
    } else if (Number(hseviye) == 4) {
      gidenYazi.textContent =
        gelenYaziDeger[baslangic_deger] +
        " " +
        gelenYaziDeger[baslangic_deger + 1] +
        " " +
        gelenYaziDeger[baslangic_deger + 2] +
        " " +
        gelenYaziDeger[baslangic_deger + 3];
      okunan_kelime.textContent = baslangic_deger + 4;
      kelimeSirasi = baslangic_deger;
      baslangic_deger += 4;
      prog.style.width = newProgres * kelimeSirasi + "px";
    }

    if (baslangic_deger >= gelenYaziDeger.length) {
      clearInterval(sure);
      gidenYazi.textContent = "SON.";
      clearTimeout(timerSet);
      document.getElementById("pause").style.display = "none";
      document.getElementById("resume").style.display = "none";

      swal(
        "Okuma Hızın : " +
          document.getElementById("okumaHizi").textContent +
          " kelime/dakika"
      );
    }
  }, v);
}

//-------------------------------------------------------------

document.getElementById("pause").addEventListener("click", function () {
  clearInterval(sure);
  clearInterval(timerSet);
  pause = true;
  this.style.display = "none";
  document.getElementById("resume").style.display = "block";
  swal({
    text:
      "Okuma Hızın : " +
      document.getElementById("okumaHizi").textContent +
      " kelime/dakika",
    button: "TAMAM",
  });
});

document.getElementById("resume").addEventListener("click", function () {
  pause = false;
  this.style.display = "none";
  document.getElementById("pause").style.display = "block";
  var speed = Number(document.getElementById("txtSpeed").textContent);
  TimeStamp(timeV);
  degisenKelime(kelimeSirasi + 1, speed);
});

document.getElementById("times").addEventListener("click", function () {
  window.location = "../../exercises.php";
});

function pauseTimer() {
  clearInterval(sure);
  clearInterval(timerSet);
  var ogr_okunan_kelime_sayisi = document.getElementById(
    "lblOkunanKelimeSayisi"
  ).textContent;
  var ogr_okuma_hizi = document.getElementById("okumaHizi").textContent;
  var test_zaman = document.getElementById("gizli_zaman").value;
  $.ajax({
    type: "POST",
    url: "ajax/ajax_blog_okuma.php",
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
      document.getElementById("lblOkunanKelimeSayisi").style.width = "0px";
      document.getElementById("getWord").textContent = "";
      document.getElementById("okumaHizi").textContent = 0;
      _empty = false;
    },
  });
}

document.getElementById("finishToApp").addEventListener("click", function () {
  pauseTimer();
  SetInf();
});
