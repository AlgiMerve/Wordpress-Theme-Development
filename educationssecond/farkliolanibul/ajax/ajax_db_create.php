<?php
include("../../../db.php");

$id = $_POST['id_num'];

$dogru_sayisi = "0";
$yanlis_sayisi = "0";
$buton_seviye = $_POST['buton_seviye'];
$buton_hiz = $_POST['buton_hiz'];
$durum = "wait";

$sorgu = $db->prepare("INSERT INTO hizli_okuma_farkli_bul_durum SET id=:d0, durum=:d6, dogru_sayisi=:d5, yanlis_sayisi=:d7, buton_seviye=:d3, buton_hiz=:d4");
$insert = $sorgu->execute(array(
    'd0' => $id,
    'd5' => $dogru_sayisi,
    'd7' => $yanlis_sayisi,
    'd3' => $buton_seviye,
    'd4' => $buton_hiz,
    'd6' => $durum,
));

if ($insert) {
    echo true;
} else {
    echo false;
}
