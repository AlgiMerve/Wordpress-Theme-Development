<?php
include("../../db.php");
$zaman = date('d.m.Y H:i:s');

$educationname = "Farklı Olanı Bulma Egzersizi";

?>


<?php include("../header.php"); ?>

<link rel="stylesheet" href="css/main.css">

<?php include("../nav.php"); ?>


<input type="hidden" id="gizli_zaman" value="<?php echo $zaman; ?>">
<div id="main_menu">
    <?php include("select.php"); ?>
    <?php include("../start.php"); ?>




    <div id="txt" class="container text-center">
        <div data-bs-toggle="modal" data-bs-target="#exampleModal" id="finishToApp"><i style="margin-left: 100px;" class="fas fa-flag-checkered fa-3x position-fixed top-0 start-0 my-5 detail"> </i></div>

        <div id="pause"><i class="fas fa-pause fa-3x position-fixed top-0 start-0 mx-4 my-5 detail"> </i></div>
        <div id="resume"><i class="fas fa-play fa-3x position-fixed top-0 start-0 mx-4 my-5 detail"> </i></div>
        <div class="Article row position-absolute top-50 start-50 translate-middle text-center">

            <div class="txtmain my-2 text-center ">
                <div id="transition">
                    <div class="h2 text-center position-absolute top-50 start-50 translate-middle">Dizimi bozan karakterleri işaretleyiniz.</div>
                    <div id="transitionTimer" class="display-1 my-2 fw-bold "></div>
                </div>

                <div class="container">

                    <div class="row ">

                        <table class="table table-borderless d-flex justify-content-center">
                            <tbody id="yerlesen_kelimeler">

                            </tbody>
                        </table>

                    </div>

                </div>


            </div>

            <div class="col-12 txtChild my-2">
                <div class="input-group my-2 text-center">
                    <div class="col-6 mx-3">
                        <div class="h5 fw-bold text-light ">Süre</div>
                        <div id="lblSureBox" class="h5 fw-bold text-light">0 : 0</div>
                    </div>
                    <div id="lblDogruSayisiSkor" class="h3 col-2 bg-success mx-2 my-1 fw-bold rounded text-center">0</div>
                    <div id="lblYanlisSayisiSkor" class="h3 col-2 bg-danger mx-2 my-1 fw-bold rounded text-center">0</div>
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
                        <label for="inpMovemnet" class="form-label">Zorluk Seviyesi</label>
                        <div id="txtMovemnet" class="h5 text-light text-center">1</div>
                        <input id="inpMovemnet" type="range" class="form-range" value="1" step="1" min="1" max="3">
                    </div>
                    <div class="col-md-4 text-light border border-secondary">
                        <label for="inpSpeed" class="form-label">Hız Seviyesi</label>
                        <div id="txtSpeed" class="h5 text-light text-center">15</div>
                        <input id="inpSpeed" type="range" class="form-range" value="15" step="1" min="5" max="15">
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