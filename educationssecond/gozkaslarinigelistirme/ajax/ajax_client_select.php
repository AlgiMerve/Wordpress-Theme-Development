<?php
include("../../../db.php");
$id = $_POST['id'];
$tablosor = $db->prepare("SELECT * FROM hizli_okuma_gozkg_durum WHERE id=:lid");
$tablosor->execute(array(
    'lid' => $id
));
$tablocek = $tablosor->fetch(PDO::FETCH_ASSOC);

$seviye = $tablocek['buton_seviye'];
$hiz = $tablocek['buton_hiz'];
$ikon = $tablocek['buton_ikon'];
$durum = $tablocek['durum'];


echo   $seviye . "_*_" . $hiz . "_*_" . $ikon . "_*_" . $durum;
