// Данные
let stats = JSON.parse(localStorage.getItem('myStats')) || { 
    "STRENGTH": 3, "PERCEPTION": 3, "ENDURANCE": 3, 
    "CHARISMA": 3, "INTELLIGENCE": 3, "AGILITY": 3, "LUCK": 3 
};
let freePoints = parseInt(localStorage.getItem('myPoints')) || 3;

const descriptions = {
    "STRENGTH": "Сила — чтобы таскать тонны хлама и выбивать двери.",
    "PERCEPTION": "Восприятие — помогает не наступить в мину.",
    "ENDURANCE": "Выносливость — позволяет долго бегать от проблем.",
    "CHARISMA": "Харизма — искусство убеждать.",
    "INTELLIGENCE": "Интеллект — чтобы не покупать мусор.",
    "AGILITY": "Ловкость — чтобы уворачиваться от пуль.",
    "LUCK": "Удача — единственное, что спасет."
};

const avatarMap = {
    "STRENGTH": "strength.png",
    "PERCEPTION": "perception.png",
    "ENDURANCE": "endurance.png",
    "CHARISMA": "charisma.png",
    "INTELLIGENCE": "intelligence.png",
    "LUCK": "luck.png",
    "AGILITY": "agility.png"
};

// ЕДИНАЯ ФУНКЦИЯ SHOWINFO
function showInfo(statName) {
    const modal = document.getElementById('info-modal');
    const infoText = document.getElementById('info-text');
    const displayImg = document.getElementById('stat-display-img'); // Главный экран
    const modalImg = document.getElementById('modal-stat-img');   // Внутри окна
    
    // 1. Текст
    infoText.innerText = descriptions[statName];
    
    // Если создал папку "images"
    const imgSrc = "images/" + (avatarMap[statName] || "strength.png");
    if(displayImg) displayImg.src = imgSrc;
    if(modalImg) modalImg.src = imgSrc;
    
    // 3. Эффект экрана
    document.body.style.filter = "brightness(1.5)";
    setTimeout(() => { document.body.style.filter = "brightness(1)"; }, 100);
    
    modal.style.display = 'block';
}

function switchTab(tabId, event) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + tabId).classList.add('active');
    document.querySelectorAll('.bottom-nav button').forEach(btn => btn.classList.remove('active'));
    if (event) event.currentTarget.classList.add('active');
}

function renderStats() {
    const container = document.getElementById('stats-container');
    document.getElementById('free-points').innerText = freePoints;
    container.innerHTML = '';
    
    for (let key in stats) {
        let row = document.createElement('div');
        row.className = 'stat-row';
        row.innerHTML = `
            <span style="cursor: pointer; color: #00ff00; text-decoration: underline;" 
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
        stats[stat]++; freePoints--;
        localStorage.setItem('myStats', JSON.stringify(stats));
        localStorage.setItem('myPoints', freePoints);
        renderStats();
    }
}

document.addEventListener('DOMContentLoaded', renderStats);
