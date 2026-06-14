// Переключение вкладок
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + tabId).classList.add('active');
}

// Управление игрой
function launchGame() {
    document.getElementById('arcade-menu').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    console.log("Запуск игры...");
}

function exitGame() {
    document.getElementById('arcade-menu').style.display = 'block';
    document.getElementById('game-container').style.display = 'none';
}

// Отрисовка статов (Strength = 5 для примера)
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('str-bars');
    for (let i = 0; i < 10; i++) {
        const b = document.createElement('div');
        b.className = 'block' + (i < 5 ? ' filled' : '');
        container.appendChild(b);
    }
});