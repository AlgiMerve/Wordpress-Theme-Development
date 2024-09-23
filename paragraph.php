<?php include("header.php");
include("nav.php"); ?>

<link rel="stylesheet" href="css/card.css">

<div id="main_menu" class="container ">

    <div class="mx-5">
        <span class="text-center mt-5 exercise_text">Paragraf Çalışmaları</span>
    </div>
    <div class="text-center">
        <span class="exercise_text_sc mx-5">Burada, paragraf çalışmasının önemini kavramanızı sağlayacak egzersizler var. Bu egzersizler ile okuma becerilerinizi geliştirip, düşüncelerinizi daha etkili ifade edebilirsiniz.</span>
    </div>

    <div class="row d-flex justify-content-center">
        <div class="card card0 col-md-4 m-4">
            <button style="background: transparent; border: 0;" data-bs-toggle="offcanvas" data-bs-target="#hizimiolc" aria-controls="offcanvasRight">
                <div class="border">
                    <h2>Çalışma Planım</h2>
                </div>
            </button>
        </div>

        <div class="card card1 col-md-4 m-4">
            <button style="background: transparent; border: 0;" data-bs-toggle="offcanvas" data-bs-target="#gozunucalistir" aria-controls="offcanvasRight">
                <div class="border">
                    <h2>Paragrafı İnşa Edelim</h2>
                </div>
            </button>
        </div>

        <div class="card card2 col-md-4 m-4">
            <button style="background: transparent; border: 0;" data-bs-toggle="offcanvas" data-bs-target="#beyinkaslarinicalistir" aria-controls="offcanvasRight">
                <div class="border">
                    <h2>Anlamın Şifreleri</h2>
                </div>
            </button>
        </div>


        <div class="card card3 col-md-4 m-4">
            <button style="background: transparent; border: 0;" data-bs-toggle="offcanvas" data-bs-target="#hizligor" aria-controls="offcanvasRight">
                <div class="border">
                    <h2>Yapı Dedektifliği</h2>
                </div>
            </button>
        </div>

        <div class="card card4 col-md-4 m-4">
            <button style="background: transparent; border: 0;" data-bs-toggle="offcanvas" data-bs-target="#hizlioku" aria-controls="offcanvasRight">
                <div class="border">
                    <h2>Soru Çözüm İpuçları</h2>
                </div>
            </button>
        </div>
    </div>
</div>

<!--Sol Menü Eğitim Seçimi Ksısımları-->

<?php
include("leftMenu2/leftmenu2.php");
?>

<!--Sol Menü Eğitim Seçimi Ksısımları-->

<?php include("warning.php"); ?>

<?php include("footer.php"); ?>