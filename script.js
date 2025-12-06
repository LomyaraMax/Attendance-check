document.getElementById("analyzeBtn").addEventListener("click", analyze);
document.getElementById("closeModal").addEventListener("click", closeModal);

const modal = document.getElementById("modal");
const modalContent = document.querySelector(".modal-content");

function closeModal() {
    modal.style.display = "none";
}

const similarLetters = {
    "а": "a", "a": "а",
    "е": "e", "e": "е",
    "о": "o", "o": "о",
    "р": "p", "p": "р",
    "с": "c", "c": "с",
    "і": "i", "i": "і",
    "ї": "i", "й": "i",
    "и": "y", "ы": "y"
};

function countDifferences(str1, str2) {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();

    let errors = 0;
    let similarErrors = 0;

    for (let i = 0; i < Math.max(str1.length, str2.length); i++) {
        let a = str1[i] || "";
        let b = str2[i] || "";

        if (a !== b) {
            if (similarLetters[a] === b) similarErrors++;
            else errors++;
        }
    }

    return { errors, similarErrors };
}

function analyze() {
    let ln = document.getElementById("ln_input").value.trim();
    let fn = document.getElementById("fn_input").value.trim();
    let pt = document.getElementById("pt_input").value.trim();

    let lnC = document.getElementById("ln_correct").value.trim();
    let fnC = document.getElementById("fn_correct").value.trim();
    let ptC = document.getElementById("pt_correct").value.trim();

    let lnDiff = countDifferences(ln, lnC);
    let fnDiff = countDifferences(fn, fnC);
    let ptDiff = countDifferences(pt, ptC);

    let totalErrors = fnDiff.errors + ptDiff.errors + fnDiff.similarErrors + ptDiff.similarErrors;

    let result = "";

    // Переплутані місцями
    if (
        (ln === fnC && fn === lnC) ||
        (ln === ptC && pt === lnC) ||
        (fn === ptC && pt === fnC)
    ) {
        result = "Рекомендується: <b>Самостійно</b>";
    }

    else if (lnDiff.errors === 0 && lnDiff.similarErrors === 1 && totalErrors === 1) {
        result = "Рекомендується: <b>Самостійно</b>";
    }

    else if (lnDiff.errors > 0) {
        result = "Рекомендується: <b>Через ВОПЗК</b>";
    }

    else if (lnDiff.similarErrors >= 2) {
        result = "Рекомендується: <b>Через ВОПЗК</b>";
    }

    else if (totalErrors <= 2) {
        result = "Рекомендується: <b>Самостійно</b>";
    }

    else {
        result = "Рекомендується: <b>Через ВОПЗК</b>";
    }

    showModal(result);
}

function showModal(text) {
    document.getElementById("modal-text").innerHTML = text;
    modal.style.display = "flex";

    // перезапуск анімації pop
    modalContent.classList.remove("pop");
    void modalContent.offsetWidth;
    modalContent.classList.add("pop");
}
