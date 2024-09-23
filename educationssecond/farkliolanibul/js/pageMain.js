var tam_url = window.location.href;
var url = tam_url.split("?");
var urlId = url[1];
var id = urlId.split("=")[1];
var last_id = id;

var baslama_suresi = 3;
var translationTimer;

var _gecis = false;
var ana_kelime;
var celdirici;
var ana_kac;
var celdirici_kac;
var isaretler_dizi = [];
var var_mi = [];
var son_dizi = [];
var kelime_dizisi = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "Ğ",
  "H",
  "I",
  "İ",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "Ö",
  "P",
  "R",
  "S",
  "Ş",
  "T",
  "U",
  "Ü",
  "V",
  "Y",
  "Z",
];

var get_Data;
var buton_seviye;
var buton_hiz;

var durum;

function swAlert() {
  swal({
    title: "Farklı Olanı Bulma Egzersizi",
    text: "Bu egzersizde, satırlarda düzgün aralıklarla dizilmiş karakterlerin içinden dizilimi bozanları tıklayarak belirlemen gerekiyor.",
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
      buton_seviye = Number(get_Data[2]);
      buton_hiz = Number(get_Data[3]);
      durum = get_Data[4];

      if (durum == "start") {
        document.getElementById("lblDogruSayisiSkor").textContent = "0";
        document.getElementById("lblYanlisSayisiSkor").textContent = "0";
        document.getElementById("yerlesen_kelimeler").textContent = "";
        document.getElementById("toptitle").style.display = "none";
        document.getElementById("bottomtitle").textContent = baslama_suresi;
        document.getElementById("bottomtitle").classList.add("loa");
        var startTimerFirs = setInterval(() => {
          if (baslama_suresi <= 1) {
            ata(3, gecis);
            clearInterval(startTimerFirs);
            document.getElementById("txt").style.display = "block";
            document.getElementById("startmenudual").style.display = "none";
          } else {
            baslama_suresi--;
            document.getElementById("bottomtitle").textContent = baslama_suresi;
          }
        }, 1000);
        updateData("wait");
      } else if (durum == "change") {
        clearInterval(id);
        clearInterval(translationTimer);
        ata(3, gecis);
        updateData("wait");
      } else if (durum == "stop") {
        clearInterval(id);
        clearInterval(translationTimer);
        updateData("wait");
      } else if (durum == "resume") {
        ata(3, gecis);
        updateData("wait");
      } else if (durum == "finish") {
        clearInterval(id);
        clearInterval(translationTimer);

        baslama_suresi = 3;
        tiklama = 1;

        document.getElementById("txt").style.display = "none";
        document.getElementById("toptitle").style.display = "block";
        document.getElementById("bottomtitle").textContent = "Hazır";
        document.getElementById("bottomtitle").classList.remove("loa");
        document.getElementById("startmenudual").style.display = "block";

        updateData("wait");
      } else if (durum == "end") {
        clearInterval(id);
        clearInterval(translationTimer);
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

var id;
function startTimer(m, s) {
  document.getElementById("lblSureBox").textContent = m + " : " + s;
  var hiz = buton_hiz;

  id = setTimeout(function () {
    startTimer(m, s);
  }, 1000);

  if (s > hiz) {
    document.getElementById("lblSureBox").textContent = "0 : 0";
    var skor = Number(
      document.getElementById("lblYanlisSayisiSkor").textContent
    );
    skor++;
    document.getElementById("lblYanlisSayisiSkor").textContent = skor;
    clearTimeout(id);
    tiklama = 1;
    ata(3, gecis);
  }
  s = s + 1;
}

function ata(sure, calback) {
  _gecis = false;
  tiklama = 1;
  isaretler_dizi = [];
  var_mi = [];
  son_dizi = [];
  document.getElementById("yerlesen_kelimeler").style.display = "none";
  document.getElementById("transition").style.display = "block";
  document.getElementById("transitionTimer").textContent = "3";

  var zorluk = buton_seviye;
  document.getElementById("yerlesen_kelimeler").innerHTML = "";

  var sira_1 = Math.rastgele(0, kelime_dizisi.length);
  ana_kelime = kelime_dizisi[sira_1];

  var sira_2 = Math.rastgele(0, kelime_dizisi.length);
  celdirici = kelime_dizisi[sira_2];

  if (ana_kelime != celdirici) {
    if (zorluk == 1) {
      ana_kac = Math.rastgele(3, 10);
      celdirici_kac = 96 - ana_kac;

      for (let i = 0; i < ana_kac; i++) {
        isaretler_dizi.push(ana_kelime);
      }

      for (let x = 0; x < celdirici_kac; x++) {
        isaretler_dizi.push(celdirici);
      }

      while (son_dizi.length < 96) {
        var deger = Math.rastgele(0, 96);
        if (var_mi.indexOf(deger) == -1) {
          son_dizi.push(isaretler_dizi[deger]);
          var_mi.push(deger);
        }
      }
      eleman_olustur("h2");
    } else if (zorluk == 2) {
      ana_kac = Math.rastgele(11, 16);
      celdirici_kac = 128 - ana_kac;

      for (let i = 0; i < ana_kac; i++) {
        isaretler_dizi.push(ana_kelime);
      }

      for (let x = 0; x < celdirici_kac; x++) {
        isaretler_dizi.push(celdirici);
      }

      while (son_dizi.length < 128) {
        var deger = Math.rastgele(0, 128);
        if (var_mi.indexOf(deger) == -1) {
          son_dizi.push(isaretler_dizi[deger]);
          var_mi.push(deger);
        }
      }
      eleman_olustur("h3");
    } else if (zorluk == 3) {
      ana_kac = Math.rastgele(16, 21);
      celdirici_kac = 160 - ana_kac;

      for (let i = 0; i < ana_kac; i++) {
        isaretler_dizi.push(ana_kelime);
      }

      for (let x = 0; x < celdirici_kac; x++) {
        isaretler_dizi.push(celdirici);
      }

      while (son_dizi.length < 160) {
        var deger = Math.rastgele(0, 160);
        if (var_mi.indexOf(deger) == -1) {
          son_dizi.push(isaretler_dizi[deger]);
          var_mi.push(deger);
        }
      }
      eleman_olustur("h4");
    }

    calback(sure);
  } else {
    ata(3, gecis);
  }
}

function eleman_olustur(boyut) {
  var tbody = document.getElementById("yerlesen_kelimeler");
  for (let i = 0; i < son_dizi.length; i += 16) {
    var tr = `<tr>
    <td class="fw-bold ${boyut} wordts">${son_dizi[i]}</td>
    <td class="fw-bold ${boyut} wordts">${son_dizi[i + 1]}</td>
    <td class="fw-bold ${boyut} wordts">${son_dizi[i + 2]}</td>
    <td class="fw-bold ${boyut} wordts">${son_dizi[i + 3]}</td>
    <td class="fw-bold ${boyut} wordts">${son_dizi[i + 4]}</td>
    <td class="fw-bold ${boyut} wordts">${son_dizi[i + 5]}</td>
    <td class="fw-bold ${boyut} wordts">${son_dizi[i + 6]}</td>
    <td class="fw-bold ${boyut} wordts">${son_dizi[i + 7]}</td>
    <td class="fw-bold ${boyut} wordts">${son_dizi[i + 8]}</td>
    <td class="fw-bold ${boyut} wordts">${son_dizi[i + 9]}</td>
    <td class="fw-bold ${boyut} wordts">${son_dizi[i + 10]}</td>
    <td class="fw-bold ${boyut} wordts">${son_dizi[i + 11]}</td>
    <td class="fw-bold ${boyut} wordts">${son_dizi[i + 12]}</td>
    <td class="fw-bold ${boyut} wordts">${son_dizi[i + 13]}</td>
    <td class="fw-bold ${boyut} wordts">${son_dizi[i + 14]}</td>
    <td class="fw-bold ${boyut} wordts">${son_dizi[i + 15]}</td>
</tr>`;
    tbody.innerHTML += tr;
  }
}

function gecis(time) {
  var baslama_suresi = time;
  translationTimer = setInterval(() => {
    if (baslama_suresi == 1) {
      clearInterval(translationTimer);
      document.getElementById("transition").style.display = "none";
      document.getElementById("yerlesen_kelimeler").style.display = "block";
      document.getElementById("yerlesen_kelimeler").style.textAlign = "center";

      _gecis = true;
      startTimer(0, 0);
    } else {
      baslama_suresi--;
      document.getElementById("transitionTimer").textContent = baslama_suresi;
    }
  }, 1000);
}

var tiklama = 1;
document
  .getElementById("yerlesen_kelimeler")
  .addEventListener("click", function (e) {
    if (e.target.tagName == "TD" && e.target.classList[2] == "wordts") {
      if (e.target.textContent == ana_kelime) {
        if (tiklama != ana_kac) {
          e.target.classList.remove("wordts");
          e.target.style.backgroundColor = "green";
          tiklama++;
        } else {
          document.getElementById("lblSureBox").textContent = "0 : 0";
          clearInterval(id);
          e.target.style.backgroundColor = "green";
          tiklama = 1;
          var skor = Number(
            document.getElementById("lblDogruSayisiSkor").textContent
          );
          skor++;
          document.getElementById("lblDogruSayisiSkor").textContent = skor;
          var bekleme = setTimeout(() => {
            clearTimeout(bekleme);
            ata(3, gecis);
          }, 1000);
        }
      } else {
        e.target.style.backgroundColor = "red";
      }
    }

    e.stopPropagation();
  });

function updateData(newDurum) {
  $.ajax({
    type: "POST",
    url: "ajax/ajax_client_update.php",
    data: {
      id: last_id,
      dogru_sayisi: document.getElementById("lblDogruSayisiSkor").textContent,
      yanlis_sayisi: document.getElementById("lblYanlisSayisiSkor").textContent,
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
