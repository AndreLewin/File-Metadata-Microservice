const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const multer = require('multer');

const app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// Configure webpack 
const config = require('../webpack.dev.config');
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {colors: true}
}));


// MULTER
// Create a storage engine
const storage = multer.memoryStorage();

// Link multer to the file input "myFile"
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }
}).single('myFile');

// Manage the post request with multer
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.send(err);
    } else {
      if(req.file == undefined){
        res.send("Error: no file selected");
      } else {
        console.log(req.file);
        res.send({size: req.file.size});
      }
    }
  });
});


// listen for requests
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
