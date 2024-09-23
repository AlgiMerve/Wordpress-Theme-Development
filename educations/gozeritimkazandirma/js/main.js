var baslama_suresi = 3;
var pause = false;
var start = false;
var _empty = false;

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
document.getElementById("question").addEventListener("click", function () {
  swAlert();
});

let timerSet;
let timeV;
function TimeStamp(t) {
  timerSet = setInterval(() => {
    t++;
    timeV = t;
  }, 1000);
}

document.querySelector(".startmenu").addEventListener("click", function () {
  if (_empty == false) {
    document.getElementById("toptitle").style.display = "none";
    document.getElementById("bottomtitle").textContent = baslama_suresi;
    document.getElementById("bottomtitle").classList.add("loa");
    var startTimerFirs = setInterval(() => {
      if (baslama_suresi <= 1) {
        start = true;
        clearInterval(startTimerFirs);
        document.getElementById("startmenu").style.display = "none";
        document.getElementById("txt").style.display = "block";
        var btnPause = setTimeout(() => {
          document.getElementById("pause").style.display = "block";
          document.getElementById("finishToApp").style.display = "block";
          clearTimeout(btnPause);
        }, 2000);
        TimeStamp(1);

        document.getElementById("txtSpeed").textContent = 1000;
        document.getElementById("inpSpeed").value = 1000;

        Ata(1000, Gez);
        document.getElementById("feature").style.display = "block";
      } else {
        baslama_suresi--;
        document.getElementById("bottomtitle").textContent = baslama_suresi;
      }
    }, 1000);
  }
  _empty = true;
});

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

document.getElementById("pause").addEventListener("click", function () {
  pause = true;
  this.style.display = "none";
  document.getElementById("resume").style.display = "block";
  clearInterval(timerTravel);
  clearInterval(timerSet);
});

document.getElementById("resume").addEventListener("click", function () {
  pause = false;
  this.style.display = "none";
  document.getElementById("pause").style.display = "block";
  Gez(Number(document.getElementById("txtSpeed").textContent));
  TimeStamp(timeV);
});

document.getElementById("inpSpeed").oninput = function () {
  document.getElementById("txtSpeed").textContent = this.value;
  if (pause == false) {
    clearInterval(timerTravel);
    Gez(Number(this.value));
  }
};

function pauseTimer() {
  clearInterval(timerTravel);
  clearInterval(timerSet);
  var test_zaman = document.getElementById("gizli_zaman").value;
  $.ajax({
    type: "POST",
    url: "ajax/ajax_goz_ritim_sonuc.php",
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
        document.getElementById("dsbMdlFinish").style.display = "inline";
        document.getElementById("btnModalClose").style.display = "none";
      }
      siraNumarasi++;
      document.getElementById("studientName").textContent =
        dizi_ad[siraNumarasi - 1];
      baslama_suresi = 3;
      pause = false;
      document.getElementById("resume").style.display = "none";
      document.getElementById("pause").style.display = "block";
      document.getElementById("txt").style.display = "none";
      document.getElementById("feature").style.display = "none";
      document.getElementById("toptitle").style.display = "block";
      document.getElementById("bottomtitle").textContent = "Tıkla";
      document.getElementById("bottomtitle").classList.remove("loa");
      document.getElementById("startmenu").style.display = "block";
      sira = 1;
      document.getElementById("icerik").textContent = "";
      unHighlightFunction();
      _empty = false;
    },
  });
}

document.getElementById("times").addEventListener("click", function () {
  window.location = "../../exercises.php";
});

document.getElementById("finishToApp").addEventListener("click", function () {
  pauseTimer();
  SetInf();
});

//Tam ekran yapma kodları
function toggleFullScreen() {
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
//Tam ekran yapma kodları
//-----------------------------------------------------------------
