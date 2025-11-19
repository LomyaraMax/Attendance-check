// 🔹 Словарь созвучных букв RU ↔ UA
const similarLetters = {
    "а": ["а"],
    "е": ["е", "є"],
    "ё": ["е", "йо", "ьо"],
    "и": ["и", "і", "ы"],
    "й": ["й"],
    "о": ["о"],
    "у": ["у"],
    "ы": ["и"],
    "э": ["е"],
    "ю": ["ю"],
    "я": ["я"],
    "г": ["г", "ґ"],
    "к": ["к"],
    "х": ["х"],
    "і": ["и", "і"],
    "є": ["е"],
    "ґ": ["г"]
};

// 🔹 Функция подсчета "ошибок" с учётом созвучных букв
function countSurnameErrors(input, correct) {
    input = input.trim().toLowerCase();
    correct = correct.trim().toLowerCase();

    if (input === correct) return { nonSimilar: 0, similar: 0 };

    if (input.length !== correct.length) {
        // Разная длина → несозвучная ошибка
        return { nonSimilar: 1, similar: 0 };
    }

    let similarCount = 0;
    let nonSimilarCount = 0;

    for (let i = 0; i < correct.length; i++) {
        const a = input[i];
        const b = correct[i];

        if (a === b) continue;

        if (similarLetters[a] && similarLetters[a].includes(b)) {
            similarCount++;
        } else {
            nonSimilarCount++;
        }
    }

    return { nonSimilar: nonSimilarCount, similar: similarCount };
}

// 🔹 Функция подсчета ошибок имени/отчества
function countErrors(a, b) {
    a = a.trim().toLowerCase();
    b = b.trim().toLowerCase();

    const len = Math.max(a.length, b.length);
    let errors = 0;

    for (let i = 0; i < len; i++) {
        if (a[i] !== b[i]) errors++;
    }

    return errors;
}

// 🔹 Главная функция анализа
function analyzeFio() {
    const nLast = document.getElementById("n-last").value;
    const nFirst = document.getElementById("n-first").value;
    const nMid = document.getElementById("n-mid").value;

    const cLast = document.getElementById("c-last").value;
    const cFirst = document.getElementById("c-first").value;
    const cMid = document.getElementById("c-mid").value;

    // --- Анализ фамилии ---
    const surnameErrors = countSurnameErrors(nLast, cLast);
    const mistakesFirst = countErrors(nFirst, cFirst);
    const mistakesMid = countErrors(nMid, cMid);
    const totalNameErrors = mistakesFirst + mistakesMid;

    let result = "";

    // Если есть хотя бы одна несозвучная ошибка → ВОПЗК
    if (surnameErrors.nonSimilar > 0) {
        result = "Через ВОПЗК";
    }
    // Если 2+ созвучных ошибок → ВОПЗК
    else if (surnameErrors.similar >= 2) {
        result = "Через ВОПЗК";
    }
    // Если 1 созвучная ошибка + есть ошибки в имени/отчестве → ВОПЗК
    else if (surnameErrors.similar === 1 && totalNameErrors > 0) {
        result = "Через ВОПЗК";
    }
    // Иначе фамилия ок или 1 созвучная + имя/отчество ок → Самостоятельно
    else if ((surnameErrors.similar === 0 || surnameErrors.similar === 1) && totalNameErrors <= 2) {
        result = "Самостоятельно";
    }
    // Если имя/отчество >2 ошибок → ВОПЗК
    else if (totalNameErrors > 2) {
        result = "Через ВОПЗК";
    } else {
        result = "Самостоятельно";
    }

    showModal(result);
}

// 🔹 Модальное окно
function showModal(text) {
    document.getElementById("modal-text").innerText = text;
    document.getElementById("modal-bg").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal-bg").style.display = "none";
}
