var pause = false;
var start = false;
var pageClose = false;

function swAlert() {
  swal({
    title: "Farklı Olanı Bulma Egzersizi",
    text: "Bu egzersizde, satırlarda düzgün aralıklarla dizilmiş karakterlerin içinden dizilimi bozanları tıklayarak belirlemen gerekiyor.",
    icon: "info",
    button: "TAMAM",
  });
}

document.getElementById("AppToEnd").addEventListener("click", function () {
  updateData("end");
  setTimeout(() => {
    window.location = "../../exercises.php";
  }, 500);
});

document.getElementById("AppStart").addEventListener("click", function () {
  start = true;
  this.style.display = "none";
  sorgu();
  var timeOut = setTimeout(() => {
    if (pageClose == true) {
      window.location.reload();
    }
    TimeStamp(1);
    document.getElementById("pause").style.display = "block";
    document.getElementById("finishToApp").style.display = "block";
    clearTimeout(timeOut);
  }, 3500);
  updateData("start");
});

document.getElementById("inpSpeed").oninput = function () {
  document.getElementById("txtSpeed").textContent = this.value;
  if (pause == false && start == true) {
    updateData("change");
  }
};

document.getElementById("inpMovemnet").oninput = function () {
  document.getElementById("txtMovemnet").textContent = this.value;
  if (pause == false && start == true) {
    updateData("change");
  }
};

document.getElementById("pause").addEventListener("click", function () {
  pause = true;
  this.style.display = "none";
  clearInterval(timerSet);
  document.getElementById("resume").style.display = "block";
  updateData("stop");
});

document.getElementById("resume").addEventListener("click", function () {
  pause = false;
  this.style.display = "none";
  TimeStamp(timeV);
  document.getElementById("pause").style.display = "block";
  updateData("resume");
});

document.getElementById("times").addEventListener("click", function () {
  window.location = "../../exercises.php";
});

function pauseTimer() {
  start = false;
  clearInterval(timerSet);
  var test_zaman = document.getElementById("gizli_zaman").value;
  $.ajax({
    type: "POST",
    url: "ajax/ajax_farkli_olan_sonuc.php",
    data: {
      bayi_kod: bayi_kod,
      tc: dizi_tc[siraNumarasi - 1],
      ad_soyad: dizi_ad[siraNumarasi - 1],
      dogru_sayisi: _dogrusayisi,
      yanlis_sayisi: _yanlissayisi,
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
        document.getElementById("DualFinish").style.display = "block";
        updateData("end");
      } else {
        siraNumarasi++;
        document.getElementById("studientName").textContent =
          dizi_ad[siraNumarasi - 1];
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
  veriAl();
  updateData("finish");
});

document.getElementById("fullScreen").addEventListener("click", function () {
  toggleFullScreen();
});

function updateData(newDurum) {
  $.ajax({
    type: "POST",
    url: "ajax/ajax_update.php",
    data: {
      id: DatabaseID,
      buton_seviye: document.getElementById("txtMovemnet").textContent,
      buton_hiz: document.getElementById("txtSpeed").textContent,
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

function veriAl() {
  setTimeout(() => {
    $.ajax({
      type: "POST",
      url: "ajax/ajax_client_select.php",
      data: {
        id: DatabaseID,
      },
      success: function (send) {
        var dizi = send.split("_*_");
        console.log(dizi);
        _dogrusayisi = dizi[0];
        _yanlissayisi = dizi[1];

        pauseTimer();
        SetInf();
      },
    });
  }, 1000);
}
