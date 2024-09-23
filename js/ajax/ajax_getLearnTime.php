<?php
include("../../db.php");

$ad_soyad = $_POST['ad'];
$bayi_kod = $_POST['bayi_kod'];

$tablosor = $db->prepare("SELECT * FROM ogrenci_tablosu WHERE bayi_kod=:bayi AND ogr_ad_soyad=:ads");

$tablosor->execute(array(
    'ads' => $ad_soyad,
    'bayi' => $bayi_kod,
));

$tablocek = $tablosor->fetch(PDO::FETCH_ASSOC);
if (isset($tablocek['ogr_katilim_tarih'])) {
    echo $tablocek['ogr_katilim_tarih'];
} else {
    echo "0";
}
