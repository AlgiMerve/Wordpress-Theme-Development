<?php
function validateSudoku($sudoku) {
    // Burada Sudoku'nun geçerli olup olmadığını kontrol edin
    // Her satır, sütun ve 3x3 iç tablonun geçerli olup olmadığını kontrol edin
    return true; // Şu anda geçici olarak true döndürülüyor
}

// Formdan gelen verileri al
$sudoku = $_POST['cell'];

// Sudoku'nun geçerliliğini kontrol et
if (validateSudoku($sudoku)) {
    echo 'Sudoku geçerli!';
} else {
    echo 'Sudoku geçersiz!';
}
?>
<a href="mrv_play4.php">Geri Dön</a>
