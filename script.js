body {
    font-family: Arial, sans-serif;
    background: linear-gradient(135deg, #ffffff, #ffe5e6);
    margin: 0;
    padding: 20px;
    animation: bgFade 3s ease-in-out;
}

/* Плавне появлення контейнера */
.fade-in {
    animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
}

.container {
    max-width: 600px;
    margin: auto;
    background: white;
    padding: 20px;
    border-radius: 14px;
    box-shadow: 0 8px 18px rgba(0,0,0,0.12);
}

h1, h2 {
    color: #ed1c24;
    margin-bottom: 10px;
}

.block { margin-bottom: 25px; }

.input-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;
}

label { margin-bottom: 4px; font-weight: bold; }

input {
    padding: 12px;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    transition: 0.25s;
}

input:focus {
    border-color: #ed1c24;
    box-shadow: 0 0 8px rgba(237,28,36,0.3);
    transform: scale(1.02);
    outline: none;
}

/* Анімація кнопки */
.btn-animate {
    width: 100%;
    padding: 14px;
    background: #ed1c24;
    border: none;
    color: white;
    font-size: 18px;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.25s;
}

.btn-animate:hover {
    background: #c4161d;
    transform: scale(1.04);
}

.btn-animate:active {
    transform: scale(0.98);
}

/* Модальне вікно */
.modal {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.55);
    justify-content: center;
    align-items: center;
    animation: fadeIn 0.3s;
}

/* Поп-ефект модального вікна */
.pop {
    animation: popIn 0.35s ease-out;
}

@keyframes popIn {
    0% { transform: scale(0.7); opacity: 0; }
    70% { transform: scale(1.06); opacity: 1; }
    100% { transform: scale(1); }
}

.modal-content {
    background: white;
    padding: 20px;
    width: 90%;
    max-width: 350px;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 8px 18px rgba(0,0,0,0.25);
}

#closeModal {
    margin-top: 15px;
    width: 100%;
    padding: 12px;
    background: #ed1c24;
    border: none;
    color: white;
    border-radius: 8px;
    font-size: 16px;
}
