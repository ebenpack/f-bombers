var Reflux = require('reflux');

var AppActions = Reflux.createActions([
    'addHistory',
    'addUpcoming',
    'getAuth',
    'submitLogin',
    'logout',
]);

module.exports = AppActions;