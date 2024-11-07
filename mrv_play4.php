<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Harfli Sudoku</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="mrv_play4_style.css">
    <style>
        .highlight {
            background-color: yellow !important;
            /* Sarı arka plan rengi */
            border: 1px solid #000;
            /* Sınır rengi */
        }
        .fixed {
           
            font-weight: bold;
            /* Yazıyı kalın yapar */
        }
        .correct {
            background-color: lightgreen !important;
        }
        .incorrect {
            background-color: lightcoral !important;
        }
        input[readonly] {
            cursor: not-allowed;
            /* Dolu kutulara tıklama etkisi vermez */
        }
    </style>
</head>
<body>
<div class="container mt-5">
        <h1 class="text-center mb-4">Harfli Sudoku</h1>
        <form action="sudoku.php" method="post">
            <table class="table table-bordered">
                <?php
                $sudoku = [
                    ['', '', '', '', '', 'E', '', '', 'İ'],
                    ['', '', 'İ', '', 'K', 'R', '', '', 'D'],
                    ['', '', 'K', 'D', '', '', '', 'M', ''],
                    ['A', '', 'R', '', '', 'M', '', 'S', ''],
                    ['S', '', '', 'İ', '', '', '', '', 'K'],
                    ['', '', '', '', 'E', '', 'M', '', ''],
                    ['', 'M', '', '', '', '', '', '', ''],
                    ['', '', '', 'E', 'R', '', '', 'D', ''],
                    ['', 'İ', 'E', 'A', '', '', '', '', '']
                ];

                $answerKey = [
                    ['O', 'D', 'S', 'M', 'A', 'E', 'R', 'K', 'İ'],
                    ['M', 'A', 'İ', 'S', 'K', 'R', 'O', 'E', 'D'],
                    ['E', 'R', 'K', 'D', 'İ', 'O', 'S', 'M', 'A'],
                    ['A', 'O', 'R', 'K', 'D', 'M', 'İ', 'S', 'E'],
                    ['S', 'E', 'M', 'İ', 'O', 'A', 'D', 'R', 'K'],
                    ['İ', 'K', 'D', 'R', 'E', 'S', 'M', 'A', 'O'],
                    ['D', 'M', 'A', 'O', 'S', 'K', 'E', 'İ', 'R'],
                    ['K', 'S', 'O', 'E', 'R', 'İ', 'A', 'D', 'M'],
                    ['R', 'İ', 'E', 'A', 'M', 'D', 'K', 'O', 'S']
                ];

                $colors = [
                    'bg-light',
                    'bg-primary',
                    'bg-success',
                    'bg-warning',
                    'bg-danger',
                    'bg-info',
                    'bg-secondary',
                    'bg-dark',
                    'bg-muted'
                ];

                for ($i = 0; $i < 9; $i++) {
                    if ($i % 3 == 0 && $i != 0) {
                        echo '<tr class="border-top border-3 border-dark"></tr>';
                    }
                    echo '<tr>';
                    for ($j = 0; $j < 9; $j++) {
                        if ($j % 3 == 0 && $j != 0) {
                            echo '<td class="border-end border-3 border-dark"></td>';
                        }
                        $colorIndex = intdiv($i, 3) * 3 + intdiv($j, 3);
                        $colorClass = $colors[$colorIndex];
                        $value = $sudoku[$i][$j];
                        $readonly = $value !== '' ? 'readonly' : '';
                        $fixedClass = $value !== '' ? 'fixed' : '';
                        echo "<td class='p-1 $colorClass'>
                            <input type='text' name='cell[$i][$j]' class='form-control form-control-sm m-0 $colorClass $fixedClass' value='$value' data-row='$i' data-col='$j' $readonly>
                        </td>";
                    }
                    echo '</tr>';
                }
                ?>
            </table>
            <button type="submit" class="btn btn-primary mt-3">Kontrol Et</button>
        </form>
    </div>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            const validChars = new Set(['D', 'E', 'M', 'O', 'K', 'R', 'A', 'S', 'İ']);
            const answerKey = <?php echo json_encode($answerKey); ?>;

            document.querySelectorAll('input[type="text"]').forEach(input => {
                if (!input.readOnly) {
                    input.addEventListener('input', function(event) {
                        let value = event.target.value.toUpperCase();
                        if (!validChars.has(value) && value !== '') {
                            event.target.value = '';
                        } else {
                            event.target.value = value;

                            let row = event.target.getAttribute('data-row');
                            let col = event.target.getAttribute('data-col');

                            if (value === answerKey[row][col]) {
                                event.target.classList.add('correct');
                                event.target.classList.remove('incorrect');
                            } else if (value !== '') {
                                event.target.classList.add('incorrect');
                                setTimeout(() => {
                                    event.target.classList.remove('incorrect');
                                    event.target.value = '';
                                }, 3000);
                            }
                        }
                    });
                }
            });
        });
    </script>
</body>
</body>
</html>