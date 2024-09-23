<?php
include("../../../db.php");

$ad = $_POST['ad_soyad'];
$tc = $_POST['tc_no'];

// $tablosor = $db->prepare("SELECT * FROM ogrenci_tablosu WHERE ogr_ad_soyad=:ad AND ogr_tc=:tc");
$tablosor = $db->prepare("SELECT * FROM ogrenci_tablosu  INNER JOIN temel_egitimler ON ogrenci_tablosu.ogrenci_program_durum=temel_egitimler.id WHERE ogr_ad_soyad=:ad AND ogr_tc=:tc");
$tablosor->execute(array(
    'ad' => $ad,
    'tc' => $tc
));

$tablocek = $tablosor->fetch(PDO::FETCH_ASSOC);



echo $tablocek['ogrenci_program_durum'] . "_*_" . $tablocek['url'] . "_*_" . $tablocek['no'] . "_*_" . $tablocek['ogr_egitim_tamamlama_tarih'];
