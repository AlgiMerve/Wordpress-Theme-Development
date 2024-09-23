<?php
include("../../db.php");
$zaman = date('d.m.Y H:i:s');
$educationname = "Sayıları Sıralama Egzersizi";
?>
<!DOCTYPE html>
<html>

<?php include("../header.php"); ?>

<link rel="stylesheet" href="css/main.css">

<?php include("../nav.php"); ?>

<input type="hidden" id="gizli_zaman" value="<?php echo $zaman; ?>">

<div id="main_menu">
    <?php include("select.php"); ?>
    <?php include("../start.php"); ?>
    <div id="txt">
        <div data-bs-toggle="modal" data-bs-target="#exampleModal" id="finishToApp"><i class="fas fa-flag-checkered fa-3x position-fixed top-0 start-0 my-5 mx-4 detail"> </i></div>

        <div style="text-align: center;" class="container">
            <!-- Buraya tablo gelecek -->
            <div id="show" class="h4 my-5 fw-bold rounded-3 "></div>

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
                    <label for="inpMovement" class="form-label">Sayı Aralığı</label>
                    <div id="txtMovement" class="h5 text-light text-center">1</div>
                    <input id="inpMovement" type="range" class="form-range" value="1" step="1" min="1" max="3">
                </div>
                <div class="col-md-4 text-light border border-secondary">
                    <label for="inpFontSize" class="form-label">Yazı Boyutu</label>
                    <div id="txtFontSize" class="h5 text-light text-center">24</div>
                    <input id="inpFontSize" type="range" class="form-range" value="24" step="2" min="20" max="52">
                </div>

            </div>
        </div>

    </div>
</div>
<!-- Aşağıdan açılır menü -->


<?php include("../../warning.php"); ?>

<?php include("../footer.php"); ?>
<script src="js/main.js"></script>