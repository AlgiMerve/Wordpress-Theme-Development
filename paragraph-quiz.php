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
            background-color: #476b7a; /* Mavi arka plan  #1e90ff*/
            color: #ffffff; /* Beyaz yazı rengi */
            font-family: Arial, sans-serif;
            height: 100vh; /* Yüksekliği tam ekran yapar */
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
        }
        .container {
            background-color: #2c3e50;
            padding: 20px;
            border-radius: 10px;
            text-align: center; /* İçeriği ortalar */
            max-width: 400px;
            width: 100%;
        }
        h1 {
            text-align: center;
            font-size: 24px;
            margin-bottom: 20px;
        }
        button {
            display: block;
            width: 100%; /* Buton genişliği tam genişlik */
            padding: 20px; /* Butonların boyutunu büyüt */
            margin: 10px 0;
            background-color: #ffffff;
            color: #1e90ff;
            border: none;
            border-radius: 5px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        button:hover {
            background-color: #ddd;
        }
    </style>
</head>
<body>

<div class="container">
    <h1>PARAGRAF KONUŞUYOR</h1>
    <form method="post" action="paragraph-sorular.php">
        <button type="submit" name="topic" value="dil_anlatim">Dil ve Anlatım Özellikleri</button>
        <button type="submit" name="topic" value="anlatici_tur">Anlatıcı Türleri</button>
        <button type="submit" name="topic" value="anlatici_bakis">Anlatıcı Türleri Bakış Açıları</button>
        <button type="submit" name="topic" value="dusunceyi_gelistirme">Düşünceyi Geliştirme Yolları</button>
        <button type="submit" name="topic" value="anlatim_teknik">Anlatım Teknikleri</button>
        <button type="submit" name="topic" value="performans_olc">Performansı Ölç</button>
    </form>
</div>

</body>
</html>
