var tam_url = window.location.href;
var url = tam_url.split("?");
var urlId = url[1];
var id = urlId.split("=")[1];
var last_id = id;

var baslama_suresi = 3;

var get_Data;
var buton_seviye;
var buton_yazi_boyut;
var metin_sure = 0;
var durum;

function swAlert() {
  swal({
    title: "Sayıları Sıralama Egzersizi",
    text: "Karışık olarak verilmiş olan sayıları doğru bir şekilde sırlamanız gerekmektedirç Bu egzersiz ile göz kaslarınız gelişirken odaklanma seviyenizde de bir artış yaşanacaktır.",
    icon: "info",
    button: "TAMAM",
  });
}

let timerSet;
let timeV;
function TimeStamp(t) {
  timerSet = setInterval(() => {
    t++;
    timeV = t;
  }, 1000);
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
      buton_seviye = Number(get_Data[2]);
      buton_yazi_boyut = Number(get_Data[3]);
      durum = get_Data[4];

      if (durum == "start") {
        deger = 1;
        document.getElementById("toptitle").style.display = "none";
        document.getElementById("bottomtitle").textContent = baslama_suresi;
        document.getElementById("bottomtitle").classList.add("loa");
        var startTimerFirs = setInterval(() => {
          if (baslama_suresi <= 1) {
            document.getElementById("startmenudual").style.display = "none";
            clearInterval(startTimerFirs);
            document.getElementById("txt").style.display = "block";
            TimeStamp(1);
            sayi(buton_seviye);
          } else {
            baslama_suresi--;
            document.getElementById("bottomtitle").textContent = baslama_suresi;
          }
        }, 1000);
        updateData("wait");
      } else if (durum == "change") {
        sayi(buton_seviye);
        updateData("wait");
      } else if (durum == "finish") {
        document.getElementById("startmenudual").style.display = "block";
        baslama_suresi = 3;
        clearInterval(timerSet);
        document.getElementById("txt").style.display = "none";
        document.getElementById("toptitle").style.display = "block";
        document.getElementById("bottomtitle").textContent = "Hazır";
        document.getElementById("bottomtitle").classList.remove("loa");
        document.getElementById("startmenudual").style.display = "block";
        updateData("wait");
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

function sayi(level) {
  var _table = document.getElementById("show");
  deger = 1;
  switch (level) {
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
  $("td").css("font-size", buton_yazi_boyut);
}

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
      tr.appendChild(td);
    }
  }

  document.getElementById("show").appendChild(table);
}

function updateData(newDurum) {
  $.ajax({
    type: "POST",
    url: "ajax/ajax_client_update.php",
    data: {
      id: last_id,
      son_isaret_sayisi: deger - 1 || 0,
      metin_sure: timeV || 0,
      buton_seviye: buton_seviye,
      buton_yazi_boyut: buton_yazi_boyut,
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
