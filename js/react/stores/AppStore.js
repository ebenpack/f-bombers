var Reflux = require('reflux');
var AppActions = require('../actions/AppActions');
var reqwest = require('reqwest');

var fireBaseUrl = 'https://dazzling-heat-2158.firebaseio.com/';
var Firebase = require('firebase');
var rootRef = new Firebase(fireBaseUrl);
var historyRef = new Firebase(fireBaseUrl + 'history');
var upcomingRef = new Firebase(fireBaseUrl + 'upcoming');

historyRef.on('child_added', function(snapshot) {
  // AppActions.addHistory(snapshot.val());
});
upcomingRef.on('child_added', function(snapshot) {
  // AppActions.addUpcoming(snapshot.val());
});

var AppStore = Reflux.createStore({
    listenables: [AppActions],
    state: {
        authData: null
    },
    movieDbUrl: 'http://www.omdbapi.com/?t={title}&type=movie&plot=short&r=json',
    onAddHistory: function(movie){
        historyRef.push(movie);
    },
    onAddUpcoming: function(movie){
        upcomingRef.push(movie);
    },
    onGetAuth: function(){
        var authData = rootRef.getAuth();
        this.setAuthData(authData);
    },
    onLogout: function(){
        rootRef.unauth();
        this.setAuthData(null);
    },
    setAuthData: function(val){
        this.state.authData = val;
        this.trigger({authData: val});
    },
    onSubmitLogin: function(email, pass) {
        var context = this;
        rootRef.authWithPassword({
            "email": email,
            "password": pass
        }, function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                context.setAuthData(authData);
            }
        });
    },
});

module.exports = AppStore;