
var express = require('express');

var app = express();


var fs = require('fs');


var cors = require('cors');
app.use(cors());

app.use(express.static('public'));

var words;
var exists = fs.existsSync('words.json');
if (exists) {
  
  console.log('loading words');
  var txt = fs.readFileSync('words.json', 'utf8');
  
  words = JSON.parse(txt);
} else {
  
  console.log('No words');
  words = {};
}


var server = app.listen(process.env.PORT || 3000, listen);


function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}


app.get('/add/:word/:score', addWord);


function addWord(req, res)
 {
  
  var word = req.params.word;
  
  var score = Number(req.params.score);

  words[word] = score;
  
  var reply = {
    status: 'success',
    word: word,
    score: score
  }
  console.log('adding: ' + JSON.stringify(reply));

  var json = JSON.stringify(words, null, 2);
  fs.writeFile('words.json', json, 'utf8', finished);
  function finished(err) {
    console.log('Finished writing words.json');
    
    res.send(reply);
  }
}
app.get('/all', showAll);

function showAll(req, res)
 {

  res.send(words);
}