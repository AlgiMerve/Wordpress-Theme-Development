<?php
include("db.php");
include("header.php");
include("nav.php");
?>


<div id="main_menu" class="container text-center">

	<div class=" text-light position-relative">
		<span class="display-3"> Kullanıcı</span> <span class="main_text display-3">İşlemleri</span>
		<br>
		<span class="result">Kullanıcılar üzerinde ekleme, silme ve güncelleme işlemlerini buradan yapabilirsin. </span>
	</div>

	<!-- Bu kısma öğrenci bilgileri gelecek ona göre bilgi alma işlemi yapıcaz -->
	<div class="usertxtmain container-fluid text-center my-4">
		<div class="container">
			<div class="row ">
				<div class=" text-end">
					<button id="newUser" class="btn btn-primary btn-sm my-2"><i class="fa fa-plus"></i></button>
				</div>
				<div class="col-8 container-fluid rounded">
					<span class="result">Kullanıcı Seçim Kısmı </span>
					<select id="selectToUser" class="form-select my-2 text-center">
						<option selected disabled>Kullanıcı Seçiniz</option>
					</select>
				</div>
				<div class="container-fluid text-center">
					<button id="btnResultToUser" class="btn btn-primary">Kullanıcı Görüntüle</button>
				</div>

			</div>
		</div>

	</div>

	<div id="userinfo" class="txtmain container-fluid text-center my-2">
		<div class="container">
			<div class="row ">
				<div class="col-8 container-fluid my-3 rounded">
					<span class="result">Kullanıcı Bilgileri </span>

					<div class="input-group flex-nowrap my-4">
						<span class="text-center mx-3"><i class="fa fa-user bigicon"></i></span>
						<input id="userNameLastName" type="text" class="form-control rounded" disabled placeholder="Ad ve Soyad">
					</div>

					<div class="input-group flex-nowrap my-4">
						<span class="text-center mx-3"><i class="fa fa-user-secret bigicon"></i></span>
						<input id="userId" type="text" class="form-control rounded" disabled placeholder="Kullanıcı TC - ID">
					</div>

					<div class="input-group flex-nowrap my-4">
						<span class="text-center mx-3"><i class="fa fa-book bigicon"></i></span>
						<select id="userProgram" class="form-select rounded">
							<option>Temel Hızlı Okuma Eğitimi</option>
						</select>
					</div>

					<div class="input-group flex-nowrap my-4">
						<span class="text-center mx-3"><i class="fa fa-user bigicon"></i></span>
						<input id="userKadi" type="text" class="form-control rounded" placeholder="Kullanıcı Ad">
					</div>

					<div class="input-group flex-nowrap my-4">
						<span class="text-center mx-3"><i class="fa fa-unlock-alt bigicon"></i></span>
						<input id="userPass" type="text" class="form-control rounded" placeholder="Kullanıcı Şifre">
					</div>


				</div>

			</div>
			<div class="btn-group dropend ">
				<button disabled id="btnSave" type="button" class="btn btn-primary">Kaydet</button>
				<button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
					<span class="visually-hidden"></span>
				</button>
				<ul class="dropdown-menu rounded">
					<li><button disabled id="btnUpdate" class="dropdown-item bg-warning rounded">Güncelle</button></li>
					<li><button disabled id="btnDelete" class="dropdown-item bg-danger rounded">Sil</button></li>
				</ul>
			</div>
		</div>

	</div>


</div>

<?php include("warning.php"); ?>

<!-- <script src="js/chart.js"></script> -->

<?php include("footer.php"); ?>
<script src="js/userprocess.js"></script>