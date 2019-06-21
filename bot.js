// Dependencies =========================
var
    twit = require('twit'),
    config = require('./config');

var Twitter = new twit(config);

var retweet = function() {

    function randQ(){
        let q = '#creativetechnology, #creativetech, #techinnovation, #digitalinnovation, #innovationlab'
        let arr = q.split(',')
        let randomQ = arr[Math.floor(Math.random()*arr.length)]
        return {
            q: randomQ,  
            result_type: 'recent',
            lang: 'en'
        }
    }
    

    Twitter.get('search/tweets', randQ(), function(err, data) {
      // if there no errors
        if (!err) {
          // grab ID of tweet to retweet
          console.log(data)
            var retweetId = data.statuses[0].id_str;
            // Tell TWITTER to retweet
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if (response) {
                    console.log('Retweeted!!!');
                }
                // if there was an error while tweeting
                if (err) {
                    console.log('Something went wrong while RETWEETING... Duplication maybe...');
                }
            });
        }
        // if unable to Search a tweet
        else {
          console.log('Something went wrong while SEARCHING...');
        }
    });
}

// grab & retweet as soon as program is running...
retweet();
// retweet in every 25 minutes
setInterval(retweet, 1500000);






