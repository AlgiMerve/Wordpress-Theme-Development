<?php
include("../../../../db.php");


$seviye = $_POST["level"];
$sutun = $_POST["column"];
$limit;
if ($sutun == 3) {
    $limit = 42;
} else {
    $limit = 28;
}

$tablosor = $db->prepare("SELECT * FROM hizli_okuma_kelimeler WHERE kelime_seviye=? ORDER BY RAND() LIMIT $limit");

$tablosor->execute(array($seviye));

while ($tablocek = $tablosor->fetch(PDO::FETCH_ASSOC)) {
    echo $tablocek['kelime_icerik'] . "_*_";
}
