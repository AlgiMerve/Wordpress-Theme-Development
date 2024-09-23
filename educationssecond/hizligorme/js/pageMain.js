var tam_url = window.location.href;
var url = tam_url.split("?");
var urlId = url[1];
var id = urlId.split("=")[1];
var last_id = id;

var baslama_suresi = 3;

var get_Data;
var buton_seviye;
var buton_hiz;
var buton_yazi_boyut;
var okunan_kelime_sayisi = 0;
var metin_sure = 0;
var durum;

var sure;
var kelimeSirasi;
var baslangic_deger;
var gelenYaziDeger;

function swAlert() {
  swal({
    title: "Hızlı Görme Egzersizi",
    text: "Hızlı Görme Uygulaması gözün görme çevikliğini arttırma çalışmalarında kullanılan bir egzersizdir.",
    icon: "info",
    button: "TAMAM",
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

function okumaHizi(kelimesayi, sure) {
  return parseInt((kelimesayi / sure) * 60);
}

document.getElementById("fullScreen").addEventListener("click", function () {
  toggleFullScreenNew();
});

document.getElementById("question").addEventListener("click", function () {
  swAlert();
});

document.getElementById("times").addEventListener("click", function () {
  deleteDatabese(last_id);
  var close = setTimeout(() => {
    window.close();
    clearTimeout(close);
  }, 1000);
});

setInterval(() => {
  $.ajax({
    type: "POST",
    url: "ajax/ajax_client_select.php",
    data: {
      id: last_id,
    },
    success: function (send) {
      get_Data = send.split("_*_");
      buton_seviye = Number(get_Data[2]);
      buton_hiz = Number(get_Data[3]);
      buton_yazi_boyut = Number(get_Data[4]);
      durum = get_Data[5];

      if (durum == "start") {
        shred();
        document.getElementById("getWord").textContent = "";
        document.getElementById("toptitle").style.display = "none";
        document.getElementById("bottomtitle").textContent = baslama_suresi;
        document.getElementById("bottomtitle").classList.add("loa");
        var startTimerFirs = setInterval(() => {
          if (baslama_suresi <= 1) {
            document.getElementById("getWord").style.fontSize =
              buton_yazi_boyut + "px";
            clearInterval(startTimerFirs);
            document.getElementById("txt").style.display = "block";
            TimeStamp(1);
            degisenKelime(0, buton_hiz);
          } else {
            baslama_suresi--;
            document.getElementById("bottomtitle").textContent = baslama_suresi;
          }
        }, 1000);
        updateData("wait");
      } else if (durum == "stop") {
        clearInterval(timerSet);
        clearInterval(sure);
        updateData("wait");
      } else if (durum == "resume") {
        document.getElementById("getWord").style.fontSize =
          buton_yazi_boyut + "px";
        degisenKelime(kelimeSirasi + 1, buton_hiz);
        TimeStamp(timeV);
        updateData("wait");
      } else if (durum == "change") {
        document.getElementById("getWord").style.fontSize =
          buton_yazi_boyut + "px";
        clearInterval(sure);
        degisenKelime(kelimeSirasi + 1, buton_hiz);
        updateData("wait");
      } else if (durum == "finish") {
        baslama_suresi = 3;
        document.getElementById("lblOkunanKelimeSayisi").style.width = "0px";
        document.getElementById("okumaHizi").textContent = 0;
        clearInterval(sure);
        clearInterval(timerSet);
        document.getElementById("txt").style.display = "none";
        document.getElementById("toptitle").style.display = "block";
        document.getElementById("bottomtitle").textContent = "Hazır";
        document.getElementById("bottomtitle").classList.remove("loa");
        document.getElementById("startmenudual").style.display = "block";
        updateData("wait");
      } else if (durum == "end") {
        document.getElementById("main_menu").style.display = "none";
        swal("Egzersizi Tamamladınız.");
        deleteDatabese(last_id);
        setTimeout(() => {
          window.close();
        }, 2000);
      }
    },
  });
}, 100);

function updateData(newDurum) {
  $.ajax({
    type: "POST",
    url: "ajax/ajax_client_update.php",
    data: {
      id: last_id,
      okunan_kelime_sayisi: kelimeSirasi || 0,
      metin_sure: timeV || 0,
      buton_seviye: buton_seviye,
      buton_yazi_boyut: buton_yazi_boyut,
      buton_hiz: buton_hiz,
      durum: newDurum,
    },
    success: function (res) {
      console.log(res);
    },
  });
}

function deleteDatabese(getdeleteid) {
  $.ajax({
    type: "POST",
    url: "ajax/ajax_delete_db.php",
    data: {
      id: getdeleteid,
    },
    success: function (res) {
      console.log(res);
    },
  });
}

function toggleFullScreenNew() {
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

var Fulltext;
function shred() {
  var allText = document.getElementById("lblHiddenArticle").textContent;
  allText.trim();
  Fulltext = allText.split(" ");
}

//Kelime hesaplama

function degisenKelime(d, v) {
  var gidenYazi = document.getElementById("getWord");
  gelenYaziDeger = Fulltext;
  var okunan_kelime = document.getElementById("lblOkunanKelimeSayisi");

  baslangic_deger = d;
  var progres = 600 / Fulltext.length; //4
  sure = setInterval(function () {
    var hseviye = buton_seviye;
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
      swal(
        "Okuma Hızın : " +
          document.getElementById("okumaHizi").textContent +
          " kelime/dakika"
      );
    }
  }, v);
}

//-------------------------------------------------------------
