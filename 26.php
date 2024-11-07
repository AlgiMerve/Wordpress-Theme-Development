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
        Sağlıklı beslenme, bireylerin hem fiziksel hem de zihinsel performansını etkiler. Günlük yaşamda enerjik kalabilmek için dengeli bir diyet uygulamak önemlidir. Karbonhidratlar, proteinler, yağlar, vitaminler ve mineraller dengeli bir şekilde tüketilmelidir. Aşırı şeker ve yağ tüketimi, kilo alımına ve sağlık sorunlarına yol açabilirken, yetersiz beslenme de bağışıklık sistemini zayıflatır. Özellikle çocukluk çağında kazanılan sağlıklı beslenme alışkanlıkları, ileri yaşlarda da bireylerin sağlıklı kalmasına yardımcı olur. Bu yüzden, doğru beslenme alışkanlıkları küçük yaşlarda kazandırılmalıdır.
    </p>
    <h2 id="question-title">Bu paragrafın ana fikri nedir?</h2>
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
        paragraph: "Sağlıklı beslenme, bireylerin hem fiziksel hem de zihinsel performansını etkiler. Günlük yaşamda enerjik kalabilmek için dengeli bir diyet uygulamak önemlidir. Karbonhidratlar, proteinler, yağlar, vitaminler ve mineraller dengeli bir şekilde tüketilmelidir. Aşırı şeker ve yağ tüketimi, kilo alımına ve sağlık sorunlarına yol açabilirken, yetersiz beslenme de bağışıklık sistemini zayıflatır. Özellikle çocukluk çağında kazanılan sağlıklı beslenme alışkanlıkları, ileri yaşlarda da bireylerin sağlıklı kalmasına yardımcı olur. Bu yüzden, doğru beslenme alışkanlıkları küçük yaşlarda kazandırılmalıdır.",
        question: "Bu paragrafın ana fikri nedir?",
        options: {
            A: "Sağlıklı beslenme, çocukluk çağında başlamalıdır.",
            B: "Dengeli beslenme, sağlıklı bir yaşam için gereklidir.",
            C: "Aşırı şeker tüketimi, kilo aldırır.",
            D: "Vitaminler ve mineraller en önemli besin grubudur."
        },
        correctAnswer: 'B'
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

            window.location.href = "27.php";
        }
    </script>
</body>

</html>