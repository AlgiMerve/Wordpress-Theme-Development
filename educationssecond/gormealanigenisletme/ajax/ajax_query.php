<?php
include("../../../db.php");
$id = $_POST['id'];
$tablosor = $db->prepare("SELECT * FROM hizli_okuma_gorme_alani_durum WHERE id=:lid");
$tablosor->execute(array(
    'lid' => $id
));
$tablocek = $tablosor->fetch(PDO::FETCH_ASSOC);


if (isset($tablocek['id'])) {
    echo $tablocek['id'];
} else {
    echo "0";
}
