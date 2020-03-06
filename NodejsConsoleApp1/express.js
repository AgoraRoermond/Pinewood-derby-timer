const express = require('express')
const app = express()


var port = 80


//app.get('/jetse', (req, res) => res.send('Hello World!'))
app.use(express.static('public'))

app.get('/public', function (req, res) {
    res.render(__dirname + "/index.html", { port: port });
});
app.listen(port, () => console.log(`Succesfully vibing on: ${port}!`))
