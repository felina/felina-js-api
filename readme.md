# Felina JS

JavaScript client library for the Felina API

# Install

`bower install --save felina-js`

Then include jQuery and `dist/main.js` in your page however you like.

# Use

Initialise the library:

```js
var api = fl_api();
```

or pass a URL to use your own hosted copy of the server instead of the main one:

```js
var url = 'http://localhost:5000/'; // Remember your trailing slash
var api = fl_api(url);
```

then start calling methods:

```js
api.loginCheck(function(data) {
    console.log(data.user.name);
});
```

For a full list of available methods see the [server wiki](https://github.com/felina/server/wiki/API).

# License

MIT
