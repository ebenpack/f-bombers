var React = require('react');
var Reflux = require('reflux');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');
var Movie = require('./Movie.jsx');

var AddMovie = React.createClass({
    mixins: [
        Reflux.connect(AppStore, 'searchData')
    ],
    getInitialState: function() {
        return {
            search: '',
        };
    },
    addHistory: function(i, e){
        AppActions.addHistory(this.state.searchData.searchResults[i]);
    },
    addUpcoming: function(i, e){
        AppActions.addUpcoming(this.state.searchData.searchResults[i]);
    },
    handleSearchChange: function(e){
        this.setState({
            search: e.target.value,
        });
    },
    submitSearch: function(){
        AppActions.searchMovies(this.state.search);
    },
    render: function() {
        return (
            <div>
                <input type="text" value={this.state.search} onChange={this.handleSearchChange} />
                <button onClick={this.submitSearch}>Search</button>
                {this.state.searchData.searchResults.map(function(movie, i){
                    return (
                        <div>
                            <Movie
                                key={movie.id}
                                title={movie.title}
                                year={movie.year}
                                img={movie.img}
                            />

                            <button onClick={this.addHistory.bind(this, i)}>Add to History</button>
                            <button onClick={this.addUpcoming.bind(this, i)}>Add to Upcoming</button>
                        </div>
                    );
                }, this)}
            </div>
        );
    }
});

module.exports = AddMovie;