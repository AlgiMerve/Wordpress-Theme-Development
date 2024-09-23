<?php
include("../../../db.php");

$seviye = $_POST['buton_seviye'];
$yaziboyut = $_POST['buton_yazi_boyut'];
$durum = $_POST['durum'];
$id = $_POST['id'];

$sorgu = $db->prepare("UPDATE hizli_okuma_sayi_durum SET  buton_seviye=:d7, buton_yazi_boyut=:d9, durum=:d6 WHERE id=:id");
$update = $sorgu->execute(array(
    'd6' => $durum,
    'd7' => $seviye,
    'd9' => $yaziboyut,
    "id" => $id
));

echo "Başarılı";
