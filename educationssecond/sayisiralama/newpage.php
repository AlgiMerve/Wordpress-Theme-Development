<?php
include("../../db.php");

$educationname = "Sayıları Sıralama Egzersizi"; ?>

<?php include("../header.php"); ?>

<link rel="stylesheet" href="css/main.css">

<?php include("../nav.php"); ?>

<div id="main_menu">
    <?php include("../start.php"); ?>

    <div id="txt">
        <div data-bs-toggle="modal" data-bs-target="#exampleModal" id="finishToApp"><i class="fas fa-flag-checkered fa-3x position-fixed top-0 start-0 my-5 mx-4 detail"> </i></div>

        <div style="text-align: center;" class="container">
            <!-- Buraya tablo gelecek -->
            <div id="show" class="h4 my-5 fw-bold rounded-3 "></div>

        </div>

    </div>
</div>



<?php include("../../warning.php"); ?>

<?php include("../footer.php"); ?>
<script src="js/pageMain.js"></script>