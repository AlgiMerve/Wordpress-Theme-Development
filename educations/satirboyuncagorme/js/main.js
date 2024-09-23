var baslama_suresi = 3;
var pause = false;
var start = false;
var _empty = false;

function swAlert() {
  swal({
    title: "Satır Boyunca Görme Egzersizi",
    text: "Bu uygulama ile gözün satır boyunca daha geniş bir alanı görmesini sağlayabilirsiniz. Ekranın ortasında ki çizgiye odaklanarak kenarlardaki kelime ve kelime gruplarını gözlerinizi hareket ettirmeden okumaya çalışın.",
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
        TimeStamp(1);
        document.getElementById("startmenu").style.display = "none";
        document.getElementById("txt").style.display = "block";

        document.getElementById("txtMovement").textContent = 1;
        document.getElementById("inpMovement").value = 1;

        document.getElementById("txtDistance").textContent = 1;
        document.getElementById("inpDistance").value = 1;

        document.getElementById("txtSpeed").textContent = 1000;
        document.getElementById("inpSpeed").value = 1000;
        
        document.getElementById("txtFontSize").textContent = 22;
        document.getElementById("inpFontSize").value = 22;

        var btnPause = setTimeout(() => {
          document.getElementById("pause").style.display = "block";
          document.getElementById("finishToApp").style.display = "block";
          clearTimeout(btnPause);
        }, 2000);

        document.getElementById("feature").style.display = "block";
        nextWord(1000);
      } else {
        baslama_suresi--;
        document.getElementById("bottomtitle").textContent = baslama_suresi;
      }
    }, 1000);
  }
  _empty = true;
});

document.getElementById("pause").addEventListener("click", function () {
  pause = true;
  this.style.display = "none";
  document.getElementById("resume").style.display = "block";
  clearInterval(timerSet);
  clearInterval(_interval);
});

document.getElementById("resume").addEventListener("click", function () {
  pause = false;
  this.style.display = "none";
  var hiz = Number(document.getElementById("txtSpeed").textContent);
  nextWord(hiz);
  document.getElementById("pause").style.display = "block";
  TimeStamp(timeV);
});

document.getElementById("inpMovement").oninput = function () {
  document.getElementById("txtMovement").textContent = this.value;
};

document.getElementById("inpSpeed").oninput = function () {
  document.getElementById("txtSpeed").textContent = this.value;
  if (pause != true) {
    clearInterval(_interval);
    nextWord(Number(this.value));
  }
};

document.getElementById("inpFontSize").oninput = function () {
  document.getElementById("txtFontSize").textContent = this.value;
  $(".wrd").css("font-size", Number(this.value));
};

document.getElementById("inpDistance").oninput = function () {
  document.getElementById("txtDistance").textContent = this.value;
  switch (Number(this.value)) {
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
};

document.getElementById("times").addEventListener("click", function () {
  window.location = "../../exercises.php";
});

function pauseTimer() {
  clearTimeout(timerSet);
  clearInterval(_interval);
  var test_zaman = document.getElementById("gizli_zaman").value;
  $.ajax({
    type: "POST",
    url: "ajax/ajax_satir_boyu_sonuc.php",
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
      document.getElementById("word_1").textContent = "";
      document.getElementById("word_2").textContent = "";

      document.getElementById("word_1").style.right = "16px";
      document.getElementById("word_2").style.left = "16px";

      document.getElementById("resume").style.display = "none";
      document.getElementById("pause").style.display = "block";
      document.getElementById("txt").style.display = "none";
      document.getElementById("feature").style.display = "none";
      document.getElementById("toptitle").style.display = "block";
      document.getElementById("bottomtitle").textContent = "Tıkla";
      document.getElementById("bottomtitle").classList.remove("loa");
      document.getElementById("startmenu").style.display = "block";
      _empty = false;
    },
  });
}

document.getElementById("finishToApp").addEventListener("click", function () {
  pauseTimer();
  SetInf();
});

var _interval;
function nextWord(speed) {
  _interval = setInterval(() => {
    kelimeGetir(Number(document.getElementById("txtMovement").textContent));
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

//-----------------------------------------------------------------
