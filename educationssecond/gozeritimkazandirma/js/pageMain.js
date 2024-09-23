var tam_url = window.location.href;
var url = tam_url.split("?");
var urlId = url[1];
var id = urlId.split("=")[1];
var last_id = id;

var baslama_suresi = 3;

var get_Data;
var buton_hiz;
var durum;

var sira = 1;
var timerTravel;

function swAlert() {
  swal({
    title: "Göze Ritim Kazandırma Egzersizi",
    text: "Bu egzersizde, ekranda beliren kelimeleri, vurgulandıkları sırayla takip etmen gerekiyor. Bunu yaparken başını sabit tutmalı, gözünle takip etmelisin. ",
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
      buton_hiz = Number(get_Data[0]);
      durum = get_Data[1];

      if (durum == "start") {
        document.getElementById("icerik").textContent = "";
        document.getElementById("toptitle").style.display = "none";
        document.getElementById("bottomtitle").textContent = baslama_suresi;
        document.getElementById("bottomtitle").classList.add("loa");
        var startTimerFirs = setInterval(() => {
          if (baslama_suresi <= 1) {
            clearInterval(startTimerFirs);
            document.getElementById("txt").style.display = "block";
            Ata(buton_hiz, Gez);
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
        sira = 1;
        document.getElementById("icerik").textContent = "";
        Ata(buton_hiz, Gez);
        updateData("wait");
      } else if (durum == "finish") {
        baslama_suresi = 3;
        clearInterval(timerTravel);
        sira = 1;
        unHighlightFunction();
        document.getElementById("icerik").textContent = "";
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
      buton_hiz: buton_hiz,
      durum: newDurum
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

function Ata(speed, calback) {
  $.ajax({
    type: "POST",
    url: "ajax/ajax_metin_getir.php",
    success: function (data) {
      var dizi = data.split("_*_");
      var baslik = dizi[0];
      var icerik = dizi[1];
      var metin = icerik.split(" ");
      document.getElementById("baslik").textContent = baslik;
      if (metin.length > 170) {
        for (let i = 0; i < 170; i += 10) {
          var div = ` <div class="col-12 text-center">
          <span class="word">${metin[i]} </span>
          <span class="word">${metin[i + 1]} </span>
          <span class="word">${metin[i + 2]} </span>
          <span class="word">${metin[i + 3]} </span>
          <span class="word">${metin[i + 4]} </span>
          <span class="word">${metin[i + 5]} </span>
          <span class="word">${metin[i + 6]} </span>
          <span class="word">${metin[i + 7]} </span>
          <span class="word">${metin[i + 8]} </span>
          <span class="word">${metin[i + 9]} </span>
      </div>`;
          document.getElementById("icerik").innerHTML += div;
        }
      } else {
        Ata(speed, calback);
      }
      calback(speed);
    },
  });
}

function Gez(speed) {
  timerTravel = setInterval(() => {
    if (sira < 172) {
      if (sira > 1) {
        unHighlightFunction();
      }

      if (sira == 1) {
        highlightFunction(document.querySelectorAll(".word")[sira - 1]);
        sira += 9;
      } else if (sira % 10 == 0) {
        highlightFunction(document.querySelectorAll(".word")[sira - 1]);
        sira++;
      } else if (sira % 10 == 1) {
        highlightFunction(document.querySelectorAll(".word")[sira - 1]);
        sira += 9;
      }
    } else {
      clearInterval(timerTravel);
      document.getElementById("icerik").textContent = "";
      sira = 1;
      Ata(speed, Gez);
    }
  }, speed);
}
