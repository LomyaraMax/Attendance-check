// ---- Таблиця співзвучних букв ----
const similarPairs = [
    ["е", "є"], ["и", "і"], ["о", "а"], ["г", "ґ"], ["и", "ы"], ["е", "э"],
    ["в","ў"], ["с","c"], ["і","ї"], ["ё","е"], ["у","ю"]
];

// ---- Функція перевірки однієї пари слів ----
function compareNames(n1, n2) {
    n1 = n1.toLowerCase().trim();
    n2 = n2.toLowerCase().trim();

    let mistakes = 0;
    let similarMistakes = 0;

    const maxLen = Math.max(n1.length, n2.length);

    for (let i = 0; i < maxLen; i++) {
        const a = n1[i] || "";
        const b = n2[i] || "";

        if (a !== b) {
            mistakes++;

            // перевірка чи букви співзвучні
            const isSimilar = similarPairs.some(pair =>
                pair.includes(a) && pair.includes(b)
            );

            if (isSimilar) similarMistakes++;
        }
    }

    return { mistakes, similarMistakes };
}

// ---- Основний аналіз ----
function analyze() {
    const f1 = document.getElementById("surnameDoc").value;
    const f2 = document.getElementById("surnameTtn").value;

    const n1 = document.getElementById("nameDoc").value;
    const n2 = document.getElementById("nameTtn").value;

    const p1 = document.getElementById("patronymicDoc").value;
    const p2 = document.getElementById("patronymicTtn").value;

    const sur = compareNames(f1, f2);
    const name = compareNames(n1, n2);
    const patr = compareNames(p1, p2);

    let surnameOK = true;

    // ---- Логіка по прізвищу ----
    if (sur.mistakes === 0) {
        surnameOK = true;
    } 
    else if (sur.mistakes === 1 && sur.similarMistakes === 1) {
        surnameOK = true; // 1 співзвучна помилка = норм
    } 
    else {
        surnameOK = false; // 2+ або 1 несозвучна
    }

    // ---- Підрахунок помилок в імені + по батькові ----
    const otherMistakes = name.mistakes + patr.mistakes;

    // ---- Умова ВОПЗК ----
    let result = "Самостійно";

    if (!surnameOK) {
        result = "ВОПЗК";
    } 
    else if (sur.mistakes === 1 && sur.similarMistakes === 1 && otherMistakes > 0) {
        // 1 співзвучна в прізвищі + хоч 1 помилка в інших → ВОПЗК
        result = "ВОПЗК";
    } 
    else if (otherMistakes > 2) {
        result = "ВОПЗК";
    }

    showModal(result);
}

// ---- Модальне вікно ----
function showModal(text) {
    const modal = document.getElementById("resultModal");
    const msg = document.getElementById("modalText");

    msg.textContent = text;
    modal.classList.add("show");

    setTimeout(() => {
        modal.classList.remove("show");
    }, 2500);
}
