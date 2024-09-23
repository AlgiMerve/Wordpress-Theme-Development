<?php
include("../../../db.php");

$okunankelime = $_POST['okunan_kelime_sayisi'];
$seviye = $_POST['buton_seviye'];
$hiz = $_POST['buton_hiz'];
$durum = $_POST['durum'];
$id = $_POST['id'];

$sorgu = $db->prepare("UPDATE hizli_silinmeden_blog_durum SET  okunan_kelime_sayisi=:d5, buton_seviye=:d7, buton_hiz=:d8, durum=:d6 WHERE id=:id");
$update = $sorgu->execute(array(
    'd6' => $durum,
    'd5' => $okunankelime,
    'd7' => $seviye,
    'd8' => $hiz,
    "id" => $id
));

echo "Başarılı";
