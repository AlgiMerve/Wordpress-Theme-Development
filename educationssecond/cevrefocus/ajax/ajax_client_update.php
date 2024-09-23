<?php
include("../../../db.php");

$icerik=$_POST['metin_icerik'];
$hiz = $_POST['buton_hiz'];
$yaziboyut = $_POST['buton_yazi_boyut'];
$durum = $_POST['durum'];
$id = $_POST['id'];

$sorgu = $db->prepare("UPDATE takistoskop_durum SET  metin_icerik=:d5, buton_hiz=:d8,buton_yazi_boyut=:d9, durum=:d6 WHERE id=:id");
$update = $sorgu->execute(array(
    'd6' => $durum,
    'd5' => $icerik,
    'd8' => $hiz,
    'd9' => $yaziboyut,
    "id" => $id
));

echo "Başarılı";
