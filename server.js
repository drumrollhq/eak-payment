var Express = require('express');
var Package = require('./package.json');

var server = Express();
var PORT = process.env.PORT || 8000;

server.use(Express.static(Package.paths.build.dist));

server.get('*', function (req, res) {
    res.sendFile(__dirname + '/build/dist/index.html');
});

server.listen(PORT, function () {
    console.log(Package.name + ' listening on port: '+ PORT);
});
