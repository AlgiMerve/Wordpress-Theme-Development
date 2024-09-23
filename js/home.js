var bayi_kod;
var ad_soyad;
var sira = 1;

// userTable

window.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("dealer")) {
    document.getElementById("body_id").style.display = "block";
    var bilgiler = JSON.parse(localStorage.getItem("dealer"));
    bayi_kod = bilgiler.CLIENT;
    $.ajax({
      type: "POST",
      url: "js/ajax/ajax_home.php",
      data: {
        bayi_kod,
      },
      success: function (event) {
        var dizi = event.split("_*_");
        dizi.pop();
        var tbdy = document.getElementById("userTable");
        for (let i = 0; i < dizi.length; i += 3) {
          var td = `<tr>
          <th scope="row">${sira}</th>
          <td>${dizi[i].toUpperCase()}</td>
          <td>${dizi[i + 1]}</td>
          <td>${dizi[i + 2]}</td>
                  </tr>`;
          tbdy.innerHTML += td;
          sira++;
        }
      },
    });

    document
      .getElementById("tblLevelSpeed")
      .addEventListener("click", function () {
        swal({
          title: "Okuma Hızına Göre Uygulanabilecek Eğitimler Şablonu",
          text: "Okuma Hızına Göre Eğtim Şablonu kullanıcının en son okuma hızına göre eğitim özelliklerini belirlemenizi sağlar. En son okuma hızına bakarak egzersizler bölümünde bulunan egzersizleri rastgele bir şekilde 4 veya 5 tane egzersizi 2,3 dakika olacak şekilde uygularken tablodaki değerlere göre özellikleri belirleye bilirsiniz.",
          icon: "info",
          button: "TAMAM",
        });
      });

    document
      .getElementById("tblLastLearn")
      .addEventListener("click", function () {
        swal({
          title: "Kullanıcı Katılım Tablosu",
          text: "Bireysel kullanım programında verilen eğitimini tamamlayan son 10 kullanıcının listelenmesini sağlar. En Son Seans Tamamlama Tarihi 30 seanstan oluşan eğitimini en son ne zaman tamamladığını gösterir. En Son Katılım Tarihi ise bireysel sistem programı üzerinde ne zaman aktif olduğunu ve egzersizleri yaptığını gösterir.",
          icon: "info",
          button: "TAMAM",
        });
      });
  } else {
    setInterval(() => {
      window.location = "login.php";
    }, 100);
  }
});
