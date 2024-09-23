<?php
include("../../../db.php");

$okunankelime = $_POST['okunan_kelime_sayisi'];
$sure = $_POST['metin_sure'];
$seviye = $_POST['buton_seviye'];
$hiz = $_POST['buton_hiz'];
$yaziboyut = $_POST['buton_yazi_boyut'];
$durum = $_POST['durum'];
$id = $_POST['id'];

$sorgu = $db->prepare("UPDATE hizli_okuma_goz_cevikligi_durum SET  okunan_kelime_sayisi=:d5, metin_sure=:d4, buton_seviye=:d7, buton_hiz=:d8,buton_yazi_boyut=:d9, durum=:d6 WHERE id=:id");
$update = $sorgu->execute(array(
    'd6' => $durum,
    'd5' => $okunankelime,
    'd4' => $sure,
    'd7' => $seviye,
    'd8' => $hiz,
    'd9' => $yaziboyut,
    "id" => $id
));

echo "Başarılı";
