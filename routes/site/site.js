exports.authorize = function (req, res) {
    res.locals = {
        'language': 'zh-cn',
        'title': 'nodejs_chatroom',
        'keywords': '',
        'description': '',
        'author': '',
        'auth' : req.session.userauth
    };
    req.next();
}

exports.index = function (req, res) {
    res.render('site/site/index');
};

exports.chatroom = function (req, res) {
    var auth = req.session.userauth || {};
    if (!auth) {
        res.redirect('/');
    } else {
        res.render('site/site/chatroom', {
            'auth': auth
        });
    }
}

exports.doLogin = function (req, res) {
    var nickname = req.param('nickname') || "";
    var genre = req.param('genre') || "";

    if (!nickname || !genre) {
        res.redirect('/');
    } else {
        req.session.userauth = {
            nickname: nickname,
            genre: genre
        };
        res.redirect('/chatroom');
    }
}

exports.doLogout = function (req, res) {
    req.session.destroy();
    req.locals.auth = null;
    res.redirect('/');
}