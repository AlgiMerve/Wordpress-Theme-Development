<?php
include("../../../db.php");

$tablosor = $db->prepare("SELECT * FROM hizli_okuma_metinleri ORDER BY RAND() LIMIT 1");
$tablosor->execute();
$tablocek = $tablosor->fetch(PDO::FETCH_ASSOC);

$basliklar = $tablocek['metin_baslik'];
$icerik = $tablocek['metin_icerik'];

$zaman = date('d.m.Y H:i:s');

$educationname = "Göz Çevikliğini Arttırma Egzersizi";

?>


<?php include("../header.php"); ?>

<link rel="stylesheet" href="css/main.css">

<?php include("../nav.php"); ?>


<input type="hidden" id="gizli_zaman" value="<?php echo $zaman; ?>">
<input type="hidden" id="gizli_okunan_kelime" value="">
<div id="main_menu">
    <?php include("../start.php"); ?>




    <div id="txt" class="container">
        <div id="pause"><i class="fas fa-pause fa-3x position-fixed top-0 start-0 mx-4 my-5 detail"> </i></div>
        <div id="resume"><i class="fas fa-play fa-3x position-fixed top-0 start-0 mx-4 my-5 detail"> </i></div>
        <div class="Article">
            <div class="txtmain my-3 position-absolute top-50 start-50 translate-middle text-center">
                <!-- <div class="h6">Okuma Hızı : <span id="okumaHizi"></span> kelime/dakika</div>

                <div class="progress bg-secondery my-2">
                    <div id="lblOkunanKelimeSayisi" class="progress-bar bg-primary mod-4" role="progressbar" style="width: 0px;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div> -->
                <label id="lblHiddenArticle"><?php echo $icerik ?></label>
                <label id="getWord" class="text-break fw-bold lh-base"></label>
            </div>
        </div>
    </div>

    <div id="timer" class="h2 position-absolute top-0 end-0 my-5 mx-4 bg-secondary fw-bold border border-secondary px-2 py-2"></div>

    <button id="feature" style="width: 3rem; height: 3rem;" class="btn btn-success rounded-circle position-fixed bottom-0 start-0 mx-4 my-4 detail" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom"><i class="fas fa-plus"></i></button>

    <!-- Aşağıdan açılır menü -->
    <div class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
        <div class="offcanvas-header ust_menu">
            <h5 class="offcanvas-title text-light" id="offcanvasBottomLabel">Özellikler</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body small ust_menu">
            <div>
                <div class="row">
                    <div class="col-md-4 text-light border border-secondary">
                        <label for="inpMovement" class="form-label">Hareket Şekli</label>
                        <div id="txtMovement" class="h5 text-light text-center">1</div>
                        <input id="inpMovement" type="range" class="form-range" value="1" min="1" max="4">
                    </div>
                    <div class="col-md-4 text-light border border-secondary">
                        <label for="customRange2" class="form-label">Hız Seviyesi</label>
                        <div id="txtSpeed" class="h5 text-light text-center">1000</div>
                        <input id="inpSpeed" type="range" class="form-range" value="1000" step="100" min="100" max="1000" id="customRange2">
                    </div>
                    <div class="col-md-4 text-light border border-secondary">
                        <label for="inpFontSize" class="form-label">Yazı Boyutu</label>
                        <div id="txtFontSize" class="h5 text-light text-center">20</div>
                        <input id="inpFontSize" type="range" class="form-range" value="20" step="2" min="16" max="40">
                    </div>

                </div>
            </div>

        </div>
    </div>
    <!-- Aşağıdan açılır menü -->

</div>








<?php include("../../warning.php"); ?>

<?php include("../footer.php"); ?>

<script src="js/main.js"></script>