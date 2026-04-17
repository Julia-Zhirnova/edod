// ==========================================
// КЛАСТЕР: Бизнес, логистика, торговля
// Специальности: 38.02.01, 38.02.03, 38.02.08
// ==========================================

const clusterBusiness = {
    render(area, specCode, diff) {
        const gameArea = document.getElementById('cluster-game-area');
        if (gameArea) gameArea.style.backgroundImage = "url('media/images/cluster-business-bg.jpg')";

        const header = this.getHeader();
        let story = '';
        let content = '';

        if (specCode === '38.02.01') {
            story = diff === 0 ? 'Бухгалтер фестиваля просит посчитать цену товара со скидкой.' :
                   diff === 1 ? 'Нужно правильно отразить поступление товара от поставщика.' :
                   'Рассчитай зарплату сотруднику на руки.';
            content = this.renderAccountant(diff);
        } else if (specCode === '38.02.03') {
            story = diff === 0 ? 'Срочно доставить сувениры на фестиваль. Какой транспорт выбрать?' :
                   diff === 1 ? 'Что такое транспортная задача?' :
                   'Оптимизируй маршрут: выбери самый дешёвый.';
            content = this.renderLogistics(diff);
        } else {
            story = diff === 0 ? 'Клиент недоволен качеством сувенира. Что ответить?' :
                   diff === 1 ? 'Где лучше разместить товары импульсного спроса?' :
                   'Покупатель дал 500₽ за товар за 350₽. Сколько сдачи?';
            content = this.renderTrade(diff);
        }

        area.innerHTML = header + content;
        this.setReplica(story);

        if (specCode === '38.02.01' && diff === 2) {
            this.initSalaryCheck();
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

    renderAccountant(diff) {
        if (diff === 0) {
            const opts = [
                { text: '1020₽', correct: true },
                { text: '1185₽', correct: false },
                { text: '1200₽', correct: false }
            ];
            return `<h3>🟢 Скидка</h3><p>Товар 1200₽, скидка 15%. Цена?</p>` + this.renderShuffledButtons(opts);
        } else if (diff === 1) {
            const opts = [
                { text: '60', correct: true },
                { text: '50', correct: false },
                { text: '62', correct: false }
            ];
            return `<h3>🟡 Проводка</h3><p>Поступление товара: дебет 41, кредит?</p>` + this.renderShuffledButtons(opts);
        } else {
            return `<h3>🔴 Зарплата на руки</h3>
                <p>Оклад 25000₽, премия 20%, НДФЛ 13%.</p>
                <input type="number" id="salary-input" placeholder="Сумма" style="width:100%; padding:12px; border-radius:8px; background:#222; color:white; border:1px solid #444;">
                <button class="btn btn-primary" style="margin-top:15px;" id="check-salary-btn">Проверить</button>
                <p id="salary-feedback"></p>`;
        }
    },

    renderLogistics(diff) {
        if (diff === 0) {
            const opts = [
                { text: 'Авиа', correct: true },
                { text: 'Ж/д', correct: false },
                { text: 'Авто', correct: false }
            ];
            return `<h3>🟢 Срочная доставка</h3><p>Самый быстрый транспорт?</p>` + this.renderShuffledButtons(opts);
        } else if (diff === 1) {
            const opts = [
                { text: 'Минимизация затрат на перевозку', correct: true },
                { text: 'Выбор вида транспорта', correct: false },
                { text: 'Расчёт времени в пути', correct: false }
            ];
            return `<h3>🟡 Транспортная задача</h3><p>Что это?</p>` + this.renderShuffledButtons(opts);
        } else {
            const opts = [
                { text: 'А (1000 руб.)', correct: true },
                { text: 'Б (1050 руб.)', correct: false },
                { text: 'Оба одинаково', correct: false }
            ];
            return `<h3>🔴 Выбор маршрута</h3>
                <p>Маршрут А: 200 км, 5 руб/км. Маршрут Б: 150 км, 7 руб/км. Какой дешевле?</p>` + this.renderShuffledButtons(opts);
        }
    },

    renderTrade(diff) {
        if (diff === 0) {
            const opts = [
                { text: '«Я понимаю ваше недовольство»', correct: true },
                { text: '«Вы не правы»', correct: false },
                { text: '«Это не моя проблема»', correct: false }
            ];
            return `<h3>🟢 Конфликтный клиент</h3><p>Первая фраза:</p>` + this.renderShuffledButtons(opts);
        } else if (diff === 1) {
            const opts = [
                { text: 'В прикассовой зоне', correct: true },
                { text: 'В глубине зала', correct: false },
                { text: 'На верхних полках', correct: false }
            ];
            return `<h3>🟡 Мерчандайзинг</h3><p>Где разместить товары импульсного спроса?</p>` + this.renderShuffledButtons(opts);
        } else {
            const opts = [
                { text: '150₽', correct: true },
                { text: '100₽', correct: false },
                { text: '200₽', correct: false }
            ];
            return `<h3>🔴 Сдача</h3><p>Товар 350₽, дали 500₽. Сдача?</p>` + this.renderShuffledButtons(opts);
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

    initSalaryCheck() {
        document.getElementById('check-salary-btn').onclick = () => {
            const val = parseInt(document.getElementById('salary-input').value);
            const fb = document.getElementById('salary-feedback');
            if (val === 26100) {
                fb.innerHTML = '✅ Правильно!';
                const spec = gameState.selectedSpecialtyCode;
                if (!gameState.specScores[spec]) gameState.specScores[spec] = 0;
                gameState.specScores[spec] += 3;
            } else {
                fb.innerHTML = '❌ Неверно. (25000*1.2)*0.87 = 26100.';
            }
            Cluster.gameSuccess();
        };
    },

    getHint(specCode, diff) {
        const hints = {
            '38.02.01': {
                0: { story: 'Скидка 15% от 1200 = 180.', tip: '1020₽' },
                1: { story: 'Поставщик — счёт 60.', tip: 'Кредит 60' },
                2: { story: '(оклад*1.2)*0.87', tip: '26100' }
            },
            '38.02.03': {
                0: { story: 'Авиа — самый быстрый.', tip: 'Авиа' },
                1: { story: 'Транспортная задача — минимизация затрат.', tip: 'Минимизация затрат' },
                2: { story: '200*5=1000, 150*7=1050.', tip: 'Маршрут А' }
            },
            '38.02.08': {
                0: { story: 'Сначала прояви эмпатию.', tip: '«Я понимаю ваше недовольство»' },
                1: { story: 'Импульсные покупки — у кассы.', tip: 'Прикассовая зона' },
                2: { story: '500 - 350 = 150.', tip: '150₽' }
            }
        };
        return hints[specCode]?.[diff] || { story: 'Подумай логически.', tip: 'Попробуй ещё раз.' };
    }
};

window.clusterBusiness = clusterBusiness;