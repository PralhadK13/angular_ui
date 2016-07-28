var express = require('express');
var app = express(); 
app.use(express.static(__dirname + '/.'));
app.listen(3000);
console.log('Server running on http://0.0.0.0:3000/');