// ==========================================
// КЛАСТЕР: Химия и лабораторный контроль
// Специальности: 18.02.12, 18.01.34
// ==========================================

const clusterChem = {
    render(area, specCode, diff) {
        const gameArea = document.getElementById('cluster-game-area');
        if (gameArea) gameArea.style.backgroundImage = "url('media/images/cluster-chem-bg.jpg')";

        const header = this.getHeader();
        const story = diff === 0 ? 'Вода в фонтане фестиваля помутнела. Нужно проверить её качество.' :
                     diff === 1 ? 'Для точного анализа нужна правильная лабораторная посуда.' :
                     'Приготовь 0.9% раствор NaCl для промывки ран.';
        
        let content = '';
        if (diff === 0) {
            content = `
                <h3>🟢 Кислотность</h3>
                <p>Какой pH у нейтрального раствора?</p>
                <button class="game-btn" data-correct="true">7</button>
                <button class="game-btn">1</button>
                <button class="game-btn">14</button>
                <button class="game-btn">0</button>
            `;
        } else if (diff === 1) {
            content = `
                <h3>🟡 Посуда</h3>
                <p>Для точного измерения объёма жидкости используют:</p>
                <button class="game-btn" data-correct="true">Мерную колбу</button>
                <button class="game-btn">Химический стакан</button>
                <button class="game-btn">Коническую колбу</button>
                <button class="game-btn">Пробирку</button>
            `;
        } else {
            content = `
                <h3>🔴 Расчёт</h3>
                <p>Сколько граммов NaCl нужно для 200 мл 0.9% раствора?</p>
                <input type="number" id="mass-input" placeholder="Масса, г" step="0.1" style="width:100%; padding:12px; border-radius:8px; background:#222; color:white; border:1px solid #444;">
                <button class="btn btn-primary" style="margin-top:15px;" id="check-mass-btn">Проверить</button>
                <p id="mass-feedback"></p>
            `;
        }

        area.innerHTML = header + this.wrapStory(story) + content;
        this.setReplica(story);
        if (diff < 2) this.bindAnswer(area);
        else this.initMassCheck();
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

    wrapStory(story) {
        return `<div style="margin-bottom:20px;"><p style="color:var(--text-dim);"><strong>📖</strong> ${story}</p></div>`;
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

    initMassCheck() {
        document.getElementById('check-mass-btn').onclick = () => {
            const val = parseFloat(document.getElementById('mass-input').value);
            const fb = document.getElementById('mass-feedback');
            if (Math.abs(val - 1.8) < 0.1) {
                fb.innerHTML = '✅ Правильно!';
                const spec = gameState.selectedSpecialtyCode;
                if (!gameState.specScores[spec]) gameState.specScores[spec] = 0;
                gameState.specScores[spec] += 3;
            } else {
                fb.innerHTML = '❌ Неверно. 0.9% от 200 г = 1.8 г.';
            }
            Cluster.gameSuccess();
        };
    },

    getHint(specCode, diff) {
        const hints = {
            0: { story: 'pH 7 — нейтральная среда.', tip: '7' },
            1: { story: 'Для точного объёма нужна мерная колба.', tip: 'Мерная колба' },
            2: { story: 'Расчёт: масса = объём × плотность × процент / 100', tip: '200 * 1 * 0.009 = 1.8 г' }
        };
        return hints[diff];
    }
};

window.clusterChem = clusterChem;