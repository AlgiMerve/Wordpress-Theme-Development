<?php
include("db.php");
include("header.php");
include("nav.php");
?>


<div id="main_menu" class="container text-center">

	<div class="row mt-4">
		<div class="col">
			<span class="result">Uygulanabilecek Eğitimler Şablonu</span>
			<div class="container bg-light my-2">
				<span class="result">Okuma Hızına Göre</span>
				<table class="table table-hover" id="tblLevelSpeed">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">
								< 200</th>
							<th scope="col">201-300</th>
							<th scope="col">300 ></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">Seviye</th>
							<td>1.Seviye Uygulamalar</td>
							<td>2.Seviye Uygulamalar</td>
							<td>3.Seviye Uygulamalar</td>
						</tr>
						<tr>
							<th scope="row">Hız</th>
							<td>1000 ms.</td>
							<td>500 ms.</td>
							<td>200 ms.</td>
						</tr>
					</tbody>
				</table>
			</div>

		</div>

		<div class="col">
			<span class="result">En Son Eğitimini Tamamlayan Kullanıcılar</span>
			<div class="container bg-light my-2">

				<table id="tblLastLearn" class="table table-hover ">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Kullanıcı</th>
							<th scope="col">En Son Seans Tamamlama Tarih</th>
							<th scope="col">En Son Katılım Tarihi</th>
						</tr>
					</thead>
					<tbody id="userTable">


					</tbody>
				</table>
			</div>
		</div>

	</div>



</div>



<?php include("warning.php"); ?>

<!-- <script src="js/chart.js"></script> -->

<?php include("footer.php"); ?>
<script src="js/home.js"></script>