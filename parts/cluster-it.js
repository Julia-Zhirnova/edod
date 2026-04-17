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

    renderNetworkAdmin(area, header, diff) {
        const story = diff === 0 ? 'Сервер фестиваля упал! Гости не могут зарегистрироваться. Нужно срочно найти причину.' :
                     diff === 1 ? 'Служба веб-сервера не отвечает. Надо её перезапустить.' :
                     'Чтобы такого больше не повторилось, настрой мониторинг доступности сайта.';
        
        let content = '';
        if (diff === 0) {
            const opts = [
                { text: 'systemctl status nginx', correct: true },
                { text: 'ping 127.0.0.1', correct: false },
                { text: 'ls -la /var/www', correct: false },
                { text: 'netstat -tulpn', correct: false }
            ];
            content = `<h3>🟢 Диагностика сервера</h3><p>Какая команда покажет статус службы веб-сервера?</p>` + this.renderShuffledButtons(opts);
        } else if (diff === 1) {
            const opts = [
                { text: 'systemctl restart nginx', correct: true },
                { text: 'service nginx start', correct: false },
                { text: 'killall nginx', correct: false },
                { text: 'nginx -s reload', correct: false }
            ];
            content = `<h3>🟡 Перезапуск службы</h3><p>Как перезапустить веб-сервер nginx?</p>` + this.renderShuffledButtons(opts);
        } else {
            const opts = [
                { text: 'http_code=$(curl -s -o /dev/null -w "%{http_code}" $URL)', correct: true },
                { text: 'curl $URL > /dev/null', correct: false },
                { text: 'wget --spider $URL', correct: false },
                { text: 'ping -c 1 $URL', correct: false }
            ];
            content = `<h3>🔴 Мониторинг сайта</h3><p>Какая команда проверит HTTP-статус и сохранит его в переменную?</p>` + this.renderShuffledButtons(opts);
        }

        area.innerHTML = header + content;
        this.setReplica(story);
        this.bindAnswer(area);
    },

    renderWebSupport(area, header, diff) {
        const story = diff === 0 ? 'На сайт фестиваля нужно добавить форму обратной связи. Сделаем поле ввода обязательным.' :
                     diff === 1 ? 'Теперь нужно проверить, что email введён корректно, прежде чем отправлять отзыв.' :
                     'Сохрани отзыв в локальном хранилище браузера, чтобы не потерять данные.';
        
        let content = '';
        if (diff === 0) {
            // НОВАЯ МИНИ-ИГРА ВМЕСТО УДАЛЁННОЙ (про обязательный атрибут)
            const opts = [
                { text: 'required', correct: true },
                { text: 'validate', correct: false },
                { text: 'mandatory', correct: false },
                { text: 'check', correct: false }
            ];
            content = `<h3>🟢 Обязательное поле</h3><p>Какой атрибут HTML делает поле ввода обязательным для заполнения?</p>` + this.renderShuffledButtons(opts);
        } else if (diff === 1) {
            const opts = [
                { text: '/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/', correct: true },
                { text: '/.*@.*/', correct: false },
                { text: '/^\\d+@\\d+\\.\\d+$/', correct: false },
                { text: '/[A-Za-z]+@[A-Za-z]+\.[A-Za-z]{2,}/', correct: false }
            ];
            content = `<h3>🟡 Валидация email (JavaScript)</h3><p>Какое регулярное выражение проверит email?</p>` + this.renderShuffledButtons(opts);
        } else {
            const opts = [
                { text: 'localStorage.setItem(\'review\', text)', correct: true },
                { text: 'sessionStorage.save(\'review\', text)', correct: false },
                { text: 'document.cookie = \'review=\'+text', correct: false },
                { text: 'localStorage.save(\'review\', text)', correct: false }
            ];
            content = `<h3>🔴 Сохранение отзыва</h3><p>Какой метод сохранит отзыв в localStorage?</p>` + this.renderShuffledButtons(opts);
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
            const opts = [
                { text: '"SELECT * FROM users WHERE name = \'" + name + "\'"', correct: true },
                { text: '"SELECT * FROM users WHERE name = ?"', correct: false },
                { text: '"SELECT * FROM users WHERE name = $1"', correct: false },
                { text: '"SELECT * FROM users WHERE name = :name"', correct: false }
            ];
            content = `<h3>🟢 SQL-инъекция</h3><p>Какой из запросов уязвим для инъекции?</p>` + this.renderShuffledButtons(opts);
        } else if (diff === 1) {
            const opts = [
                { text: 'mysql -u root -p dbname < backup.sql', correct: true },
                { text: 'mysqldump dbname > backup.sql', correct: false },
                { text: 'pg_restore -d dbname backup.dump', correct: false },
                { text: 'mongoimport --db dbname backup.json', correct: false }
            ];
            content = `<h3>🟡 Восстановление из бэкапа</h3><p>Какая команда восстановит базу MySQL из дампа?</p>` + this.renderShuffledButtons(opts);
        } else {
            const opts = [
                { text: 'iptables -A INPUT -s 192.168.1.100 -j DROP', correct: true },
                { text: 'iptables -A OUTPUT -d 192.168.1.100 -j REJECT', correct: false },
                { text: 'iptables -D INPUT -s 192.168.1.100 -j DROP', correct: false },
                { text: 'iptables -I FORWARD -s 192.168.1.100 -j DROP', correct: false }
            ];
            content = `<h3>🔴 Настройка iptables</h3><p>Какое правило заблокирует IP 192.168.1.100?</p>` + this.renderShuffledButtons(opts);
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

    getHint(specCode, diff) {
        const hints = {
            '09.02.06': {
                0: { story: 'Гагарич вспоминает: когда сервер падает, первым делом смотрим статус службы.', tip: 'Правильная команда: systemctl status nginx' },
                1: { story: 'Перезапуск часто решает проблему, но осторожно на продакшене!', tip: 'systemctl restart nginx' },
                2: { story: 'Нужно выполнить HTTP-запрос и сохранить код ответа. Используй curl с флагами -s -o /dev/null -w.', tip: 'http_code=$(curl -s -o /dev/null -w "%{http_code}" $URL)' }
            },
            '09.02.12': {
                0: { story: 'Атрибут required делает поле обязательным.', tip: 'required' },
                1: { story: 'Валидация email — важный шаг. Гагарич использует простое регулярное выражение.', tip: '/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/' },
                2: { story: 'LocalStorage позволяет сохранить отзыв даже после перезагрузки страницы.', tip: 'localStorage.setItem(\'review\', text)' }
            },
            '10.02.05': {
                0: { story: 'SQL-инъекции возникают из-за конкатенации строк в запросах.', tip: 'Уязвимый запрос: "SELECT ... WHERE name = \'" + name + "\'"' },
                1: { story: 'Восстановление из бэкапа — команда mysql.', tip: 'mysql -u root -p dbname < backup.sql' },
                2: { story: 'iptables — мощный инструмент фильтрации пакетов.', tip: 'iptables -A INPUT -s IP -j DROP' }
            }
        };
        return hints[specCode]?.[diff] || { story: 'Подумай логически.', tip: 'Попробуй ещё раз!' };
    }
};

window.clusterIt = clusterIt;