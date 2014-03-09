// Contains methods for interacting with the server API via HTTP requests.

(function() {
    var debug = true;

    // Global options for all requests
    var defaults = {
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        success: function (data) {
            if (debug) {
                console.log(data);
            }
        },
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
    window.fl.get = function(url, success) {
        var options = {
            type: 'GET',
            url: url,
            success: success
        };
        fl.ajax(options);
    };

    /**
     * Sends a HTTP POST request with all supplied options.
     */
    window.fl.post = function(url, data, success) {
        var options = {
            type: 'POST',
            url: url,
            data: data,
            success: success
        };
        fl.ajax(options);
    };

    window.fl.login = function(data, success) {
        fl.post('login', data, success);
    };

    window.fl.register = function(data, success) {
        fl.post('register', data, success);
    };

    /**
     * Uploads the given image metadata to the server.
     */
    window.fl.uploadMetadata = function(data) {
        fl.post('upload/metadata', data);
    };

    /**
     * Gets the list of feature data to be annotated for the project with the
     * given ID.
     * @param success {Function} The callback to be executed when the data loads.
     * @param project {Integer} The ID of the project to load features of.
     */
    window.fl.getFeatures = function(success, project) {
        // TODO: don't hardcode
        project = 1;
        var url = 'project/fields?project=' + project;
        fl.get(url, success);
    };

    /**
     * Gets the list of all species currently available for annotation.
     */
    window.fl.getSpecies = function(success) {
        fl.get('projects', success);
    };

    /**
     * Determines the authorization status of the current session, and returns
     * the user's information if the check passes.
     */
    window.fl.loginCheck = function(success) {
        fl.get('logincheck', success);
    };

    /**
     * Terminates the current session.
     */
    window.fl.logout = function(success) {
        fl.get('logout', success);
    };

    /**
     * Gets a bunch of images or something not really sure here guys.
     */
    window.fl.getImages = function(success) {
        fl.get('images', success);
    };
})();
