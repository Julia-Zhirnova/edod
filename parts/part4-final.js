// ==========================================
// ЧАСТЬ 4: КЛАСТЕРЫ 10–12 (Безопасность, Землеустройство, ЖКХ)
// + ФИНАЛЬНЫЙ ЭКРАН С РЕЗУЛЬТАТАМИ
// ==========================================

// ---------- БЕЗОПАСНОСТЬ И ЧС ----------
const GamesSafety = {
    render(area, specCode, diff) {
        // specCode: "20.02.04"
        if (diff === 0) {
            area.innerHTML = `
                <h3>🟢 Первичные средства пожаротушения</h3>
                <p>Каким огнетушителем можно тушить электроустановки под напряжением?</p>
                <button class="game-btn" data-correct="true">Углекислотным (ОУ)</button>
                <button class="game-btn">Пенным (ОХП)</button>
                <button class="game-btn">Водным (ОВ)</button>
                <button class="game-btn">Воздушно-пенным</button>
            `;
            this.bindAnswer(area);
        } else if (diff === 1) {
            area.innerHTML = `
                <h3>🟡 Действия при пожаре</h3>
                <p>Расставь действия в правильном порядке:</p>
                <div class="drag-list" id="drag-list">
                    <div class="drag-item" draggable="true" data-order="0"><div class="drag-handle">⠿</div><span>Сообщить в пожарную охрану (101/112)</span></div>
                    <div class="drag-item" draggable="true" data-order="1"><div class="drag-handle">⠿</div><span>Эвакуировать людей</span></div>
                    <div class="drag-item" draggable="true" data-order="2"><div class="drag-handle">⠿</div><span>Приступить к тушению (если безопасно)</span></div>
                    <div class="drag-item" draggable="true" data-order="3"><div class="drag-handle">⠿</div><span>Встретить пожарных</span></div>
                </div>
                <button class="btn btn-primary" style="margin-top:15px;" id="check-order-btn">Проверить</button>
            `;
            this.initDragCheck();
        } else {
            area.innerHTML = `
                <h3>🔴 Расчёт времени эвакуации</h3>
                <p>Плотность людского потока 3 чел/м², ширина выхода 1.2 м. Скорость движения 16 м/мин. Длина пути 40 м. Какое расчётное время эвакуации (в минутах)?</p>
                <input type="number" id="time-input" placeholder="Время в минутах" step="0.1" style="width:100%; padding:10px; border-radius:8px; background:#222; color:white; border:1px solid #444;">
                <button class="btn btn-primary" style="margin-top:15px;" id="check-time-btn">Проверить</button>
                <p id="time-feedback"></p>
            `;
            document.getElementById('check-time-btn').onclick = () => {
                const val = parseFloat(document.getElementById('time-input').value);
                if (Math.abs(val - 2.5) < 0.1) {
                    gameState.psych.practical += 3;
                    Cluster.gameSuccess();
                } else {
                    document.getElementById('time-feedback').innerHTML = '❌ Неверно. Время = путь / скорость = 40 / 16 = 2.5 мин.';
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
    },

    initDragCheck() {
        setTimeout(() => {
            if (typeof DragDrop !== 'undefined') DragDrop.init('#drag-list');
            document.getElementById('check-order-btn').onclick = () => {
                const items = document.querySelectorAll('#drag-list .drag-item');
                const order = Array.from(items).map(i => parseInt(i.dataset.order));
                if (order.join(',') === '0,1,2,3') {
                    gameState.psych.org += 2;
                    Cluster.gameSuccess();
                } else {
                    alert('❌ Правильный порядок: сообщить → эвакуировать → тушить (если можно) → встретить пожарных.');
                }
            };
        }, 100);
    }
};

// ---------- ЗЕМЛЕУСТРОЙСТВО ----------
const GamesLand = {
    render(area, specCode, diff) {
        // specCode: "21.02.19"
        if (diff === 0) {
            area.innerHTML = `
                <h3>🟢 Масштаб карты</h3>
                <p>Масштаб 1:1000 означает, что 1 см на карте соответствует:</p>
                <button class="game-btn" data-correct="true">10 метрам на местности</button>
                <button class="game-btn">100 метрам</button>
                <button class="game-btn">1 км</button>
                <button class="game-btn">1000 метрам</button>
            `;
            this.bindAnswer(area);
        } else if (diff === 1) {
            area.innerHTML = `
                <h3>🟡 Геодезические измерения</h3>
                <p>Какой прибор используют для измерения превышений?</p>
                <button class="game-btn" data-correct="true">Нивелир</button>
                <button class="game-btn">Теодолит</button>
                <button class="game-btn">Тахеометр</button>
                <button class="game-btn">Дальномер</button>
            `;
            this.bindAnswer(area);
        } else {
            area.innerHTML = `
                <h3>🔴 Расчёт площади участка</h3>
                <p>Участок прямоугольной формы 60 м × 40 м. Какова его площадь в гектарах?</p>
                <input type="number" id="area-input" placeholder="Площадь в га" step="0.01" style="width:100%; padding:10px; border-radius:8px; background:#222; color:white; border:1px solid #444;">
                <button class="btn btn-primary" style="margin-top:15px;" id="check-area-btn">Проверить</button>
                <p id="area-feedback"></p>
            `;
            document.getElementById('check-area-btn').onclick = () => {
                const val = parseFloat(document.getElementById('area-input').value);
                if (Math.abs(val - 0.24) < 0.01) {
                    gameState.psych.analytic += 3;
                    Cluster.gameSuccess();
                } else {
                    document.getElementById('area-feedback').innerHTML = '❌ Неверно. Площадь = 60×40 = 2400 м² = 0.24 га.';
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

// ---------- ЖКХ И ЭКСПЛУАТАЦИЯ ----------
const GamesZhk = {
    render(area, specCode, diff) {
        // specCode: "08.02.14"
        if (diff === 0) {
            area.innerHTML = `
                <h3>🟢 Инженерные системы</h3>
                <p>Какой прибор учёта измеряет расход горячей воды?</p>
                <button class="game-btn" data-correct="true">Счётчик воды (тахометрический)</button>
                <button class="game-btn">Теплосчётчик</button>
                <button class="game-btn">Электросчётчик</button>
                <button class="game-btn">Манометр</button>
            `;
            this.bindAnswer(area);
        } else if (diff === 1) {
            area.innerHTML = `
                <h3>🟡 Подготовка к отопительному сезону</h3>
                <p>Что входит в обязательную подготовку многоквартирного дома к зиме?</p>
                <button class="game-btn" data-correct="true">Промывка и опрессовка системы отопления</button>
                <button class="game-btn">Покраска фасада</button>
                <button class="game-btn">Замена почтовых ящиков</button>
                <button class="game-btn">Уборка подъездов</button>
            `;
            this.bindAnswer(area);
        } else {
            area.innerHTML = `
                <h3>🔴 Расчёт платы за ОДН (электроэнергия)</h3>
                <p>Общедомовой счётчик показал 5000 кВт·ч. Сумма квартирных счётчиков 4200 кВт·ч. Площадь квартиры 60 м², общая площадь дома 3000 м². Тариф 4 руб/кВт·ч. Сколько рублей составит плата за ОДН для этой квартиры?</p>
                <input type="number" id="odn-input" placeholder="Сумма в рублях" style="width:100%; padding:10px; border-radius:8px; background:#222; color:white; border:1px solid #444;">
                <button class="btn btn-primary" style="margin-top:15px;" id="check-odn-btn">Проверить</button>
                <p id="odn-feedback"></p>
            `;
            document.getElementById('check-odn-btn').onclick = () => {
                const val = parseFloat(document.getElementById('odn-input').value);
                // ОДН = (5000-4200) * (60/3000) * 4 = 800 * 0.02 * 4 = 64 руб.
                if (Math.abs(val - 64) < 0.1) {
                    gameState.psych.org += 3;
                    Cluster.gameSuccess();
                } else {
                    document.getElementById('odn-feedback').innerHTML = '❌ Неверно. Расчёт: (800 кВт·ч * 60/3000) * 4 = 16 кВт·ч * 4 = 64 руб.';
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

// ---------- ФИНАЛЬНЫЙ ЭКРАН ----------
const Final = {
    show() {
        // Останавливаем таймеры
        if (typeof Timer !== 'undefined') Timer.stop();
        
        // Рассчитываем результаты на основе психологических баллов
        let scores = [];
        for (const [id, cluster] of Object.entries(DATA.clusters)) {
            let score = 0;
            cluster.psychNeed.forEach(p => {
                score += (gameState.psych[p] || 0);
            });
            // Добавляем бонус за пройденные кластеры
            if (gameState.completedClusters?.includes(id)) score += 5;
            // Небольшой рандом для вариативности
            score += Math.random() * 2;
            scores.push({ id, score, cluster });
        }
        
        // Сортируем по убыванию
        scores.sort((a, b) => b.score - a.score);
        const top3 = scores.slice(0, 3);
        
        // Рендерим финальный экран
        const container = document.getElementById('app-container');
        let html = `
            <div class="screen active" id="screen-final">
                <div class="logo-container">
                    <img src="media/images/logo.png" alt="Логотип" class="logo">
                </div>
                
                <h2 style="text-align:center; margin-bottom:20px;">🎉 ${gameState.name}, твой путь найден!</h2>
                <p style="text-align:center; margin-bottom:20px; color: var(--text-dim);">Мы проанализировали твои ответы и подобрали идеальные направления в Люберецком техникуме.</p>
                
                <div id="top3-results" style="width:100%; max-width:600px;"></div>
                
                <div class="controls" style="margin-top:30px;">
                    <button class="btn btn-primary" onclick="window.location.href='https://luberteh.ru/pravila-priema.htm'">
                        📝 Подать документы
                    </button>
                    <button class="btn btn-secondary" onclick="location.reload()">
                        🔄 Пройти заново
                    </button>
                </div>
                
                <div style="margin-top:30px; font-size:0.8rem; color:var(--text-dim); text-align:center;">
                    📍 Корпуса техникума:<br>
                    Центральный (Люберцы), Гагаринский (Люберцы), Красково, Угреша (Дзержинский)
                </div>
            </div>
        `;
        container.innerHTML = html;
        
        // Заполняем топ-3
        const resultsDiv = document.getElementById('top3-results');
        const medals = ['🥇', '🥈', '🥉'];
        const colors = ['gold', 'silver', 'bronze'];
        
        top3.forEach((item, idx) => {
            const cluster = item.cluster;
            const firstSpecCode = cluster.specs[0];
            const firstSpec = DATA.specialties[firstSpecCode];
            const campus = DATA.campuses[firstSpec.campus];
            const hasProf = cluster.specs.some(code => DATA.specialties[code]?.isProf);
            
            const div = document.createElement('div');
            div.className = `top3-item ${colors[idx]}`;
            div.innerHTML = `
                <div class="rank">${medals[idx]} ${idx+1} место</div>
                <div class="name">${cluster.name}</div>
                ${hasProf ? `
                    <div class="professionalet-badge-container" style="margin:5px 0;">
                        <img src="media/images/professionalet-badge.png" class="professionalet-badge" onerror="this.style.display='none'">
                        <span class="professionalet-text">ПРОФЕССИОНАЛИТЕТ</span>
                    </div>
                ` : ''}
                <div class="reason">${cluster.reason}</div>
                <div style="margin-top:10px; font-size:0.9rem; color:var(--text-dim);">
                    🎓 Специальность: ${firstSpec.name}<br>
                    🏫 Корпус: ${campus.name}<br>
                    💰 Бюджетных мест: ${firstSpec.budget} ${firstSpec.paid ? '| Платных: '+firstSpec.paid : ''}
                </div>
            `;
            resultsDiv.appendChild(div);
        });
        
        // Сохраняем прогресс
        if (typeof Storage !== 'undefined') Storage.save();
    }
};

// Экспорт в глобальную область
window.GamesSafety = GamesSafety;
window.GamesLand = GamesLand;
window.GamesZhk = GamesZhk;
window.Final = Final;