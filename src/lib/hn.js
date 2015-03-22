var HackerNewsEmitter = {
    /**
     * Returns an emitter function.
     */
    retrievePosts: function(ajax, onNewPost) {

        if(!onNewPost)
            throw "onNewPost parameter is mandatory";

        var postIds = [];

        var processNext = function() {
            if(!postIds.length)
                return;
            var nextId = postIds.shift();
            var hnUrl = "https://hacker-news.firebaseio.com/v0/item/" + nextId + ".json?print=pretty";
            ajax({
                url: hnUrl,
                dataType: 'jsonp',
                success: function(json) {
                    onNewPost(json);
                    processNext();
                },
                error: function() {
                }
            });
        }

        ajax({
            url:"https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty",
            dataType: 'jsonp',
            success:function(json) {
                postIds = eval(json);
                processNext();
            },
            error:function(){
            }
        });
    }
}

module.exports = HackerNewsEmitter;