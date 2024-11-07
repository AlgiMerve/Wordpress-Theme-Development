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
        <p id="question-body">Denizler ve okyanuslar, dünya ekosisteminin önemli parçalarıdır. Ancak, bu büyük su kütleleri her geçen gün daha fazla kirleniyor. Plastik atıklar, deniz canlılarının yaşamını tehdit ediyor ve biyolojik çeşitliliği azaltıyor. Ormanlar ise karadaki ekosistemin temelini oluşturur. Ağaçlar, oksijen üretirken aynı zamanda karbonu emer ve küresel ısınmayı yavaşlatır. Denizlerin korunması kadar ormanların da korunması gereklidir çünkü her iki ekosistem de insan hayatı için vazgeçilmezdir. Okyanuslar ve ormanlar, birbirinden farklı olmalarına rağmen birbirini tamamlar.
        </p>
        </p>
        <h2 id="question-title">Bu paragrafta denizler ve ormanlarla ilgili verilen bilgiye göre hangisi söylenebilir?</h2>
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
            paragraph: "Denizler ve okyanuslar, dünya ekosisteminin önemli parçalarıdır. Ancak, bu büyük su kütleleri her geçen gün daha fazla kirleniyor. Plastik atıklar, deniz canlılarının yaşamını tehdit ediyor ve biyolojik çeşitliliği azaltıyor. Ormanlar ise karadaki ekosistemin temelini oluşturur. Ağaçlar, oksijen üretirken aynı zamanda karbonu emer ve küresel ısınmayı yavaşlatır. Denizlerin korunması kadar ormanların da korunması gereklidir çünkü her iki ekosistem de insan hayatı için vazgeçilmezdir. Okyanuslar ve ormanlar, birbirinden farklı olmalarına rağmen birbirini tamamlar.",
            question: "Bu paragrafta denizler ve ormanlarla ilgili verilen bilgiye göre hangisi söylenebilir?",
            options: {
                A: "Denizler, ormanlara göre daha az önemlidir.",
                B: "Plastik atıklar sadece denizleri kirletir.",
                C: "Okyanuslar ve ormanlar farklı görevler üstlenir.",
                D: "Ormanlar, denizlerden daha fazla tehdit altındadır."
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

            window.location.href = "9.php";
        }
    </script>
</body>

</html>