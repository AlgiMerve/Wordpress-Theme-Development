let selectedLeft = null;
let selectedRight = null;
let isDisabled = false;

function disableAllBoxes() {
    document.querySelectorAll('.word-box').forEach(box => {
        if (!box.classList.contains('correct')) {
            box.classList.add('disabled');
        }
    });
    isDisabled = true;
}

function enableAllBoxes() {
    document.querySelectorAll('.word-box').forEach(box => {
        box.classList.remove('disabled');
    });
    isDisabled = false;
}

function resetSelection() {
    document.querySelectorAll('.word-box').forEach(box => {
        if (!box.classList.contains('correct')) {
            box.classList.remove('selected', 'incorrect');
            box.style.backgroundColor = '#f0f0f0'; // Orijinal arka plan rengi
            box.style.borderColor = '#000'; // Orijinal kenar rengi
        }
    });
    selectedLeft = null;
    selectedRight = null;
}

function checkMatch() {
    if (selectedLeft && selectedRight) {
        const correct = selectedLeft.dataset.match === selectedRight.dataset.match;

        if (correct) {
            selectedLeft.classList.add('correct');
            selectedRight.classList.add('correct');
            setTimeout(() => {
                resetSelection();
                enableAllBoxes(); // 1 saniye sonra kutuları tekrar tıklanabilir yap
            }, 1000);
        } else {
            selectedLeft.classList.add('incorrect');
            selectedRight.classList.add('incorrect');

            setTimeout(() => {
                resetSelection();
                enableAllBoxes(); // 3 saniye sonra kutuları tekrar tıklanabilir yap
            }, 3000);
        }
    }
}

document.querySelectorAll('.word-box').forEach(box => {
    box.addEventListener('click', (event) => {
        if (isDisabled) return; // Eğer kutular devre dışıysa, başka tıklama yapılmasını engelle

        const boxType = event.target.dataset.type;

        if (event.target.classList.contains('correct')) return; // Doğru eşleşmelere tıklamayı engelle

        if (boxType === 'left') {
            if (selectedLeft && selectedLeft !== event.target) {
                // Önceki seçim varsa onu temizle
                selectedLeft.classList.remove('selected');
            }
            selectedLeft = event.target;
        } else if (boxType === 'right') {
            if (selectedRight && selectedRight !== event.target) {
                // Önceki seçim varsa onu temizle
                selectedRight.classList.remove('selected');
            }
            selectedRight = event.target;
        }

        event.target.classList.add('selected');

        if (selectedLeft && selectedRight) {
            disableAllBoxes(); // Eşleştirme yapılmadan önce kutuları devre dışı bırak
            checkMatch();
        }
    });
});