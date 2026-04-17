// ==========================================
// КЛАСТЕР: Педагогика
// Специальность: 44.02.02 Преподавание в начальных классах
// ==========================================

const clusterPedagogy = {
    render(area, specCode, diff) {
        const gameArea = document.getElementById('cluster-game-area');
        if (gameArea) gameArea.style.backgroundImage = "url('media/images/cluster-pedagogy-bg.jpg')";

        const header = this.getHeader();
        let story = '';
        let content = '';

        story = diff === 0 ? 'На детской площадке фестиваля ребёнок расстроен, говорит: «У меня не получится». Как его поддержать?' :
               diff === 1 ? 'Составь план урока для юных гостей фестиваля.' :
               'Ученик не может сосредоточиться. Предложи педагогические приёмы.';
        content = this.renderContent(diff);

        area.innerHTML = header + this.wrapStory(story) + content;
        this.setReplica(story);

        if (diff === 1) {
            this.initSequenceCheck();
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

    wrapStory(story) {
        return `<div class="story-box" style="background:rgba(0,212,255,0.1); padding:12px; border-radius:8px; margin-bottom:20px;">
            <p style="margin:0; color:var(--text-dim);"><strong>📖 История:</strong> ${story}</p>
        </div>`;
    },

    renderContent(diff) {
        if (diff === 0) {
            return `<h3>🟢 Мотивация</h3>
                <p>Ребёнок говорит: «У меня не получится». Лучший ответ:</p>
                <button class="game-btn" data-correct="true">«Давай попробуем вместе. Я помогу»</button>
                <button class="game-btn">«Надо просто постараться»</button>
                <button class="game-btn">«У других получается, и у тебя получится»</button>
                <button class="game-btn">«Если не получится, ничего страшного»</button>`;
        } else if (diff === 1) {
            return `<h3>🟡 Планирование урока</h3>
                <p>Введи правильный порядок этапов (номера через запятую):</p>
                <ol><li>Организационный момент</li><li>Актуализация знаний</li><li>Объяснение нового материала</li><li>Закрепление</li><li>Рефлексия</li></ol>
                <input type="text" id="seq-input" placeholder="1,2,3,4,5" style="width:100%; padding:12px; border-radius:8px; background:#222; color:white; border:1px solid #444;">
                <button class="btn btn-primary" style="margin-top:15px;" id="check-seq-btn">Проверить</button>
                <p id="seq-feedback"></p>`;
        } else {
            return `<h3>🔴 Индивидуальный подход</h3>
                <p>Ученик постоянно отвлекается. Предложи 3 педагогических приёма (напиши кратко).</p>
                <textarea id="methods-input" rows="4" placeholder="1. ... 2. ... 3. ..." style="width:100%; padding:10px; border-radius:8px; background:#222; color:white; border:1px solid #444;"></textarea>
                <button class="btn btn-primary" style="margin-top:15px;" id="check-methods-btn">Проверить</button>
                <p id="methods-feedback"></p>`;
        }
    },

    bindAnswer(container) {
        container.querySelectorAll('.game-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.dataset.correct === 'true') {
                    btn.classList.add('correct');
                    gameState.psych.communicative += 2;
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
            if (val === '1,2,3,4,5' || val === '1, 2, 3, 4, 5') {
                fb.innerHTML = '✅ Правильно!';
                gameState.psych.org += 2;
                const spec = gameState.selectedSpecialtyCode;
                if (!gameState.specScores[spec]) gameState.specScores[spec] = 0;
                gameState.specScores[spec] += 2;
            } else {
                fb.innerHTML = '❌ Неверно. Правильный порядок: 1,2,3,4,5';
            }
            Cluster.gameSuccess();
        };
    },

    initTextCheck() {
        document.getElementById('check-methods-btn').onclick = () => {
            const text = document.getElementById('methods-input').value;
            const hasGood = text.includes('внимание') || text.includes('интерес') || text.includes('задание') || text.includes('похвала');
            if (text.length > 20 && hasGood) {
                gameState.psych.communicative += 3;
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
            1: { story: 'Классическая структура урока: оргмомент, актуализация, объяснение, закрепление, рефлексия.', tip: '1,2,3,4,5' },
            2: { story: 'Можно менять виды деятельности, давать индивидуальные задания, хвалить за внимание.', tip: 'Напиши несколько приёмов.' }
        };
        return hints[diff];
    }
};

window.clusterPedagogy = clusterPedagogy;