// Contains methods for interacting with the server API via HTTP requests.

(function() {
    var debug = true;

    // Global options for all requests
    var defaults = {
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        error: function (err) {
            if (debug) {
                console.error(err);
            }
        }
    };

    window.fl = window.fl || {};

    // URL of the server. Comment for development/production
    // George server
    window.fl.server = 'http://nl.ks07.co.uk:5000/';
    // AWS
    // window.fl.server = 'http://ec2-54-194-186-121.eu-west-1.compute.amazonaws.com/';
    // Local
    // window.fl.server = 'http://localhost:5000/';

    /**
     * Base method from which all others extend. Sends an AJAX request to
     * the server URL, with all the options passed in as arguments as well
     * as any defaults not provided. Uses jQuery's `ajax` method for handling
     * the request to normalise cross-browser inconsistencies
     */
    window.fl.ajax = function(options) {
        options = $.extend(defaults, options);
        options.url = fl.server + options.url;

        if (debug){
            console.log(options);
        }

        $.ajax(options);
    };

    /**
     * Sends a HTTP GET request with all supplied options.
     */
    window.fl.get = function(options) {
        options.type = 'GET';
        fl.ajax(options);
    };

    /**
     * Sends a HTTP POST request with all supplied options.
     */
    window.fl.post = function(options) {
        options.type = 'POST';
        fl.ajax(options);
    };

    window.fl.login = function(url, data, sucess) {
        // Send the request
        fl.post({
            url: url,
            data: data,
            success: success
        });
    };

    // Sends the image metadata to the server
    // TODO: this endpoint doesn't work
    window.fl.uploadMetadata = function(data) {
        fl.post({
            url: 'upload/metadata',
            data: data,
            success: function(d) {
                console.log(d);
            }
        });
    };

    window.fl.getFeatures = function(success) {
        fl.get({
            url: 'project/fields?project=1',
            success: success
        });
    };

    window.fl.getSpecies = function(success) {
        fl.get({
            url: 'projects',
            success: success
        });
    };

    window.fl.loginCheck = function(success) {
        fl.get({
            url: 'logincheck',
            success: success
        });
    };

    window.fl.logout = function(success) {
        fl.get({
            url: 'logout',
            success: success
        });
    };

    window.fl.getImages = function(success) {
        fl.get({
            url: 'images',
            success: success
        });
    };
})();
