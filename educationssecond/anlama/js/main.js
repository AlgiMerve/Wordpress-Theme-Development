var start = false;
var pageClose = false;

function swAlert() {
  swal({
    title: "Okuma ve Anlama Egzersizi",
    text: "Okuma hızının artışını buradan takip edebilirsin. Bunun için çıkan metni, normal hızında ve her zamanki gibi okumalısın. Anlayarak okuman çok önemli. Metnin sonunda çıkan sorulara % 60’ın üzerinde doğru yanıt veremezsen okuma hızını belirleyemeyiz. Bu durumda yeni metin alman gerekir. O yüzden önceliğin metni anlamak olmalı. Hadi başla!.",
    icon: "info",
    button: "TAMAM",
  });
}

document.getElementById("times").addEventListener("click", function () {
  window.location = "../../exercises.php";
});

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
    document.getElementById("finishToApp").style.display = "block";
    clearTimeout(timeOut);
  }, 3500);
  updateData("start");
});

document.getElementById("finishToApp").addEventListener("click", function () {
  veriAl();
  // updateData("finish");
});

function pauseTimer() {
  var test_zaman = document.getElementById("timenow").value;
  $.ajax({
    type: "POST",
    url: "ajax/ajax_metin_okuma_soru.php",
    data: {
      bayi_kod: bayi_kod,
      tc: dizi_tc[siraNumarasi - 1],
      ad_soyad: dizi_ad[siraNumarasi - 1],
      sure: _metin_sure,
      okunan_kelime_sayisi: _okunan_kelime_sayisi,
      okuma_hizi: _okuma_hizi,
      dogru_sayisi: _dogru_sayisi,
      zaman: test_zaman,
    },
    success: function (res) {
      var tblKisiSayisi =
        document.getElementById("modal_body_table").childElementCount;
      if (tblKisiSayisi <= siraNumarasi) {
        //Tablodaki kişiler bitti ise
        document.getElementById("finishToApp").style.display = "none";
        document.getElementById("AppStart").style.display = "none";
        document.getElementById("DualFinish").style.display = "block";
        updateData("end");
      } else {
        siraNumarasi++;
        document.getElementById("studientName").textContent =
          dizi_ad[siraNumarasi - 1];
        document.getElementById("finishToApp").style.display = "none";
        document.getElementById("AppStart").style.display = "block";
      }
    },
  });
}

document.getElementById("fullScreen").addEventListener("click", function () {
  toggleFullScreen();
});

function updateData(newDurum) {
  $.ajax({
    type: "POST",
    url: "ajax/ajax_client_update.php",
    data: {
      id: DatabaseID,
      metin_sure: _metin_sure || "",
      okunan_kelime_sayisi: _okunan_kelime_sayisi || "",
      okuma_hizi: _okuma_hizi || "",
      dogru_sayisi: _dogru_sayisi || "",
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

        _metin_sure = dizi[0];
        _okunan_kelime_sayisi = dizi[1];
        _okuma_hizi = dizi[2];
        _dogru_sayisi = dizi[3];

        if (dizi[4] != "finish") {
          swal("Eğitim henüz tamamlanmadı");
        } else {
          if (dizi[3] < 3) {
            SetInf();
            var tblKisiSayisi =
              document.getElementById("modal_body_table").childElementCount;
            if (tblKisiSayisi <= siraNumarasi) {
              //Tablodaki kişiler bitti ise
              document.getElementById("finishToApp").style.display = "none";
              document.getElementById("AppStart").style.display = "none";
              document.getElementById("DualFinish").style.display = "block";
              updateData("end");
            } else {
              siraNumarasi++;
              document.getElementById("studientName").textContent =
                dizi_ad[siraNumarasi - 1];
              document.getElementById("finishToApp").style.display = "none";
              document.getElementById("AppStart").style.display = "block";
            }
            updateData("finish");
          } else {
            pauseTimer();
            SetInf();
            updateData("finish");
          }
        }
      },
    });
  }, 1000);
}
