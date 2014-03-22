// Contains methods for interacting with the server API via HTTP requests.
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

// Library root object
var api = {};

/**
 * Base method from which all others extend. Sends an AJAX request to
 * the server URL, with all the options passed in as arguments as well
 * as any defaults not provided. Uses jQuery's `ajax` method for handling
 * the request to normalise cross-browser inconsistencies
 */
api.ajax = function(options) {
    options = $.extend({}, defaults, options);
    options.url = this.url + options.url;

    if (debug){
        console.log(options);
    }

    $.ajax(options);
};

/**
 * Sends a HTTP GET request with all supplied options.
 */
api.get = function(url, success, error) {
    var options = {
        type: 'GET',
        url: url,
        success: success,
        error: error
    };
    this.ajax(options);
};

/**
 * Sends a HTTP POST request with all supplied options.
 */
api.post = function(url, data, success) {
    var options = {
        type: 'POST',
        url: url,
        data: data,
        success: success
    };
    this.ajax(options);
};

api.login = function(data, success) {
    this.post('login', data, success);
};

api.register = function(data, success) {
    this.post('register', data, success);
};

/**
 * Uploads the given image metadata to the server.
 */
api.uploadMetadata = function(data, success) {
    this.post('upload/metadata', data, success);
};

/**
 * Gets the list of feature data to be annotated for the project with the
 * given ID.
 * @param success {Function} The callback to be executed when the data loads.
 * @param project {Integer} The ID of the project to load features of.
 */
api.getFeatures = function(success, project, error) {
    // TODO: don't hardcode
    project = 1;
    var url = 'project/fields?project=' + project;
    this.get(url, success, error);
};

/**
 * Gets the list of all species currently available for annotation.
 */
api.getSpecies = function(success, error) {
    this.get('projects', success, error);
};

/**
 * Determines the authorization status of the current session, and returns
 * the user's information if the check passes.
 */
api.loginCheck = function(success, error) {
    this.get('logincheck', success, error);
};

/**
 * Terminates the current session.
 */
api.logout = function(success, error) {
    this.get('logout', success, error);
};

/**
 * Gets a bunch of images or something not really sure here guys.
 */
api.getImages = function(success, error) {
    this.get('images', success, error);
};

api.getJobs = function(success, error) {
    this.get('jobs', success, error);
};

var fl_api = function(url) {
    api.url = url || 'http://ec2-54-194-186-121.eu-west-1.compute.amazonaws.com/';
    return api;
};

module.exports = fl_api;
