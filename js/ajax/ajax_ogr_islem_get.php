<?php
include("../../db.php");

$tc = $_POST['tck'];
$ad_soyad = $_POST['ad_soyad'];

$tablosor = $db->prepare("SELECT * FROM ogrenci_tablosu WHERE ogr_tc=:tc AND ogr_ad_soyad=:ads");

$tablosor->execute(array(
    'tc' => $tc,
    'ads' => $ad_soyad
));

$tablocek = $tablosor->fetch(PDO::FETCH_ASSOC);

if ($tablocek > 0) {
    echo  $tablocek["kullanici_ad"] . "_*_" . $tablocek["kullanici_sifre"] . "_*_" . $tablocek['ogr_program'];
} else {
    echo false;
}
