<?php

include("../../../../db.php");

$bayi_kod = $_POST['bayi_kod'];
$tc = $_POST['tc'];
$ad_soyad = $_POST['ad_soyad'];
$sure = $_POST['sure'];
$okunan_kelime_sayisi = $_POST['okunan_kelime_sayisi'];
$zaman = $_POST['zaman'];



$sorgu = $db->prepare("INSERT INTO hizli_okuma_metin_takip_sonuc SET bayi_kod=:bayi_kod, ogr_tc =:tc, ad_soyad=:ad_soyad, metin_sure=:sure, okunan_kelime_sayisi=:okunan_kelime_sayisi, tarih_zaman=:zaman");
$insert = $sorgu->execute(array(
	"bayi_kod" =>$bayi_kod,
	"tc" => $tc,
	"ad_soyad"=>$ad_soyad,
	"sure" => $sure,
	"okunan_kelime_sayisi" => $okunan_kelime_sayisi,
	"zaman" => $zaman
));

echo "Başarılı";