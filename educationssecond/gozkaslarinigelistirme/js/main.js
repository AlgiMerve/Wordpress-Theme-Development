// var baslama_suresi = 3;
var hareket;
var pause = false;
var start = false;
var pageClose = false;

function swAlert() {
  swal({
    title: "Göz Kaslarını Geliştirme Egzersizi",
    text: "Gözlerimizde toplam 6 adet kas var. Göz kaslarını geliştirmek için koordineli olarak hareket ettirmek gerekmektedir. Bu uygulamayı günde en az 5 dakika yaparak göz kaslarınızı geliştirebilirsiniz. Hızınızı ve egzersiz seviyenizi kendinize göre ayarlayabilirsiniz. Bu egzersizde, başını sabit tutarak ekranda hareket eden görseli gözlerinle takip etmen beklenmektedir.",
    icon: "info",
    button: "TAMAM",
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
    TimeStamp(1);
    clearTimeout(timeOut);
  }, 3500);
  updateData("start");
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

document.getElementById("inpPicture").oninput = function () {
  var deger = this.value;
  document.getElementById("imgPicture").src = "images/ikon" + deger + ".png";
  if (pause == false && start == true) {
    updateData("change");
  }
};

document.getElementById("inpMovement").oninput = function () {
  document.getElementById("txtMovement").textContent = this.value;
  if (pause == false && start == true) {
    updateData("change");
  }
};

document.getElementById("inpSpeed").oninput = function () {
  document.getElementById("txtSpeed").textContent = this.value;
  if (pause == false && start == true) {
    updateData("change");
  }
};

function pauseTimer() {
  start = false;
  clearInterval(timerSet);
  var test_zaman = document.getElementById("gizli_zaman").value;
  $.ajax({
    type: "POST",
    url: "ajax/ajax_goz_sonuc.php",
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
  pauseTimer();
  SetInf();
  updateData("finish");
});

document.getElementById("fullScreen").addEventListener("click", function () {
  toggleFullScreen();
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
      buton_ikon: document.getElementById("inpPicture").value,
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
