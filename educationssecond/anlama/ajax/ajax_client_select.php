<?php
include("../../../db.php");
$id = $_POST['id'];
$tablosor = $db->prepare("SELECT * FROM anlama_metinleri_durum WHERE id=:lid");
$tablosor->execute(array(
    'lid' => $id
));
$tablocek = $tablosor->fetch(PDO::FETCH_ASSOC);

$metin_sure = $tablocek['metin_sure'];
$okunan_kelime_sayisi = $tablocek['okunan_kelime_sayisi'];
$okuma_hizi = $tablocek['okuma_hizi'];
$dogru_sayisi = $tablocek['dogru_sayisi'];
$durum = $tablocek['durum'];


echo   $metin_sure . "_*_" . $okunan_kelime_sayisi . "_*_" . $okuma_hizi . "_*_" . $dogru_sayisi . "_*_" . $durum;
