var baslama_suresi = 3;
var start = false;
var soru_dogru_sayisi = 0;
var soru_yanlis_sayisi = 0;
var _empty = false;

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
        $("#mainTxt").scrollTop(0);
        soru_dogru_sayisi = 0;
        soru_yanlis_sayisi = 0;
        $("input[type=radio]").prop("checked", true);
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
      "Sorulara verdiğin doğru yanıtlar %60'ın altında kaldığı için seni yeni metne yönlendiremiyoruz. Okuma hızının belirlenebilmesi için yeni metni dikkatli bir şekilde okuyup soruları metne göre cevaplaman gerekiyor. Sorular zor değil, sadece biraz dikkat etmen gerekiyor";
    document.getElementById("message2").textContent = "Hadi tekrar dene!";
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
  document.getElementById("titlecontent").textContent = "";
  document.getElementById("content").textContent = "";
  $.ajax({
    type: "POST",
    url: "ajax/ajax_getText.php",
    success: function (response) {
      document.getElementById("btns").innerHTML = "";
      var dizi = response.split("_*_");
      document.getElementById("titlecontent").textContent = dizi[0];
      document.getElementById("content").textContent = dizi[1];
      var sira = 1;
      for (let i = 2; i < dizi.length; i += 7) {
        var spn = `<div class="alert alert-dark" role="alert">
        <div class="alert alert-light" role="alert">
        <h5>${dizi[i]}</h5>
        </div>
        <div class="col-sm-12">
        <div class="radio">
        <input type="radio" id="s${sira}_1" name="s${sira}" value="${
          dizi[i + 1]
        }" required>
        <label for="s${sira}_1">${dizi[i + 1]}</label>
        
        <input type="radio" id="s${sira}_2" name="s${sira}" value="${
          dizi[i + 2]
        }" required>
        <label for="s${sira}_2">${dizi[i + 2]}</label>
        
        <input type="radio" id="s${sira}_3" name="s${sira}" value="${
          dizi[i + 3]
        }" required>
        <label for="s${sira}_3">${dizi[i + 3]}</label>
        
        <input type="radio" id="s${sira}_4" name="s${sira}" value="${
          dizi[i + 4]
        }" required>
        <label for="s${sira}_4">${dizi[i + 4]}</label>

        <input type="radio" id="s${sira}_5" name="s${sira}" value="${
          dizi[i + 5]
        }" required>
        <label for="s${sira}_5">${dizi[i + 5]}</label>

        <input type="hidden" id="s${sira}_d" value="${dizi[i + 6]}">
        </div>
        </div>
        </div>`;
        document.getElementById("btns").innerHTML += spn;
        sira++;
      }
      document.getElementById("questions").style.display = "none";
      baslama_suresi = 3;
      document.getElementById("toptitle").style.display = "block";
      document.getElementById("bottomtitle").textContent = "Tıkla";
      document.getElementById("bottomtitle").classList.remove("loa");
      document.getElementById("startmenu").style.display = "block";
    },
  });
});

document.getElementById("times").addEventListener("click", function () {
  window.location = "../../exercises.php";
});

document.getElementById("finisApp").addEventListener("click", function () {
  SetInf();
  pauseTimer();
});

function pauseTimer() {
  var ogr_okuma_hizi = document.getElementById("readspead").textContent;
  var test_zaman = document.getElementById("timenow").value;
  $.ajax({
    type: "POST",
    url: "ajax/ajax_metin_okuma_soru.php",
    data: {
      bayi_kod: bayi_kod,
      tc: dizi_tc[siraNumarasi - 1],
      ad_soyad: dizi_ad[siraNumarasi - 1],
      sure: timeV,
      okunan_kelime_sayisi: kelime_sayisi,
      okuma_hizi: ogr_okuma_hizi,
      dogru_sayisi: soru_dogru_sayisi,
      zaman: test_zaman,
    },
    success: function (res) {
      var tblKisiSayisi =
        document.getElementById("modal_body_table").childElementCount;
      console.log(res);
      if (tblKisiSayisi <= siraNumarasi) {
        document.getElementById("dsbMdlFinish").style.display = "inline";
        document.getElementById("btnModalClose").style.display = "none";
      }

      siraNumarasi++;
      document.getElementById("studientName").textContent =
        dizi_ad[siraNumarasi - 1];
      document.getElementById("questions").style.display = "none";
      baslama_suresi = 3;
      document.getElementById("toptitle").style.display = "block";
      document.getElementById("bottomtitle").textContent = "Tıkla";
      document.getElementById("bottomtitle").classList.remove("loa");
      document.getElementById("startmenu").style.display = "block";
      _empty = false;
    },
  });
}
