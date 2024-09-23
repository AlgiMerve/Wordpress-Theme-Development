<?php
include("../../../db.php");

$metin_sure = $_POST['metin_sure'];
$okunan_kelime_sayisi = $_POST['okunan_kelime_sayisi'];
$okuma_hizi = $_POST['okuma_hizi'];
$dogru_sayisi = $_POST['dogru_sayisi'];
$durum = $_POST['durum'];
$id = $_POST['id'];

$sorgu = $db->prepare("UPDATE anlama_metinleri_durum SET metin_sure=:d1, okunan_kelime_sayisi=:d2,  okuma_hizi=:d5, dogru_sayisi=:d7, durum=:d6 WHERE id=:id");
$update = $sorgu->execute(array(
    'd6' => $durum,
    'd1' => $metin_sure,
    'd2' => $okunan_kelime_sayisi,
    'd5' => $okuma_hizi,
    'd7' => $dogru_sayisi,
    "id" => $id
));

echo "Başarılı";
