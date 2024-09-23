var bayi_kodu;
var ad_soyad;

var zaman_dizisi = [];
var okuma_dizisi = [];
var dogru_dizisi = [];

var gun_fark;

window.addEventListener("DOMContentLoaded", function () {
  var bilgiler = JSON.parse(localStorage.getItem("dealer"));
  bayi_kodu = Number(bilgiler.CLIENT);
  ad_soyad = bilgiler.NAME;

  // console.log(bayi_kodu);

  $.ajax({
    type: "POST",
    url: "js/ajax/ajax_getUser.php",
    data: {
      bayi_kod: bayi_kodu,
    },
    success: function (sonuc) {
      var users = sonuc.split("_*_");
      var selectBox = document.getElementById("selectToUser");
      for (let i = 0; i < users.length - 1; i++) {
        var opt = `<option value="${users[i]}">${users[
          i
        ].toUpperCase()}</option>`;
        selectBox.innerHTML += opt;
      }
    },
  });

  //okuma_hizi_testi();
});

document
  .getElementById("selectToUser")
  .addEventListener("change", function (e) {
    document.getElementById("btnResultToUser").removeAttribute("disabled");
    document.getElementById("anlama").textContent = "";
    document.getElementById("katilim").textContent = "";
    user_fullname = e.target.value;
  });

document
  .getElementById("btnResultToUser")
  .addEventListener("click", function () {
    if (user_fullname != "") {
      document.getElementById("resultUser").style.display = "inline";
      zaman_dizisi = [];
      okuma_dizisi = [];
      dogru_dizisi = [];
      document.getElementById("anlama").textContent = "";
      document.getElementById("katilim").textContent = "";
      document.getElementById("zemin").textContent = "";
      okuma_hizi_testi();
    }
  });

Math.rastgele = function (alt, ust) {
  let sayi = Math.random();
  sayi = sayi * (ust - alt);
  sayi = Math.floor(sayi) + alt;

  return sayi;
};

function okuma_hizi_testi() {
  $.ajax({
    type: "POST",
    url: "js/ajax/ajax_result.php",
    data: {
      ad: user_fullname,
      bayi_kod: bayi_kodu,
    },
    success: function (sonuc) {
      if (sonuc != "") {
        var dizi = sonuc.split("_*_");
        dizi.pop();
        //  console.log(dizi);
        for (let i = 0; i < dizi.length - 1; i += 3) {
          okuma_dizisi.push(dizi[i]);
          zaman_dizisi.push(dizi[i + 1].split(" ")[0]);
          dogru_dizisi.push(dizi[i + 2]);
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

        document.getElementById("hiz").textContent =
          okuma_dizisi[okuma_dizisi.length - 1] + " k/dk";
        anlama = Number(dogru_dizisi[dogru_dizisi.length - 1]) * 20;

        // Burdan sonrası

        $.ajax({
          type: "POST",
          url: "js/ajax/ajax_getLearnTime.php",
          data: {
            ad: user_fullname,
            bayi_kod: bayi_kodu,
          },
          success: function (veri) {
            if (veri != "0") {
              var tarih = new Date();
              var nowDate = tarih.getDate();
              var nowMount = tarih.getMonth() + 1;
              var nowYear = tarih.getFullYear();

              var katilim_son_dizi = veri.split(".");

              var gun = nowDate - Number(katilim_son_dizi[0]);
              var ay = nowMount - Number(katilim_son_dizi[1]);
              var yil = nowYear - Number(katilim_son_dizi[2]);
              gun_fark = gun + ay * 30 + yil * 365;

              if (10 - gun_fark < 0) {
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
            } else {
              swal("Kullanıcı henüz biriysel olarak eğitim yapmamış");
              gun_fark = 10;

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
            }
          },
        });

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

        //Tablolar değerlerin belirlenip aktarılması
      } else {
        swal("Gösterilecek sonuç bulunamadı");
      }
    },
  });
}

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

    myChart.data.datasets[0].backgroundColor[x] = "#3d81ff";
    // "rgba(" + bir + "," + iki + "," + uc + ",0.2)";
    myChart.data.datasets[0].borderColor[x] = "#3d81ff";
    // "rgba(" + bir + "," + iki + "," + uc + ",0.2)";

    myChart.update();
  }
}
