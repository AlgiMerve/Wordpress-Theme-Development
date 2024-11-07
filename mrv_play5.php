<?php
$words = [
    'AKADEMİ' => 'İMEDAKA',
    'CABA' => 'ABAC',
    'DİNLETİ' => 'İTELNİD',
    'Merve' => 'evreM'
];
// Sol ve sağ taraftaki kelimeleri ayırıyoruz
$leftWords = array_keys($words);
$rightWords = array_values($words);
// Sağ taraftaki kelimeleri rastgele karıştır
$shuffledRightWords = $rightWords;
shuffle($shuffledRightWords);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yansıma Oyunu</title>
    <link rel="stylesheet" href="mrv_play5_style.css">
</head>
<body>
<div class="container">
    <div class="box" id="leftBox">
        <!-- Sol tarafta kelimeler -->
        <div class="word-container">
            <?php foreach ($leftWords as $index => $word): ?>
                <div class="word-box" id="left<?= $index + 1 ?>" data-id="<?= $index + 1 ?>" data-type="left" data-match="<?= $index + 1 ?>"><?= $word ?></div>
            <?php endforeach; ?>
        </div>
    </div>
    <div class="box" id="rightBox">
        <!-- Sağ tarafta karışık yansımalar -->
        <div class="word-container">
            <?php foreach ($shuffledRightWords as $index => $word): ?>
                <div class="word-box" id="right<?= $index + 1 ?>" data-id="<?= $index + 1 ?>" data-type="right" data-match="<?= array_search($word, $rightWords) + 1 ?>"><?= $word ?></div>
            <?php endforeach; ?>
        </div>
    </div>
</div>
<script src="mrv_play5_script.js"></script>
</body>
</html>
