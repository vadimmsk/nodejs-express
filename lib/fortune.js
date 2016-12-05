var fortunes =[
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
];
// поместив модуль в глобальную переменную exports он становится доступным, извне нашего модуля,
// но массив fortunes будет полностью скрыт
exports.getFortune = function () {
  var idx = Math.floor(Math.random() * fortunes.length);
  return fortunes[idx];
};