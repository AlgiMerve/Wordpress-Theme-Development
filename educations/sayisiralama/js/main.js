var baslama_suresi = 3;
var start = false;
var _value;
var _empty = false;

function swAlert() {
  swal({
    title: "Sayıları Sıralama Egzersizi",
    text: "Karışık olarak verilmiş olan sayıları doğru bir şekilde sırlamanız gerekmektedirç Bu egzersiz ile göz kaslarınız gelişirken odaklanma seviyenizde de bir artış yaşanacaktır.",
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
        TimeStamp(1);
        clearInterval(startTimerFirs);
        document.getElementById("startmenu").style.display = "none";
        document.getElementById("txt").style.display = "block";

        document.getElementById("txtMovement").textContent = 1;
        document.getElementById("inpMovement").value = 1;

        document.getElementById("txtFontSize").textContent = 24;
        document.getElementById("inpFontSize").value = 24;

        var btnPause = setTimeout(() => {
          document.getElementById("finishToApp").style.display = "block";
          clearTimeout(btnPause);
        }, 2000);

        createTable(10, 2, 5);
        document.getElementById("feature").style.display = "block";
      } else {
        baslama_suresi--;
        document.getElementById("bottomtitle").textContent = baslama_suresi;
      }
    }, 1000);
  }
  _empty = true;
});

document.getElementById("inpMovement").oninput = function () {
  document.getElementById("txtMovement").textContent = this.value;
  var _table = document.getElementById("show");
  deger = 1;
  switch (Number(this.value)) {
    case 1:
      _table.innerHTML = "";
      createTable(10, 2, 5);
      break;
    case 2:
      _table.innerHTML = "";
      createTable(50, 10, 5);
      break;
    case 3:
      _table.innerHTML = "";
      createTable(100, 10, 10);
      break;
  }
};

document.getElementById("inpFontSize").oninput = function () {
  document.getElementById("txtFontSize").textContent = this.value;
  $(".box").css("font-size", Number(this.value));
};

//Tablonun oluşturulması ve sayıların tabloya yerleştirilmesi işlemi Başlangıç

//Sayfadaki yerlere
var deger = 1;

document.getElementById("show").addEventListener("click", function (e) {
  if (e.target.textContent == _value && deger >= _value - 1) {
    clearTimeout(timerSet);
    swal("Egzersiz sona ermiştir :)");
    //veritabanı kaydını yapıcaz
  }
  if (e.target.textContent == deger) {
    if (deger == 1) {
      start = true;
    }
    e.target.className = "style";
    deger++;
  }
  e.preventDefault();
});

let timerSet;
let timeV;
let timeS;
function TimeStamp(t) {
  timerSet = setInterval(() => {
    t++;
    timeV = t;
  }, 1000);
}

document.getElementById("times").addEventListener("click", function () {
  window.location = "../../exercises.php";
});

function pauseTimer() {
  clearTimeout(timerSet);
  var test_zaman = document.getElementById("gizli_zaman").value;
  $.ajax({
    type: "POST",
    url: "ajax/ajax_sayibulma.php",
    data: {
      bayi_kod: bayi_kod,
      tc: dizi_tc[siraNumarasi - 1],
      ad_soyad: dizi_ad[siraNumarasi - 1],
      sure: timeV,
      son_isaret_sayisi: deger - 1,
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
      deger = 1;
      document.getElementById("show").textContent = "";
      document.getElementById("txt").style.display = "none";
      document.getElementById("feature").style.display = "none";
      document.getElementById("toptitle").style.display = "block";
      document.getElementById("bottomtitle").textContent = "Tıkla";
      document.getElementById("bottomtitle").classList.remove("loa");
      document.getElementById("startmenu").style.display = "block";
      _empty = false;
    },
  });
}

document.getElementById("finishToApp").addEventListener("click", function () {
  pauseTimer();
  SetInf();
});

//-----------------------------------------------------------------

function createTable(value, column, line) {
  var rastgeleSayi;
  var sayac = 0;
  var dizi = [];
  var degisken = dizi.length;

  _value = value;
  while (Number(degisken) < value) {
    rastgeleSayi = Math.floor(Math.random() * value) + 1;
    var kosul = dizi.indexOf(rastgeleSayi);
    if (kosul == -1) {
      dizi.push(rastgeleSayi);
      degisken++;
    }
  }

  var table = document.createElement("table");
  table.className = "table table-striped table-hover";
  var tbdy = document.createElement("tbody");
  var tbody = table.appendChild(tbdy);
  for (var i = 0; i < column; i++) {
    var tr = document.createElement("tr");
    tbody.appendChild(tr);
    for (var j = 0; j < line; j++) {
      var td = document.createElement("td");
      td.innerHTML = dizi[sayac];
      sayac++;
      td.id = "sira_" + sayac;
      td.className = "box";
      tr.appendChild(td);
    }
  }

  document.getElementById("show").appendChild(table);
}
