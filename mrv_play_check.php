<?php
header('Content-Type: text/html; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Eğer found_words değeri varsa bunu explode ile diziye çevir
    $foundWords = isset($_POST['found_words']) ? explode(',', $_POST['found_words']) : [];

    echo "<h2>Sonuç</h2>";
    if (!empty($foundWords)) {
        echo "<p>Bulduğunuz kelimeler:</p>";
        foreach ($foundWords as $word) {
            echo "<p>" . htmlspecialchars($word, ENT_QUOTES, 'UTF-8') . "</p>";
        }
        echo "<p>Toplam Kelime: " . count($foundWords) . "</p>";
    } else {
        echo "<p>Hiç kelime bulunamadı.</p>";
        echo "<p>Toplam Kelime: 0</p>";
    }
} else {
    echo "<p>Geçersiz istek.</p>";
}
