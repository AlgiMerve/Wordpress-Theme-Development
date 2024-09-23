var pause = false;
var start = false;
var pageClose = false;
var control = true;
var _gecis = false;

var translationTimer;
var ana_kelime;
var celdirici;
var ana_kac;
var celdirici_kac;
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

document.getElementById("AppToEnd").addEventListener("click", function () {
  updateData("end");
  setTimeout(() => {
    window.location = "../../exercises.php";
  }, 500);
});

document.getElementById("AppStart").addEventListener("click", function () {
  start = true;
  this.style.display = "none";
  sorgu();
  document.getElementById("transition").style.display = "block";
  var timeOut = setTimeout(() => {
    if (pageClose == true) {
      window.location.reload();
    }
    document.getElementById("pause").style.display = "block";
    document.getElementById("finishToApp").style.display = "block";
    control = true;
    TimeStamp(1);
    startTimer(0, -2);
    clearTimeout(timeOut);
  }, 3500);
  ata("start", updateData);
});

function swAlert() {
  swal({
    title: "Harf Sayma Egzersizi",
    text: "Bu çalışma size hızlı görmeyi, anlamayı, hafızayı, dikkat ve konsantrasyonu arttırmayı sağlar. Karşınıza rastgele harfler ve sayılar gelecektir. Size sorulan harfin sayısını kutucuğa yazın ve ⏎(Enter) tuşuna basın.",
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

var id;
function startTimer(m, s) {
  if (s >= 0) {
    document.getElementById("lblSureBox").textContent = m + " : " + s;
  }

  var hiz = Number(document.getElementById("txtSpeed").textContent);

  id = setTimeout(function () {
    startTimer(m, s);
  }, 1000);

  if (s > hiz) {
    //Update time is finish işlemi
    updateData("timeisover");
    document.getElementById("lblSureBox").textContent = "0 : 0";
    clearTimeout(id);
  }
  s = s + 1;
}

var inpyazi = document.getElementById("inpYazi");

document.getElementById("btnaddon").addEventListener("click", function () {
  if (start == true && pause == false && control == false) {
    control = true;
    document.getElementById("lblSureBox").textContent = "0 : 0";
    clearInterval(id);
    startTimer(0, -3);
    ata("change", updateData);
  }
});

document.getElementById("btntrue").addEventListener("click", function () {
  if (start == true && pause == false && control == true) {
    control = false;
    var dogru_skor = Number(
      document.getElementById("lblDogruSayisiSkor").textContent
    );
    dogru_skor++;
    document.getElementById("lblDogruSayisiSkor").textContent = dogru_skor;
    clearInterval(id);
    document.getElementById("lblSureBox").textContent = "0 : 0";
    updateData("timeisover");
  }
});

document.getElementById("btnfalse").addEventListener("click", function () {
  if (start == true && pause == false && control == true) {
    control = false;
    var dogru_skor = Number(
      document.getElementById("lblYanlisSayisiSkor").textContent
    );
    dogru_skor++;
    document.getElementById("lblYanlisSayisiSkor").textContent = dogru_skor;
    clearInterval(id);
    document.getElementById("lblSureBox").textContent = "0 : 0";
    updateData("timeisover");
  }
});

document.getElementById("inpSpeed").oninput = function () {
  document.getElementById("txtSpeed").textContent = this.value;
};

document.getElementById("inpMovemnet").oninput = function () {
  document.getElementById("txtMovemnet").textContent = this.value;
};

document.getElementById("inpFontSize").oninput = function () {
  document.getElementById("txtFontSize").textContent = this.value;
};

document.getElementById("pause").addEventListener("click", function () {
  pause = true;
  this.style.display = "none";
  document.getElementById("resume").style.display = "block";
  updateData("timeisover");
  clearInterval(timerSet);
  clearInterval(id);
});

document.getElementById("resume").addEventListener("click", function () {
  pause = false;
  control = true;
  this.style.display = "none";
  document.getElementById("pause").style.display = "block";
  document.getElementById("ana_kelime_kendisi").textContent = "";
  document.getElementById("dogru_cevap").textContent = "";
  TimeStamp(timeV);
  clearInterval(id);
  startTimer(0, 0);
  ata("change", updateData);
});

function ata(durum, calback) {
  var zorluk = Number(document.getElementById("txtMovemnet").textContent);

  var sira_1 = Math.rastgele(0, kelime_dizisi.length);
  ana_kelime = kelime_dizisi[sira_1];
  document.getElementById("ana_kelime_kendisi").textContent = ana_kelime;

  var sira_2 = Math.rastgele(0, kelime_dizisi.length);
  celdirici = kelime_dizisi[sira_2];

  if (ana_kelime != celdirici) {
    if (zorluk == 1) {
      ana_kac = Math.rastgele(3, 10);
      celdirici_kac = Math.rastgele(0, 4);
    } else if (zorluk == 2) {
      ana_kac = Math.rastgele(11, 16);
      celdirici_kac = Math.rastgele(3, 6);
    } else if (zorluk == 3) {
      ana_kac = Math.rastgele(16, 21);
      celdirici_kac = Math.rastgele(6, 9);
    }
  } else {
    ata();
  }
  document.getElementById("dogru_cevap").textContent = ana_kac;
  calback(durum);
}

document.getElementById("times").addEventListener("click", function () {
  window.location = "../../exercises.php";
});

function pauseTimer() {
  clearTimeout(id);
  start = false;
  clearInterval(timerSet);
  var ogr_dogru_sayisi =
    document.getElementById("lblDogruSayisiSkor").textContent;
  var ogr_yanlis_sayisi = document.getElementById(
    "lblYanlisSayisiSkor"
  ).textContent;
  var test_zaman = document.getElementById("gizli_zaman").value;
  $.ajax({
    type: "POST",
    url: "ajax/ajax_dogru_sayi_sonuc.php",
    data: {
      bayi_kod: bayi_kod,
      tc: dizi_tc[siraNumarasi - 1],
      ad_soyad: dizi_ad[siraNumarasi - 1],
      dogru_sayisi: ogr_dogru_sayisi,
      yanlis_sayisi: ogr_yanlis_sayisi,
      zaman: test_zaman,
    },
    success: function (res) {
      var tblKisiSayisi =
        document.getElementById("modal_body_table").childElementCount;
      if (tblKisiSayisi <= siraNumarasi) {
        //Tablodaki kişiler bitti ise
        document.getElementById("pause").style.display = "none";
        document.getElementById("resume").style.display = "none";
        document.getElementById("finishToApp").style.display = "none";
        document.getElementById("AppStart").style.display = "none";
        document.getElementById("dsbMdlFinish").style.display = "inline";
        document.getElementById("btnModalClose").style.display = "none";
        updateData("end");
      } else {
        siraNumarasi++;
        document.getElementById("studientName").textContent =
          dizi_ad[siraNumarasi - 1];
        document.getElementById("ana_kelime_kendisi").textContent = "";
        document.getElementById("dogru_cevap").textContent = "";

        document.getElementById("lblDogruSayisiSkor").textContent = "0";
        document.getElementById("lblYanlisSayisiSkor").textContent = "0";

        document.getElementById("transition").style.display = "none";

        document.getElementById("pause").style.display = "none";
        document.getElementById("resume").style.display = "none";
        pause = false;
        document.getElementById("finishToApp").style.display = "none";
        document.getElementById("AppStart").style.display = "block";
      }
    },
  });
}

document.getElementById("finishToApp").addEventListener("click", function () {
  pauseTimer();
  SetInf();
  updateData("finish");
});

document.getElementById("fullScreen").addEventListener("click", function () {
  toggleFullScreen();
});

function updateData(newDurum) {
  $.ajax({
    type: "POST",
    url: "ajax/ajax_client_update.php",
    data: {
      id: DatabaseID,
      kelime_ad: ana_kelime || "",
      kelime_sayi: ana_kac || "",
      celdirici_ad: celdirici || "",
      celdirici_sayi: celdirici_kac || "",
      buton_yazi_boyut: document.getElementById("txtFontSize").textContent,
      durum: newDurum,
    },
    success: function (res) {},
  });
}

function sorgu() {
  $.ajax({
    type: "POST",
    url: "ajax/ajax_query.php",
    data: {
      id: DatabaseID,
    },
    success: function (send) {
      if (send == "0") {
        pageClose = true;
      }
    },
  });
}
