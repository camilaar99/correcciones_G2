const express = require('express');
const path = require('path');
const app = express();
const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 8000;
const methodOverride = require('method-override');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const recordameMiddleware = require('./middlewares/recordameMiddleware');
const invitadoMiddleware = require('./middlewares/invitadoMiddleware');

const mainRouter = require('./routes/main');
const productRouter = require('./routes/product');
const shopRouter = require('./routes/shop');
const aboutRouter = require('./routes/about');
const contactRouter = require('./routes/contact');
const cartRouter = require('./routes/cart');
const usersRouter = require('./routes/users');
const apiUserRouter = require('./routes/usersApiRoute');
const apiProductRouter = require('./routes/productsApiRoute');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// ************ Middlewares - (don't touch) ************
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(publicPath));
app.use(session({secret: 'keyboard cat',  resave: true, saveUninitialized: true}));
app.use(invitadoMiddleware);
app.use(recordameMiddleware);


/*----Routes-----*/
app.set('views', path.join(__dirname, 'views'));


/*---View app---*/

app.use('/', mainRouter);
app.use('/product', productRouter);
app.use('/shop',shopRouter);
app.use('/about',aboutRouter);
app.use('/contact',contactRouter);
app.use('/cart',cartRouter);

app.use('/users', usersRouter);
app.use('/api/users',apiUserRouter);
app.use('/api/products',apiProductRouter);

app.listen(port, ()=>console.log(`Servidor corriendo en puerto ${port}`))