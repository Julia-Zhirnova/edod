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

    renderSpecialist(diff) {
        if (diff === 0) {
            return `<h3>🟢 Диагностика</h3><p>С чего начать проверку?</p>
                <button class="game-btn" data-correct="true">Проверить аккумулятор</button>
                <button class="game-btn">Снять головку блока</button>
                <button class="game-btn">Заменить свечи</button>
                <button class="game-btn">Поменять масло</button>`;
        } else if (diff === 1) {
            return `<h3>🟡 Код ошибки P0300</h3><p>Что он означает?</p>
                <button class="game-btn" data-correct="true">Пропуски зажигания в цилиндрах</button>
                <button class="game-btn">Неисправность датчика кислорода</button>
                <button class="game-btn">Низкое давление масла</button>
                <button class="game-btn">Перегрев двигателя</button>`;
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
            return `<h3>🟢 Первый шаг</h3><p>С чего начать замену колодок?</p>
                <button class="game-btn" data-correct="true">Поднять машину домкратом</button>
                <button class="game-btn">Снять колесо</button>
                <button class="game-btn">Открутить суппорт</button>
                <button class="game-btn">Заменить колодки</button>`;
        } else if (diff === 1) {
            // Шаги в правильном логическом порядке
            const steps = [
                'Поднять машину домкратом',
                'Снять колесо',
                'Открутить суппорт',
                'Заменить колодки'
            ];
            // Начальный перемешанный порядок (индексы): 2,0,3,1 → "Открутить суппорт", "Поднять...", "Заменить колодки", "Снять колесо"
            const initialOrder = [2, 0, 3, 1];
            return this.renderSortableList('seq-list-auto', steps, initialOrder);
        } else {
            return `<h3>🔴 Инструмент</h3><p>Чем открутить суппорт?</p>
                <button class="game-btn" data-correct="true">Торцевой ключ (на 13-15)</button>
                <button class="game-btn">Разводной ключ</button>
                <button class="game-btn">Шестигранник</button>
                <button class="game-btn">Баллонный ключ</button>`;
        }
    },

    // Универсальная функция создания сортируемого списка
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

    // Инициализация логики сортировки
    initSortableList(containerId, correctOrder, onSuccess) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Обработчики кнопок
        container.addEventListener('click', (e) => {
            const btn = e.target.closest('.step-btn');
            if (!btn) return;
            e.preventDefault();
            const pos = parseInt(btn.dataset.pos);
            const items = Array.from(container.querySelectorAll('.sortable-item'));
            if (btn.classList.contains('step-up') && pos > 0) {
                // Меняем местами с предыдущим
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