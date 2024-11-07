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
        Dünya nüfusu her geçen yıl artarken, doğal kaynaklar hızla tükenmektedir. Su, toprak ve enerji kaynakları üzerindeki baskı artmakta, birçok bölge kuraklık ve su kıtlığı gibi sorunlarla mücadele etmektedir. Bu durum, gıda üretimini de olumsuz etkilemekte ve bazı ülkelerde açlık sorununu derinleştirmektedir. Kaynakların sürdürülebilir şekilde kullanılması ve israfın önlenmesi, hem çevresel hem de toplumsal sorunların çözümünde kritik öneme sahiptir. Her bireyin, küçük de olsa bu sürece katkıda bulunması, gezegenimizin geleceği açısından önemlidir.
    </p>
    <h2 id="question-title">Bu paragraftan çıkarılabilecek en doğru yargı nedir?</h2>
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
        paragraph: "Dünya nüfusu her geçen yıl artarken, doğal kaynaklar hızla tükenmektedir. Su, toprak ve enerji kaynakları üzerindeki baskı artmakta, birçok bölge kuraklık ve su kıtlığı gibi sorunlarla mücadele etmektedir. Bu durum, gıda üretimini de olumsuz etkilemekte ve bazı ülkelerde açlık sorununu derinleştirmektedir. Kaynakların sürdürülebilir şekilde kullanılması ve israfın önlenmesi, hem çevresel hem de toplumsal sorunların çözümünde kritik öneme sahiptir. Her bireyin, küçük de olsa bu sürece katkıda bulunması, gezegenimizin geleceği açısından önemlidir.",
        question: "Bu paragraftan çıkarılabilecek en doğru yargı nedir?",
        options: {
            A: "Kaynakların doğru kullanımı, toplumsal sorunları azaltabilir.",
            B: "Su kıtlığı, yalnızca belirli bölgeleri etkiler.",
            C: "Gıda üretimi, nüfus artışından bağımsızdır.",
            D: "İklim değişikliği, doğal kaynakları artırır."
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

            window.location.href = "29.php";
        }
    </script>
</body>

</html>