<?php
include("../../../db.php");
//Veri tabanı bağlantı ve verilerin çekilmesi

$tablosor = $db->prepare("SELECT * FROM hizli_okuma_metinleri ORDER BY RAND() LIMIT 1");
$tablosor->execute();
$tablocek = $tablosor->fetch(PDO::FETCH_ASSOC);
$baslik = $tablocek['metin_baslik'];
$metin = $tablocek['metin_icerik'];

$zaman = date('d.m.Y H:i:s');


//Veri tabanı bağlantı ve verilerin çekilmesi
$educationname = "Gölgeleme Egzersizi";
?>

<?php include("../header.php"); ?>

<link rel="stylesheet" href="css/main.css">

<?php include("../nav.php"); ?>



<input type="hidden" name="gizli_zaman" id="gizli_zaman" value="<?php echo $zaman; ?>">
<input type="hidden" name="lblOkunanKelimeSayisi" id="lblOkunanKelimeSayisi" value="">

<div id="main_menu">
	<?php include("../start.php"); ?>

	<div id="txt" class="container">
		<div id="pause"><i class="fas fa-pause fa-3x position-fixed top-0 start-0 mx-4 my-5 detail"> </i></div>
		<div id="resume"><i class="fas fa-play fa-3x position-fixed top-0 start-0 mx-4 my-5 detail"> </i></div>
		<div class="row">
			<div class="txtmain container-fluid col-8 rounded my-3 ">
				<input type="hidden" id="gizli_metin" value="<?php echo $metin ?>">
				<p class="h5 my-3 text-center fw-bold"><?php echo $baslik ?> </p>
				<p id="content" class="h5 my-4 mx-3 lh-base"></p>
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
					<label for="inpMovement" class="form-label">Hareket Şekli</label>
					<div id="txtMovement" class="h5 text-light text-center">1</div>
					<input id="inpMovement" type="range" class="form-range" value="1" min="1" max="4">
				</div>
				<div class="col-md-4 text-light border border-secondary">
					<label for="customRange2" class="form-label">Hız Seviyesi</label>
					<div id="txtSpeed" class="h5 text-light text-center">1000</div>
					<input id="inpSpeed" type="range" class="form-range" value="1000" step="100" min="100" max="1000" id="customRange2">
				</div>

			</div>
		</div>

	</div>
</div>
<!-- Aşağıdan açılır menü -->


<!-- --------------------------------------------------------------------------------------------------- -->



<?php include("../../warning.php"); ?>

<?php include("../footer.php"); ?>
<script src="js/main.js"></script>