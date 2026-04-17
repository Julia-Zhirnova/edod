// ==========================================
// ЯДРО ИГРЫ «ФЕСТИВАЛЬ ПРОФЕССИЙ»
// Люберецкий техникум им. Гагарина
// ==========================================

// ---------- ВСТРОЕННЫЕ ДАННЫЕ ----------
const DATA = {
    campuses: {
        central: { name: "Центральный", address: "г. Люберцы, Октябрьский пр-т, д.114" },
        gagarin: { name: "Гагаринский", address: "г. Люберцы, Октябрьский пр-т, д.136" },
        kraskovo: { name: "Красково", address: "Люберецкий р-он, пос. Красково, ул. 2-ая Заводская, д. 11" },
        ugresha: { name: "Угреша", address: "г. Дзержинский, ул. Академика Жукова, д.24" }
    },
    specialties: {
        "08.02.14": { name: "Эксплуатация и обслуживание многоквартирного дома", qual: "техник", campus: "central", budget: 25, psych: ["org", "practical"] },
        "09.02.06": { name: "Сетевое и системное администрирование", qual: "системный администратор", campus: "kraskovo", budget: 25, psych: ["analytic", "practical"] },
        "09.02.12": { name: "Техническая эксплуатация и сопровождение информационных систем", qual: "специалист по тех.эксплуатации", campus: "ugresha", budget: 25, psych: ["analytic", "creative"] },
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
        it: { name: "💻 IT & Кибербез", icon: "💻", psychNeed: ["analytic", "practical"], reason: "Ты любишь технологии, анализ и цифровую безопасность.", specs: ["09.02.06", "09.02.12", "10.02.05"] },
        avia: { name: "✈️ Авиа/Машиностроение", icon: "✈️", psychNeed: ["practical", "analytic"], reason: "Точность, работа с техникой, инженерное мышление.", specs: ["15.02.16", "25.02.06", "25.02.08", "12.01.09", "15.01.35", "15.01.38"], isProf: true },
        chem: { name: "🧪 Химия и лабораторный контроль", icon: "🧪", psychNeed: ["analytic", "practical"], reason: "Исследовательский интерес, аккуратность, работа с данными.", specs: ["18.02.12", "18.01.34"] },
        auto: { name: "🚗 Автомототехника", icon: "🚗", psychNeed: ["practical", "communicative"], reason: "Диагностика, работа в команде, решение прикладных задач.", specs: ["23.02.07", "23.01.17"] },
        business: { name: "📊 Бизнес, логистика, торговля", icon: "📊", psychNeed: ["org", "communicative"], reason: "Планирование, работа с людьми и документами.", specs: ["38.02.01", "38.02.03", "38.02.08"] },
        law: { name: "⚖️ Право и документация", icon: "⚖️", psychNeed: ["org", "analytic"], reason: "Работа с нормативами, внимание к формулировкам.", specs: ["40.02.04", "46.02.01"] },
        pedagogy: { name: "🎓 Педагогика", icon: "🎓", psychNeed: ["communicative", "org"], reason: "Эмпатия, планирование, наставничество.", specs: ["44.02.02"] },
        food: { name: "👨‍🍳 Пищевое производство", icon: "👨‍🍳", psychNeed: ["practical", "creative"], reason: "Работа с рецептурами, эстетика, технологичность.", specs: ["43.02.15", "19.01.18"] },
        design: { name: "🎨 Дизайн", icon: "🎨", psychNeed: ["creative", "practical"], reason: "Визуальное мышление, чувство стиля.", specs: ["54.01.20"] },
        safety: { name: "🚒 Безопасность и ЧС", icon: "🚒", psychNeed: ["practical", "org"], reason: "Стрессоустойчивость, ответственность.", specs: ["20.02.04"] },
        land: { name: "🗺️ Землеустройство", icon: "🗺️", psychNeed: ["analytic", "practical"], reason: "Работа с картами, точность.", specs: ["21.02.19"] },
        zhk: { name: "🏠 ЖКХ и эксплуатация", icon: "🏠", psychNeed: ["org", "practical"], reason: "Системное мышление, работа с инфраструктурой.", specs: ["08.02.14"] }
    }
};

// ---------- ГЛОБАЛЬНОЕ СОСТОЯНИЕ ----------
let gameState = {
    step: "start",
    name: "",
    grade: 9,
    avatar: "avatar-1.png",
    psych: { analytic: 0, practical: 0, creative: 0, communicative: 0, org: 0 },
    specScores: {},            // баллы по каждой специальности (код -> число)
    unlockedClusters: [],
    completedClusters: [],
    completedSpecialties: {},  // { clusterId: [specCode, ...] }
    currentGame: 0,
    currentCluster: null,
    clusterGameIndex: 0,
    clusterQueue: [],
    selectedSpecialtyCode: null,
    timestamp: Date.now()
};

// ---------- ХРАНИЛИЩЕ (всегда сохраняем) ----------
const Storage = {
    save() {
        gameState.timestamp = Date.now();
        localStorage.setItem('luberteh_festival_v1', JSON.stringify(gameState));
    },
    load() {
        try {
            const saved = localStorage.getItem('luberteh_festival_v1');
            if (saved) {
                const loaded = JSON.parse(saved);
                if (loaded && typeof loaded === 'object') {
                    gameState = { ...gameState, ...loaded };
                }
                if (!gameState.completedSpecialties) gameState.completedSpecialties = {};
                if (!gameState.specScores) gameState.specScores = {};
            } else {
                // Если сохранения нет, гарантируем чистый старт
                this.clear();
            }
        } catch (e) {
            console.warn("Ошибка загрузки сохранения, начинаем заново");
            this.clear();
        }
    },
    clear() {
        localStorage.removeItem('luberteh_festival_v1');
        // Сбрасываем gameState к значениям по умолчанию
        gameState = {
            step: "start",
            name: "",
            grade: 9,
            avatar: "avatar-1.png",
            psych: { analytic: 0, practical: 0, creative: 0, communicative: 0, org: 0 },
            specScores: {},
            unlockedClusters: [],
            completedClusters: [],
            completedSpecialties: {},
            currentGame: 0,
            currentCluster: null,
            clusterGameIndex: 0,
            clusterQueue: [],
            selectedSpecialtyCode: null,
            timestamp: Date.now()
        };
    }
};

// ---------- ТАЙМЕР ----------
const Timer = {
    interval: null,
    timeLeft: 180,
    onTimeout: null,
    start(seconds, onTimeout) {
        this.stop();
        this.timeLeft = seconds;
        this.onTimeout = onTimeout;
        this.updateUI();
        this.interval = setInterval(() => {
            this.timeLeft--;
            this.updateUI();
            if (this.timeLeft <= 0) {
                this.stop();
                if (this.onTimeout) this.onTimeout();
            }
        }, 1000);
    },
    stop() {
        clearInterval(this.interval);
    },
    updateUI() {
        const m = Math.floor(this.timeLeft / 60);
        const s = this.timeLeft % 60;
        const timerText = document.getElementById('cluster-timer-text') || document.getElementById('timer-text');
        if (timerText) timerText.textContent = `${m}:${s < 10 ? '0'+s : s}`;
        const fill = document.querySelector('#cluster-timer-bar .timer-bar-fill, .timer-bar-fill');
        if (fill) {
            const pct = (this.timeLeft / 180) * 100;
            fill.style.width = pct + '%';
            fill.className = 'timer-bar-fill' + (this.timeLeft < 60 ? ' danger' : this.timeLeft < 120 ? ' warning' : '');
        }
    }
};

// ---------- UI УТИЛИТЫ ----------
const UI = {
    showHint(story, tip) {
        document.getElementById('hint-story').textContent = story;
        document.getElementById('hint-text').textContent = tip;
        document.getElementById('modal-hint').classList.add('active');
    },
    closeHint() {
        document.getElementById('modal-hint').classList.remove('active');
    }
};

// ---------- ОСНОВНОЕ ПРИЛОЖЕНИЕ ----------
const App = {
    init() {
        Storage.load();
        this.renderAvatars();
        if (gameState.step !== "start") this.restoreState();
        this.showScreen(`screen-${gameState.step}`);
    },
    showScreen(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const screenEl = document.getElementById(id);
        if (screenEl) screenEl.classList.add('active');
        window.scrollTo(0,0);
        if (id === 'screen-intro' || id === 'screen-map' || id === 'screen-cluster') {
            this.updatePlayerPanel(id);
        }
        if (id === 'screen-map') Map.init();
    },
    renderAvatars() {
        const grid = document.getElementById('avatar-grid');
        if (!grid) return;
        for (let i = 1; i <= 9; i++) {
            const div = document.createElement('div');
            div.className = 'avatar-item';
            const img = document.createElement('img');
            img.src = `media/images/avatar-${i}.png`;
            img.alt = `Аватар ${i}`;
            img.onerror = () => { div.innerHTML = '<span style="font-size:2rem;">👤</span>'; };
            div.appendChild(img);
            div.onclick = () => this.selectAvatar(div, `avatar-${i}.png`);
            grid.appendChild(div);
        }
    },
    selectAvatar(el, file) {
        document.querySelectorAll('.avatar-item').forEach(i => i.classList.remove('selected'));
        el.classList.add('selected');
        gameState.avatar = file;
        this.checkProfileValid();
    },
    checkProfileValid() {
        const name = document.getElementById('player-name')?.value.trim();
        const grade = document.querySelector('input[name="grade"]:checked');
        const btn = document.getElementById('btn-create-profile');
        if (btn) btn.disabled = !(name && grade && gameState.avatar);
    },
    saveProfile() {
        gameState.name = document.getElementById('player-name').value.trim();
        gameState.grade = parseInt(document.querySelector('input[name="grade"]:checked').value);
        gameState.step = "intro";
        gameState.currentGame = 0;
        Storage.save();
        this.showScreen('screen-intro');
        Game.startIntroGame(0);
    },
    updatePlayerPanel(screenId) {
        let avatarEl, nameEl;
        if (screenId === 'screen-intro') {
            avatarEl = document.getElementById('player-avatar-intro');
            nameEl = document.getElementById('player-name-intro');
        } else if (screenId === 'screen-map') {
            avatarEl = document.getElementById('map-avatar');
            nameEl = document.getElementById('map-name');
        } else if (screenId === 'screen-cluster') {
            avatarEl = document.getElementById('cluster-avatar');
            nameEl = document.getElementById('cluster-name');
        }
        if (avatarEl) {
            avatarEl.src = `media/images/${gameState.avatar}`;
            nameEl.textContent = gameState.name;
        }
    },
    startGame() { this.showScreen('screen-profile'); },
    restoreState() {
        if (document.getElementById('player-name')) {
            document.getElementById('player-name').value = gameState.name;
        }
        document.querySelectorAll('input[name="grade"]').forEach(r => { if (parseInt(r.value) === gameState.grade) r.checked = true; });
    },
    finishGame() {
        if (typeof Final !== 'undefined') Final.show();
    },
    restartGame() {
        if (confirm('Прогресс будет удалён. Начать заново?')) {
            Storage.clear();
            location.reload();
        }
    }
};

// ---------- ВВОДНЫЕ ИГРЫ ----------
const Game = {
    startIntroGame(index) {
        gameState.currentGame = index;
        Timer.start(180, () => {
            Object.keys(gameState.psych).forEach(k => gameState.psych[k] += 0.5);
            this.nextStep();
        });
        document.getElementById('btn-next-game').disabled = true;
        document.getElementById('btn-hint').disabled = false;
        const area = document.getElementById('game-area');
        area.innerHTML = "";
        if (index === 0) this.renderGame1(area);
        else if (index === 1) this.renderGame2(area);
        else if (index === 2) this.renderGame3(area);
    },
    renderGame1(area) {
        const opts = [
            { icon: "🔧", text: "Работать руками — собирать, чинить, создавать", keys: { practical: 2, analytic: 1 } },
            { icon: "💻", text: "Работать за компьютером", keys: { analytic: 2, practical: 1 } },
            { icon: "👥", text: "Работать с людьми", keys: { communicative: 2, org: 1 } },
            { icon: "🎨", text: "Творить — рисовать, оформлять", keys: { creative: 2, practical: 1 } },
            { icon: "📊", text: "Считать и планировать", keys: { org: 2, analytic: 1 } }
        ];
        let html = `<h3>⚡ Твой первый выбор</h3><p>С чего хочешь начать?</p>`;
        opts.forEach(o => html += `<button class="game-btn" data-keys='${JSON.stringify(o.keys)}' onclick="Game.selectOption(this)">${o.icon} ${o.text}</button>`);
        area.innerHTML = html;
    },
    selectOption(btn) {
        document.querySelectorAll('.game-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        const keys = JSON.parse(btn.dataset.keys);
        Object.entries(keys).forEach(([k,v]) => gameState.psych[k] += v);
        this.gameSuccess();
    },
    renderGame2(area) {
        const steps = ["Узнать, какую площадку ищет гость", "Проверить карту фестиваля", "Провести гостя до места", "Убедиться, что гость нашёл нужное"];
        const shuffled = [...steps].sort(() => Math.random() - 0.5);
        let html = `<h3>📋 Ситуация на фестивале</h3><p>Расставь шаги по порядку (введи номера через запятую)</p><ol>`;
        shuffled.forEach((txt, i) => html += `<li>${txt}</li>`);
        html += `</ol><input type="text" id="sequence-input" placeholder="1,2,3,4" style="width:100%; padding:12px; border-radius:8px; background:#222; color:white; border:1px solid #444;">`;
        html += `<button class="btn btn-primary" style="margin-top:15px;" onclick="Game.checkSequence()">Проверить</button><p id="seq-feedback"></p>`;
        area.innerHTML = html;
        // Сохраняем правильный порядок ИНДЕКСОВ (0-based) для перемешанных пунктов
        area.dataset.correctOrder = JSON.stringify(shuffled.map(txt => steps.indexOf(txt)));
    },
    checkSequence() {
        const input = document.getElementById('sequence-input').value.trim();
        const correctOrder = JSON.parse(document.getElementById('game-area').dataset.correctOrder);
        // Разбираем ввод: поддерживаем "1,2,3,4" или "1, 2, 3, 4"
        const userOrder = input.split(',').map(s => parseInt(s.trim()) - 1).filter(n => !isNaN(n));
        const isCorrect = userOrder.length === correctOrder.length && userOrder.every((val, idx) => val === correctOrder[idx]);
        const fb = document.getElementById('seq-feedback');
        if (isCorrect) {
            fb.innerHTML = '✅ Правильно!';
            gameState.psych.communicative += 2;
            gameState.psych.org += 1;
        } else {
            fb.innerHTML = `❌ Неверно. Попробуй ещё раз.`;
        }
        this.gameSuccess();
    },
    renderGame3(area) {
        const opts = [
            { txt: "Люблю чёткие инструкции", key: "analytic" }, { txt: "Творческие задачи без рамок", key: "creative" },
            { txt: "Видеть физический результат", key: "practical" }, { txt: "Анализировать данные", key: "analytic" },
            { txt: "Работать в команде", key: "communicative" }, { txt: "Работать самостоятельно", key: "practical" },
            { txt: "Приносить пользу людям", key: "communicative" }, { txt: "Планировать процессы", key: "org" }
        ];
        let html = `<h3>🧠 Твой стиль работы</h3><p>Выбери ровно 2 утверждения</p>`;
        opts.forEach(o => html += `<button class="game-btn g3-btn" data-key="${o.key}" onclick="Game.toggleSelect3(this)">${o.txt}</button>`);
        html += `<button class="btn btn-primary" onclick="Game.finishGame3()">Готово</button>`;
        area.innerHTML = html;
    },
    toggleSelect3(btn) {
        const sel = document.querySelectorAll('.g3-btn.selected');
        if (btn.classList.contains('selected')) btn.classList.remove('selected');
        else if (sel.length < 2) btn.classList.add('selected');
    },
    finishGame3() {
        const sel = document.querySelectorAll('.g3-btn.selected');
        if (sel.length !== 2) { alert("Выбери ровно 2 варианта!"); return; }
        sel.forEach(b => gameState.psych[b.dataset.key] += 2);
        this.gameSuccess();
    },
    gameSuccess() {
        Timer.stop();
        document.getElementById('btn-hint').disabled = true;
        document.getElementById('btn-next-game').disabled = false;
    },
    nextStep() {
        if (gameState.currentGame < 2) this.startIntroGame(gameState.currentGame + 1);
        else this.finishIntro();
    },
    timeoutNext() {
        document.getElementById('modal-timeout').classList.remove('active');
        this.nextStep();
    },
    finishIntro() {
        Timer.stop();
        let scores = {};
        Object.entries(DATA.clusters).forEach(([id, c]) => { scores[id] = c.psychNeed.reduce((s, p) => s + (gameState.psych[p]||0), 0); });
        const sorted = Object.entries(scores).sort((a,b) => b[1]-a[1]).map(x=>x[0]);
        gameState.unlockedClusters = sorted.slice(0, 3);
        Storage.save();
        App.showScreen('screen-map');
    },
    showHint() {
        const hints = {
            0: { story: "Гагарич тоже когда-то выбирал...", tip: "Выбери то, что тебе ближе всего!" },
            1: { story: "Однажды гость потерялся на фестивале.", tip: "Сначала нужно понять проблему, потом искать решение и только потом действовать." },
            2: { story: "Инженеры долго спорили, каким должен быть идеальный сотрудник.", tip: "Выбери ровно два утверждения, которые лучше всего описывают тебя." }
        };
        const h = hints[gameState.currentGame];
        UI.showHint(h.story, h.tip);
    }
};

// ---------- КАРТА ----------
const Map = {
    init() {
        const grid = document.getElementById('map-grid');
        grid.innerHTML = "";
        const completed = gameState.completedClusters || [];
        const unlocked = this.getUnlockedClusters();
        Object.entries(DATA.clusters).forEach(([id, c]) => {
            const isUnlocked = unlocked.includes(id);
            const isCompleted = completed.includes(id);
            const node = document.createElement('div');
            node.className = `map-node ${isUnlocked ? 'unlocked' : 'locked'} ${isCompleted ? 'completed' : ''}`;
            if (isUnlocked) node.onclick = () => Cluster.enter(id);
            node.innerHTML = `<span class="map-node-icon">${c.icon}</span><span class="map-node-title">${c.name}</span><span class="map-node-desc">${c.specs.length} специальности</span>${!isUnlocked?'<span>🔒</span>':''}${isCompleted?'<span>✅</span>':''}`;
            grid.appendChild(node);
        });
        document.getElementById('map-progress-count').textContent = `${completed.length}/12`;
        document.getElementById('btn-finish-map').style.display = completed.length >= 3 ? 'block' : 'none';
    },
    getUnlockedClusters() {
        let scores = {};
        Object.entries(DATA.clusters).forEach(([id, c]) => { scores[id] = c.psychNeed.reduce((s, p) => s + (gameState.psych[p]||0), 0); });
        const sortedIds = Object.entries(scores).sort((a,b) => b[1]-a[1]).map(x=>x[0]);
        const completedCount = (gameState.completedClusters || []).length;
        let unlockCount = 3;
        if (completedCount >= 3) unlockCount = 6;
        if (completedCount >= 6) unlockCount = 9;
        if (completedCount >= 9) unlockCount = 12;
        return sortedIds.slice(0, unlockCount);
    }
};

// ---------- КЛАСТЕР ----------
const Cluster = {
    enter(id) {
        gameState.currentCluster = id;
        gameState.clusterGameIndex = 0;
        App.showScreen('screen-cluster');
        document.getElementById('cluster-title').textContent = DATA.clusters[id].icon + ' ' + DATA.clusters[id].name;
        this.showSpecialtySelect();
    },
    showSpecialtySelect() {
        const cluster = DATA.clusters[gameState.currentCluster];
        const modal = document.getElementById('modal-specialty');
        const optsDiv = document.getElementById('specialty-options');
        optsDiv.innerHTML = "";
        const completedSpecs = gameState.completedSpecialties[gameState.currentCluster] || [];
        cluster.specs.forEach(code => {
            const spec = DATA.specialties[code];
            const btn = document.createElement('div');
            btn.className = 'specialty-option';
            if (completedSpecs.includes(code)) btn.classList.add('completed-specialty');
            btn.innerHTML = `<span class="code">${code}</span> ${spec.name} ${completedSpecs.includes(code) ? '✅' : ''}`;
            btn.onclick = () => { 
                gameState.selectedSpecialtyCode = code; 
                modal.classList.remove('active'); 
                this.startGames(); 
            };
            optsDiv.appendChild(btn);
        });
        modal.classList.add('active');
    },
    closeSpecialtyModal() { document.getElementById('modal-specialty').classList.remove('active'); },
    startGames() {
        const count = gameState.grade === 8 ? 2 : 3;
        gameState.clusterGameIndex = 0;
        gameState.clusterQueue = Array.from({length: count}, (_,i)=>i);
        this.loadGame(0);
    },
    loadGame(diff) {
        Timer.stop();
        Timer.start(180, () => { this.nextGame(); });
        const area = document.getElementById('cluster-game-area');
        area.innerHTML = "";
        document.getElementById('cluster-btn-next').disabled = true;
        document.getElementById('cluster-btn-hint').disabled = false;
        const clusterId = gameState.currentCluster;
        const spec = gameState.selectedSpecialtyCode;
        const moduleName = 'cluster' + clusterId.charAt(0).toUpperCase() + clusterId.slice(1);
        const clusterModule = window[moduleName];
        if (clusterModule) {
            clusterModule.render(area, spec, diff);
        } else {
            area.innerHTML = `<p>Ошибка: модуль ${moduleName} не найден.</p>`;
        }
    },
    gameSuccess() {
        Timer.stop();
        document.getElementById('cluster-btn-hint').disabled = true;
        document.getElementById('cluster-btn-next').disabled = false;
    },
    nextGame() {
        gameState.clusterGameIndex++;
        if (gameState.clusterGameIndex < gameState.clusterQueue.length) this.loadGame(gameState.clusterGameIndex);
        else this.finishCluster();
    },
    finishCluster() {
        Timer.stop();
        const clusterId = gameState.currentCluster;
        const spec = gameState.selectedSpecialtyCode;
        // Убедимся, что счёт специальности инициализирован
        if (!gameState.specScores[spec]) gameState.specScores[spec] = 0;
        // Отмечаем специальность пройденной
        if (!gameState.completedSpecialties[clusterId]) gameState.completedSpecialties[clusterId] = [];
        if (!gameState.completedSpecialties[clusterId].includes(spec)) {
            gameState.completedSpecialties[clusterId].push(spec);
        }
        // Кластер считается завершённым, если пройдена хотя бы одна специальность
        if (!gameState.completedClusters.includes(clusterId)) {
            gameState.completedClusters.push(clusterId);
        }
        Storage.save();
        if (gameState.completedClusters.length === 3 || gameState.completedClusters.length === 6 || gameState.completedClusters.length === 9) {
            this.showContinueDialog();
        } else {
            App.showScreen('screen-map');
        }
    },
    showContinueDialog() {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>🎉 Ты прошёл ${gameState.completedClusters.length} кластеров!</h3>
                <p>Хочешь продолжить исследовать карту или завершить и получить свой персональный рейтинг?</p>
                <button class="btn btn-primary" id="continue-btn">Продолжить</button>
                <button class="btn btn-secondary" id="finish-btn">Завершить и увидеть результат</button>
            </div>
        `;
        document.body.appendChild(modal);
        document.getElementById('continue-btn').onclick = () => { modal.remove(); App.showScreen('screen-map'); };
        document.getElementById('finish-btn').onclick = () => { modal.remove(); App.finishGame(); };
    },
    goBackToMap() { Timer.stop(); App.showScreen('screen-map'); },
    showHint() {
        const clusterId = gameState.currentCluster;
        const moduleName = 'cluster' + clusterId.charAt(0).toUpperCase() + clusterId.slice(1);
        const clusterModule = window[moduleName];
        if (clusterModule && clusterModule.getHint) {
            const hint = clusterModule.getHint(gameState.selectedSpecialtyCode, gameState.clusterGameIndex);
            UI.showHint(hint.story, hint.tip);
        } else {
            UI.showHint("Подсказка", "Подумай логически!");
        }
    }
};

// ---------- ФИНАЛ ----------
const Final = {
    show() {
        Timer.stop();
        // Вычисляем итоговые баллы: базовый психотип + накопленные specScores
        let specScores = {};
        for (const [code, spec] of Object.entries(DATA.specialties)) {
            let base = spec.psych.reduce((s, p) => s + (gameState.psych[p] || 0), 0);
            let extra = gameState.specScores[code] || 0;
            specScores[code] = base + extra;
        }
        const sortedSpecs = Object.entries(specScores).sort((a,b) => b[1]-a[1]);
        const top3 = sortedSpecs.slice(0,3);
        
        const container = document.getElementById('app-container');
        let html = `<div class="screen active" id="screen-final">`;
        html += `<div class="player-panel-center"><img src="media/images/${gameState.avatar}" class="player-avatar"><span class="player-name">${gameState.name}</span></div>`;
        html += `<div class="logo-container"><img src="media/images/logo.png" class="logo"></div>`;
        html += `<h2>${gameState.name}, твой путь!</h2>`;
        html += `<h3>🏆 Топ-3 специальности</h3><div id="top3-specs"></div>`;
        html += `<h3>📊 Полный рейтинг</h3><button class="btn btn-secondary" id="toggle-full-list">Показать все специальности</button><div id="full-list" style="display:none; margin-top:15px;"></div>`;
        html += `<div class="controls"><button class="btn btn-primary" id="btn-apply">Подать документы</button>`;
        html += `<button class="btn btn-secondary" id="btn-back-to-map">Вернуться на карту</button>`;
        html += `<button class="btn btn-secondary" id="btn-restart">Пройти заново</button></div>`;
        html += `</div>`;
        container.innerHTML = html;
        
        const top3Div = document.getElementById('top3-specs');
        const medals = ['🥇','🥈','🥉'];
        top3.forEach(([code, score], idx) => {
            const spec = DATA.specialties[code];
            const campus = DATA.campuses[spec.campus];
            const div = document.createElement('div');
            div.className = `top3-item ${['gold','silver','bronze'][idx]}`;
            div.innerHTML = `<div class="rank">${medals[idx]} ${idx+1} место</div><div class="name">${spec.name}</div><div>${code}</div>`;
            if (spec.isProf) div.innerHTML += `<div class="professionalet-badge-container"><span class="professionalet-text">ПРОФЕССИОНАЛИТЕТ</span></div>`;
            div.innerHTML += `<div>🏫 ${campus.name}<br>💰 Бюджет: ${spec.budget} ${spec.paid ? '| Платно: '+spec.paid : ''}<br>🎯 Баллы: ${score}</div>`;
            top3Div.appendChild(div);
        });
        
        document.getElementById('toggle-full-list').onclick = () => {
            const fullDiv = document.getElementById('full-list');
            if (fullDiv.style.display === 'none') {
                fullDiv.innerHTML = '';
                sortedSpecs.forEach(([code, score]) => {
                    const spec = DATA.specialties[code];
                    const p = document.createElement('p');
                    p.textContent = `${code} ${spec.name} — ${score} баллов`;
                    fullDiv.appendChild(p);
                });
                fullDiv.style.display = 'block';
                document.getElementById('toggle-full-list').textContent = 'Скрыть список';
            } else {
                fullDiv.style.display = 'none';
                document.getElementById('toggle-full-list').textContent = 'Показать все специальности';
            }
        };
        
        document.getElementById('btn-apply').onclick = () => {
            if (confirm('Прогресс будет удалён. Перейти на сайт приёмной комиссии?')) {
                Storage.clear();
                window.location.href = 'https://luberteh.ru/pravila-priema.htm';
            }
        };
        
        document.getElementById('btn-back-to-map').onclick = () => {
            App.showScreen('screen-map');
        };
        
        document.getElementById('btn-restart').onclick = () => {
            if (confirm('Прогресс будет удалён. Начать заново?')) {
                Storage.clear();
                location.reload();
            }
        };
    }
};

// ---------- ИНИЦИАЛИЗАЦИЯ ----------
document.addEventListener('DOMContentLoaded', () => {
    App.init();
    document.getElementById('player-name')?.addEventListener('input', () => App.checkProfileValid());
    document.querySelectorAll('input[name="grade"]').forEach(r => r.addEventListener('change', () => App.checkProfileValid()));
});

window.App = App;
window.Game = Game;
window.Cluster = Cluster;
window.UI = UI;
window.DATA = DATA;
window.gameState = gameState;