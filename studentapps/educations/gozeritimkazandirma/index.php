<?php
include("../../../db.php");
$zaman = date('d.m.Y H:i:s');

$educationname = "Göze Ritim Kazandırma Egzersizi"; ?>

<?php include("../header.php"); ?>

<link rel="stylesheet" href="css/main.css">

<?php include("../nav.php"); ?>



<input type="hidden" id="gizli_zaman" value="<?php echo $zaman; ?>">



<div id="main_menu">
    <?php include("../start.php"); ?>

    <div id="txt" class="container ">
        <div id="pause"><i class="fas fa-pause fa-3x position-fixed top-0 start-0 mx-4 my-5 detail"> </i></div>
        <div id="resume"><i class="fas fa-play fa-3x position-fixed top-0 start-0 mx-4 my-5 detail"> </i></div>
        <div class="txtmain container-fluid col-8 rounded my-3 ">
            <p id="baslik" class="h5 my-3 text-center fw-bold"></p>
            <div class="container">
                <div id="icerik" class="row">
                    
                   
                   
                </div>
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
                        <label for="inpSpeed" class="form-label">Hız Seviyesi</label>
                        <div id="txtSpeed" class="h5 text-light text-center">1000</div>
                        <input id="inpSpeed" type="range" class="form-range" value="1000" step="100" min="100" max="1000">
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