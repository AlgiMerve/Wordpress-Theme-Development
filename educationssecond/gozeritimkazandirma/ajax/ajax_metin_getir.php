<?php
include("../../../db.php");

$tablosor = $db->prepare("SELECT * FROM hizli_okuma_metinleri ORDER BY RAND() LIMIT 1");

$tablosor->execute();

$tablocek = $tablosor->fetch(PDO::FETCH_ASSOC);

echo $tablocek['metin_baslik'] . "_*_" . $tablocek['metin_icerik'];
