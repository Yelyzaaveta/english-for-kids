// Shared vocabulary and drawings for the "Where is ...?" block (house/)
// Words come from the textbook, lessons 6–7: rooms, furniture, in / on / under, on the left / right.

const ROOMS = {
  kitchen:  { en: "kitchen",     ua: "кухня",         icon: "🍳", wall: "#3d5a4a" },
  living:   { en: "living room", ua: "вітальня",      icon: "📺", wall: "#5a4a3d" },
  bedroom:  { en: "bedroom",     ua: "спальня",       icon: "🧸", wall: "#4a3d5a" },
  bathroom: { en: "bathroom",    ua: "ванна кімната", icon: "🛁", wall: "#3d4f5a" },
  hall:     { en: "hall",        ua: "коридор",       icon: "🚪", wall: "#4a4a4a" },
};

const FURNITURE = {
  table: { en: "table", ua: "стіл" },
  chair: { en: "chair", ua: "стілець" },
  sofa:  { en: "sofa",  ua: "диван" },
  bed:   { en: "bed",   ua: "ліжко" },
  box:   { en: "box",   ua: "коробка" },
};

const PREPS = { in: "в", on: "на", under: "під" };
// Ukrainian forms for the hints: "під столом", "на столі"
const UA_UNDER = { table: "столом", chair: "стільцем", sofa: "диваном", bed: "ліжком", box: "коробкою" };
const UA_ON_IN = { table: "столі",  chair: "стільці",  sofa: "дивані",  bed: "ліжку",  box: "коробці" };
const UA_ROOM_IN = { kitchen: "на кухні", living: "у вітальні", bedroom: "у спальні", bathroom: "у ванній" };

// Which preposition makes sense with which piece of furniture
const PREPS_FOR = {
  table: ["on", "under"],
  chair: ["on", "under"],
  sofa:  ["on", "under"],
  bed:   ["on", "under"],
  box:   ["in", "on"],
};

// Things that hide in the pictures
const THINGS = {
  ball:  { en: "ball",  ua: "м'яч",       emoji: "⚽" },
  dog:   { en: "dog",   ua: "собака",     emoji: "🐶" },
  cat:   { en: "cat",   ua: "кіт",        emoji: "🐱" },
  teddy: { en: "teddy", ua: "ведмедик",   emoji: "🧸" },
  book:  { en: "book",  ua: "книжка",     emoji: "📕" },
};

// ---- Furniture drawings (viewBox 0 0 200 140, floor at y = 125) ----
const WOOD = "#c98a4b", WOOD_D = "#9a6332";
const FURN_SVG = {
  table: `
    <rect x="46" y="68" width="8" height="57" fill="${WOOD_D}"/>
    <rect x="146" y="68" width="8" height="57" fill="${WOOD_D}"/>
    <rect x="34" y="58" width="132" height="11" rx="3" fill="${WOOD}"/>`,
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
  boxBack: `
    <polygon points="58,80 142,80 156,62 72,62" fill="#a8763e"/>`,
  boxFront: `
    <rect x="58" y="80" width="84" height="45" fill="#d9a35f" opacity=".88"/>
    <polygon points="58,80 40,66 58,66" fill="#c48f4f"/>
    <polygon points="142,80 160,66 142,66" fill="#c48f4f"/>`,
  boxClosed: `
    <rect x="58" y="78" width="84" height="47" fill="#d9a35f"/>
    <rect x="56" y="72" width="88" height="8" fill="#c48f4f"/>
    <line x1="100" y1="72" x2="100" y2="125" stroke="#a8763e" stroke-width="3"/>`,
};

// Where the hiding thing stands: [x, baseline y]
const SPOTS = {
  table: { on: [100, 56], under: [100, 122] },
  chair: { on: [94, 74],  under: [97, 122] },
  sofa:  { on: [100, 72], under: [100, 123] },
  bed:   { on: [120, 60], under: [100, 123] },
  box:   { in: [100, 104], on: [100, 70] },
};

// A small picture: a room wall + one piece of furniture + (optionally) a thing on / in / under it.
// opts: { furn, prep, thing (emoji), room (key of ROOMS), label (bool) }
function sceneSVG({ furn, prep, thing, room, label = false }) {
  const wall = room ? ROOMS[room].wall : "#2a3d5c";
  let body = "";
  const item = () => {
    if (!thing) return "";
    const [x, y] = SPOTS[furn][prep];
    const size = prep === "under" ? 30 : 34;
    return `<text x="${x}" y="${y}" font-size="${size}" text-anchor="middle">${thing}</text>`;
  };
  if (furn === "box") {
    if (prep === "in") body = FURN_SVG.boxBack + item() + FURN_SVG.boxFront;
    else body = FURN_SVG.boxClosed + item();
  } else if (furn) {
    body = FURN_SVG[furn] + item();
  }
  const tag = room && label
    ? `<text x="8" y="22" font-size="17">${ROOMS[room].icon}</text>
       <text x="30" y="20" font-size="13" font-weight="700" fill="#e8eef7" font-family="Rubik, sans-serif">${ROOMS[room].en}</text>`
    : "";
  return `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="125" fill="${wall}"/>
    <rect y="125" width="200" height="15" fill="#1b2638"/>
    ${tag}${body}</svg>`;
}

function sayWhere(prep, furn, room) {
  return `${prep} the ${FURNITURE[furn].en}` + (room ? ` in the ${ROOMS[room].en}` : "");
}

// ---- Floor plan: 3 rooms on the left, the hall in the middle, 3 rooms on the right ----
const PLAN_ROOMS = [
  { id: "kitchen",  en: "kitchen",          the: "the kitchen",     ua: "кухня",           icon: "🍳" },
  { id: "living",   en: "living room",      the: "the living room", ua: "вітальня",        icon: "🛋️" },
  { id: "bathroom", en: "bathroom",         the: "the bathroom",    ua: "ванна кімната",   icon: "🛁" },
  { id: "kate",     en: "Kate's bedroom",   the: "Kate's bedroom",  ua: "спальня Кейт",    icon: "👧" },
  { id: "eddie",    en: "Eddie's bedroom",  the: "Eddie's bedroom", ua: "спальня Едді",    icon: "👦" },
  { id: "granny",   en: "Granny's bedroom", the: "Granny's bedroom", ua: "спальня бабусі",  icon: "👵" },
];
// "the" is not used before a name: "the kitchen", but "Kate's bedroom"
const Cap = s => s[0].toUpperCase() + s.slice(1);
const SIDES = { left: ["on the left", "зліва"], right: ["on the right", "справа"] };
const ROWS = [["at the top", "вгорі"], ["in the middle", "посередині"], ["at the bottom", "внизу"]];

// Random house: returns 6 cells { room, side, row }
function randomHouse() {
  const rooms = shuffle(PLAN_ROOMS);
  return rooms.map((room, i) => ({ room, side: i < 3 ? "left" : "right", row: i % 3 }));
}

function wherePhrase(cell) {
  return `${SIDES[cell.side][0]}, ${ROWS[cell.row][0]}`;
}
function wherePhraseUa(cell) {
  return `${SIDES[cell.side][1]}, ${ROWS[cell.row][1]}`;
}

// Draw the plan into `el`. Each room becomes a <button data-i>.
// showNames: true -> rooms are labelled; false -> rooms show "?"
function renderPlan(el, house, { showNames = true } = {}) {
  el.classList.add("plan");
  const cellHtml = (c, i) => {
    const col = c.side === "left" ? 1 : 3;
    const inner = showNames
      ? `<span class="ri">${c.room.icon}</span><span class="rn">${c.room.en}</span>`
      : `<span class="ri q">?</span><span class="rn"></span>`;
    return `<button class="room" data-i="${i}" style="grid-column:${col};grid-row:${c.row + 1}">${inner}</button>`;
  };
  el.innerHTML = house.map(cellHtml).join("") +
    `<div class="hallway"><span class="ri">🚪</span><span class="rn">hall</span></div>`;
}

function revealRoom(btn, cell) {
  btn.innerHTML = `<span class="ri">${cell.room.icon}</span><span class="rn">${cell.room.en}</span>`;
}
