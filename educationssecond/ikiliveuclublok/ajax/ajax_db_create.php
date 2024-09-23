<?php
include("../../../db.php");

$id = $_POST['id_num'];
$seviye = $_POST['movement'];
$hiz = $_POST['speed'];
$sutun = $_POST['column'];
$durum = "wait";

$sorgu = $db->prepare("INSERT INTO hizli_okuma_ikili_uclu_blok_durum SET id=:d0, durum=:d6, buton_seviye=:d7, buton_hiz=:d8, buton_sutun=:d5");
$insert = $sorgu->execute(array(
    'd0' => $id,
    'd6' => $durum,
    'd7' => $seviye,
    'd8' => $hiz,
    'd5' => $sutun
));

if ($insert) {
    echo true;
} else {
    echo false;
}
