<?php
include("../../../db.php");

$ad = $_POST['ad_soyad'];
$tc = $_POST['tc_no'];
$seviye = $_POST['getSeviye'];

$sorgu = $db->prepare("UPDATE ogrenci_tablosu SET ogrenci_program_durum=:durum WHERE ogr_ad_soyad=:ad AND ogr_tc=:tc");
$update = $sorgu->execute(array(
    'durum' => $seviye,
    'ad' => $ad,
    'tc' => $tc
));

if ($update) {
    echo "Başarılı";
} else {
    echo "Hata!";
}
