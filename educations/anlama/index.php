<?php
include("../../db.php");
//Veri tabanı bağlantı ve verilerin çekilmesi

$tablosor = $db->prepare("SELECT * FROM hizli_okuma_metinleri WHERE metin_kategori='Hikayeler' ORDER BY RAND() LIMIT 1");
$tablosor->execute();
$tablocek = $tablosor->fetch(PDO::FETCH_ASSOC);
$baslik = $tablocek['metin_baslik'];
$metin = $tablocek['metin_icerik'];

$zaman = date('d.m.Y H:i:s');


//Veri tabanı bağlantı ve verilerin çekilmesi
$educationname = "Okuma ve Anlama Testi";
?>

<?php include("../header.php"); ?>

<link rel="stylesheet" href="css/main.css">

<?php include("../nav.php"); ?>



<input type="hidden" name="timenow" id="timenow" value="<?php echo $zaman; ?>">


<div id="main_menu">
	<?php include("select.php") ?>
	<?php include("../start.php"); ?>

	<div id="txt" class="container">
		<div class="row">
			<div id="mainTxt" class="txtmain container-fluid col-8 rounded my-3 ">
				<p id="titlecontent" class="h5 my-3 text-center fw-bold"><?php echo $baslik ?> </p>
				<p id="content" class="h5 my-4 mx-3"><?php echo $metin ?>
					<br>
				<div class="text-end">
					<i id="completetheexercise" style="color: #4da1fe;" class="fas fa-check-circle fa-3x" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i></p>
				</div>
			</div>
			<!-- <span class="bg-white position-fixed bottom-0 start-50 translate-middle-x rounded col-7  text-end">
					<div>
						<i style="color: #4da1fe;" class="fas fa-check-circle fa-3x"></i></p>
					</div>
				</span> -->
		</div>
	</div>


	<!-- Sorular bu alana gelecek -->

	<?php include("questions.php"); ?>

	<!-- Sorular bu alana gelecek -->

	<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header text-center">
					<h5 class="modal-title" id="staticBackdropLabel">SONUÇLAR</h5>
				</div>
				<div class="modal-body">
					<div class="my-2">Okuma Hızı : <span id="readspead"></span> kelime/dakika</div>
					<div class="my-2">Geçen Süre : <span id="nexttime"></span> saniye</div>
					<div class="my-2">Metni anlayarak okuduğundan eminsen, metinle ilgili sorulara geçebilirsin.</div>
					<div class="my-2">Anlama düzeyin %60'ın altında kalırsa bu çalışmayı yeni bir metinle tekrar etmen gerekecektir.</div>
				</div>
				<div class="modal-footer">
					<button id="resume" type="button" class="btn btn-secondary" data-bs-dismiss="modal">METNE DÖN</button>
					<button id="nextquestion" type="button" class="btn btn-primary" data-bs-dismiss="modal">SORULARA GEÇ</button>
				</div>
			</div>
		</div>
	</div>


</div>


<!-- --------------------------------------------------------------------------------------------------- -->



<?php include("../../warning.php"); ?>

<?php include("../footer.php"); ?>
<script src="js/main.js"></script>