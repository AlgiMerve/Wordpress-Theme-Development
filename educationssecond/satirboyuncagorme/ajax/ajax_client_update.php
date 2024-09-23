<?php
include("../../../db.php");

$seviye = $_POST['buton_seviye'];
$hiz = $_POST['buton_hiz'];
$mesafe = $_POST['buton_uzaklik'];
$yaziboyut = $_POST['buton_yazi_boyut'];
$durum = $_POST['durum'];

$id = $_POST['id'];

$sorgu = $db->prepare("UPDATE hizli_okuma_satir_boyu_durum SET  buton_seviye=:d7,buton_hiz=:d8, buton_uzaklik=:d9, buton_yazi_boyut=:d5, durum=:d6 WHERE id=:id");
$update = $sorgu->execute(array(
    'd6' => $durum,
    'd7' => $seviye,
    'd8' => $hiz,
    'd9' => $mesafe,
    'd5' => $yaziboyut,
    "id" => $id
));

echo "Başarılı";
