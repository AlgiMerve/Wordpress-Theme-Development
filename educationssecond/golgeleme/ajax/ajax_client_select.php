<?php
include("../../../db.php");
$id = $_POST['id'];
$tablosor = $db->prepare("SELECT * FROM hizli_silinmeden_blog_durum WHERE id=:lid");
$tablosor->execute(array(
    'lid' => $id
));
$tablocek = $tablosor->fetch(PDO::FETCH_ASSOC);

$okunankelime = $tablocek['okunan_kelime_sayisi'];
$seviye = $tablocek['buton_seviye'];
$hiz = $tablocek['buton_hiz'];
$durum = $tablocek['durum'];


echo   $okunankelime . "_*_" . $seviye . "_*_" . $hiz . "_*_" . $durum;
