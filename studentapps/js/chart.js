var bayi_kodu;
var ad_soyad;
var ogr_tc;
var zaman_dizisi = [];
var okuma_dizisi = [];
var dogru_dizisi = [];
var okuma;
var anlama;
var katilim;
var katilim_son;
var gun_fark;

window.addEventListener("DOMContentLoaded", function () {
  var bilgiler = JSON.parse(localStorage.getItem("user"));
  bayi_kodu = Number(bilgiler.bayi);
  ad_soyad = bilgiler.ad;
  ogr_tc = bilgiler.tc;

  $.ajax({
    type: "POST",
    url: "js/ajax/ajax_result.php",
    data: {
      ad: ad_soyad,
      tc: ogr_tc,
      bayi_kod: bayi_kodu,
    },
    success: function (sonuc) {
      if (sonuc != "") {
        var dizi = sonuc.split("_*_");
        dizi.pop();
        // console.log(dizi);
        for (let i = 0; i < dizi.length - 1; i += 3) {
          okuma_dizisi.push(dizi[i]);
          zaman_dizisi.push(dizi[i + 1].split(" ")[0]);
          dogru_dizisi.push(dizi[i + 2]);
        }

        document.getElementById("hiz").textContent =
          okuma_dizisi[okuma_dizisi.length - 1] + " k/dk";
        anlama = Number(dogru_dizisi[dogru_dizisi.length - 1]) * 20;

        //Anlama Oranı
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart_anlama);
        function drawChart_anlama() {
          var data = google.visualization.arrayToDataTable([
            ["Pac Man", "Percentage"],
            ["Anlama Seviyesi", anlama],
            ["", 100 - anlama],
          ]);

          var options = {
            legend: "none",
            pieStartAngle: 0,
            tooltip: { trigger: "none" },
            slices: {
              0: { color: "#0d6efd" },
              1: { color: "gray" },
            },
          };

          var chart_anlama = new google.visualization.PieChart(
            document.getElementById("anlama")
          );
          chart_anlama.draw(data, options);
        }

        grafik(
          "grafik_1",
          "okuma_hizi",
          "Okuma Hızı (Kelime / Dakika)",
          zaman_dizisi,
          okuma_dizisi
        );
        //Tablolar değerlerin belirlenip aktarılması
        document.getElementById("firstSpeed").textContent = okuma_dizisi[0];
        document.getElementById("lastSpeed").textContent =
          okuma_dizisi[okuma_dizisi.length - 1];
        document.getElementById("maxSpeed").textContent = Math.max.apply(
          null,
          okuma_dizisi
        );
        var result = 0;
        for (let i = 0; i < okuma_dizisi.length; i++) {
          result += Number(okuma_dizisi[i]);
        }
        document.getElementById("avgSpeed").textContent = parseInt(
          result / Number(okuma_dizisi.length)
        );
        document.getElementById("difSpeed").textContent =
          Number(okuma_dizisi[okuma_dizisi.length - 1]) -
          Number(okuma_dizisi[0]);
      } else {
        swal({
          title: "Merhaba :D",
          text: "NeuroSpeed hızlı okuma programına hoş geldin. Burada sana özel hazırlamış olduğumuz eğitimler var bu yolda seni daha iyi tanıyabilmek için öncelikle okuma ve anlama hızını ölçmemiz gerekiyor haydi başlayalım :)",
          icon: "warning",
          buttons: "Haydi Başla",
        }).then((willDelete) => {
          if (willDelete) {
            window.location = "educations/anlama";
          } else {
            window.location = "educations/anlama";
          }
        });
      }
    },
  });

  $.ajax({
    type: "POST",
    url: "js/ajax/ajax_getLearnTime.php",
    data: {
      ad: ad_soyad,
      tc: ogr_tc,
      bayi_kod: bayi_kodu,
    },
    success: function (sonuc) {
      if (sonuc != "") {
        var tarih = new Date();
        var nowDate = tarih.getDate();
        var nowMount = tarih.getMonth() + 1;
        var nowYear = tarih.getFullYear();

        var katilim_son_dizi = sonuc.split(".");

        var gun = nowDate - Number(katilim_son_dizi[0]);
        var ay = nowMount - Number(katilim_son_dizi[1]);
        var yil = nowYear - Number(katilim_son_dizi[2]);
        gun_fark = gun + ay * 30 + yil * 365;

        if (10 - gun_fark < 0) {
          gun_fark = 10;
        }
      } else {
        gun_fark = 10;
      }

      //Kullanım Sıklığı

      google.charts.load("current", { packages: ["corechart"] });
      google.charts.setOnLoadCallback(drawChart_katilim);
      function drawChart_katilim() {
        var data = google.visualization.arrayToDataTable([
          ["Pac Man", "Percentage"],
          ["Katılım Seviyesi", 10 - gun_fark],
          ["", gun_fark],
        ]);

        var options = {
          legend: "none",
          pieStartAngle: 0,
          tooltip: { trigger: "none" },
          slices: {
            0: { color: "#f53b57" },
            1: { color: "gray" },
          },
        };

        var chart_katilim = new google.visualization.PieChart(
          document.getElementById("katilim")
        );
        chart_katilim.draw(data, options);
      }
    },
  });
});

function grafik(id_tbl, name, information, array_one, array_two) {
  var div = document.createElement("div");
  div.id = id_tbl;
  div.style.textAlign = "center";
  div.style.marginTop = "100px";
  div.style.marginBottom = "80px";
  div.style.width = "930px";
  div.style.height = "400px";
  div.setAttribute("class", "grafikler");
  document.getElementById("zemin").appendChild(div);
  var cnvs = document.createElement("canvas");
  cnvs.id = name;
  document.getElementById(id_tbl).appendChild(cnvs);
  var ctx = document.getElementById(name).getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: information,
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  for (let i = 0; i < array_one.length; i++) {
    myChart.data.labels[i] = array_one[i];
    myChart.update();
  }

  for (let x = 0; x < array_two.length; x++) {
    myChart.data.datasets[0].data[x] = array_two[x];

    // var bir = Math.rastgele(0, 256);
    // var iki = Math.rastgele(0, 256);
    // var uc = Math.rastgele(0, 256);

    myChart.data.datasets[0].backgroundColor[x] = "#3d81ff";
    // "rgba(" + bir + "," + iki + "," + uc + ",0.2)";
    myChart.data.datasets[0].borderColor[x] = "#3d81ff";
    // "rgba(" + bir + "," + iki + "," + uc + ",0.2)";

    myChart.update();
  }
}
