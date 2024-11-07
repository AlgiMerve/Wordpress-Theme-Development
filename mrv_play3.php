<?php
$leftExpressions = [];
$rightExpressions = [];
// 10 rastgele işlem oluştur ve sağ tarafta aynı sonuca sahip farklı işlemler oluştur
for ($i = 0; $i < 9; $i++) {
    $num1 = rand(0, 9);
    $num2 = rand(0, 9);
    // Sol taraftaki işlemler (Toplama, Çıkarma, Çarpma)
    $leftOperations = [
        "$num1 + $num2" => $num1 + $num2,
        "$num1 - $num2" => $num1 - $num2,
        "$num1 * $num2" => $num1 * $num2
    ];
    // Sol tarafa bir işlem seç
    $leftExpression = array_rand($leftOperations);
    $leftResult = $leftOperations[$leftExpression];
    // Sağ tarafta aynı sonuca sahip farklı bir işlem oluştur
    do {
        $num3 = rand(0, 9);
        $num4 = rand(0, 9);
        // Sağ taraftaki işlemler (Toplama, Çıkarma, Çarpma) - Sol işlemi çıkartıyoruz
        $rightOperations = [
            "$num3 + $num4" => $num3 + $num4,
            "$num3 - $num4" => $num3 - $num4,
            "$num3 * $num4" => $num3 * $num4
        ];
        // Eğer sol işlemle aynıysa çıkar
        foreach ($rightOperations as $key => $value) {
            if ($key === $leftExpression) {
                unset($rightOperations[$key]);
            }
        }
        // Yeni sağ işlem seç
        $rightExpression = array_rand($rightOperations);
        $rightResult = $rightOperations[$rightExpression];
    } while ($rightResult !== $leftResult); // Aynı sonuç olana kadar tekrar dene
    $leftExpressions[$i] = ['expression' => $leftExpression, 'result' => $leftResult];
    $rightExpressions[$i] = ['expression' => $rightExpression, 'result' => $rightResult];
}
// Sağ taraftaki işlemleri karıştır
shuffle($rightExpressions);
?>
<!DOCTYPE html>
<html lang="tr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eşleştirme Oyunu</title>
    <link rel="stylesheet" href="mrv_play3_styles.css">
    <style>
 
    </style>
</head>

<body>
    <div class="container">
        <div id="timer">Süre: 60 saniye</div>
        <div class="column" id="left-column">
            <?php foreach ($leftExpressions as $mrv_play3 => $item): ?>
                <div class="rectangle" data-mrv_play3="<?= $mrv_play3 ?>" data-result="<?= $item['result'] ?>"><?= $item['expression'] ?></div>
            <?php endforeach; ?>
        </div>
        <div class="column" id="right-column">
            <?php foreach ($rightExpressions as $mrv_play3 => $item): ?>
                <div class="rectangle" data-mrv_play3="<?= $mrv_play3 ?>" data-result="<?= $item['result'] ?>"><?= $item['expression'] ?></div>
            <?php endforeach; ?>
        </div>

    </div>


    <script>
        let selectedLeft = null;
        const leftItems = document.querySelectorAll('#left-column .rectangle');
        const rightItems = document.querySelectorAll('#right-column .rectangle');
        const timerElement = document.getElementById('timer');
        let timeLeft = 60; // 60 saniye (1 dakika)
        let gameOver = false; // Oyun durumu bayrağı

        // Zamanlayıcıyı başlat
        const timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = `Süre: ${timeLeft} saniye`;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                showTimeoutMessage();
                gameOver = true; // Oyun bitti
            }
        }, 1000);

        leftItems.forEach(item => {
            item.addEventListener('click', function() {
                if (gameOver) return; // Süre bittiyse tıklama işlemini iptal et
                if (selectedLeft) {
                    selectedLeft.classList.remove('selected');
                }
                selectedLeft = this;
                selectedLeft.classList.add('selected');
            });
        });

        rightItems.forEach(item => {
            item.addEventListener('click', function() {
                if (gameOver) return; // Süre bittiyse tıklama işlemini iptal et
                if (selectedLeft) {
                    if (selectedLeft.getAttribute('data-result') === this.getAttribute('data-result')) {
                        selectedLeft.classList.add('correct');
                        this.classList.add('correct');
                    } else {
                        selectedLeft.classList.add('incorrect');
                        this.classList.add('incorrect');

                        let currentLeft = selectedLeft;
                        let currentRight = this;

                        setTimeout(() => {
                            currentLeft.classList.remove('incorrect');
                            currentRight.classList.remove('incorrect');
                        }, 2000);
                    }
                    selectedLeft.classList.remove('selected');
                    selectedLeft = null;
                }
            });
        });

        function showTimeoutMessage() {
            // Mesaj gösterilecek bir modal veya div ekle
            const messageDiv = document.createElement('div');
            messageDiv.textContent = "Süreniz bitmiştir!";
            messageDiv.style.position = 'fixed';
            messageDiv.style.top = '50%';
            messageDiv.style.left = '50%';
            messageDiv.style.transform = 'translate(-50%, -50%)';
            messageDiv.style.backgroundColor = 'black';
            messageDiv.style.color = 'red'; // Yazı rengi kırmızı
            messageDiv.style.fontWeight = 'bold'; // Kalın font
            messageDiv.style.fontSize = '24px'; // Yazı boyutunu artırma
            messageDiv.style.padding = '20px';
            messageDiv.style.borderRadius = '10px';
            messageDiv.style.zIndex = '1000';

            document.body.appendChild(messageDiv);
        }
    </script>
</body>

</html>