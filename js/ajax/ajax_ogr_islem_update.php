<?php
include("../../db.php");


$tc = $_POST['tck'];
$ad_soyad = $_POST['adi'];
$kadi = $_POST['kad'];
$sifre = $_POST['ps'];
$program = $_POST['prg'];


$sorgu = $db->prepare("UPDATE ogrenci_tablosu SET kullanici_ad=:kadi, kullanici_sifre =:sifre, ogr_program=:prg WHERE ogr_ad_soyad=:ads AND ogr_tc=:tc");
$update = $sorgu->execute(array(
    "ads" => $ad_soyad,
    "tc" => $tc,
    "kadi" => $kadi,
    "sifre" => $sifre,
    "prg" => $program

));

if ($update) {
    echo true;
} else {
    echo false;
}
