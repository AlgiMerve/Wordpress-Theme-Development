var baslama_suresi = 3;
var pause = false;
var start = false;
var _empty = false;

function swAlert() {
  swal({
    title: "Gruplama Egzersizi",
    text: "Bu egzersizde, kelimeleri tek tek veya 2’li, 3’lü, 4’lü gruplar şeklinde vurgulanmış olan bir metni, bu vurgulamaları takip ederek okuman bekleniyor.",
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
    elt.style.backgroundColor = "black";
  }
}

function unHighlightFunction(elt) {
  $(".word").css({
    "background-color": "#d3d3d3",
    color: "#F1F1F3",
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
        document.getElementById("txtMovement").textContent = 1;
        document.getElementById("inpMovement").value = 1;

        document.getElementById("txtSpeed").textContent = 1000;
        document.getElementById("inpSpeed").value = 1000;

        var btnPause = setTimeout(() => {
          document.getElementById("pause").style.display = "block";
          document.getElementById("finishToApp").style.display = "block";
          clearTimeout(btnPause);
        }, 2000);
        start_app(1000);
        document.getElementById("feature").style.display = "block";
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
  window.location = "../../exercises.php";
});

function pauseTimer() {
  clearTimeout(timerSet);
  clearInterval(timer);
  var test_zaman = document.getElementById("gizli_zaman").value;
  $.ajax({
    type: "POST",
    url: "ajax/ajax_metin_takip.php",
    data: {
      bayi_kod: bayi_kod,
      tc: dizi_tc[siraNumarasi - 1],
      ad_soyad: dizi_ad[siraNumarasi - 1],
      sure: timeV,
      okunan_kelime_sayisi: ix,
      zaman: test_zaman,
    },
    success: function (res) {
      var tblKisiSayisi =
        document.getElementById("modal_body_table").childElementCount;
      if (tblKisiSayisi <= siraNumarasi) {
        document.getElementById("dsbMdlFinish").style.display = "inline";
        document.getElementById("btnModalClose").style.display = "none";
      }
      $("#mainTxt").scrollTop(0);
      siraNumarasi++;
      document.getElementById("studientName").textContent =
        dizi_ad[siraNumarasi - 1];
      baslama_suresi = 3;
      pause = false;
      document.getElementById("resume").style.display = "none";
      document.getElementById("pause").style.display = "block";
      document.getElementById("txt").style.display = "none";
      document.getElementById("feature").style.display = "none";
      document.getElementById("toptitle").style.display = "block";
      document.getElementById("bottomtitle").textContent = "Tıkla";
      document.getElementById("bottomtitle").classList.remove("loa");
      document.getElementById("startmenu").style.display = "block";
      ix = 0;
      unHighlightFunction();
      _empty = false;
    },
  });
}

document.getElementById("finishToApp").addEventListener("click", function () {
  pauseTimer();
  SetInf();
});
