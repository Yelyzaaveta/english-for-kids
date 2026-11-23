// Shared data for the "Food" block (food/), 5th grade (Unit 6, FOOD).
// 21 words, each with a photo in assets/food/. Games use heartsGame() / matchBoard() from house.js.
//   en / ua  - word and translation
//   img      - photo file (assets/food/)
//   count    - true = countable (plural form in the list: eggs, tomatoes ...)
//   sg       - singular form of a countable word (an egg, a tomato ...)
//   gap      - the 1-2 letters hidden in the "missing letters" tasks of the workbook

const FIMG = "../assets/food/";

const FOOD = [
  { en: "biscuits",     ua: "печиво",           img: "biscuits.jpg",     count: true,  sg: "biscuit",     gap: "u" },
  { en: "bread",        ua: "хліб",             img: "bread.jpg",                                         gap: "ea" },
  { en: "butter",       ua: "вершкове масло",   img: "butter.jpg",                                        gap: "u" },
  { en: "cakes",        ua: "тістечка",         img: "cakes.jpg",        count: true,  sg: "cake",        gap: "a" },
  { en: "cheese",       ua: "сир",              img: "cheese.jpg",                                        gap: "ee" },
  { en: "chicken",      ua: "курятина",         img: "chicken.jpg",                                       gap: "i" },
  { en: "chips",        ua: "картопля фрі",     img: "chips.jpg",        count: true,  sg: "chip",        gap: "i" },
  { en: "drinks",       ua: "напої",            img: "drinks.jpg",       count: true,  sg: "drink",       gap: "r" },
  { en: "eggs",         ua: "яйця",             img: "eggs.jpg",         count: true,  sg: "egg",         gap: "gg" },
  { en: "fruit",        ua: "фрукти",           img: "fruit.jpg",                                         gap: "ui" },
  { en: "juice",        ua: "сік",              img: "juice.jpg",                                         gap: "ic" },
  { en: "lemonade",     ua: "лимонад",          img: "lemonade.jpg",                                      gap: "o" },
  { en: "meat",         ua: "м'ясо",            img: "meat.jpg",                                          gap: "ea" },
  { en: "milk",         ua: "молоко",           img: "milk.jpg",                                          gap: "i" },
  { en: "pasta",        ua: "макаронні вироби", img: "pasta.jpg",                                         gap: "s" },
  { en: "potatoes",     ua: "картопля",         img: "potatoes.jpg",     count: true,  sg: "potato",      gap: "oe" },
  { en: "rice",         ua: "рис",              img: "rice.jpg",                                          gap: "i" },
  { en: "soup",         ua: "суп",              img: "soup.jpg",                                          gap: "ou" },
  { en: "sweet snacks", ua: "солодкі снеки",    img: "sweet-snacks.jpg", count: true,  sg: "sweet snack", gap: "ee" },
  { en: "tomatoes",     ua: "помідори",         img: "tomatoes.jpg",     count: true,  sg: "tomato",      gap: "m" },
  { en: "vegetables",   ua: "овочі",            img: "vegetables.jpg",   count: true,  sg: "vegetable",   gap: "g" },
];
const FOOD_BY = Object.fromEntries(FOOD.map(w => [w.en, w]));

// A photo of a food word (cls = extra classes). Cropped square by default, whole picture with "fit".
const foodPic = (w, cls = "") => `<img class="${cls}" src="${FIMG}${w.img}" alt="">`;
