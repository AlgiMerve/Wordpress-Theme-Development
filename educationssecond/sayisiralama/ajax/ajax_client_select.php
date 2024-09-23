<?php
include("../../../db.php");
$id = $_POST['id'];
$tablosor = $db->prepare("SELECT * FROM hizli_okuma_sayi_durum WHERE id=:lid");
$tablosor->execute(array(
    'lid' => $id
));
$tablocek = $tablosor->fetch(PDO::FETCH_ASSOC);

$sure = $tablocek['metin_sure'];
$sonisaret = $tablocek['son_isaret_sayisi'];
$seviye = $tablocek['buton_seviye'];
$yaziboyut = $tablocek['buton_yazi_boyut'];
$durum = $tablocek['durum'];

echo   $sure . "_*_" . $sonisaret . "_*_" . $seviye . "_*_" . $yaziboyut . "_*_" . $durum;
