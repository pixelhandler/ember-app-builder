var express = require('express');
var cors = require('cors');
var app = express();
var whitelist = ['http://localhost:8000'];
var corsOptions = {
  origin: function(origin, callback){
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  }
};

// Config
app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.options('*', cors(corsOptions)); // include before other routes
  app.use(app.router);
  //app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/hello.txt', function (req, res){
  res.send('Hello World');
});

var slidesData = [
  { id: '0', filename: 'http://fpoimg.com/800x600?text=Title'},
  { id: '1', filename: 'http://fpoimg.com/800x600?text=Section-A', milliseconds: 1000 },
  { id: '2', filename: 'http://fpoimg.com/800x600?text=Slide-A1', milliseconds: 500 },
  { id: '3', filename: 'http://fpoimg.com/800x600?text=Slide-A2', milliseconds: 250 },
  { id: '4', filename: 'http://fpoimg.com/800x600?text=Slide-A3' },
  { id: '5', filename: 'http://fpoimg.com/800x600?text=Section-B', milliseconds: 300 },
  { id: '6', filename: 'http://fpoimg.com/800x600?text=Slide-B1', milliseconds: 300 },
  { id: '7', filename: 'http://fpoimg.com/800x600?text=Slide-B2', milliseconds: 300 },
  { id: '8', filename: 'http://fpoimg.com/800x600?text=Slide-B3' },
  { id: '9', filename: 'http://fpoimg.com/800x600?text=The End'},
  { id: '10', iframeUrl: 'http://dev.w3.org/html5/markup/iframe.html#iframe'}
];

app.get('/slides', cors(corsOptions), function (req, res) {
  res.send({ slides: slidesData});
});

app.get('/slides/:id', cors(corsOptions), function (req, res){
  var item = null;
  slidesData.forEach(function (slide) {
    if (slide.id == req.params.id) {
      item = slide;
    }
  });
  if (!item) {
    console.log('slide/'+req.params.id + ' - Not Found')
    return res.send('404', {error: 'Not Found'});
  } else {
    res.send({ slide: item });
  }
});

app.listen(8080);
console.log('CORS-enabled web server listening on port 8080');
