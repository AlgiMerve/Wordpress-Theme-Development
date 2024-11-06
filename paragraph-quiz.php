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
    <h1>PARAGRAF KONUŞUYOR </h1>
    <form method="post" action="paragraph-sorular.php">
        <button type="submit" name="topic" value="dil_anlatim">Dil ve Anlatım Özellikleri</button>
        <button type="submit" name="topic" value="anlatici_tur">Anlatıcı Türleri</button>
        <button type="submit" name="topic" value="anlatici_bakis">Anlatıcı Türleri Bakış Açıları</button>
        <button type="submit" name="topic" value="dusunceyi_gelistirme">Düşünceyi Geliştirme Yolları</button>
        <button type="submit" name="topic" value="anlatim_teknik">Anlatım Teknikleri</button>
    </form>
</div>

</body>
</html>
