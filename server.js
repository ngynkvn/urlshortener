require('dotenv').config();
const { URL } = require('url');
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyparser.urlencoded({extended: true}));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// service[short_url] = long_url
const service = []
function shorten(long_url) {
    // Push to a list and return it's index
    const length = service.push(long_url);
    return length - 1
}

app.get('/api/shorturl/:short_url', function (req, res) {
    const short_url = parseInt(req.params.short_url)
    const url = service[short_url]
    res.redirect(url)
})

app.post('/api/shorturl', function(req, res) {
    try {
        const url = new URL(req.body.url);
        if(!req.body.url.includes("://")) {
           throw null;
        }
        const apiShortenUrlResponse = {
            original_url: req.body.url,
            short_url: shorten(req.body.url)};
        res.json(apiShortenUrlResponse);
    } catch (e) {
        console.log(e)
        res.json({error: 'invalid url'});
    }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});