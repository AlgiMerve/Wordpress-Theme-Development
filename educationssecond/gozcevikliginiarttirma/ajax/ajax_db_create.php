<?php
include("../../../db.php");

$id = $_POST['id_num'];
$okunankelime = "0";
$metin_sure = "0";
$seviye = $_POST['movement'];
$hiz = $_POST['speed'];
$yaziboyut = $_POST['fontsize'];
$durum = "wait";

$sorgu = $db->prepare("INSERT INTO hizli_okuma_goz_cevikligi_durum SET id=:d0, okunan_kelime_sayisi=:d5,metin_sure=:d4, durum=:d6, buton_seviye=:d7, buton_hiz=:d8,buton_yazi_boyut=:d9");
$insert = $sorgu->execute(array(
    'd0' => $id,
    'd5' => $okunankelime,
    'd4' => $metin_sure,
    'd6' => $durum,
    'd7' => $seviye,
    'd8' => $hiz,
    'd9' => $yaziboyut
));

if ($insert) {
    echo true;
} else {
    echo false;
}
