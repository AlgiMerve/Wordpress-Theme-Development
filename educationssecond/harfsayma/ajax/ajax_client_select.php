<?php
include("../../../db.php");
$id = $_POST['id'];
$tablosor = $db->prepare("SELECT * FROM hizli_okuma_dogru_sayi_durum WHERE id=:lid");
$tablosor->execute(array(
    'lid' => $id
));
$tablocek = $tablosor->fetch(PDO::FETCH_ASSOC);

$kelime_ad = $tablocek['kelime_ad'];
$kelime_sayi = $tablocek['kelime_sayi'];
$celdirici_ad = $tablocek['celdirici_ad'];
$celdirici_sayi = $tablocek['celdirici_sayi'];
$yaziboyut = $tablocek['buton_yazi_boyut'];
$durum = $tablocek['durum'];

echo  $kelime_ad . "_*_" . $kelime_sayi . "_*_" . $celdirici_ad . "_*_" . $celdirici_sayi . "_*_" . $yaziboyut . "_*_" . $durum;
