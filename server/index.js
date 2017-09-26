const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')

//MIDDLEWARES ******************************************************
const checkForSession = require(`./middlewares/checkForSession.js`)

//CONTROLLERS ******************************************************
const swag_controller = require('./controllers/swag_controller')
const auth_controller = require('./controllers/auth_controller')
const cart_controller = require('./controllers/cart_controller')
const search_controller = require('./controllers/search_controller')

const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: 'secret message for session',
    resave: false,
    saveUninitialized: false
}))
app.use(checkForSession)

app.use( express.static( `${__dirname}/../public/build` ) );


app.get('/api/swag', swag_controller.read)

//USERS ******************************************************
app.get('/api/login', auth_controller.login)
app.post('/api/register', auth_controller.register)
app.post('/api/signout', auth_controller.signout)
app.get('/api/user', auth_controller.getUser)

//CART ******************************************************
app.post('/api/cart', cart_controller.add)
app.post('/api/cart/checkout',cart_controller.checkout)
app.delete( '/api/cart', cart_controller.delete );

//SEARCH ******************************************************
app.get('/api/search',search_controller.search)


const port = 3000;
app.listen(port, () => { console.log(`Server listening on port ${port}`) })