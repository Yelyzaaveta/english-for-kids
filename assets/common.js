// Shared helpers and vocabulary for all task pages

const TOPICS = {
  animals: {
    title: "Animals",
    words: [
      ["cat", "🐱"], ["dog", "🐶"], ["cow", "🐮"], ["pig", "🐷"], ["horse", "🐴"],
      ["frog", "🐸"], ["fish", "🐟"], ["bird", "🐦"], ["lion", "🦁"], ["monkey", "🐵"],
      ["rabbit", "🐰"], ["duck", "🦆"], ["bear", "🐻"], ["mouse", "🐭"], ["elephant", "🐘"],
      ["sheep", "🐑"], ["tiger", "🐯"], ["snake", "🐍"],
    ],
  },
  food: {
    title: "Food",
    words: [
      ["apple", "🍎"], ["banana", "🍌"], ["bread", "🍞"], ["cheese", "🧀"], ["egg", "🥚"],
      ["milk", "🥛"], ["cake", "🍰"], ["pizza", "🍕"], ["carrot", "🥕"], ["orange", "🍊"],
      ["grapes", "🍇"], ["ice cream", "🍦"], ["tomato", "🍅"], ["sandwich", "🥪"], ["lemon", "🍋"],
      ["strawberry", "🍓"],
    ],
  },
  clothes: {
    title: "Clothes",
    words: [
      ["T-shirt", "👕"], ["jeans", "👖"], ["dress", "👗"], ["cap", "🧢"], ["socks", "🧦"],
      ["trainers", "👟"], ["coat", "🧥"], ["scarf", "🧣"], ["gloves", "🧤"], ["boots", "🥾"],
      ["glasses", "👓"], ["shorts", "🩳"],
    ],
  },
  school: {
    title: "School",
    words: [
      ["book", "📕"], ["pen", "🖊️"], ["pencil", "✏️"], ["ruler", "📏"], ["schoolbag", "🎒"],
      ["scissors", "✂️"], ["crayon", "🖍️"], ["notebook", "📓"], ["computer", "💻"], ["clock", "⏰"],
      ["paintbrush", "🖌️"], ["globe", "🌍"],
    ],
  },
  toys: {
    title: "Toys",
    words: [
      ["ball", "⚽"], ["teddy bear", "🧸"], ["kite", "🪁"], ["car", "🚗"], ["train", "🚂"],
      ["robot", "🤖"], ["drum", "🥁"], ["yo-yo", "🪀"], ["balloon", "🎈"], ["puzzle", "🧩"],
      ["bike", "🚲"], ["plane", "✈️"], ["boat", "⛵"],
    ],
  },
};

const COLOURS = [
  ["red", "#e53935"], ["blue", "#1e6fe0"], ["green", "#2eaa4f"], ["yellow", "#ffd400"],
  ["orange", "#ff8a00"], ["purple", "#8e44ff"], ["pink", "#ff7eb6"], ["brown", "#8b5a2b"],
  ["black", "#111111"], ["white", "#ffffff"], ["grey", "#9aa0a6"],
];

const NUMBERS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
  "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen",
  "eighteen", "nineteen", "twenty"];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sample(arr, n) {
  return shuffle(arr).slice(0, n);
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Text-to-speech with an English voice (built into the browser)
let _voice = null;
function _findVoice() {
  if (!("speechSynthesis" in window)) return;
  const voices = speechSynthesis.getVoices();
  _voice = voices.find(v => v.lang === "en-GB") ||
           voices.find(v => v.lang === "en-US") ||
           voices.find(v => v.lang && v.lang.startsWith("en")) || null;
}
if ("speechSynthesis" in window) {
  _findVoice();
  speechSynthesis.onvoiceschanged = _findVoice;
}
function speak(text) {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = _voice ? _voice.lang : "en-GB";
  if (_voice) u.voice = _voice;
  u.rate = 0.85;
  speechSynthesis.speak(u);
}

// Restart a CSS animation class on an element
function flash(el, cls) {
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
}

// Result overlay: stars out of 3 based on score / total
function showResult({ score, total, onAgain, extra = "" }) {
  let box = document.querySelector(".result");
  if (!box) {
    box = document.createElement("div");
    box.className = "result";
    document.body.appendChild(box);
  }
  const ratio = score / total;
  const stars = ratio >= 0.9 ? 3 : ratio >= 0.7 ? 2 : ratio >= 0.4 ? 1 : 0;
  const title = ["Try again!", "Good!", "Great job!", "Excellent!"][stars];
  box.innerHTML = `<div class="box">
      <div class="stars">${[0, 1, 2].map(i => `<span class="${i < stars ? "" : "off"}">⭐</span>`).join("")}</div>
      <h2>${title}</h2>
      <p>${score} / ${total}${extra ? " · " + extra : ""}</p>
      <button class="btn green" id="again">Play again</button>
    </div>`;
  box.classList.add("show");
  box.querySelector("#again").addEventListener("click", () => {
    box.classList.remove("show");
    onAgain();
  });
}

const ICON_HOME = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>';
const ICON_SOUND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/></svg>';
const ICON_NEXT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>';
const ICON_RESET = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15.5-6.3L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.5 6.3L3 16"/><path d="M3 21v-5h5"/></svg>';

// Fill any <a class="home"> and [data-icon] placeholders
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".home").forEach(a => { if (!a.innerHTML.trim()) a.innerHTML = ICON_HOME; });
  const icons = { sound: ICON_SOUND, next: ICON_NEXT, reset: ICON_RESET };
  document.querySelectorAll("[data-icon]").forEach(el => el.insertAdjacentHTML("afterbegin", icons[el.dataset.icon] || ""));
});
