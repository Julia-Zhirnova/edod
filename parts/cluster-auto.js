// ==========================================
// КЛАСТЕР: Автомототехника
// Специальности: 23.02.07, 23.01.17
// ==========================================

const clusterAuto = {
    render(area, specCode, diff) {
        const gameArea = document.getElementById('cluster-game-area');
        if (gameArea) gameArea.style.backgroundImage = "url('media/images/cluster-auto-bg.jpg')";

        const header = this.getHeader();
        let story = '';
        let content = '';

        if (specCode === '23.02.07') {
            story = diff === 0 ? 'На парковке фестиваля машина не заводится. Гость просит помочь.' :
                   diff === 1 ? 'Подключили сканер — он показывает код P0300. Что это значит?' :
                   'Для новой трансмиссии нужно рассчитать передаточное число.';
            content = this.renderSpecialist(diff);
        } else {
            story = diff === 0 ? 'У машины скрипят тормоза. Нужно заменить колодки.' :
                   diff === 1 ? 'Расставь правильный порядок замены колодок.' :
                   'Какой инструмент нужен для откручивания суппорта?';
            content = this.renderMaster(diff);
        }

        area.innerHTML = header + content;
        this.setReplica(story);

        if (specCode === '23.01.17' && diff === 1) {
            this.initSortableList('seq-list-auto', [0,1,2,3], (isCorrect) => {
                if (isCorrect) {
                    const spec = gameState.selectedSpecialtyCode;
                    if (!gameState.specScores[spec]) gameState.specScores[spec] = 0;
                    gameState.specScores[spec] += 2;
                }
                Cluster.gameSuccess();
            });
        } else if (specCode === '23.02.07' && diff === 2) {
            this.initRatioCheck();
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

    renderSpecialist(diff) {
        if (diff === 0) {
            const opts = [
                { text: 'Проверить аккумулятор', correct: true },
                { text: 'Снять головку блока', correct: false },
                { text: 'Заменить свечи', correct: false },
                { text: 'Поменять масло', correct: false }
            ];
            return `<h3>🟢 Диагностика</h3><p>С чего начать проверку?</p>` + this.renderShuffledButtons(opts);
        } else if (diff === 1) {
            const opts = [
                { text: 'Пропуски зажигания в цилиндрах', correct: true },
                { text: 'Неисправность датчика кислорода', correct: false },
                { text: 'Низкое давление масла', correct: false },
                { text: 'Перегрев двигателя', correct: false }
            ];
            return `<h3>🟡 Код ошибки P0300</h3><p>Что он означает?</p>` + this.renderShuffledButtons(opts);
        } else {
            return `<h3>🔴 Передаточное число</h3>
                <p>Ведущая шестерня — 20 зубьев, ведомая — 60. Какое передаточное число?</p>
                <input type="number" id="ratio-input" placeholder="Введите число" step="0.1" style="width:100%; padding:12px; border-radius:8px; background:#222; color:white; border:1px solid #444;">
                <button class="btn btn-primary" style="margin-top:15px;" id="check-ratio-btn">Проверить</button>
                <p id="ratio-feedback"></p>`;
        }
    },

    renderMaster(diff) {
        if (diff === 0) {
            const opts = [
                { text: 'Поднять машину домкратом', correct: true },
                { text: 'Снять колесо', correct: false },
                { text: 'Открутить суппорт', correct: false },
                { text: 'Заменить колодки', correct: false }
            ];
            return `<h3>🟢 Первый шаг</h3><p>С чего начать замену колодок?</p>` + this.renderShuffledButtons(opts);
        } else if (diff === 1) {
            const steps = [
                'Поднять машину домкратом',
                'Снять колесо',
                'Открутить суппорт',
                'Заменить колодки'
            ];
            const initialOrder = [2, 0, 3, 1];
            return this.renderSortableList('seq-list-auto', steps, initialOrder);
        } else {
            const opts = [
                { text: 'Торцевой ключ (на 13-15)', correct: true },
                { text: 'Разводной ключ', correct: false },
                { text: 'Шестигранник', correct: false },
                { text: 'Баллонный ключ', correct: false }
            ];
            return `<h3>🔴 Инструмент</h3><p>Чем открутить суппорт?</p>` + this.renderShuffledButtons(opts);
        }
    },

    renderSortableList(containerId, steps, initialOrder) {
        let html = `<h3>🟡 Правильная последовательность</h3><p>Расставь шаги по порядку (используй кнопки ⬆️/⬇️):</p>`;
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

    initRatioCheck() {
        document.getElementById('check-ratio-btn').onclick = () => {
            const val = parseFloat(document.getElementById('ratio-input').value);
            const fb = document.getElementById('ratio-feedback');
            if (Math.abs(val - 3.0) < 0.01) {
                fb.innerHTML = '✅ Правильно!';
                const spec = gameState.selectedSpecialtyCode;
                if (!gameState.specScores[spec]) gameState.specScores[spec] = 0;
                gameState.specScores[spec] += 3;
            } else {
                fb.innerHTML = '❌ Неверно. Передаточное число = 60 / 20 = 3.';
            }
            Cluster.gameSuccess();
        };
    },

    getHint(specCode, diff) {
        const hints = {
            '23.02.07': {
                0: { story: 'Гагарич знает: без аккумулятора не заведётся.', tip: 'Проверь аккумулятор.' },
                1: { story: 'P0300 — пропуски зажигания.', tip: 'Пропуски зажигания в цилиндрах.' },
                2: { story: 'Передаточное = ведомая / ведущая.', tip: '60 / 20 = 3.0' }
            },
            '23.01.17': {
                0: { story: 'Безопасность — сначала домкрат.', tip: 'Поднять машину домкратом.' },
                1: { story: 'Порядок: домкрат → колесо → суппорт → колодки.', tip: 'Подними "Поднять машину домкратом" наверх.' },
                2: { story: 'Суппорт крепится болтами под торцевой ключ.', tip: 'Торцевой ключ.' }
            }
        };
        return hints[specCode]?.[diff] || { story: 'Подумай логически.', tip: 'Попробуй ещё раз.' };
    }
};

window.clusterAuto = clusterAuto;