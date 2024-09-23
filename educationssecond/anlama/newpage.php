<?php
include("../../db.php");

$tablosor = $db->prepare("SELECT * FROM hizli_okuma_metinleri WHERE metin_kategori='Hikayeler' ORDER BY RAND() LIMIT 1");
$tablosor->execute();
$tablocek = $tablosor->fetch(PDO::FETCH_ASSOC);
$baslik = $tablocek['metin_baslik'];
$metin = $tablocek['metin_icerik'];

$educationname = "Okuma ve Anlama Testi"; ?>

<?php include("../header.php"); ?>

<link rel="stylesheet" href="css/main.css">

<?php include("../nav.php"); ?>


<input type="hidden" name="lblOkunanKelimeSayisi" id="lblOkunanKelimeSayisi" value="">


<div id="main_menu">
    <?php include("../start.php"); ?>

    <div id="txt" class="container">
        <div class="row">
            <div id="mainTxt" class="txtmain container-fluid col-8 rounded my-3 ">
                <p id="titlecontent" class="h5 my-3 text-center fw-bold"><?php echo $baslik ?> </p>
                <p id="content" class="h5 my-4 mx-3"><?php echo $metin ?></p>
                <br>
                <div class="text-end">
                    <i id="completetheexercise" style="color: #4da1fe;" class="fas fa-check-circle fa-3x" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i></p>
                </div>
            </div>
        </div>
    </div>
    <?php include("questions.php"); ?>

    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header text-center">
                    <h5 class="modal-title" id="staticBackdropLabel">SONUÇLAR</h5>
                </div>
                <div class="modal-body">
                    <div class="my-2">Okuma Hızı : <span id="readspead"></span> kelime/dakika</div>
                    <div class="my-2">Geçen Süre : <span id="nexttime"></span> saniye</div>
                    <div class="my-2">Metni anlayarak okuduğundan eminsen, metinle ilgili sorulara geçebilirsin.</div>
                    <div class="my-2">Anlama düzeyin %60'ın altında kalırsa bu çalışmayı yeni bir metinle tekrar etmen gerekecektir.</div>
                </div>
                <div class="modal-footer">
                    <button id="resume" type="button" class="btn btn-secondary" data-bs-dismiss="modal">METNE DÖN</button>
                    <button id="nextquestion" type="button" class="btn btn-primary" data-bs-dismiss="modal">SORULARA GEÇ</button>
                </div>
            </div>
        </div>
    </div>
</div>



<?php include("../../warning.php"); ?>

<?php include("../footer.php"); ?>
<script src="js/pageMain.js"></script>