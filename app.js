// --- Расстояние Левенштейна ---
function levenshtein(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    const matrix = [];

    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + (a[j - 1] === b[i - 1] ? 0 : 1)
            );
        }
    }
    return matrix[b.length][a.length];
}

// --- Анализ ---
document.getElementById("analyze").onclick = function () {
    let wl = document.getElementById("wrong-last").value.trim();
    let wf = document.getElementById("wrong-first").value.trim();
    let wm = document.getElementById("wrong-middle").value.trim();

    let cl = document.getElementById("correct-last").value.trim();
    let cf = document.getElementById("correct-first").value.trim();
    let cm = document.getElementById("correct-middle").value.trim();

    let res = document.getElementById("result");

    // Проверка перепутанных полей
    let swapped =
        (wl === cf && wf === cl) ||
        (wf === cm && wm === cf) ||
        (wl === cf && wf === cm) ||
        (wl === cf && wm === cl);

    if (swapped) {
        res.innerText = "Самостоятельно (поля перепутаны)";
        res.style.display = "block";
        return;
    }

    // --- Ошибка в фамилии = ВОПЗК ---
    if (levenshtein(wl, cl) !== 0) {
        res.innerText = "Через ВОПЗК (фамилия отличается)";
        res.style.display = "block";
        return;
    }

    // --- Подсчет ошибок ---
    let errorsName = levenshtein(wf, cf);
    let errorsMiddle = levenshtein(wm, cm);
    let totalErrors = errorsName + errorsMiddle;

    // --- Решение ---
    if (totalErrors <= 2) {
        res.innerText = `Самостоятельно (ошибок: ${totalErrors})`;
    } else {
        res.innerText = `Через ВОПЗК (ошибок: ${totalErrors})`;
    }

    res.style.display = "block";
};
