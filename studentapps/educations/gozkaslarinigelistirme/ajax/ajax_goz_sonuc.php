<?php
include("../../../../db.php");

$bayi_kod = $_POST['bayi_kod'];
$tc = $_POST['tc'];
$ad_soyad = $_POST['ad_soyad'];
$sure = $_POST['sure'];
$zaman = $_POST['zaman'];



$sorgu = $db->prepare("INSERT INTO hizli_okuma_gozegz_sonuc SET bayi_kod=:bayi_kod, ogr_tc =:tc, ad_soyad=:ad_soyad, ogr_sure=:sure, tarih_zaman=:zaman");
$insert = $sorgu->execute(array(
    "bayi_kod" => $bayi_kod,
    "tc" => $tc,
    "ad_soyad" => $ad_soyad,
    "sure" => $sure,
    "zaman" => $zaman
));

echo "Başarılı ";
