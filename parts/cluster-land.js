// ==========================================
// КЛАСТЕР: Землеустройство
// Специальность: 21.02.19 Землеустройство
// ==========================================

const clusterLand = {
    render(area, specCode, diff) {
        const gameArea = document.getElementById('cluster-game-area');
        if (gameArea) gameArea.style.backgroundImage = "url('media/images/cluster-land-bg.jpg')";

        const header = this.getHeader();
        let story = '';
        let content = '';

        story = diff === 0 ? 'Размечаем территорию фестиваля. Какой масштаб у карты?' :
               diff === 1 ? 'Какой прибор измерит превышение?' :
               'Рассчитай площадь участка в гектарах.';
        content = this.renderContent(diff);

        area.innerHTML = header + this.wrapStory(story) + content;
        this.setReplica(story);

        if (diff === 2) {
            this.initAreaCheck();
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

    wrapStory(story) {
        return `<div class="story-box" style="background:rgba(0,212,255,0.1); padding:12px; border-radius:8px; margin-bottom:20px;">
            <p style="margin:0; color:var(--text-dim);"><strong>📖 История:</strong> ${story}</p>
        </div>`;
    },

    renderContent(diff) {
        if (diff === 0) {
            return `<h3>🟢 Масштаб карты</h3>
                <p>Масштаб 1:1000 — 1 см на карте это:</p>
                <button class="game-btn" data-correct="true">10 метров на местности</button>
                <button class="game-btn">100 метров</button>
                <button class="game-btn">1 км</button>
                <button class="game-btn">1000 метров</button>`;
        } else if (diff === 1) {
            return `<h3>🟡 Геодезический прибор</h3>
                <p>Для измерения превышений используют:</p>
                <button class="game-btn" data-correct="true">Нивелир</button>
                <button class="game-btn">Теодолит</button>
                <button class="game-btn">Тахеометр</button>
                <button class="game-btn">Дальномер</button>`;
        } else {
            return `<h3>🔴 Площадь участка</h3>
                <p>Участок 60 м × 40 м. Площадь в гектарах?</p>
                <input type="number" id="area-input" placeholder="Площадь в га" step="0.01" style="width:100%; padding:12px; border-radius:8px; background:#222; color:white; border:1px solid #444;">
                <button class="btn btn-primary" style="margin-top:15px;" id="check-area-btn">Проверить</button>
                <p id="area-feedback"></p>`;
        }
    },

    bindAnswer(container) {
        container.querySelectorAll('.game-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.dataset.correct === 'true') {
                    btn.classList.add('correct');
                    gameState.psych.analytic += 2;
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

    initAreaCheck() {
        document.getElementById('check-area-btn').onclick = () => {
            const val = parseFloat(document.getElementById('area-input').value);
            const fb = document.getElementById('area-feedback');
            if (Math.abs(val - 0.24) < 0.01) {
                fb.innerHTML = '✅ Правильно!';
                gameState.psych.analytic += 3;
                const spec = gameState.selectedSpecialtyCode;
                if (!gameState.specScores[spec]) gameState.specScores[spec] = 0;
                gameState.specScores[spec] += 3;
            } else {
                fb.innerHTML = '❌ Неверно. 60×40 = 2400 м² = 0.24 га.';
            }
            Cluster.gameSuccess();
        };
    },

    getHint(specCode, diff) {
        const hints = {
            0: { story: 'Масштаб 1:1000 — в 1 см 10 метров.', tip: '10 метров' },
            1: { story: 'Нивелир — прибор для измерения превышений.', tip: 'Нивелир' },
            2: { story: '1 га = 10 000 м². 2400 м² = 0.24 га.', tip: '0.24' }
        };
        return hints[diff];
    }
};

window.clusterLand = clusterLand;