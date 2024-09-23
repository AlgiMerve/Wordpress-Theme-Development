<?php
include("../../../db.php");

$seviye = $_POST['buton_seviye'];
$hiz = $_POST['buton_hiz'];
$durum = $_POST['durum'];
$sutun = $_POST['buton_sutun'];
$id = $_POST['id'];

$sorgu = $db->prepare("UPDATE hizli_okuma_ikili_uclu_blok_durum SET  buton_seviye=:d7, buton_hiz=:d8, buton_sutun=:d5, durum=:d6 WHERE id=:id");
$update = $sorgu->execute(array(
    'd6' => $durum,
    'd7' => $seviye,
    'd8' => $hiz,
    'd5' => $sutun,
    "id" => $id
));

echo "Başarılı";
