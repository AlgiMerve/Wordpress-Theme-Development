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
    <p id="question-body">
        El yapımı ürünler ile fabrikasyon ürünler arasında birçok fark vardır. El yapımı ürünler, kişisel emeğin ve özenin sonucudur. Bu nedenle, her bir parça benzersizdir ve özel bir anlam taşır. Ancak, üretim süreleri daha uzun olduğu için fiyatları genellikle daha yüksektir. Fabrikasyon ürünler ise seri üretimle daha hızlı ve düşük maliyetle üretilir. Bu tür ürünler, aynı özellikte binlerce kopya halinde piyasaya sunulabilir. El yapımı ürünler, kaliteyi ve sanatı ön plana çıkarırken, fabrikasyon ürünler daha çok ulaşılabilirliği artırır. Her iki üretim tarzı da kendi içinde avantaj ve dezavantajlar barındırır.
    </p>
    <h2 id="question-title">Bu paragrafın genelinden hangi sonuca ulaşılabilir?</h2>
        <button id="show-options-button" onclick="showOptions()">Şıkları Görüntüle</button>
    </div>

    <div id="options-container">
        <div id="optionA" class="option" onclick="checkAnswer('A')">A) İnternetin insan hayatını nasıl değiştirdiğini anlatmak</div>
        <div id="optionB" class="option" onclick="checkAnswer('B')">B) Teknolojinin yalnızca avantajlarını vurgulamak</div>
        <div id="optionC" class="option" onclick="checkAnswer('C')">C) Dijital bağımlılığın birey üzerindeki etkilerini tartışmak</div>
        <div id="optionD" class="option" onclick="checkAnswer('D')">D) Teknolojiyi dengeli kullanmanın önemini belirtmek</div>
    </div>

    <button id="next-button" onclick="nextQuestion()">Sonraki Soruya Geç</button>


    <script>
       const question = {
        paragraph: "El yapımı ürünler ile fabrikasyon ürünler arasında birçok fark vardır. El yapımı ürünler, kişisel emeğin ve özenin sonucudur. Bu nedenle, her bir parça benzersizdir ve özel bir anlam taşır. Ancak, üretim süreleri daha uzun olduğu için fiyatları genellikle daha yüksektir. Fabrikasyon ürünler ise seri üretimle daha hızlı ve düşük maliyetle üretilir. Bu tür ürünler, aynı özellikte binlerce kopya halinde piyasaya sunulabilir. El yapımı ürünler, kaliteyi ve sanatı ön plana çıkarırken, fabrikasyon ürünler daha çok ulaşılabilirliği artırır. Her iki üretim tarzı da kendi içinde avantaj ve dezavantajlar barındırır.",
        question: "Bu paragrafın genelinden hangi sonuca ulaşılabilir?",
        options: {
            A: "El yapımı ürünlerin fiyatı her zaman ucuzdur.",
            B: "Fabrikasyon ürünler, sanatsal değeri ön planda tutar.",
            C: "El yapımı ürünler, her zaman daha kalitelidir.",
            D: "El yapımı ve fabrikasyon ürünlerin avantajları farklıdır."
        },
        correctAnswer: 'D'
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

            window.location.href = "26.php";
        }
    </script>
</body>

</html>