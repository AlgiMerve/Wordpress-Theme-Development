//Şimdilik Kısım
var learn = false;
var dakika;
var tam_url = window.location.href;
var kisim = tam_url.split("?");
var getHiz;
var nextUrl;
var getSeviye;
if (kisim[1]) {
  var getSure = kisim[1].split("&")[0].split("=")[1];
  var getLevel = Number(kisim[1].split("&")[1].split("=")[1]);
  getHiz = kisim[1].split("&")[2].split("=")[1];
  getSeviye = Number(kisim[1].split("&")[3].split("=")[1]) + 1;

  document.getElementById("txtSpeed").textContent = getHiz;
  document.getElementById("inpSpeed").value = getHiz;
  document.getElementById("txtMovement").textContent = getLevel;
  document.getElementById("inpMovement").value = getLevel;
  dakika = getSure / 60;
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

  // console.log(getSeviye);

  // Diğer eğitimin Url Alma
  $.ajax({
    type: "POST",
    url: "../../js/ajax/ajax_getUrl.php",
    data: {
      getSeviye,
    },
    success: function (event) {
      nextUrl = event;
    },
  });
}

var minute;
var second;

function startTimer(m, s) {
  minute = m;
  second = s;
  document.getElementById("timer").textContent = m + " : " + s;
  if (s == 00) {
    s = 60;
    m--;
  }

  s = s - 1;

  id = setTimeout(function () {
    if ((m == 0 && s == 00) || ix >= wordCount) {
      clearInterval(id);
      document.getElementById("timer").textContent = "0 : 0";
      pauseTimer();
      StudientSave();
      if ((getSeviye - 1) % 8 == 0) {
        PutTime();
      }
      swal("Eğitiminiz Tamamlandı");
      var locat = setTimeout(() => {
        window.location = "../../" + nextUrl;
        clearTimeout(locat);
      }, 2000);
    } else {
      startTimer(m, s);
    }
  }, 1000);
}

//Şimdilik Kısım

var bayi_kod;
var ad_soyad;
var tc_no;
var baslama_suresi = 3;
var pause = false;
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
  var time = document.getElementById("gizli_zaman").value.split(" ")[0];
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
  var time = document.getElementById("gizli_zaman").value.split(" ")[0];
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
    title: "Odaklama Egzersizi",
    text: "Bu egzersizde; kapalı gelen metni, kelimeler veya kelime grupları açıldıkça okuman bekleniyor. Önemli olan kelimeler tek tek veya 2’li, 3’lü, 4’lü gruplar hâlinde açıldıkça açılma hızına uyarak kelimeleri okuman. Geride kalmamaya dikkat etmelisin. ",
    icon: "info",
    button: "TAMAM",
  });
}

document.getElementById("question").addEventListener("click", function () {
  swAlert();
});

document.getElementById("inpMovement").oninput = function () {
  document.getElementById("txtMovement").textContent = this.value;
};

document.getElementById("inpSpeed").oninput = function () {
  document.getElementById("txtSpeed").textContent = this.value;
  if (pause == false) {
    clearInterval(timer);
    start_app(Number(this.value));
  }
};

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

function okumaHizi(kelimesayi, sure) {
  return parseInt((kelimesayi / sure) * 60);
}

var textDiv;
var wordCount;

function metin_ata() {
  var text = document.getElementById("gizli_metin").value;
  textDiv = document.getElementById("content");
  var wordArray = text.split(" ");
  wordCount = wordArray.length;
  for (var j = 0; j < wordArray.length; j++) {
    var span = document.createElement("span");
    span.setAttribute("class", "word");
    span.setAttribute("id", "word_" + j);
    span.innerHTML = wordArray[j] + " ";
    textDiv.appendChild(span);
  }
}

function highlightFunction(elt) {
  if (elt != null) {
    //Pembeye benzer renk
    elt.style.backgroundColor = "#e99fff";
    elt.style.color = "black";
  }
}

function unHighlightFunction(elt) {
  $(".word").css({
    "background-color": "#d3d3d3",
    color: "#d3d3d3",
    "margin-bottom": "5px",
  });
}

document.querySelector(".startmenu").addEventListener("click", function () {
  if (_empty == false) {
    metin_ata();
    document.getElementById("toptitle").style.display = "none";
    document.getElementById("bottomtitle").textContent = baslama_suresi;
    document.getElementById("bottomtitle").classList.add("loa");
    var startTimerFirs = setInterval(() => {
      if (baslama_suresi <= 1) {
        start = true;
        TimeStamp(1);
        clearInterval(startTimerFirs);
        document.getElementById("startmenu").style.display = "none";
        document.getElementById("txt").style.display = "block";
        document.getElementById("pause").style.display = "block";

        if (learn == true) {
          start_app(getHiz);
          document.getElementById("timer").style.display = "block";
          startTimer(dakika, 0);
        } else {
          start_app(1000);
          document.getElementById("feature").style.display = "block";
        }
      } else {
        baslama_suresi--;
        document.getElementById("bottomtitle").textContent = baslama_suresi;
      }
    }, 1000);
  }
  _empty = true;
});

var sira = 0;
var ix = 0;
var timer;
var seviye;

function start_app(hizlanma) {
  timer = setInterval(readNextWord, hizlanma);

  function readNextWord() {
    // console.log(textDiv.children[ix].getBoundingClientRect().top);

    if (
      document.querySelector("#content").getBoundingClientRect().height > 600 &&
      ix < textDiv.children.length
    ) {
      if (textDiv.children[ix].getBoundingClientRect().top > 600) {
        document.querySelector(".txtmain").scrollBy(0, 550);
      }
    }

    // console.log(document.querySelector("#content").getBoundingClientRect());

    seviye = Number(document.getElementById("txtMovement").textContent);
    document.getElementById("lblOkunanKelimeSayisi").value = sira;

    if (ix > 0) {
      unHighlightFunction();
    }

    if (seviye == 1) {
      if (ix < textDiv.children.length) {
        highlightFunction(textDiv.children[ix]);
        ix++;
        sira++;
      } else {
        document.getElementById("lblOkunanKelimeSayisi").value =
          textDiv.children.length;
        clearTimeout(timerSet);
        clearInterval(timer);
        swal({
          text: "Okuma Hızın : " + okumaHizi(ix, timeV) + " kelime/dakika",
          button: "TAMAM",
        });
        document.getElementById("pause").style.display = "none";
      }
    } else if (seviye == 2) {
      if (ix < textDiv.children.length) {
        highlightFunction(textDiv.children[ix]);
        highlightFunction(textDiv.children[ix + 1]);
        ix += 2;
        sira += 2;
      } else {
        document.getElementById("lblOkunanKelimeSayisi").value =
          textDiv.children.length;
        clearTimeout(timerSet);
        clearInterval(timer);
        swal({
          text: "Okuma Hızın : " + okumaHizi(ix, timeV) + " kelime/dakika",
          button: "TAMAM",
        });
        document.getElementById("pause").style.display = "none";
      }
    } else if (seviye == 3) {
      if (ix < textDiv.children.length) {
        highlightFunction(textDiv.children[ix]);
        highlightFunction(textDiv.children[ix + 1]);
        highlightFunction(textDiv.children[ix + 2]);

        ix += 3;
        sira += 3;
      } else {
        document.getElementById("lblOkunanKelimeSayisi").value =
          textDiv.children.length;
        clearTimeout(timerSet);
        clearInterval(timer);
        swal({
          text: "Okuma Hızın : " + okumaHizi(ix, timeV) + " kelime/dakika",
          button: "TAMAM",
        });
        document.getElementById("pause").style.display = "none";
      }
    } else if (seviye == 4) {
      if (ix < textDiv.children.length) {
        highlightFunction(textDiv.children[ix]);
        highlightFunction(textDiv.children[ix + 1]);
        highlightFunction(textDiv.children[ix + 2]);
        highlightFunction(textDiv.children[ix + 3]);
        ix += 4;
        sira += 4;
      } else {
        document.getElementById("lblOkunanKelimeSayisi").value =
          textDiv.children.length;
        clearTimeout(timerSet);
        clearInterval(timer);
        swal({
          text: "Okuma Hızın : " + okumaHizi(ix, timeV) + " kelime/dakika",
          button: "TAMAM",
        });
        document.getElementById("pause").style.display = "none";
      }
    }

    // console.log("i : " + ix);
    // console.log("Sıra : " + sira);
    // console.log("Div eleman sayısı : " + textDiv.children.length);
  }
}

document.getElementById("pause").addEventListener("click", function () {
  pause = true;
  this.style.display = "none";
  document.getElementById("resume").style.display = "block";
  if (learn == true) {
    clearTimeout(id);
  }
  clearInterval(timer);
  clearInterval(timerSet);
  swal({
    text: "Okuma Hızın : " + okumaHizi(ix, timeV) + " kelime/dakika",
    button: "TAMAM",
  });
});

document.getElementById("resume").addEventListener("click", function () {
  pause = false;
  this.style.display = "none";
  var hiz = Number(document.getElementById("txtSpeed").textContent);
  start_app(hiz);
  document.getElementById("pause").style.display = "block";
  if (learn == true) {
    startTimer(minute, second);
  }
  TimeStamp(timeV);
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
  if (start == true && learn != true) {
    pauseTimer();
  } else {
    if (learn == true) {
      window.location = "../../index.php";
    } else {
      window.location = "../../exercises.php";
    }
  }
});

function pauseTimer() {
  PutLearnTime();
  clearTimeout(timerSet);
  clearInterval(timer);
  var test_zaman = document.getElementById("gizli_zaman").value;
  $.ajax({
    type: "POST",
    url: "ajax/ajax_metin_takip.php",
    data: {
      bayi_kod: bayi_kod,
      tc: tc_no,
      ad_soyad: ad_soyad,
      sure: timeV,
      okunan_kelime_sayisi: ix,
      zaman: test_zaman,
    },
    success: function (res) {
      if (learn != true) {
        window.location = "../../exercises.php";
      }
    },
  });
}

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
