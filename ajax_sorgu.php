<?php
include("db.php");

$kadi = $_POST['kadi'];
$sifre = $_POST['sifre'];

$tablosor = $db->prepare("SELECT * FROM ogrenci_tablosu WHERE kullanici_ad=:kadi AND kullanici_sifre=:sifre");

$tablosor->execute(array(
    'kadi' => $kadi,
    'sifre' => $sifre
));

$tablocek = $tablosor->fetch(PDO::FETCH_ASSOC);

if ($tablocek > 0) {
    echo true . "_*_" . $tablocek['bayi_kod'] . "_*_" . $tablocek['ogr_ad_soyad'] . "_*_" . $tablocek['ogr_tc'];
}
