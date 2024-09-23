<?php
include("../../../db.php");
$id = $_POST['id'];
$tablosor = $db->prepare("SELECT * FROM hizli_okuma_farkli_bul_durum WHERE id=:lid");
$tablosor->execute(array(
    'lid' => $id
));
$tablocek = $tablosor->fetch(PDO::FETCH_ASSOC);

$dogru_sayisi = $tablocek['dogru_sayisi'];
$yanlis_sayisi = $tablocek['yanlis_sayisi'];
$buton_seviye = $tablocek['buton_seviye'];
$buton_hiz = $tablocek['buton_hiz'];
$durum = $tablocek['durum'];

echo  $dogru_sayisi . "_*_" . $yanlis_sayisi . "_*_" . $buton_seviye . "_*_" . $buton_hiz . "_*_" . $durum;
