describe('hooks', function() {
    before(function() { alert("Начало тестов"); });
    after(function() { alert("Конец тестов"); });
    beforeEach(function() { alert("Вход в тест"); });
    afterEach(function() { alert("Выход из теста"); });
    it('тест 1', function() { alert('test1'); });
    it('тест 2', function() { alert('test2'); });
});