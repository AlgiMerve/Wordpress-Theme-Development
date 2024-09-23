<?php
include("../../db.php");

$tablo_ad = $_POST['tablo'];
$bayi_kod = $_POST['bayi_kod'];

$tablosor = $db->prepare("SELECT DISTINCT ad_soyad FROM $tablo_ad WHERE bayi_kod=:bayi");

$tablosor->execute(array(
    'bayi' => $bayi_kod
));

while ($tablocek = $tablosor->fetch(PDO::FETCH_ASSOC)) {

    echo $tablocek['ad_soyad']."_*_";
}
