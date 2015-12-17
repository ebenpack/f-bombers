var Reflux = require('reflux');
var AppActions = require('../actions/AppActions');
var reqwest = require('reqwest');

var AppStore = Reflux.createStore({
    listenables: [AppActions],
    state: {
        authData: null,
        history: [],
        upcoming: [],
    },
    movieDbUrl: 'http://www.omdbapi.com/?t={title}&type=movie&plot=short&r=json',
    fireBaseUrl: 'https://dazzling-heat-2158.firebaseio.com/',
    rootRef: null,
    historyRef: null,
    upcomingRef: null,
    init: function() {
        var Firebase = require('firebase');
        var context = this;
        this.rootRef = new Firebase(this.fireBaseUrl);
        this.historyRef = new Firebase(this.fireBaseUrl + 'history');
        this.upcomingRef = new Firebase(this.fireBaseUrl + 'upcoming');
        this.historyRef.on('child_added', function(snapshot) {
            context.state.history.push(snapshot.val());
            context.trigger(context.state);
        });
        this.upcomingRef.on('child_added', function(snapshot) {
            context.state.upcoming.push(snapshot.val());
            context.trigger(context.state);
        });
    },
    getInitialState: function(){
        return this.state;
    },
    onGetAuth: function() {
        var authData = this.rootRef.getAuth();
        this.setAuthData(authData);
    },
    onLogout: function() {
        this.rootRef.unauth();
        this.setAuthData(null);
    },
    setAuthData: function(val) {
        this.state.authData = val;
        this.trigger(this.state);
    },
    onSubmitLogin: function(email, pass) {
        var context = this;
        this.rootRef.authWithPassword({
            "email": email,
            "password": pass
        }, function(error, authData) {
            if (error) {
                context.setAuthData(null);
            } else {
                context.setAuthData(authData);
            }
        });
    },
});

module.exports = AppStore;