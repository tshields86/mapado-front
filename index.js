var express = require('express');
var app = express();

/* expose dist */
app.use('/', express.static('dist'));

/* only use process env! */
app.listen(process.env.PORT || 5000, function () {
 console.log('serving up front-end on localhost 5000')
});
