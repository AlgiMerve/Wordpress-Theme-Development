<?php
include("../../../db.php");
$id = $_POST['id'];
$tablosor = $db->prepare("DELETE FROM hizli_okuma_farkli_bul_durum WHERE id=:lis");
$tablosor->execute(array(
    'lis' => $id
));
$tablocek = $tablosor->fetch(PDO::FETCH_ASSOC);

echo "Tablo Silindi";
