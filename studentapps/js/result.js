var bayi_kodu;
var ad_soyad;
// var zaman_dizisi = [];
// var okuma_dizisi = [];

window.addEventListener("DOMContentLoaded", function () {
  var bilgiler = JSON.parse(localStorage.getItem("user"));
  bayi_kodu = Number(bilgiler.bayi);
  ad_soyad = bilgiler.ad;
  okuma_hizi_testi();
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
      ad: ad_soyad,
      bayi_kod: bayi_kodu,
    },
    success: function (sonuc) {
      if (sonuc != "") {
        var dizi = sonuc.split("_*_");
        dizi.pop();

        for (let i = 0; i < dizi.length; i += 3) {
          console.log(dizi[i]);
          console.log(dizi[i + 1]);
          okuma_dizisi.push(dizi[i]);
          zaman_dizisi.push(dizi[i + 1].split(" ")[0]);
        }

        console.log(okuma_dizisi);
        console.log(zaman_dizisi);

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
