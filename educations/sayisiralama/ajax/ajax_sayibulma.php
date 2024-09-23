<?php

include("../../../db.php");

$bayi_kod = $_POST['bayi_kod'];
$tc = $_POST['tc'];
$ad_soyad = $_POST['ad_soyad'];
$sure = $_POST['sure'];
$son_isaret_sayisi = $_POST['son_isaret_sayisi'];
$zaman = $_POST['zaman'];



$sorgu = $db->prepare("INSERT INTO hizli_okuma_sayi_sonuc SET bayi_kod=:bayi_kod, ogr_tc =:tc, ad_soyad=:ad_soyad, ogr_sure=:sure, son_isaret_sayisi=:son_isaret_sayisi, tarih_saat=:zaman");
$insert = $sorgu->execute(array(
	"bayi_kod" => $bayi_kod,
	"tc" => $tc,
	"ad_soyad" => $ad_soyad,
	"sure" => $sure,
	"son_isaret_sayisi" => $son_isaret_sayisi,
	"zaman" => $zaman
));


	echo "Başarılı";