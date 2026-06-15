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
let stats = { str: 3, per: 3, end: 3, cha: 3, int: 3, agi: 3, luc: 3 };
let freePoints = 3;

function renderStats() {
    const container = document.getElementById('stats-container');
    document.getElementById('free-points').innerText = freePoints;
    container.innerHTML = '';
    
    for (let key in stats) {
        let row = document.createElement('div');
        row.className = 'stat-row';
        row.innerHTML = `
            <span style="width: 40px;">${key.toUpperCase()}</span>
            <div class="bars" id="${key}-bars"></div>
            ${freePoints > 0 ? `<button onclick="addPoint('${key}')" style="margin-left:10px;">+</button>` : ''}
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

function addPoint(stat) {
    if (freePoints > 0 && stats[stat] < 10) {
        stats[stat]++;
        freePoints--;
        renderStats();
    }
}

document.addEventListener('DOMContentLoaded', renderStats);
