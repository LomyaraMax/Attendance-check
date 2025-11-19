function analyzeFio() {
    const nLast = document.getElementById('n-last').value.trim().toLowerCase();
    const nFirst = document.getElementById('n-first').value.trim().toLowerCase();
    const nMid = document.getElementById('n-mid').value.trim().toLowerCase();

    const cLast = document.getElementById('c-last').value.trim().toLowerCase();
    const cFirst = document.getElementById('c-first').value.trim().toLowerCase();
    const cMid = document.getElementById('c-mid').value.trim().toLowerCase();

    let result = "";

    function diff(a, b) {
        let errors = 0;
        const len = Math.max(a.length, b.length);
        for (let i = 0; i < len; i++) {
            if (a[i] !== b[i]) errors++;
        }
        return errors;
    }

    // Если фамилия отличается хоть на 1 букву → ВОПЗК
    if (diff(nLast, cLast) > 0) {
        result = "Через ВОПЗК";
    } else {
        let errorsFirst = diff(nFirst, cFirst);
        let errorsMid = diff(nMid, cMid);

        if (errorsFirst + errorsMid <= 2) {
            result = "Самостоятельно";
        } else {
            result = "Через ВОПЗК";
        }
    }

    showModal(result);
}

function showModal(text) {
    document.getElementById("modal-text").innerText = text;
    document.getElementById("modal-bg").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal-bg").style.display = "none";
}
