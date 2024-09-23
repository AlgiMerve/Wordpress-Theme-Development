<?php
include("../../../db.php");
$id = $_POST['id'];
$tablosor = $db->prepare("SELECT * FROM takistoskop_durum WHERE id=:lid");
$tablosor->execute(array(
    'lid' => $id
));
$tablocek = $tablosor->fetch(PDO::FETCH_ASSOC);

$icerik = $tablocek['metin_icerik'];
$hiz = $tablocek['buton_hiz'];
$yaziboyut = $tablocek['buton_yazi_boyut'];
$durum = $tablocek['durum'];

echo  $icerik . "_*_" . $hiz . "_*_" . $yaziboyut . "_*_" . $durum;
