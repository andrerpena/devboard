require.config({
    paths: {
        'react': '//cdnjs.cloudflare.com/ajax/libs/react/0.12.2/react-with-addons.min',
        'jquery': '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min',
        'promise': '//cdnjs.cloudflare.com/ajax/libs/bluebird/2.9.12/bluebird.min',
    }
});

require(["hn", "jquery", "react"], function(hn, $, React) {
    hn.getFeedItems().done(function(items) {

    });
});