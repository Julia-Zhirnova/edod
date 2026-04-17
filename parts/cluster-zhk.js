// ==========================================
// КЛАСТЕР: ЖКХ и эксплуатация
// Специальность: 08.02.14 Эксплуатация и обслуживание многоквартирного дома
// ==========================================

const clusterZhk = {
    render(area, specCode, diff) {
        const gameArea = document.getElementById('cluster-game-area');
        if (gameArea) gameArea.style.backgroundImage = "url('media/images/cluster-zhk-bg.jpg')";

        const header = this.getHeader();
        const story = diff === 0 ? 'В павильоне фестиваля потёк кран. Какой прибор учёта воды установлен?' :
                     diff === 1 ? 'Как подготовить дом к зиме?' :
                     'Рассчитай плату за ОДН по электроэнергии.';

        let content = '';
        if (diff === 0) {
            const opts = [
                { text: 'Тахометрический счётчик воды', correct: true },
                { text: 'Теплосчётчик', correct: false },
                { text: 'Электросчётчик', correct: false },
                { text: 'Манометр', correct: false }
            ];
            content = `<h3>🟢 Прибор учёта воды</h3><p>Какой счётчик измеряет расход горячей воды?</p>` + this.renderShuffledButtons(opts);
        } else if (diff === 1) {
            const opts = [
                { text: 'Промывка и опрессовка системы отопления', correct: true },
                { text: 'Покраска фасада', correct: false },
                { text: 'Замена почтовых ящиков', correct: false },
                { text: 'Уборка подъездов', correct: false }
            ];
            content = `<h3>🟡 Подготовка к зиме</h3><p>Что обязательно для подготовки дома к отопительному сезону?</p>` + this.renderShuffledButtons(opts);
        } else {
            content = `
                <h3>🔴 Расчёт ОДН (электроэнергия)</h3>
                <p>ОДПУ: 5000 кВт·ч, сумма квартирных: 4200 кВт·ч. S квартиры 60 м², S дома 3000 м². Тариф 4 руб/кВт·ч. Сколько ОДН для квартиры (руб)?</p>
                <input type="number" id="odn-input" placeholder="Сумма в рублях" style="width:100%; padding:12px; border-radius:8px; background:#222; color:white; border:1px solid #444;">
                <button class="btn btn-primary" style="margin-top:15px;" id="check-odn-btn">Проверить</button>
                <p id="odn-feedback"></p>
            `;
        }

        area.innerHTML = header + content;
        this.setReplica(story);
        if (diff === 2) {
            this.initOdnCheck();
        } else {
            this.bindAnswer(area);
        }
    },

    getHeader() {
        return `<div style="display:flex; align-items:center; gap:10px; margin-bottom:15px;">
            <img src="media/images/npc-gagarich.png" style="width:40px; height:40px; border-radius:50%; border:2px solid var(--primary);">
            <span style="color:var(--primary); font-weight:bold;">Гагарич:</span>
            <span id="gagarich-replica" style="color:var(--text-dim);"></span>
        </div>`;
    },

    setReplica(text) {
        const el = document.getElementById('gagarich-replica');
        if (el) el.textContent = text;
    },

    renderShuffledButtons(options) {
        const shuffled = shuffleArray([...options]);
        let html = '';
        shuffled.forEach(opt => {
            html += `<button class="game-btn" data-correct="${opt.correct}">${opt.text}</button>`;
        });
        return html;
    },

    bindAnswer(container) {
        container.querySelectorAll('.game-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.dataset.correct === 'true') {
                    btn.classList.add('correct');
                    const spec = gameState.selectedSpecialtyCode;
                    if (!gameState.specScores[spec]) gameState.specScores[spec] = 0;
                    gameState.specScores[spec] += 2;
                } else {
                    btn.classList.add('wrong');
                    setTimeout(() => btn.classList.remove('wrong'), 500);
                }
                Cluster.gameSuccess();
            });
        });
    },

    initOdnCheck() {
        document.getElementById('check-odn-btn').onclick = () => {
            const val = parseFloat(document.getElementById('odn-input').value);
            const fb = document.getElementById('odn-feedback');
            if (Math.abs(val - 64) < 0.1) {
                fb.innerHTML = '✅ Правильно!';
                const spec = gameState.selectedSpecialtyCode;
                if (!gameState.specScores[spec]) gameState.specScores[spec] = 0;
                gameState.specScores[spec] += 3;
            } else {
                fb.innerHTML = '❌ Неверно. (5000-4200) * (60/3000) * 4 = 800 * 0.02 * 4 = 64 руб.';
            }
            Cluster.gameSuccess();
        };
    },

    getHint(specCode, diff) {
        const hints = {
            0: { story: 'Расход воды измеряет тахометрический счётчик.', tip: 'Тахометрический счётчик воды' },
            1: { story: 'Главное — промывка и опрессовка системы отопления.', tip: 'Промывка и опрессовка' },
            2: { story: 'Формула: (разница) × (доля площади) × тариф.', tip: '800 × 0.02 × 4 = 64 руб.' }
        };
        return hints[diff];
    }
};

window.clusterZhk = clusterZhk;