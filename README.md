# English for Kids

Інтерактивні задачки з англійської для дітей. Одна папка — один рівень, один файл — одна задачка.

Сайт: https://yelyzaaveta.github.io/english-for-kids/

## Структура

```
index.html              — головна сторінка зі списком задачок
answers.html            — відповіді до всіх аркушів (маленьке «?» внизу головної)
assets/
  common.css            — спільний дизайн (кольори, кнопки, заголовок)
  worksheet.css         — дизайн аркушів А4 для друку
  holidays/             — фото до свят (стиснуті jpg)
  body.js               — слова про тіло (картинки, переклад, пропущені букви) і тексти про травми для блоку body/
  common.js             — словник за темами, озвучка, вікно результату
  reading.css / .js     — спільне для ігор на читання: підсвічування голосної, правило складу
  house.css / .js       — спільне для блоку house/: слова, гра з сердечками, з'єднування, малюнки меблів
  house/                — фото до блоку house/ (стиснуті jpg)
beginners/
  alphabet.html         — алфавіт із закритими картками
  alphabet-type.html    — алфавіт, де пропущені букви треба вписати з клавіатури
vowels/                 — блок «Голосні літери»
  vowel-sounds.html     — аркуші А4 для друку (читання + завдання)
  vowel-review.html     — повторення: коротка теорія + складніші вправи (2 аркуші А4)
  hear-and-choose.html  — звучить слово, знайди його серед 4 написаних (30 слів на a, b, c, d)
  lost-letter.html      — встав пропущену голосну, підказка — смайлик
  read-and-find.html    — прочитай слово без звуку й знайди картинку (cap / cup / cape)
holidays/                — блок «Свята в США» (5 клас)
  usa-holidays.html     — 6 свят: фото, текст, 4 вправи на кожне (6 аркушів А4)
  holiday-detective.html — прочитай підказку й вгадай свято
house/                   — блок «Where is …?» (3 клас). У кожній грі сердечка: помилка — мінус ❤️ і наступне питання
  places.html           — фото → яке це місце (kitchen, bathroom, bedroom, living room, house, camp, village)
  where-is.html         — "Bill is at the camp. Where is Bill?" (можна слухати) → знайди фото
  new-words.html        — нові слова: картинка → слово і почуй слово → знайди картинку
  left-right.html       — будинок з кімнатами зліва/справа: "Where is the kitchen?" → "It is on the left."
  am-is-are.html        — правило am / is / are з прикладами й озвучкою
  am-is-are-match.html  — з'єднай: I ↔ am at home.
  am-is-are-quiz.html   — встав am / is / are в речення
  missing-letter.html   — впиши пропущену букву в нових словах
  in-on-under.html      — 20 завдань: кіт/собака on / under / in (sofa, chair, bed, carpet, box), тест + з'єднай
  workbook.html         — воркбук: 10 аркушів А4 для друку в темно-фіолетовому стилі: слова, in/on/under, "Where are the balls?", "Who sits on the sofa?", з'єднай з перекладом, пропущені букви, обведи + намалюй, текст Yes/No, філворд (фото wb-*.jpg в assets/house/)
body/                    — блок «Parts of the Body» (5 клас), дані й малюнки в assets/body.js
  body-parts.html       — 3 аркуші А4 для друку в зеленому стилі: слова з картинками, пропущені букви + з'єднування, тексти "hurt his knee" + питання
  touch-your.html       — "Touch your head!" з відліком: Easy 10 с / Hard 5 с, без підказок (звук можна ввімкнути)
  match.html            — з'єднай картинку зі словом
  missing-letter.html   — впиши 1–2 пропущені букви
  find-picture.html     — слово або звук → знайди картинку
  hurt-story.html       — текст "Max rode a bike and hurt his knee" → що поранив → впиши пропущені букви
words/
  picture-match.html    — з'єднай картинку зі словом
  colours.html          — знайди колір
games/
  quiz-race.html        — вікторина з 10 питань на час
  odd-one-out.html      — знайди зайве
  amazz.html            — який розмір у транспорту: малий, великий чи величезний
```

Слова для завдань (тварини, їжа, одяг, школа, іграшки, кольори, числа) лежать у `assets/common.js` —
додаєш слово туди, і воно з'являється в усіх іграх.

## Як додати нову задачку

1. Створи файл `назва.html` у потрібній папці (або нову папку).
2. Додай посилання на нього в `index.html`.
3. Закоміть і запуш у `main` — GitHub Actions сам викладе сайт.

## Перший запуск GitHub Pages

У репозиторії: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
