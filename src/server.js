const fastify = require('fastify')({
	logger: true
})

const mongoose = require('mongoose')

// .connect('mongodb://localhost/mycargarage')
// .connect('mongodb://heroku_jjz9745c:9ioj676tqqp4pndin0n25lv7jm@ds157956.mlab.com:57956/heroku_jjz9745c')
mongoose
	.connect('mongodb://heroku_jjz9745c:9ioj676tqqp4pndin0n25lv7jm@ds157956.mlab.com:57956/heroku_jjz9745c')
	.then(() => console.log('MongoDB connected...'))
	.catch(err => console.log(err))

module.exports = fastify
