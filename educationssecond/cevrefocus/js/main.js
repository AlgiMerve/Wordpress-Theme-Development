var pause = false;
var start = false;
var pageClose = false;
var control = true;

function swAlert() {
  swal({
    title: "Çevre Fokus Egzersizi",
    text: "Çevre Fokus gözün görme çevikliğini arttırma çalışmalarında kullanılan bir araçtır.",
    icon: "info",
    button: "TAMAM",
  });
}

function kelimeGetir(value) {
  var seviye = Number(document.getElementById("txtMovement").textContent);
  $.ajax({
    type: "POST",
    url: "ajax/ajax_kelime_getir.php",
    data: { seviye },
    success: function (data) {
      document.getElementById("getWordMain").textContent = data;
      updateData(value, data);
    },
  });
}

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
    clearTimeout(timeOut);
  }, 3500);
  kelimeGetir("start");
});

document.getElementById("button_addon").addEventListener("click", function () {
  if (pause != true && start == true && control == false) {
    control = true;
    kelimeGetir("change");
  }
});

document.getElementById("button_true").addEventListener("click", function () {
  if (pause != true && start == true && control == true) {
    control = false;
    var deger = Number(
      document.getElementById("lblDogruSayisiSkor").textContent
    );
    deger++;
    document.getElementById("lblDogruSayisiSkor").textContent = deger;
  }
});

document.getElementById("button_false").addEventListener("click", function () {
  if (pause != true && start == true && control == true) {
    control = false;
    var deger = Number(
      document.getElementById("lblYanlisSayisiSkor").textContent
    );
    deger++;
    document.getElementById("lblYanlisSayisiSkor").textContent = deger;
  }
});

document.getElementById("inpMovement").oninput = function () {
  document.getElementById("txtMovement").textContent = this.value;
};

document.getElementById("inpSpeed").oninput = function () {
  document.getElementById("txtSpeed").textContent = this.value;
};

document.getElementById("inpFontSize").oninput = function () {
  document.getElementById("txtFontSize").textContent = this.value;
};

document.getElementById("pause").addEventListener("click", function () {
  console.log(timeV);
  pause = true;
  this.style.display = "none";
  document.getElementById("resume").style.display = "block";
  clearInterval(timerSet);
});

document.getElementById("resume").addEventListener("click", function () {
  pause = false;
  control = true;
  this.style.display = "none";
  document.getElementById("pause").style.display = "block";
  document.getElementById("getWordMain").textContent = "";
  TimeStamp(timeV);
  kelimeGetir("change");
});

document.getElementById("times").addEventListener("click", function () {
  window.location = "../../exercises.php";
});

function pauseTimer() {
  start = false;
  clearInterval(timerSet);
  var ogr_yanlis_sayisi = document.getElementById(
    "lblYanlisSayisiSkor"
  ).textContent;
  var ogr_dogru_sayisi =
    document.getElementById("lblDogruSayisiSkor").textContent;
  var test_zaman = document.getElementById("gizli_zaman").value;
  $.ajax({
    type: "POST",
    url: "ajax/ajax_takistoskop.php",
    data: {
      bayi_kod: bayi_kod,
      tc: dizi_tc[siraNumarasi - 1],
      ad_soyad: dizi_ad[siraNumarasi - 1],
      sure: timeV,
      ogr_dogru_sayisi: ogr_dogru_sayisi,
      ogr_yanlis_sayisi: ogr_yanlis_sayisi,
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
        document.getElementById("getWordMain").textContent = "";
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

function updateData(newDurum, word) {
  $.ajax({
    type: "POST",
    url: "ajax/ajax_client_update.php",
    data: {
      id: DatabaseID,
      metin_icerik: word || "",
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
