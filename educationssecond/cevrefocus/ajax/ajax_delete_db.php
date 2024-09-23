<?php
include("../../../db.php");
$id = $_POST['id'];
$tablosor = $db->prepare("DELETE FROM takistoskop_durum WHERE id=:lis");
$tablosor->execute(array(
    'lis' => $id
));
$tablocek = $tablosor->fetch(PDO::FETCH_ASSOC);

echo "Tablo Silindi";
