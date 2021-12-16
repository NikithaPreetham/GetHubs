const express = require('express');
const app = exports.module = express();
app.use(express.static(__dirname + '/public'));
app.listen(5000, () => {
    console.log(`Now listening on port 5000`);
});
