document.addEventListener("DOMContentLoaded", function () {
    var durum;
    if (localStorage.getItem("user")) {
        var kullanici_adi = JSON.parse(localStorage.getItem("user"));
        document.getElementById("prfname").textContent = kullanici_adi.ad;
        document.getElementById("name").textContent = kullanici_adi.ad;

        var ad_soyad = kullanici_adi.ad;
        var bayi_kodu = Number(kullanici_adi.bayi);
        var tc_no = kullanici_adi.tc;

        document.getElementById("exit").addEventListener("click", function () {
            localStorage.removeItem("user");
            localStorage.removeItem("dealer");
            window.location = "../login.php";
        });


        $.ajax({
            type: "POST",
            url: "Sonuclar/ajax/program_icerik_getirme.php",
            data: {
                ad: ad_soyad,
                tc: tc_no,
                bayi_kod: bayi_kodu
            },
            success: function (sonuc) {
                var tbody = document.getElementById("myTable");
                var sonuclar = sonuc.split("_?_");
                var program = sonuclar[0];
                var icerikler = program.split("_*_");

                for (let i = 0; i < icerikler.length; i++) {
                    var link = icerikler[i].split("??");
                    var tbl = `<tr><td>${i + 1}</td><td ><a class="pasif"  href="${link[1]}">${link[0]}</a></td> </tr>`;
                    tbody.innerHTML += tbl;

                }

                durum = Number(sonuclar[1]);


                document.getElementById("myTable").children[durum].children[1].children[0].className = "aktif";
                var liste_sayisi = document.getElementById("myTable").childElementCount;
                var gorunen_sayisi = 8;
                var kac_btn = Math.round(Number(liste_sayisi) / gorunen_sayisi);

                for (let i = 0; i < kac_btn; i++) {

                    var btn_tablosu = `<li class="page-item"><a class="page-link" href="#">${i + 1}</a></li>`;
                    document.getElementById("btn_tablo").innerHTML += btn_tablosu;
                }

                $("tr:gt(" + (gorunen_sayisi - 1) + ")").hide();

                $(".page-link").click(function (e) {

                    var indis = Number(e.target.textContent);
                    var gt = gorunen_sayisi * indis;
                    $("tr").hide();
                    for (let i = gt - gorunen_sayisi; i < gt; i++) {
                        $("tr:eq(" + i + ")").show();

                    }
                    //Aktif klas ekleyecez
                    e.preventDefault();
                });



                $(".aktif").click(function (e) {
                    document.querySelector(".aktif").setAttribute("class", "pasif");

                    var yeni_durum = durum + 1;
                    console.log(yeni_durum);
                    $.ajax({
                        type: "POST",
                        url: "Sonuclar/ajax/durum_guncelleme.php",
                        data: {
                            ad: ad_soyad,
                            tc: tc_no,
                            bayi_kod: bayi_kodu,
                            durum: yeni_durum

                        },
                        success: function (sonuc) {

                            $.ajax({
                                type: "POST",
                                url: "Sonuclar/ajax/durum_getirme.php",
                                data: {
                                    ad: ad_soyad,
                                    tc: tc_no,
                                    bayi_kod: bayi_kodu,

                                },
                                success: function (response) {
                                    console.log(response);
                                    document.getElementById("myTable").children[response].children[1].children[0].className = "aktif";
                                    durum = response;

                                }
                            });

                        }
                    });

                });
                console.log(liste_sayisi);




                // console.log(sonuc);


            }
        });



    } else {
        window.location = "../login.php";

    }
});