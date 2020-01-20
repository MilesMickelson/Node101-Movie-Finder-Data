const express = require("express");
const morgan = require("morgan");
const axios = require("axios");

const dataCache = {};

const app = express();
app.use(morgan("dev"));

app.get('/', function(req, res){
  var key = Object.keys(req.query); 
  var val = Object.values(req.query); 
  var url = 'http://www.omdbapi.com/?apikey=8730e0e&' + key + '=' + encodeURI(val); 
  if (dataCache.hasOwnProperty(val)){ 
    res.json(dataCache[val]);
  } else {
    axios.get(url) 
      .then(response => { 
      dataCache[val] = response.data; 
			res.send(dataCache[val]);
			res.status(200);
			})
			.catch(err => res.json(err.message));
    }
})

app.get('*', function( req, res){
  res.status(404).send('404 Error: Page not found');
});

module.exports = app;
