import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create new instance of the mongoose.schema. the schema takes an
// object that shows the shape of your database entries.
const ListSchema = new Schema({
  item: String,
  checked: Number,
});

// export our module to use in server.js
export default mongoose.model('listItem', ListSchema);