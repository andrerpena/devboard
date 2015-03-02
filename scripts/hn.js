define(["promise", "jquery"], function(Promise, $) {

    /*
    Returns a Hacker News post by id (Promise)
     */
    function getHnPost(id) {
        return new Promise(function(fulfill, reject) {
            var hnUrl = "https://hacker-news.firebaseio.com/v0/item/" + id + ".json?print=pretty";
            $.ajax({
                url: hnUrl,
                dataType: 'jsonp',
                success: function(json) {
                    fulfill(json);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    reject(jqXHR, textStatus, errorThrown);
                }
            })
        });
    }

    // actual module content
    return {
        /*
        Returns the Hacker News top posts
         */
        getFeedItems: function() {
            return new Promise(function(fulfill, reject) {
                $.ajax({
                    url:"https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty",
                    dataType: 'jsonp',
                    success:function(json) {
                        var result = [];
                        /*
                        Determines whether or not all posts have been retrieved already
                         */
                        function checkStatus() {
                            if(result.length == json.length)
                                fulfill(result);
                        }
                        for(var i = 0; i < json.length; i++) {
                            getHnPost(json[i]).then(function(json2) {
                                result.push(json2);
                                checkStatus();
                            }).catch(function() {
                                result.push("error");
                                checkStatus();
                            });
                        }
                    },
                    error:function(){
                        reject("something went terribly wrong");
                    }
                });
            });
        }
    }
});