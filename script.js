// Переключение вкладок
function switchTab(tabId) {
    // 1. Убираем класс 'active' у всех вкладок
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    
    // 2. Добавляем класс 'active' только нужной вкладке
    const targetTab = document.getElementById('tab-' + tabId);
    if (targetTab) {
        targetTab.classList.add('active');
    }

    // 3. Подсветка кнопок
    document.querySelectorAll('.bottom-nav button').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// Запуск игры
function launchGame(gameName) {
    document.getElementById('arcade-menu').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    console.log("Запуск игры: " + gameName);
}

function exitGame() {
    document.getElementById('arcade-menu').style.display = 'block';
    document.getElementById('game-container').style.display = 'none';
}
