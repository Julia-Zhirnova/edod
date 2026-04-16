// ==========================================
// ЧАСТЬ 2: КЛАСТЕРЫ 4–6 (Авто, Бизнес, Право)
// Полные мини-игры с адаптацией сложности
// ==========================================

// ---------- АВТОМОТОТЕХНИКА ----------
const GamesAuto = {
    render(area, specCode, diff) {
        // specCode: "23.02.07" (специалист) или "23.01.17" (мастер)
        if (diff === 0) {
            area.innerHTML = `
                <h3>🟢 Диагностика двигателя</h3>
                <p>Машина не заводится. С чего начать проверку?</p>
                <button class="game-btn" data-correct="true">Проверить аккумулятор</button>
                <button class="game-btn">Снять головку блока</button>
                <button class="game-btn">Заменить свечи</button>
                <button class="game-btn">Поменять масло</button>
            `;
            this.bindAnswer(area);
        } else if (diff === 1) {
            if (specCode === "23.01.17") {
                area.innerHTML = `
                    <h3>🟡 Замена колодок</h3>
                    <p>Расставь правильный порядок действий:</p>
                    <div class="drag-list" id="drag-list">
                        <div class="drag-item" draggable="true" data-order="0"><div class="drag-handle">⠿</div><span>Поднять машину домкратом</span></div>
                        <div class="drag-item" draggable="true" data-order="1"><div class="drag-handle">⠿</div><span>Снять колесо</span></div>
                        <div class="drag-item" draggable="true" data-order="2"><div class="drag-handle">⠿</div><span>Открутить суппорт</span></div>
                        <div class="drag-item" draggable="true" data-order="3"><div class="drag-handle">⠿</div><span>Заменить колодки</span></div>
                    </div>
                    <button class="btn btn-primary" style="margin-top:15px;" id="check-order-btn">Проверить</button>
                `;
                this.initDragCheck();
            } else {
                area.innerHTML = `
                    <h3>🟡 Ошибка P0300</h3>
                    <p>Что означает код P0300 по OBD-II?</p>
                    <button class="game-btn" data-correct="true">Пропуски зажигания в цилиндрах</button>
                    <button class="game-btn">Неисправность датчика кислорода</button>
                    <button class="game-btn">Низкое давление масла</button>
                    <button class="game-btn">Перегрев двигателя</button>
                `;
                this.bindAnswer(area);
            }
        } else {
            area.innerHTML = `
                <h3>🔴 Расчёт передаточного числа</h3>
                <p>Ведущая шестерня имеет 20 зубьев, ведомая — 60. Какое передаточное число?</p>
                <input type="number" id="ratio-input" placeholder="Введите число" step="0.1" style="width:100%; padding:10px; border-radius:8px; background:#222; color:white; border:1px solid #444;">
                <button class="btn btn-primary" style="margin-top:15px;" id="check-ratio-btn">Проверить</button>
                <p id="ratio-feedback"></p>
            `;
            document.getElementById('check-ratio-btn').onclick = () => {
                const val = parseFloat(document.getElementById('ratio-input').value);
                if (Math.abs(val - 3.0) < 0.01) {
                    gameState.psych.practical += 3;
                    Cluster.gameSuccess();
                } else {
                    document.getElementById('ratio-feedback').innerHTML = '❌ Неверно. Передаточное число = 60 / 20 = 3.';
                }
            };
        }
    },

    bindAnswer(container) {
        container.querySelectorAll('.game-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.dataset.correct === 'true') {
                    gameState.psych.practical += 2;
                    Cluster.gameSuccess();
                } else {
                    btn.classList.add('wrong');
                    setTimeout(() => btn.classList.remove('wrong'), 500);
                }
            });
        });
    },

    initDragCheck() {
        setTimeout(() => {
            if (typeof DragDrop !== 'undefined') DragDrop.init('#drag-list');
            document.getElementById('check-order-btn').onclick = () => {
                const items = document.querySelectorAll('#drag-list .drag-item');
                const order = Array.from(items).map(i => parseInt(i.dataset.order));
                if (order.join(',') === '0,1,2,3') {
                    gameState.psych.practical += 2;
                    Cluster.gameSuccess();
                } else {
                    alert('❌ Неверный порядок. Правильно: домкрат → колесо → суппорт → колодки.');
                }
            };
        }, 100);
    }
};

// ---------- БИЗНЕС, ЛОГИСТИКА, ТОРГОВЛЯ ----------
const GamesBusiness = {
    render(area, specCode, diff) {
        // specCode: "38.02.01", "38.02.03", "38.02.08"
        if (diff === 0) {
            if (specCode === "38.02.01") {
                area.innerHTML = `<h3>🟢 Простой расчёт</h3><p>Товар стоит 1200₽, скидка 15%. Цена со скидкой?</p>
                    <button class="game-btn" data-correct="true">1020₽</button><button class="game-btn">1185₽</button><button class="game-btn">1200₽</button>`;
            } else if (specCode === "38.02.03") {
                area.innerHTML = `<h3>🟢 Выбор маршрута</h3><p>Груз нужно доставить быстрее всего. Какой транспорт выбрать?</p>
                    <button class="game-btn" data-correct="true">Авиа</button><button class="game-btn">Ж/д</button><button class="game-btn">Авто</button>`;
            } else {
                area.innerHTML = `<h3>🟢 Работа с клиентом</h3><p>Клиент недоволен. Что сказать в первую очередь?</p>
                    <button class="game-btn" data-correct="true">«Я понимаю ваше недовольство»</button>
                    <button class="game-btn">«Вы не правы»</button><button class="game-btn">«Это не моя проблема»</button>`;
            }
            this.bindAnswer(area);
        } else if (diff === 1) {
            if (specCode === "38.02.01") {
                area.innerHTML = `<h3>🟡 Проводка</h3><p>Поступление товара от поставщика: дебет 41, кредит?</p>
                    <button class="game-btn" data-correct="true">60</button><button class="game-btn">50</button><button class="game-btn">62</button>`;
            } else if (specCode === "38.02.03") {
                area.innerHTML = `<h3>🟡 Оптимизация маршрута</h3><p>Что такое «транспортная задача»?</p>
                    <button class="game-btn" data-correct="true">Минимизация затрат на перевозку</button>
                    <button class="game-btn">Выбор вида транспорта</button><button class="game-btn">Расчёт времени в пути</button>`;
            } else {
                area.innerHTML = `<h3>🟡 Мерчандайзинг</h3><p>Где лучше разместить товары импульсного спроса?</p>
                    <button class="game-btn" data-correct="true">В прикассовой зоне</button>
                    <button class="game-btn">В глубине зала</button><button class="game-btn">На верхних полках</button>`;
            }
            this.bindAnswer(area);
        } else {
            area.innerHTML = `
                <h3>🔴 Расчёт зарплаты (бухгалтер)</h3>
                <p>Оклад 25 000₽, премия 20%, НДФЛ 13%. Сколько на руки?</p>
                <input type="number" id="salary-input" placeholder="Введите сумму" style="width:100%; padding:10px; border-radius:8px; background:#222; color:white; border:1px solid #444;">
                <button class="btn btn-primary" style="margin-top:15px;" id="check-salary-btn">Проверить</button>
                <p id="salary-feedback"></p>
            `;
            document.getElementById('check-salary-btn').onclick = () => {
                const val = parseInt(document.getElementById('salary-input').value);
                // 25000 * 1.2 = 30000; 30000 * 0.87 = 26100
                if (val === 26100) {
                    gameState.psych.analytic += 3;
                    Cluster.gameSuccess();
                } else {
                    document.getElementById('salary-feedback').innerHTML = '❌ Неверно. Правильный расчёт: (25000*1.2)*0.87 = 26100.';
                }
            };
        }
    },

    bindAnswer(container) {
        container.querySelectorAll('.game-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.dataset.correct === 'true') {
                    gameState.psych.org += 2;
                    Cluster.gameSuccess();
                } else {
                    btn.classList.add('wrong');
                    setTimeout(() => btn.classList.remove('wrong'), 500);
                }
            });
        });
    }
};

// ---------- ПРАВО И ДОКУМЕНТАЦИЯ ----------
const GamesLaw = {
    render(area, specCode, diff) {
        if (diff === 0) {
            area.innerHTML = `
                <h3>🟢 Сроки хранения</h3>
                <p>Сколько лет хранятся личные дела работников?</p>
                <button class="game-btn" data-correct="true">75 лет</button>
                <button class="game-btn">5 лет</button>
                <button class="game-btn">10 лет</button>
                <button class="game-btn">1 год</button>
            `;
            this.bindAnswer(area);
        } else if (diff === 1) {
            area.innerHTML = `
                <h3>🟡 Правовой документ</h3>
                <p>Какой документ является основным законом РФ?</p>
                <button class="game-btn" data-correct="true">Конституция</button>
                <button class="game-btn">Гражданский кодекс</button>
                <button class="game-btn">Уголовный кодекс</button>
                <button class="game-btn">Трудовой кодекс</button>
            `;
            this.bindAnswer(area);
        } else {
            area.innerHTML = `
                <h3>🔴 Составление претензии</h3>
                <p>Выберите правильную структуру претензии (расставьте по порядку):</p>
                <div class="drag-list" id="drag-list">
                    <div class="drag-item" draggable="true" data-order="0"><div class="drag-handle">⠿</div><span>Шапка (кому, от кого)</span></div>
                    <div class="drag-item" draggable="true" data-order="1"><div class="drag-handle">⠿</div><span>Описание ситуации</span></div>
                    <div class="drag-item" draggable="true" data-order="2"><div class="drag-handle">⠿</div><span>Требование</span></div>
                    <div class="drag-item" draggable="true" data-order="3"><div class="drag-handle">⠿</div><span>Приложения</span></div>
                </div>
                <button class="btn btn-primary" style="margin-top:15px;" id="check-order-btn">Проверить</button>
            `;
            this.initDragCheck();
        }
    },

    bindAnswer(container) {
        container.querySelectorAll('.game-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.dataset.correct === 'true') {
                    gameState.psych.analytic += 2;
                    Cluster.gameSuccess();
                } else {
                    btn.classList.add('wrong');
                    setTimeout(() => btn.classList.remove('wrong'), 500);
                }
            });
        });
    },

    initDragCheck() {
        setTimeout(() => {
            if (typeof DragDrop !== 'undefined') DragDrop.init('#drag-list');
            document.getElementById('check-order-btn').onclick = () => {
                const items = document.querySelectorAll('#drag-list .drag-item');
                const order = Array.from(items).map(i => parseInt(i.dataset.order));
                if (order.join(',') === '0,1,2,3') {
                    gameState.psych.org += 3;
                    Cluster.gameSuccess();
                } else {
                    alert('❌ Порядок неверный. Правильно: шапка → описание → требование → приложения.');
                }
            };
        }, 100);
    }
};

// Экспорт в глобальную область
window.GamesAuto = GamesAuto;
window.GamesBusiness = GamesBusiness;
window.GamesLaw = GamesLaw;