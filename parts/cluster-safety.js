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
                <h3>🟢 Выбор огнетушителя</h3>
                <p>Каким тушить электроустановки под напряжением?</p>
                <button class="game-btn" data-correct="true">Углекислотным (ОУ)</button>
                <button class="game-btn">Пенным (ОХП)</button>
                <button class="game-btn">Водным (ОВ)</button>
                <button class="game-btn">Порошковым (любым)</button>
            `;
        } else if (diff === 1) {
            const steps = [
                'Сообщить в пожарную охрану',
                'Эвакуировать людей',
                'Приступить к тушению (если безопасно)',
                'Встретить пожарных'
            ];
            const initialOrder = [2, 0, 3, 1]; // перемешанный порядок
            content = this.renderSortableList('seq-list-safety', steps, initialOrder);
        } else {
            content = `
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
            this.initSortableList('seq-list-safety', [0,1,2,3], (isCorrect) => {
                if (isCorrect) {
                    const spec = gameState.selectedSpecialtyCode;
                    if (!gameState.specScores[spec]) gameState.specScores[spec] = 0;
                    gameState.specScores[spec] += 2;
                }
                Cluster.gameSuccess();
            });
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

    // Универсальная функция создания сортируемого списка
    renderSortableList(containerId, steps, initialOrder) {
        let html = `<h3>🟡 Действия при пожаре</h3><p>Расставь действия в правильном порядке (используй кнопки ⬆️/⬇️):</p>`;
        html += `<div id="${containerId}" class="sortable-list" style="margin:15px 0;">`;
        initialOrder.forEach((stepIdx, pos) => {
            html += `<div class="sortable-item" data-step-index="${stepIdx}" data-current-pos="${pos}">`;
            html += `<span class="step-text">${steps[stepIdx]}</span>`;
            html += `<div class="step-controls">`;
            if (pos > 0) html += `<button class="step-btn step-up" data-pos="${pos}">⬆️</button>`;
            if (pos < initialOrder.length - 1) html += `<button class="step-btn step-down" data-pos="${pos}">⬇️</button>`;
            html += `</div></div>`;
        });
        html += `</div>`;
        html += `<button class="btn btn-primary" id="check-${containerId}">Проверить</button>`;
        html += `<p id="${containerId}-feedback" style="margin-top:10px;"></p>`;
        return html;
    },

    initSortableList(containerId, correctOrder, onSuccess) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.addEventListener('click', (e) => {
            const btn = e.target.closest('.step-btn');
            if (!btn) return;
            e.preventDefault();
            const pos = parseInt(btn.dataset.pos);
            const items = Array.from(container.querySelectorAll('.sortable-item'));
            if (btn.classList.contains('step-up') && pos > 0) {
                const prevItem = items[pos - 1];
                const currentItem = items[pos];
                container.insertBefore(currentItem, prevItem);
                this.updateSortableButtons(container);
            } else if (btn.classList.contains('step-down') && pos < items.length - 1) {
                const nextItem = items[pos + 1];
                const currentItem = items[pos];
                container.insertBefore(nextItem, currentItem);
                this.updateSortableButtons(container);
            }
        });

        const checkBtn = document.getElementById(`check-${containerId}`);
        const feedback = document.getElementById(`${containerId}-feedback`);
        checkBtn.onclick = () => {
            const items = container.querySelectorAll('.sortable-item');
            const currentOrder = Array.from(items).map(item => parseInt(item.dataset.stepIndex));
            const isCorrect = currentOrder.length === correctOrder.length &&
                              currentOrder.every((val, idx) => val === correctOrder[idx]);
            if (isCorrect) {
                feedback.innerHTML = '✅ Правильно!';
                if (onSuccess) onSuccess(true);
            } else {
                feedback.innerHTML = '❌ Порядок неверный. Попробуй ещё раз.';
                if (onSuccess) onSuccess(false);
            }
        };

        this.updateSortableButtons(container);
    },

    updateSortableButtons(container) {
        const items = container.querySelectorAll('.sortable-item');
        items.forEach((item, idx) => {
            const controls = item.querySelector('.step-controls');
            controls.innerHTML = '';
            if (idx > 0) {
                const upBtn = document.createElement('button');
                upBtn.className = 'step-btn step-up';
                upBtn.dataset.pos = idx;
                upBtn.textContent = '⬆️';
                controls.appendChild(upBtn);
            }
            if (idx < items.length - 1) {
                const downBtn = document.createElement('button');
                downBtn.className = 'step-btn step-down';
                downBtn.dataset.pos = idx;
                downBtn.textContent = '⬇️';
                controls.appendChild(downBtn);
            }
        });
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
            1: { story: 'Сначала сообщить, потом эвакуировать, затем тушить, встречать.', tip: 'Перемести "Сообщить в пожарную охрану" на первое место.' },
            2: { story: 'Формула: время = путь / скорость.', tip: '40 / 16 = 2.5' }
        };
        return hints[diff];
    }
};

window.clusterSafety = clusterSafety;