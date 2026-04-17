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

        area.innerHTML = header + this.wrapStory(story) + content;
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

    wrapStory(story) {
        return `<div class="story-box" style="background:rgba(0,212,255,0.1); padding:12px; border-radius:8px; margin-bottom:20px;">
            <p style="margin:0; color:var(--text-dim);"><strong>📖 История:</strong> ${story}</p>
        </div>`;
    },

    renderAccountant(diff) {
        if (diff === 0) {
            return `<h3>🟢 Скидка</h3><p>Товар 1200₽, скидка 15%. Цена?</p>
                <button class="game-btn" data-correct="true">1020₽</button>
                <button class="game-btn">1185₽</button>
                <button class="game-btn">1200₽</button>`;
        } else if (diff === 1) {
            return `<h3>🟡 Проводка</h3><p>Поступление товара: дебет 41, кредит?</p>
                <button class="game-btn" data-correct="true">60</button>
                <button class="game-btn">50</button>
                <button class="game-btn">62</button>`;
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
            return `<h3>🟢 Срочная доставка</h3><p>Самый быстрый транспорт?</p>
                <button class="game-btn" data-correct="true">Авиа</button>
                <button class="game-btn">Ж/д</button>
                <button class="game-btn">Авто</button>`;
        } else if (diff === 1) {
            return `<h3>🟡 Транспортная задача</h3><p>Что это?</p>
                <button class="game-btn" data-correct="true">Минимизация затрат на перевозку</button>
                <button class="game-btn">Выбор вида транспорта</button>
                <button class="game-btn">Расчёт времени в пути</button>`;
        } else {
            return `<h3>🔴 Выбор маршрута</h3>
                <p>Маршрут А: 200 км, 5 руб/км. Маршрут Б: 150 км, 7 руб/км. Какой дешевле?</p>
                <button class="game-btn" data-correct="true">А (1000 руб.)</button>
                <button class="game-btn">Б (1050 руб.)</button>
                <button class="game-btn">Оба одинаково</button>`;
        }
    },

    renderTrade(diff) {
        if (diff === 0) {
            return `<h3>🟢 Конфликтный клиент</h3><p>Первая фраза:</p>
                <button class="game-btn" data-correct="true">«Я понимаю ваше недовольство»</button>
                <button class="game-btn">«Вы не правы»</button>
                <button class="game-btn">«Это не моя проблема»</button>`;
        } else if (diff === 1) {
            return `<h3>🟡 Мерчандайзинг</h3><p>Где разместить товары импульсного спроса?</p>
                <button class="game-btn" data-correct="true">В прикассовой зоне</button>
                <button class="game-btn">В глубине зала</button>
                <button class="game-btn">На верхних полках</button>`;
        } else {
            return `<h3>🔴 Сдача</h3><p>Товар 350₽, дали 500₽. Сдача?</p>
                <button class="game-btn" data-correct="true">150₽</button>
                <button class="game-btn">100₽</button>
                <button class="game-btn">200₽</button>`;
        }
    },

    bindAnswer(container) {
        container.querySelectorAll('.game-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.dataset.correct === 'true') {
                    btn.classList.add('correct');
                    gameState.psych.org += 2;
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
                gameState.psych.analytic += 3;
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