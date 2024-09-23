var bayi_kod;
var kullanici_adi;
var sifre;
window.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("dealer")) {
    var bilgiler = JSON.parse(localStorage.getItem("dealer"));
    bayi_kod = Number(bilgiler.CLIENT);

    var kullanici_adi = bilgiler.USCD;
    var sifre = bilgiler.PASS;
    var tbody = document.getElementById("tbody");
    // console.log(bilgiler);

    $.ajax({
      type: "Get",
      url:
        "http://api2.neurosound.com.tr/api/STU_MAIN?client=" +
        bayi_kod +
        "&status=01~02",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        apiKey: "F5E0945DB9CFC2AB0E08AD40103474B1",
        password: sifre,
        userid: kullanici_adi,
      },
      success: function (response) {
        if (response) {
          document.getElementById("selectedStudient").style.display = "block";
          // console.log(response);
          for (let i = 0; i < response.length; i++) {
            var tr = `<tr><th scope="row">${i + 1}</th><td>${
              response[i].TCNO
            }</td><td>${
              response[i].NAME
            }</td><td><button id="plus" class="btn btn-primary btn-sm  bi bi-plus-lg"></button></td></tr>`;
            tbody.innerHTML += tr;
          }
        }
      },
    });

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

//Öğrenci Şeçme Kısmı
var sira_tiklama;
var dizi_tc = [];
var dizi_ad = [];
var dizi_sira = [];
var secim_sirasi = 1;
var siraNumarasi;

document.getElementById("table").addEventListener("click", function (e) {
  if (e.target.id == "plus") {
    if (document.getElementById("y_tbody").childElementCount + 1 != 0) {
      document.getElementById("SlctTableStd").style.opacity = 1;
      document.getElementById("SlctTableWrd").textContent =
        "Seçilen Kullanıcılar";
      document.getElementById("btn_select").style.display = "inline";
    }
    // console.log();
    var kisi = e.target.parentElement.parentElement;
    sira_tiklama = kisi.children[0].textContent;
    var tc = kisi.children[1].textContent;
    var ad = kisi.children[2].textContent;
    e.target.setAttribute("disabled", true);

    var ytbody = document.getElementById("y_tbody");
    var tr = `<tr><th scope="row">${secim_sirasi}</th><td>${tc}</td><td>${ad}</td><td><button id="error" name="${sira_tiklama}" class="bi bi-x-lg btn btn-danger btn-sm"></button></td></tr>`;
    secim_sirasi++;
    ytbody.innerHTML += tr;
  }
});

document.getElementById("y_tbody").addEventListener("click", function (e) {
  if (e.target.id == "error") {
    if (document.getElementById("y_tbody").childElementCount == 1) {
      document.getElementById("SlctTableStd").style.opacity = 0;
      document.getElementById("SlctTableWrd").textContent =
        "Kullanıcı Seçilmedi";
      document.getElementById("btn_select").style.display = "none";
    }
    var dt = e.target.name;
    document
      .getElementById("table")
      .children[1].children[dt - 1].children[3].children[0].removeAttribute(
        "disabled"
      );
    e.target.parentElement.parentElement.remove();
    secim_sirasi--;
  }
});

var drcl;
document.getElementById("btn_select").addEventListener("click", function () {
  var yan_tbody = document.getElementById("y_tbody");
  var ic_eleman_sayisi = yan_tbody.childElementCount;
  if (ic_eleman_sayisi != 0) {
    for (let i = 0; i < ic_eleman_sayisi; i++) {
      dizi_sira.push(yan_tbody.children[i].children[0].textContent);
      dizi_tc.push(yan_tbody.children[i].children[1].textContent);
      dizi_ad.push(yan_tbody.children[i].children[2].textContent);
    }

    var tbody = document.getElementById("modal_body_table");
    for (let i = 0; i < ic_eleman_sayisi; i++) {
      var tr = `<tr><th scope="row">${dizi_sira[i]}</th><td>${dizi_tc[i]}</td><td>${dizi_ad[i]}</td><td><input class="inp" disabled style="text-align: center" type="text" name="ogr_sure_${i}" id="ogr_sure_${i}"></td><td><input class="inp" disabled style="text-align: center" type="text" name="ogr_dogru_${i}" id="ogr_dogru_${i}"></td><td><input class="inp" disabled style="text-align: center" type="text" name="ogr_yanlis_${i}" id="ogr_yanlis_${i}"></td></tr>`;
      tbody.innerHTML += tr;
    }
    document.getElementById("modalResult").style.display = "block";
    document.getElementById("fullSelect").style.display = "none";
    document.getElementById("txt").style.display = "block";
    document.getElementById("feature").style.display = "block";
  } else {
    swal("Öğrenci Seçimi yapmanız gerekiyor.");
  }

  drcl = 0;
  siraNumarasi = Number(
    document.getElementById("modal_body_table").children[drcl].children[0]
      .textContent
  );
  var tablo_ad =
    document.getElementById("modal_body_table").children[drcl].children[2]
      .textContent;

  document.getElementById("studientName").textContent = tablo_ad;
});

function SetInf() {
  document.getElementById("modal_body_table").children[drcl].children[3].children[0].value = timeV;
  document.getElementById("modal_body_table").children[drcl].children[4].children[0].value = document.getElementById("lblDogruSayisiSkor").textContent;
  document.getElementById("modal_body_table").children[drcl].children[5].children[0].value = document.getElementById("lblYanlisSayisiSkor").textContent;
  drcl++;
}

document.getElementById("AppToEnd").addEventListener("click", function () {
  window.location = "../../exercises.php";
});

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


