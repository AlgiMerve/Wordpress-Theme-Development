<?php
include("../../../db.php");

$id = $_POST['id_num'];
$hiz = $_POST['speed'];
$durum = "wait";

$sorgu = $db->prepare("INSERT INTO hizli_okuma_goz_ritim_durum SET id=:d0, durum=:d6, buton_hiz=:d8");
$insert = $sorgu->execute(array(
    'd0' => $id,
    'd6' => $durum,
    'd8' => $hiz
));

if ($insert) {
    echo true;
} else {
    echo false;
}
