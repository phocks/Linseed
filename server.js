// server.js
// where your node app starts

const streamToPromise = require('stream-to-promise')
const scrapeTwitter = require('scrape-twitter')

const {
  TimelineStream,
  LikeStream,
  ConnectionStream,
  ConversationStream,
  TweetStream,
  ListStream,
  getUserProfile
} = scrapeTwitter;

const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g


function getUrlsFrom(user, res) {
  const timelineStream = new TimelineStream(user, { retweets: false, count: 50 });
  
  streamToPromise(timelineStream).then(tweets => {
    let urls = []
    tweets.forEach(tweet => {
      // console.log(tweet.urls);
      tweet.urls.forEach(url => {
        const properUrl = url.url.match(urlRegex)[0];
        if (properUrl.includes("https://twitter.com/")) return;
        urls.push(properUrl)
      });
    });
    console.log("urls collected...");
    res.json({urls: urls});
  });
}



// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// This is the API
app.get("/api", (req, res, next) => {
  getUrlsFrom("phocks", res);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
