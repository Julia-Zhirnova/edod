// ==========================================
// КЛАСТЕР: Пищевое производство
// Специальности: 43.02.15, 19.01.18
// ==========================================

const clusterFood = {
    render(area, specCode, diff) {
        const gameArea = document.getElementById('cluster-game-area');
        if (gameArea) gameArea.style.backgroundImage = "url('media/images/cluster-food-bg.jpg')";

        const header = this.getHeader();
        let story = '';
        let content = '';

        if (specCode === '43.02.15') {
            story = diff === 0 ? 'Готовим угощение для гостей фестиваля. Соблюдаем санитарию!' :
                   diff === 1 ? 'Почему бисквит опал?' :
                   'Рассчитай количество муки для большой партии.';
            content = this.renderChef(diff);
        } else {
            story = diff === 0 ? 'На линии производства соков нужно проверить пастеризацию.' :
                   diff === 1 ? 'Какой параметр критичен при пастеризации?' :
                   'Сколько сырья нужно для партии?';
            content = this.renderOperator(diff);
        }

        area.innerHTML = header + content;
        this.setReplica(story);

        if (specCode === '43.02.15' && diff === 2) {
            this.initFlourCheck();
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

    renderChef(diff) {
        if (diff === 0) {
            const opts = [
                { text: 'Перед началом и после каждого перерыва', correct: true },
                { text: 'Один раз в день', correct: false },
                { text: 'Только после туалета', correct: false }
            ];
            return `<h3>🟢 Санитарные нормы</h3><p>Как часто мыть руки на кухне?</p>` + this.renderShuffledButtons(opts);
        } else if (diff === 1) {
            const opts = [
                { text: 'Резкий перепад температуры (рано открыли духовку)', correct: true },
                { text: 'Мало сахара', correct: false },
                { text: 'Слишком долго взбивали', correct: false }
            ];
            return `<h3>🟡 Бисквит опал</h3><p>В чём причина?</p>` + this.renderShuffledButtons(opts);
        } else {
            return `<h3>🔴 Расчёт рецептуры</h3>
                <p>На 4 порции — 200 г муки. Сколько на 10 порций?</p>
                <input type="number" id="flour-input" placeholder="Граммы" style="width:100%; padding:12px; border-radius:8px; background:#222; color:white; border:1px solid #444;">
                <button class="btn btn-primary" style="margin-top:15px;" id="check-flour-btn">Проверить</button>
                <p id="flour-feedback"></p>`;
        }
    },

    renderOperator(diff) {
        if (diff === 0) {
            const opts = [
                { text: 'Нагревание до 60-90°C для уничтожения микробов', correct: true },
                { text: 'Кипячение', correct: false },
                { text: 'Замораживание', correct: false }
            ];
            return `<h3>🟢 Пастеризация</h3><p>Что это?</p>` + this.renderShuffledButtons(opts);
        } else if (diff === 1) {
            const opts = [
                { text: 'Температура и время выдержки', correct: true },
                { text: 'Давление', correct: false },
                { text: 'Скорость потока', correct: false }
            ];
            return `<h3>🟡 Критический параметр</h3><p>Что важнее при пастеризации?</p>` + this.renderShuffledButtons(opts);
        } else {
            const opts = [
                { text: '750 кг', correct: true },
                { text: '500 кг', correct: false },
                { text: '1500 кг', correct: false }
            ];
            return `<h3>🔴 Расчёт сырья</h3><p>Для 1 л сока нужно 1.5 кг яблок. Сколько для 500 л?</p>` + this.renderShuffledButtons(opts);
        }
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

    initFlourCheck() {
        document.getElementById('check-flour-btn').onclick = () => {
            const val = parseFloat(document.getElementById('flour-input').value);
            const fb = document.getElementById('flour-feedback');
            if (Math.abs(val - 500) < 0.1) {
                fb.innerHTML = '✅ Правильно!';
                const spec = gameState.selectedSpecialtyCode;
                if (!gameState.specScores[spec]) gameState.specScores[spec] = 0;
                gameState.specScores[spec] += 3;
            } else {
                fb.innerHTML = '❌ Неверно. 200 / 4 * 10 = 500 г.';
            }
            Cluster.gameSuccess();
        };
    },

    getHint(specCode, diff) {
        const hints = {
            '43.02.15': {
                0: { story: 'На кухне руки моют часто.', tip: 'Перед началом и после каждого перерыва' },
                1: { story: 'Бисквит опадает от перепада температур.', tip: 'Резкий перепад температуры' },
                2: { story: '200 г / 4 = 50 г на порцию; 50*10 = 500 г.', tip: '500 г' }
            },
            '19.01.18': {
                0: { story: 'Пастеризация — нагревание до 60-90°C.', tip: 'Нагревание до 60-90°C' },
                1: { story: 'Ключевое — температура и время.', tip: 'Температура и время выдержки' },
                2: { story: '1.5 кг * 500 = 750 кг.', tip: '750 кг' }
            }
        };
        return hints[specCode]?.[diff] || { story: 'Подумай логически.', tip: 'Попробуй ещё раз.' };
    }
};

window.clusterFood = clusterFood;