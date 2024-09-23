var bayi_kod;
var ad_soyad;
var tc_no;
var getLearn;
var getUrl;
var getNo;
var getTime;

var tarih = new Date();
var nowDate = tarih.getDate();
var nowMount = tarih.getMonth() + 1;
var nowYear = tarih.getFullYear();

var arrayTarih = [];

window.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("user")) {
    var bilgiler = JSON.parse(localStorage.getItem("user"));
    bayi_kod = bilgiler.bayi;
    ad_soyad = bilgiler.ad;
    tc_no = bilgiler.tc;
    document.getElementById("name").textContent = ad_soyad;

    $.ajax({
      type: "POST",
      url: "js/ajax/ajax_home.php",
      data: {
        ad_soyad,
        tc_no,
      },
      success: function (event) {
        var getInformation = event.split("_*_");
        getLearn = getInformation[0];
        getUrl = getInformation[1];
        getNo = getInformation[2];
        getTime = getInformation[3];

        arrayTarih.push(getTime.split(".")[0]);
        arrayTarih.push(getTime.split(".")[1]);
        arrayTarih.push(getTime.split(".")[2]);

        var farkGun = nowDate - arrayTarih[0];
        var farkAy = (nowMount - arrayTarih[1]) * 30;
        var farkYil = (nowYear - arrayTarih[2]) * 365;

        var toplamFark = farkGun + farkAy + farkYil;

        if (getLearn >= 240) {
          document.getElementById("endLearn").style.display = "block";
          document.getElementById("endLearn").textContent =
            "Tüm Eğitimleri Tamamladınız..";
          document.querySelector(".card-header").style.display = "none";
          document.querySelector(".card-footer").style.display = "none";
          document.getElementById("startLearning").style.display = "none";
          document.getElementById("learnWrite").textContent =
            "Tebrikler!! tüm eğitimleri tamamladın. Artık Egzersizler kısmında yer alan egzersizlerle kendini daha da geliştirme zamanı.";
        } else {
          document.getElementById("learnToNo").textContent = getNo;
          if (getTime == "") {
            document.getElementById("getTimeToLearn").textContent =
              "Henüz Eğitim Tamamlanmadı";
          } else {
            document.getElementById("getTimeToLearn").textContent = getTime;
          }

          if (toplamFark < 1) {
            document.getElementById("learnWrite").textContent =
              "Tebrikler, bugünkü eğitimini tamamladın. Şimdi dinlenme zamanı… İstersen 30 dakikalık dinlenme süren bittiğinde egzerizler kısmından eğitimine devam edebilirsin. Yarın tekrar görüşelim :)";
            document
              .getElementById("startLearning")
              .setAttribute("disabled", true);
          } else if (toplamFark > 7) {
            document
              .getElementById("startLearning")
              .removeAttribute("disabled");
            document.getElementById("learnWrite").textContent =
              "Bir süredir seni buralarda göremedik, okuma hızını arttırmak için günlük eğitimlerini tamamlaman çok önemli. Bugünkü eğitimine başlamak için hemen tıkla!";
          } else {
            document
              .getElementById("startLearning")
              .removeAttribute("disabled");
            document.getElementById("learnWrite").textContent =
              "Eğitime başlaman için seni bekliyoruz...";
          }

          document
            .getElementById("startLearning")
            .addEventListener("click", function () {
              window.location.href = getUrl;
            });
        }
      },
    });
  } else {
    window.location = "../../login.php";
  }
});
