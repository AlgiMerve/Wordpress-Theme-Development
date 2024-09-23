<?php
include("../../../db.php");

$seviye = $_POST['buton_seviye'];
$hiz = $_POST['buton_hiz'];
$ikon = $_POST['buton_ikon'];
$durum = $_POST['durum'];

$id = $_POST['id'];

$sorgu = $db->prepare("UPDATE hizli_okuma_gozkg_durum SET  buton_seviye=:d7,buton_hiz=:d8, buton_ikon=:d9, durum=:d6 WHERE id=:id");
$update = $sorgu->execute(array(
    'd6' => $durum,
    'd7' => $seviye,
    'd8' => $hiz,
    'd9' => $ikon,
    "id" => $id
));

echo "Başarılı";
