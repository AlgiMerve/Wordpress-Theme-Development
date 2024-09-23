<?php
include("../../db.php");

$bayi = $_POST['bkod'];
$tc = $_POST['tck'];
$ad_soyad = $_POST['ad_soyad'];
$kadi = $_POST['kadi'];
$sifre = $_POST['psw'];
$program = $_POST['prg'];
$durum = "1";
$trh = "";
$ttrh = "";

$insert = $db->prepare("INSERT INTO ogrenci_tablosu SET bayi_kod=:bkod, ogr_ad_soyad=:ads, ogr_tc =:tc, ogr_program=:prg, kullanici_ad=:kadi, kullanici_sifre=:sifre, ogr_egitim_tamamlama_tarih=:trh, ogr_katilim_tarih=:ttrh,ogrenci_program_durum=:drm");
$insert->execute(array(
    "bkod" => $bayi,
    "ads" => $ad_soyad,
    "tc" => $tc,
    "kadi" => $kadi,
    "sifre" => $sifre,
    "prg" => $program,
    "trh" => $trh,
    "ttrh" => $ttrh,
    "drm" => $durum

));




echo "Başarılı";
