<?php
session_start(); // Oturum başlatılır

// Formdan gelen verileri kontrol et
if (!isset($_POST['topic']) || empty($_POST['topic'])) {
    echo "<script>alert('Geçersiz konu başlığı!')</script>";
    exit;
}

// Seçilen konu başlığını ve cevapları al
$topic = $_POST['topic']; // Formdan gelen konu
$answers = $_POST; // Formdan gelen tüm cevaplar (soru cevapları dahil)

// Her konu için doğru cevaplar
$dogruCevaplar = [
    'tamamlama' => [
        'answer0' => 'B', // 1. soru için doğru cevap
        'answer1' => 'A', // 2. soru için doğru cevap
        'answer2' => 'D', // 3. soru için doğru cevap
    ],
    'ikiye_bolme' => [
        'answer0' => 'A', // 1. soru için doğru cevap
        'answer1' => 'C', // 2. soru için doğru cevap
        'answer2' => 'C', // 2. soru için doğru cevap
    ],
    'cumle_ekleme' => [
        'answer0' => 'C', // 1. soru için doğru cevap
        'answer1' => 'D', // 2. soru için doğru cevap
        'answer2' => 'B', // 3. soru için doğru cevap
    ],
    'dusuncenin_akisi' => [
        'answer0' => 'D', // 1. soru için doğru cevap
        'answer1' => 'D', // 2. soru için doğru cevap
        'answer2' => 'E', // 3. soru için doğru cevap
    ],
    'metin_olusturma' => [
        'answer0' => 'C', // 1. soru için doğru cevap
        'answer1' => 'B', // 2. soru için doğru cevap
        'answer2' => 'A', // 3. soru için doğru cevap

    ],
    'yer_degistirme' => [
        'answer0' => 'B', // 1. soru için doğru cevap
        'answer1' => 'B', // 2. soru için doğru cevap
        'answer2' => 'C', // 3. soru için doğru cevap
    ],
    'düsüncenin_yonu' => [
        'answer0' => 'C', // 1. soru için doğru cevap
        'answer1' => 'D', // 2. soru için doğru cevap
        'answer2' => 'D', // 3. soru için doğru cevap
    ],
    'metin_karsılastirma' => [
        'answer0' => 'B', // 1. soru için doğru cevap
        'answer1' => 'B', // 2. soru için doğru cevap
        'answer2' => 'A', // 3. soru için doğru cevap
        'answer3' => 'B', // 4. soru için doğru cevap
    ]
    // Diğer konuların doğru cevaplarını burada tanımlayabilirsiniz
];

// Doğru ve yanlış sayısını sıfırla
$dogruSayisi = 0;
$yanlisSayisi = 0;

// Eğer seçilen konuya ait doğru cevaplar varsa
if (isset($dogruCevaplar[$topic])) {
    // Doğru cevaplarla kullanıcı cevaplarını karşılaştır
    foreach ($dogruCevaplar[$topic] as $index => $dogruCevap) {
        if (isset($answers[$index])) {
            // Kullanıcı cevabı ile doğru cevabı karşılaştır
            if ($answers[$index] === $dogruCevap) {
                $dogruSayisi++;
            } else {
                $yanlisSayisi++;
            }
        } else {
            $yanlisSayisi++; // Cevap verilmediyse yanlış sayılır
        }
    }

    // Oturuma doğru ve yanlış sayısını kaydet
    $_SESSION['correct'] = $dogruSayisi;
    $_SESSION['incorrect'] = $yanlisSayisi;

    // Sonuç mesajı oluştur
    $sonucMesaji = "Testi tamamladınız. Doğru sayınız: $dogruSayisi, Yanlış sayınız: $yanlisSayisi.";

    // Sonuç mesajını mesaj kutusu (alert) ile göster
    echo "<script>alert('$sonucMesaji');</script>";
} else {
    // Geçersiz konu başlığı hatası
    echo "<script>alert('Geçersiz konu başlığı!')</script>";
    exit;
}

?>

<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sonuçlar</title>
    <style>
        body {
            background-color: #2e3b42;
            color: #ffffff;
            font-family: Arial, sans-serif;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
        }
        .container {
            background-color: #c9a3a3;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }
        button {
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    </style>
</head>
<body>

<div class="container">
    <h1>Sonuçlar</h1>
    <p>Testi tamamladınız. Doğru sayınız: <?= $dogruSayisi ?>, Yanlış sayınız: <?= $yanlisSayisi ?>.</p>
    <a href="meaning-quiz.php"><button>Tekrar Başla</button></a> <!-- Yeniden teste başlama butonu -->
</div>

</body>
</html>
