const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { create } = require('express-handlebars');
const methodOverride = require('method-override');
const route = require('./routes');
const db = require('./config/db');

const app = express();

// Kết nối cơ sở dữ liệu
db.connect();

// Tạo Handlebars template engine
const hbs = create({
   extname: '.hbs', // Thêm extname vào cấu hình
   helpers: {
      sum: (a, b) => a + b,
   },
});

// Sử dụng Handlebars template engine
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Sử dụng các middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(morgan('combined'));

// Định nghĩa route
route(app);

// Lắng nghe các yêu cầu trên cổng 3000
const port = 3000;
app.listen(port, () => {
   console.log(`App listening on port ${port}`);
});
