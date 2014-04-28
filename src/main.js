// Contains methods for interacting with the server API via HTTP requests.
var debug = true;

// Global options for all requests
var defaults = {
    xhrFields: {
        withCredentials: true
    },
    dataType: 'json',
    contentType: 'application/json',
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

    if (options.data) {
        options.data = JSON.stringify(options.data);
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

/**
 * Sends a HTTP PATCH request with all supplied options.
 */
pr.patch = function(url, data, success) {
    var options = {
        type: 'PATCH',
        url: url,
        data: data,
        success: success
    };
    this.ajax(options);
};

/**
 * Signs in with an existing user account
 */
pr.login = function(data, success) {
    this.post('login', data, success);
};

/**
 * Registers a new user account
 */
pr.register = function(data, success) {
    this.post('user', data, success);
};

/**
 * Uploads image metadata to the server.
 */
pr.uploadMetadata = function(data, success) {
    this.post('meta', data, success);
};

/**
 * Adds a new subuser to the current researcher
 */
pr.putSubuser = function(data, success) {
    this.post('subusers', data, success);
};

/**
 * Updates one of the current researcher's subusers
 */
pr.updateSub = function(id, data, success) {
    this.patch('subusers/' + encodeURIComponent(id), data, success);
};

/**
 * Adds a new project for the current researcher
 */
pr.addProject = function(data, success) {
    this.post('projects', data, success);
};

/**
 * Updates a user.
 */
pr.updateUser = function(id, data, success) {
    this.patch('users/' + encodeURIComponent(id), data, success);
};

/**
 * Gets the list of feature data to be annotated for the project with the
 * given ID.
 * @param success {Function} The callback to be executed when the data loads.
 * @param project {Integer} The ID of the project to load features of.
 */
pr.getFeatures = function(success, project, error) {
    var url = 'projects/' + encodeURIComponent(project) + '/fields';
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
    this.get('user', success, error);
};

/**
 * Terminates the current session.
 */
pr.logout = function(success, error) {
    this.post('logout', success, error);
};

/**
 * Starts a new image processing job that runs the executable package on the
 * images
 */
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

pr.getProjectImages = function(id, success, error) {
    this.get('projects/' + id + '/images', success, error);
};

/**
 * Gets all executable packages uploaded by the current user
 */
pr.getExecutables = function(success, error) {
    this.get('execs', success, error);
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
    this.get('subusers', success, error);
};

module.exports = fl_api;
