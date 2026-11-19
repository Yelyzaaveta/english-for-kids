// Shared data for the "Parts of the Body" block (body/), 5th grade.
// Every word has a picture (emoji or a small inline SVG, stored in `emoji` so house.js wordPic() works),
// a Ukrainian translation and `gap` - the 1-2 letters that are hidden in the "missing letter" tasks.

const SKIN = "#f6c89f", SKIN_D = "#d99a68", HAIR = "#6b4226", RING = "#ff5a5f";
const svg = (inner, box = "0 0 100 100") => `<svg viewBox="${box}" width="1em" height="1em" aria-hidden="true">${inner}</svg>`;

// A kid with one part circled
function kidSVG(ring) {
  const rings = {
    head: `<circle cx="50" cy="17" r="19"/>`,
    knee: `<circle cx="43" cy="72" r="9"/>`,
  };
  return svg(`
    <line x1="42" y1="33" x2="27" y2="55" stroke="${SKIN}" stroke-width="7" stroke-linecap="round"/>
    <line x1="58" y1="33" x2="73" y2="55" stroke="${SKIN}" stroke-width="7" stroke-linecap="round"/>
    <rect x="38" y="28" width="24" height="30" rx="7" fill="#3fa9f5"/>
    <line x1="45" y1="58" x2="43" y2="88" stroke="#3b4f9a" stroke-width="10" stroke-linecap="round"/>
    <line x1="55" y1="58" x2="57" y2="88" stroke="#3b4f9a" stroke-width="10" stroke-linecap="round"/>
    <ellipse cx="41" cy="94" rx="8" ry="4" fill="#333"/><ellipse cx="59" cy="94" rx="8" ry="4" fill="#333"/>
    <circle cx="50" cy="17" r="12" fill="${SKIN}"/>
    <path d="M38 15c0-10 24-10 24 0c-6-4-18-4-24 0z" fill="${HAIR}"/>
    <circle cx="46" cy="18" r="1.4" fill="#333"/><circle cx="54" cy="18" r="1.4" fill="#333"/>
    <path d="M46 22q4 3 8 0" stroke="#333" stroke-width="1.3" fill="none" stroke-linecap="round"/>
    <g fill="${RING}" fill-opacity=".2" stroke="${RING}" stroke-width="2.6">${rings[ring]}</g>`,
    ring === "head" ? "25 -2 50 50" : "19 48 48 48");
}

const HAIR_SVG = svg(`
  <circle cx="50" cy="58" r="30" fill="${SKIN}"/>
  <path d="M17 60C10 14 90 14 83 60C78 40 66 31 50 31C34 31 22 40 17 60Z" fill="${HAIR}"/>
  <path d="M17 60q-5 18 2 30M83 60q5 18-2 30" stroke="${HAIR}" stroke-width="9" stroke-linecap="round" fill="none"/>
  <circle cx="40" cy="60" r="3" fill="#333"/><circle cx="60" cy="60" r="3" fill="#333"/>
  <path d="M40 74q10 9 20 0" stroke="#333" stroke-width="3" fill="none" stroke-linecap="round"/>`);

const TOES_SVG = svg(`
  <path d="M22 70C22 52 78 52 78 70C78 90 66 98 50 98C34 98 22 90 22 70Z" fill="${SKIN}" stroke="${SKIN_D}" stroke-width="2.5"/>
  <g fill="${SKIN}" stroke="${SKIN_D}" stroke-width="2.5">
    <ellipse cx="29" cy="46" rx="11" ry="12"/><ellipse cx="45" cy="33" rx="9" ry="10"/>
    <ellipse cx="60" cy="31" rx="8.5" ry="9.5"/><ellipse cx="72" cy="36" rx="8" ry="9"/>
    <ellipse cx="82" cy="46" rx="7" ry="8"/>
  </g>
  <g fill="#ffb4b4"><ellipse cx="29" cy="40" rx="6" ry="5"/><ellipse cx="45" cy="28" rx="4.5" ry="4"/>
    <ellipse cx="60" cy="26" rx="4.5" ry="4"/><ellipse cx="72" cy="31" rx="4" ry="3.6"/><ellipse cx="82" cy="41" rx="3.5" ry="3.2"/></g>
  <ellipse cx="55" cy="39" rx="38" ry="25" fill="none" stroke="${RING}" stroke-width="3" transform="rotate(-6 55 39)"/>`, "5 10 90 90");

const BODY = [
  { en: "head",  ua: "голова",       emoji: kidSVG("head"), gap: "ea" },
  { en: "face",  ua: "обличчя",      emoji: "🙂",           gap: "c" },
  { en: "hair",  ua: "волосся",      emoji: HAIR_SVG,       gap: "ai" },
  { en: "eye",   ua: "око, очі",     emoji: "👁️",          gap: "y" },
  { en: "ear",   ua: "вухо",         emoji: "👂",           gap: "e" },
  { en: "nose",  ua: "ніс",          emoji: "👃",           gap: "o" },
  { en: "mouth", ua: "рот",          emoji: "👄",           gap: "ou" },
  { en: "teeth", ua: "зуби",         emoji: "🦷🦷",         gap: "ee" },
  { en: "arm",   ua: "рука (до ліктя й вище)", emoji: "💪", gap: "m" },
  { en: "hand",  ua: "кисть руки, долоня",     emoji: "✋", gap: "n" },
  { en: "leg",   ua: "нога (вище ступні)",     emoji: "🦵", gap: "e" },
  { en: "knee",  ua: "коліно",       emoji: kidSVG("knee"), gap: "ne" },
  { en: "foot",  ua: "ступня",       emoji: "🦶",           gap: "oo" },
  { en: "feet",  ua: "ступні (багато)", emoji: "🦶🦶",      gap: "ee" },
  { en: "toes",  ua: "пальці на нозі", emoji: TOES_SVG,      gap: "oe" },
];
BODY.forEach(w => { w.hole = w.en.replace(w.gap, "_".repeat(w.gap.length)); });
const bodyWord = en => BODY.find(w => w.en === en);

// Pictures that could be taken for each other are never offered together (see house.js optionsFor)
if (typeof CLASH !== "undefined") {
  Object.assign(CLASH, {
    head: ["face", "hair"], face: ["eye", "ear", "nose", "mouth", "teeth", "hair"],
    mouth: ["teeth"], foot: ["feet", "toes"], feet: ["toes"], leg: ["knee"], arm: ["hand"],
  });
}

// "… hurt his knee." stories. who: name, he: true/false (his/her), what: what happened
const STORIES = [
  { who: "Max",   he: true,  did: "rode a bike and fell",       part: "knee" },
  { who: "Oleg",  he: true,  did: "rode a scooter and fell",    part: "leg" },
  { who: "Anna",  he: false, did: "fell from a tree",           part: "arm" },
  { who: "Kate",  he: false, did: "played football",            part: "foot" },
  { who: "Tom",   he: true,  did: "shut the door",              part: "hand" },
  { who: "Bill",  he: true,  did: "ran and hit the wall",       part: "head" },
  { who: "Mia",   he: false, did: "ran in the park and fell",   part: "knee" },
  { who: "Dan",   he: true,  did: "ate a very hot soup",        part: "mouth" },
  { who: "Lily",  he: false, did: "played with a ball",         part: "hand" },
  { who: "Sam",   he: true,  did: "jumped from a chair",        part: "leg" },
  { who: "Nina",  he: false, did: "walked in new shoes",        part: "toes" },
  { who: "Ben",   he: true,  did: "fell on the ice",            part: "arm" },
];
STORIES.forEach(s => {
  s.his = s.he ? "his" : "her";
  s.text = `${s.who} ${s.did.replace(" and ", ", ")} and hurt ${s.his} ${s.part}.`;
});

// Small helper: the picture of a word at a given font size (works for emoji and svg)
const bodyPic = (w, cls = "") => `<span class="emo ${cls}">${w.emoji}</span>`;
