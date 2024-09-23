<?php
include("../../db.php");

$dt=$_POST['dt'];

$tablosor = $db->prepare("SELECT * FROM ogrenci_tablosu WHERE kullanici_ad=:dat");

$tablosor->execute(array(
    'dat' => $dt,
));

$tablocek = $tablosor->fetch(PDO::FETCH_ASSOC);

if ($tablocek > 0) {
    echo  true;
} else {
    echo false;
}
