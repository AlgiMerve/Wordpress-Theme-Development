<?php
include("../../../db.php");
$seviye = $_POST['seviye_kelime'];
$tablosor = $db->prepare("SELECT * FROM hizli_okuma_kelimeler WHERE kelime_seviye=? ORDER BY RAND() LIMIT 2");
$tablosor->execute(array($seviye));

$kelimeler = array();
$i = 0;
while ($tablocek = $tablosor->fetch(PDO::FETCH_ASSOC)) {
    $kelimeler[$i] = $tablocek['kelime_icerik'];
    $i++;
}

echo $kelimeler[0] . "_?_" . $kelimeler[1];
