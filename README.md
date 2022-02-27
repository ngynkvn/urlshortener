# [URL Shortener Microservice](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice)

- You should provide your own project, not the example URL.

- You can POST a URL to /api/shorturl and get a JSON response with original_url and short_url properties. Here's an example:
```
        {
          original_url : 'https://freeCodeCamp.org',
          short_url : 1
        }
```

- When you visit `/api/shorturl/<short_url>`, you will be redirected to the original URL.

- If you pass an invalid URL that doesn't follow the valid `http://www.example.com` format, the JSON response will contain `{ error: 'invalid url' }`

---

#### First create a POST endpoint

```js
app.post('/api/shorturl', function(req, res) {
    // ...
});
```

#### Validate the incoming url

```js
app.post('/api/shorturl', function(req, res) {
    try {
        const url = new URL(req.body.url);
    } catch (e) {
        res.json({error: 'invalid url'});
    }
});
```

Okay, let's try to track url's doing something super simple. Push the long url to a list and return it's index in the response.

```js
// service[short_url] = long_url
// 😨 a global! 
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
        const apiShortenUrlResponse = {
            original_url: req.body.url,
            short_url: shorten(req.body.url)};
        res.json(apiShortenUrlResponse);
    } catch (e) {
        res.json({error: 'invalid url'});
    }
}
```