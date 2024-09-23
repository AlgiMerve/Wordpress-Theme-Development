<?php

include("../../../db.php");

$bayi_kod = $_POST['bayi_kod'];
$tc = $_POST['tc'];
$ad_soyad = $_POST['ad_soyad'];
$sure = $_POST['sure'];
$okunan_kelime_sayisi = $_POST['okunan_kelime_sayisi'];
$okuma_hizi = $_POST['okuma_hizi'];
$zaman = $_POST['zaman'];



$sorgu = $db->prepare("INSERT INTO hizli_okuma_blog_sonuc SET bayi_kod=:bayi_kod, ogr_tc =:tc, ad_soyad=:ad_soyad, blog_sure=:sure, blog_okunan_kelime=:okunan_kelime_sayisi, blog_oran=:okuma_hizi, blog_test_tarih=:zaman");
$insert = $sorgu->execute(array(
    "bayi_kod" => $bayi_kod,
    "tc" => $tc,
    "ad_soyad" => $ad_soyad,
    "sure" => $sure,
    "okunan_kelime_sayisi" => $okunan_kelime_sayisi,
    "okuma_hizi" => $okuma_hizi,
    "zaman" => $zaman
));

echo "Başarılı";
