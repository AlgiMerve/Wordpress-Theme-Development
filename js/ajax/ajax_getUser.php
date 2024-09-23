<?php
include("../../db.php");

$bayi_kod = $_POST['bayi_kod'];

$tablosor = $db->prepare("SELECT DISTINCT ad_soyad FROM hizli_okuma_metinleri_soru_cevap WHERE bayi_kod=:bayi");

$tablosor->execute(array(
    'bayi' => $bayi_kod
));

while ($tablocek = $tablosor->fetch(PDO::FETCH_ASSOC)) {

    echo $tablocek['ad_soyad']."_*_";
}
