

exports.index = function(req, res){
    res.render('index', {hello: 'hello fetch'});
}