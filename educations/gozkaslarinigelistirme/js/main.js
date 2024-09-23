var baslama_suresi = 3;
var hareket;
var pause = false;
var start = false;
var _empty = false;

var x = 0;
var y = 1;
var sira = 0;

var genis = 700 - 60;
var yuksek = 550 - 60;

function swAlert() {
  swal({
    title: "Göz Kaslarını Geliştirme Egzersizi",
    text: "Gözlerimizde toplam 6 adet kas var. Göz kaslarını geliştirmek için koordineli olarak hareket ettirmek gerekmektedir. Bu uygulamayı günde en az 5 dakika yaparak göz kaslarınızı geliştirebilirsiniz. Hızınızı ve egzersiz seviyenizi kendinize göre ayarlayabilirsiniz. Bu egzersizde, başını sabit tutarak ekranda hareket eden görseli gözlerinle takip etmen beklenmektedir.",
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

        var btnPause = setTimeout(() => {
          document.getElementById("pause").style.display = "block";
          document.getElementById("finishToApp").style.display = "block";
          clearTimeout(btnPause);
        }, 2000);
        TimeStamp(1);
        Z_kisa_hareket(1000);
        document.getElementById("feature").style.display = "block";
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
  clearInterval(hareket);
  clearInterval(timerSet);
});

document.getElementById("resume").addEventListener("click", function () {
  pause = false;
  this.style.display = "none";
  var speed = Number(document.getElementById("txtSpeed").textContent);
  var level = Number(document.getElementById("txtMovement").textContent);
  switch (level) {
    case 1:
      Z_kisa_hareket(speed);
      break;
    case 2:
      N_kisa_hareket(speed);
      break;
    case 3:
      Z_uzun_hareket(speed);
      break;
    case 4:
      N_uzun_hareket(speed);
      break;
    case 5:
      X_hareket(speed);
      break;
    case 6:
      Y_hareket(speed);
      break;
    case 7:
      M_hareket(speed);
      break;
  }
  document.getElementById("pause").style.display = "block";
  TimeStamp(timeV);
});

document.getElementById("inpPicture").oninput = function () {
  var deger = this.value;
  // console.log(deger);
  document.getElementById("ikon").src = "images/ikon" + deger + ".png";
  document.getElementById("imgPicture").src = "images/ikon" + deger + ".png";
};

document.getElementById("inpMovement").oninput = function () {
  document.getElementById("txtMovement").textContent = this.value;
  if (pause == false) {
    x = 0;
    y = 1;
    sira = 0;

    var speed = Number(document.getElementById("txtSpeed").textContent);
    var level = Number(document.getElementById("txtMovement").textContent);

    clearInterval(hareket);

    switch (level) {
      case 1:
        Z_kisa_hareket(speed);
        break;
      case 2:
        N_kisa_hareket(speed);
        break;
      case 3:
        Z_uzun_hareket(speed);
        break;
      case 4:
        N_uzun_hareket(speed);
        break;
      case 5:
        X_hareket(speed);
        break;
      case 6:
        Y_hareket(speed);
        break;
      case 7:
        M_hareket(speed);
        break;
    }
  }
};

document.getElementById("inpSpeed").oninput = function () {
  document.getElementById("txtSpeed").textContent = this.value;
  if (pause == false) {
    var level = Number(document.getElementById("txtMovement").textContent);
    clearInterval(hareket);
    switch (level) {
      case 1:
        Z_kisa_hareket(this.value);
        break;
      case 2:
        N_kisa_hareket(this.value);
        break;
      case 3:
        Z_uzun_hareket(this.value);
        break;
      case 4:
        N_uzun_hareket(this.value);
        break;
      case 5:
        X_hareket(this.value);
        break;
      case 6:
        Y_hareket(this.value);
        break;
      case 7:
        M_hareket(this.value);
        break;
    }
  }
};

function pauseTimer() {
  clearInterval(hareket);
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
        document.getElementById("dsbMdlFinish").style.display = "inline";
        document.getElementById("btnModalClose").style.display = "none";
      }

      siraNumarasi++;
      document.getElementById("studientName").textContent =
        dizi_ad[siraNumarasi - 1];
      baslama_suresi = 3;
      x = 0;
      y = 1;
      sira = 0;
      document.getElementById("ikon").style.top = 0;
      document.getElementById("ikon").style.left = 0;
      document.getElementById("resume").style.display = "none";
      document.getElementById("pause").style.display = "block";
      document.getElementById("txt").style.display = "none";
      document.getElementById("feature").style.display = "none";
      document.getElementById("toptitle").style.display = "block";
      document.getElementById("bottomtitle").textContent = "Tıkla";
      document.getElementById("bottomtitle").classList.remove("loa");
      document.getElementById("startmenu").style.display = "block";
      pause = false;
      _empty = false;
    },
  });
}

document.getElementById("finishToApp").addEventListener("click", function () {
  pauseTimer();
  SetInf();
});

document.getElementById("times").addEventListener("click", function () {
  window.location = "../../exercises.php";
});

function Z_kisa_hareket(hiz) {
  hareket = setInterval(() => {
    var dizi = [
      genis,
      0,
      0,
      yuksek / 5,
      genis,
      yuksek / 5,
      0,
      (yuksek / 5) * 2,
      genis,
      (yuksek / 5) * 2,
      0,
      (yuksek / 5) * 3,
      genis,
      (yuksek / 5) * 3,
      0,
      (yuksek / 5) * 4,
      genis,
      (yuksek / 5) * 4,
      0,
      yuksek,
      genis,
      yuksek,
      0,
      0,
    ];
    document.getElementById("ikon").style.left = dizi[x] + "px";
    document.getElementById("ikon").style.top = dizi[y] + "px";
    x += 2;
    y += 2;
    sira++;
    if (sira % (dizi.length / 2) == 0) {
      x = 0;
      y = 1;
    }
  }, hiz);
}

function N_kisa_hareket(hiz) {
  hareket = setInterval(() => {
    var dizi = [
      0,
      0,
      0,
      yuksek,
      genis / 5,
      0,
      genis / 5,
      yuksek,
      (genis / 5) * 2,
      0,
      (genis / 5) * 2,
      yuksek,
      (genis / 5) * 3,
      0,
      (genis / 5) * 3,
      yuksek,
      (genis / 5) * 4,
      0,
      (genis / 5) * 4,
      yuksek,
      genis,
      0,
      genis,
      yuksek,
    ];
    // console.log(genis);
    // console.log(yuksek);

    // console.log(sira);
    document.getElementById("ikon").style.left = dizi[x] + "px";
    document.getElementById("ikon").style.top = dizi[y] + "px";
    x += 2;
    y += 2;
    sira++;
    if (sira % (dizi.length / 2) == 0) {
      x = 0;
      y = 1;
    }
  }, hiz);
}

function Z_uzun_hareket(hiz) {
  hareket = setInterval(() => {
    var dizi = [0, 0, genis, 0, 0, yuksek, genis, yuksek];

    document.getElementById("ikon").style.left = dizi[x] + "px";
    document.getElementById("ikon").style.top = dizi[y] + "px";
    x += 2;
    y += 2;
    sira++;
    if (sira % (dizi.length / 2) == 0) {
      x = 0;
      y = 1;
    }
  }, hiz);
}

function N_uzun_hareket(hiz) {
  hareket = setInterval(() => {
    var dizi = [0, 0, 0, yuksek, genis, 0, genis, yuksek];
    document.getElementById("ikon").style.left = dizi[x] + "px";
    document.getElementById("ikon").style.top = dizi[y] + "px";
    x += 2;
    y += 2;
    sira++;
    if (sira % (dizi.length / 2) == 0) {
      x = 0;
      y = 1;
    }
  }, hiz);
}

function X_hareket(hiz) {
  hareket = setInterval(() => {
    var dizi = [
      0,
      0,
      genis / 2,
      yuksek / 2,
      genis,
      yuksek,
      genis,
      0,
      genis / 2,
      yuksek / 2,
      0,
      yuksek,
    ];
    document.getElementById("ikon").style.left = dizi[x] + "px";
    document.getElementById("ikon").style.top = dizi[y] + "px";
    x += 2;
    y += 2;
    sira++;
    if (sira % (dizi.length / 2) == 0) {
      x = 0;
      y = 1;
    }
  }, hiz);
}

function Y_hareket(hiz) {
  hareket = setInterval(() => {
    var dizi = [
      genis / 2,
      0,
      genis / 5,
      yuksek,
      (genis / 5) * 4,
      yuksek / 2,
      genis / 5,
      yuksek / 2,
      (genis / 5) * 4,
      yuksek,
    ];
    document.getElementById("ikon").style.left = dizi[x] + "px";
    document.getElementById("ikon").style.top = dizi[y] + "px";
    x += 2;
    y += 2;
    sira++;
    if (sira % (dizi.length / 2) == 0) {
      x = 0;
      y = 1;
    }
  }, hiz);
}

function M_hareket(hiz) {
  hareket = setInterval(() => {
    var dizi = [
      0,
      0,
      0,
      yuksek / 2,
      0,
      yuksek,
      genis / 2,
      yuksek,
      genis,
      yuksek,
      genis,
      yuksek / 2,
      genis,
      0,
      genis / 2,
      0,
    ];

    document.getElementById("ikon").style.left = dizi[x] + "px";
    document.getElementById("ikon").style.top = dizi[y] + "px";
    x += 2;
    y += 2;
    sira++;
    if (sira % (dizi.length / 2) == 0) {
      x = 0;
      y = 1;
    }
  }, hiz);
}
