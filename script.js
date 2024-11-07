document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('word-search');
    const words = ['AKICI', 'ANAFOR', 'BASİRET', 'BAYAĞI', 'CABA', 'CÜMBÜŞ', 'CANLILIK', 'BÜLTEN', 'ÇIKARIM', 'DUYU', 'DURULUK', 'DİNLETİ'];
    let selectedCells = [];
    let isMouseDown = false;
    let foundWords = []; // Array to track found words

    table.addEventListener('mousedown', function(event) {
        if (event.target.tagName === 'TD' && !event.target.classList.contains('permanent')) {
            isMouseDown = true;
            clearSelection();
            const cell = event.target;
            selectedCells.push(cell);
            cell.classList.add('highlight');
        }
    });

    table.addEventListener('mouseover', function(event) {
        if (isMouseDown && event.target.tagName === 'TD' && !event.target.classList.contains('permanent')) {
            const cell = event.target;
            if (!selectedCells.includes(cell)) {
                selectedCells.push(cell);
                cell.classList.add('highlight');
            }
        }
    });

    document.addEventListener('mouseup', function() {
        if (isMouseDown) {
            isMouseDown = false;
            let word = selectedCells.map(cell => cell.textContent).join('');
            let isWordFound = checkWord(word);
            
            if (isWordFound) {
                highlightCells(selectedCells, 'correct', true);
                crossOutWord(word);
                if (!foundWords.includes(word)) {
                    foundWords.push(word); // Add found word to array
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

    // Submit found words when the form is submitted
    document.getElementById('finish-form').addEventListener('submit', function(event) {
        event.preventDefault();
        document.getElementById('found-words-input').value = foundWords.join(',');
        this.submit();
    });

    // Prevent text selection during the game
    document.addEventListener('selectstart', function(event) {
        event.preventDefault();
    });

    // Countdown timer
    let timeLeft = 60; // 1 minute = 60 seconds
    const timerElement = document.getElementById('timer');

    const countdownInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            document.getElementById('found-words-input').value = foundWords.join(','); // Ensure found words are submitted
            document.getElementById('finish-form').submit(); // Auto-submit form when time is up
        } else {
            timeLeft--;
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }, 1000);
});
