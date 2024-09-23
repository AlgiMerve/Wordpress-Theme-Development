var tam_url = window.location.href;
var url = tam_url.split("?");
var urlId = url[1];
var id = urlId.split("=")[1];
var last_id = id;

var baslama_suresi = 3;

var get_Data;
var buton_seviye;
var buton_hiz;
var buton_sutun;
var durum;

var sira = 0;
var timerTravel;

function swAlert() {
  swal({
    title: "İkili ve Üçlü Blok Egzersizi",
    text: "Bu egzersizde, başını sabit tutarak ve iç seslendirme yapmadan, bloklarda vurgulanan kelimeleri gözlerinle soldan sağa doğru takip etmen bekleniyor. Kelimeleri, fotoğrafa bakar gibi bir bütün olarak görmeye çalışmalısın. İlk başlarda kelimeleri okuyamaman normal, önemli olan bütün olarak görmeye çalışman.",
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
      buton_sutun = Number(get_Data[2]);
      durum = get_Data[3];

      if (durum == "start") {
        document.getElementById("txtrow").textContent = "";
        document.getElementById("toptitle").style.display = "none";
        document.getElementById("bottomtitle").textContent = baslama_suresi;
        document.getElementById("bottomtitle").classList.add("loa");
        var startTimerFirs = setInterval(() => {
          if (baslama_suresi <= 1) {
            clearInterval(startTimerFirs);
            document.getElementById("txt").style.display = "block";
            Ata(buton_seviye, buton_sutun, buton_hiz, Gez);
          } else {
            baslama_suresi--;
            document.getElementById("bottomtitle").textContent = baslama_suresi;
          }
        }, 1000);
        updateData("wait");
      } else if (durum == "stop") {
        clearInterval(timerTravel);
        updateData("wait");
      } else if (durum == "resume") {
        Gez(buton_hiz);
        updateData("wait");
      } else if (durum == "change") {
        clearInterval(timerTravel);
        document.getElementById("txtrow").textContent = "";
        sira = 0;
        Ata(buton_seviye, buton_sutun, buton_hiz, Gez);
        updateData("wait");
      } else if (durum == "finish") {
        baslama_suresi = 3;
        clearInterval(timerTravel);
        sira = 0;
        unHighlightFunction();
        document.getElementById("txtrow").textContent = "";
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
      buton_sutun: buton_sutun,
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

//----------------------------------------------------------------
function highlightFunction(elt) {
  if (elt != null) {
    //Pembeye benzer renk
    elt.style.backgroundColor = "#e99fff";
  }
}

function unHighlightFunction() {
  $(".word").css({
    "background-color": "#d3d3d3",
    color: "black",
    border: "none",
  });
}

function Ata(level, column, speed, calback) {
  var _column = column;
  $.ajax({
    type: "POST",
    url: "ajax/ajax_kelime_getir.php",
    data: { level, column },
    success: function (data) {
      var div = document.getElementById("txtrow");
      var dizi = data.split("_*_");
      dizi.pop();
      if (_column == 3) {
        for (let i = 0; i < dizi.length; i++) {
          var divs = `<div class="word col-4 text-center my-1 fw-bold h4 rounded-pill">${dizi[i]}</div>`;
          div.innerHTML += divs;
        }
      } else {
        for (let i = 0; i < dizi.length; i++) {
          var divs = `<div class="word col-6 text-center my-1 fw-bold h4 rounded-pill">${dizi[i]}</div>`;
          div.innerHTML += divs;
        }
      }

      calback(speed);
    },
  });
}

function Gez(speed) {
  var element_sayisi = document.getElementById("txtrow").childElementCount;
  var seviye = buton_seviye;
  var hiz = buton_hiz;
  var sutun = buton_sutun;

  timerTravel = setInterval(() => {
    if (sira != element_sayisi) {
      if (sira > 0) {
        unHighlightFunction();
      }
      highlightFunction(document.getElementById("txtrow").children[sira]);
      sira++;
    } else {
      clearInterval(timerTravel);
      document.getElementById("txtrow").textContent = "";
      sira = 0;
      Ata(seviye, sutun, hiz, Gez);
    }
  }, speed);
}

//----------------------------------------------------------------
