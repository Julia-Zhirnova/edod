// ==========================================
// КЛАСТЕР: Авиа/Машиностроение
// Специальности: 15.02.16, 25.02.06, 25.02.08, 12.01.09, 15.01.35, 15.01.38
// ==========================================

const clusterAvia = {
    render(area, specCode, diff) {
        const gameArea = document.getElementById('cluster-game-area');
        if (gameArea) gameArea.style.backgroundImage = "url('media/images/cluster-avia-bg.jpg')";

        const header = this.getHeader();
        let story = '';

        if (['15.02.16', '15.01.35', '15.01.38', '12.01.09'].includes(specCode)) {
            story = diff === 0 ? 'Для фестиваля нужно изготовить деталь по чертежу. С чего начнём?' :
                   diff === 1 ? 'Деталь почти готова, осталось соблюсти правильную последовательность операций.' :
                   'Проверь, пройдут ли готовые детали контроль качества.';
            this.renderMachining(area, header, story, specCode, diff);
        } else if (specCode === '25.02.06') {
            story = diff === 0 ? 'На статической стоянке фестиваля представлен самолёт. Нужно осмотреть планер.' :
                   diff === 1 ? 'Проверь двигатель перед запуском.' :
                   'Рассчитай центровку самолёта.';
            this.renderAviaProduction(area, header, story, diff);
        } else if (specCode === '25.02.08') {
            story = diff === 0 ? 'Беспилотник потерял связь с пультом. Найди причину.' :
                   diff === 1 ? 'Настрой канал управления.' :
                   'Запрограммируй простой автопилот.';
            this.renderBpla(area, header, story, diff);
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

    renderMachining(area, header, story, specCode, diff) {
        let content = '';
        if (diff === 0) {
            content = `
                <h3>🟢 Инструмент</h3>
                <p>Чем нарезают внутреннюю резьбу?</p>
                <button class="game-btn" data-correct="true">Метчик</button>
                <button class="game-btn">Плашка</button>
                <button class="game-btn">Сверло</button>
                <button class="game-btn">Зенкер</button>
            `;
        } else if (diff === 1) {
            const steps = [
                'Выбрать материал',
                'Разметить заготовку',
                'Обработать на станке',
                'Контроль размеров'
            ];
            const initialOrder = [2, 0, 3, 1]; // перемешанный порядок
            content = this.renderSortableList('seq-list-avia', steps, initialOrder);
        } else {
            content = `
                <h3>🔴 Допуски</h3>
                <p>Номинальный размер 120.00 мм, допуск ±0.05. Какие замеры пройдут контроль?</p>
                <div style="text-align:left;">
                    <label><input type="checkbox" value="119.97" data-correct="true"> 119.97 мм</label><br>
                    <label><input type="checkbox" value="119.90"> 119.90 мм</label><br>
                    <label><input type="checkbox" value="120.03" data-correct="true"> 120.03 мм</label><br>
                    <label><input type="checkbox" value="120.08"> 120.08 мм</label><br>
                    <label><input type="checkbox" value="120.00" data-correct="true"> 120.00 мм</label>
                </div>
                <button class="btn btn-primary" style="margin-top:15px;" id="check-tolerance-btn">Проверить</button>
                <p id="tolerance-feedback"></p>
            `;
        }

        area.innerHTML = header + content;
        this.setReplica(story);
        if (diff === 0) this.bindAnswer(area);
        else if (diff === 1) {
            this.initSortableList('seq-list-avia', [0,1,2,3], (isCorrect) => {
                if (isCorrect) {
                    const spec = gameState.selectedSpecialtyCode;
                    if (!gameState.specScores[spec]) gameState.specScores[spec] = 0;
                    gameState.specScores[spec] += 2;
                }
                Cluster.gameSuccess();
            });
        }
        else this.initToleranceCheck();
    },

    renderAviaProduction(area, header, story, diff) {
        let content = '';
        if (diff === 0) {
            content = `
                <h3>🟢 Осмотр планера</h3>
                <p>Что проверяют при внешнем осмотре?</p>
                <button class="game-btn" data-correct="true">Отсутствие вмятин и трещин</button>
                <button class="game-btn">Давление в шинах</button>
                <button class="game-btn">Уровень масла</button>`;
        } else if (diff === 1) {
            content = `
                <h3>🟡 Проверка двигателя</h3>
                <p>Какой прибор измеряет тягу двигателя?</p>
                <button class="game-btn" data-correct="true">Тягомер</button>
                <button class="game-btn">Манометр</button>
                <button class="game-btn">Тахометр</button>`;
        } else {
            content = `
                <h3>🔴 Расчёт центровки</h3>
                <p>Масса пустого самолёта 1000 кг, центровка 25% САХ. Добавили груз 200 кг на 2 м позади ЦТ. Куда сместится центровка?</p>
                <button class="game-btn" data-correct="true">Назад (увеличится плечо)</button>
                <button class="game-btn">Вперёд</button>
                <button class="game-btn">Не изменится</button>`;
        }
        area.innerHTML = header + content;
        this.setReplica(story);
        this.bindAnswer(area);
    },

    renderBpla(area, header, story, diff) {
        let content = '';
        if (diff === 0) {
            content = `
                <h3>🟢 Потеря связи</h3>
                <p>Что проверить в первую очередь?</p>
                <button class="game-btn" data-correct="true">Антенну и кабель</button>
                <button class="game-btn">Прошивку полётного контроллера</button>
                <button class="game-btn">Батарею</button>`;
        } else if (diff === 1) {
            content = `
                <h3>🟡 Настройка канала</h3>
                <p>Какая частота обычно используется для управления БПЛА?</p>
                <button class="game-btn" data-correct="true">2.4 ГГц</button>
                <button class="game-btn">433 МГц</button>
                <button class="game-btn">5.8 ГГц</button>`;
        } else {
            content = `
                <h3>🔴 Программирование автопилота</h3>
                <p>Какой параметр отвечает за максимальный угол крена?</p>
                <button class="game-btn" data-correct="true">ANGLE_MAX</button>
                <button class="game-btn">ALT_HOLD</button>
                <button class="game-btn">WP_RADIUS</button>`;
        }
        area.innerHTML = header + content;
        this.setReplica(story);
        this.bindAnswer(area);
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

    initToleranceCheck() {
        document.getElementById('check-tolerance-btn').onclick = () => {
            const cbs = document.querySelectorAll('#cluster-game-area input[type=checkbox]');
            let correct = true;
            cbs.forEach(cb => { if (cb.checked !== (cb.dataset.correct === 'true')) correct = false; });
            if (correct) {
                const spec = gameState.selectedSpecialtyCode;
                if (!gameState.specScores[spec]) gameState.specScores[spec] = 0;
                gameState.specScores[spec] += 3;
            }
            document.getElementById('tolerance-feedback').innerHTML = correct ? '✅' : '❌ Правильные: 119.97, 120.03, 120.00';
            Cluster.gameSuccess();
        };
    },

    getHint(specCode, diff) {
        const hints = {
            '15.02.16': {
                0: { story: 'Для внутренней резьбы используют метчик.', tip: 'Метчик' },
                1: { story: 'Порядок: материал → разметка → обработка → контроль.', tip: 'Подними "Выбрать материал" наверх.' },
                2: { story: 'Допуск ±0.05 означает интервал [119.95, 120.05].', tip: '119.97, 120.03, 120.00' }
            },
            '25.02.06': {
                0: { story: 'Внешний осмотр — вмятины и трещины.', tip: 'Отсутствие вмятин и трещин' },
                1: { story: 'Тягу измеряют тягомером.', tip: 'Тягомер' },
                2: { story: 'Груз сзади смещает центровку назад.', tip: 'Назад' }
            },
            '25.02.08': {
                0: { story: 'Сначала проверь антенну.', tip: 'Антенну и кабель' },
                1: { story: 'Стандарт управления — 2.4 ГГц.', tip: '2.4 ГГц' },
                2: { story: 'Максимальный угол крена — ANGLE_MAX.', tip: 'ANGLE_MAX' }
            }
        };
        return hints[specCode]?.[diff] || hints['15.02.16'][diff] || { story: 'Подумай логически.', tip: 'Попробуй ещё раз.' };
    }
};

window.clusterAvia = clusterAvia;