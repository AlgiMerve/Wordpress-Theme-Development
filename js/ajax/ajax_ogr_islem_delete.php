<?php
include("../../db.php");


$tc = $_POST['tck'];
$ad_soyad = $_POST['adi'];
$kadi = $_POST['kad'];

$sorgu = $db->prepare("DELETE FROM ogrenci_tablosu WHERE ogr_ad_soyad=:ads AND ogr_tc =:tc AND kullanici_ad=:kadi");
$delete = $sorgu->execute(array(
    "ads" => $ad_soyad,
    "tc" => $tc,
    "kadi" => $kadi,

));

if ($delete) {
    echo true;
} else {
    echo false;
}


