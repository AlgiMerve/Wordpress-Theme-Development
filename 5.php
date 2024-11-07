<!DOCTYPE html>
<html lang="tr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Uygulaması</title>
    <style>
        body {
            background-color: #2e3b42;
            color: #ffffff;
            font-family: Arial, sans-serif;
            font-size: 20px;
            padding: 40px;
        }
        .option {
            display: none;
            padding: 10px;
            margin: 5px;
            border: 1px solid #ddd;
            cursor: pointer;
        }

        .correct {
            background-color: #4CAF50;
            color: white;
        }

        .incorrect {
            background-color: #f44336;
            color: white;
        }

        #next-button {
            display: none;
            padding: 10px;
            margin-top: 20px;
            background-color: #008CBA;
            color: white;
            cursor: pointer;
            border: none;
        }
    </style>
</head>

<body>
    <div id="question-container">
        <p id="question-body">Bilim insanları, son yıllarda küresel ısınmanın etkilerini daha sık vurgulamaktadır. Atmosfere salınan karbondioksit miktarının artması, dünyanın ortalama sıcaklıklarını yükseltiyor. Buzullar eriyor, deniz seviyeleri yükseliyor ve hava olayları daha şiddetli hale geliyor. İnsanoğlu, tüketim alışkanlıklarını değiştirmedikçe bu sorunlar giderek artacaktır. Geri dönüşüm, enerji tasarrufu ve çevre dostu ürünlerin kullanımı bu süreci yavaşlatmak için önemli adımlardır. Her bireyin sorumluluk alması, gezegenimizin geleceği için gereklidir.</p>
        <h2 id="question-title">Yazar bu paragrafı yazarken hangi amacı gütmüştür?</h2>
        <button id="show-options-button" onclick="showOptions()">Şıkları Görüntüle</button>
    </div>

    <div id="options-container">
        <div id="optionA" class="option" onclick="checkAnswer('A')">A) Küresel ısınmanın sebeplerini anlatmak</div>
        <div id="optionB" class="option" onclick="checkAnswer('B')">B) Buzulların erimesini önlemenin yollarını açıklamak</div>
        <div id="optionC" class="option" onclick="checkAnswer('C')">C) Çevreye duyarlı olmanın önemini vurgulamak</div>
        <div id="optionD" class="option" onclick="checkAnswer('D')">D) Karbondioksit salınımının zararlarını göstermek</div>
    </div>

    <button id="next-button" onclick="nextQuestion()">Sonraki Soruya Geç</button>


    <script>
        const question = {
            paragraph: "Bilim insanları, son yıllarda küresel ısınmanın etkilerini daha sık vurgulamaktadır. Atmosfere salınan karbondioksit miktarının artması, dünyanın ortalama sıcaklıklarını yükseltiyor. Buzullar eriyor, deniz seviyeleri yükseliyor ve hava olayları daha şiddetli hale geliyor. İnsanoğlu, tüketim alışkanlıklarını değiştirmedikçe bu sorunlar giderek artacaktır. Geri dönüşüm, enerji tasarrufu ve çevre dostu ürünlerin kullanımı bu süreci yavaşlatmak için önemli adımlardır. Her bireyin sorumluluk alması, gezegenimizin geleceği için gereklidir.",
            question: "Yazar bu paragrafı yazarken hangi amacı gütmüştür?",
            options: {
                A: "Küresel ısınmanın sebeplerini anlatmak",
                B: "Buzulların erimesini önlemenin yollarını açıklamak",
                C: "Çevreye duyarlı olmanın önemini vurgulamak",
                D: "Karbondioksit salınımının zararlarını göstermek"
            },
            correctAnswer: 'C'
        };


        function showOptions() {
            // Paragraf ve soruyu göster
            document.getElementById('question-title').textContent = question.question;
            document.getElementById('question-body').textContent = question.paragraph;

            // Seçenekleri göster
            document.getElementById('optionA').textContent = 'A) ' + question.options.A;
            document.getElementById('optionB').textContent = 'B) ' + question.options.B;
            document.getElementById('optionC').textContent = 'C) ' + question.options.C;
            document.getElementById('optionD').textContent = 'D) ' + question.options.D;

            // Seçenekleri görünür yap
            document.querySelectorAll('.option').forEach(option => option.style.display = 'block');

            // Şıkları göster butonunu gizle
            document.getElementById('show-options-button').style.display = 'none';
        }

        function checkAnswer(selectedOption) {
            // Seçilen cevabı kontrol et
            const correctOption = question.correctAnswer;
            document.getElementById('option' + selectedOption).classList.add(
                selectedOption === correctOption ? 'correct' : 'incorrect'
            );

            // Doğru cevabı göster
            if (selectedOption !== correctOption) {
                document.getElementById('option' + correctOption).classList.add('correct');
            }

            // Geçiş butonunu göster
            document.getElementById('next-button').style.display = 'inline-block';

            // Tüm seçeneklerin tıklanmasını engelle
            document.querySelectorAll('.option').forEach(option => option.onclick = null);
        }

        function nextQuestion() {

            window.location.href = "6.php";
        }
    </script>
</body>

</html>