// 1. Данные: Ключи ОБЯЗАНЫ совпадать с ключами в descriptions
let stats = JSON.parse(localStorage.getItem('myStats')) || { 
    "STRENGTH": 3, "PERCEPTION": 3, "ENDURANCE": 3, 
    "CHARISMA": 3, "INTELLIGENCE": 3, "AGILITY": 3, "LUCK": 3 
};
let freePoints = parseInt(localStorage.getItem('myPoints'));
if (isNaN(freePoints)) freePoints = 3;

const descriptions = {
    "STRENGTH": "Сила — чтобы таскать тонны хлама и выбивать двери, которые не поддались с первого раза.",
    "PERCEPTION": "Восприятие — помогает не наступить в коровью мину и заметить крышку в куче мусора.",
    "ENDURANCE": "Выносливость — позволяет долго бегать, много есть и не откинуть копыта после первого же укуса мухи.",
    "CHARISMA": "Харизма — искусство убеждать других, что твой бред — это гениальный план спасения мира.",
    "INTELLIGENCE": "Интеллект — чтобы не покупать мусор по цене золота и понимать, куда нажимать на терминале.",
    "AGILITY": "Ловкость — чтобы уворачиваться от пуль, ударов и реальности, которая пытается тебя прихлопнуть.",
    "LUCK": "Удача — единственное, что спасет, когда всё остальное окончательно пошло не по плану."
};

// 2. Переключение вкладок (добавили параметр event)
function switchTab(tabId, event) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    const targetTab = document.getElementById('tab-' + tabId);
    if (targetTab) targetTab.classList.add('active');

    document.querySelectorAll('.bottom-nav button').forEach(btn => btn.classList.remove('active'));
    if (event) event.currentTarget.classList.add('active');
}

// 3. Модальное окно
function showInfo(statName) {
    const modal = document.getElementById('info-modal');
    document.getElementById('info-text').innerText = descriptions[statName];
    modal.style.display = 'block';
}

// 4. Отрисовка
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
            <span style="width: 140px; cursor: pointer; color: #00ff00; text-decoration: underline;" 
                  onclick="showInfo('${key}')">${key}</span>
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

function addPoint(stat) {
    if (freePoints > 0 && stats[stat] < 10) {
        stats[stat]++;
        freePoints--;
        localStorage.setItem('myStats', JSON.stringify(stats));
        localStorage.setItem('myPoints', freePoints);
        renderStats();
    }
}

function launchGame(gameName) {
    document.getElementById('arcade-menu').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
}

function exitGame() {
    document.getElementById('arcade-menu').style.display = 'block';
    document.getElementById('game-container').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', renderStats);
