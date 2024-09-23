<?php
include("../../../db.php");
$id = $_POST['id'];
$tablosor = $db->prepare("SELECT * FROM hizli_okuma_goz_cevikligi_durum WHERE id=:lid");
$tablosor->execute(array(
    'lid' => $id
));
$tablocek = $tablosor->fetch(PDO::FETCH_ASSOC);

$okunankelime = $tablocek['okunan_kelime_sayisi'];
$sure = $tablocek['metin_sure'];
$seviye = $tablocek['buton_seviye'];
$hiz = $tablocek['buton_hiz'];
$yaziboyut = $tablocek['buton_yazi_boyut'];
$durum = $tablocek['durum'];

echo   $okunankelime . "_*_" . $sure . "_*_" . $seviye . "_*_" . $hiz . "_*_" . $yaziboyut . "_*_" . $durum;
