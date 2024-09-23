var tam_url = window.location.href;
var url = tam_url.split("?");
var urlId = url[1];
var id = urlId.split("=")[1];
var last_id = id;

var baslama_suresi = 3;

var get_Data;
var renk_ad;
var renk_kod;
var buton_hiz;
var buton_yazi_boyut;
var durum;

function swAlert() {
  swal({
    title: "Renkleri Algılama Egzersizi",
    text: "İnsanın beyin yapısına göre sol tarafımız kelimeleri söylemeye çalışırken, sağ tarafımız renkleri söylemeye çalışır. Bu egzersiz ile dikkat, odaklanma ve konsantrasyon sevinizde artış olacaktır. Ekrana renk isimleri farklı renklerde gelecektir. Klaveye veya fareyi kullanarak yazan kelime ile renk aynıysa D, farklıysa Y düğmesine basınız.",
    icon: "info",
    button: "TAMAM",
  });
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
      renk_ad = get_Data[0];
      renk_kod = get_Data[1];
      buton_hiz = Number(get_Data[2]);
      buton_yazi_boyut = Number(get_Data[3]);
      durum = get_Data[4];

      if (durum == "start") {
        document.getElementById("newyazi").textContent = "";
        document.getElementById("toptitle").style.display = "none";
        document.getElementById("bottomtitle").textContent = baslama_suresi;
        document.getElementById("bottomtitle").classList.add("loa");
        var startTimerFirs = setInterval(() => {
          if (baslama_suresi <= 1) {
            renk_ata();
            clearInterval(startTimerFirs);
            document.getElementById("txt").style.display = "block";
          } else {
            baslama_suresi--;
            document.getElementById("bottomtitle").textContent = baslama_suresi;
          }
        }, 1000);
        updateData("wait");
      } else if (durum == "change") {
        document.getElementById("newyazi").style.display = "block";
        renk_ata();
        updateData("wait");
      } else if (durum == "timeisover") {
        document.getElementById("newyazi").style.display = "none";
        updateData("wait");
      } else if (durum == "finish") {
        baslama_suresi = 3;
        document.getElementById("newyazi").style.display = "block";
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
      renk_ad: renk_ad,
      renk_kod: renk_kod,
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

function renk_ata() {
  document.getElementById("newyazi").style.fontSize = buton_yazi_boyut + "px";
  document.getElementById("newyazi").textContent = renk_ad;
  document.getElementById("newyazi").style.color = renk_kod;
}
