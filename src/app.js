const express = require('express');
const {engine} = require('express-handlebars'); // Ensure this line is correct

const path = require('path');
const indexRoutes = require('./routes/index')

const app = express();
app.engine('hbs', engine({ 
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '../views', 'layouts'),
    partialsDir: path.join(__dirname, '../views', 'partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname,'../public')));
app.use('/', indexRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
