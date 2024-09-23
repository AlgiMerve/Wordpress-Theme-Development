<?php
include("../../db.php");

$tablosor = $db->prepare("SELECT * FROM hizli_okuma_metinleri ORDER BY RAND() LIMIT 1");
$tablosor->execute();
$tablocek = $tablosor->fetch(PDO::FETCH_ASSOC);
$baslik = $tablocek['metin_baslik'];
$metin = $tablocek['metin_icerik'];

$educationname = "Odaklama Egzersizi"; ?>

<?php include("../header.php"); ?>

<link rel="stylesheet" href="css/main.css">

<?php include("../nav.php"); ?>


<input type="hidden" name="lblOkunanKelimeSayisi" id="lblOkunanKelimeSayisi" value="">


<div id="main_menu">
    <?php include("../start.php"); ?>

    <div id="txt" class="container ">
        <div id="mainTxt" class="txtmain container-fluid col-8 rounded my-3 ">
            <input type="hidden" id="gizli_metin" value="<?php echo $metin ?>">
            <p class="h5 my-3 text-center fw-bold"><?php echo $baslik ?> </p>
            <p id="content" class="h5 my-4 mx-3 lh-base"></p>
        </div>
    </div>
</div>



<?php include("../../warning.php"); ?>

<?php include("../footer.php"); ?>
<script src="js/pageMain.js"></script>