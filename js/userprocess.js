var bayi_kodu;
window.addEventListener("DOMContentLoaded", function () {
  var bilgiler = JSON.parse(localStorage.getItem("dealer"));
  bayi_kodu = Number(bilgiler.CLIENT);
  var kullanici_adi = bilgiler.USCD;
  var sifre = bilgiler.PASS;
  var tbody = document.getElementById("selectToUser");
  $.ajax({
    type: "Get",
    url:
      "http://api2.neurosound.com.tr/api/STU_MAIN?client=" +
      bayi_kodu +
      "&status=01~02",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      apiKey: "F5E0945DB9CFC2AB0E08AD40103474B1",
      password: sifre,
      userid: kullanici_adi,
    },
    success: function (response) {
      var ustDizi = [];
      // console.log(response.length);
      for (let i = 0; i < response.length; i++) {
        var tr = `<option >${response[i].TCNO} - ${response[i].NAME}</option>`;
        ustDizi.push(`${response[i].TCNO} - ${response[i].NAME}`);
        tbody.innerHTML += tr;
      }

      console.log(ustDizi);

      // Şu alanda bir değişiklik olacak bakalımda bi nasıl bir algoritma tasarlayacaksak
      $.ajax({
        type: "POST",
        url: "js/ajax/ajax_ogr_get_full.php",
        data: {
          bkod: bayi_kodu,
        },
        success: function (sonuc) {
          var dizi = sonuc.split("_*_");
          dizi.pop();
          // console.log(dizi);

          for (let i = 0; i < dizi.length; i += 2) {
             if (ustDizi.indexOf(`${dizi[i + 1]} - ${dizi[i]}`) == -1) {
              var trr = `<option >${dizi[i + 1]} - ${dizi[i]}</option>`;
              tbody.innerHTML += trr;
             }else{
               console.log(`<option >${dizi[i + 1]} - ${dizi[i]}</option>`);
             }
          }
        },
      });
      // Şu alanda bir değişiklik olacak bakalımda bi nasıl bir algoritma tasarlayacaksak
    },
  });
});

var tc_no;
var ad_soyad;

document.getElementById("newUser").addEventListener("click", function () {
  document.getElementById("userinfo").style.display = "block";
  returnToStart();
  document.getElementById("userNameLastName").removeAttribute("disabled");
  document.getElementById("userId").removeAttribute("disabled");
  document.getElementById("btnSave").removeAttribute("disabled");
});

document
  .getElementById("btnResultToUser")
  .addEventListener("click", function (e) {
    returnToStart();
    var ogrtablo = document.getElementById("selectToUser").value;
    var degerler = ogrtablo.split(" - ");
    tc_no = degerler[0];
    ad_soyad = degerler[1];

    if (ad_soyad == undefined) {
      swal("Lütfen bir öğrenci seçiniz...");
    } else {
      document.getElementById("userinfo").style.display = "block";
      document.getElementById("userNameLastName").value = ad_soyad;
      document.getElementById("userId").value = tc_no;

      $.ajax({
        type: "POST",
        url: "js/ajax/ajax_ogr_islem_get.php",
        data: {
          tck: tc_no,
          ad_soyad: ad_soyad,
        },
        success: function (sonuc) {
          if (sonuc != false) {
            console.log(sonuc);
            document.getElementById("btnUpdate").removeAttribute("disabled");
            document.getElementById("btnDelete").removeAttribute("disabled");
            var bilgiler = sonuc.split("_*_");
            var kadi = bilgiler[0];
            var ksifre = bilgiler[1];
            var program = bilgiler[2];

            document.getElementById("userKadi").value = kadi;
            document.getElementById("userPass").value = ksifre;

            for (
              let i = 0;
              i < document.getElementById("userProgram").childElementCount;
              i++
            ) {
              if (
                document.getElementById("userProgram").children[i]
                  .textContent == program
              ) {
                document
                  .getElementById("userProgram")
                  .children[i].setAttribute("selected", true);
              }
            }

            // document.getElementById("userProgram")[0].textContent = program;
          } else {
            document.getElementById("btnSave").removeAttribute("disabled");
          }
        },
      });
    }
  });

function returnToStart() {
  document.getElementById("userNameLastName").value = "";
  document.getElementById("userId").value = "";
  document.getElementById("userKadi").value = "";
  document.getElementById("userPass").value = "";
  document.getElementById("userNameLastName").setAttribute("disabled", true);
  document.getElementById("userId").setAttribute("disabled", true);
  document.getElementById("btnSave").setAttribute("disabled", true);
  document.getElementById("btnUpdate").setAttribute("disabled", true);
  document.getElementById("btnDelete").setAttribute("disabled", true);
}

document.getElementById("btnSave").addEventListener("click", function (event) {
  var name = document.getElementById("userNameLastName").value;
  var tc = document.getElementById("userId").value;
  var kadi = document.getElementById("userKadi").value;
  var sifre = document.getElementById("userPass").value;
  var program = document.getElementById("userProgram").value;

  if (
    name != "" &&
    tc != "" &&
    kadi != "" &&
    sifre != "" &&
    kadi.length > 4 &&
    kadi.length < 16 &&
    sifre.length > 4 &&
    sifre.length < 16
  ) {
    $.ajax({
      type: "POST",
      url: "js/ajax/ajax_ogr_islem_save.php",
      data: {
        bkod: bayi_kodu,
        tck: tc,
        ad_soyad: name,
        kadi: kadi,
        psw: sifre,
        prg: program,
      },
      success: function (sonuc) {
        if ((sonuc = "Başarılı")) {
          swal("Kayıt işlemi başarılı bir şekilde gerçekleştirilmiştir.");
          returnToStart();
          document.getElementById("userinfo").style.display = "none";
        } else {
          swal("Kayıt gerçekleştirilemedi.");
        }
      },
    });
  } else {
    swal({
      title: "Dikkat",
      text: "Boş alanları doldurunuz. Kullanıcı adı ve şifre alanlarını kontrol ediniz. Kullanıcı adı ve şifreniz 4 karakterden az ve 15 karakterden fazla olamaz..",
      icon: "error",
      button: "TAMAM",
    });
  }
});

document.getElementById("userKadi").addEventListener("blur", function () {
  var deger = this.value;

  $.ajax({
    type: "POST",
    url: "js/ajax/ajax_ogr_islem_blur.php",
    data: {
      dt: deger,
    },
    success: function (sonuc) {
      if (sonuc != true) {
        console.log("Kullanıcı adı müsait");
      } else {
        swal(
          "Kullanıcı adı kullanılıyor. Farklı bir kullanıcı adı belirlemeniz gerekiyor."
        );
        document.getElementById("userKadi").value = "";
      }
    },
  });
});

document.getElementById("btnDelete").addEventListener("click", function (e) {
  var ad = document.getElementById("userNameLastName").value;
  var tc = document.getElementById("userId").value;
  var kadi = document.getElementById("userKadi").value;
  if (kadi != "") {
    swal({
      title: "Silme İşlemi",
      text: "Öğrenci bilgilerini silmek istediğinizden emin misiniz ?",
      icon: "warning",
      buttons: ["İptal", "Sil"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        $.ajax({
          type: "POST",
          url: "js/ajax/ajax_ogr_islem_delete.php",
          data: {
            adi: ad,
            tck: tc,
            kad: kadi,
          },
          success: function (sonuc) {
            if (sonuc == true) {
              swal("Silme işlemi başarılı bir şekilde tamamlandı");
              document.getElementById("userinfo").style.display = "none";
            } else {
              swal("Silme işlemi tamamlanamadı");
            }
          },
        });
      }
    });
  } else {
    swal("Kullanıcı alanlarını kontrol ediniz.");
  }
});

document.getElementById("btnUpdate").addEventListener("click", function (e) {
  var ad = document.getElementById("userNameLastName").value;
  var tc = document.getElementById("userId").value;
  var kadi = document.getElementById("userKadi").value;
  var sifre = document.getElementById("userPass").value;
  var program = document.getElementById("userProgram").value;

  $.ajax({
    type: "POST",
    url: "js/ajax/ajax_ogr_islem_update.php",
    data: {
      adi: ad,
      tck: tc,
      kad: kadi,
      ps: sifre,
      prg: program,
    },
    success: function (sonuc) {
      if (sonuc == true) {
        swal("Güncelleme işlemi başarılı bir şekilde tamamlandı");
        document.getElementById("userinfo").style.display = "none";
      } else {
        swal("Güncelleme işlemi tamamlanamadı");
      }
    },
  });
});
