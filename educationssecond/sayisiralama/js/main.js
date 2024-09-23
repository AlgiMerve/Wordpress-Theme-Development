var start = false;
var _value;
var pageClose = false;

function swAlert() {
  swal({
    title: "Sayıları Sıralama Egzersizi",
    text: "Karışık olarak verilmiş olan sayıları doğru bir şekilde sırlamanız gerekmektedirç Bu egzersiz ile göz kaslarınız gelişirken odaklanma seviyenizde de bir artış yaşanacaktır.",
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
    document.getElementById("finishToApp").style.display = "block";
    clearTimeout(timeOut);
  }, 3500);
  updateData("start");
});

document.getElementById("inpMovement").oninput = function () {
  document.getElementById("txtMovement").textContent = this.value;
  if (start == true) {
    updateData("change");
  }
};

document.getElementById("inpFontSize").oninput = function () {
  document.getElementById("txtFontSize").textContent = this.value;
  if (start == true) {
    updateData("change");
  }
};

//Tablonun oluşturulması ve sayıların tabloya yerleştirilmesi işlemi Başlangıç

document.getElementById("times").addEventListener("click", function () {
  window.location = "../../exercises.php";
});

function pauseTimer() {
  start = false;
  var test_zaman = document.getElementById("gizli_zaman").value;
  $.ajax({
    type: "POST",
    url: "ajax/ajax_sayibulma.php",
    data: {
      bayi_kod: bayi_kod,
      tc: dizi_tc[siraNumarasi - 1],
      ad_soyad: dizi_ad[siraNumarasi - 1],
      sure: _sure,
      son_isaret_sayisi: _isaret,
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
      buton_seviye: document.getElementById("txtMovement").textContent,
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
        _sure = dizi[0];
        _isaret = dizi[1];
        pauseTimer();
        SetInf();
      },
    });
  }, 1000);
}

//-----------------------------------------------------------------
