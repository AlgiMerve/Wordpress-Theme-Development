<?php
include("../../../db.php");


$id = $_POST['id_num'];
$metin_sure = "";
$okunan_kelime_sayisi = "";
$okuma_hizi = "";
$dogru_sayisi = "";
$durum = "wait";

$sorgu = $db->prepare("INSERT INTO anlama_metinleri_durum SET id=:d0, metin_sure=:d1, okunan_kelime_sayisi=:d2,  okuma_hizi=:d5, dogru_sayisi=:d7, durum=:d6");
$insert = $sorgu->execute(array(
    'd0' => $id,
    'd1'=>$metin_sure,
    'd2'=>$okunan_kelime_sayisi,
    'd5' => $okuma_hizi,
    'd6' => $durum,
    'd7' => $dogru_sayisi,
));

if ($insert) {
    echo true;
} else {
    echo false;
}
