window.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("dealer")) {
    setInterval(() => {
      window.location = "index.php";
    }, 100);
  } else if (localStorage.getItem("user")) {
    setInterval(() => {
      window.location = "studentapps";
    }, 100);
  } else {
    document
      .getElementById("btn_giris")
      .addEventListener("click", function (e) {
        var giris_bilgi = document.getElementById("giris_bilgi").value;

        var bayikod = Number(document.getElementById("bayi_kod").value);
        var kadi = document.getElementById("kullanici_adi").value;
        var sifre = document.getElementById("sifre").value;

        if (giris_bilgi == "bayi") {
          if (bayikod == "" || kadi == "" || sifre == "") {
            swal("Boş alanları doldurunuz.");
          } else {
            $.ajax({
              type: "Get",

              url: "http://api2.neurosound.com.tr/api/usrs?client=" + bayikod,
              headers: {
                "Content-Type": "application/json; charset=utf-8",
                apiKey: "F5E0945DB9CFC2AB0E08AD40103474B1",
                password: md5(sifre),
                userid: kadi,
              },
              success: function (response) {
                console.log(response);
                localStorage.setItem("dealer", JSON.stringify(response));
                if (response) {
                  window.location = "index.php";
                } else {
                  swal("Lütfen bilgilerinizi kontrol ediniz.");
                  bayikod = "";
                  kadi = "";
                  sifre = "";
                }
              },
            });
          }
        } else if (giris_bilgi == "ogrenci") {
          if (kadi == "" || sifre == "") {
            swal("Boş alanları doldurunuz.");
          } else {
            $.ajax({
              type: "POST",
              url: "ajax_sorgu.php",
              data: {
                kadi: kadi,
                sifre: sifre,
              },
              success: function (sonuc) {
                var bilgiler = sonuc.split("_*_");
                var durum = bilgiler[0];
                var bayi_kd = bilgiler[1];
                var ads = bilgiler[2];
                var tck = bilgiler[3];

                var dizi = JSON.stringify({
                  bayi: bayi_kd,
                  ad: ads,
                  tc: tck,
                });

                if (durum == true) {
                  localStorage.setItem("user", dizi);
                  window.location = "studentapps";
                } else {
                  swal("Lütfen bilgilerinizi kontrol ediniz.");
                  kadi = "";
                  sifre = "";
                }
              },
            });
          }
        }

        e.preventDefault();
      });

    const inputs = document.querySelectorAll(".input");

    function addcl() {
      let parent = this.parentNode.parentNode;
      parent.classList.add("focus");
    }

    function remcl() {
      let parent = this.parentNode.parentNode;
      if (this.value == "") {
        parent.classList.remove("focus");
      }
    }

    inputs.forEach((input) => {
      input.addEventListener("focus", addcl);
      input.addEventListener("blur", remcl);
    });

    $(document).ready(function () {
      $("#bayi").change(function () {
        document.getElementById("bayi_bilgi").style.opacity = "1";
        document.getElementById("bayi_kod").removeAttribute("disabled");
        document.getElementById("giris_bilgi").value = "bayi";
        document.getElementById("bayi_kod").value = "";
        document.getElementById("kullanici_adi").value = "";
        document.getElementById("sifre").value = "";
      });

      $("#ogr").change(function () {
        document.getElementById("bayi_kod").setAttribute("disabled", true);
        document.getElementById("bayi_bilgi").style.opacity = "0";
        document.getElementById("bayi_kod").value = "";
        document.getElementById("kullanici_adi").value = "";
        document.getElementById("sifre").value = "";
        document.getElementById("giris_bilgi").value = "ogrenci";
      });
    });
  }
});
