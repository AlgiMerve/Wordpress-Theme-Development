<?php
session_start(); // Oturumu başlat

// İlk başta doğru ve yanlış sayısını sıfırla
$_SESSION['correct'] = 0;
$_SESSION['incorrect'] = 0;
?>

<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Okuma ve Anlama Testi</title>
    <style>
        body {
            background-color: #2e3b42;
            color: #ffffff;
            font-family: Arial, sans-serif;
            height: 100vh; /* Yüksekliği tam ekran yapar */
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
        }
        .container {
            background-color: #c9a3a3;
            padding: 20px;
            border-radius: 10px;
            text-align: center; /* İçeriği ortalar */
        }
        h1 {
            text-align: center;
        }
        button {
            display: block;
            margin: 20px auto;
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
    <h1>YAPI DEDEKTİFLİĞİ </h1>
    <form method="post" action="structure-sorular.php">
        <button type="submit" name="topic" value="tamamlama">Tamamlama</button>
        <button type="submit" name="topic" value="ikiye_bolme">İkiye Bölme</button>
        <button type="submit" name="topic" value="cumle_ekleme">Cümle Ekleme</button>
        <button type="submit" name="topic" value="dusuncenin_akisi">Düşüncenin Akışını Bozan Cümle</button>
        <button type="submit" name="topic" value="metin_olusturma">Metin Oluşturma </button>
        <button type="submit" name="topic" value="yer_degistirme">Yer Değiştirme </button>
        <button type="submit" name="topic" value="dusuncenin_yonu">Düşüncenin Yönünün Değişmeye Başladığı Cümle </button>
        <button type="submit" name="topic" value="metin_karsılastirma">Metin Karşılaştırma </button>

    </form>
</div>

</body>
</html>
