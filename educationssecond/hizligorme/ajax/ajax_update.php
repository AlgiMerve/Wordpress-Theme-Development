<?php
include("../../../db.php");

$seviye = $_POST['buton_seviye'];
$hiz = $_POST['buton_hiz'];
$yaziboyut = $_POST['buton_yazi_boyut'];
$durum = $_POST['durum'];
$id = $_POST['id'];

$sorgu = $db->prepare("UPDATE hizli_okuma_blog_durum SET  buton_seviye=:d7, buton_hiz=:d8, buton_yazi_boyut=:d4, durum=:d6 WHERE id=:id");
$update = $sorgu->execute(array(
    'd6' => $durum,
    'd7' => $seviye,
    'd8' => $hiz,
    'd4' => $yaziboyut,
    "id" => $id
));

echo "Başarılı";
