<?php
include("../../db.php");

$zaman = date('d.m.Y H:i:s');

$educationname = "Çevre Fokus Egzersizi";

?>

<?php include("../header.php"); ?>

<link rel="stylesheet" href="css/main.css">

<?php include("../nav.php"); ?>


<input type="hidden" id="gizli_zaman" value="<?php echo $zaman; ?>">
<div id="main_menu">

    <?php include("select.php"); ?>

    <div id="txt" class="container text-center">
        <button id="newPage" style="width: 4rem; height: 4rem; margin-left: 180px;" class="btn btn-light rounded-circle position-fixed start-0 top-0 my-5 detail"><i class="fas fa-desktop fa-2x"></i></button>

        <button id="AppStart" style="width: 4rem; height: 4rem; margin-left: 180px;" class="btn btn-light rounded-circle position-fixed start-0 top-0 my-5 detail"><i class="fas fa-play fa-2x"></i></button>

        <div data-bs-toggle="modal" data-bs-target="#exampleModal" id="finishToApp"><i style="margin-left: 100px;" class="fas fa-flag-checkered fa-3x position-fixed top-0 start-0 my-5 detail"> </i></div>

        <div id="pause"><i class="fas fa-pause fa-3x position-fixed top-0 start-0 mx-4 my-5 detail"> </i></div>

        <div id="resume"><i class="fas fa-play fa-3x position-fixed top-0 start-0 mx-4 my-5 detail"> </i></div>

        <div class="Article row position-absolute top-50 start-50 translate-middle text-center">
            <div class="txtmain col-12 my-2 text-center ">
                <label id="getWordMain" class="text-break fw-bold lh-base "></label>

            </div>
            <div class="col-12 txtChild my-2">
                <div class="input-group my-3 text-center">
                    <i  id="button_true" style="background-color: white; color: #198754;" class="rounded-circle fas fa-check-circle fa-3x mx-4 "></i>

                    <i id="button_false" style="background-color: white; color: #dc3545;"  class="rounded-circle fas fa-times-circle fa-3x mx-4 "></i>

                    <i id="button_addon" style="background-color: white; color: #4da1fe;" class="rounded-circle fas fa-chevron-circle-right fa-3x mx-4 "></i>
                    
                    <div id="lblDogruSayisiSkor" class="h4 col-1 bg-success mx-4 my-1 fw-bold rounded text-center">0</div>
                    <div id="lblYanlisSayisiSkor" class="h4 col-1 bg-danger mx-4 my-1 fw-bold rounded text-center">0</div>
                </div>

            </div>

        </div>
    </div>

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

<script src="js/page.js"></script>

<script src="js/main.js"></script>