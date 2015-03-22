var jquery = require("najax");
var hn = require("../src/lib/hn");


hn.retrievePosts(jquery, function(post) {
    console.log(post);
})