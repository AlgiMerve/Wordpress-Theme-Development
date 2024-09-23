<?php
include("../../db.php");

$bayi_kod = $_POST['bayi_kod'];


$tablosor = $db->prepare("SELECT * FROM ogrenci_tablosu WHERE bayi_kod=:bkod ORDER BY ogr_ad_soyad  LIMIT 10 ");

$tablosor->execute(array(
    'bkod' => $bayi_kod,

));

while ($tablocek = $tablosor->fetch(PDO::FETCH_ASSOC)) {

    if (isset($tablocek['ogr_egitim_tamamlama_tarih']) and $tablocek['ogr_egitim_tamamlama_tarih'] != "" and isset($tablocek['ogr_katilim_tarih']) and $tablocek['ogr_katilim_tarih'] != "") {
        echo $tablocek['ogr_ad_soyad'] . "_*_" . $tablocek['ogr_egitim_tamamlama_tarih'] . "_*_" . $tablocek['ogr_katilim_tarih'] . "_*_";
    }
}
