<?php
include("../../../db.php");
$id = $_POST['id'];
$tablosor = $db->prepare("SELECT * FROM hizli_okuma_dogru_renk_durum WHERE id=:lid");
$tablosor->execute(array(
    'lid' => $id
));
$tablocek = $tablosor->fetch(PDO::FETCH_ASSOC);

$renk = $tablocek['renk_ad'];
$renk_kod = $tablocek['renk_kod'];
$hiz = $tablocek['buton_hiz'];
$yaziboyut = $tablocek['buton_yazi_boyut'];
$durum = $tablocek['durum'];

echo  $renk . "_*_" . $renk_kod . "_*_" . $hiz . "_*_" . $yaziboyut . "_*_" . $durum;
