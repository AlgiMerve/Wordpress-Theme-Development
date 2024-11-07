<!DOCTYPE html>
<html lang="tr">

<head>
    <meta charset="UTF-8">
    <title>Kelime Avı Oyunu</title>
     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="mrv_play2_style.css">
    <style>
       .word-list {
        margin-right: 20px;
        flex: 1;
        max-width: 300px;
    }

    table {
        border-collapse: collapse;
        user-select: none;
        flex: 3;
    }

    td {
        width: 8px; /* Decreased from 30px */
        height: 5px; /* Decreased from 30px */
        text-align: center;
        border: 1px solid black;
        cursor: pointer;
        font-size: 13px; /* Decreased from 20px */
    }

    .highlight {
        background-color: yellow !important;
    }

    .correct {
        background-color: green !important;
        color: white !important;
    }

    .incorrect {
        background-color: red !important;
        color: white !important;
    }
    </style>
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-md-3 word-list">
                <h3>Kelime Listesi:</h3>
                <ul>
                    <?php
                    $words = ['AKICI', 'ANAFOR', 'BASİRET', 'BAYAĞI', 'CABA', 'CÜMBÜŞ', 'CANLILIK', 'BÜLTEN', 'ÇIKARIM', 'DUYU', 'DURULUK', 'DİNLETİ'];
                    foreach ($words as $word) {
                        echo "<li>" . htmlspecialchars($word, ENT_QUOTES, 'UTF-8') . "</li>";
                    }
                    ?>
                </ul>
            </div>
            <div class="col-md-9">
                <table id="word-search" class="table table-bordered">
                    <?php
                    $grid = array_fill(0, 25, array_fill(0, 15, ' '));
                    $turkishChars = array_merge(range('A', 'Z'), ['Ç', 'Ğ', 'İ', 'Ö', 'Ş', 'Ü']);
                    function placeWords(&$grid, $words)
                    {
                        foreach ($words as $word) {
                            $placed = false;
                            while (!$placed) {
                                $direction = rand(0, 1) == 0 ? 'horizontal' : 'vertical';
                                $row = rand(0, 14);
                                $col = rand(0, 14);
                                if (canPlaceWord($grid, $word, $row, $col, $direction)) {
                                    placeWord($grid, $word, $row, $col, $direction);
                                    $placed = true;
                                }
                            }
                        }
                    }
                    function canPlaceWord($grid, $word, $row, $col, $direction)
                    {
                        if ($direction == 'horizontal') {
                            if ($col + mb_strlen($word, 'UTF-8') > 15) return false;
                            for ($i = 0; $i < mb_strlen($word, 'UTF-8'); $i++) {
                                if ($grid[$row][$col + $i] != ' ') return false;
                            }
                        } else {
                            if ($row + mb_strlen($word, 'UTF-8') > 15) return false;
                            for ($i = 0; $i < mb_strlen($word, 'UTF-8'); $i++) {
                                if ($grid[$row + $i][$col] != ' ') return false;
                            }
                        }
                        return true;
                    }
                    function placeWord(&$grid, $word, $row, $col, $direction)
                    {
                        if ($direction == 'horizontal') {
                            for ($i = 0; $i < mb_strlen($word, 'UTF-8'); $i++) {
                                $grid[$row][$col + $i] = mb_substr($word, $i, 1, 'UTF-8');
                            }
                        } else {
                            for ($i = 0; $i < mb_strlen($word, 'UTF-8'); $i++) {
                                $grid[$row + $i][$col] = mb_substr($word, $i, 1, 'UTF-8');
                            }
                        }
                    }
                    function fillGrid(&$grid, $charSet)
                    {
                        for ($i = 0; $i < 15; $i++) {
                            for ($j = 0; $j < 15; $j++) {
                                if ($grid[$i][$j] == ' ') {
                                    $grid[$i][$j] = $charSet[array_rand($charSet)];
                                }
                            }
                        }
                    }
                    placeWords($grid, $words);
                    fillGrid($grid, $turkishChars);

                    for ($i = 0; $i < 15; $i++) {
                        echo "<tr>";
                        for ($j = 0; $j < 15; $j++) {
                            echo "<td data-row='$i' data-col='$j'>" . htmlspecialchars($grid[$i][$j], ENT_QUOTES, 'UTF-8') . "</td>";
                        }
                        echo "</tr>";
                    }
                    ?>
                </table>
                <div class="controls d-flex justify-content-between align-items-center">
                    <form id="finish-form" action="mrv_play_check.php" method="post">
                        <input type="hidden" id="found-words-input" name="found_words">
                        <button class="btn btn-danger" type="submit">Bitir</button>
                    </form>
                    <div class="timer" id="timer">01:00</div>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
   document.addEventListener('DOMContentLoaded', function() {
            const table = document.getElementById('word-search');
            const words = ['AKICI', 'ANAFOR', 'BASİRET', 'BAYAĞI', 'CABA', 'CÜMBÜŞ', 'CANLILIK', 'BÜLTEN', 'ÇIKARIM', 'DUYU', 'DURULUK', 'DİNLETİ'];
            let selectedCells = [];
            let isMouseDown = false;
            let foundWords = []; // Bulunan kelimeleri izlemek için
            // Mousedown Olayı
            table.addEventListener('mousedown', function(event) {
                if (event.target.tagName === 'TD' && !event.target.classList.contains('permanent')) {
                    isMouseDown = true;
                    clearSelection();
                    const cell = event.target;
                    selectedCells.push(cell);
                    cell.classList.add('highlight');
                }
            });
            // Mouseover Olayı
            table.addEventListener('mouseover', function(event) {
                if (isMouseDown && event.target.tagName === 'TD' && !event.target.classList.contains('permanent')) {
                    const cell = event.target;
                    if (!selectedCells.includes(cell)) {
                        selectedCells.push(cell);
                        cell.classList.add('highlight');
                    }
                }
            });
            // Mouseup Olayı
            document.addEventListener('mouseup', function() {
                if (isMouseDown) {
                    isMouseDown = false;
                    let word = selectedCells.map(cell => cell.textContent).join('');
                    let isWordFound = checkWord(word);
                    if (isWordFound) {
                        highlightCells(selectedCells, 'correct', true);
                        crossOutWord(word);
                        if (!foundWords.includes(word)) {
                            foundWords.push(word); // Bulunan kelimeyi diziye ekle
                        }
                    } else {
                        highlightCells(selectedCells, 'incorrect', false);
                        setTimeout(() => {
                            clearSelection();
                        }, 1000);
                    }
                }
            });
            function checkWord(word) {
                return words.includes(word);
            }
            function highlightCells(cells, className, isPermanent) {
                cells.forEach(cell => {
                    cell.classList.add(className);
                    if (isPermanent) {
                        cell.classList.add('permanent');
                    }
                });
            }
            function clearSelection() {
                selectedCells.forEach(cell => {
                    if (!cell.classList.contains('permanent')) {
                        cell.classList.remove('highlight', 'incorrect', 'correct');
                    }
                });
                selectedCells.length = 0;
            }
            function crossOutWord(word) {
                const wordListItems = document.querySelectorAll('.word-list li');
                wordListItems.forEach(item => {
                    if (item.textContent === word) {
                        item.style.textDecoration = 'line-through';
                        item.style.color = 'gray';
                    }
                });
            }
            // Form gönderimi sırasında bulunan kelimeleri gönder
            document.getElementById('finish-form').addEventListener('submit', function(event) {
                event.preventDefault();
                document.getElementById('found-words-input').value = foundWords.join(',');
                this.submit();
            });
            // Oyun sırasında metin seçimini engelle
            document.addEventListener('selectstart', function(event) {
                event.preventDefault();
            });
            // Geri sayım sayacı
            let timeLeft = 60; // 1 dakika = 60 saniye
            const timerElement = document.getElementById('timer');
            const countdownInterval = setInterval(() => {
                if (timeLeft <= 0) {
                    clearInterval(countdownInterval);
                    document.getElementById('found-words-input').value = foundWords.join(','); // Bulunan kelimeleri gönder
                    document.getElementById('finish-form').submit(); // Süre bittiğinde formu otomatik gönder
                } else {
                    timeLeft--;
                    let minutes = Math.floor(timeLeft / 60);
                    let seconds = timeLeft % 60;
                    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                }
            }, 1000);
        });
    </script>
</body>
</html>