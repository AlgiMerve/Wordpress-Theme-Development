var tam_url = window.location.href;
var url = tam_url.split("?");
var urlId = url[1];
var id = urlId.split("=")[1];
var last_id = id;

var baslama_suresi = 3;

var get_Data;
var buton_seviye;
var buton_hiz;
var durum;

var sira = 0;
var ix = 0;
var timer;
var seviye;

var textDiv;
var wordCount;

function swAlert() {
  swal({
    title: "Blok Okuma Egzersizi",
    text: "Bu egzersiz, göze metin üzerinde sıçrama noktalarını öğreterek, gözün metin üzerinde seri bir şekilde akmasını sağlar.",
    icon: "info",
    button: "TAMAM",
  });
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
      buton_seviye = Number(get_Data[1]);
      buton_hiz = Number(get_Data[2]);
      durum = get_Data[3];

      if (durum == "start") {
        document.getElementById("content").textContent = "";
        ix = 0;
        metin_ata();
        document.getElementById("toptitle").style.display = "none";
        document.getElementById("bottomtitle").textContent = baslama_suresi;
        document.getElementById("bottomtitle").classList.add("loa");
        var startTimerFirs = setInterval(() => {
          if (baslama_suresi <= 1) {
            clearInterval(startTimerFirs);
            document.getElementById("txt").style.display = "block";
            start_app(buton_hiz);
          } else {
            baslama_suresi--;
            document.getElementById("bottomtitle").textContent = baslama_suresi;
          }
        }, 1000);
        updateData("wait");
      } else if (durum == "stop") {
        clearInterval(timer);
        updateData("wait");
      } else if (durum == "resume") {
        start_app(buton_hiz);
        updateData("wait");
      } else if (durum == "change") {
        clearInterval(timer);
        start_app(buton_hiz);
        updateData("wait");
      } else if (durum == "finish") {
        baslama_suresi = 3;
        clearInterval(timer);
        $("#mainTxt").scrollTop(0);
        unHighlightFunction(textDiv.children[ix - 1]);
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

function updateData(newDurum) {
  $.ajax({
    type: "POST",
    url: "ajax/ajax_client_update.php",
    data: {
      id: last_id,
      okunan_kelime_sayisi: ix,
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
  }
}

function unHighlightFunction(elt) {
  if (elt != null) {
    $(".word").css({
      "background-color": "#d3d3d3",
      color: "black",
      "margin-bottom": "5px",
    });
    var sira = elt.id.split("_");
    for (let i = 0; i <= sira[1]; i++) {
      document.getElementById("word_" + i).style.opacity = 0;
    }
  } else {
    var sayi_sira = textDiv.children.length;
    for (let i = 0; i < sayi_sira; i++) {
      document.getElementById("word_" + i).style.opacity = 0;
    }
  }
}

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

    seviye = buton_seviye;
    document.getElementById("lblOkunanKelimeSayisi").value = sira;

    if (ix > 0) {
      unHighlightFunction(textDiv.children[ix - 1]);
    }

    if (seviye == 1) {
      if (ix < textDiv.children.length) {
        highlightFunction(textDiv.children[ix]);
        ix++;
        sira++;
      } else {
        document.getElementById("lblOkunanKelimeSayisi").value =
          textDiv.children.length;
        clearInterval(timer);
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
        clearInterval(timer);
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
        clearInterval(timer);
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
        clearInterval(timer);
        document.getElementById("pause").style.display = "none";
      }
    }
  }
}
