<?php
include("../../../db.php");

$id = $_POST['id_num'];
$renk = "";
$renk_kod = "";
$hiz = $_POST['speed'];
$yaziboyut = $_POST['fontsize'];
$durum = "wait";

$sorgu = $db->prepare("INSERT INTO hizli_okuma_dogru_renk_durum SET id=:d0, durum=:d6, renk_ad=:d5, renk_kod=:d7, buton_hiz=:d8,buton_yazi_boyut=:d9");
$insert = $sorgu->execute(array(
    'd0' => $id,
    'd5' => $renk,
    'd7' => $renk_kod,
    'd6' => $durum,
    'd8' => $hiz,
    'd9' => $yaziboyut
));

if ($insert) {
    echo true;
} else {
    echo false;
}
