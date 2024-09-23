var tam_url = window.location.href;
var url = tam_url.split("?");
var urlId = url[1];
var id = urlId.split("=")[1];
var last_id = id;

var baslama_suresi = 3;

var get_Data;
var buton_seviye;
var buton_hiz;
var buton_mesafe;
var buton_yazi_boyut;
var durum;

function swAlert() {
  swal({
    title: "Satır Boyunca Görme Egzersizi",
    text: "Bu uygulama ile gözün satır boyunca daha geniş bir alanı görmesini sağlayabilirsiniz. Ekranın ortasında ki çizgiye odaklanarak kenarlardaki kelime ve kelime gruplarını gözlerinizi hareket ettirmeden okumaya çalışın.",
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
      buton_seviye = Number(get_Data[0]);
      buton_hiz = Number(get_Data[1]);
      buton_mesafe = Number(get_Data[2]);
      buton_yazi_boyut = Number(get_Data[3]);
      durum = get_Data[4];

      if (durum == "start") {
        document.getElementById("toptitle").style.display = "none";
        document.getElementById("bottomtitle").textContent = baslama_suresi;
        document.getElementById("bottomtitle").classList.add("loa");
        var startTimerFirs = setInterval(() => {
          if (baslama_suresi <= 1) {
            clearInterval(startTimerFirs);
            document.getElementById("txt").style.display = "block";
            distance(buton_mesafe);
            nextWord(buton_hiz);
            $(".wrd").css("font-size", buton_yazi_boyut);
          } else {
            baslama_suresi--;
            document.getElementById("bottomtitle").textContent = baslama_suresi;
          }
        }, 1000);
        updateData("wait");
      } else if (durum == "stop") {
        clearInterval(_interval);
        updateData("wait");
      } else if (durum == "resume") {
        distance(buton_mesafe);
        nextWord(buton_hiz);
        $(".wrd").css("font-size", buton_yazi_boyut);
        updateData("wait");
      } else if (durum == "change") {
        clearInterval(_interval);
        distance(buton_mesafe);
        nextWord(buton_hiz);
        $(".wrd").css("font-size", buton_yazi_boyut);
        updateData("wait");
      } else if (durum == "finish") {
        baslama_suresi = 3;
        clearInterval(_interval);
        document.getElementById("word_1").textContent="";
        document.getElementById("word_2").textContent="";
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
      buton_seviye: buton_seviye,
      buton_hiz: buton_hiz,
      buton_uzaklik: buton_mesafe,
      buton_yazi_boyut: buton_yazi_boyut,
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

var _interval;
function nextWord(speed) {
  _interval = setInterval(() => {
    kelimeGetir(buton_seviye);
  }, speed);
}

function kelimeGetir(seviye_kelime) {
  $.ajax({
    type: "POST",
    url: "ajax/ajax_kelime_getir.php",
    data: { seviye_kelime },
    success: function (data) {
      document.getElementById("word_1").textContent = "";
      document.getElementById("word_2").textContent = "";
      var degerler = data.split("_?_");
      document.getElementById("word_1").textContent = degerler[0];
      document.getElementById("word_2").textContent = degerler[1];
    },
  });
}

//Uzaklık ayarlamak için
function distance(level) {
  switch (level) {
    case 1:
      document.getElementById("word_1").style.right = "16px";
      document.getElementById("word_2").style.left = "16px";
      break;
    case 2:
      document.getElementById("word_1").style.right = "64px";
      document.getElementById("word_2").style.left = "64px";
      break;
    case 3:
      document.getElementById("word_1").style.right = "150px";
      document.getElementById("word_2").style.left = "150px";
      break;
    case 4:
      document.getElementById("word_1").style.right = "200px";
      document.getElementById("word_2").style.left = "200px";
      break;
    case 5:
      document.getElementById("word_1").style.right = "260px";
      document.getElementById("word_2").style.left = "260px";
      break;
  }
}
