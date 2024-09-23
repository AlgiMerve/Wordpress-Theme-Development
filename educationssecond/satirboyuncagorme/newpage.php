<?php
include("../../db.php");

$educationname = "Satır Boyunca Görme Egzersizi"; ?>

<?php include("../header.php"); ?>

<link rel="stylesheet" href="css/main.css">

<?php include("../nav.php"); ?>




<div id="main_menu">
    <?php include("../start.php"); ?>

    <div id="txt" class="container">
        <div class="txtmain my-3 position-absolute top-50 start-50 translate-middle ">
            <div id="box_1" class="col-6 h-100">
                <span id="word_1" class="fw-bold wrd"></span>
            </div>
            <div id="box_2" class="col-6 h-100">
                <span id="word_2" class="fw-bold wrd"></span>
            </div>
        </div>
    </div>
</div>



<?php include("../../warning.php"); ?>

<?php include("../footer.php"); ?>
<script src="js/pageMain.js"></script>