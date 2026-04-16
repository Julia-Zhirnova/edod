// ==========================================
// ЧАСТЬ 3: КЛАСТЕРЫ 7–9 (Педагогика, Пищевое производство, Дизайн)
// Полные мини-игры с адаптацией сложности
// ==========================================

// ---------- ПЕДАГОГИКА ----------
const GamesPedagogy = {
    render(area, specCode, diff) {
        // specCode: "44.02.02"
        if (diff === 0) {
            area.innerHTML = `
                <h3>🟢 Мотивация ученика</h3>
                <p>Ребёнок говорит: «У меня не получится». Лучший ответ:</p>
                <button class="game-btn" data-correct="true">«Давай попробуем вместе. Я помогу»</button>
                <button class="game-btn">«Надо просто постараться»</button>
                <button class="game-btn">«У других получается, и у тебя получится»</button>
                <button class="game-btn">«Если не получится, ничего страшного»</button>
            `;
            this.bindAnswer(area);
        } else if (diff === 1) {
            area.innerHTML = `
                <h3>🟡 Планирование урока</h3>
                <p>Расставь этапы урока в правильном порядке:</p>
                <div class="drag-list" id="drag-list">
                    <div class="drag-item" draggable="true" data-order="0"><div class="drag-handle">⠿</div><span>Организационный момент</span></div>
                    <div class="drag-item" draggable="true" data-order="1"><div class="drag-handle">⠿</div><span>Актуализация знаний</span></div>
                    <div class="drag-item" draggable="true" data-order="2"><div class="drag-handle">⠿</div><span>Объяснение нового материала</span></div>
                    <div class="drag-item" draggable="true" data-order="3"><div class="drag-handle">⠿</div><span>Закрепление</span></div>
                    <div class="drag-item" draggable="true" data-order="4"><div class="drag-handle">⠿</div><span>Рефлексия</span></div>
                </div>
                <button class="btn btn-primary" style="margin-top:15px;" id="check-order-btn">Проверить</button>
            `;
            this.initDragCheck();
        } else {
            area.innerHTML = `
                <h3>🔴 Индивидуальный подход</h3>
                <p>Ученик постоянно отвлекается на уроке. Предложи 3 конкретных педагогических приёма (напиши кратко).</p>
                <textarea id="methods-input" rows="4" placeholder="1. ... 2. ... 3. ..." style="width:100%; padding:10px; border-radius:8px; background:#222; color:white; border:1px solid #444;"></textarea>
                <button class="btn btn-primary" style="margin-top:15px;" id="check-methods-btn">Проверить</button>
                <p id="methods-feedback"></p>
            `;
            document.getElementById('check-methods-btn').onclick = () => {
                const text = document.getElementById('methods-input').value;
                // Простая проверка на наличие ключевых слов
                const hasGood = text.includes('внимание') || text.includes('интерес') || text.includes('задание') || text.includes('похвала');
                if (text.length > 20 && hasGood) {
                    gameState.psych.communicative += 3;
                    Cluster.gameSuccess();
                } else {
                    document.getElementById('methods-feedback').innerHTML = '❌ Опишите хотя бы один приём (например, смена деятельности, поощрение, индивидуальное задание).';
                }
            };
        }
    },

    bindAnswer(container) {
        container.querySelectorAll('.game-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.dataset.correct === 'true') {
                    gameState.psych.communicative += 2;
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
                if (order.join(',') === '0,1,2,3,4') {
                    gameState.psych.org += 2;
                    Cluster.gameSuccess();
                } else {
                    alert('❌ Правильный порядок: оргмомент → актуализация → объяснение → закрепление → рефлексия.');
                }
            };
        }, 100);
    }
};

// ---------- ПИЩЕВОЕ ПРОИЗВОДСТВО ----------
const GamesFood = {
    render(area, specCode, diff) {
        // specCode: "43.02.15" (повар-кондитер) или "19.01.18" (аппаратчик)
        if (diff === 0) {
            area.innerHTML = `
                <h3>🟢 Санитарные нормы</h3>
                <p>Как часто нужно мыть руки на пищевом производстве?</p>
                <button class="game-btn" data-correct="true">Перед началом работы и после каждого перерыва</button>
                <button class="game-btn">Один раз в день</button>
                <button class="game-btn">Только после посещения туалета</button>
                <button class="game-btn">По мере загрязнения</button>
            `;
            this.bindAnswer(area);
        } else if (diff === 1) {
            if (specCode === "19.01.18") {
                area.innerHTML = `
                    <h3>🟡 Технологический процесс</h3>
                    <p>Какой параметр критичен при пастеризации молока?</p>
                    <button class="game-btn" data-correct="true">Температура и время выдержки</button>
                    <button class="game-btn">Давление</button>
                    <button class="game-btn">Скорость перемешивания</button>
                    <button class="game-btn">Влажность воздуха</button>
                `;
            } else {
                area.innerHTML = `
                    <h3>🟡 Приготовление бисквита</h3>
                    <p>Почему бисквит опал после выпечки?</p>
                    <button class="game-btn" data-correct="true">Резкий перепад температуры (открыли духовку рано)</button>
                    <button class="game-btn">Мало сахара</button>
                    <button class="game-btn">Слишком долго взбивали</button>
                    <button class="game-btn">Не добавили соль</button>
                `;
            }
            this.bindAnswer(area);
        } else {
            area.innerHTML = `
                <h3>🔴 Расчёт рецептуры</h3>
                <p>По рецепту на 4 порции нужно 200 г муки. Сколько муки потребуется на 10 порций?</p>
                <input type="number" id="flour-input" placeholder="Вес в граммах" style="width:100%; padding:10px; border-radius:8px; background:#222; color:white; border:1px solid #444;">
                <button class="btn btn-primary" style="margin-top:15px;" id="check-flour-btn">Проверить</button>
                <p id="flour-feedback"></p>
            `;
            document.getElementById('check-flour-btn').onclick = () => {
                const val = parseFloat(document.getElementById('flour-input').value);
                if (Math.abs(val - 500) < 0.1) {
                    gameState.psych.practical += 3;
                    Cluster.gameSuccess();
                } else {
                    document.getElementById('flour-feedback').innerHTML = '❌ Неверно. 200 г / 4 * 10 = 500 г.';
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
    }
};

// ---------- ДИЗАЙН ----------
const GamesDesign = {
    render(area, specCode, diff) {
        // specCode: "54.01.20"
        if (diff === 0) {
            area.innerHTML = `
                <h3>🟢 Цветовая гармония</h3>
                <p>Какие цвета являются дополнительными (комплементарными) на цветовом круге?</p>
                <button class="game-btn" data-correct="true">Красный и зелёный</button>
                <button class="game-btn">Синий и жёлтый</button>
                <button class="game-btn">Красный и оранжевый</button>
                <button class="game-btn">Фиолетовый и розовый</button>
            `;
            this.bindAnswer(area);
        } else if (diff === 1) {
            area.innerHTML = `
                <h3>🟡 Типографика</h3>
                <p>Какой шрифт лучше использовать для длинного текста на сайте?</p>
                <button class="game-btn" data-correct="true">Шрифт с засечками (например, Times New Roman)</button>
                <button class="game-btn">Декоративный рукописный</button>
                <button class="game-btn">Моноширинный</button>
                <button class="game-btn">Жирный гротеск</button>
            `;
            this.bindAnswer(area);
        } else {
            area.innerHTML = `
                <h3>🔴 Создание ТЗ на афишу</h3>
                <p>Опишите краткое техзадание для дизайнера: афиша фестиваля профессий. Укажите целевую аудиторию, основное сообщение и стиль.</p>
                <textarea id="brief-input" rows="4" placeholder="ЦА: ... Сообщение: ... Стиль: ..." style="width:100%; padding:10px; border-radius:8px; background:#222; color:white; border:1px solid #444;"></textarea>
                <button class="btn btn-primary" style="margin-top:15px;" id="check-brief-btn">Проверить</button>
                <p id="brief-feedback"></p>
            `;
            document.getElementById('check-brief-btn').onclick = () => {
                const text = document.getElementById('brief-input').value.toLowerCase();
                const hasAudience = text.includes('подростк') || text.includes('школьник') || text.includes('абитуриент');
                const hasMessage = text.includes('фестиваль') || text.includes('професси');
                const hasStyle = text.includes('стиль') || text.includes('современ') || text.includes('ярк');
                if (hasAudience && hasMessage && hasStyle) {
                    gameState.psych.creative += 3;
                    Cluster.gameSuccess();
                } else {
                    document.getElementById('brief-feedback').innerHTML = '❌ Укажите целевую аудиторию, основное сообщение и желаемый стиль.';
                }
            };
        }
    },

    bindAnswer(container) {
        container.querySelectorAll('.game-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.dataset.correct === 'true') {
                    gameState.psych.creative += 2;
                    Cluster.gameSuccess();
                } else {
                    btn.classList.add('wrong');
                    setTimeout(() => btn.classList.remove('wrong'), 500);
                }
            });
        });
    }
};

// Экспорт в глобальную область
window.GamesPedagogy = GamesPedagogy;
window.GamesFood = GamesFood;
window.GamesDesign = GamesDesign;