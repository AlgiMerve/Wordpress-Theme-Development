<?php
include("../../../db.php");

$ad = $_POST['ad_soyad'];
$tc = $_POST['tc_no'];
$time = $_POST['time'];

$sorgu = $db->prepare("UPDATE ogrenci_tablosu SET ogr_egitim_tamamlama_tarih=:tarih WHERE ogr_ad_soyad=:ad AND ogr_tc=:tc");
$update = $sorgu->execute(array(
    'tarih' => $time,
    'ad' => $ad,
    'tc' => $tc
));

if ($update) {
    echo "Başarılı";
} else {
    echo "Hata!";
}
