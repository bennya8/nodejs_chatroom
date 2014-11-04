
exports.authorize = function (req, res) {
    res.locals = {
        'language': 'zh-cn',
        'title': 'nodejs_chatroom',
        'keywords': '',
        'description': '',
        'author': ''
    };
    console.log(req.cookies.userauth);
    req.next();
}

exports.index = function (req, res) {


    res.render('site/site/index');
};

exports.chatroom = function (req, res) {
    var auth = req.cookies.userauth || "";

    if (!auth) {
        res.redirect('/');
    }


    res.render('site/site/chatroom');
}

exports.doLogin = function (req, res) {
    var nickname = req.param('nickname') || "";
    var genre = req.param('genre') || "";

    if (!nickname || !genre) {
        res.redirect('/');
    }else{
        res.cookie('userauth', {
            nickname: nickname,
            genre: genre
        })
        res.redirect('/chatroom');
    }
}