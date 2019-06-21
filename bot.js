const twit = require('twit'),

// env keys for deploy
const Twitter = new Twit({
consumer_key: process.env.CONSUMER_KEY,
consumer_secret: process.env.CONSUMER_SECRET,
access_token: process.env.ACCESS_TOKEN,
access_token_secret: process.env.ACCESS_TOKEN_SECRET
});


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
        if (!err) {
            var retweetId = data.statuses[0].id_str;
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if (response) {
                    console.log('Retweeted!!!');
                }

                if (err) {
                    console.log('Something went wrong while RETWEETING... Duplication maybe...');
                }
            });
        }

        else {
          console.log('Something went wrong while SEARCHING...');
        }
    });
}

retweet();
// retweet in every 25 minutes
setInterval(retweet, 1500000);






