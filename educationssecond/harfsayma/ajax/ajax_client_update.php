<?php
include("../../../db.php");


$kelime_ad = $_POST['kelime_ad'];
$kelime_sayi = $_POST['kelime_sayi'];
$celdirici_ad = $_POST['celdirici_ad'];
$celdirici_sayi = $_POST['celdirici_sayi'];
$yaziboyut = $_POST['buton_yazi_boyut'];
$durum = $_POST['durum'];
$id = $_POST['id'];

$sorgu = $db->prepare("UPDATE hizli_okuma_dogru_sayi_durum SET kelime_ad=:d5, kelime_sayi=:d7, celdirici_ad=:d3,celdirici_sayi=:d4,buton_yazi_boyut=:d9, durum=:d6 WHERE id=:id");
$update = $sorgu->execute(array(
    'd6' => $durum,
    'd5' => $kelime_ad,
    'd7' => $kelime_sayi,
    'd3' => $celdirici_ad,
    'd4' => $celdirici_sayi,
    'd9' => $yaziboyut,
    "id" => $id
));

echo "Başarılı";
