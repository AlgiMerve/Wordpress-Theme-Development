<?php
include("../../../../db.php");

$bayi_kod = $_POST['bayi_kod'];
$tc = $_POST['tc'];
$ad_soyad = $_POST['ad_soyad'];
$dogru_sayisi = $_POST['dogru_sayisi'];
$yanlis_sayisi = $_POST['yanlis_sayisi'];
$zaman = $_POST['zaman'];



$sorgu = $db->prepare("INSERT INTO hizli_okuma_dogru_rengi_bul_sonuc SET bayi_kod=:bayi_kod, ogr_tc =:tc, ad_soyad=:ad_soyad,dogru_sayisi=:dogru_sayisi, yanlis_sayisi=:yanlis_sayisi, tarih_zaman=:zaman");
$insert = $sorgu->execute(array(
    "bayi_kod" => $bayi_kod,
    "tc" => $tc,
    "ad_soyad" => $ad_soyad,
    "dogru_sayisi" => $dogru_sayisi,
    "yanlis_sayisi" => $yanlis_sayisi,
    "zaman" => $zaman
));

echo "Başarılı ";
