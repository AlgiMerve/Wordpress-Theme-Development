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

    <div id="txt" class="container">
        <button id="newPage" style="width: 4rem; height: 4rem; margin-left: 180px;" class="btn btn-light rounded-circle position-fixed start-0 top-0 my-5 detail"><i class="fas fa-desktop fa-2x"></i></button>

        <button id="AppStart" style="width: 4rem; height: 4rem; margin-left: 180px;" class="btn btn-light rounded-circle position-fixed start-0 top-0 my-5 detail"><i class="fas fa-play fa-2x"></i></button>

        <div data-bs-toggle="modal" data-bs-target="#exampleModal" id="finishToApp"><i style="margin-left: 100px;" class="fas fa-flag-checkered fa-3x position-fixed top-0 start-0 my-5 detail"> </i></div>
        <div id="pause"><i class="fas fa-pause fa-3x position-fixed top-0 start-0 mx-4 my-5 detail"> </i></div>
        <div id="resume"><i class="fas fa-play fa-3x position-fixed top-0 start-0 mx-4 my-5 detail"> </i></div>

        <div style="width: 100%; margin-top: 100px;">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <table class="table table-light table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Ad Soyad</th>
                                    <th scope="col">Süre (sn.)</th>
                                    <th scope="col">Doğru Sayısı</th>
                                    <th scope="col">Yanlış Sayısı</th>
                                </tr>
                            </thead>
                            <tbody id="modal_body_table">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
        <div id="DualFinish" class="text-center">
            <button id="AppToEnd" type="button" class="btn btn-outline-light">Uygulamayı Tamamla</button>
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

<script src="js/page.js"></script>

<script src="js/main.js"></script>