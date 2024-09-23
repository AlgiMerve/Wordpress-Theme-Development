var pause = false;
var start = false;
var pageClose = false;

function swAlert() {
  swal({
    title: "İkili ve Üçlü Blok Egzersizi",
    text: "Bu egzersizde, başını sabit tutarak ve iç seslendirme yapmadan, bloklarda vurgulanan kelimeleri gözlerinle soldan sağa doğru takip etmen bekleniyor. Kelimeleri, fotoğrafa bakar gibi bir bütün olarak görmeye çalışmalısın. İlk başlarda kelimeleri okuyamaman normal, önemli olan bütün olarak görmeye çalışman.",
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
    document.getElementById("pause").style.display = "block";
    document.getElementById("finishToApp").style.display = "block";

    TimeStamp(1);
    clearTimeout(timeOut);
  }, 3500);
  updateData("start");
});
document.getElementById("question").addEventListener("click", function () {
  swAlert();
});

document.getElementById("pause").addEventListener("click", function () {
  pause = true;
  this.style.display = "none";
  document.getElementById("resume").style.display = "block";
  clearInterval(timerSet);
  updateData("stop");
});

document.getElementById("resume").addEventListener("click", function () {
  pause = false;
  this.style.display = "none";
  document.getElementById("pause").style.display = "block";
  TimeStamp(timeV);
  updateData("resume");
});

//İlk range menü
document.getElementById("inpMovement").oninput = function () {
  document.getElementById("txtMovement").textContent = this.value;
  if (pause == false && start == true) {
    updateData("change");
  }
};

//İlk range menü

//İkinci range menü

document.getElementById("inpSpeed").oninput = function () {
  document.getElementById("txtSpeed").textContent = this.value;
  if (pause == false && start == true) {
    updateData("change");
  }
};
//İkinci range menü

//Üçüncü range menü

document.getElementById("inpColumn").oninput = function () {
  document.getElementById("txtColumn").textContent = this.value;
  if (pause == false && start == true) {
    updateData("change");
  }
};

//Üçüncü range menü

function pauseTimer() {
  start = false;
  clearInterval(timerSet);
  var test_zaman = document.getElementById("gizli_zaman").value;
  $.ajax({
    type: "POST",
    url: "ajax/ajax_ikili_uclu_sonuc.php",
    data: {
      bayi_kod: bayi_kod,
      tc: dizi_tc[siraNumarasi - 1],
      ad_soyad: dizi_ad[siraNumarasi - 1],
      sure: timeV,
      zaman: test_zaman,
    },
    success: function (res) {
      var tblKisiSayisi =
        document.getElementById("modal_body_table").childElementCount;
      if (tblKisiSayisi <= siraNumarasi) {
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
        
        document.getElementById("txtMovement").textContent = 1;
        document.getElementById("inpMovement").value = 1;

        document.getElementById("txtSpeed").textContent = 1000;
        document.getElementById("inpSpeed").value = 1000;

        document.getElementById("txtColumn").textContent = 2;
        document.getElementById("inpColumn").value = 2;
      }
    },
  });
}

document.getElementById("finishToApp").addEventListener("click", function () {
  pauseTimer();
  SetInf();
  updateData("finish");
});

document.getElementById("times").addEventListener("click", function () {
  window.location = "../../exercises.php";
});

function updateData(newDurum) {
  $.ajax({
    type: "POST",
    url: "ajax/ajax_client_update.php",
    data: {
      id: DatabaseID,
      buton_seviye: document.getElementById("txtMovement").textContent,
      buton_hiz: document.getElementById("txtSpeed").textContent,
      buton_sutun: document.getElementById("txtColumn").textContent,
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
