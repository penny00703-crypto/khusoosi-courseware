/* ============================================================
 * 复习页模板引擎 · 所有正价课通用，不需要按课修改
 * 依赖：index.html 里的固定 id + data.js 里的 LESSON 对象
 * ============================================================ */
(function () {
  const A = '../assets/';                 // 素材根路径（复用正价课）
  const player = document.getElementById('player');
  const state = { firstTry: 0, quizTotal: 0, stations: [false, false, false, false] };

  /* ---------- 数据上报（模板级，所有课通用） ---------- */
  const SB_URL = 'https://awogcxsegaamenwnjsmg.supabase.co';
  const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3b2djeHNlZ2FhbWVud25qc21nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkxMDU5MzMsImV4cCI6MjEwNDY4MTkzM30.rfHrkaTFsOMkhUiC66lY5z4FyLuwYFch-5ZNyywgnDA';
  function report(name, stars) {
    fetch(SB_URL + '/rest/v1/review_records', {
      method: 'POST',
      headers: { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY,
                 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify({
        student_name: name,
        book: LESSON.book, unit: LESSON.unit, lesson: LESSON.lesson,
        stars, first_try: state.firstTry, quiz_total: state.quizTotal
      })
    }).then(r => {
      const el = document.getElementById('report-status');
      if (el) el.textContent = r.ok ? 'أُرسل إلى معلمتك!' : 'لم يُرسل، جرّبي لاحقًا';
    }).catch(() => {
      const el = document.getElementById('report-status');
      if (el) el.textContent = 'لم يُرسل، جرّبي لاحقًا';
    });
  }

  /* ---------- 音频总线 ---------- */
  function play(file, onend) {
    player.src = A + file;
    player.onended = onend || null;
    player.play().catch(() => {});
  }
  function sfx(name) {                     // 轻量音效不抢主音频
    const a = new Audio(A + name);
    a.play().catch(() => {});
  }

  /* ---------- 头部 / 首页 ---------- */
  document.getElementById('hd-lesson').textContent =
    `${LESSON.book} · ${LESSON.unit} · ${LESSON.lesson}`;
  document.getElementById('hero-title').textContent = LESSON.title;
  document.getElementById('hero-char').src = A + LESSON.heroChar;

  /* ---------- 完成判定 ---------- */
  function stationDone(i) {
    state.stations[i] = true;
    document.getElementById('st' + (i + 1)).classList.add('done');
    if (state.stations.every(Boolean)) setTimeout(showFinal, 500);
  }

  /* ========== 关卡1：单词听读卡 ========== */
  const playedWords = new Set();
  const wordRow = document.getElementById('word-row');
  LESSON.words.forEach((w, i) => {
    const card = document.createElement('div');
    card.className = 'word-card';
    card.innerHTML =
      `<img src="${A + w.img}" alt=""><div class="wen en">${w.en}</div>` +
      `<div class="war">${w.ar}</div><div class="play-ic">PLAY</div>`;
    card.onclick = () => {
      play(w.audio);
      card.classList.add('played');
      playedWords.add(i);
      if (playedWords.size === LESSON.words.length)
        document.getElementById('st1-done').disabled = false;
    };
    wordRow.appendChild(card);
  });
  document.getElementById('st1-done').onclick = () => { sfx('sfx_success.mp3'); stationDone(0); };

  /* ========== 通用选择测验（关卡2/4 复用） ========== */
  function runQuiz(cfg) {
    let round = 0, locked = false, firstAttempt = true;
    const roundEl = document.getElementById(cfg.roundId);
    const optsEl  = document.getElementById(cfg.optsId);
    const hearBtn = document.getElementById(cfg.hearId);

    function render() {
      const q = cfg.items[round];
      roundEl.textContent = `السؤال ${round + 1} / ${cfg.items.length}`;
      hearBtn.onclick = () => play(q.audio);
      optsEl.innerHTML = '';
      optsEl.dataset.answer = q.answer;    // QA 自检用
      locked = false;
      firstAttempt = true;
      q.options.forEach((txt, idx) => {
        const b = document.createElement('button');
        b.className = 'opt en';
        b.textContent = txt;
        b.onclick = () => {
          if (locked) return;
          if (idx === q.answer) {
            locked = true;
            b.classList.add('correct');
            sfx('sfx_correct.mp3');
            if (firstAttempt) state.firstTry++;
            setTimeout(next, 900);
          } else {
            firstAttempt = false;
            b.classList.add('wrong');
            sfx('sfx_wrong.mp3');
            setTimeout(() => b.classList.remove('wrong'), 400);
          }
        };
        optsEl.appendChild(b);
      });
      play(q.audio);                       // 进入每轮自动播一次
    }
    function next() {
      round++;
      if (round < cfg.items.length) render();
      else stationDone(cfg.stationIdx);
    }
    state.quizTotal += cfg.items.length;
    render();
  }

  runQuiz({                                // 关卡2：听音选词
    items: LESSON.listenQuiz, stationIdx: 1,
    roundId: 'st2-round', optsId: 'st2-opts', hearId: 'st2-hear'
  });

  /* ========== 关卡3：对话跟读 ========== */
  const playedLines = new Set();
  let heardAll = false;
  const dlgBox = document.getElementById('dlg-lines');
  document.getElementById('dlg-img').src = A + LESSON.dialogue.img;
  LESSON.dialogue.lines.forEach((l, i) => {
    const row = document.createElement('div');
    row.className = 'dline';
    row.innerHTML = `<span class="dic">PLAY</span><span class="dtxt en">${l.en}</span>`;
    row.onclick = () => {
      play(l.audio);
      row.classList.add('played');
      playedLines.add(i);
      checkDlg();
    };
    dlgBox.appendChild(row);
  });
  document.getElementById('dlg-all').onclick = () => {
    const seq = LESSON.dialogue.lines.map(l => l.audio);
    let k = 0;
    (function step() {
      if (k >= seq.length) { heardAll = true; checkDlg(); return; }
      play(seq[k++], step);
    })();
  };
  function checkDlg() {
    if (playedLines.size === LESSON.dialogue.lines.length && heardAll)
      document.getElementById('st3-done').disabled = false;
  }
  document.getElementById('st3-done').onclick = () => { sfx('sfx_success.mp3'); stationDone(2); };

  /* ========== 关卡4：考试接口 ========== */
  runQuiz({
    items: LESSON.examQuiz.map(q => ({ audio: q.audio, options: q.options, answer: q.answer })),
    stationIdx: 3,
    roundId: 'st4-round', optsId: 'st4-opts', hearId: 'st4-hear'
  });

  /* ========== 结算页 ========== */
  function showFinal() {
    const ratio = state.firstTry / state.quizTotal;
    const n = ratio >= 0.8 ? 3 : ratio >= 0.6 ? 2 : 1;
    document.getElementById('stars').innerHTML =
      [1, 2, 3].map(i => `<span class="${i <= n ? '' : 'dim'}">●</span>`).join('');
    const msg = {
      3: 'مذهل! أنت نجم اليوم 🌟',
      2: 'أحسنت! استمع للكلمات مرة أخرى وستتقنها 💪',
      1: 'بداية جيدة! العب مرة أخرى وستتحسّن 🌱'
    }[n];
    document.getElementById('final-msg').innerHTML = msg;
    document.getElementById('final-score').textContent =
      `الأسئلة الصحيحة من أول مرة: ${state.firstTry} / ${state.quizTotal}`;
    const fc = document.getElementById('final-card');
    fc.classList.add('show');
    sfx('sfx_success.mp3');
    fc.scrollIntoView({ behavior: location.search.includes('selftest=1') ? 'auto' : 'smooth' });

    /* 自动上报：已存名字直接静默上报；首次完成让学生填一次名字 */
    const saved = localStorage.getItem('khusoosi_name');
    if (saved) {
      report(saved, n);
    } else {
      document.getElementById('name-row').style.display = 'flex';
      const input = document.getElementById('name-input');
      document.getElementById('name-btn').onclick = () => {
        const v = input.value.trim();
        if (!v) { input.focus(); return; }
        localStorage.setItem('khusoosi_name', v);
        document.getElementById('name-row').style.display = 'none';
        report(v, n);
      };
    }
  }

  /* ========== QA 自检模式（?selftest=1，仅验收用） ========== */
  if (location.search.includes('selftest=1')) {
    const iv = setInterval(() => {
      document.querySelectorAll('.word-card:not(.played)').forEach(c => c.click());
      const b1 = document.getElementById('st1-done');
      if (!b1.disabled && !state.stations[0]) b1.click();
      document.querySelectorAll('.dline:not(.played)').forEach(r => r.click());
      heardAll = true; checkDlg();
      const b3 = document.getElementById('st3-done');
      if (!b3.disabled && !state.stations[2]) b3.click();
      ['st2-opts', 'st4-opts'].forEach(id => {
        const box = document.getElementById(id);
        if (box && !box.querySelector('.correct')) {
          const idx = +box.dataset.answer;
          if (box.children[idx]) box.children[idx].click();
        }
      });
      const nr = document.getElementById('name-row');
      if (nr && nr.style.display !== 'none' && document.getElementById('name-btn').onclick) {
        document.getElementById('name-input').value = 'QA-自检';
        document.getElementById('name-btn').click();
      }
    }, 500);
    setTimeout(() => clearInterval(iv), 20000);
  }
})();
