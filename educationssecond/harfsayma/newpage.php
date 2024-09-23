<?php
include("../../db.php");

$educationname = "Harf ve Rakam Sayma Egzersizi"; ?>

<?php include("../header.php"); ?>

<link rel="stylesheet" href="css/main.css">

<?php include("../nav.php"); ?>

<div id="main_menu">
    <?php include("../start.php"); ?>

    <div id="txt" class="container text-center">
        <div class="Article row position-absolute top-50 start-50 translate-middle text-center">

            <div class="newtxtmain col-12 my-2 text-center">
                <div id="transition">
                    <div class="h2 text-center position-absolute top-50 start-50 translate-middle">Kaç adet <span id="ana_kelime_kendisi"></span> bulunmaktadır?</div>
                    <div id="transitionTimer" class="display-1 my-2 fw-bold "></div>
                </div>
                <div style="text-align: center;" id="yerlesen_kelimeler"></div>
            </div>
        </div>
    </div>
</div>


<?php include("../../warning.php"); ?>

<?php include("../footer.php"); ?>
<script src="js/pageMain.js"></script>