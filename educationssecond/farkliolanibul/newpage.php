<?php
include("../../db.php");

$educationname = "Farklı Olanı Bulma Egzersizi"; ?>

<?php include("../header.php"); ?>

<link rel="stylesheet" href="css/main.css">

<?php include("../nav.php"); ?>

<div id="main_menu">
    <?php include("../start.php"); ?>

    <div id="txt" class="container text-center">
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
</div>


<?php include("../../warning.php"); ?>

<?php include("../footer.php"); ?>
<script src="js/pageMain.js"></script>