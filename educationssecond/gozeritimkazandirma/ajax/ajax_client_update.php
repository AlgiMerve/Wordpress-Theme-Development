<?php
include("../../../db.php");

$hiz = $_POST['buton_hiz'];
$durum = $_POST['durum'];
$id = $_POST['id'];

$sorgu = $db->prepare("UPDATE hizli_okuma_goz_ritim_durum SET buton_hiz=:d8, durum=:d6 WHERE id=:id");
$update = $sorgu->execute(array(
    'd6' => $durum,
    'd8' => $hiz,
    'id' => $id
));

echo "Başarılı";
