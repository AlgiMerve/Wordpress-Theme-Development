<?php
include("../../db.php");

$tablosor = $db->prepare("SELECT * FROM hizli_okuma_metinleri ORDER BY RAND() LIMIT 1");
$tablosor->execute();
$tablocek = $tablosor->fetch(PDO::FETCH_ASSOC);

$basliklar = $tablocek['metin_baslik'];
$icerik = $tablocek['metin_icerik'];

$educationname = "Hızlı Görme Egzersizi"; ?>

<?php include("../header.php"); ?>

<link rel="stylesheet" href="css/main.css">

<?php include("../nav.php"); ?>

<div id="main_menu">
    <?php include("../start.php"); ?>

    <div id="txt" class="container ">
        <div class="Article">
            <div class="txtmain my-3 position-absolute top-50 start-50 translate-middle text-center">
                <div class="h6">Okuma Hızı : <span id="okumaHizi"></span> kelime/dakika</div>

                <div class="progress bg-secondery my-2">
                    <div id="lblOkunanKelimeSayisi" class="progress-bar bg-primary mod-4" role="progressbar" style="width: 0px;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <label id="lblHiddenArticle"><?php echo $icerik ?></label>
                <label id="getWord" class="position-absolute top-50 start-50 translate-middle text-break fw-bold lh-base"></label>
            </div>
        </div>
    </div>
</div>



<?php include("../../warning.php"); ?>

<?php include("../footer.php"); ?>
<script src="js/pageMain.js"></script>