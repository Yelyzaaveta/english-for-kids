// Helpers for the Reading games: vowel highlighting and the open / closed syllable rule.
// Works for simple words: CVC (cat, frog, milk) and "magic e" words (cake, kite, globe).

const UA_SHORT = { a: "е", e: "е", i: "і", o: "о", u: "а" };   // closed syllable
const UA_LONG = { a: "ей", e: "і", i: "ай", o: "оу", u: "ю" };   // open syllable / magic e

function vowelInfo(word) {
  const w = word.toLowerCase();
  const v = w.search(/[aeiou]/);
  const magic = /^[^aeiou]*[aeiou][^aeiou]e$/.test(w);
  return {
    v,
    letter: w[v],
    magic,
    magicIdx: magic ? w.length - 1 : -1,
    sound: magic ? UA_LONG[w[v]] : UA_SHORT[w[v]],
  };
}

// Word with its vowel coloured and the silent magic e faded
function vowelHTML(word) {
  const info = vowelInfo(word);
  return [...word].map((ch, k) =>
    k === info.v ? `<span class="v">${ch}</span>` :
    k === info.magicIdx ? `<span class="me">${ch}</span>` : ch
  ).join("");
}

// One-line explanation in Ukrainian
function vowelRule(word) {
  const i = vowelInfo(word);
  return i.magic
    ? `Чарівна <b>e</b> мовчить, тому <b>${i.letter}</b> звучить, як в алфавіті: <b>[${i.sound}]</b>`
    : `Закритий склад: <b>${i.letter}</b> звучить коротко: <b>[${i.sound}]</b>`;
}
