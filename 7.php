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
        <p id="question-body">Yapay zekâ teknolojisi, hayatımızda her geçen gün daha fazla yer alıyor. Sağlık sektöründe kullanılan yapay zekâ sistemleri, hastalıkları erken teşhis edebiliyor. Eğitim alanında, kişiye özel öğrenme programları sunarak öğrencilerin ihtiyaçlarına göre içerik hazırlanıyor. Ancak yapay zekânın her alanda kullanılmaya başlanması, bazı etik soruları da beraberinde getiriyor. İnsanların işlerini kaybetme korkusu ya da mahremiyet ihlalleri gibi konular, bu teknolojinin sınırlarının dikkatle çizilmesini gerektiriyor. Yapay zekâ, doğru şekilde kullanıldığında büyük avantajlar sağlasa da her yenilik gibi dikkatli yönetilmelidir.</p>
        </p>
        <h2 id="question-title">Paragrafa göre yapay zekânın kullanımı ile ilgili aşağıdaki yargılardan hangisi yanlıştır?
        </h2>
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
            paragraph: "Yapay zekâ teknolojisi, hayatımızda her geçen gün daha fazla yer alıyor. Sağlık sektöründe kullanılan yapay zekâ sistemleri, hastalıkları erken teşhis edebiliyor. Eğitim alanında, kişiye özel öğrenme programları sunarak öğrencilerin ihtiyaçlarına göre içerik hazırlanıyor. Ancak yapay zekânın her alanda kullanılmaya başlanması, bazı etik soruları da beraberinde getiriyor. İnsanların işlerini kaybetme korkusu ya da mahremiyet ihlalleri gibi konular, bu teknolojinin sınırlarının dikkatle çizilmesini gerektiriyor. Yapay zekâ, doğru şekilde kullanıldığında büyük avantajlar sağlasa da her yenilik gibi dikkatli yönetilmelidir.",
            question: "Paragrafa göre yapay zekânın kullanımı ile ilgili aşağıdaki yargılardan hangisi yanlıştır?",
            options: {
                A: "Yapay zekâ, sağlık sektöründe fayda sağlar.",
                B: "Eğitimde kişiselleştirilmiş öğrenme fırsatları sunar.",
                C: "Yapay zekâ, insanların mahremiyetini tamamen korur.",
                D: "Teknolojinin sınırları iyi belirlenmelidir."
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

            window.location.href = "8.php";
        }
    </script>
</body>

</html>