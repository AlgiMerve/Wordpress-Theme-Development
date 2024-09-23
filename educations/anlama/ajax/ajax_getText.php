<?php
include("../../../db.php");


$tablosor = $db->prepare("SELECT * FROM hizli_okuma_metinleri ORDER BY RAND() LIMIT 1");
$tablosor->execute();
$tablocek = $tablosor->fetch(PDO::FETCH_ASSOC);
$baslik = $tablocek['metin_baslik'];
$metin = $tablocek['metin_icerik'];

echo $baslik . "_*_" . $metin . "_*_" . $tablocek["soru_1"] . "_*_" . $tablocek["soru_1_cevap_1"] . "_*_" . $tablocek["soru_1_cevap_2"] . "_*_" . $tablocek["soru_1_cevap_3"] . "_*_" . $tablocek["soru_1_cevap_4"] . "_*_" . $tablocek["soru_1_cevap_5"] . "_*_" . $tablocek["soru_dogru_cevap_1"] . "_*_" . $tablocek["soru_2"] . "_*_" . $tablocek["soru_2_cevap_1"] . "_*_" . $tablocek["soru_2_cevap_2"] . "_*_" . $tablocek["soru_2_cevap_3"] . "_*_" . $tablocek["soru_2_cevap_4"] . "_*_" . $tablocek["soru_2_cevap_5"] . "_*_" . $tablocek["soru_dogru_cevap_2"] . "_*_" . $tablocek["soru_3"] . "_*_" . $tablocek["soru_3_cevap_1"] . "_*_" . $tablocek["soru_3_cevap_2"] . "_*_" . $tablocek["soru_3_cevap_3"] . "_*_" . $tablocek["soru_3_cevap_4"] . "_*_" . $tablocek["soru_3_cevap_5"] . "_*_" . $tablocek["soru_dogru_cevap_3"] . "_*_" . $tablocek["soru_4"] . "_*_" . $tablocek["soru_4_cevap_1"] . "_*_" . $tablocek["soru_4_cevap_2"] . "_*_" . $tablocek["soru_4_cevap_3"] . "_*_" . $tablocek["soru_4_cevap_4"] . "_*_" . $tablocek["soru_4_cevap_5"] . "_*_" . $tablocek["soru_dogru_cevap_4"] . "_*_" . $tablocek["soru_5"] . "_*_" . $tablocek["soru_5_cevap_1"] . "_*_" . $tablocek["soru_5_cevap_2"] . "_*_" . $tablocek["soru_5_cevap_3"] . "_*_" . $tablocek["soru_5_cevap_4"] . "_*_" . $tablocek["soru_5_cevap_5"] . "_*_" . $tablocek["soru_dogru_cevap_5"];
