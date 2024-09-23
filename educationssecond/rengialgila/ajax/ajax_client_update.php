<?php
include("../../../db.php");

$renk = $_POST['renk_ad'];
$renk_kod = $_POST['renk_kod'];
$hiz = $_POST['buton_hiz'];
$yaziboyut = $_POST['buton_yazi_boyut'];
$durum = $_POST['durum'];
$id = $_POST['id'];

$sorgu = $db->prepare("UPDATE hizli_okuma_dogru_renk_durum SET renk_ad=:d5, renk_kod=:d7, buton_hiz=:d8,buton_yazi_boyut=:d9, durum=:d6 WHERE id=:id");
$update = $sorgu->execute(array(
    'd6' => $durum,
    'd5' => $renk,
    'd7' => $renk_kod,
    'd8' => $hiz,
    'd9' => $yaziboyut,
    "id" => $id
));

echo "Başarılı";
