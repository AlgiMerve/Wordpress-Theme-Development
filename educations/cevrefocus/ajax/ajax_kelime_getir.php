<?php
include("../../../db.php");
$seviye = $_POST["seviye"];
$tablosor = $db->prepare("SELECT * FROM hizli_okuma_kelimeler WHERE kelime_seviye=? ORDER BY RAND() LIMIT 1");
$tablosor->execute(array($seviye));
$tablocek = $tablosor->fetch(PDO::FETCH_ASSOC);
$kelime = $tablocek['kelime_icerik'];

echo $kelime;
