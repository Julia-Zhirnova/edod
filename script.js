// --- ДАННЫЕ ИГРЫ ---
const DATA = {
    campuses: {
        "central": { name: "Центральный", address: "г. Люберцы, Октябрьский пр-т, д.114" },
        "gagarin": { name: "Гагаринский", address: "г. Люберцы, Октябрьский пр-т, д.136" },
        "kraskovo": { name: "Красково", address: "Люберецкий р-он, пос. Красково, ул. 2-ая Заводская, д. 11" },
        "ugresha": { name: "Угреша", address: "г. Дзержинский, ул. Академика Жукова, д.24" }
    },
    specialties: {
        "08.02.14": { name: "Эксплуатация и обслуживание многоквартирного дома", qual: "техник", campus: "central", budget: 25, psych: ["org", "practical"] },
        "09.02.06": { name: "Сетевое и системное администрирование", qual: "системный администратор", campus: "kraskovo", budget: 25, psych: ["analytic", "practical"] },
        "09.02.12": { name: "Техническая эксплуатация и сопровождение информационных систем", qual: "специалист по технической эксплуатации", campus: "ugresha", budget: 25, psych: ["analytic", "creative"] },
        "10.02.05": { name: "Обеспечение информационной безопасности автоматизированных систем", qual: "техник по защите информации", campus: "ugresha", budget: 25, psych: ["analytic"] },
        "12.01.09": { name: "Мастер по изготовлению и сборке деталей оптических приборов", qual: "оптик-механик", campus: "kraskovo", budget: 25, psych: ["practical", "analytic"], isProf: true },
        "15.01.35": { name: "Мастер слесарных работ", qual: "мастер слесарных работ", campus: "ugresha", budget: 25, psych: ["practical", "analytic"], isProf: true },
        "15.01.38": { name: "Оператор-наладчик металлообрабатывающих станков", qual: "оператор-наладчик", campus: "kraskovo", budget: 25, psych: ["practical", "analytic"], isProf: true },
        "15.02.16": { name: "Технология машиностроения", qual: "техник-технолог", campus: "ugresha", budget: 25, psych: ["practical", "analytic"], isProf: true },
        "18.01.34": { name: "Лаборант по контролю качества", qual: "лаборант", campus: "ugresha", budget: 25, psych: ["analytic", "practical"], isProf: true },
        "18.02.12": { name: "Технология аналитического контроля химических соединений", qual: "техник", campus: "ugresha", budget: 25, psych: ["analytic", "practical"] },
        "19.01.18": { name: "Аппаратчик-оператор производства продуктов питания", qual: "аппаратчик-оператор", campus: "kraskovo", budget: 25, psych: ["practical", "creative"], isProf: true },
        "20.02.04": { name: "Пожарная безопасность", qual: "специалист по пожарной безопасности", campus: "central", budget: 25, psych: ["practical", "org"] },
        "21.02.19": { name: "Землеустройство", qual: "специалист по землеустройству", campus: "central", budget: 25, psych: ["analytic", "practical"] },
        "23.01.17": { name: "Мастер по ремонту и обслуживанию автомобилей", qual: "мастер по ремонту", campus: "kraskovo", budget: 25, psych: ["practical", "communicative"] },
        "23.02.07": { name: "Техническое обслуживание и ремонт автотранспортных средств", qual: "специалист по ТО и ремонту", campus: "central", budget: 25, psych: ["practical", "communicative"] },
        "25.02.06": { name: "Производство и обслуживание авиационной техники", qual: "техник по обслуживанию авиатехники", campus: "central", budget: 50, psych: ["practical", "analytic"], isProf: true },
        "25.02.08": { name: "Эксплуатация беспилотных авиационных систем", qual: "оператор БПЛА", campus: "kraskovo", budget: 50, psych: ["practical", "analytic"], isProf: true },
        "38.02.01": { name: "Экономика и бухгалтерский учет", qual: "бухгалтер", campus: "central", budget: 25, psych: ["org", "analytic"] },
        "38.02.03": { name: "Операционная деятельность в логистике", qual: "операционный логист", campus: "ugresha", budget: 50, psych: ["org", "communicative"], isProf: true },
        "38.02.08": { name: "Торговое дело", qual: "специалист торгового дела", campus: "central", budget: 0, paid: 15, psych: ["communicative", "org"] },
        "40.02.04": { name: "Юриспруденция", qual: "юрист", campus: "central", budget: 0, paid: 15, psych: ["org", "analytic"] },
        "43.02.15": { name: "Поварское и кондитерское дело", qual: "специалист по поварскому и кондитерскому делу", campus: "ugresha", budget: 0, paid: 15, psych: ["practical", "creative"], isProf: true },
        "44.02.02": { name: "Преподавание в начальных классах", qual: "учитель начальных классов", campus: "central", budget: 25, psych: ["communicative", "org"] },
        "46.02.01": { name: "Документационное обеспечение управления и архивоведение", qual: "специалист по ДОУ", campus: "central", budget: 25, psych: ["org", "analytic"] },
        "54.01.20": { name: "Графический дизайнер", qual: "графический дизайнер", campus: "ugresha", budget: 25, psych: ["creative", "practical"], isProf: true }
    },
    clusters: {
        "it": { 
            name: "💻 IT & Кибербез", 
            psychNeed: ["analytic", "practical"],
            reason: "Ты любишь работать с технологиями, анализировать данные и создавать цифровые решения.",
            specs: ["09.02.06", "09.02.12", "10.02.05"]
        },
        "avia": { 
            name: "✈️ Авиа/Машиностроение", 
            psychNeed: ["practical", "analytic"],
            reason: "Тебе нравится работать с техникой, ты внимателен к деталям и любишь инженерные задачи.",
            specs: ["15.02.16", "25.02.06", "25.02.08", "12.01.09", "15.01.35", "15.01.38"],
            isProf: true
        },
        "chem": { 
            name: "🧪 Химия и лабораторный контроль", 
            psychNeed: ["analytic", "practical"],
            reason: "У тебя исследовательский интерес, аккуратность и внимание к деталям — идеально для лаборатории!",
            specs: ["18.02.12", "18.01.34"]
        },
        "auto": { 
            name: "🚗 Автомототехника", 
            psychNeed: ["practical", "communicative"],
            reason: "Тебе нравится диагностика, работа в команде и решение прикладных задач.",
            specs: ["23.02.07", "23.01.17"]
        },
        "business": { 
            name: "📊 Бизнес, логистика, торговля", 
            psychNeed: ["org", "communicative"],
            reason: "Ты организованный и коммуникабельный — умеешь планировать и работать с людьми.",
            specs: ["38.02.01", "38.02.03", "38.02.08"]
        },
        "law": { 
            name: "⚖️ Право и документация", 
            psychNeed: ["org", "analytic"],
            reason: "Тебе подходит работа с нормативами, структурирование и внимание к формулировкам.",
            specs: ["40.02.04", "46.02.01"]
        },
        "pedagogy": { 
            name: "🎓 Педагогика", 
            psychNeed: ["communicative", "org"],
            reason: "У тебя есть эмпатия, навыки планирования и желание помогать другим учиться.",
            specs: ["44.02.02"]
        },
        "food": { 
            name: "👨‍ Пищевое производство", 
            psychNeed: ["practical", "creative"],
            reason: "Ты ценишь практический результат и любишь творить — идеальное сочетание для кулинарии!",
            specs: ["43.02.15", "19.01.18"]
        },
        "design": { 
            name: "🎨 Дизайн", 
            psychNeed: ["creative", "practical"],
            reason: "У тебя визуальное мышление, чувство стиля и умение работать с инструментами.",
            specs: ["54.01.20"]
        },
        "safety": { 
            name: "🚒 Безопасность и ЧС", 
            psychNeed: ["practical", "org"],
            reason: "Ты стрессоустойчивый, алгоритмичный и ответственный — качества спасателя!",
            specs: ["20.02.04"]
        },
        "land": { 
            name: "🗺️ Землеустройство", 
            psychNeed: ["analytic", "practical"],
            reason: "Тебе нравится работать с картами, важна точность и сочетание полевых и камеральных задач.",
            specs: ["21.02.19"]
        },
        "zhk": { 
            name: "🏠 ЖКХ и эксплуатация", 
            psychNeed: ["org", "practical"],
            reason: "У тебя системное мышление, умение работать с инфраструктурой и коммуникациями.",
            specs: ["08.02.14"]
        }
    }
};

// --- СОСТОЯНИЕ ---
let state = {
    step: "start",
    name: "",
    grade: 9,
    avatar: "avatar-1.png",
    psych: { analytic: 0, practical: 0, creative: 0, communicative: 0, org: 0 },
    currentGame: 0,
    timeLeft: 180
};

// --- ОСНОВНОЙ ОБЪЕКТ ---
const App = {
    init() {
        this.loadProgress();
        this.renderAvatars();
        
        if (state.step !== "start") {
            this.restoreState();
        }
        
        this.showScreen(`screen-${state.step}`);
    },

    showScreen(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        window.scrollTo(0, 0);
        
        // Показываем панель игрока на нужных экранах
        if (id === 'screen-intro' || id === 'screen-map') {
            this.showPlayerPanel();
        }
    },

    showPlayerPanel() {
        // Обновляем панель на экране intro
        const avatarIntro = document.getElementById('player-avatar-intro');
        const nameIntro = document.getElementById('player-name-intro');
        if (avatarIntro && nameIntro) {
            avatarIntro.src = `media/images/${state.avatar}`;
            nameIntro.textContent = state.name;
        }
        
        // Обновляем панель на экране map
        const avatarMap = document.getElementById('player-avatar-map');
        const nameMap = document.getElementById('player-name-map');
        if (avatarMap && nameMap) {
            avatarMap.src = `media/images/${state.avatar}`;
            nameMap.textContent = state.name;
        }
    },

    startGame() {
        if (document.getElementById('save-progress').checked) {
            state.step = "profile";
        }
        this.showScreen('screen-profile');
    },

    renderAvatars() {
        const grid = document.getElementById('avatar-grid');
        grid.innerHTML = "";
        
        for (let i = 1; i <= 9; i++) {
            const div = document.createElement('div');
            div.className = 'avatar-item';
            
            const img = document.createElement('img');
            img.src = `media/images/avatar-${i}.png`;
            img.alt = `Аватар ${i}`;
            img.onerror = function() {
                this.parentElement.style.background = '#333';
                this.parentElement.innerHTML = `<span style="font-size:2rem;display:flex;align-items:center;justify-content:center;height:100%;">👤</span>`;
            };
            
            div.appendChild(img);
            div.onclick = () => this.selectAvatar(div, `avatar-${i}.png`);
            grid.appendChild(div);
        }
    },

    selectAvatar(el, avatarFile) {
        document.querySelectorAll('.avatar-item').forEach(i => i.classList.remove('selected'));
        el.classList.add('selected');
        state.avatar = avatarFile;
        this.checkProfileValid();
    },

    checkProfileValid() {
        const name = document.getElementById('player-name').value.trim();
        const grade = document.querySelector('input[name="grade"]:checked');
        const btn = document.getElementById('btn-create-profile');
        btn.disabled = !(name && grade && state.avatar);
    },

    saveProfile() {
        state.name = document.getElementById('player-name').value.trim();
        state.grade = parseInt(document.querySelector('input[name="grade"]:checked').value);
        state.step = "intro";
        state.currentGame = 0;
        
        this.saveProgress();
        this.showScreen('screen-intro');
        Game.startIntroGame(0);
    },

    saveProgress() {
        if (document.getElementById('save-progress').checked) {
            localStorage.setItem('lbt_game_save', JSON.stringify(state));
        }
    },

    loadProgress() {
        const saved = localStorage.getItem('lbt_game_save');
        if (saved) {
            const loaded = JSON.parse(saved);
            state = { ...state, ...loaded };
        }
    },

    restoreState() {
        document.getElementById('player-name').value = state.name;
        const radios = document.querySelectorAll('input[name="grade"]');
        radios.forEach(r => {
            if (parseInt(r.value) === state.grade) r.checked = true;
        });
    }
};

// --- ИГРОВАЯ ЛОГИКА ---
const Game = {
    hints: {
        data: {
            0: {
                story: "Однажды на фестивале прошлого года Гагарич сам стоял перед таким же выбором! Он сначала хотел только за компьютером, но попробовав поработать руками в мастерской, понял, что лучший результат получается, когда комбинируешь оба навыка.",
                tip: "Выбери то, что тебе ближе всего! 🔧 Руками, 💻 за компьютером, 👥 с людьми, 🎨 творить или 📊 планировать — всё важно!"
            },
            1: {
                story: "Гагарич помнит свой первый день на фестивале — один гость потерялся у входа. Если бы не правильный алгоритм помощи, всё могло закончиться плохо! С тех пор Гагарич всегда повторяет: 'Сначала пойми проблему, потом ищи решение'.",
                tip: "Подумай логически: сначала нужно понять ПРОБЛЕМУ (что ищет гость), потом искать решение (карту), и только потом действовать!"
            },
            2: {
                story: "Когда Гагарича только собрали, инженеры долго спорили: сделать его творческим или аналитическим? В итоге поняли — лучший ИИ комбинирует оба стиля! Ты тоже не обязан выбирать что-то одно.",
                tip: "Выбери ровно ДВА утверждения. Будь честен с собой — это поможет найти идеальную профессию!"
            }
        },
        show() {
            const modal = document.getElementById('modal-hint');
            const h = this.data[state.currentGame];
            document.getElementById('hint-story').textContent = h.story;
            document.getElementById('hint-text').textContent = h.tip;
            modal.classList.add('active');
        },
        close() {
            document.getElementById('modal-hint').classList.remove('active');
        }
    },

    timer: {
        interval: null,
        start() {
            state.timeLeft = 180;
            this.updateUI();
            this.interval = setInterval(() => {
                state.timeLeft--;
                this.updateUI();
                if (state.timeLeft <= 0) {
                    this.timeout();
                }
            }, 1000);
        },
        stop() {
            clearInterval(this.interval);
        },
        updateUI() {
            const m = Math.floor(state.timeLeft / 60);
            const s = state.timeLeft % 60;
            document.getElementById('timer-text').textContent = `${m}:${s < 10 ? '0'+s : s}`;
            
            const pct = (state.timeLeft / 180) * 100;
            const fill = document.querySelector('#timer-bar .timer-bar-fill');
            if (fill) {
                fill.style.width = pct + '%';
                fill.className = 'timer-bar-fill';
                if (state.timeLeft < 60) fill.classList.add('danger');
                else if (state.timeLeft < 120) fill.classList.add('warning');
            }
        },
        timeout() {
            this.stop();
            document.getElementById('modal-timeout').classList.add('active');
        }
    },

    nextStep() {
        state.currentGame++;
        if (state.currentGame < 3) {
            this.startIntroGame(state.currentGame);
        } else {
            this.finishIntro();
        }
    },

    timeoutNext() {
        document.getElementById('modal-timeout').classList.remove('active');
        Object.keys(state.psych).forEach(k => state.psych[k] += 1);
        this.nextStep();
    },

    startIntroGame(index) {
        this.timer.stop();
        this.timer.start();
        
        const btnNext = document.getElementById('btn-next-game');
        const btnHint = document.getElementById('btn-hint');
        btnNext.disabled = true;
        btnHint.disabled = false;
        
        const area = document.getElementById('game-area');
        area.innerHTML = "";

        if (index === 0) this.renderGame1(area);
        else if (index === 1) this.renderGame2(area);
        else if (index === 2) this.renderGame3(area);
    },

    // === ИГРА 1: Выбор стиля (охватывает ВСЕ 12 кластеров) ===
    renderGame1(container) {
        const options = [
            { icon: "🔧", text: "Работать руками — собирать, чинить, создавать", keys: { practical: 2, analytic: 1 } },
            { icon: "💻", text: "Работать за компьютером — программировать, анализировать", keys: { analytic: 2, practical: 1 } },
            { icon: "👥", text: "Работать с людьми — помогать, учить, организовывать", keys: { communicative: 2, org: 1 } },
            { icon: "🎨", text: "Творить — рисовать, оформлять, придумывать", keys: { creative: 2, practical: 1 } },
            { icon: "📊", text: "Считать и планировать — бюджет, логистика, документы", keys: { org: 2, analytic: 1 } }
        ];

        let html = `
            <h3>⚡ Твой первый выбор</h3>
            <p>С чего хочешь начать?</p>
            <div style="width:100%;">
        `;
        options.forEach(opt => {
            html += `<button class="game-btn" data-keys='${JSON.stringify(opt.keys)}' onclick="Game.game1Select(this)">${opt.icon} ${opt.text}</button>`;
        });
        html += `</div>`;
        container.innerHTML = html;
    },

    game1Select(btn) {
        document.querySelectorAll('.game-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        
        const keys = JSON.parse(btn.dataset.keys);
        for (const [key, value] of Object.entries(keys)) {
            state.psych[key] += value;
        }
        
        setTimeout(() => this.gameSuccess(), 300);
    },

    // === ИГРА 2: Drag-and-Drop сортировка ===
    renderGame2(container) {
        const steps = [
            "Узнать, какую площадку ищет гость",
            "Проверить карту фестиваля",
            "Провести гостя до места",
            "Убедиться, что гость нашёл нужное"
        ];
        
        const shuffled = [...steps];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        let html = `
            <h3>📋 Ситуация на фестивале</h3>
            <p>Гость потерялся! Перетащи шаги в правильном порядке</p>
            <div class="drag-list" id="drag-list">
        `;
        
        shuffled.forEach((txt, i) => {
            html += `
                <div class="drag-item" draggable="true" data-index="${steps.indexOf(txt)}" id="drag-${i}">
                    <div class="drag-handle">⠿</div>
                    <span>${txt}</span>
                </div>
            `;
        });
        
        html += `</div>`;
        html += `<button class="btn btn-primary" style="margin-top:20px;" onclick="Game.checkDragOrder()">Проверить →</button>`;
        container.innerHTML = html;
        
        this.initDragAndDrop();
    },

    initDragAndDrop() {
        const list = document.getElementById('drag-list');
        if (!list) return;
        
        const items = list.querySelectorAll('.drag-item');
        let draggedItem = null;

        items.forEach(item => {
            item.addEventListener('dragstart', () => {
                draggedItem = item;
                setTimeout(() => item.classList.add('dragging'), 0);
            });
            
            item.addEventListener('dragend', () => {
                item.classList.remove('dragging');
                draggedItem = null;
            });
            
            item.addEventListener('dragover', (e) => {
                e.preventDefault();
                const rect = item.getBoundingClientRect();
                const midY = rect.top + rect.height / 2;
                if (e.clientY < midY) {
                    item.parentNode.insertBefore(draggedItem, item);
                } else {
                    item.parentNode.insertBefore(draggedItem, item.nextSibling);
                }
            });
        });
    },

    checkDragOrder() {
        const list = document.getElementById('drag-list');
        const items = list.querySelectorAll('.drag-item');
        const currentOrder = Array.from(items).map(item => parseInt(item.dataset.index));
        const correctOrder = [0, 1, 2, 3];
        
        const isCorrect = currentOrder.every((val, idx) => val === correctOrder[idx]);
        
        items.forEach(item => {
            if (isCorrect) {
                item.classList.add('drag-correct');
            }
        });
        
        if (isCorrect) {
            state.psych.communicative += 2;
            state.psych.org += 1;
        } else {
            let correctCount = 0;
            items.forEach((item, idx) => {
                if (parseInt(item.dataset.index) === idx) {
                    item.classList.add('drag-correct');
                    correctCount++;
                }
            });
            if (correctCount >= 2) {
                state.psych.communicative += 1;
                state.psych.org += 0.5;
            }
        }
        
        setTimeout(() => this.gameSuccess(), 800);
    },

    // === ИГРА 3: Мультиселект (охватывает ВСЕ профили) ===
    renderGame3(container) {
        const options = [
            { txt: "Люблю чёткие инструкции и алгоритмы", key: "analytic" },
            { txt: "Предпочитаю творческие задачи без жёстких рамок", key: "creative" },
            { txt: "Мне важно видеть физический результат труда", key: "practical" },
            { txt: "Нравится анализировать данные и делать выводы", key: "analytic" },
            { txt: "Люблю работать в команде и помогать другим", key: "communicative" },
            { txt: "Предпочитаю работать самостоятельно", key: "practical" },
            { txt: "Мне важно, чтобы работа приносила пользу людям", key: "communicative" },
            { txt: "Люблю планировать и организовывать процессы", key: "org" }
        ];
        
        let html = `
            <h3>🧠 Твой стиль работы</h3>
            <p>Выбери 2 утверждения:</p>
            <div id="multi-select" style="width:100%;">
        `;
        options.forEach(opt => {
            html += `<button class="game-btn g3-btn" data-key="${opt.key}" onclick="Game.toggleSelect3(this)">${opt.txt}</button>`;
        });
        html += `</div>`;
        html += `<button class="btn btn-primary" style="margin-top:20px;" onclick="Game.finishGame3()">Готово →</button>`;
        container.innerHTML = html;
    },

    toggleSelect3(btn) {
        const selected = document.querySelectorAll('.g3-btn.selected');
        if (btn.classList.contains('selected')) {
            btn.classList.remove('selected');
            btn.style.borderColor = '';
            btn.style.background = '';
            btn.style.color = '';
        } else if (selected.length < 2) {
            btn.classList.add('selected');
            btn.style.borderColor = 'var(--primary)';
            btn.style.background = 'rgba(0, 212, 255, 0.15)';
            btn.style.color = 'var(--primary)';
        }
    },

    finishGame3() {
        const selected = document.querySelectorAll('.g3-btn.selected');
        if (selected.length < 2) {
            alert("Нужно выбрать ровно 2 варианта!");
            return;
        }
        
        selected.forEach(btn => {
            state.psych[btn.dataset.key] += 2;
        });
        this.gameSuccess();
    },

    gameSuccess() {
        this.timer.stop();
        document.getElementById('btn-next-game').disabled = false;
        document.getElementById('btn-hint').disabled = true;
    },

    finishIntro() {
        this.timer.stop();
        this.calculateResults();
        App.saveProgress();
        App.showScreen('screen-map');
    },

    calculateResults() {
        let scores = {};
        
        for (const [id, cluster] of Object.entries(DATA.clusters)) {
            let score = 0;
            cluster.psychNeed.forEach(p => {
                score += (state.psych[p] || 0);
            });
            scores[id] = score;
        }

        const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
        const top3 = sorted.slice(0, 3);
        
        const list = document.getElementById('top3-list');
        list.innerHTML = "";
        
        const medals = ['🥇', '🥈', '🥉'];
        const classes = ['gold', 'silver', 'bronze'];
        
        top3.forEach(([clusterId, score], idx) => {
            const cluster = DATA.clusters[clusterId];
            const div = document.createElement('div');
            div.className = `top3-item ${classes[idx]}`;
            
            const firstSpecCode = cluster.specs[0];
            const firstSpec = DATA.specialties[firstSpecCode];
            const campus = DATA.campuses[firstSpec.campus];
            
            const hasProfSpecs = cluster.specs.some(code => {
                const spec = DATA.specialties[code];
                return spec && spec.isProf;
            });
            
            let html = `
                <div class="rank">${medals[idx]} ${idx + 1} место</div>
                <div class="name">${cluster.name}</div>
            `;
            
            if (hasProfSpecs) {
                html += `
                    <div class="professionalet-badge-container">
                        <img src="media/images/professionalet-badge.png" alt="ПРОФЕССИОНАЛИТЕТ" class="professionalet-badge" onerror="this.style.display='none'">
                        <span class="professionalet-text">ПРОФЕССИОНАЛИТЕТ</span>
                    </div>
                `;
            }
            
            html += `
                <div class="reason">${cluster.reason}</div>
                <div style="margin-top:8px;font-size:0.8rem;color:var(--text-dim);">
                    📍 ${campus.name}<br>
                    🎓 Специальностей: ${cluster.specs.length}
                </div>
            `;
            
            div.innerHTML = html;
            list.appendChild(div);
        });
    }
};

// Запуск
document.addEventListener('DOMContentLoaded', () => App.init());
document.getElementById('player-name').addEventListener('input', () => App.checkProfileValid());
document.querySelectorAll('input[name="grade"]').forEach(r => r.addEventListener('change', () => App.checkProfileValid()));