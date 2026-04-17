// ==========================================
// КЛАСТЕР: Право и документация
// Специальности: 40.02.04, 46.02.01
// ==========================================

const clusterLaw = {
    render(area, specCode, diff) {
        const gameArea = document.getElementById('cluster-game-area');
        if (gameArea) gameArea.style.backgroundImage = "url('media/images/cluster-law-bg.jpg')";

        const header = this.getHeader();
        let story = '';
        let content = '';

        if (specCode === '40.02.04') {
            story = diff === 0 ? 'Участнику фестиваля не понравилось мероприятие, он хочет вернуть деньги за билет. На какой закон сослаться?' :
                   diff === 1 ? 'Какой документ является главным законом РФ?' :
                   'Составь претензию: какова её правильная структура?';
            content = this.renderJurist(diff);
        } else {
            story = diff === 0 ? 'Сколько лет хранятся личные дела сотрудников фестиваля?' :
                   diff === 1 ? 'Какой документ является основным законом?' :
                   'Расставь реквизиты приказа по порядку.';
            content = this.renderDocument(diff);
        }

        area.innerHTML = header + this.wrapStory(story) + content;
        this.setReplica(story);

        if (specCode === '46.02.01' && diff === 2) {
            this.initSequenceCheck();
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

    renderJurist(diff) {
        if (diff === 0) {
            return `<h3>🟢 Возврат билета</h3><p>Какой закон?</p>
                <button class="game-btn" data-correct="true">Закон о защите прав потребителей</button>
                <button class="game-btn">Гражданский кодекс</button>
                <button class="game-btn">Трудовой кодекс</button>`;
        } else if (diff === 1) {
            return `<h3>🟡 Основной закон РФ</h3><p>Как называется?</p>
                <button class="game-btn" data-correct="true">Конституция</button>
                <button class="game-btn">Гражданский кодекс</button>
                <button class="game-btn">Уголовный кодекс</button>`;
        } else {
            return `<h3>🔴 Структура претензии</h3><p>Выбери правильную последовательность:</p>
                <button class="game-btn" data-correct="true">Шапка → описание → требование → приложения</button>
                <button class="game-btn">Требование → описание → шапка → приложения</button>
                <button class="game-btn">Описание → шапка → требование → приложения</button>`;
        }
    },

    renderDocument(diff) {
        if (diff === 0) {
            return `<h3>🟢 Срок хранения личных дел</h3><p>Сколько лет?</p>
                <button class="game-btn" data-correct="true">75 лет</button>
                <button class="game-btn">5 лет</button>
                <button class="game-btn">10 лет</button>`;
        } else if (diff === 1) {
            return `<h3>🟡 Основной закон</h3><p>Как называется?</p>
                <button class="game-btn" data-correct="true">Конституция</button>
                <button class="game-btn">Гражданский кодекс</button>
                <button class="game-btn">Уголовный кодекс</button>`;
        } else {
            return `<h3>🔴 Реквизиты приказа</h3>
                <p>Введи правильный порядок номеров через запятую:</p>
                <ol><li>Дата</li><li>Номер</li><li>Заголовок</li><li>Текст</li></ol>
                <input type="text" id="seq-input" placeholder="1,2,3,4" style="width:100%; padding:12px; border-radius:8px; background:#222; color:white; border:1px solid #444;">
                <button class="btn btn-primary" style="margin-top:15px;" id="check-seq-btn">Проверить</button>
                <p id="seq-feedback"></p>`;
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

    initSequenceCheck() {
        document.getElementById('check-seq-btn').onclick = () => {
            const val = document.getElementById('seq-input').value.trim();
            const fb = document.getElementById('seq-feedback');
            if (val === '1,2,3,4' || val === '1, 2, 3, 4') {
                fb.innerHTML = '✅ Правильно!';
                gameState.psych.org += 3;
                const spec = gameState.selectedSpecialtyCode;
                if (!gameState.specScores[spec]) gameState.specScores[spec] = 0;
                gameState.specScores[spec] += 3;
            } else {
                fb.innerHTML = '❌ Неверно. Правильный порядок: 1,2,3,4';
            }
            Cluster.gameSuccess();
        };
    },

    getHint(specCode, diff) {
        const hints = {
            '40.02.04': {
                0: { story: 'Права потребителей защищает специальный закон.', tip: 'Закон о защите прав потребителей' },
                1: { story: 'Главный документ страны.', tip: 'Конституция' },
                2: { story: 'Структура: шапка → описание → требование → приложения.', tip: 'Выбери этот вариант.' }
            },
            '46.02.01': {
                0: { story: 'Личные дела хранятся 75 лет.', tip: '75 лет' },
                1: { story: 'Конституция — основной закон.', tip: 'Конституция' },
                2: { story: 'Приказ: дата, номер, заголовок, текст.', tip: '1,2,3,4' }
            }
        };
        return hints[specCode]?.[diff] || { story: 'Подумай логически.', tip: 'Попробуй ещё раз.' };
    }
};

window.clusterLaw = clusterLaw;