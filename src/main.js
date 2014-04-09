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

var fl_api = function(url) {
    this.url = url || 'http://ec2-54-194-186-121.eu-west-1.compute.amazonaws.com/';
};

var pr = fl_api.prototype;

/**
 * Base method from which all others extend. Sends an AJAX request to
 * the server URL, with all the options passed in as arguments as well
 * as any defaults not provided. Uses jQuery's `ajax` method for handling
 * the request to normalise cross-browser inconsistencies
 */
pr.ajax = function(options) {
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
pr.get = function(url, success, error) {
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
pr.post = function(url, data, success) {
    var options = {
        type: 'POST',
        url: url,
        data: data,
        success: success
    };
    this.ajax(options);
};

pr.login = function(data, success) {
    this.post('login', data, success);
};

pr.register = function(data, success) {
    this.post('register', data, success);
};

/**
 * Uploads the given image metadata to the server.
 */
pr.uploadMetadata = function(data, success) {
    this.post('upload/metadata', data, success);
};

pr.putSubuser = function(data, success) {
    this.post('subuser', data, success);
};

pr.updateSub = function(data, success) {
    this.post('updatesub', data, success);
};

pr.addProject = function(data, success) {
    this.post('project', data, success);
};

/**
 * Gets the list of feature data to be annotated for the project with the
 * given ID.
 * @param success {Function} The callback to be executed when the data loads.
 * @param project {Integer} The ID of the project to load features of.
 */
pr.getFeatures = function(success, project, error) {
    // TODO: don't hardcode
    project = 1;
    var url = 'project/fields?project=' + project;
    this.get(url, success, error);
};

/**
 * Gets the list of all species currently available for annotation.
 */
pr.getSpecies = function(success, error) {
    this.get('projects', success, error);
};

/**
 * Determines the authorization status of the current session, and returns
 * the user's information if the check passes.
 */
pr.loginCheck = function(success, error) {
    this.get('logincheck', success, error);
};

/**
 * Terminates the current session.
 */
pr.logout = function(success, error) {
    this.get('logout', success, error);
};

pr.startJob = function(executable, images, success, error) {
    var data = {
        executable: executable,
        images: images
    };
    this.post('start', data, success, error);
};

/**
 * Gets all images uploaded by the current user
 */
pr.getImages = function(success, error) {
    this.get('images', success, error);
};

/**
 * Gets all executable packages uploaded by the current user
 */
pr.getExecutables = function(success, error) {
    this.get('exec', success, error);
};

/**
 * Gets all jobs started by the current user
 */
pr.getJobs = function(success, error) {
    this.get('jobs', success, error);
};

/**
 * Gets all subusers registered by the current researcher
 */
pr.getSubuser = function(success, error) {
    this.get('subuser', success, error);
};

module.exports = fl_api;
