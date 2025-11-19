// Подсчёт ошибок между строками (как расстояние Левенштейна)
function countMistakes(a, b) {
    a = a.toLowerCase().trim();
    b = b.toLowerCase().trim();

    const dp = Array(b.length + 1)
        .fill(null)
        .map(() => Array(a.length + 1).fill(0));

    for (let i = 0; i <= a.length; i++) dp[0][i] = i;
    for (let i = 0; i <= b.length; i++) dp[i][0] = i;

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            const cost = a[j - 1] === b[i - 1] ? 0 : 1;
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,
                dp[i][j - 1] + 1,
                dp[i - 1][j - 1] + cost
            );
        }
    }

    return dp[b.length][a.length];
}

function analyzeFio() {

    const nLast = document.getElementById("n-last").value;
    const nFirst = document.getElementById("n-first").value;
    const nMid = document.getElementById("n-mid").value;

    const cLast = document.getElementById("c-last").value;
    const cFirst = document.getElementById("c-first").value;
    const cMid = document.getElementById("c-mid").value;

    // Проверка "перепутанных местами" ФИО
    const inputArray = [nLast, nFirst, nMid].map(s => s.trim().toLowerCase());
    const correctArray = [cLast, cFirst, cMid].map(s => s.trim().toLowerCase());

    if (inputArray.sort().join("|") === correctArray.sort().join("|")) {
        return showModal("Самостоятельно (поля перепутаны местами)");
    }

    // Анализ количества ошибок
    const mistakesLast = countMistakes(nLast, cLast);
    const mistakesFirst = countMistakes(nFirst, cFirst);
    const mistakesMid = countMistakes(nMid, cMid);

    // Если фамилия с ошибкой → ВОПЗК
    if (mistakesLast > 0) {
        return showModal("Через ВОПЗК (ошибка в фамилии)");
    }

    // Имя + отчество: допускается максимум 2 ошибки
    if (mistakesFirst + mistakesMid <= 2) {
        return showModal("Самостоятельно");
    }

    return showModal("Через ВОПЗК");
}

/* === Модалка === */
function showModal(text) {
    document.getElementById("modal-text").innerText = text;
    document.getElementById("modal-bg").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal-bg").style.display = "none";
}
