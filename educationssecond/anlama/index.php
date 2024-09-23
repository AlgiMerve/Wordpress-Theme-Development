<?php
include("../../db.php");
$zaman = date('d.m.Y H:i:s');
$educationname = "Okuma ve Anlama Testi";
?>

<?php include("../header.php"); ?>

<link rel="stylesheet" href="css/main.css">

<?php include("../nav.php"); ?>



<input type="hidden" name="timenow" id="timenow" value="<?php echo $zaman; ?>">


<div id="main_menu">
	<?php include("select.php") ?>

	<div id="txt" class="container">
		<button id="newPage" style="width: 4rem; height: 4rem; margin-left: 180px;" class="btn btn-light rounded-circle position-fixed start-0 top-0 my-5 detail"><i class="fas fa-desktop fa-2x"></i></button>

		<button id="AppStart" style="width: 4rem; height: 4rem; margin-left: 180px;" class="btn btn-light rounded-circle position-fixed start-0 top-0 my-5 detail"><i class="fas fa-play fa-2x"></i></button>

		<div data-bs-toggle="modal" data-bs-target="#exampleModal" id="finishToApp"><i style="margin-left: 100px;" class="fas fa-flag-checkered fa-3x position-fixed top-0 start-0 my-5 detail"> </i></div>
		
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
									<th scope="col">Okuma Hızı (k/dk)</th>
									<th scope="col">Anlama Oranı (%)</th>
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
</div>

</div>


<!-- --------------------------------------------------------------------------------------------------- -->



<?php include("../../warning.php"); ?>

<?php include("../footer.php"); ?>

<script src="js/page.js"></script>

<script src="js/main.js"></script>