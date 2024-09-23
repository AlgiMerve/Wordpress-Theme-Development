<?php
include("../../../db.php");

$id = $_POST['id_num'];
$metin_sure = "0";
$son_isaret_sayisi = "1";
$seviye = $_POST['movement'];
$yaziboyut=$_POST['fontsize'];
$durum = "wait";

$sorgu = $db->prepare("INSERT INTO hizli_okuma_sayi_durum SET id=:d0, metin_sure=:d4, durum=:d6, buton_seviye=:d7, son_isaret_sayisi=:d8,buton_yazi_boyut=:d9");
$insert = $sorgu->execute(array(
    'd0' => $id,
    'd4' => $metin_sure,
    'd6' => $durum,
    'd7' => $seviye,
    'd8' => $son_isaret_sayisi,
    'd9' => $yaziboyut
));

if ($insert) {
    echo true;
} else {
    echo false;
}
