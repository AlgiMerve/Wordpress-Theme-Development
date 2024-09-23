<?php
include("../../../db.php");
$id = $_POST['id'];
$tablosor = $db->prepare("SELECT * FROM hizli_okuma_ikili_uclu_blok_durum WHERE id=:lid");
$tablosor->execute(array(
    'lid' => $id
));
$tablocek = $tablosor->fetch(PDO::FETCH_ASSOC);

$seviye = $tablocek['buton_seviye'];
$hiz = $tablocek['buton_hiz'];
$sutun = $tablocek['buton_sutun'];
$durum = $tablocek['durum'];


echo   $seviye . "_*_" . $hiz . "_*_" . $sutun . "_*_" . $durum;
