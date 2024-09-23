var tam_url = window.location.href;
var url = tam_url.split("?");
var urlId = url[1];
var id = urlId.split("=")[1];
var last_id = id;

var baslama_suresi = 3;

var get_Data;
var metin_sure;
var okunan_kelime_sayisi;
var okuma_hizi;
var dogru_sayisi;

var soru_dogru_sayisi;
var soru_yanlis_sayisi;

var textDiv;
var wordCount;

function swAlert() {
  swal({
    title: "Okuma ve Anlama Egzersizi",
    text: "Okuma hızının artışını buradan takip edebilirsin. Bunun için çıkan metni, normal hızında ve her zamanki gibi okumalısın. Anlayarak okuman çok önemli. Metnin sonunda çıkan sorulara % 60’ın üzerinde doğru yanıt veremezsen okuma hızını belirleyemeyiz. Bu durumda yeni metin alman gerekir. O yüzden önceliğin metni anlamak olmalı. Hadi başla!.",
    icon: "info",
    button: "TAMAM",
  });
}

let timerSet;
let timeV;
let timeS;
function TimeStamp(t) {
  timerSet = setInterval(() => {
    t++;
    timeV = t;
  }, 1000);
}

function okumaHizi(kelimesayi, sure) {
  return parseInt((kelimesayi / sure) * 60);
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
      metin_sure = Number(get_Data[0]);

      okunan_kelime_sayisi = Number(get_Data[1]);

      okuma_hizi = Number(get_Data[2]);

      dogru_sayisi = Number(get_Data[3]);

      durum = get_Data[4];

      if (durum == "start") {
        soru_dogru_sayisi = 0;
        soru_yanlis_sayisi = 0;
        $("input[type=radio]").prop("checked", true);
        document.getElementById("toptitle").style.display = "none";
        document.getElementById("bottomtitle").textContent = baslama_suresi;
        document.getElementById("bottomtitle").classList.add("loa");
        var startTimerFirs = setInterval(() => {
          if (baslama_suresi <= 1) {
            clearInterval(startTimerFirs);
            document.getElementById("startmenudual").style.display = "none";
            document.getElementById("txt").style.display = "block";
            $("#mainTxt").scrollTop(0);
            TimeStamp(1);
          } else {
            baslama_suresi--;
            document.getElementById("bottomtitle").textContent = baslama_suresi;
          }
        }, 1000);
        updateData("wait");
      } else if (durum == "stop") {
        clearInterval(timer);
        updateData("wait");
      } else if (durum == "resume") {
        start_app(buton_hiz);
        updateData("wait");
      } else if (durum == "change") {
        clearInterval(timer);
        start_app(buton_hiz);
        updateData("wait");
      } else if (durum == "finish") {
        baslama_suresi = 3;
        clearInterval(timerSet);
        document.getElementById("txt").style.display = "none";
        document.getElementById("toptitle").style.display = "block";
        document.getElementById("bottomtitle").textContent = "Hazır";
        document.getElementById("bottomtitle").classList.remove("loa");
        document.getElementById("startmenudual").style.display = "block";
        $("#mainTxt").scrollTop(0);
        // updateData("wait");
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
      metin_sure: timeV,
      okunan_kelime_sayisi: kelime_sayisi,
      okuma_hizi: okumaHizi(Number(kelime_sayisi), Number(timeV)) || 0,
      dogru_sayisi: soru_dogru_sayisi,
      durum: newDurum,
    },
    success: function (res) {},
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

var metin = document.getElementById("content").textContent;
var sayi = metin.split(" ");

for (let i = 0; i < sayi.length; i++) {
  sayi[i].trim();
}

var kelime_sayisi = sayi.length;

document
  .getElementById("completetheexercise")
  .addEventListener("click", function () {
    clearInterval(timerSet);
    timeS = timeV;
    document.getElementById("nexttime").textContent = timeS;
    document.getElementById("readspead").textContent = okumaHizi(
      kelime_sayisi,
      timeV
    );
    document.getElementById("readspead2").textContent = okumaHizi(
      kelime_sayisi,
      timeV
    );
  });

document.getElementById("resume").addEventListener("click", function () {
  TimeStamp(timeS);
});

document.getElementById("finisApp").addEventListener("click", function () {
  document.getElementById("questions").style.display = "none";
  updateData("finish");
  swal("Eğitim Tamamlandı");
});

document.getElementById("nextquestion").addEventListener("click", function () {
  document.getElementById("txt").style.display = "none";
  document.getElementById("questions").style.display = "block";
  $("input[type=radio]").prop("checked", false);
});

function kontrolEt() {
  for (let i = 1; i <= 5; i++) {
    var deger = document.getElementsByName("s" + i);
    var dogruC = document.getElementById("s" + i + "_d");

    for (let j = 0; j < deger.length; j++) {
      if (deger[j].checked) {
        if (deger[j].value === dogruC.value) {
          soru_dogru_sayisi++;
        } else {
          soru_yanlis_sayisi++;
        }
      }
    }
  }
  return soru_dogru_sayisi;
}

document.getElementById("questionEnd").addEventListener("click", function () {
  document.getElementById("understanding").textContent =
    Number(kontrolEt()) * 20;
  if (soru_dogru_sayisi < 3) {
    document.getElementById("message1").textContent =
      "Sorulara verdiğin doğru yanıtlar %60'ın altında kaldığı için daha sonra tekrar denemelisin. Okuma hızının belirlenebilmesi için yeni metni dikkatli bir şekilde okuyup soruları metne göre cevaplaman gerekiyor. Sorular zor değil, sadece biraz dikkat etmen gerekiyor";
    document.getElementById("message2").textContent =
      "Tekrar denemek üzere tamamla!";
    document.getElementById("finisApp").style.display = "none";
    document.getElementById("reloadApp").style.display = "block";
  } else {
    document.getElementById("message1").textContent = "Tebrikler!";
    document.getElementById("message2").textContent =
      "Okuma hızındaki gelişimi 'RAPORUM' kısmından takip edebilirsin.";
    document.getElementById("finisApp").style.display = "block";
    document.getElementById("reloadApp").style.display = "none";
  }
});

document.getElementById("reloadApp").addEventListener("click", function () {
  document.getElementById("questions").style.display = "none";
  updateData("finish");
  swal("Eğitim Tamamlandı");
});
