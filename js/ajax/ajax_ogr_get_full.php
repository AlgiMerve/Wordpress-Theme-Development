<?php
include("../../db.php");


$bayi_kod = $_POST['bkod'];

$tablosor = $db->prepare("SELECT * FROM ogrenci_tablosu WHERE bayi_kod=:bkod");

$tablosor->execute(array(
    'bkod' => $bayi_kod
));

while ($tablocek = $tablosor->fetch(PDO::FETCH_ASSOC)) {

    echo  $tablocek["ogr_ad_soyad"] . "_*_" . $tablocek["ogr_tc"]."_*_";
}
