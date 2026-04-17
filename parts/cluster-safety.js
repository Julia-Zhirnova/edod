// ==========================================
// КЛАСТЕР: Безопасность и ЧС
// Специальность: 20.02.04 Пожарная безопасность
// ==========================================

const clusterSafety = {
    render(area, specCode, diff) {
        const gameArea = document.getElementById('cluster-game-area');
        if (gameArea) gameArea.style.backgroundImage = "url('media/images/cluster-safety-bg.jpg')";

        const header = this.getHeader();
        const story = diff === 0 ? 'На фестивале задымился электроприбор. Чем будем тушить?' :
                     diff === 1 ? 'Расставь действия при пожаре по порядку.' :
                     'Рассчитай время эвакуации из павильона.';
        
        let content = '';
        if (diff === 0) {
            content = `
                ${this.wrapStory(story)}
                <h3>🟢 Выбор огнетушителя</h3>
                <p>Каким тушить электроустановки под напряжением?</p>
                <button class="game-btn" data-correct="true">Углекислотным (ОУ)</button>
                <button class="game-btn">Пенным (ОХП)</button>
                <button class="game-btn">Водным (ОВ)</button>
                <button class="game-btn">Порошковым (любым)</button>
            `;
        } else if (diff === 1) {
            content = `
                ${this.wrapStory(story)}
                <h3>🟡 Порядок действий</h3>
                <p>Введи номера через запятую:</p>
                <ol><li>Сообщить в пожарную охрану</li><li>Эвакуировать людей</li><li>Приступить к тушению (если безопасно)</li><li>Встретить пожарных</li></ol>
                <input type="text" id="seq-input" placeholder="1,2,3,4" style="width:100%; padding:12px; border-radius:8px; background:#222; color:white; border:1px solid #444;">
                <button class="btn btn-primary" style="margin-top:15px;" id="check-seq-btn">Проверить</button>
                <p id="seq-feedback"></p>
            `;
        } else {
            content = `
                ${this.wrapStory(story)}
                <h3>🔴 Расчёт времени эвакуации</h3>
                <p>Длина пути 40 м, скорость 16 м/мин. Сколько минут?</p>
                <input type="number" id="time-input" placeholder="Минуты" step="0.1" style="width:100%; padding:12px; border-radius:8px; background:#222; color:white; border:1px solid #444;">
                <button class="btn btn-primary" style="margin-top:15px;" id="check-time-btn">Проверить</button>
                <p id="time-feedback"></p>
            `;
        }

        area.innerHTML = header + content;
        this.setReplica(story);
        if (diff === 1) {
            this.initSequenceCheck();
        } else if (diff === 2) {
            this.initTimeCheck();
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

    initSequenceCheck() {
        document.getElementById('check-seq-btn').onclick = () => {
            const val = document.getElementById('seq-input').value.trim();
            const fb = document.getElementById('seq-feedback');
            if (val === '1,2,3,4' || val === '1, 2, 3, 4') {
                fb.innerHTML = '✅ Правильно!';
                const spec = gameState.selectedSpecialtyCode;
                if (!gameState.specScores[spec]) gameState.specScores[spec] = 0;
                gameState.specScores[spec] += 2;
            } else {
                fb.innerHTML = '❌ Неверно. Правильный порядок: 1,2,3,4';
            }
            Cluster.gameSuccess();
        };
    },

    initTimeCheck() {
        document.getElementById('check-time-btn').onclick = () => {
            const val = parseFloat(document.getElementById('time-input').value);
            const fb = document.getElementById('time-feedback');
            if (Math.abs(val - 2.5) < 0.1) {
                fb.innerHTML = '✅ Правильно!';
                const spec = gameState.selectedSpecialtyCode;
                if (!gameState.specScores[spec]) gameState.specScores[spec] = 0;
                gameState.specScores[spec] += 3;
            } else {
                fb.innerHTML = '❌ Неверно. 40 / 16 = 2.5 мин.';
            }
            Cluster.gameSuccess();
        };
    },

    getHint(specCode, diff) {
        const hints = {
            0: { story: 'Электроустановки тушат только углекислотным огнетушителем.', tip: 'Углекислотный (ОУ)' },
            1: { story: 'Сначала сообщить, потом эвакуировать, затем тушить, встречать.', tip: '1,2,3,4' },
            2: { story: 'Формула: время = путь / скорость.', tip: '40 / 16 = 2.5' }
        };
        return hints[diff];
    }
};

window.clusterSafety = clusterSafety;