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
        .correct { background-color: #4CAF50; color: white; } 
        .incorrect { background-color: #f44336; color: white; }
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
        <p id="question-body">İnsanın hayat yolculuğunda her aşama farklı deneyimler sunar. Çocukluk, keşfetmenin ve öğrenmenin en yoğun yaşandığı dönemdir. Bu süreçte aile ve çevrenin rolü büyüktür. Ergenlik, kişinin kimlik arayışına girdiği ve çevresine karşı daha duyarlı olduğu bir evredir. Ergen, bazen ailesiyle çatışma yaşayabilir ancak bu, aslında bireyselleşme sürecinin bir parçasıdır. Yetişkinlikte ise birey, hem kişisel hem de mesleki sorumlulukları omuzlamak zorundadır. Her dönem, beraberinde zorlukları getirir ancak bu zorluklar, bireyin olgunlaşması ve kendini daha iyi tanıması için fırsattır.</p>
        <h2 id="question-title">Bu paragrafın ana fikri aşağıdakilerden hangisidir?</h2>
        <button onclick="showOptions()">Şıkları Görüntüle</button>
    </div>
    
    <div id="options-container">
        <div id="optionA" class="option" onclick="checkAnswer('A')">A) Her yaş dönemi farklı zorluklarla doludur.</div>
        <div id="optionB" class="option" onclick="checkAnswer('B')">B) Çocukluk en önemli öğrenme dönemidir.</div>
        <div id="optionC" class="option" onclick="checkAnswer('C')">C) Kişi, her dönemde ailesinden destek görmelidir.</div>
        <div id="optionD" class="option" onclick="checkAnswer('D')">D) Hayat, sürekli sorumluluklarla dolu bir yolculuktur.</div>
    </div>

    <button id="next-button" onclick="nextQuestion()">Sonraki Soruya Geç</button>

    <script>
        const question = {
            paragraph: "İnsanın hayat yolculuğunda her aşama farklı deneyimler sunar. Çocukluk, keşfetmenin ve öğrenmenin en yoğun yaşandığı dönemdir. Bu süreçte aile ve çevrenin rolü büyüktür. Ergenlik, kişinin kimlik arayışına girdiği ve çevresine karşı daha duyarlı olduğu bir evredir. Ergen, bazen ailesiyle çatışma yaşayabilir ancak bu, aslında bireyselleşme sürecinin bir parçasıdır. Yetişkinlikte ise birey, hem kişisel hem de mesleki sorumlulukları omuzlamak zorundadır. Her dönem, beraberinde zorlukları getirir ancak bu zorluklar, bireyin olgunlaşması ve kendini daha iyi tanıması için fırsattır.",
            question: "Bu paragrafın ana fikri aşağıdakilerden hangisidir?",
            options: {
                A: "Her yaş dönemi farklı zorluklarla doludur.",
                B: "Çocukluk en önemli öğrenme dönemidir.",
                C: "Kişi, her dönemde ailesinden destek görmelidir.",
                D: "Hayat, sürekli sorumluluklarla dolu bir yolculuktur."
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
            document.querySelector('button').style.display = 'none';
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
            // Geçiş butonuna tıklandığında 2. soruya yönlendir
            window.location.href = "2.php"; // İkinci soru sayfasına yönlendirme
        }
    </script>
</body>
</html>
