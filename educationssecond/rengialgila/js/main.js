var pause = false;
var start = false;
var pageClose = false;
var control = true;

var asil_yazi;
var yazi_renk;

document.getElementById("AppToEnd").addEventListener("click", function () {
  window.location = "../../exercises.php";
});

document.getElementById("AppStart").addEventListener("click", function () {
  start = true;
  this.style.display = "none";
  sorgu();

  var timeOut = setTimeout(() => {
    if (pageClose == true) {
      window.location.reload();
    }
    document.getElementById("pause").style.display = "block";
    document.getElementById("finishToApp").style.display = "block";
    control = true;
    TimeStamp(1);
    startTimer(0, 0);
    clearTimeout(timeOut);
  }, 3500);
  renk_ata("start", updateData);
});

function swAlert() {
  swal({
    title: "Renkleri Algılama Egzersizi",
    text: "İnsanın beyin yapısına göre sol tarafımız kelimeleri söylemeye çalışırken, sağ tarafımız renkleri söylemeye çalışır. Bu egzersiz ile dikkat, odaklanma ve konsantrasyon sevinizde artış olacaktır. Ekrana renk isimleri farklı renklerde gelecektir. Klaveye veya fareyi kullanarak yazan kelime ile renk aynıysa D, farklıysa Y düğmesine basınız.",
    icon: "info",
    button: "TAMAM",
  });
}

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
  document.getElementById("lblSureBox").textContent = m + " : " + s;
  var hiz = Number(document.getElementById("txtSpeed").textContent);

  id = setTimeout(function () {
    startTimer(m, s);
  }, 1000);

  if (s > hiz) {
    document.getElementById("lblSureBox").textContent = "0 : 0";
    updateData("timeisover");
    clearTimeout(id);
  }
  s = s + 1;
}

document.getElementById("btnaddon").addEventListener("click", function () {
  if (start == true && pause == false && control == false) {
    control = true;
    document.getElementById("lblSureBox").textContent = "0 : 0";
    clearInterval(id);
    startTimer(0, 0);
    renk_ata("change", updateData);
  }
});

document.getElementById("btntrue").addEventListener("click", function () {
  if (start == true && pause == false && control == true) {
    control = false;
    var dogru_skor = Number(
      document.getElementById("lblDogruSayisiSkor").textContent
    );
    dogru_skor++;
    document.getElementById("lblDogruSayisiSkor").textContent = dogru_skor;
    clearInterval(id);
    document.getElementById("lblSureBox").textContent = "0 : 0";
    updateData("timeisover");
  }
});

document.getElementById("btnfalse").addEventListener("click", function () {
  if (start == true && pause == false && control == true) {
    control = false;
    var dogru_skor = Number(
      document.getElementById("lblYanlisSayisiSkor").textContent
    );
    dogru_skor++;
    document.getElementById("lblYanlisSayisiSkor").textContent = dogru_skor;
    clearInterval(id);
    document.getElementById("lblSureBox").textContent = "0 : 0";
    updateData("timeisover");
  }
});

function renk_ata(durum, calback) {
  var renk_ad = dizi_renk_ad[Math.rastgele(0, dizi_renk_ad.length)];
  asil_yazi = renk_ad.split("-");

  yazi_renk = dizi_renk[Math.rastgele(0, dizi_renk.length)];

  document.getElementById("yazi").textContent = asil_yazi[0];
  document.getElementById("yazi").style.color = yazi_renk;

  if (asil_yazi[1] == yazi_renk) {
    cevap = "dogru";
    document.getElementById("trueAndFalse").textContent = "Doğru";
  } else {
    cevap = "yanlis";
    document.getElementById("trueAndFalse").textContent = "Yanlış";
  }

  calback(durum);
}

document.getElementById("inpSpeed").oninput = function () {
  document.getElementById("txtSpeed").textContent = this.value;
};

document.getElementById("inpFontSize").oninput = function () {
  document.getElementById("txtFontSize").textContent = this.value;
};

document.getElementById("pause").addEventListener("click", function () {
  pause = true;
  this.style.display = "none";
  document.getElementById("resume").style.display = "block";
  clearInterval(timerSet);
  clearInterval(id);
});

document.getElementById("resume").addEventListener("click", function () {
  pause = false;
  control = true;
  this.style.display = "none";
  document.getElementById("pause").style.display = "block";
  document.getElementById("yazi").textContent = "";
  document.getElementById("trueAndFalse").textContent = "";
  TimeStamp(timeV);

  clearInterval(id);
  startTimer(0, 0);
  renk_ata("change", updateData);
});

document.getElementById("times").addEventListener("click", function () {
  window.location = "../../exercises.php";
});

function pauseTimer() {
  start = false;
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
        //Tablodaki kişiler bitti ise
        document.getElementById("pause").style.display = "none";
        document.getElementById("resume").style.display = "none";
        document.getElementById("finishToApp").style.display = "none";
        document.getElementById("AppStart").style.display = "none";
        document.getElementById("dsbMdlFinish").style.display = "inline";
        document.getElementById("btnModalClose").style.display = "none";
        updateData("end");
      } else {
        siraNumarasi++;
        document.getElementById("studientName").textContent =
          dizi_ad[siraNumarasi - 1];
        document.getElementById("yazi").textContent = "";
        document.getElementById("trueAndFalse").textContent = "";

        document.getElementById("lblDogruSayisiSkor").textContent = "0";
        document.getElementById("lblYanlisSayisiSkor").textContent = "0";

        document.getElementById("pause").style.display = "none";
        document.getElementById("resume").style.display = "none";
        pause = false;
        document.getElementById("finishToApp").style.display = "none";
        document.getElementById("AppStart").style.display = "block";
      }
    },
  });
}

document.getElementById("finishToApp").addEventListener("click", function () {
  pauseTimer();
  SetInf();
  updateData("finish");
});

document.getElementById("fullScreen").addEventListener("click", function () {
  toggleFullScreen();
});

function updateData(newDurum) {
  $.ajax({
    type: "POST",
    url: "ajax/ajax_client_update.php",
    data: {
      id: DatabaseID,
      renk_ad: asil_yazi[0] || "",
      renk_kod: yazi_renk || "",
      buton_hiz: document.getElementById("txtSpeed").textContent,
      buton_yazi_boyut: document.getElementById("txtFontSize").textContent,
      durum: newDurum,
    },
    success: function (res) {},
  });
}

function sorgu() {
  $.ajax({
    type: "POST",
    url: "ajax/ajax_query.php",
    data: {
      id: DatabaseID,
    },
    success: function (send) {
      if (send == "0") {
        pageClose = true;
      }
    },
  });
}
