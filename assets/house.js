// Shared code for the "Where is ...?" block (house/), 3rd grade.
// Photos live in assets/house/. Every game uses heartsGame(): a wrong answer takes a heart
// and the game moves on to the next question.

const IMG = "../assets/house/";

// ---------- Places ----------
const PLACES = {
  kitchen:  { en: "kitchen",     ua: "кухня",         img: "kitchen.jpg",     at: "in the kitchen" },
  bathroom: { en: "bathroom",    ua: "ванна кімната", img: "bathroom.jpg",    at: "in the bathroom" },
  bedroom:  { en: "bedroom",     ua: "спальня",       img: "bedroom.jpg",     at: "in the bedroom" },
  living:   { en: "living room", ua: "вітальня",      img: "living-room.jpg", at: "in the living room" },
  house:    { en: "house",       ua: "будинок, дім",  img: "house.jpg",       at: "at home" },
  camp:     { en: "camp",        ua: "табір",         img: "camp.jpg",        at: "at the camp" },
  village:  { en: "village",     ua: "село",          img: "village.jpg",     at: "in the village" },
};
const ROOM_KEYS = ["kitchen", "bathroom", "bedroom", "living"];

const PEOPLE = [
  { name: "Bill",   pro: "He",  emoji: "👦" },
  { name: "Mum",    pro: "She", emoji: "👩" },
  { name: "Kate",   pro: "She", emoji: "👧" },
  { name: "Dad",    pro: "He",  emoji: "👨" },
  { name: "Granny", pro: "She", emoji: "👵" },
  { name: "Tom",    pro: "He",  emoji: "🧒" },
  { name: "Ann",    pro: "She", emoji: "👱‍♀️" },
  { name: "Max",    pro: "He",  emoji: "👱" },
];

// ---------- New words ----------
const WORDS = [
  { en: "kitchen",     ua: "кухня",         img: "kitchen.jpg" },
  { en: "bathroom",    ua: "ванна кімната", img: "bathroom.jpg" },
  { en: "bedroom",     ua: "спальня",       img: "bedroom.jpg" },
  { en: "living room", ua: "вітальня",      img: "living-room.jpg" },
  { en: "house",       ua: "будинок",       img: "house.jpg" },
  { en: "sofa",        ua: "диван",         img: "sofa.jpg" },
  { en: "armchair",    ua: "крісло",        img: "armchair.jpg" },
  { en: "carpet",      ua: "килим",         img: "carpet.jpg" },
  { en: "floor",       ua: "підлога",       img: "floor.jpg" },
  { en: "chair",       ua: "стілець",       emoji: "🪑" },
  { en: "teacher",     ua: "вчитель",       emoji: "🧑‍🏫" },
  { en: "computer",    ua: "комп'ютер",     emoji: "💻" },
  { en: "screen",      ua: "екран",         emoji: "📺" },
  { en: "music",       ua: "музика",        emoji: "🎵" },
  { en: "new",         ua: "новий",         emoji: "🆕" },
  { en: "three",       ua: "три",           emoji: "3️⃣" },
  { en: "thank you",   ua: "дякую",         emoji: "🙏" },
];
const EXTRA_WORDS = [
  { en: "camp",    ua: "табір", img: "camp.jpg" },
  { en: "village", ua: "село",  img: "village.jpg" },
];
// Photos from the workbook (things in places) - used by the typing / memory / build-the-word games
const THINGS = [
  { en: "cat",       ua: "кіт",         img: "wb-cat.jpg" },
  { en: "dog",       ua: "собака",      img: "wb-dog.jpg" },
  { en: "bike",      ua: "велосипед",   img: "wb-bike.jpg" },
  { en: "balls",     ua: "м'ячі",       img: "wb-balls.jpg" },
  { en: "books",     ua: "книги",       img: "wb-books.jpg" },
  { en: "caps",      ua: "кепки",       img: "wb-caps.jpg" },
  { en: "pens",      ua: "ручки",       img: "wb-pens.jpg" },
  { en: "cows",      ua: "корови",      img: "wb-cows.jpg" },
  { en: "quad bike", ua: "квадроцикл",  img: "wb-quad.jpg" },
];
// Pictures that show more than one word (the living room photo has a sofa, a carpet and a chair...).
// Such words are never offered together, so there is always exactly one right answer.
const CLASH = {
  "living room": ["sofa", "carpet", "chair", "armchair", "floor"],
  kitchen: ["chair", "carpet", "floor"],
  bedroom: ["carpet", "floor"],
  armchair: ["carpet", "floor"],
  carpet: ["floor"],
  sofa: ["floor"],
  computer: ["screen"],
};
function clash(a, b) {
  return (CLASH[a.en] || []).includes(b.en) || (CLASH[b.en] || []).includes(a.en);
}
// target + n distractors that do not clash with the target, shuffled
function optionsFor(target, pool, n = 3) {
  const others = shuffle(pool.filter(w => w !== target && !clash(w, target))).slice(0, n);
  return shuffle([target, ...others]);
}

// Picture of a word: a photo or a big emoji
function wordPic(w, cls = "") {
  return w.img
    ? `<img class="${cls}${w.img.startsWith("wb-") ? " fit" : ""}" src="${IMG}${w.img}" alt="">`
    : `<span class="emo ${cls}">${w.emoji}</span>`;
}

// Random order with no item twice in a row; length n (repeats allowed when n > list length)
function rounds(list, n) {
  let out = [];
  while (out.length < n) {
    let part = shuffle(list);
    if (out.length && part[0] === out[out.length - 1]) part.push(part.shift());
    out = out.concat(part);
  }
  return out.slice(0, n);
}

// ---------- Hearts game engine ----------
// heartsGame({ hearts, makeRounds() -> array, render(round, g, index) })
// Inside render call g.right(msg, say) / g.wrong(msg, say) for a one-answer question,
// or g.right(..., {stay: true}) / g.wrong(..., {stay: true}) + g.done() for a multi-step task.
function heartsGame({ hearts = 3, makeRounds, render }) {
  const hud = document.getElementById("hud");
  hud.innerHTML = `<div class="progress"><div></div></div><div class="hearts" aria-label="hearts"></div>`;
  const bar = hud.querySelector(".progress > div");
  const heartsEl = hud.querySelector(".hearts");
  const ex = document.getElementById("explain");
  let list, i, lives, score, tries, busy, timer;

  function drawHearts(broken) {
    heartsEl.innerHTML = Array.from({ length: hearts }, (_, k) =>
      `<span class="${k < lives ? "" : "lost"}${k === lives && broken ? " breaking" : ""}">❤️</span>`).join("");
  }
  function start() {
    clearTimeout(timer);
    document.querySelector(".result")?.classList.remove("show");
    list = makeRounds();
    i = 0; lives = hearts; score = 0; tries = 0;
    drawHearts();
    bar.style.width = "0%";
    show();
  }
  function show() {
    busy = false;
    ex.innerHTML = "&nbsp;";
    render(list[i], g, i);
  }
  function next(delay) {
    busy = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      i++;
      bar.style.width = (i / list.length * 100) + "%";
      if (lives <= 0) gameOver();
      else if (i >= list.length) showResult({ score, total: tries, onAgain: start, extra: `❤️ × ${lives}` });
      else show();
    }, delay);
  }
  function gameOver() {
    let box = document.querySelector(".result");
    if (!box) { box = document.createElement("div"); box.className = "result"; document.body.appendChild(box); }
    box.innerHTML = `<div class="box">
        <div class="stars">💔</div>
        <h2>Oops!</h2>
        <p>Сердечка закінчились.<br>✅ ${score} правильних. Спробуй ще раз!</p>
        <button class="btn green" id="again">Try again</button>
      </div>`;
    box.classList.add("show");
    box.querySelector("#again").addEventListener("click", start);
  }
  const g = {
    get busy() { return busy; },
    right(msg, say, { stay = false } = {}) {
      if (busy) return;
      score++; tries++;
      ex.innerHTML = `<span class="ok">✅ ${msg}</span>`;
      if (say) speak(say);
      if (!stay) next(1600);
    },
    wrong(msg, say, { stay = false } = {}) {
      if (busy) return;
      tries++; lives--;
      drawHearts(true);
      ex.innerHTML = `<span class="bad">❌</span> ${msg}`;
      if (say) speak(say);
      if (lives <= 0) { next(2600); return; }
      if (!stay) next(3000);
    },
    done(delay = 1400) { if (!busy) next(delay); },
  };
  document.getElementById("restart")?.addEventListener("click", start);
  start();
  return g;
}

// ---------- Matching board: tap a left item, then its pair on the right ----------
// pairs: [{ left: html, right: html, msg, say }]
function matchBoard(el, pairs, g, { leftCls = "", rightCls = "" } = {}) {
  const rightOrder = shuffle(pairs.map((_, k) => k));
  el.className = "match";
  el.innerHTML = `<svg class="lines"></svg>
    <div class="col">${pairs.map((p, k) => `<button class="mi ${leftCls}" data-side="l" data-k="${k}">${p.left}</button>`).join("")}</div>
    <div class="col">${rightOrder.map(k => `<button class="mi ${rightCls}" data-side="r" data-k="${k}">${pairs[k].right}</button>`).join("")}</div>`;
  const svg = el.querySelector(".lines");
  const links = []; // [k, ok]
  let sel = null;

  const btn = (side, k) => el.querySelector(`[data-side="${side}"][data-k="${k}"]`);
  function drawLines() {
    const box = el.getBoundingClientRect();
    svg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
    svg.innerHTML = links.map(([k, ok]) => {
      const a = btn("l", k).getBoundingClientRect(), b = btn("r", k).getBoundingClientRect();
      const x1 = a.right - box.left, y1 = a.top + a.height / 2 - box.top;
      const x2 = b.left - box.left, y2 = b.top + b.height / 2 - box.top;
      const c = ok ? "var(--green)" : "var(--red)";
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="4" stroke-linecap="round"/>
              <circle cx="${x1}" cy="${y1}" r="6" fill="${c}"/><circle cx="${x2}" cy="${y2}" r="6" fill="${c}"/>`;
    }).join("");
  }
  function link(k, ok) {
    links.push([k, ok]);
    ["l", "r"].forEach(s => { const b = btn(s, k); b.disabled = true; b.classList.add(ok ? "right" : "fixed"); });
    drawLines();
  }
  el.querySelectorAll(".mi").forEach(b => b.addEventListener("click", () => {
    if (g.busy || b.disabled) return;
    if (!sel || sel.dataset.side === b.dataset.side) {
      sel?.classList.remove("sel");
      sel = b; b.classList.add("sel");
      return;
    }
    const l = sel.dataset.side === "l" ? sel : b, r = sel.dataset.side === "l" ? b : sel;
    sel.classList.remove("sel"); sel = null;
    const k = +l.dataset.k, p = pairs[k];
    if (+r.dataset.k === k) {
      link(k, true);
      g.right(p.msg, p.say, { stay: true });
    } else {
      flash(r, "shake");
      link(k, false); // show the right pair for the chosen left item
      g.wrong(`Правильно: <b>${p.msg}</b>`, p.say, { stay: true });
    }
    if (links.length === pairs.length) g.done(2200);
  }));
  const onResize = () => el.isConnected ? drawLines() : removeEventListener("resize", onResize);
  addEventListener("resize", onResize);
}

// ---------- In / on / under pictures (viewBox 0 0 200 140, floor at y = 125) ----------
const WOOD = "#c98a4b", WOOD_D = "#9a6332";
const FURN_SVG = {
  chair: `
    <rect x="66" y="84" width="7" height="41" fill="${WOOD_D}"/>
    <rect x="122" y="84" width="7" height="41" fill="${WOOD_D}"/>
    <rect x="122" y="22" width="9" height="64" rx="3" fill="${WOOD_D}"/>
    <rect x="60" y="76" width="74" height="9" rx="3" fill="${WOOD}"/>`,
  sofa: `
    <rect x="40" y="90" width="7" height="35" fill="#555"/>
    <rect x="153" y="90" width="7" height="35" fill="#555"/>
    <rect x="34" y="42" width="132" height="38" rx="12" fill="#3fa9f5"/>
    <rect x="34" y="72" width="132" height="19" rx="6" fill="#2e8fd8"/>
    <rect x="22" y="56" width="20" height="36" rx="8" fill="#2378bd"/>
    <rect x="158" y="56" width="20" height="36" rx="8" fill="#2378bd"/>`,
  bed: `
    <rect x="30" y="82" width="7" height="43" fill="${WOOD_D}"/>
    <rect x="165" y="82" width="7" height="43" fill="${WOOD_D}"/>
    <rect x="16" y="30" width="12" height="95" rx="4" fill="${WOOD}"/>
    <rect x="172" y="54" width="11" height="71" rx="4" fill="${WOOD}"/>
    <rect x="26" y="74" width="148" height="9" fill="${WOOD_D}"/>
    <rect x="26" y="62" width="148" height="13" rx="3" fill="#f1f1f1"/>
    <ellipse cx="50" cy="59" rx="17" ry="7" fill="#ff7eb6"/>
    <rect x="78" y="58" width="96" height="18" rx="3" fill="#3ddc84"/>`,
  carpet: `
    <polygon points="30,124 170,124 188,138 12,138" fill="#c0392b"/>
    <polygon points="40,126 160,126 172,136 28,136" fill="none" stroke="#f5c96a" stroke-width="2"/>`,
  boxBack: `<polygon points="58,80 142,80 156,62 72,62" fill="#a8763e"/>`,
  boxFront: `
    <rect x="58" y="80" width="84" height="45" fill="#d9a35f" opacity=".9"/>
    <polygon points="58,80 40,66 58,66" fill="#c48f4f"/>
    <polygon points="142,80 160,66 142,66" fill="#c48f4f"/>`,
  boxClosed: `
    <rect x="58" y="78" width="84" height="47" fill="#d9a35f"/>
    <rect x="56" y="72" width="88" height="8" fill="#c48f4f"/>
    <line x1="100" y1="72" x2="100" y2="125" stroke="#a8763e" stroke-width="3"/>`,
};
// where the animal stands: [x, baseline y]
const SPOTS = {
  chair:  { on: [94, 74],  under: [97, 122] },
  sofa:   { on: [100, 72], under: [100, 123] },
  bed:    { on: [120, 60], under: [100, 123] },
  carpet: { on: [100, 133] },
  box:    { in: [100, 104], on: [100, 70] },
};
const ANIMALS = { cat: "🐱", dog: "🐶" };

function sceneSVG({ furn, prep, animal }) {
  const [x, y] = SPOTS[furn][prep];
  const thing = `<text x="${x}" y="${y}" font-size="${prep === "under" ? 30 : 34}" text-anchor="middle">${ANIMALS[animal]}</text>`;
  let body;
  if (furn === "box") body = prep === "in" ? FURN_SVG.boxBack + thing + FURN_SVG.boxFront : FURN_SVG.boxClosed + thing;
  else body = FURN_SVG[furn] + thing;
  return `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="125" fill="#2a3d5c"/>
    <rect y="125" width="200" height="15" fill="#1b2638"/>
    ${body}</svg>`;
}
// all possible pictures: { animal, prep, furn }
const SCENES = [];
for (const animal of Object.keys(ANIMALS))
  for (const furn of Object.keys(SPOTS))
    for (const prep of Object.keys(SPOTS[furn])) SCENES.push({ animal, prep, furn });
const sceneText = s => `The ${s.animal} is ${s.prep} the ${s.furn}.`;

// every word of the topic, with a picture
const ALL_WORDS = [...WORDS, ...EXTRA_WORDS, ...THINGS];
