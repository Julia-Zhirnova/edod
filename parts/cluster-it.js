// ==========================================
// КЛАСТЕР: IT & Кибербез
// Специальности: 09.02.06, 09.02.12, 10.02.05
// ==========================================

const clusterIt = {
    render(area, specCode, diff) {
        const gameArea = document.getElementById('cluster-game-area');
        if (gameArea) gameArea.style.backgroundImage = "url('media/images/cluster-it-bg.jpg')";

        const header = this.getHeader();
        
        if (specCode === '09.02.06') {
            this.renderNetworkAdmin(area, header, diff);
        } else if (specCode === '09.02.12') {
            this.renderWebSupport(area, header, diff);
        } else if (specCode === '10.02.05') {
            this.renderSecurity(area, header, diff);
        }
    },

    getHeader() {
        return `<div style="display:flex; align-items:center; gap:10px; margin-bottom:15px;">
            <img src="media/images/npc-gagarich.png" style="width:40px; height:40px; border-radius:50%; border:2px solid var(--primary);" onerror="this.src='data:image/svg+xml,...'">
            <span style="color:var(--primary); font-weight:bold;">Гагарич:</span>
            <span id="gagarich-replica" style="color:var(--text-dim);"></span>
        </div>`;
    },

    setReplica(text) {
        const el = document.getElementById('gagarich-replica');
        if (el) el.textContent = text;
    },

    wrapStory(story) {
        return `<div style="margin-bottom:20px;"><p style="color:var(--text-dim);"><strong>📖</strong> ${story}</p></div>`;
    },

    renderNetworkAdmin(area, header, diff) {
        const story = diff === 0 ? 'Сервер фестиваля упал! Гости не могут зарегистрироваться. Нужно срочно найти причину.' :
                     diff === 1 ? 'Служба веб-сервера не отвечает. Надо её перезапустить.' :
                     'Чтобы такого больше не повторилось, настрой мониторинг доступности сайта.';
        
        let content = '';
        if (diff === 0) {
            content = `
                ${this.wrapStory(story)}
                <h3>🟢 Диагностика сервера</h3>
                <p>Какая команда покажет статус службы веб-сервера?</p>
                <button class="game-btn" data-correct="true">systemctl status nginx</button>
                <button class="game-btn">ping 127.0.0.1</button>
                <button class="game-btn">ls -la /var/www</button>
                <button class="game-btn">netstat -tulpn</button>
            `;
        } else if (diff === 1) {
            content = `
                ${this.wrapStory(story)}
                <h3>🟡 Перезапуск службы</h3>
                <p>Как перезапустить веб-сервер nginx?</p>
                <button class="game-btn" data-correct="true">systemctl restart nginx</button>
                <button class="game-btn">service nginx start</button>
                <button class="game-btn">killall nginx</button>
                <button class="game-btn">nginx -s reload</button>
            `;
        } else {
            content = `
                ${this.wrapStory(story)}
                <h3>🔴 Допиши недостающую строку в скрипте</h3>
                <p>Скрипт проверки доступности сайта. Вставь пропущенную строку, которая выполняет HTTP-запрос.</p>
                <pre style="background:#1e1e1e; color:#d4d4d4; padding:15px; border-radius:8px; overflow-x:auto; font-family:monospace; font-size:14px; text-align:left;">
#!/bin/bash
URL="http://festival.local"

# --- Вставь недостающую строку ниже ---
<span id="code-placeholder" style="background:#2d2d2d; display:inline-block; width:100%; padding:4px 0;">&nbsp;</span>
# --- Конец вставки ---

if [ $? -eq 0 ] && [ "$http_code" -eq 200 ]; then
    echo "OK"
else
    echo "FAIL"
fi
                </pre>
                <input type="text" id="code-input" placeholder="Введи недостающую строку" style="width:100%; padding:12px; border-radius:8px; background:#222; color:white; border:1px solid #444; margin-top:15px;">
                <button class="btn btn-primary" style="margin-top:15px;" id="check-code-btn">Проверить</button>
                <p id="code-feedback"></p>
            `;
        }

        area.innerHTML = header + content;
        this.setReplica(story);
        if (diff < 2) this.bindAnswer(area);
        else this.initCodeCheck();
    },

    renderWebSupport(area, header, diff) {
        const story = diff === 0 ? 'На сайт фестиваля нужно добавить форму обратной связи, чтобы гости могли оставить отзыв.' :
                     diff === 1 ? 'Теперь нужно проверить, что email введён корректно, прежде чем отправлять отзыв.' :
                     'Сохрани отзыв в локальном хранилище браузера, чтобы не потерять данные.';
        
        let content = '';
        if (diff === 0) {
            content = `
                ${this.wrapStory(story)}
                <h3>🟢 HTML-форма отзыва</h3>
                <p>Какой тег создаёт поле для ввода email?</p>
                <button class="game-btn" data-correct="true">&lt;input type="email"&gt;</button>
                <button class="game-btn">&lt;input type="text"&gt;</button>
                <button class="game-btn">&lt;textarea&gt;</button>
                <button class="game-btn">&lt;form&gt;</button>
            `;
        } else if (diff === 1) {
            content = `
                ${this.wrapStory(story)}
                <h3>🟡 Валидация email (JavaScript)</h3>
                <p>Какое регулярное выражение проверит email?</p>
                <button class="game-btn" data-correct="true">/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/</button>
                <button class="game-btn">/.*@.*/</button>
                <button class="game-btn">/^\\d+@\\d+\\.\\d+$/</button>
                <button class="game-btn">/[A-Za-z]+@[A-Za-z]+\\.[A-Za-z]{2,}/</button>
            `;
        } else {
            content = `
                ${this.wrapStory(story)}
                <h3>🔴 Сохранение отзыва</h3>
                <p>Какой метод сохранит отзыв в localStorage?</p>
                <button class="game-btn" data-correct="true">localStorage.setItem('review', text)</button>
                <button class="game-btn">sessionStorage.save('review', text)</button>
                <button class="game-btn">document.cookie = 'review='+text</button>
                <button class="game-btn">localStorage.save('review', text)</button>
            `;
        }

        area.innerHTML = header + content;
        this.setReplica(story);
        this.bindAnswer(area);
    },

    renderSecurity(area, header, diff) {
        const story = diff === 0 ? 'База данных участников фестиваля взломана! Злоумышленники получили доступ к личным данным. Найди уязвимость в SQL-запросе.' :
                     diff === 1 ? 'Данные повреждены. Нужно восстановить их из резервной копии.' :
                     'Настрой файрвол, чтобы заблокировать атакующего и предотвратить новые атаки.';
        
        let content = '';
        if (diff === 0) {
            content = `
                ${this.wrapStory(story)}
                <h3>🟢 SQL-инъекция</h3>
                <p>Какой из запросов уязвим для инъекции?</p>
                <button class="game-btn" data-correct="true">"SELECT * FROM users WHERE name = '" + name + "'"</button>
                <button class="game-btn">"SELECT * FROM users WHERE name = ?"</button>
                <button class="game-btn">"SELECT * FROM users WHERE name = $1"</button>
                <button class="game-btn">"SELECT * FROM users WHERE name = :name"</button>
            `;
        } else if (diff === 1) {
            content = `
                ${this.wrapStory(story)}
                <h3>🟡 Восстановление из бэкапа</h3>
                <p>Какая команда восстановит базу MySQL из дампа?</p>
                <button class="game-btn" data-correct="true">mysql -u root -p dbname < backup.sql</button>
                <button class="game-btn">mysqldump dbname > backup.sql</button>
                <button class="game-btn">pg_restore -d dbname backup.dump</button>
                <button class="game-btn">mongoimport --db dbname backup.json</button>
            `;
        } else {
            content = `
                ${this.wrapStory(story)}
                <h3>🔴 Настройка iptables</h3>
                <p>Какое правило заблокирует IP 192.168.1.100?</p>
                <button class="game-btn" data-correct="true">iptables -A INPUT -s 192.168.1.100 -j DROP</button>
                <button class="game-btn">iptables -A OUTPUT -d 192.168.1.100 -j REJECT</button>
                <button class="game-btn">iptables -D INPUT -s 192.168.1.100 -j DROP</button>
                <button class="game-btn">iptables -I FORWARD -s 192.168.1.100 -j DROP</button>
            `;
        }

        area.innerHTML = header + content;
        this.setReplica(story);
        this.bindAnswer(area);
    },

    bindAnswer(container) {
        container.querySelectorAll('.game-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const isCorrect = btn.dataset.correct === 'true';
                if (isCorrect) {
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

    initCodeCheck() {
        const expected = 'http_code=$(curl -s -o /dev/null -w "%{http_code}" $URL)';
        document.getElementById('check-code-btn').onclick = () => {
            const input = document.getElementById('code-input').value.trim();
            const fb = document.getElementById('code-feedback');
            if (input === expected || input === 'http_code=$(curl -s -o /dev/null -w "%{http_code}" $URL)') {
                fb.innerHTML = '✅ Правильно!';
                const spec = gameState.selectedSpecialtyCode;
                if (!gameState.specScores[spec]) gameState.specScores[spec] = 0;
                gameState.specScores[spec] += 3;
                Cluster.gameSuccess();
            } else {
                fb.innerHTML = `❌ Неверно. Ожидалось: ${expected}`;
                Cluster.gameSuccess();
            }
        };
    },

    getHint(specCode, diff) {
        const hints = {
            '09.02.06': {
                0: { story: 'Гагарич вспоминает: когда сервер падает, первым делом смотрим статус службы.', tip: 'Правильная команда: systemctl status nginx' },
                1: { story: 'Перезапуск часто решает проблему, но осторожно на продакшене!', tip: 'systemctl restart nginx' },
                2: { story: 'Нужно выполнить HTTP-запрос и сохранить код ответа. Используй curl с флагами -s -o /dev/null -w.', tip: 'http_code=$(curl -s -o /dev/null -w "%{http_code}" $URL)' }
            },
            '09.02.12': {
                0: { story: 'Форма отзыва начинается с правильного поля ввода.', tip: 'Используй <input type="email">' },
                1: { story: 'Валидация email — важный шаг. Гагарич использует простое регулярное выражение.', tip: '/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/' },
                2: { story: 'LocalStorage позволяет сохранить отзыв даже после перезагрузки страницы.', tip: 'localStorage.setItem(\'review\', text)' }
            },
            '10.02.05': {
                0: { story: 'SQL-инъекции возникают из-за конкатенации строк в запросах.', tip: 'Уязвимый запрос: "SELECT ... WHERE name = \'" + name + "\'"' },
                1: { story: 'Восстановление из бэкапа — команда mysql.', tip: 'mysql -u root -p dbname < backup.sql' },
                2: { story: 'iptables — мощный инструмент фильтрации пакетов.', tip: 'iptables -A INPUT -s IP -j DROP' }
            }
        };
        return hints[specCode][diff] || { story: 'Подумай логически.', tip: 'Попробуй ещё раз!' };
    }
};

window.clusterIt = clusterIt;