var tam_url = window.location.href;
var url = tam_url.split("?");
var urlId = url[1];
var id = urlId.split("=")[1];
var last_id = id;

var baslama_suresi = 3;

var get_Data;
var buton_seviye;
var buton_hiz;
var durum;

var x = 0;
var y = 1;
var kutu_sira = 1;
var kutu_interval;

var genis = 700 - 60;
var yuksek = 550 - 60;

function swAlert() {
  swal({
    title: "Aktif Görme Alanını Genişletme",
    text: "Gözlerimiz bir tek şey üzerinde odaklanmış olsa bile, o cismin çevresinde olan bir sürü bilgiyi de algılama yeteneğine sahiptir. Gözlerini iyi eğiten bir okuyucu aktif görme alanını tam olarak kullanabilir. Bu egzersiz ile gözümüzün görme alanını 4 tarafa doğru geliştirebiliriz.",
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
      durum = get_Data[2];

      if (durum == "start") {
        document.getElementById("anaDv_box").textContent = "";
        document.getElementById("toptitle").style.display = "none";
        document.getElementById("bottomtitle").textContent = baslama_suresi;
        document.getElementById("bottomtitle").classList.add("loa");
        var startTimerFirs = setInterval(() => {
          if (baslama_suresi <= 1) {
            clearInterval(startTimerFirs);
            document.getElementById("txt").style.display = "block";
            hareketSekil(buton_seviye, buton_hiz);
          } else {
            baslama_suresi--;
            document.getElementById("bottomtitle").textContent = baslama_suresi;
          }
        }, 1000);
        updateData("wait");
      } else if (durum == "stop") {
        clearInterval(kutu_interval);
        updateData("wait");
      } else if (durum == "resume") {
        hareketSekil(buton_seviye, buton_hiz);
        updateData("wait");
      } else if (durum == "change") {
        document.getElementById("anaDv_box").innerHTML = "";
        x = 0;
        y = 1;
        kutu_sira = 1;
        clearInterval(kutu_interval);
        hareketSekil(buton_seviye, buton_hiz);
        updateData("wait");
      } else if (durum == "finish") {
        baslama_suresi = 3;
        clearInterval(kutu_interval);
        x = 0;
        y = 1;
        kutu_sira = 1;
        document.getElementById("anaDv_box").textContent = "";
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
      kutu(hiz);
      break;
    case 2:
      cember(hiz);
      break;
    case 3:
      kutu_fill(hiz);
      break;
    case 4:
      cember_fill(hiz);
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

function kutu(hiz) {
  var anaDv = document.getElementById("anaDv_box");
  kutu_interval = setInterval(() => {
    if (kutu_sira == 12) {
      document.getElementById("anaDv_box").innerHTML = "";
      kutu_sira = 1;
    } else {
      var div = document.createElement("div");
      div.setAttribute("class", "box");
      div.setAttribute("id", "box_" + kutu_sira);
      div.style.width = kutu_sira * 50 + "px";
      div.style.height = kutu_sira * 50 + "px";
      div.style.left = genis / 2 - kutu_sira * 25 + "px";
      div.style.top = yuksek / 2 - kutu_sira * 25 + "px";
      anaDv.appendChild(div);
      kutu_sira++;
    }
  }, hiz);
}

function cember(hiz) {
  var anaDv = document.getElementById("anaDv_box");
  kutu_interval = setInterval(() => {
    if (kutu_sira == 12) {
      document.getElementById("anaDv_box").innerHTML = "";
      kutu_sira = 1;
    } else {
      var div = document.createElement("div");
      div.setAttribute("class", "circle");
      div.setAttribute("id", "box_" + kutu_sira);
      div.style.width = kutu_sira * 50 + "px";
      div.style.height = kutu_sira * 50 + "px";
      div.style.left = genis / 2 - kutu_sira * 25 + "px";
      div.style.top = yuksek / 2 - kutu_sira * 25 + "px";
      anaDv.appendChild(div);
      kutu_sira++;
    }
  }, hiz);
}

function kutu_fill(hiz) {
  var anaDv = document.getElementById("anaDv_box");
  kutu_interval = setInterval(() => {
    if (kutu_sira == 12) {
      document.getElementById("anaDv_box").innerHTML = "";
      kutu_sira = 1;
    } else {
      var div = document.createElement("div");
      div.setAttribute("class", "box_fill");
      div.setAttribute("id", "box_" + kutu_sira);
      div.style.width = kutu_sira * 50 + "px";
      div.style.height = kutu_sira * 50 + "px";
      div.style.left = genis / 2 - kutu_sira * 25 + "px";
      div.style.top = yuksek / 2 - kutu_sira * 25 + "px";
      anaDv.appendChild(div);
      kutu_sira++;
    }
  }, hiz);
}

function cember_fill(hiz) {
  var anaDv = document.getElementById("anaDv_box");
  kutu_interval = setInterval(() => {
    if (kutu_sira == 12) {
      document.getElementById("anaDv_box").innerHTML = "";
      kutu_sira = 1;
    } else {
      var div = document.createElement("div");
      div.setAttribute("class", "circle_fill");
      div.setAttribute("id", "box_" + kutu_sira);
      div.style.width = kutu_sira * 50 + "px";
      div.style.height = kutu_sira * 50 + "px";
      div.style.left = genis / 2 - kutu_sira * 25 + "px";
      div.style.top = yuksek / 2 - kutu_sira * 25 + "px";
      anaDv.appendChild(div);
      kutu_sira++;
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
