<?php
include("../../../db.php");
$id = $_POST['id'];
$tablosor = $db->prepare("SELECT * FROM hizli_okuma_satir_boyu_durum WHERE id=:lid");
$tablosor->execute(array(
    'lid' => $id
));
$tablocek = $tablosor->fetch(PDO::FETCH_ASSOC);

$seviye = $tablocek['buton_seviye'];
$hiz = $tablocek['buton_hiz'];
$mesafe = $tablocek['buton_uzaklik'];
$yaziboyut = $tablocek['buton_yazi_boyut'];
$durum = $tablocek['durum'];


echo   $seviye . "_*_" . $hiz . "_*_" . $mesafe . "_*_" . $yaziboyut . "_*_" . $durum;
