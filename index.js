const app = require('express')();
const bodyParser = require('body-parser');

bodyParser.urlencoded({
	extended: true
});

app.use(bodyParser.json());

const user = require('./controllers/sql/UserController');
const post = require('./controllers/sql/PostController');

app.use('/user', user);
app.use('/post', post);

app.get('/', (req, res) => {
	res.json('selamat datang');
});

const server = app.listen(3000);