<?php
include("../../../db.php");
$id = $_POST['id'];
$tablosor = $db->prepare("SELECT * FROM hizli_okuma_goz_ritim_durum WHERE id=:lid");
$tablosor->execute(array(
    'lid' => $id
));
$tablocek = $tablosor->fetch(PDO::FETCH_ASSOC);

$hiz = $tablocek['buton_hiz'];
$durum = $tablocek['durum'];


echo  $hiz . "_*_" . $durum;
