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
        Spor yapmak, bireylerin fiziksel ve ruhsal sağlığını olumlu yönde etkiler. Düzenli spor yapmak, kasların güçlenmesini sağlarken, kalp ve damar sağlığını da korur. Ayrıca, spor esnasında salgılanan endorfin hormonu sayesinde bireyler kendilerini daha mutlu hissederler. Spor yapmanın bir diğer faydası da özgüvenin artmasıdır. Ancak, spora aşırı yüklenmek ve vücudu zorlamak çeşitli sakatlıklara neden olabilir. Bu nedenle, spor yaparken dinlenmeye özen göstermek ve dengeli bir program uygulamak önemlidir.
    </p>
    <h2 id="question-title">Bu paragrafta hangi sebep-sonuç ilişkisi vurgulanmaktadır?</h2>
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
        paragraph: "Spor yapmak, bireylerin fiziksel ve ruhsal sağlığını olumlu yönde etkiler. Düzenli spor yapmak, kasların güçlenmesini sağlarken, kalp ve damar sağlığını da korur. Ayrıca, spor esnasında salgılanan endorfin hormonu sayesinde bireyler kendilerini daha mutlu hissederler. Spor yapmanın bir diğer faydası da özgüvenin artmasıdır. Ancak, spora aşırı yüklenmek ve vücudu zorlamak çeşitli sakatlıklara neden olabilir. Bu nedenle, spor yaparken dinlenmeye özen göstermek ve dengeli bir program uygulamak önemlidir.",
        question: "Bu paragrafta hangi sebep-sonuç ilişkisi vurgulanmaktadır?",
        options: {
            A: "Spor yapmak → Endorfin salgılanması → Mutluluk hissi",
            B: "Dinlenmemek → Kalp sağlığının korunması",
            C: "Özgüven eksikliği → Sporun artırılması",
            D: "Spor yapmak → Vücudu zorlamak → Sakatlık riskinin azalması"
        },
        correctAnswer: 'A'
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

            window.location.href = "30.php";
        }
    </script>
</body>

</html>