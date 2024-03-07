const slug = require('mongoose-slug-generator');
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Course = new Schema(
   {
      name: { type: String },
      description: { type: String, maxLength: 600 },
      image: { type: String, maxLength: 255 },
      slug: { type: String, slug: 'name', },
   },
   { timestamps: true },
);
//Add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete,{deletedAt: true, overrideMethods: 'all' });
   // unique: true 
   

module.exports = mongoose.model('Course', Course);
