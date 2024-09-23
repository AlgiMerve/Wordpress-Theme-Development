<?php
include("../../db.php");

$tablosor = $db->prepare("SELECT * FROM hizli_okuma_metinleri ORDER BY RAND() LIMIT 1");
$tablosor->execute();
$tablocek = $tablosor->fetch(PDO::FETCH_ASSOC);

$basliklar = $tablocek['metin_baslik'];
$icerik = $tablocek['metin_icerik'];

$educationname = "Göz Çevikliğini Arttırma Egzersizi"; ?>

<?php include("../header.php"); ?>

<link rel="stylesheet" href="css/main.css">

<?php include("../nav.php"); ?>

<input type="hidden" id="gizli_okunan_kelime" value="">
<div id="main_menu">
    <?php include("../start.php"); ?>
    <div id="txt" class="container">
        <div class="Article">
            <div class="txtmain my-3 position-absolute top-50 start-50 translate-middle text-center">
                <label id="lblHiddenArticle"><?php echo $icerik ?></label>
                <label id="getWord" class="text-break fw-bold lh-base"></label>
            </div>
        </div>
    </div>
</div>



<?php include("../../warning.php"); ?>

<?php include("../footer.php"); ?>
<script src="js/pageMain.js"></script>