const twit = require('twit')


// env keys for deploy
const Twitter = new twit({
consumer_key: process.env.CONSUMER_KEY,
consumer_secret: process.env.CONSUMER_SECRET,
access_token: process.env.ACCESS_TOKEN,
access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

const Twitter = new twit(config)


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
            let x = [Math.floor(Math.random()*data.statuses.length)]
            var retweetId = data.statuses[x].id_str;
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




retweet()