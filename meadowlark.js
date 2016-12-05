var express = require('express');

// ВНИМАНИЕ в пути мы прописали символ точка '.' , это говорит о том что Node не должен искать модуль в каталоге
// node_modules, иначе если бы мы не поставили, то мы бы не нашли данный модуль и была бы ошибка!
var fortune = require('./lib/fortune.js')

var app = express();

// устновка механизма представления handlebars
/*
Это создает механизм представления и настраивает express для его использования по умолчанию.
*/

var handlebars = require('express-handlebars').create({
    defaultLayout:'main',
helpers:{
    section: function (name, options) {
        if(!this._sections)this._sections={};
        this._sections[name] = options.fn(this);
        return null;
    }
}
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static('resources' + '/public'));

// промежуточное по что бы отслеживать url для отладки
// пример http://localhost:3000?test=1 - переход на домашнюю страницу вместе с тестами.
// пример http://localhost:3000 - переход на обычную страницу без тестов
// если в строке запроса есть test=1, и мы не запустили сайт на рабочем сервере,
// свойство res.locals.showTests = true

app.use(function (req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});
/*
   app.get - метод, с момощью которого добавляются марсшруты
   app.VERB - выполняет игнорирование регистра и косую черту в конце строки,
   а так же не принимает во внимание строку запроса при выполнении сравнения
*/

//home url
app.get('/', function (req, res) {
    res.render('home');
});
//about url
app.get('/about', function (req, res) {
    res.render('about');
});

// cookies page
app.get('/cookies', function (req, res) {
    //res.render('cookies', { fortune: fortune.getFortune() });
    res.render('cookies', {
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-cookies.js'
    });
});

app.get('/tours/hood-river', function (req, res) {
    res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function (req, res) {
    res.render('tours/request-group-rate');
});

// страницы 404 и 500 обрабатываются иначе, через app.use - метод с комощью которого Express добавляет промежуточное ПО.
//user page 404
app.use(function (req, res, next) {
    res.status(404);
    res.render('404')
});

//user page 500
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
   console.log('Express was started on localhost in : ' + app.get('port') + ' port, push Ctrl+C to exit');
});

