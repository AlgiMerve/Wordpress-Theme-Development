<?php
include("../../../db.php");

$id = $_POST['id_num'];
$icerik = "";
$hiz = $_POST['speed'];
$yaziboyut = $_POST['fontsize'];
$durum = "wait";

$sorgu = $db->prepare("INSERT INTO takistoskop_durum SET id=:d0, durum=:d6, metin_icerik=:d5, buton_hiz=:d8,buton_yazi_boyut=:d9");
$insert = $sorgu->execute(array(
    'd0' => $id,
    'd5' => $icerik,
    'd6' => $durum,
    'd8' => $hiz,
    'd9' => $yaziboyut
));

if ($insert) {
    echo true;
} else {
    echo false;
}
