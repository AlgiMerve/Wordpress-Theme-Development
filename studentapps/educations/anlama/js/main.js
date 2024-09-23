//Şimdilik Kısım
var learn = false;
var tam_url = window.location.href;
var kisim = tam_url.split("?");
var getSeviye;
if (kisim[1]) {
  var getSure = kisim[1].split("&")[0].split("=")[1];
  getSeviye = Number(kisim[1].split("&")[1].split("=")[1]) + 1;

  // console.log(getSure, getSeviye);

  learn = true;

  if ((getSeviye - 1) % 8 != 0) {
    var deger = (getSeviye - 1) % 8;
    for (let i = 1; i <= deger; i++) {
      document.getElementById("learn" + i).children[0].style.backgroundColor =
        "green";
    }
  } else {
    var deger = 8;
    for (let i = 1; i <= deger; i++) {
      document.getElementById("learn" + i).children[0].style.backgroundColor =
        "green";
    }
  }
}

var bayi_kod;
var ad_soyad;
var tc_no;
var baslama_suresi = 3;
var start = false;
var _empty = false;

function StudientSave() {
  $.ajax({
    type: "POST",
    url: "../../js/ajax/ajax_putLearn.php",
    data: {
      ad_soyad,
      tc_no,
      getSeviye,
    },
    success: function (event) {
      console.log(event);
    },
  });
}

function PutTime() {
  var time = document.getElementById("timenow").value.split(" ")[0];
  $.ajax({
    type: "POST",
    url: "../../js/ajax/ajax_putTime.php",
    data: {
      ad_soyad,
      tc_no,
      time,
    },
    success: function (event) {
      console.log(event);
    },
  });
}

function PutLearnTime() {
  var time = document.getElementById("timenow").value.split(" ")[0];
  $.ajax({
    type: "POST",
    url: "../../js/ajax/ajax_putLearnTime.php",
    data: {
      ad_soyad,
      tc_no,
      time,
    },
    success: function (event) {
      console.log(event);
    },
  });
}

function swAlert() {
  swal({
    title: "Okuma ve Anlama Egzersizi",
    text: "Okuma hızının artışını buradan takip edebilirsin. Bunun için çıkan metni, normal hızında ve her zamanki gibi okumalısın. Anlayarak okuman çok önemli. Metnin sonunda çıkan sorulara % 60’ın üzerinde doğru yanıt veremezsen okuma hızını belirleyemeyiz. Bu durumda yeni metin alman gerekir. O yüzden önceliğin metni anlamak olmalı. Hadi başla!.",
    icon: "info",
    button: "TAMAM",
  });
}

document.getElementById("question").addEventListener("click", function () {
  swAlert();
});

window.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("user")) {
    document.getElementById("body_id").style.display = "block";
    var bilgiler = JSON.parse(localStorage.getItem("user"));
    bayi_kod = bilgiler.bayi;
    ad_soyad = bilgiler.ad;
    tc_no = bilgiler.tc;

    swal({
      title: "Sayfayı Tam Ekran Yap!",
      text: "Daha iyi bir kullanıcı deneyimi yaşamak için egzersizleri tam ekranda yapmanı tavsiye ederiz. TAMAM’a tıkladığında otomatik olarak tam ekrana yönlendirileceksin. ‘Esc’ tuşuna basarak tam ekrandan çıkabilirsin.",
      icon: "info",
      buttons: ["HAYIR", "TAMAM"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        toggleFullScreen();
      }
    });

    //Sayfayı tam ekran yapma işlemi
  } else {
    window.location = "../../../login.php";
  }
});

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
      } else {
        baslama_suresi--;
        document.getElementById("bottomtitle").textContent = baslama_suresi;
      }
    }, 1000);
  }
  _empty = true;
});

var metin = document.getElementById("content").textContent;
var sayi = metin.split(" ");

for (let i = 0; i < sayi.length; i++) {
  sayi[i].trim();
}

var kelime_sayisi = sayi.length;

let timerSet;
let timeV;
let timeS;
function TimeStamp(t) {
  timerSet = setInterval(() => {
    t++;
    timeV = t;
  }, 1000);
}

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

function okumaHizi(kelimesayi, sure) {
  return parseInt((kelimesayi / sure) * 60);
}

document.getElementById("resume").addEventListener("click", function () {
  TimeStamp(timeS);
});

document.getElementById("nextquestion").addEventListener("click", function () {
  document.getElementById("txt").style.display = "none";
  document.getElementById("questions").style.display = "block";
});

document.getElementById("questionEnd").addEventListener("click", function () {
  document.getElementById("understanding").textContent =
    Number(kontrolEt()) * 20;
  // console.log(soru_dogru_sayisi);
  // console.log(String(soru_dogru_sayisi));
  if (soru_dogru_sayisi < 3) {
    document.getElementById("message1").textContent =
      "Sorulara verdiğin doğru yanıtlar %60'ın altında kaldığı için seni yeni metne yönlendiremiyoruz. Okuma hızının belirlenebilmesi için yeni metni dikkatli bir şekilde okuyup soruları metne göre cevaplaman gerekiyor. Sorular zor değil, sadece biraz dikkat etmen gerekiyor";
    document.getElementById("message2").textContent = "Hadi tekrar dene!";
    document.getElementById("finisApp").style.display = "none";
    document.getElementById("reloadApp").style.display = "block";
  }
});

document.getElementById("reloadApp").addEventListener("click", function () {
  window.location.reload();
});

let soru_dogru_sayisi = 0;
let soru_yanlis_sayisi = 0;

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

document.getElementById("times").addEventListener("click", function () {
  if (learn == true) {
    window.location = "../../index.php";
  } else {
    window.location = "../../exercises.php";
  }
});

function pauseTimer() {
  PutLearnTime();
  var ogr_okuma_hizi = document.getElementById("readspead").textContent;
  var test_zaman = document.getElementById("timenow").value;
  $.ajax({
    type: "POST",
    url: "ajax/ajax_metin_okuma_soru.php",
    data: {
      bayi_kod: bayi_kod,
      tc: tc_no,
      ad_soyad: ad_soyad,
      sure: timeV,
      okunan_kelime_sayisi: kelime_sayisi,
      okuma_hizi: ogr_okuma_hizi,
      dogru_sayisi: soru_dogru_sayisi,
      zaman: test_zaman,
    },
    success: function (res) {
      window.location = "../../index.php";
    },
  });
}

document.getElementById("finisApp").addEventListener("click", function () {
  if (learn == true) {
    StudientSave();
    if ((getSeviye - 1) % 8 == 0) {
      PutTime();
    }
    swal("Eğitiminiz Tamamlandı");
    var locat = setTimeout(() => {
      pauseTimer();
      clearTimeout(locat);
    }, 2000);
  } else {
    pauseTimer();
  }
});

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
