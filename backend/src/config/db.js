const mongoose = require('mongoose');

function connect() {
   mongoose
      .connect('mongodb://0.0.0.0:27017/books-store', {
         // useNewUrlParser: true,
         // useUnifiedTopology: true,
      })
      .then(() => console.log('Connected to MongoDB!'))
      .catch((err) =>
         console.error('Error connecting to MongoDB:', err.message),
      );
}

module.exports = { connect };
