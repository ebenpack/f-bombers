var Reflux = require('reflux');

var AppActions = Reflux.createActions([
    'addHistory',
    'addUpcoming',
    'removeHistory',
    'removeUpcoming',
    'getAuth',
    'submitLogin',
    'logout',
    'searchMovies',
]);

module.exports = AppActions;