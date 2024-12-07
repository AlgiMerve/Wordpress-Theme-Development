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
        Kırsal ve kentsel yaşam arasında birçok fark bulunmaktadır. Kırsal yaşamda insanlar daha sakin ve doğal bir ortamda yaşarken, kentsel yaşamda hızlı bir tempo hakimdir. Kırsal kesimde hava daha temizdir ve insanlar daha çok açık hava etkinlikleri yapma imkânı bulur. Ancak, şehirlerde sağlık ve eğitim gibi hizmetlere daha kolay ulaşılır. Kentsel yaşamda sosyal etkinlikler çeşitliyken, kırsal yaşamda komşuluk ilişkileri daha samimidir. Her iki yaşam tarzının da kendine özgü avantajları ve dezavantajları bulunmaktadır.
    </p>
    <h2 id="question-title">Bu paragrafa göre, aşağıdaki çıkarımlardan hangisi doğrudur?</h2>
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
        paragraph: "Kırsal ve kentsel yaşam arasında birçok fark bulunmaktadır. Kırsal yaşamda insanlar daha sakin ve doğal bir ortamda yaşarken, kentsel yaşamda hızlı bir tempo hakimdir. Kırsal kesimde hava daha temizdir ve insanlar daha çok açık hava etkinlikleri yapma imkânı bulur. Ancak, şehirlerde sağlık ve eğitim gibi hizmetlere daha kolay ulaşılır. Kentsel yaşamda sosyal etkinlikler çeşitliyken, kırsal yaşamda komşuluk ilişkileri daha samimidir. Her iki yaşam tarzının da kendine özgü avantajları ve dezavantajları bulunmaktadır.",
        question: "Bu paragrafa göre, aşağıdaki çıkarımlardan hangisi doğrudur?",
        options: {
            A: "Kentsel yaşamda hava, kırsal yaşamdan daha temizdir.",
            B: "Kırsal kesimde sosyal etkinlikler daha fazladır.",
            C: "Şehirlerde hizmetlere erişim daha kolaydır.",
            D: "Kırsal yaşamda insanlar birbirinden uzak yaşar."
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

            window.location.href = "32.php";
        }
    </script>
</body>

</html>