<?php
include("../../db.php");

$ad_soyad = $_POST['ad'];
$tablo_ad = $_POST['tablo'];
$bayi_kod = $_POST['bayi_kod'];

$tablosor = $db->prepare("SELECT * FROM $tablo_ad WHERE bayi_kod=:bayi AND ad_soyad=:ads");

$tablosor->execute(array(
    'ads' => $ad_soyad,
    'bayi' => $bayi_kod
));

while ($tablocek = $tablosor->fetch(PDO::FETCH_ASSOC)) {

    echo $tablocek['metin_sure'] . "_*_" . $tablocek['metin_okunan_kelime'] . "_*_" . $tablocek['metin_oran'] . "_*_" . $tablocek['metin_toplam_dogru'] . "_*_" . $tablocek['metin_test_tarih'] . "_*_";
}