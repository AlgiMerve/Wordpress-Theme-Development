<?php

include("../db.php");




include("header.php");
include("nav.php");
?>


<div id="main_menu" class="container text-center">
	<div class="row">
		<span id="name" class="text-center mt-5  main_text blink"></span>
		<span id="learnWrite" class="text-center h5 text-light"></span>
	</div>

	<div class="row mt-4">
		<div class="container-fluid card text-center col-9">
			<div class="card-header">
				Eğitim : <span id="learnToNo"></span>
			</div>
			<div class="card-body">
				<div id="endLearn" class="h1 fw-bold text-info"></div>
				<!-- <h5 class="card-title">Bugün ki eğitimini tamamla</h5> -->

				<button type="button" id="startLearning" class="btn btn-outline-primary  btn_circle">Eğitime Başla</button>
			</div>
			<div class="card-footer text-muted">
				En son tamamlanan eğitim tarihi: <span id="getTimeToLearn"></span>
			</div>
		</div>

	</div>

	<div class="txtmain_ container-fluid text-center my-4">

		<div class="my-4 text-center">


			<div class=" row mt-4 mb-4">
				<div class=" col-sm-4 mt-2">
					<div class="card">
						<div class="card-body text-center">
							<h5 class="card-title">Okuma Hızı</h5>
							<div class="okuma_hizi_class" id="hiz"></div>
							<h5 class="card-text">OKUMA HIZIM NASIL ARTAR ?</h5>
							<p class="card-text">Okuma hızın, günlük eğitimlerinin sonunda yer alan metinlerde ölçtüğümüz hızındır. Düzenli çalıştıkça göz kasların gelişir, görme alanın genişler ve okuma hızın artar.Dikkatli ve düzenli çalışmalar yaparak okuma hızında ciddi bir artış elde edebilirsin.</p>
						</div>
					</div>
				</div>
				<div class=" col-sm-4 mt-2">
					<div class="card">
						<div class="card-body">
							<h5 class="card-title">Anlama Seviyesi</h5>
							<div id="anlama"></div>
							<h5 class="card-text">ANLAMA SEVİYEM NASIL ARTAR ?</h5>
							<p class="card-text">Günlük eğitimlerin sonundaki metinlerde yer alan sorular çok önemli çünkü o sorulara verdiğin doğru cevaplar, anlama seviyeni gösterir. Daha çok okudukça daha iyi bir şekilde ve kolaylıkla anladığını fark edebilirsin.
							</p>
						</div>
					</div>
				</div>
				<div class=" col-sm-4 mt-2">
					<div class="card">
						<div class="card-body">
							<h5 class="card-title">Katılım Sıklığı</h5>
							<div id="katilim"></div>
							<h5 class="card-text">KATILIM SIKLIĞIM NASIL ARTAR ?</h5>
							<p class="card-text">
								Katılım sıklığı, ne kadar düzenli çalıştığını gösterir. Okuma hızını artırmanın yolu da düzenli çalışmaktan geçer. Bu nedenle azim, bu işte çok önemli. Her gün, 30 dakikanı ayırarak Katılım sıklığını artırabilir, okuma hızını uçurabilirsin.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</div>

<?php include("warning.php"); ?>

<script src="js/chart2.js"></script>

<?php include("footer.php"); ?>
<script src="js/home.js"></script>