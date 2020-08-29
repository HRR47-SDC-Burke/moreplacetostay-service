const mongoose = require('mongoose');
const fs = require('fs');
const readline = require('readline');
const { url } = require('../config.js');
const { newImageUrl } = require('../config.js');
const { readEachLine } = require('./fileReader.js');

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const airbnbSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  imageurl: String,
});

const Airbnb = mongoose.model('Airbnb', airbnbSchema);

id = 1;

// clear database before input new data
Airbnb.deleteMany({}, (err, data) => {
  readEachLine('tenmilliondata.txt', (data) => {
    //imageurl: `${newImageUrl}/${randomInt(1000)+1}.jpg`
    // add the data id and complete url
    data.id = id;
    data.imageurl = `${newImageUrl}/${data.imageurl}.jpg`;
    Airbnb.create(data, (err, result) => {
      if (err) {
        console.log(err);
      }
    });

    // notification if done creating
    if (data.id === 10000000) {
      console.log('done');
    }
  });
});
