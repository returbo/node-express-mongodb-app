const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')
const path = require('path')



const PORT = process.env.PORT || 3000


const app = express();
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: 'hbs',
  allowProtoPropertiesByDefault: true
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoutes)

async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://returbo:idsoftwareTurbo6@cluster0.dbkri.gcp.mongodb.net/express-mongo-node-test',
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
      })
    app.listen(PORT, () => {
      console.log('Сервер запущен')
    })
  } catch (e) {
    console.log(e)
  }
}

start()

