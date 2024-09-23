<?php include("header.php");
include("nav.php"); ?>

<link rel="stylesheet" href="css/card.css">

<div id="main_menu" class="container ">

    <div class="mx-5">
        <span class="text-center mt-5 exercise_text">Egzersizler</span>
    </div>
    <div class="text-center">
        <span class="exercise_text_sc mx-5">Burada, kullanıcılarının eksiklerini gidermesini sağlayacak egzersizler var. Bu egzersizler ile kullanıcılar performanslarını arttırabilirler.</span>
    </div>

    <div class="row d-flex justify-content-center">
        <div class="card card0 col-md-4 m-4">
            <button style="background: transparent; border: 0;" data-bs-toggle="offcanvas" data-bs-target="#hizimiolc" aria-controls="offcanvasRight">
                <div class="border">
                    <h2>Hızımı Ölç</h2>
                </div>
            </button>
        </div>

        <div class="card card1 col-md-4 m-4">
            <button style="background: transparent; border: 0;" data-bs-toggle="offcanvas" data-bs-target="#gozunucalistir" aria-controls="offcanvasRight">
                <div class="border">
                    <h2>Gözünü Çalıştır</h2>
                </div>
            </button>
        </div>

        <div class="card card2 col-md-4 m-4">
            <button style="background: transparent; border: 0;" data-bs-toggle="offcanvas" data-bs-target="#beyinkaslarinicalistir" aria-controls="offcanvasRight">
                <div class="border">
                    <h2>Beyin Kaslarını Çalıştır</h2>
                </div>
            </button>
        </div>


        <div class="card card3 col-md-4 m-4">
            <button style="background: transparent; border: 0;" data-bs-toggle="offcanvas" data-bs-target="#hizligor" aria-controls="offcanvasRight">
                <div class="border">
                    <h2>Hızlı Gör</h2>
                </div>
            </button>
        </div>

        <div class="card card4 col-md-4 m-4">
            <button style="background: transparent; border: 0;" data-bs-toggle="offcanvas" data-bs-target="#hizlioku" aria-controls="offcanvasRight">
                <div class="border">
                    <h2>Hızlı Oku</h2>
                </div>
            </button>
        </div>

        <div class="card card5 col-md-4 m-4">
            <button style="background: transparent; border: 0;" data-bs-toggle="offcanvas" data-bs-target="#hizliodaklan" aria-controls="offcanvasRight">
                <div class="border">
                    <h2>Hızlı Odaklan</h2>
                </div>
            </button>
        </div>

    </div>
</div>

<!--Sol Menü Eğitim Seçimi Ksısımları-->

<?php
include("leftMenu/leftmenu.php");
?>

<!--Sol Menü Eğitim Seçimi Ksısımları-->

<?php include("warning.php"); ?>

<?php include("footer.php"); ?>