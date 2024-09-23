var baslama_suresi = 3;
var pause = false;
var start = false;
var _empty = false;

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

        document.getElementById("txtMovement").textContent = 1;
        document.getElementById("inpMovement").value = 1;

        document.getElementById("txtSpeed").textContent = 1000;
        document.getElementById("inpSpeed").value = 1000;

        document.getElementById("txtColumn").textContent = 2;
        document.getElementById("inpColumn").value = 2;

        var btnPause = setTimeout(() => {
          document.getElementById("pause").style.display = "block";
          document.getElementById("finishToApp").style.display = "block";
          clearTimeout(btnPause);
        }, 2000);
        TimeStamp(1);

        Ata(1, 2, 1000, Gez);
        document.getElementById("feature").style.display = "block";
      } else {
        baslama_suresi--;
        document.getElementById("bottomtitle").textContent = baslama_suresi;
      }
    }, 1000);
  }
  _empty = true;
});

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
  var seviye = Number(document.getElementById("txtMovement").textContent);
  var hiz = Number(document.getElementById("txtSpeed").textContent);
  var sutun = Number(document.getElementById("txtColumn").textContent);

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
  Gez(Number(document.getElementById("txtSpeed").textContent));
  document.getElementById("pause").style.display = "block";
  TimeStamp(timeV);
});

//İlk range menü
document.getElementById("inpMovement").oninput = function () {
  clearInterval(timerTravel);
  document.getElementById("txtMovement").textContent = this.value;
  var hiz = Number(document.getElementById("txtSpeed").textContent);
  var sutun = Number(document.getElementById("txtColumn").textContent);
  if (pause == false) {
    sira = 0;
    document.getElementById("txtrow").textContent = "";
    Ata(Number(this.value), sutun, hiz, Gez);
  }
};

//İlk range menü

//İkinci range menü

document.getElementById("inpSpeed").oninput = function () {
  clearInterval(timerTravel);
  document.getElementById("txtSpeed").textContent = this.value;
  if (pause == false) {
    Gez(Number(this.value));
  }
};

//İkinci range menü

//Üçüncü range menü

document.getElementById("inpColumn").oninput = function () {
  clearInterval(timerTravel);
  document.getElementById("txtColumn").textContent = this.value;
  var hiz = Number(document.getElementById("txtSpeed").textContent);
  var seviye = Number(document.getElementById("txtMovement").textContent);
  if (pause == false) {
    sira = 0;
    document.getElementById("txtrow").textContent = "";
    Ata(seviye, Number(this.value), hiz, Gez);
  }
};

//Üçüncü range menü

function pauseTimer() {
  clearInterval(timerTravel);
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
      sira = 0;
      document.getElementById("txtrow").textContent = "";
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
