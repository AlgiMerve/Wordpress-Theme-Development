<?php
include("../../../db.php");

$ad_soyad = $_POST['ad'];
$bayi_kod = $_POST['bayi_kod'];
$tc = $_POST['tc'];

$tablosor = $db->prepare("SELECT * FROM ogrenci_tablosu WHERE bayi_kod=:bayi AND ogr_ad_soyad=:ads AND ogr_tc=:tc");

$tablosor->execute(array(
    'ads' => $ad_soyad,
    'bayi' => $bayi_kod,
    'tc' => $tc
));

$tablocek = $tablosor->fetch(PDO::FETCH_ASSOC);

echo $tablocek['ogr_katilim_tarih'];
