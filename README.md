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
  common.js             — словник за темами, озвучка, вікно результату
  reading.css / .js     — спільне для ігор на читання: підсвічування голосної, правило складу
  house.css / .js       — спільне для блоку house/: кімнати, малюнки меблів, план будинку
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
house/                   — блок «Where is …?» — кімнати, in / on / under, on the left / right (3 клас)
  house-words.html      — картинка → слово: кімнати, меблі, ball, dog, house
  in-on-under.html      — де м'яч/кіт/собака: "Where is the ball?" + "Is it on the chair? Yes, it is / No, it isn't"
  find-tobby.html       — прочитай речення (Tobby is under the table in the kitchen) і знайди картинку
  left-right.html       — план будинку з підписами: "Where is the kitchen?" → "It's on the left, at the top."
  find-the-room.html    — план без підписів: прочитай, де кімната, і натисни на неї
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
