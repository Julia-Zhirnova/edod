// ==========================================
// КЛАСТЕР: Дизайн
// Специальность: 54.01.20 Графический дизайнер
// ==========================================

const clusterDesign = {
    render(area, specCode, diff) {
        const gameArea = document.getElementById('cluster-game-area');
        if (gameArea) gameArea.style.backgroundImage = "url('media/images/cluster-design-bg.jpg')";

        const header = this.getHeader();
        const story = diff === 0 ? 'Нужно создать афишу для фестиваля. С чего начнём?' :
                     diff === 1 ? 'Какой шрифт лучше для длинного текста?' :
                     'Составь техзадание для дизайнера.';
        
        let content = '';
        if (diff === 0) {
            const opts = [
                { text: 'Красный и зелёный', correct: true },
                { text: 'Синий и жёлтый', correct: false },
                { text: 'Красный и оранжевый', correct: false },
                { text: 'Фиолетовый и розовый', correct: false }
            ];
            content = `<h3>🟢 Цветовая гармония</h3><p>Какие цвета комплементарны?</p>` + this.renderShuffledButtons(opts);
        } else if (diff === 1) {
            const opts = [
                { text: 'С засечками (Times New Roman)', correct: true },
                { text: 'Декоративный рукописный', correct: false },
                { text: 'Моноширинный', correct: false },
                { text: 'Жирный гротеск', correct: false }
            ];
            content = `<h3>🟡 Типографика</h3><p>Какой шрифт для длинного текста?</p>` + this.renderShuffledButtons(opts);
        } else {
            content = `
                <h3>🔴 Техзадание на афишу</h3>
                <p>Опиши целевую аудиторию, сообщение и стиль.</p>
                <textarea id="brief-input" rows="4" placeholder="ЦА: ... Сообщение: ... Стиль: ..." style="width:100%; padding:10px; border-radius:8px; background:#222; color:white; border:1px solid #444;"></textarea>
                <button class="btn btn-primary" style="margin-top:15px;" id="check-brief-btn">Проверить</button>
                <p id="brief-feedback"></p>
            `;
        }

        area.innerHTML = header + content;
        this.setReplica(story);
        if (diff < 2) this.bindAnswer(area);
        else this.initTextCheck();
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

    bindAnswer(container) {
        container.querySelectorAll('.game-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.dataset.correct === 'true') {
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

    initTextCheck() {
        document.getElementById('check-brief-btn').onclick = () => {
            const text = document.getElementById('brief-input').value.toLowerCase();
            const hasAudience = text.includes('подростк') || text.includes('школьник') || text.includes('абитуриент');
            const hasMessage = text.includes('фестиваль') || text.includes('професси');
            const hasStyle = text.includes('стиль') || text.includes('современ') || text.includes('ярк');
            if (hasAudience && hasMessage && hasStyle) {
                const spec = gameState.selectedSpecialtyCode;
                if (!gameState.specScores[spec]) gameState.specScores[spec] = 0;
                gameState.specScores[spec] += 3;
                document.getElementById('brief-feedback').innerHTML = '✅ Отлично!';
            } else {
                document.getElementById('brief-feedback').innerHTML = '❌ Укажите ЦА, сообщение и стиль.';
            }
            Cluster.gameSuccess();
        };
    },

    getHint(specCode, diff) {
        const hints = {
            0: { story: 'Комплементарные цвета — противоположные на круге Иттена.', tip: 'Красный и зелёный' },
            1: { story: 'Шрифты с засечками легче читать в длинных текстах.', tip: 'Times New Roman' },
            2: { story: 'ТЗ должно описывать аудиторию, посыл и стиль.', tip: 'ЦА: подростки, сообщение: фестиваль профессий, стиль: современный' }
        };
        return hints[diff];
    }
};

window.clusterDesign = clusterDesign;