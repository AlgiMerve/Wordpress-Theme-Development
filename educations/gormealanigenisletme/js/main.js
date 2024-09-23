var baslama_suresi = 3;
var hareket;
var pause = false;
var start = false;
var _empty = false;

var x = 0;
var y = 1;
var kutu_sira = 1;

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
        kutu(1000);
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
  clearInterval(kutu_interval);
  clearInterval(timerSet);
});

document.getElementById("resume").addEventListener("click", function () {
  pause = false;
  document.getElementById("anaDv_box").innerHTML = "";
  x = 0;
  y = 1;
  kutu_sira = 1;
  this.style.display = "none";
  var speed = Number(document.getElementById("txtSpeed").textContent);
  var level = Number(document.getElementById("txtMovement").textContent);
  switch (level) {
    case 1:
      kutu(speed);
      break;
    case 2:
      cember(speed);
      break;
    case 3:
      kutu_fill(speed);
      break;
    case 4:
      cember_fill(speed);
      break;
  }

  document.getElementById("pause").style.display = "block";
  TimeStamp(timeV);
});

//İlk range menü
document.getElementById("inpMovement").oninput = function () {
  document.getElementById("txtMovement").textContent = this.value;
  if (pause == false) {
    x = 0;
    y = 1;
    kutu_sira = 1;
    document.getElementById("anaDv_box").innerHTML = "";

    var speed = Number(document.getElementById("txtSpeed").textContent);
    var level = Number(document.getElementById("txtMovement").textContent);

    clearInterval(kutu_interval);

    switch (level) {
      case 1:
        kutu(speed);
        break;
      case 2:
        cember(speed);
        break;
      case 3:
        kutu_fill(speed);
        break;
      case 4:
        cember_fill(speed);
        break;
    }
  }
};

//İlk range menü

//İkinci range menü

document.getElementById("inpSpeed").oninput = function () {
  document.getElementById("txtSpeed").textContent = this.value;
  if (pause == false) {
    var level = Number(document.getElementById("txtMovement").textContent);
    clearInterval(kutu_interval);
    switch (level) {
      case 1:
        kutu(this.value);
        break;
      case 2:
        cember(this.value);
        break;
      case 3:
        kutu_fill(this.value);
        break;
      case 4:
        cember_fill(this.value);
        break;
    }
  }
};

//İkinci range menü

function pauseTimer() {
  clearInterval(kutu_interval);
  clearInterval(timerSet);
  var test_zaman = document.getElementById("gizli_zaman").value;
  $.ajax({
    type: "POST",
    url: "ajax/ajax_gorme_alani_sonuc.php",
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
      kutu_sira = 1;
      document.getElementById("anaDv_box").innerHTML = "";
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
