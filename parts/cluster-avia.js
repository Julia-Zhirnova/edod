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
        
        // Определяем историю и рендерим в зависимости от специальности
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
                <div class="story-box" style="background:rgba(0,212,255,0.1); padding:12px; border-radius:8px; margin-bottom:20px;">
                    <p style="margin:0; color:var(--text-dim);"><strong>📖 История:</strong> ${story}</p>
                </div>
                <h3>🟢 Инструмент</h3>
                <p>Чем нарезают внутреннюю резьбу?</p>
                <button class="game-btn" data-correct="true">Метчик</button>
                <button class="game-btn">Плашка</button>
                <button class="game-btn">Сверло</button>
                <button class="game-btn">Зенкер</button>
            `;
        } else if (diff === 1) {
            content = `
                <div class="story-box" style="background:rgba(0,212,255,0.1); padding:12px; border-radius:8px; margin-bottom:20px;">
                    <p style="margin:0; color:var(--text-dim);"><strong>📖 История:</strong> ${story}</p>
                </div>
                <h3>🟡 Последовательность</h3>
                <p>Введи правильный порядок этапов (номера через запятую):</p>
                <ol><li>Выбрать материал</li><li>Разметить заготовку</li><li>Обработать на станке</li><li>Контроль размеров</li></ol>
                <input type="text" id="seq-input" placeholder="1,2,3,4" style="width:100%; padding:12px; border-radius:8px; background:#222; color:white; border:1px solid #444;">
                <button class="btn btn-primary" style="margin-top:15px;" id="check-seq-btn">Проверить</button>
                <p id="seq-feedback"></p>
            `;
        } else {
            content = `
                <div class="story-box" style="background:rgba(0,212,255,0.1); padding:12px; border-radius:8px; margin-bottom:20px;">
                    <p style="margin:0; color:var(--text-dim);"><strong>📖 История:</strong> ${story}</p>
                </div>
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
        else if (diff === 1) this.initSequenceCheck();
        else this.initToleranceCheck();
    },

    renderAviaProduction(area, header, story, diff) {
        let content = '';
        if (diff === 0) {
            content = `
                <div class="story-box" style="background:rgba(0,212,255,0.1); padding:12px; border-radius:8px; margin-bottom:20px;">
                    <p style="margin:0; color:var(--text-dim);"><strong>📖 История:</strong> ${story}</p>
                </div>
                <h3>🟢 Осмотр планера</h3>
                <p>Что проверяют при внешнем осмотре?</p>
                <button class="game-btn" data-correct="true">Отсутствие вмятин и трещин</button>
                <button class="game-btn">Давление в шинах</button>
                <button class="game-btn">Уровень масла</button>
            `;
        } else if (diff === 1) {
            content = `
                <div class="story-box" style="background:rgba(0,212,255,0.1); padding:12px; border-radius:8px; margin-bottom:20px;">
                    <p style="margin:0; color:var(--text-dim);"><strong>📖 История:</strong> ${story}</p>
                </div>
                <h3>🟡 Проверка двигателя</h3>
                <p>Какой прибор измеряет тягу двигателя?</p>
                <button class="game-btn" data-correct="true">Тягомер</button>
                <button class="game-btn">Манометр</button>
                <button class="game-btn">Тахометр</button>
            `;
        } else {
            content = `
                <div class="story-box" style="background:rgba(0,212,255,0.1); padding:12px; border-radius:8px; margin-bottom:20px;">
                    <p style="margin:0; color:var(--text-dim);"><strong>📖 История:</strong> ${story}</p>
                </div>
                <h3>🔴 Расчёт центровки</h3>
                <p>Масса пустого самолёта 1000 кг, центровка 25% САХ. Добавили груз 200 кг на 2 м позади ЦТ. Куда сместится центровка?</p>
                <button class="game-btn" data-correct="true">Назад (увеличится плечо)</button>
                <button class="game-btn">Вперёд</button>
                <button class="game-btn">Не изменится</button>
            `;
        }
        area.innerHTML = header + content;
        this.setReplica(story);
        this.bindAnswer(area);
    },

    renderBpla(area, header, story, diff) {
        let content = '';
        if (diff === 0) {
            content = `
                <div class="story-box" style="background:rgba(0,212,255,0.1); padding:12px; border-radius:8px; margin-bottom:20px;">
                    <p style="margin:0; color:var(--text-dim);"><strong>📖 История:</strong> ${story}</p>
                </div>
                <h3>🟢 Потеря связи</h3>
                <p>Что проверить в первую очередь?</p>
                <button class="game-btn" data-correct="true">Антенну и кабель</button>
                <button class="game-btn">Прошивку полётного контроллера</button>
                <button class="game-btn">Батарею</button>
            `;
        } else if (diff === 1) {
            content = `
                <div class="story-box" style="background:rgba(0,212,255,0.1); padding:12px; border-radius:8px; margin-bottom:20px;">
                    <p style="margin:0; color:var(--text-dim);"><strong>📖 История:</strong> ${story}</p>
                </div>
                <h3>🟡 Настройка канала</h3>
                <p>Какая частота обычно используется для управления БПЛА?</p>
                <button class="game-btn" data-correct="true">2.4 ГГц</button>
                <button class="game-btn">433 МГц</button>
                <button class="game-btn">5.8 ГГц</button>
            `;
        } else {
            content = `
                <div class="story-box" style="background:rgba(0,212,255,0.1); padding:12px; border-radius:8px; margin-bottom:20px;">
                    <p style="margin:0; color:var(--text-dim);"><strong>📖 История:</strong> ${story}</p>
                </div>
                <h3>🔴 Программирование автопилота</h3>
                <p>Какой параметр отвечает за максимальный угол крена?</p>
                <button class="game-btn" data-correct="true">ANGLE_MAX</button>
                <button class="game-btn">ALT_HOLD</button>
                <button class="game-btn">WP_RADIUS</button>
            `;
        }
        area.innerHTML = header + content;
        this.setReplica(story);
        this.bindAnswer(area);
    },

    bindAnswer(container) {
        container.querySelectorAll('.game-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.dataset.correct === 'true') {
                    btn.classList.add('correct');
                    gameState.psych.practical += 2;
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
                gameState.psych.practical += 2;
                const spec = gameState.selectedSpecialtyCode;
                if (!gameState.specScores[spec]) gameState.specScores[spec] = 0;
                gameState.specScores[spec] += 2;
            } else {
                fb.innerHTML = '❌ Неверно. Правильный порядок: 1,2,3,4';
            }
            Cluster.gameSuccess();
        };
    },

    initToleranceCheck() {
        document.getElementById('check-tolerance-btn').onclick = () => {
            const cbs = document.querySelectorAll('#cluster-game-area input[type=checkbox]');
            let correct = true;
            cbs.forEach(cb => { if (cb.checked !== (cb.dataset.correct === 'true')) correct = false; });
            if (correct) {
                gameState.psych.practical += 3;
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
                1: { story: 'Порядок: материал → разметка → обработка → контроль.', tip: '1,2,3,4' },
                2: { story: 'Допуск ±0.05 означает интервал [119.95, 120.05].', tip: '119.97, 120.03, 120.00' }
            },
            // ... аналогичные подсказки для остальных специальностей
        };
        return hints[specCode]?.[diff] || { story: 'Подумай логически.', tip: 'Попробуй ещё раз.' };
    }
};

window.clusterAvia = clusterAvia;