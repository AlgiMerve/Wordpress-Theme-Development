<!DOCTYPE html>
<html>

<head>
	<title>Giriş Formu</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="css/login.css">
	<link rel="icon" href="images/neuro.ico" type="image/ico" />
	<link href="https://fonts.googleapis.com/css?family=Poppins:600&display=swap" rel="stylesheet">
	<script src="https://kit.fontawesome.com/a81368914c.js"></script>
	<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
	<script src="js/md5.min.js"></script>

</head>

<body>
	<img class="wave" src="images/wave.png">
	<div class="container">
		<div class="img">
			<img src="images/bg.svg">
		</div>
		<div class="login-content">
			<form action="#">
				<img src="images/avatar.svg">
				<h2 class="title">HOŞGELDİNİZ</h2>

				<input id="giris_bilgi" type="hidden" value="ogrenci">

				<!-- Bu kısma radio buttonlar gelecek -->
				<div>
					<label class="radio radio-gradient">
						<span class="radio__input">
							<input id="ogr" type="radio" name="radio" checked>
							<span class="radio__control"></span>
						</span>
						<span class="radio__label">Öğrenci</span>
					</label>
					<br>
					<label class="radio radio-before">
						<span class="radio__input">
							<input id="bayi" type="radio" name="radio">
							<span class="radio__control"></span>
						</span>
						<span class="radio__label">Bayi</span>
					</label>
				</div>

				<div style="opacity: 0;" id="bayi_bilgi" class="input-div bayi">
					<div class="i">
						<i class="fas fa-building"></i>
					</div>
					<div class="div">
						<h5>Bayi Kodu</h5>
						<input disabled id="bayi_kod" type="text" class="input">
					</div>
				</div>

				<div class="input-div one">
					<div class="i">
						<i class="fas fa-user"></i>
					</div>
					<div class="div">
						<h5>Kullanıcı Adı</h5>
						<input id="kullanici_adi" type="text" class="input">
					</div>
				</div>
				<div class="input-div pass">
					<div class="i">
						<i class="fas fa-lock"></i>
					</div>
					<div class="div">
						<h5>Parola</h5>
						<input id="sifre" type="password" class="input">
					</div>
				</div>
				<!-- <a href="#">Parolamı unuttum?</a> -->
				<!-- <input id="btn_giris" type="submit" class="btn" value="GİRİŞ"> -->
				<button id="btn_giris" class="btn">GİRİŞ</button>
			</form>
		</div>
	</div>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script type="text/javascript" src="js/main.js"></script>
	
</body>


</html>