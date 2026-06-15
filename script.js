// 1. Загрузка данных или установка значений по умолчанию
let stats = JSON.parse(localStorage.getItem('myStats')) || { str: 3, per: 3, end: 3, cha: 3, int: 3, agi: 3, luc: 3 };
let freePoints = parseInt(localStorage.getItem('myPoints'));
if (isNaN(freePoints)) freePoints = 3;

// 2. Переключение вкладок
function switchTab(tabId, event) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    const targetTab = document.getElementById('tab-' + tabId);
    if (targetTab) targetTab.classList.add('active');

    document.querySelectorAll('.bottom-nav button').forEach(btn => btn.classList.remove('active'));
    if (event) event.target.classList.add('active');
}

// 3. Отрисовка характеристик
function renderStats() {
    const container = document.getElementById('stats-container');
    const pointsEl = document.getElementById('free-points');
    if (pointsEl) pointsEl.innerText = freePoints;
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let key in stats) {
        let row = document.createElement('div');
        row.className = 'stat-row';
        row.innerHTML = `
            <span style="width: 40px;">${key.toUpperCase()}</span>
            <div class="bars" id="${key}-bars"></div>
            ${freePoints > 0 ? `<button onclick="addPoint('${key}')">+</button>` : ''}
        `;
        container.appendChild(row);
        
        const barContainer = document.getElementById(key + '-bars');
        for (let i = 0; i < 10; i++) {
            let block = document.createElement('div');
            block.className = 'block' + (i < stats[key] ? ' filled' : '');
            barContainer.appendChild(block);
        }
    }
}

// 4. Добавление очка
function addPoint(stat) {
    if (freePoints > 0 && stats[stat] < 10) {
        stats[stat]++;
        freePoints--;
        localStorage.setItem('myStats', JSON.stringify(stats));
        localStorage.setItem('myPoints', freePoints);
        renderStats();
    }
}

// 5. Запуск игры
function launchGame(gameName) {
    document.getElementById('arcade-menu').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
}

function exitGame() {
    document.getElementById('arcade-menu').style.display = 'block';
    document.getElementById('game-container').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', renderStats);
