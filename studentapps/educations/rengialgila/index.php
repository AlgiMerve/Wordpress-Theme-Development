<?php
include("../../../db.php");
$zaman = date('d.m.Y H:i:s');

$educationname = "Renkleri Algılama Egzersizi";

?>


<?php include("../header.php"); ?>

<link rel="stylesheet" href="css/main.css">

<?php include("../nav.php"); ?>


<input type="hidden" id="gizli_zaman" value="<?php echo $zaman; ?>">
<div id="main_menu">
    <?php include("../start.php"); ?>




    <div id="txt" class="container text-center">
        <div id="pause"><i class="fas fa-pause fa-3x position-fixed top-0 start-0 mx-4 my-5 detail"> </i></div>
        <div id="resume"><i class="fas fa-play fa-3x position-fixed top-0 start-0 mx-4 my-5 detail"> </i></div>
        <div class="Article row position-absolute top-50 start-50 translate-middle text-center">

            <div class="txtmain col-12 my-2 text-center ">
                <label id="yazi" class="fw-bold display-2"></label>
            </div>

            <div class="col-12 txtChild my-2">
                <div class="input-group my-1 ">
                    <i id="btntrue" style="background-color: white; color: green;" class="rounded-circle far fa-check-circle fa-4x mx-4 "></i>
                    <i id="btnfalse" style="background-color: white; color: red;" class="rounded-circle far fa-times-circle fa-4x mx-4 "></i>
                    <div class="col-4">
                        <div class="h5 fw-bold text-light">Süre</div>
                        <div id="lblSureBox" class="h5 fw-bold text-light">0 : 0</div>
                    </div>
                    <div class="col-1 my-1"><img id="imgControl" src="images/true.png"></div>
                    <div id="lblDogruSayisiSkor" class="h3 col-1 bg-success mx-2 my-1 fw-bold rounded text-center">0</div>
                    <div id="lblYanlisSayisiSkor" class="h3 col-1 bg-danger mx-2 my-1 fw-bold rounded text-center">0</div>
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
                    <div class="col-md-6 text-light border border-secondary">
                        <label for="customRange2" class="form-label">Hız Seviyesi</label>
                        <div id="txtSpeed" class="h5 text-light text-center">5</div>
                        <input id="inpSpeed" type="range" class="form-range" value="5" step="1" min="5" max="15" id="customRange2">
                    </div>
                    <div class="col-md-6 text-light border border-secondary">
                        <label for="inpFontSize" class="form-label">Yazı Boyutu</label>
                        <div id="txtFontSize" class="h5 text-light text-center">70</div>
                        <input id="inpFontSize" type="range" class="form-range" value="70" step="2" min="52" max="150">
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