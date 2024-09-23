var tam_url = window.location.href;
var url = tam_url.split("?");
var urlId = url[1];
var id = urlId.split("=")[1];
var last_id = id;

var baslama_suresi = 3;

var get_Data;
var metin_icerik;
var buton_hiz;
var buton_yazi_boyut;
var durum;

function swAlert() {
  swal({
    title: "Çevre Fokus Egzersizi",
    text: "Çevre Fokus gözün görme çevikliğini arttırma çalışmalarında kullanılan bir araçtır.",
    icon: "info",
    button: "TAMAM",
  });
}

Math.rastgele = function (alt, ust) {
  let sayi = Math.random();
  sayi = sayi * (ust - alt);
  sayi = Math.floor(sayi) + alt;

  return sayi;
};

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
      metin_icerik = get_Data[0];
      buton_hiz = Number(get_Data[1]);
      buton_yazi_boyut = Number(get_Data[2]);
      durum = get_Data[3];

      if (durum == "start") {
        document.getElementById("getWord").textContent = "";
        document.getElementById("toptitle").style.display = "none";
        document.getElementById("bottomtitle").textContent = baslama_suresi;
        document.getElementById("bottomtitle").classList.add("loa");
        var startTimerFirs = setInterval(() => {
          if (baslama_suresi <= 1) {
            document.getElementById("getWord").style.fontSize =
              buton_yazi_boyut + "px";
            clearInterval(startTimerFirs);
            document.getElementById("txt").style.display = "block";
            ilkKelimeGorunGizlen(buton_hiz);
          } else {
            baslama_suresi--;
            document.getElementById("bottomtitle").textContent = baslama_suresi;
          }
        }, 1000);
        updateData("wait");
      } else if (durum == "change") {
        document.getElementById("getWord").style.fontSize =
          buton_yazi_boyut + "px";
        document.getElementById("getWord").textContent = "";
        kelimeGörünGizle(buton_hiz);

        updateData("wait");
      } else if (durum == "finish") {
        baslama_suresi = 3;
        document.getElementById("getWord").style.opacity = "1";
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
      metin_icerik: metin_icerik,
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

var gorungizlenkelime = document.getElementById("getWord");

function kelimeGörünGizle(t) {
  rand();
  gorungizlenkelime.textContent = metin_icerik;
  setTimeout(function () {
    gorungizlenkelime.style.opacity = "1";
    setTimeout(function () {
      gorungizlenkelime.style.opacity = "0";
    }, t);
  }, t);
}
function ilkKelimeGorunGizlen(t) {
  rand();
  gorungizlenkelime.textContent = metin_icerik;
  setTimeout(function () {
    gorungizlenkelime.style.opacity = "0";
  }, t);
}

function rand() {
  var genis = Math.rastgele(0, 800);
  var yuksek = Math.rastgele(0, 400);
  document.getElementById("getWord").style.left = genis + "px";
  document.getElementById("getWord").style.top = yuksek + "px";
}
