var bayi_kodu;
var kategori;
var ad_soyad;
window.addEventListener("DOMContentLoaded", function () {
    swal({
        title: "Sonuçlar",
        text: "Tamamlanmış uygulamaların detaylı sonuçlarını ve gelişimlerini takip edebilmek için sonuçları kontrol ediniz.",
        icon: 'info',
        button: "Tamam",
    })
        .then((value) => {
            document.getElementById("anaDv").style.display = "block";
            var bilgiler = JSON.parse(localStorage.getItem('client'));
            bayi_kodu = Number(bilgiler.CLIENT);
            console.log(bilgiler);


        });
});

document.getElementById("anasayfa").addEventListener("click", function () {
    window.location = "../index.php";
});

document.getElementById("testkategori").addEventListener("change", function (e) {

    document.getElementById("ogrkategori").removeAttribute("disabled");
    kategori = document.getElementById("testkategori").value;
    $.ajax({
        type: "POST",
        url: "ajax/ajax_ogr_getir.php",
        data: {
            tablo: kategori,
            bayi_kod: bayi_kodu
        },
        success: function (sonuc) {
            var dizi = sonuc.split("_*_");
            for (let i = 0; i < dizi.length - 1; i++) {
                var opt = `<option class="ogr_delete_id">${dizi[i]}</option>`;
                document.getElementById("ogrkategori").innerHTML += opt;
            }

        }
    });
    $(".ogr_delete_id").remove();

});

document.getElementById("ogrkategori").addEventListener("change", function (e) {

    document.getElementById("goster").removeAttribute("disabled");
    ad_soyad = document.getElementById("ogrkategori").value;

});

document.getElementById("goster").addEventListener("click", function () {
    sure_dizisi = [];
    zaman_dizisi = [];
    kelime_sayisi_dizisi = [];
    okuma_dizisi = [];
    dogru_sayisi_dizisi = [];
    yanlis_sayisi_dizisi = [];
    isaret_sayisi = [];
    $(".grafikler").remove();
    document.getElementById("zemin").style.display = "block";
    console.log(kategori);
    console.log(ad_soyad);
    console.log(bayi_kodu);
    document.getElementById("tbl_ad").textContent = ad_soyad;
    if (kategori == "hizli_okuma_metinleri_sonuc" || kategori == "hizli_okuma_blog_sonuc" || kategori == "hizli_okuma_goz_cevikligi_sonuc") {
        okuma_hizi_testi();
    }
    else if (kategori == "hizli_okuma_metinleri_soru_cevap") {
        anlama_hizi_testi();
    }
    else if (kategori == "hizli_okuma_kelimeler_sonuc") {
        takistoskop_hizi_testi();
    }
    else if (kategori == "hizli_okuma_metin_takip_sonuc") {
        metin_egzersizleri();
    }
    else if (kategori == "hizli_okuma_gozegz_sonuc" || kategori == "hizli_okuma_gorme_alani_sonuc" || kategori == "hizli_okuma_satir_uzunlugu_sonuc") {
        goz_egzersizleri();
    }
    else if (kategori == "hizli_okuma_sayi_sonuc") {
        sayi_bulma();

    }
    else if (kategori == "hizli_okuma_dogru_rengi_bul_sonuc" || kategori == "hizli_okuma_dogru_sayiyi_bul_sonuc") {
        renk_sayi();
    }

});

document.getElementById("yazdir").addEventListener("click", function () {
    document.getElementById("anasayfa").style.display = "none";
    document.getElementById("yazdir").style.display = "none";
    document.getElementById("ogr_secim_uygulama").style.display = "none";
    window.print();
    document.getElementById("ogr_secim_uygulama").style.display = "block";
    document.getElementById("anasayfa").style.display = "block";
    document.getElementById("yazdir").style.display = "block";
});


Math.rastgele = function (alt, ust) {

    let sayi = Math.random();
    sayi = sayi * (ust - alt);
    sayi = Math.floor(sayi) + alt;

    return sayi;
}

var sure_dizisi = [];
var kelime_sayisi_dizisi = [];
var zaman_dizisi = [];
var okuma_dizisi = [];
var dogru_sayisi_dizisi = [];
var yanlis_sayisi_dizisi = [];
var isaret_sayisi = [];

function okuma_hizi_testi() {
    $.ajax({
        type: "POST",
        url: "ajax/ajax_" + kategori + ".php",
        data: {
            ad: ad_soyad,
            tablo: kategori,
            bayi_kod: bayi_kodu
        },
        success: function (sonuc) {

            console.log(sonuc);
            var dizi = sonuc.split("_*_");
            for (let i = 0; i < dizi.length - 1; i += 4) {
                sure_dizisi.push(dizi[i]);
                kelime_sayisi_dizisi.push(dizi[i + 1]);
                okuma_dizisi.push(dizi[i + 2]);
                zaman_dizisi.push(dizi[i + 3]);

            }

            grafik("grafik_1", "okuma_hizi", "Zaman-Saat/Okuma Hızı", zaman_dizisi, okuma_dizisi);
            grafik("grafik_2", "sure_kelime", "Kelime/Süre", kelime_sayisi_dizisi, sure_dizisi);

        }
    });
}



function anlama_hizi_testi() {
    $.ajax({
        type: "POST",
        url: "ajax/ajax_" + kategori + ".php",
        data: {
            ad: ad_soyad,
            tablo: kategori,
            bayi_kod: bayi_kodu
        },
        success: function (sonuc) {

            console.log(sonuc);
            var dizi = sonuc.split("_*_");
            for (let i = 0; i < dizi.length - 1; i += 5) {
                sure_dizisi.push(dizi[i]);
                kelime_sayisi_dizisi.push(dizi[i + 1]);
                okuma_dizisi.push(dizi[i + 2]);
                dogru_sayisi_dizisi.push(dizi[i + 3]);
                zaman_dizisi.push(dizi[i + 4]);

            }

            grafik("grafik_1", "okuma_hizi", "Zaman-Saat/Okuma Hızı", zaman_dizisi, okuma_dizisi);
            grafik("grafik_2", "sure_kelime", "Kelime/Süre", kelime_sayisi_dizisi, sure_dizisi);
            grafik("grafik_3", "hiz_dogru", "Okuma Hızı/Doğru Sayısı", dogru_sayisi_dizisi, okuma_dizisi);

        }
    });
}


function takistoskop_hizi_testi() {
    $.ajax({
        type: "POST",
        url: "ajax/ajax_" + kategori + ".php",
        data: {
            ad: ad_soyad,
            tablo: kategori,
            bayi_kod: bayi_kodu
        },
        success: function (sonuc) {

            console.log(sonuc);
            var dizi = sonuc.split("_*_");
            for (let i = 0; i < dizi.length - 1; i += 4) {
                sure_dizisi.push(dizi[i]);
                dogru_sayisi_dizisi.push(dizi[i + 1]);
                yanlis_sayisi_dizisi.push(dizi[i + 2]);
                zaman_dizisi.push(dizi[i + 3]);

            }

            grafik_2("grafik_1", "takistoskop", "Süre/Doğru/Yanlış", sure_dizisi, dogru_sayisi_dizisi, yanlis_sayisi_dizisi);
            grafik("grafik_2", "zaman_sure", "Zaman/Süre", zaman_dizisi, sure_dizisi);


        }
    });
}

function metin_egzersizleri() {
    $.ajax({
        type: "POST",
        url: "ajax/ajax_" + kategori + ".php",
        data: {
            ad: ad_soyad,
            tablo: kategori,
            bayi_kod: bayi_kodu
        },
        success: function (sonuc) {

            console.log(sonuc);
            var dizi = sonuc.split("_*_");
            for (let i = 0; i < dizi.length - 1; i += 3) {
                sure_dizisi.push(dizi[i]);
                kelime_sayisi_dizisi.push(dizi[i + 1]);
                zaman_dizisi.push(dizi[i + 2]);

            }

            grafik("grafik_2", "zaman_kelime_sayisi", "Zaman/Okunan Kelime Sayısı", zaman_dizisi, kelime_sayisi_dizisi);
            grafik("grafik_1", "sure_okunan_kelime", "Süre/Okunan Kelime Sayısı", sure_dizisi, kelime_sayisi_dizisi);



        }
    });
}


function goz_egzersizleri() {
    $.ajax({
        type: "POST",
        url: "ajax/ajax_" + kategori + ".php",
        data: {
            ad: ad_soyad,
            tablo: kategori,
            bayi_kod: bayi_kodu
        },
        success: function (sonuc) {

            console.log(sonuc);
            var dizi = sonuc.split("_*_");
            for (let i = 0; i < dizi.length - 1; i += 2) {
                sure_dizisi.push(dizi[i]);
                zaman_dizisi.push(dizi[i + 1]);

            }

            grafik("grafik_1", "sure_zaman", "Zaman/Süre ", zaman_dizisi, sure_dizisi);




        }
    });
}

function sayi_bulma() {
    $.ajax({
        type: "POST",
        url: "ajax/ajax_" + kategori + ".php",
        data: {
            ad: ad_soyad,
            tablo: kategori,
            bayi_kod: bayi_kodu
        },
        success: function (sonuc) {

            console.log(sonuc);
            var dizi = sonuc.split("_*_");
            for (let i = 0; i < dizi.length - 1; i += 3) {
                sure_dizisi.push(dizi[i]);
                isaret_sayisi.push(dizi[i + 1]);
                zaman_dizisi.push(dizi[i + 2]);

            }

            grafik_2("grafik_1", "sure_isaret_zaman", "Süre/İşaretleme Sayısı/Zaman ", zaman_dizisi, sure_dizisi, isaret_sayisi);




        }
    });
}

function renk_sayi() {
    $.ajax({
        type: "POST",
        url: "ajax/ajax_" + kategori + ".php",
        data: {
            ad: ad_soyad,
            tablo: kategori,
            bayi_kod: bayi_kodu
        },
        success: function (sonuc) {

            console.log(sonuc);
            var dizi = sonuc.split("_*_");
            for (let i = 0; i < dizi.length - 1; i += 3) {
                dogru_sayisi_dizisi.push(dizi[i]);
                yanlis_sayisi_dizisi.push(dizi[i + 1]);
                zaman_dizisi.push(dizi[i + 2]);

            }

            grafik_2("grafik_1", "dogru_yanlis", "Doğru Yanlış Sayısı ", zaman_dizisi, dogru_sayisi_dizisi, yanlis_sayisi_dizisi);




        }
    });
}



function grafik(id_tbl, name, information, array_one, array_two) {
    var div = document.createElement("div");
    div.id = id_tbl;
    div.style.textAlign = "center";
    div.style.marginTop = "100px";
    div.style.marginBottom = "80px";
    div.style.width = "650px";
    div.style.height = "400px";
    div.setAttribute("class", "grafikler");
    document.getElementById("zemin").appendChild(div);
    var cnvs = document.createElement("canvas");
    cnvs.id = name;
    document.getElementById(id_tbl).appendChild(cnvs);
    var ctx = document.getElementById(name).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: information,
                data: [],
                backgroundColor: [
                ],
                borderColor: [
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

    });

    for (let i = 0; i < array_one.length; i++) {
        myChart.data.labels[i] = array_one[i];
        myChart.update();
    }

    for (let x = 0; x < array_two.length; x++) {
        myChart.data.datasets[0].data[x] = array_two[x];

        var bir = Math.rastgele(0, 256);
        var iki = Math.rastgele(0, 256);
        var uc = Math.rastgele(0, 256);

        myChart.data.datasets[0].backgroundColor[x] = "rgba(" + bir + "," + iki + "," + uc + ",0.2)";
        myChart.data.datasets[0].borderColor[x] = "rgba(" + bir + "," + iki + "," + uc + ",0.2)";

        myChart.update();
    }

}


function grafik_2(id_tbl, name, information, array_one, array_two, array_three) {
    var div = document.createElement("div");
    div.id = id_tbl;
    div.style.textAlign = "center";
    div.style.marginTop = "100px";
    div.style.marginBottom = "80px";
    div.style.width = "650px";
    div.style.height = "400px";
    div.setAttribute("class", "grafikler");
    document.getElementById("zemin").appendChild(div);
    var cnvs = document.createElement("canvas");
    cnvs.id = name;
    document.getElementById(id_tbl).appendChild(cnvs);
    var ctx = document.getElementById(name).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: information,
                data: [],
                backgroundColor: [
                ],
                borderColor: [
                ],
                borderWidth: 2
            },
            {
                label: information,
                data: [],
                backgroundColor: [
                ],
                borderColor: [
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

    });

    for (let i = 0; i < array_one.length; i++) {
        myChart.data.labels[i] = array_one[i];
        myChart.update();
    }

    for (let x = 0; x < array_two.length; x++) {
        myChart.data.datasets[0].data[x] = array_two[x];
        myChart.data.datasets[1].data[x] = array_three[x];
        var bir = Math.rastgele(0, 256);
        var iki = Math.rastgele(0, 256);
        var uc = Math.rastgele(0, 256);

        myChart.data.datasets[0].backgroundColor[x] = "rgba(" + bir + "," + iki + "," + uc + ",0.2)";
        myChart.data.datasets[0].borderColor[x] = "rgba(" + bir + "," + iki + "," + uc + ",0.2)";

        var birx = Math.rastgele(0, 256);
        var ikix = Math.rastgele(0, 256);
        var ucx = Math.rastgele(0, 256);

        myChart.data.datasets[1].backgroundColor[x] = "rgba(" + birx + "," + ikix + "," + ucx + ",0.2)";
        myChart.data.datasets[1].borderColor[x] = "rgba(" + birx + "," + ikix + "," + ucx + ",0.2)";

        myChart.update();
    }

}

