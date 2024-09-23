<?php

include("../../../db.php");

$bayi_kod = $_POST['bayi_kod'];
$tc = $_POST['tc'];
$ad_soyad = $_POST['ad_soyad'];
$sure = $_POST['sure'];
$okunan_kelime_sayisi = $_POST['okunan_kelime_sayisi'];
$okuma_hizi = $_POST['okuma_hizi'];
$toplam_dogru_sayisi = $_POST['dogru_sayisi'];
$zaman = $_POST['zaman'];



$sorgu = $db->prepare("INSERT INTO hizli_okuma_metinleri_soru_cevap SET bayi_kod=:bayi_kod, ogr_tc =:tc, ad_soyad=:ad_soyad, metin_sure=:sure, metin_okunan_kelime=:okunan_kelime_sayisi, metin_oran=:okuma_hizi, metin_toplam_dogru=:toplam_dogru, metin_test_tarih=:zaman");
$insert = $sorgu->execute(array(
    "bayi_kod" => $bayi_kod,
    "tc" => $tc,
    "ad_soyad" => $ad_soyad,
    "sure" => $sure,
    "okunan_kelime_sayisi" => $okunan_kelime_sayisi,
    "okuma_hizi" => $okuma_hizi,
    "toplam_dogru" => $toplam_dogru_sayisi,
    "zaman" => $zaman
));

echo "Başarılı";
