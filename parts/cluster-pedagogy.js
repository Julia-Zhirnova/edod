// ==========================================
// КЛАСТЕР: Педагогика
// Специальность: 44.02.02 Преподавание в начальных классах
// ==========================================

const clusterPedagogy = {
    render(area, specCode, diff) {
        const gameArea = document.getElementById('cluster-game-area');
        if (gameArea) gameArea.style.backgroundImage = "url('media/images/cluster-pedagogy-bg.jpg')";

        const header = this.getHeader();
        const story = diff === 0 ? 'На детской площадке фестиваля ребёнок расстроен, говорит: «У меня не получится». Как его поддержать?' :
                     diff === 1 ? 'Составь план урока для юных гостей фестиваля.' :
                     'Ученик не может сосредоточиться. Предложи педагогические приёмы.';

        let content = '';
        if (diff === 0) {
            const opts = [
                { text: '«Давай попробуем вместе. Я помогу»', correct: true },
                { text: '«Надо просто постараться»', correct: false },
                { text: '«У других получается, и у тебя получится»', correct: false },
                { text: '«Если не получится, ничего страшного»', correct: false }
            ];
            content = `<h3>🟢 Мотивация</h3><p>Ребёнок говорит: «У меня не получится». Лучший ответ:</p>` + this.renderShuffledButtons(opts);
        } else if (diff === 1) {
            const steps = [
                'Организационный момент',
                'Актуализация знаний',
                'Объяснение нового материала',
                'Закрепление',
                'Рефлексия'
            ];
            const initialOrder = [2, 0, 4, 1, 3];
            content = this.renderSortableList('seq-list-pedagogy', steps, initialOrder);
        } else {
            content = `
                <h3>🔴 Индивидуальный подход</h3>
                <p>Ученик постоянно отвлекается. Предложи 3 педагогических приёма (напиши кратко).</p>
                <textarea id="methods-input" rows="4" placeholder="1. ... 2. ... 3. ..." style="width:100%; padding:10px; border-radius:8px; background:#222; color:white; border:1px solid #444;"></textarea>
                <button class="btn btn-primary" style="margin-top:15px;" id="check-methods-btn">Проверить</button>
                <p id="methods-feedback"></p>
            `;
        }

        area.innerHTML = header + content;
        this.setReplica(story);
        if (diff === 1) {
            this.initSortableList('seq-list-pedagogy', [0,1,2,3,4], (isCorrect) => {
                if (isCorrect) {
                    const spec = gameState.selectedSpecialtyCode;
                    if (!gameState.specScores[spec]) gameState.specScores[spec] = 0;
                    gameState.specScores[spec] += 2;
                }
                Cluster.gameSuccess();
            });
        } else if (diff === 2) {
            this.initTextCheck();
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

    renderSortableList(containerId, steps, initialOrder) {
        let html = `<h3>🟡 План урока</h3><p>Расставь этапы урока в правильном порядке (используй кнопки ⬆️/⬇️):</p>`;
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

    initTextCheck() {
        document.getElementById('check-methods-btn').onclick = () => {
            const text = document.getElementById('methods-input').value;
            const hasGood = text.includes('внимание') || text.includes('интерес') || text.includes('задание') || text.includes('похвала');
            if (text.length > 20 && hasGood) {
                const spec = gameState.selectedSpecialtyCode;
                if (!gameState.specScores[spec]) gameState.specScores[spec] = 0;
                gameState.specScores[spec] += 3;
                document.getElementById('methods-feedback').innerHTML = '✅ Отлично!';
            } else {
                document.getElementById('methods-feedback').innerHTML = '❌ Опишите хотя бы один приём.';
            }
            Cluster.gameSuccess();
        };
    },

    getHint(specCode, diff) {
        const hints = {
            0: { story: 'Гагарич советует: предложи помощь, не обесценивай чувства.', tip: '«Давай попробуем вместе. Я помогу»' },
            1: { story: 'Классическая структура урока: оргмомент, актуализация, объяснение, закрепление, рефлексия.', tip: 'Перемести "Организационный момент" на первое место.' },
            2: { story: 'Можно менять виды деятельности, давать индивидуальные задания, хвалить за внимание.', tip: 'Напиши несколько приёмов.' }
        };
        return hints[diff];
    }
};

window.clusterPedagogy = clusterPedagogy;