<?php
include("../../../db.php");

$seviye = $_POST['getSeviye'];

$tablosor = $db->prepare("SELECT * FROM temel_egitimler WHERE id=?");
$tablosor->execute(array(
    $seviye
));

$tablocek = $tablosor->fetch(PDO::FETCH_ASSOC);

echo $tablocek['url'];
