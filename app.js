const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const connectDB = require('./config/db.js');
const feedRoutes = require('./routes/feedRoutes');

const app = express();

connectDB();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method')); 


app.use('/feed', feedRoutes);


app.get('/', (req, res) => res.redirect('/feed'));


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/feed`);
});