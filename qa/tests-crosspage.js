var Browser = require('zombie'),
    assert = require('chai').assert;
var browser;
suite('Межстраничные тесты', function () {
    /*setup принимает функцию, которая будет выполняться фреймворком тестирования
     перед запуском каждого теста
     именно там мы создаем новый экземпляр браузера для каждого теста.
     Далее у нас есть 3 теста.
     Первые 2 проверяют правильность заполнения реферера в случае, когда вы переходите со страницы продукци.
     Метод browser.visit фактически будет загружать страницу; после загрузки страницы выполняется обращение к функции
     обратного вызова.
     Затем метод browser.clickLink ищет ссылку с именем класса requestGroupRate и переходит по ней.
     После загрузки этой страницы выполняется функция обратного вызова, и теперь мы уже находимся на странице Запрос цены для групп.
     Все что остается сделать, - добавить утверждение, что скрытое поле referrer совпадает с настоящей посещеной нами страниицей.
     Метод browse.field возвращает объект DOM Element, у которого имеется св-во value.
     Этот заключительный тест просто проверяет, пустой ли реферер в случае, когда страница Запрос цены для групп посещена напрямую.

     Команда для запуска теста ( mocha должен быть установлен глобально npm install -g mocha
     mocha -u tdd -R spec resources/public/qa/tests-crosspage.js
     */
   setup(function () {
       browser = new Browser();
   });
   test('запрос расценок для групп со страницы туров по реке Худ '
   + 'должен заполнять поле реферера', function (done) {
       var referrer = 'http://127.0.0.1:3000/tours/hood-river';
       browser.visit(referrer, function () {
          browser.clickLink('.requestGroupRate', function () {
            assert(browser.field('referrer').value === referrer);
            done();
          });
       });
   });
   test('запрос расценок для групп по страницы туров '
   + 'пансионата "Орегон Коуст" должен '
   + 'заполнять поле реферера', function (done) {
      var referrer = 'http://127.0.0.1:3000/tours/oregon-coast';
      browser.visit(referrer, function () {
         browser.clickLink('.requestGroupRate', function () {
            assert(browser.field('referrer').value === referrer);
            done();
         });
      });
   });
   test('посещение страницы "Запрос цены для групп" напрямую '
   + 'должен приводить к пустому полю реферера', function (done) {
       browser.visit('htpp://127.0.0.1:3000/tours/request-group-rate',function () {
          assert(browser.field('referrer').value === '');
          done();
       });
   })
});