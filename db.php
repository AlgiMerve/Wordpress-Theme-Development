<?php
try {
	// $db=new PDO("mysql:host=localhost;dbname=soundneu_hizli_okuma",'soundneu_adminem','1234tamamdahada');
	//$db=new PDO("mysql:host=localhost;dbname=soundneu_speedreading",'root','');
	$db=new PDO("mysql:host=localhost;dbname=alfakocl_speedreading",'alfakocl_adminem','1234tamamdahada');
	$db->query("SET CHARACTER SET utf8");
} catch (PDOException $e) {
	echo $e-> getMessage();
}

date_default_timezone_set('Europe/Istanbul');
