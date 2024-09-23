<?php
include("../../../db.php");

$id = $_POST['id_num'];
$seviye = $_POST['movement'];
$hiz = $_POST['speed'];
$ikon = $_POST['img'];
$durum = "wait";

$sorgu = $db->prepare("INSERT INTO hizli_okuma_gozkg_durum SET id=:d0, durum=:d6, buton_seviye=:d7, buton_hiz=:d8,buton_ikon=:d9");
$insert = $sorgu->execute(array(
    'd0' => $id,
    'd6' => $durum,
    'd7' => $seviye,
    'd9' => $ikon,
    'd8' => $hiz
));

if ($insert) {
    echo true;
} else {
    echo false;
}
