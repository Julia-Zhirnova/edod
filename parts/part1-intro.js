// ==========================================
// ЧАСТЬ 1: КЛАСТЕРЫ 1–3 (IT, Авиа, Химия)
// Полные мини-игры с адаптацией сложности
// ==========================================

// ---------- IT-КЛАСТЕР ----------
const GamesIt = {
    render(area, specCode, diff) {
        // specCode может быть "09.02.06", "09.02.12", "10.02.05"
        if (diff === 0) {
            // 🟢 Лёгкая
            area.innerHTML = `
                <h3>🟢 Сброс пароля (Bash)</h3>
                <p>Пользователь забыл пароль. Какую команду выполнит администратор?</p>
                <button class="game-btn" data-correct="true">passwd username</button>
                <button class="game-btn">rm -rf /</button>
                <button class="game-btn">shutdown now</button>
                <button class="game-btn">reboot</button>
                <p style="margin-top:15px; font-size:0.9rem;">💡 Подсказка: нужно сменить пароль конкретному пользователю.</p>
            `;
            this.bindAnswer(area);
        } else if (diff === 1) {
            // 🟡 Средняя
            if (specCode === "09.02.06") {
                area.innerHTML = `
                    <h3>🟡 Настройка сети</h3>
                    <p>Какой IP-адрес является частным (локальным)?</p>
                    <button class="game-btn" data-correct="true">192.168.1.1</button>
                    <button class="game-btn">8.8.8.8</button>
                    <button class="game-btn">172.32.0.1</button>
                    <button class="game-btn">1.1.1.1</button>
                `;
            } else if (specCode === "09.02.12") {
                area.innerHTML = `
                    <h3>🟡 Отладка скрипта</h3>
                    <p>В JavaScript какой метод выведет сообщение в консоль?</p>
                    <button class="game-btn" data-correct="true">console.log()</button>
                    <button class="game-btn">alert()</button>
                    <button class="game-btn">document.write()</button>
                    <button class="game-btn">print()</button>
                `;
            } else {
                area.innerHTML = `
                    <h3>🟡 Безопасность паролей</h3>
                    <p>Какой пароль самый надёжный?</p>
                    <button class="game-btn" data-correct="true">LbT3ch!Fest#2026</button>
                    <button class="game-btn">123456</button>
                    <button class="game-btn">festival2026</button>
                    <button class="game-btn">qwerty</button>
                `;
            }
            this.bindAnswer(area);
        } else {
            // 🔴 Сложная (только для 9–11 классов)
            area.innerHTML = `
                <h3>🔴 Напиши функцию проверки IP</h3>
                <p>На Python напиши функцию <code>is_valid_ip(ip)</code>, которая возвращает True, если IP состоит из 4 чисел от 0 до 255, разделённых точками.</p>
                <div class="code-editor-container">
                    <textarea id="code-area" rows="8">def is_valid_ip(ip):
    # твой код
    pass</textarea>
                </div>
                <button class="check-code-btn" id="check-code-btn">Проверить</button>
                <p id="code-feedback" style="margin-top:10px;"></p>
            `;
            this.initCodeEditor('python', `
def is_valid_ip(ip):
    parts = ip.split('.')
    if len(parts) != 4:
        return False
    for part in parts:
        if not part.isdigit():
            return False
        num = int(part)
        if num < 0 or num > 255:
            return False
    return True
            `);
        }
    },

    bindAnswer(container) {
        container.querySelectorAll('.game-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const isCorrect = btn.dataset.correct === 'true';
                if (isCorrect) {
                    btn.classList.add('correct');
                    // начисляем баллы в зависимости от специальности
                    const spec = gameState.selectedSpecialtyCode;
                    if (spec === "09.02.06") gameState.psych.analytic += 2;
                    else if (spec === "09.02.12") { gameState.psych.analytic += 1; gameState.psych.creative += 1; }
                    else if (spec === "10.02.05") gameState.psych.analytic += 2;
                    Cluster.gameSuccess();
                } else {
                    btn.classList.add('wrong');
                    setTimeout(() => btn.classList.remove('wrong'), 500);
                }
            });
        });
    },

    initCodeEditor(defaultCode, solutionTemplate) {
        const textarea = document.getElementById('code-area');
        if (typeof CodeMirror !== 'undefined') {
            const editor = CodeMirror.fromTextArea(textarea, {
                mode: 'python',
                theme: 'monokai',
                lineNumbers: true,
                indentUnit: 4
            });
            editor.setValue(defaultCode.trim());
            document.getElementById('check-code-btn').onclick = () => {
                const code = editor.getValue();
                // Простая проверка наличия ключевых элементов
                if (code.includes('def is_valid_ip') && code.includes('split') && code.includes('return')) {
                    gameState.psych.analytic += 3;
                    Cluster.gameSuccess();
                } else {
                    document.getElementById('code-feedback').innerHTML = '❌ Функция должна называться is_valid_ip, использовать split и возвращать True/False.';
                }
            };
        } else {
            textarea.value = defaultCode;
            document.getElementById('check-code-btn').onclick = () => {
                const code = textarea.value;
                if (code.includes('def is_valid_ip') && code.includes('split')) {
                    gameState.psych.analytic += 3;
                    Cluster.gameSuccess();
                } else {
                    document.getElementById('code-feedback').innerHTML = '❌ Неправильно.';
                }
            };
        }
    }
};

// ---------- АВИА/МАШИНОСТРОЕНИЕ ----------
const GamesAvia = {
    render(area, specCode, diff) {
        if (diff === 0) {
            area.innerHTML = `
                <h3>🟢 Инструмент для резьбы</h3>
                <p>Чем нарезают внутреннюю резьбу?</p>
                <button class="game-btn" data-correct="true">Метчик</button>
                <button class="game-btn">Плашка</button>
                <button class="game-btn">Сверло</button>
                <button class="game-btn">Зенкер</button>
            `;
            this.bindAnswer(area);
        } else if (diff === 1) {
            area.innerHTML = `
                <h3>🟡 Последовательность сборки</h3>
                <p>Расставь этапы изготовления детали:</p>
                <div class="drag-list" id="drag-list">
                    <div class="drag-item" draggable="true" data-order="0"><div class="drag-handle">⠿</div><span>Выбрать материал</span></div>
                    <div class="drag-item" draggable="true" data-order="1"><div class="drag-handle">⠿</div><span>Разметить заготовку</span></div>
                    <div class="drag-item" draggable="true" data-order="2"><div class="drag-handle">⠿</div><span>Обработать на станке</span></div>
                    <div class="drag-item" draggable="true" data-order="3"><div class="drag-handle">⠿</div><span>Контроль размеров</span></div>
                </div>
                <button class="btn btn-primary" style="margin-top:15px;" id="check-order-btn">Проверить</button>
            `;
            this.initDragCheck();
        } else {
            area.innerHTML = `
                <h3>🔴 Допуски и посадки</h3>
                <p>Номинальный размер 120.00 мм, допуск ±0.05. Какие из замеров пройдут контроль?</p>
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
            document.getElementById('check-tolerance-btn').onclick = () => {
                const checkboxes = document.querySelectorAll('#cluster-game-area input[type=checkbox]');
                let correct = true;
                checkboxes.forEach(cb => {
                    const shouldBeChecked = cb.dataset.correct === 'true';
                    if (cb.checked !== shouldBeChecked) correct = false;
                });
                if (correct) {
                    gameState.psych.practical += 3;
                    Cluster.gameSuccess();
                } else {
                    document.getElementById('tolerance-feedback').innerHTML = '❌ Не все правильные размеры выбраны.';
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
                    alert('❌ Порядок неверный. Правильно: материал → разметка → обработка → контроль.');
                }
            };
        }, 100);
    }
};

// ---------- ХИМИЯ И ЛАБОРАТОРНЫЙ КОНТРОЛЬ ----------
const GamesChem = {
    render(area, specCode, diff) {
        if (diff === 0) {
            area.innerHTML = `
                <h3>🟢 Кислотность воды</h3>
                <p>Какой pH у нейтрального раствора?</p>
                <button class="game-btn" data-correct="true">7</button>
                <button class="game-btn">1</button>
                <button class="game-btn">14</button>
                <button class="game-btn">0</button>
            `;
            this.bindAnswer(area);
        } else if (diff === 1) {
            area.innerHTML = `
                <h3>🟡 Лабораторная посуда</h3>
                <p>Для точного измерения объёма жидкости используют:</p>
                <button class="game-btn" data-correct="true">Мерную колбу</button>
                <button class="game-btn">Химический стакан</button>
                <button class="game-btn">Коническую колбу</button>
                <button class="game-btn">Пробирку</button>
            `;
            this.bindAnswer(area);
        } else {
            area.innerHTML = `
                <h3>🔴 Расчёт концентрации</h3>
                <p>Сколько граммов NaCl нужно для приготовления 200 мл 0.9% раствора? (плотность ~1 г/мл)</p>
                <input type="number" id="mass-input" placeholder="Введите массу в граммах" step="0.1" style="width:100%; padding:10px; border-radius:8px; background:#222; color:white; border:1px solid #444;">
                <button class="btn btn-primary" style="margin-top:15px;" id="check-mass-btn">Проверить</button>
                <p id="mass-feedback"></p>
            `;
            document.getElementById('check-mass-btn').onclick = () => {
                const val = parseFloat(document.getElementById('mass-input').value);
                if (Math.abs(val - 1.8) < 0.1) {
                    gameState.psych.analytic += 3;
                    Cluster.gameSuccess();
                } else {
                    document.getElementById('mass-feedback').innerHTML = '❌ Неверно. 0.9% от 200 г = 1.8 г.';
                }
            };
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
    }
};

// Экспорт в глобальную область (если ещё не объявлены)
window.GamesIt = GamesIt;
window.GamesAvia = GamesAvia;
window.GamesChem = GamesChem;
