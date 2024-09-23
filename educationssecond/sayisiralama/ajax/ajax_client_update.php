<?php
include("../../../db.php");


$sure = $_POST['metin_sure'];
$seviye = $_POST['buton_seviye'];
$yaziboyut = $_POST['buton_yazi_boyut'];
$sonisaret = $_POST['son_isaret_sayisi'];
$durum = $_POST['durum'];
$id = $_POST['id'];

$sorgu = $db->prepare("UPDATE hizli_okuma_sayi_durum SET   metin_sure=:d4, son_isaret_sayisi=:d8, buton_seviye=:d7,buton_yazi_boyut=:d9, durum=:d6 WHERE id=:id");
$update = $sorgu->execute(array(
    'd6' => $durum,
    'd4' => $sure,
    'd7' => $seviye,
    'd8' => $sonisaret,
    'd9' => $yaziboyut,
    "id" => $id
));

echo "Başarılı";
