<?php
include("../../../db.php");


$dogru_sayisi = $_POST['dogru_sayisi'];
$yanlis_sayisi = $_POST['yanlis_sayisi'];
$buton_seviye = $_POST['buton_seviye'];
$buton_hiz = $_POST['buton_hiz'];
$durum = $_POST['durum'];
$id = $_POST['id'];

$sorgu = $db->prepare("UPDATE hizli_okuma_farkli_bul_durum SET dogru_sayisi=:d5, yanlis_sayisi=:d7, buton_seviye=:d3,buton_hiz=:d4, durum=:d6 WHERE id=:id");
$update = $sorgu->execute(array(
    'd6' => $durum,
    'd5' => $dogru_sayisi,
    'd7' => $yanlis_sayisi,
    'd3' => $buton_seviye,
    'd4' => $buton_hiz,
    "id" => $id
));

echo "Başarılı";
