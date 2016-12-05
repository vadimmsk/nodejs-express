suite('Тесты страницы about', function () {
    test('Страница должна содержать ссылку на страницу контактов', function () {
        assert($('a[href="/about?test=1"]').length);
    });
});