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

// Соседи кластеров для разблокировки
const CLUSTER_NEIGHBORS = {
    it: ["auto", "business"],
    avia: ["chem", "it"],
    chem: ["avia", "auto"],
    auto: ["it", "chem"],
    business: ["it", "law"],
    law: ["business", "pedagogy"],
    pedagogy: ["law", "food"],
    food: ["pedagogy", "design"],
    design: ["food", "safety"],
    safety: ["design", "land"],
    land: ["safety", "zhk"],
    zhk: ["land", "business"]
};

// ---------- ГЛОБАЛЬНОЕ СОСТОЯНИЕ ----------
let gameState = {
    step: "start",
    name: "",
    grade: 9,
    avatar: "avatar-1.png",
    psych: { analytic: 0, practical: 0, creative: 0, communicative: 0, org: 0 },
    scores: {},
    unlockedClusters: [],
    completedClusters: [],
    currentGame: 0,
    currentCluster: null,
    clusterGameIndex: 0,
    clusterQueue: [],
    selectedSpecialtyCode: null,
    timestamp: Date.now()
};

// ---------- ХРАНИЛИЩЕ ----------
const Storage = {
    save() {
        if (document.getElementById('save-progress')?.checked) {
            gameState.timestamp = Date.now();
            localStorage.setItem('luberteh_festival_v1', JSON.stringify(gameState));
        }
    },
    load() {
        try {
            const saved = localStorage.getItem('luberteh_festival_v1');
            if (saved) {
                const loaded = JSON.parse(saved);
                gameState = { ...gameState, ...loaded };
            }
        } catch (e) {}
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
        const elText = document.querySelector('#timer-text, #cluster-timer-text');
        if (elText) elText.textContent = `${m}:${s < 10 ? '0'+s : s}`;
        const fill = document.querySelector('.timer-bar-fill');
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

// ---------- DRAG & DROP (МОБИЛЬНЫЙ) ----------
const DragDrop = {
    init(selector) {
        const list = document.querySelector(selector);
        if (!list) return;
        const items = list.querySelectorAll('.drag-item');
        let dragged = null, touchOffsetY = 0;
        items.forEach(item => {
            item.setAttribute('draggable', 'true');
            item.addEventListener('dragstart', e => { dragged = item; item.classList.add('dragging'); });
            item.addEventListener('dragend', () => { item.classList.remove('dragging'); dragged = null; });
            item.addEventListener('dragover', e => {
                e.preventDefault();
                const rect = item.getBoundingClientRect();
                const midY = rect.top + rect.height/2;
                if (e.clientY < midY) list.insertBefore(dragged, item);
                else list.insertBefore(dragged, item.nextSibling);
            });
            // Touch events
            item.addEventListener('touchstart', e => {
                dragged = item;
                const touch = e.touches[0];
                const rect = item.getBoundingClientRect();
                touchOffsetY = touch.clientY - rect.top;
                item.classList.add('dragging');
                item.style.position = 'absolute';
                item.style.zIndex = '1000';
                item.style.width = rect.width + 'px';
                item.style.left = rect.left + 'px';
                item.style.top = rect.top + 'px';
            }, {passive: true});
            item.addEventListener('touchmove', e => {
                if (!dragged) return;
                e.preventDefault();
                const touch = e.touches[0];
                dragged.style.top = (touch.clientY - touchOffsetY) + 'px';
                const below = document.elementFromPoint(touch.clientX, touch.clientY)?.closest('.drag-item');
                if (below && below !== dragged) {
                    const rect = below.getBoundingClientRect();
                    const midY = rect.top + rect.height/2;
                    if (touch.clientY < midY) list.insertBefore(dragged, below);
                    else list.insertBefore(dragged, below.nextSibling);
                }
            }, {passive: false});
            item.addEventListener('touchend', () => {
                if (dragged) {
                    dragged.classList.remove('dragging');
                    dragged.style.position = '';
                    dragged.style.top = ''; dragged.style.left = ''; dragged.style.zIndex = ''; dragged.style.width = '';
                    dragged = null;
                }
            });
        });
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
        document.getElementById(id).classList.add('active');
        window.scrollTo(0,0);
        if (id === 'screen-intro' || id === 'screen-map') this.updatePlayerPanel();
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
    updatePlayerPanel() {
        const avatarIntro = document.getElementById('player-avatar-intro');
        const nameIntro = document.getElementById('player-name-intro');
        if (avatarIntro) { avatarIntro.src = `media/images/${gameState.avatar}`; nameIntro.textContent = gameState.name; }
        const mapAvatar = document.getElementById('map-avatar');
        const mapName = document.getElementById('map-name');
        if (mapAvatar) { mapAvatar.src = `media/images/${gameState.avatar}`; mapName.textContent = gameState.name; }
    },
    startGame() {
        this.showScreen('screen-profile');
    },
    restoreState() {
        document.getElementById('player-name').value = gameState.name;
        document.querySelectorAll('input[name="grade"]').forEach(r => { if (parseInt(r.value) === gameState.grade) r.checked = true; });
    },
    finishGame() {
        if (typeof Final !== 'undefined') Final.show();
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
        let html = `<h3>📋 Ситуация на фестивале</h3><p>Расставь шаги по порядку</p><div class="drag-list" id="drag-list">`;
        shuffled.forEach((txt, i) => html += `<div class="drag-item" draggable="true" data-index="${steps.indexOf(txt)}"><div class="drag-handle">⠿</div><span>${txt}</span></div>`);
        html += `</div><button class="btn btn-primary" onclick="Game.checkDragOrder()">Проверить</button>`;
        area.innerHTML = html;
        setTimeout(() => DragDrop.init('#drag-list'), 100);
    },
    checkDragOrder() {
        const items = document.querySelectorAll('#drag-list .drag-item');
        const order = Array.from(items).map(i => parseInt(i.dataset.index));
        const correct = order.join(',') === '0,1,2,3';
        items.forEach(i => { if (correct) i.classList.add('drag-correct'); });
        if (correct) { gameState.psych.communicative += 2; gameState.psych.org += 1; }
        else { let c = 0; items.forEach((i,idx) => { if (parseInt(i.dataset.index) === idx) c++; }); if (c>=2) { gameState.psych.communicative += 1; gameState.psych.org += 0.5; } }
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
        gameState.unlockedClusters = Object.entries(scores).sort((a,b) => b[1]-a[1]).slice(0,3).map(x=>x[0]);
        Storage.save();
        App.showScreen('screen-map');
    },
    showHint() {
        const hints = {
            0: { story: "Гагарич тоже когда-то выбирал...", tip: "Выбери то, что ближе всего!" },
            1: { story: "Однажды гость потерялся...", tip: "Сначала пойми проблему, потом ищи решение." },
            2: { story: "Инженеры спорили...", tip: "Выбери ровно два утверждения." }
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
            if (isUnlocked && !isCompleted) node.onclick = () => Cluster.enter(id);
            node.innerHTML = `<span class="map-node-icon">${c.icon}</span><span class="map-node-title">${c.name}</span><span class="map-node-desc">${c.specs.length} специальности</span>${!isUnlocked?'<span>🔒</span>':''}${isCompleted?'<span>✅</span>':''}`;
            grid.appendChild(node);
        });
        document.getElementById('map-progress-count').textContent = `${completed.length}/12`;
        document.getElementById('btn-finish-map').style.display = completed.length >= 3 ? 'block' : 'none';
    },
    getUnlockedClusters() {
        const unlocked = new Set(gameState.unlockedClusters || []);
        (gameState.completedClusters || []).forEach(id => {
            unlocked.add(id);
            (CLUSTER_NEIGHBORS[id] || []).forEach(n => unlocked.add(n));
        });
        return Array.from(unlocked);
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
        cluster.specs.slice(0,3).forEach(code => {
            const spec = DATA.specialties[code];
            const btn = document.createElement('div');
            btn.className = 'specialty-option';
            btn.innerHTML = `<span class="code">${code}</span> ${spec.name}`;
            btn.onclick = () => { gameState.selectedSpecialtyCode = code; modal.classList.remove('active'); this.startGames(); };
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
        const gameModule = window[`Games${clusterId.charAt(0).toUpperCase()+clusterId.slice(1)}`];
        if (gameModule) gameModule.render(area, spec, diff);
        else area.innerHTML = `<p>Ошибка: модуль игр для кластера ${clusterId} не найден.</p>`;
    },
    gameSuccess() {
        Timer.stop();
        document.getElementById('cluster-btn-hint').disabled = true;
        document.getElementById('cluster-btn-next').disabled = false;
    },
    gameFail() {
        alert("❌ Неверно. Попробуй ещё раз или используй подсказку.");
    },
    nextGame() {
        gameState.clusterGameIndex++;
        if (gameState.clusterGameIndex < gameState.clusterQueue.length) this.loadGame(gameState.clusterGameIndex);
        else this.finishCluster();
    },
    finishCluster() {
        Timer.stop();
        if (!gameState.completedClusters.includes(gameState.currentCluster)) {
            gameState.completedClusters.push(gameState.currentCluster);
        }
        Storage.save();
        if (gameState.completedClusters.length === 3) {
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
                <h3>🎉 Ты прошёл 3 кластера!</h3>
                <p>Хочешь продолжить исследовать карту или завершить и получить свой персональный рейтинг?</p>
                <button class="btn btn-primary" id="continue-btn">Продолжить</button>
                <button class="btn btn-secondary" id="finish-btn">Завершить и увидеть результат</button>
            </div>
        `;
        document.body.appendChild(modal);
        document.getElementById('continue-btn').onclick = () => {
            modal.remove();
            App.showScreen('screen-map');
        };
        document.getElementById('finish-btn').onclick = () => {
            modal.remove();
            App.finishGame();
        };
    },
    goBackToMap() { Timer.stop(); App.showScreen('screen-map'); },
    showHint() {
        const hints = {
            it: { story: "Для сложной игры: готовая функция проверки IP", tip: "def is_valid_ip(ip):\n    parts = ip.split('.')\n    if len(parts) != 4: return False\n    for p in parts:\n        if not p.isdigit(): return False\n        if not 0 <= int(p) <= 255: return False\n    return True" },
            avia: { story: "Допуск ±0.05 означает, что годные размеры от 119.95 до 120.05.", tip: "Выбери все значения в этом диапазоне." },
            chem: { story: "Нейтральный pH = 7. Для точного объёма используют мерную колбу.", tip: "Правильный ответ: 7 и мерная колба." },
            auto: { story: "Диагностику начинают с аккумулятора. Код P0300 — пропуски зажигания.", tip: "Проверь аккумулятор, затем свечи." },
            business: { story: "Проводка: дебет 41 — кредит 60. НДФЛ 13%.", tip: "Зарплата на руки = (оклад + премия) * 0.87." },
            law: { story: "Конституция — основной закон. Претензия: шапка → описание → требование → приложения.", tip: "Срок хранения личных дел — 75 лет." },
            pedagogy: { story: "Этапы урока: оргмомент, актуализация, объяснение, закрепление, рефлексия.", tip: "Начни с организации, закончи рефлексией." },
            food: { story: "Бисквит опадает от перепада температур.", tip: "Не открывай духовку первые 20 минут." },
            design: { story: "Комплементарные цвета: красный и зелёный.", tip: "Для текста лучше шрифт с засечками." },
            safety: { story: "Электроустановки тушат углекислотным огнетушителем.", tip: "Время эвакуации = путь / скорость." },
            land: { story: "Масштаб 1:1000 → 1 см = 10 м.", tip: "Площадь в гектарах: 1 га = 10000 м²." },
            zhk: { story: "Подготовка к зиме — промывка и опрессовка отопления.", tip: "ОДН = (разница) * (доля площади) * тариф." }
        };
        const h = hints[gameState.currentCluster] || { story: "Подумай логически!", tip: "Используй знания, полученные в школе." };
        UI.showHint(h.story, h.tip);
    }
};

// ---------- ИНИЦИАЛИЗАЦИЯ ----------
document.addEventListener('DOMContentLoaded', () => {
    App.init();
    document.getElementById('player-name')?.addEventListener('input', () => App.checkProfileValid());
    document.querySelectorAll('input[name="grade"]').forEach(r => r.addEventListener('change', () => App.checkProfileValid()));
});

// Глобальные ссылки
window.App = App;
window.Game = Game;
window.Cluster = Cluster;
window.UI = UI;
window.DragDrop = DragDrop;
window.DATA = DATA;
window.gameState = gameState;