
// server.js

// first we import our dependencies…
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import { getSecret } from './secret';
import listItem from './models/list';

// and create our instances
const app = express();
const router = express.Router();

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.API_PORT || 2001;
// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// db config -- set your URI from mLab in secrets.js
console.log(getSecret('dbURI'));
mongoose.connect(getSecret('dbURI'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// now we can set the route path & initialize the API
router.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

router.get('/items',(req,res) => 
{
  //console.log('Got to .get');
  listItem.find({},(err,items) =>
  {
    if(err) return res.json({success: false, error:err});
    console.log('Items in list: ' + items);
    console.log('Res.body: '+ res.body);
    return res.json({success: true, data: items});
  });
});

router.post('/items',(req,res) =>
{
  const newItem = new listItem();
  console.log("Got to post");
  const {item, checked} = req.body;
  console.log(req.body);
  newItem.item = item;
  newItem.checked = checked;
  newItem.save(err => 
  {
    if(err) return res.json({success: false, error: err});
    console.log('added post to database?');
    return res.json({success: true});
  });

});

// Use our router configuration when we call /api
app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
