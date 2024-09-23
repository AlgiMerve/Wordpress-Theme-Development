<?php

include("../../../db.php");

$bayi_kod = $_POST['bayi_kod'];
$tc = $_POST['tc'];
$ad_soyad = $_POST['ad_soyad'];
$sure = $_POST['sure'];
$dogru_sayisi = $_POST['ogr_dogru_sayisi'];
$yanlis_sayisi = $_POST['ogr_yanlis_sayisi'];
$zaman = $_POST['zaman'];



$sorgu = $db->prepare("INSERT INTO hizli_okuma_kelimeler_sonuc SET bayi_kod=:bayi_kod, ogr_tc =:tc, ad_soyad=:ad_soyad, metin_sure=:sure, dogru_sayisi=:dogru_sayisi, yanlis_sayisi=:yanlis_sayisi, metin_test_tarih=:zaman");
$insert = $sorgu->execute(array(
    "bayi_kod" => $bayi_kod,
    "tc" => $tc,
    "ad_soyad" => $ad_soyad,
    "sure" => $sure,
    "dogru_sayisi" => $dogru_sayisi,
    "yanlis_sayisi" => $yanlis_sayisi,
    "zaman" => $zaman
));

echo "Kayıt Başarılı";
