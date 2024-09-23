var tam_url = window.location.href;
var url = tam_url.split("?");
var urlId = url[1];
var id = urlId.split("=")[1];
var last_id = id;

var baslama_suresi = 3;

var get_Data;
var buton_seviye;
var buton_hiz;
var buton_ikon;
var durum;


var x = 0;
var y = 1;
var sira = 0;
var hareket;

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
      buton_ikon = Number(get_Data[2]);
      durum = get_Data[3];

      if (durum == "start") {
        document.getElementById("toptitle").style.display = "none";
        document.getElementById("bottomtitle").textContent = baslama_suresi;
        document.getElementById("bottomtitle").classList.add("loa");
        var startTimerFirs = setInterval(() => {
          if (baslama_suresi <= 1) {
            clearInterval(startTimerFirs);
            document.getElementById("txt").style.display = "block";
            document.getElementById("ikon").src =
              "images/ikon" + buton_ikon + ".png";
            hareketSekil(buton_seviye, buton_hiz);
          } else {
            baslama_suresi--;
            document.getElementById("bottomtitle").textContent = baslama_suresi;
          }
        }, 1000);
        updateData("wait");
      } else if (durum == "stop") {
        clearInterval(hareket);
        updateData("wait");
      } else if (durum == "resume") {
        document.getElementById("ikon").src =
          "images/ikon" + buton_ikon + ".png";
        hareketSekil(buton_seviye, buton_hiz);
        updateData("wait");
      } else if (durum == "change") {
        x = 0;
        y = 1;
        sira = 0;
        clearInterval(hareket);
        hareketSekil(buton_seviye, buton_hiz);
        document.getElementById("ikon").src =
          "images/ikon" + buton_ikon + ".png";
        updateData("wait");
      } else if (durum == "finish") {
        baslama_suresi = 3;
        clearInterval(hareket);
        x = 0;
        y = 1;
        sira = 0;
        document.getElementById("ikon").style.top = 0;
        document.getElementById("ikon").style.left = 0;
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

function hareketSekil(seviye, hiz) {
  switch (seviye) {
    case 1:
      Z_kisa_hareket(hiz);
      break;
    case 2:
      N_kisa_hareket(hiz);
      break;
    case 3:
      Z_uzun_hareket(hiz);
      break;
    case 4:
      N_uzun_hareket(hiz);
      break;
    case 5:
      X_hareket(hiz);
      break;
    case 6:
      Y_hareket(hiz);
      break;
    case 7:
      M_hareket(hiz);
      break;
  }
}

function updateData(newDurum) {
  $.ajax({
    type: "POST",
    url: "ajax/ajax_client_update.php",
    data: {
      id: last_id,
      buton_seviye: buton_seviye,
      buton_hiz: buton_hiz,
      buton_ikon: buton_ikon,
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

//Hareket Şekilleri

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
