<?php
include("../../../db.php");

$id = $_POST['id_num'];
$seviye = $_POST['movement'];
$hiz = $_POST['speed'];
$mesafe = $_POST['distance'];
$yaziboyut = $_POST['fontsize'];
$durum = "wait";

$sorgu = $db->prepare("INSERT INTO hizli_okuma_satir_boyu_durum SET id=:d0, durum=:d6, buton_seviye=:d7, buton_hiz=:d8, buton_uzaklik=:d9, buton_yazi_boyut=:d5");
$insert = $sorgu->execute(array(
    'd0' => $id,
    'd6' => $durum,
    'd7' => $seviye,
    'd9' => $mesafe,
    'd5' => $yaziboyut,
    'd8' => $hiz
));

if ($insert) {
    echo true;
} else {
    echo false;
}
