<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kelime Bulma Oyunu</title>
    <style>
        .word {
            padding: 10px;
            margin: 0px;
            display: inline-block;
            cursor: pointer;
            border: 1px solid #ccc;
            transition: background-color 0.3s;
            width: 100px; /* Sabit genişlik */
            text-align: center; /* Metni ortala */
        }

        .correct {
            background-color: green;
            color: white;
        }

        .wrong {
            background-color: red;
            color: white;
        }

        #row1, #row2, #row3, #row4, #row5, #row6, #row7, #row8 {
            display: flex;
            justify-content: center;
        }

        #timer {
            font-size: 24px;
            text-align: center;
            margin: 20px 0;
        }

        #alert {
            display: none;
            text-align: center;
            font-size: 24px;
            color: red;
            font-weight: bold;
        }
        
        #result {
            text-align: center;
            font-size: 18px;
            margin-top: 10px;
            background-color: green; /* Yeşil arka plan */
            color: white; /* Beyaz yazı rengi */
            padding: 10px;
            border-radius: 5px; /* Köşeleri yuvarlat */
        }
    </style>
</head>
<body>
    <h1>Kelime Bulma Oyunu</h1>
    <div id="wordGrid">
        <div id="row1">
            <?php
            // 1. Satır Kelimeleri
            $wordsRow1 = ["el", "verip", "arkadaş", "bulmuştu", "ele", "iki", "ağaçları", "suladı"];
            $correctWordRow1 = "bulmuştu"; // 1. Satır için doğru kelime

            // 1. Satır Kelimeleri Ekrana Bastır
            foreach ($wordsRow1 as $word) {
                echo "<span class='word' data-word='$word' data-correct='$correctWordRow1'>$word</span>";
            }
            ?>
        </div>
        <div id="row2">
            <?php
            // 2. Satır Kelimeleri
            $wordsRow2 = ["oyunun", "anlamıyor", "birlikte", "kurallarını", "Ali", "küçük", "için", "olduğu"];
            $correctWordRow2 = "birlikte"; // 2. Satır için doğru kelime

            // 2. Satır Kelimeleri Ekrana Bastır
            foreach ($wordsRow2 as $word) {
                echo "<span class='word' data-word='$word' data-correct='$correctWordRow2'>$word</span>";
            }
            ?>
        </div>
        <div id="row3">
            <?php
            // 3. Satır Kelimeleri
            $wordsRow3 = ["burnuna", "kurabiyelerin", "geldiğinde", "gelmişti", "en sevdiği", "oynuyor", "kokusu", "eve"];
            $correctWordRow3 = "oynuyor"; // 3. Satır için doğru kelime

            // 3. Satır Kelimeleri Ekrana Bastır
            foreach ($wordsRow3 as $word) {
                echo "<span class='word' data-word='$word' data-correct='$correctWordRow3'>$word</span>";
            }
            ?>
        </div>
        <div id="row4">
            <?php
            // 4. Satır Kelimeleri
            $wordsRow4 = ["Öğretmeni", "hiç", "aksattığını", "görmemişti", "kağıt", "okul", "ödevlerini", "Ahmet'in"];
            $correctWordRow4 = "kağıt"; // 4. Satır için doğru kelime

            // 4. Satır Kelimeleri Ekrana Bastır
            foreach ($wordsRow4 as $word) {
                echo "<span class='word' data-word='$word' data-correct='$correctWordRow4'>$word</span>";
            }
            ?>
        </div>
        <div id="row5">
            <?php
            // 5. Satır Kelimeleri
            $wordsRow5 = ["ekmek", "sonra", "oturur", "sabah", "annesini", "ilk önce", "kahvaltıya", "öper"];
            $correctWordRow5 = "ekmek"; // 5. Satır için doğru kelime

            // 5. Satır Kelimeleri Ekrana Bastır
            foreach ($wordsRow5 as $word) {
                echo "<span class='word' data-word='$word' data-correct='$correctWordRow5'>$word</span>";
            }
            ?>
        </div>
        <div id="row6">
            <?php
            // 6. Satır Kelimeleri
            $wordsRow6 = ["yaşlı", "bekliyorken", "amca", "geldi", "bir", "durakta", "yapacak", "yanına"];
            $correctWordRow6 = "yapacak"; // 6. Satır için doğru kelime

            // 6. Satır Kelimeleri Ekrana Bastır
            foreach ($wordsRow6 as $word) {
                echo "<span class='word' data-word='$word' data-correct='$correctWordRow6'>$word</span>";
            }
            ?>
        </div>
        <div id="row7">
            <?php
            // 7. Satır Kelimeleri
            $wordsRow7 = ["hafta sonu", "izlemeye", "gideceğiz", "beklediğim", "sabırsızlıkla", "filmi", "bardak", "gideceğiz"];
            $correctWordRow7 = "bardak"; // 7. Satır için doğru kelime

            // 7. Satır Kelimeleri Ekrana Bastır
            foreach ($wordsRow7 as $word) {
                echo "<span class='word' data-word='$word' data-correct='$correctWordRow7'>$word</span>";
            }
            ?>
        </div>
        <div id="row8">
            <?php
            // 8. Satır Kelimeleri
            $wordsRow8 = ["baharda", "çiçeklerle", "buralar", "kokarlar", "rengarenk", "dolar", "mis gibi", "bisikletle"];
            $correctWordRow8 = "bisikletle"; // 8. Satır için doğru kelime

            // 8. Satır Kelimeleri Ekrana Bastır
            foreach ($wordsRow8 as $word) {
                echo "<span class='word' data-word='$word' data-correct='$correctWordRow8'>$word</span>";
            }
            ?>
        </div>
    </div>

    <!-- Sayaç, Uyarı ve Sonuç Alanı -->
    <div id="timer">Süre: 1:00</div>
    <div id="alert">
        Süre Bitmiştir!
        <div id="result"></div>
    </div>

    <script>
        // Kelime seçimi işlemi
        document.querySelectorAll('.word').forEach(function(wordElement) {
            wordElement.addEventListener('click', function() {
                let selectedWord = this.getAttribute('data-word');
                let correctWord = this.getAttribute('data-correct');

                if (selectedWord === correctWord) {
                    this.classList.add('correct');
                } else {
                    this.classList.add('wrong');
                    setTimeout(() => {
                        this.classList.remove('wrong');
                    }, 1000);
                }
            });
        });

        // Sayaç İşlemi
        let timerElement = document.getElementById('timer');
        let alertElement = document.getElementById('alert');
        let resultElement = document.getElementById('result');
        let timeLeft = 60; // 60 saniye

        function updateTimer() {
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            timerElement.textContent = `Süre: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerElement.style.display = 'none';
                alertElement.style.display = 'block';

                // Yeşil kelimeleri say ve sonuç olarak göster
                let correctWordsCount = document.querySelectorAll('.correct').length;
                resultElement.textContent = `Doğru bulunan kelime sayisi: ${correctWordsCount}`;
            }
            timeLeft--;
        }

        let timerInterval = setInterval(updateTimer, 1000);
    </script>
</body>
</html>
