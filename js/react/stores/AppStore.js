var Reflux = require('reflux');
var AppActions = require('../actions/AppActions');
var reqwest = require('reqwest');

var AppStore = Reflux.createStore({
    listenables: [AppActions],
    state: {
        authData: null,
        history: [],
        upcoming: [],
        searchResults: [],
    },
    movieDbUrl: 'http://www.omdbapi.com/?s={title}&type=movie&plot=short&r=json',
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
            var data = snapshot.val();
            data.id = snapshot.key();
            context.state.history.push(data);
            context.trigger(context.state);
        });
        this.upcomingRef.on('child_added', function(snapshot) {
            var data = snapshot.val();
            data.id = snapshot.key();
            context.state.upcoming.push(data);
            context.trigger(context.state);
        });
    },
    getInitialState: function(){
        return this.state;
    },
    setAuthData: function(val) {
        this.state.authData = val;
        this.trigger(this.state);
    },
    onGetAuth: function() {
        var authData = this.rootRef.getAuth();
        this.setAuthData(authData);
    },
    onLogout: function() {
        this.rootRef.unauth();
        this.setAuthData(null);
    },
    onAddHistory: function(movie){
        delete movie.id;
        this.historyRef.push(movie);
    },
    onAddUpcoming: function(movie){
        delete movie.id;
        this.upcomingRef.push(movie);
    },
    onRemoveHistory: function(id){
        var context = this;
        this.historyRef.child(id).remove(
            function(){
                context.state.history = context.state.history.filter(function(movie){
                    return movie.id !== id;
                });
                context.trigger(context.state);
            }
        );
    },
    onRemoveUpcoming: function(id){
        var context = this;
        this.upcomingRef.child(id).remove(
            function(){
                context.state.upcoming = context.state.upcoming.filter(function(movie){
                    return movie.id !== id;
                });
                context.trigger(context.state);
            }
        );
    },
    onSearchMovies: function(movie){
        var context = this;
        reqwest({
            url:this.movieDbUrl.replace('{title}', encodeURIComponent(movie)),
            crossOrigin: true,
        })
            .then(function(results){
                context.state.searchResults = results.Search.map(function(movie){
                    return {
                        title: movie.Title,
                        year: movie.Year,
                        img: (movie.Poster !== 'N/A' ? movie.Poster : '/defaultposter.jpg'),
                        id: movie.imdbID
                    };
                });
                context.trigger(context.state);
            })
            .catch(function(e){
                console.log(e);
            });
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