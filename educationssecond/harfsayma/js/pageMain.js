var tam_url = window.location.href;
var url = tam_url.split("?");
var urlId = url[1];
var id = urlId.split("=")[1];
var last_id = id;

var baslama_suresi = 3;

var get_Data;
var kelime_ad;
var kelime_sayi;
var celdirici_ad;
var celdirici_sayi;
var buton_yazi_boyut;
var durum;

function swAlert() {
  swal({
    title: "Harf Sayma Egzersizi",
    text: "Bu çalışma size hızlı görmeyi, anlamayı, hafızayı, dikkat ve konsantrasyonu arttırmayı sağlar. Karşınıza rastgele harfler ve sayılar gelecektir. Size sorulan harfin sayısını kutucuğa yazın ve ⏎(Enter) tuşuna basın.",
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
      kelime_ad = get_Data[0];
      kelime_sayi = Number(get_Data[1]);
      celdirici_ad = get_Data[2];
      celdirici_sayi = Number(get_Data[3]);
      buton_yazi_boyut = Number(get_Data[4]);
      durum = get_Data[5];

      if (durum == "start") {
        document.getElementById("yerlesen_kelimeler").textContent = "";
        document.getElementById("toptitle").style.display = "none";
        document.getElementById("bottomtitle").textContent = baslama_suresi;
        document.getElementById("bottomtitle").classList.add("loa");
        var startTimerFirs = setInterval(() => {
          if (baslama_suresi <= 1) {
            ata(3, gecis);
            clearInterval(startTimerFirs);
            document.getElementById("txt").style.display = "block";
          } else {
            baslama_suresi--;
            document.getElementById("bottomtitle").textContent = baslama_suresi;
          }
        }, 1000);
        updateData("wait");
      } else if (durum == "change") {
        ata(3, gecis);
        updateData("wait");
      } else if (durum == "timeisover") {
        document.getElementById("yerlesen_kelimeler").style.display = "none";
        updateData("wait");
      } else if (durum == "finish") {
        baslama_suresi = 3;
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
      kelime_ad: kelime_ad,
      kelime_sayi: kelime_sayi,
      celdirici_ad: celdirici_ad,
      celdirici_sayi: celdirici_sayi,
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

function ata(sure, callback) {
  document.getElementById("yerlesen_kelimeler").textContent = "";
  document.getElementById("yerlesen_kelimeler").style.display = "none";
  document.getElementById("transition").style.display = "block";
  document.getElementById("transitionTimer").textContent = "3";
  document.getElementById("ana_kelime_kendisi").textContent = kelime_ad;

  for (let i = 0; i < kelime_sayi; i++) {
    var yatay = Math.rastgele(0, 700);
    var dikey = Math.rastgele(0, 380);
    eleman_olustur(yatay, dikey, kelime_ad);
  }

  for (let x = 0; x < celdirici_sayi; x++) {
    var yatay_celdirici = Math.rastgele(0, 700);
    var dikey_celdirici = Math.rastgele(0, 380);
    eleman_olustur(yatay_celdirici, dikey_celdirici, celdirici_ad);
  }
  callback(sure);

  $(".box").css("font-size", buton_yazi_boyut);
}

function eleman_olustur(left, top, deger) {
  var div = document.getElementById("yerlesen_kelimeler");
  var span = document.createElement("span");
  span.innerHTML = deger;
  span.setAttribute("class", "box");
  span.style.left = left + "px";
  span.style.top = top + "px";
  div.appendChild(span);
}

function gecis(time) {
  var baslama_suresi = time;
  translationTimer = setInterval(() => {
    if (baslama_suresi == 1) {
      clearInterval(translationTimer);
      document.getElementById("transition").style.display = "none";
      document.getElementById("yerlesen_kelimeler").style.display = "block";
    } else {
      baslama_suresi--;
      document.getElementById("transitionTimer").textContent = baslama_suresi;
    }
  }, 1000);
}
