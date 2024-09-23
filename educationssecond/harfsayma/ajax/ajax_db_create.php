<?php
include("../../../db.php");

$id = $_POST['id_num'];

$kelime_ad = "";
$kelime_sayi = "";
$celdirici_ad = "";
$celdirici_sayi = "";
$yaziboyut = $_POST['fontsize'];
$durum = "wait";

$sorgu = $db->prepare("INSERT INTO hizli_okuma_dogru_sayi_durum SET id=:d0, durum=:d6, kelime_ad=:d5, kelime_sayi=:d7, celdirici_ad=:d3, celdirici_sayi=:d4, buton_yazi_boyut=:d9");
$insert = $sorgu->execute(array(
    'd0' => $id,
    'd5' => $kelime_ad,
    'd7' => $kelime_sayi,
    'd3' => $celdirici_ad,
    'd4' => $celdirici_sayi,
    'd6' => $durum,
    'd9' => $yaziboyut
));

if ($insert) {
    echo true;
} else {
    echo false;
}
